from dotenv import load_dotenv

load_dotenv()

import json
import logging
import os
import uuid
from datetime import datetime, timedelta, timezone
from pathlib import Path

import bcrypt
import jwt
import requests
from bson import ObjectId
from bson.errors import InvalidId
from fastapi import (APIRouter, Depends, FastAPI, File, HTTPException, Request,
                     Response, UploadFile)
from motor.motor_asyncio import AsyncIOMotorClient
from pymongo import UpdateOne
from starlette.middleware.cors import CORSMiddleware

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / ".env")

mongo_url = os.environ["MONGO_URL"]
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ["DB_NAME"]]

app = FastAPI()
api_router = APIRouter(prefix="/api")

JWT_ALGORITHM = "HS256"
ACCESS_MINUTES = 60
REFRESH_DAYS = 7

COLLECTIONS = [
    "programs", "articles", "gallery", "team", "faqs",
    "timeline", "links", "partners", "testimonials",
]
LABEL_KEYS = {
    "programs": "title", "articles": "title", "gallery": "caption",
    "team": "name", "faqs": "question", "timeline": "title",
    "links": "label", "partners": "name", "testimonials": "name",
}

logger = logging.getLogger(__name__)


# ---------------- Auth helpers ----------------
def get_jwt_secret() -> str:
    return os.environ["JWT_SECRET"]


def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")


def verify_password(plain: str, hashed: str) -> bool:
    return bcrypt.checkpw(plain.encode("utf-8"), hashed.encode("utf-8"))


def create_access_token(user_id: str, username: str) -> str:
    payload = {
        "sub": user_id,
        "username": username,
        "type": "access",
        "exp": datetime.now(timezone.utc) + timedelta(minutes=ACCESS_MINUTES),
    }
    return jwt.encode(payload, get_jwt_secret(), algorithm=JWT_ALGORITHM)


def create_refresh_token(user_id: str) -> str:
    payload = {
        "sub": user_id,
        "type": "refresh",
        "exp": datetime.now(timezone.utc) + timedelta(days=REFRESH_DAYS),
    }
    return jwt.encode(payload, get_jwt_secret(), algorithm=JWT_ALGORITHM)


def set_auth_cookies(response: Response, access: str, refresh: str):
    response.set_cookie("access_token", access, httponly=True, secure=True,
                        samesite="lax", max_age=ACCESS_MINUTES * 60, path="/")
    response.set_cookie("refresh_token", refresh, httponly=True, secure=True,
                        samesite="lax", max_age=REFRESH_DAYS * 86400, path="/")


async def get_current_user(request: Request) -> dict:
    token = request.cookies.get("access_token")
    if not token:
        auth_header = request.headers.get("Authorization", "")
        if auth_header.startswith("Bearer "):
            token = auth_header[7:]
    if not token:
        raise HTTPException(status_code=401, detail="Belum login")
    try:
        payload = jwt.decode(token, get_jwt_secret(), algorithms=[JWT_ALGORITHM])
        if payload.get("type") != "access":
            raise HTTPException(status_code=401, detail="Token tidak valid")
        user = await db.users.find_one({"_id": ObjectId(payload["sub"])})
        if not user:
            raise HTTPException(status_code=401, detail="Pengguna tidak ditemukan")
        user["_id"] = str(user["_id"])
        user.pop("password_hash", None)
        return user
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Sesi berakhir, silakan login ulang")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Token tidak valid")


async def log_activity(user: dict, action: str, collection: str, label: str):
    await db.activity.insert_one({
        "action": action,
        "collection": collection,
        "label": (label or "")[:120],
        "user": user.get("username", "admin"),
        "ts": datetime.now(timezone.utc).isoformat(),
    })


# ---------------- Object storage ----------------
STORAGE_URL = os.environ.get(
    "STORAGE_URL", "https://integrations.emergentagent.com/objstore/api/v1/storage"
)
APP_NAME = os.environ.get("APP_NAME", "kkn55")
storage_key = None


def init_storage() -> str:
    global storage_key
    if storage_key:
        return storage_key
    resp = requests.post(f"{STORAGE_URL}/init",
                         json={"emergent_key": os.environ.get("EMERGENT_LLM_KEY")},
                         timeout=30)
    resp.raise_for_status()
    storage_key = resp.json()["storage_key"]
    return storage_key


def put_object(path: str, data: bytes, content_type: str) -> dict:
    key = init_storage()
    resp = requests.put(f"{STORAGE_URL}/objects/{path}",
                        headers={"X-Storage-Key": key, "Content-Type": content_type},
                        data=data, timeout=120)
    resp.raise_for_status()
    return resp.json()


def get_object(path: str):
    key = init_storage()
    resp = requests.get(f"{STORAGE_URL}/objects/{path}",
                        headers={"X-Storage-Key": key}, timeout=60)
    resp.raise_for_status()
    return resp.content, resp.headers.get("Content-Type", "application/octet-stream")


# ---------------- Utils ----------------
def clean(doc: dict) -> dict:
    doc["id"] = str(doc.pop("_id"))
    return doc


def get_collection(name: str):
    if name not in COLLECTIONS:
        raise HTTPException(status_code=404, detail="Koleksi tidak dikenal")
    return db[name]


def parse_oid(item_id: str) -> ObjectId:
    try:
        return ObjectId(item_id)
    except (InvalidId, TypeError):
        raise HTTPException(status_code=400, detail="ID tidak valid")


# ---------------- Root & health ----------------
@api_router.get("/")
async def root():
    return {"message": "KKN 55 CMS API"}


# ---------------- Auth ----------------
@api_router.post("/auth/login")
async def login(request: Request, response: Response):
    body = await request.json()
    username = (body.get("username") or "").strip()
    password = body.get("password") or ""
    if not username or not password:
        raise HTTPException(status_code=400, detail="Username dan password wajib diisi")

    ip = request.client.host if request.client else "unknown"
    identifier = f"{ip}:{username}"
    attempt = await db.login_attempts.find_one({"identifier": identifier})
    if attempt and attempt.get("count", 0) >= 5:
        locked_until = attempt.get("locked_until")
        if locked_until and datetime.fromisoformat(locked_until) > datetime.now(timezone.utc):
            raise HTTPException(status_code=429, detail="Terlalu banyak percobaan. Coba lagi dalam 15 menit.")

    user = await db.users.find_one({"username": username})
    if not user or not verify_password(password, user["password_hash"]):
        await db.login_attempts.update_one(
            {"identifier": identifier},
            {"$inc": {"count": 1},
             "$set": {"locked_until": (datetime.now(timezone.utc) + timedelta(minutes=15)).isoformat()}},
            upsert=True,
        )
        raise HTTPException(status_code=401, detail="Username atau password salah")

    await db.login_attempts.delete_one({"identifier": identifier})
    access = create_access_token(str(user["_id"]), username)
    refresh = create_refresh_token(str(user["_id"]))
    set_auth_cookies(response, access, refresh)
    return {"id": str(user["_id"]), "username": username, "name": user.get("name", "Administrator"), "role": "admin"}


@api_router.post("/auth/logout")
async def logout(response: Response):
    response.delete_cookie("access_token", path="/")
    response.delete_cookie("refresh_token", path="/")
    return {"ok": True}


@api_router.get("/auth/me")
async def me(user=Depends(get_current_user)):
    return {"id": user["_id"], "username": user.get("username"),
            "name": user.get("name", "Administrator"), "role": "admin"}


@api_router.post("/auth/refresh")
async def refresh_token(request: Request, response: Response):
    token = request.cookies.get("refresh_token")
    if not token:
        raise HTTPException(status_code=401, detail="Tidak ada refresh token")
    try:
        payload = jwt.decode(token, get_jwt_secret(), algorithms=[JWT_ALGORITHM])
        if payload.get("type") != "refresh":
            raise HTTPException(status_code=401, detail="Token tidak valid")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Refresh token tidak valid")
    user = await db.users.find_one({"_id": ObjectId(payload["sub"])})
    if not user:
        raise HTTPException(status_code=401, detail="Pengguna tidak ditemukan")
    access = create_access_token(str(user["_id"]), user["username"])
    response.set_cookie("access_token", access, httponly=True, secure=True,
                        samesite="lax", max_age=ACCESS_MINUTES * 60, path="/")
    return {"ok": True}


@api_router.post("/auth/change-password")
async def change_password(request: Request, user=Depends(get_current_user)):
    body = await request.json()
    current = body.get("current") or ""
    new = body.get("new") or ""
    if len(new) < 8:
        raise HTTPException(status_code=400, detail="Password baru minimal 8 karakter")
    doc = await db.users.find_one({"_id": ObjectId(user["_id"])})
    if not doc or not verify_password(current, doc["password_hash"]):
        raise HTTPException(status_code=400, detail="Password saat ini salah")
    await db.users.update_one({"_id": doc["_id"]},
                              {"$set": {"password_hash": hash_password(new)}})
    await log_activity(user, "update", "profil", "Ganti password")
    return {"ok": True}


# ---------------- Content CRUD ----------------
@api_router.get("/content/{name}")
async def list_content(name: str):
    coll = get_collection(name)
    docs = await coll.find().sort("order", 1).to_list(2000)
    return [clean(d) for d in docs]


@api_router.post("/content/{name}")
async def create_content(name: str, request: Request, user=Depends(get_current_user)):
    coll = get_collection(name)
    body = await request.json()
    body.pop("id", None)
    body.pop("_id", None)
    body.setdefault("order", await coll.count_documents({}))
    body["created_at"] = datetime.now(timezone.utc).isoformat()
    body["updated_at"] = body["created_at"]
    result = await coll.insert_one(body)
    await log_activity(user, "tambah", name, body.get(LABEL_KEYS[name], ""))
    return {"id": str(result.inserted_id)}


@api_router.put("/content/{name}/order")
async def reorder_content(name: str, request: Request, user=Depends(get_current_user)):
    coll = get_collection(name)
    body = await request.json()
    operations = [
        UpdateOne({"_id": parse_oid(oid)}, {"$set": {"order": i}})
        for i, oid in enumerate(body.get("order", []))
    ]
    if operations:
        await coll.bulk_write(operations)
    await log_activity(user, "urutkan", name, "")
    return {"ok": True}


@api_router.put("/content/{name}/{item_id}")
async def update_content(name: str, item_id: str, request: Request,
                         user=Depends(get_current_user)):
    coll = get_collection(name)
    body = await request.json()
    body.pop("id", None)
    body.pop("_id", None)
    body["updated_at"] = datetime.now(timezone.utc).isoformat()
    result = await coll.update_one({"_id": parse_oid(item_id)}, {"$set": body})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Data tidak ditemukan")
    await log_activity(user, "edit", name, body.get(LABEL_KEYS[name], ""))
    return {"ok": True}


@api_router.delete("/content/{name}/{item_id}")
async def delete_content(name: str, item_id: str, user=Depends(get_current_user)):
    coll = get_collection(name)
    oid = parse_oid(item_id)
    doc = await coll.find_one({"_id": oid})
    result = await coll.delete_one({"_id": oid})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Data tidak ditemukan")
    await log_activity(user, "hapus", name,
                       (doc or {}).get(LABEL_KEYS[name], ""))
    return {"ok": True}


# ---------------- Settings ----------------
@api_router.get("/settings")
async def get_settings():
    out = {}
    async for doc in db.settings.find({}, {"_id": 0}):
        out[doc["key"]] = doc["value"]
    return out


@api_router.put("/settings/{key}")
async def put_setting(key: str, request: Request, user=Depends(get_current_user)):
    body = await request.json()
    await db.settings.update_one(
        {"key": key},
        {"$set": {"key": key, "value": body.get("value"),
                  "updated_at": datetime.now(timezone.utc).isoformat()}},
        upsert=True,
    )
    await log_activity(user, "edit", f"pengaturan:{key}", "")
    return {"ok": True}


# ---------------- Public aggregate ----------------
@api_router.get("/public/content")
async def public_content():
    settings = {}
    async for doc in db.settings.find({}, {"_id": 0}):
        settings[doc["key"]] = doc["value"]
    collections = {}
    for name in COLLECTIONS:
        docs = await db[name].find().sort("order", 1).to_list(2000)
        collections[name] = [clean(d) for d in docs]
    return {"settings": settings, "collections": collections}


# ---------------- Admin stats & activity ----------------
@api_router.get("/admin/stats")
async def admin_stats(user=Depends(get_current_user)):
    counts = {}
    for name in COLLECTIONS:
        counts[name] = await db[name].count_documents({})
    visitors = await db.counters.find_one({"_id": "visitors"})
    activity = await db.activity.find({}, {"_id": 0}).sort("ts", -1).to_list(12)
    return {
        "counts": counts,
        "visitors": (visitors or {}).get("count", 0),
        "activity": activity,
    }


@api_router.post("/track-visit")
async def track_visit():
    await db.counters.update_one({"_id": "visitors"}, {"$inc": {"count": 1}},
                                 upsert=True)
    return {"ok": True}


# ---------------- Upload & files ----------------
@api_router.post("/upload")
async def upload(file: UploadFile = File(...), user=Depends(get_current_user)):
    content_type = file.content_type or "application/octet-stream"
    if not content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="Hanya file gambar yang diperbolehkan")
    data = await file.read()
    if len(data) > 8 * 1024 * 1024:
        raise HTTPException(status_code=400, detail="Ukuran file maksimal 8 MB")
    ext = file.filename.rsplit(".", 1)[-1].lower() if "." in file.filename else "png"
    path = f"{APP_NAME}/uploads/{uuid.uuid4().hex}.{ext}"
    result = put_object(path, data, content_type)
    await db.files.insert_one({
        "storage_path": result["path"],
        "original_filename": file.filename,
        "content_type": content_type,
        "size": result.get("size", len(data)),
        "is_deleted": False,
        "created_at": datetime.now(timezone.utc).isoformat(),
    })
    await log_activity(user, "upload", "file", file.filename)
    return {"path": result["path"], "url": f"/api/files/{result['path']}"}


@api_router.get("/files/{path:path}")
async def serve_file(path: str):
    record = await db.files.find_one({"storage_path": path, "is_deleted": False})
    if not record:
        raise HTTPException(status_code=404, detail="File tidak ditemukan")
    data, content_type = get_object(path)
    return Response(content=data,
                    media_type=record.get("content_type", content_type))


# ---------------- Seeding ----------------
async def seed_admin():
    username = os.environ.get("ADMIN_USERNAME", "admin")
    password = os.environ.get("ADMIN_PASSWORD", "admin123")
    existing = await db.users.find_one({"username": username})
    if existing is None:
        await db.users.insert_one({
            "username": username,
            "password_hash": hash_password(password),
            "name": "Administrator KKN 55",
            "role": "admin",
            "created_at": datetime.now(timezone.utc).isoformat(),
        })
    elif not verify_password(password, existing["password_hash"]):
        await db.users.update_one({"username": username},
                                  {"$set": {"password_hash": hash_password(password)}})


async def seed_content():
    seed_file = ROOT_DIR / "seed_data.json"
    if not seed_file.exists():
        return
    data = json.loads(seed_file.read_text())
    sc = data.get("siteConfig", {})
    imgs = data.get("images", {})

    if await db.programs.count_documents({}) == 0:
        docs = []
        for i, p in enumerate(data.get("primerPrograms", [])):
            docs.append({"group": "primer", "title": p["title"], "category": p["category"],
                         "icon": p["icon"], "description": p.get("description", ""),
                         "steps": p.get("steps", []), "order": i})
        for i, p in enumerate(data.get("sekunderPrograms", [])):
            docs.append({"group": "sekunder", "title": p["title"], "category": p["category"],
                         "icon": p["icon"], "schedule": p.get("schedule", ""), "order": i})
        if docs:
            await db.programs.insert_many(docs)

    if await db.articles.count_documents({}) == 0:
        docs = [{
            "title": a["title"], "category": a["category"], "date": a["date"],
            "readTime": a.get("readTime", ""), "summary": a["summary"],
            "thumbnail": a["thumbnail"], "content": a.get("content", []),
            "author": "Redaksi KKN 55", "status": "publish", "order": i,
        } for i, a in enumerate(data.get("articles", []))]
        if docs:
            await db.articles.insert_many(docs)

    if await db.gallery.count_documents({}) == 0:
        docs = [{"src": g["src"], "caption": g["caption"], "category": g["category"],
                 "tall": bool(g.get("tall")), "order": i}
                for i, g in enumerate(data.get("gallery", []))]
        if docs:
            await db.gallery.insert_many(docs)

    if await db.team.count_documents({}) == 0:
        docs = [{
            "name": m["name"], "role": m["role"], "photo": m.get("photo", ""),
            "nim": "", "prodi": "",
            "instagram": (m.get("socials") or {}).get("instagram", "#"),
            "whatsapp": "", "email": "", "order": i,
        } for i, m in enumerate(data.get("team", []))]
        if docs:
            await db.team.insert_many(docs)

    if await db.faqs.count_documents({}) == 0:
        docs = [{"question": f["question"], "answer": f["answer"], "order": i}
                for i, f in enumerate(data.get("faqs", []))]
        if docs:
            await db.faqs.insert_many(docs)

    if await db.timeline.count_documents({}) == 0:
        docs = [{"phase": t["phase"], "title": t["title"], "date": t["date"],
                 "description": t["description"], "icon": t["icon"], "order": i}
                for i, t in enumerate(data.get("timeline", []))]
        if docs:
            await db.timeline.insert_many(docs)

    if await db.links.count_documents({}) == 0:
        docs = [{
            "label": l["label"], "description": l.get("description", ""),
            "url": l["url"], "icon": l["icon"], "color": l.get("color", ""),
            "glow": l.get("glow", ""), "span": l.get("span", ""),
            "active": True, "order": i,
        } for i, l in enumerate(data.get("quickLinks", []))]
        if docs:
            await db.links.insert_many(docs)

    if await db.partners.count_documents({}) == 0:
        docs = [{"name": n, "url": "", "logo": "", "order": i}
                for i, n in enumerate(data.get("partners", []))]
        if docs:
            await db.partners.insert_many(docs)

    if await db.testimonials.count_documents({}) == 0:
        docs = [{"quote": t["quote"], "name": t["name"], "role": t["role"],
                 "photo": t.get("photo", ""), "order": i}
                for i, t in enumerate(data.get("testimonials", []))]
        if docs:
            await db.testimonials.insert_many(docs)

    async def set_default(key, value):
        if not await db.settings.find_one({"key": key}):
            await db.settings.insert_one({"key": key, "value": value})

    await set_default("hero", {
        "line1": "KKN-PLP Terintegrasi",
        "line2": "Angkatan 65",
        "line3": sc.get("group", "Kelompok 55"),
        "village": sc.get("village", ""),
        "subtitle": sc.get("subtitle", ""),
        "tagline": sc.get("tagline", ""),
        "background": imgs.get("hero", ""),
        "logoKkn": "",
        "logoUniv": "",
        "ctaPrimaryLabel": "Jelajahi Website",
        "ctaPrimaryTarget": "#tentang",
        "ctaSecondaryLabel": "Profil Kelompok",
        "ctaSecondaryTarget": "#tim",
    })

    await set_default("about", {
        "eyebrow": "Tentang Kami",
        "title": "Mengabdi dengan Hati, Mengajar dengan Ilmu",
        "paragraphs": [
            f"KKN-PLP Terintegrasi Angkatan 65 {sc.get('group', 'Kelompok 55')} adalah program pengabdian masyarakat {sc.get('university', '')} yang digabungkan dengan Praktik Lapangan Persekolahan — mahasiswa mengabdi di tengah warga sekaligus mengajar di sekolah-sekolah mitra.",
            f"Berpusat di {sc.get('village', '')}, kami mengusung gerakan Eco Masjid melalui Sedekah Sampah: menjadikan rumah ibadah sebagai pusat peradaban hijau, tempat jamaah bersedekah dengan sampah terpilah demi lingkungan yang bersih dan berkah.",
        ],
        "photo": imgs.get("about", ""),
        "period": sc.get("period", ""),
        "highlights": ["Eco Masjid", "BPJS Ketenagakerjaan", "Bimbel Cendekia", "TPQ Al-Maula"],
        "stats": data.get("stats", []),
    })

    await set_default("contact", {
        "address": sc.get("address", ""),
        "whatsappUrl": sc.get("whatsappUrl", ""),
        "whatsappDisplay": sc.get("whatsappDisplay", ""),
        "email": sc.get("email", ""),
        "mapsEmbedUrl": sc.get("mapsEmbedUrl", ""),
        "mapsUrl": sc.get("mapsUrl", ""),
        "hours": "Senin — Sabtu, 08.00–20.00 WIB",
        "socials": sc.get("socials", {}),
    })

    await set_default("site", {
        "name": sc.get("name", ""),
        "group": sc.get("group", ""),
        "tagline": sc.get("tagline", ""),
        "university": sc.get("university", ""),
        "universityShort": sc.get("universityShort", ""),
        "village": sc.get("village", ""),
        "period": sc.get("period", ""),
    })


# ---------------- Startup ----------------
@app.on_event("startup")
async def startup():
    await db.users.create_index("username", unique=True)
    await db.login_attempts.create_index("identifier")
    await db.activity.create_index("ts")
    await seed_admin()
    await seed_content()
    try:
        init_storage()
        logger.info("Object storage initialized")
    except Exception as e:
        logger.error(f"Storage init failed: {e}")


app.include_router(api_router)

_cors_env = os.environ.get("CORS_ORIGINS", "")
if _cors_env and _cors_env != "*":
    _origins = [o.strip() for o in _cors_env.split(",") if o.strip()]
else:
    _origins = [os.environ.get("FRONTEND_URL", "http://localhost:3000")]

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=_origins,
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
