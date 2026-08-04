# Auth Testing Playbook

## Step 1: MongoDB Verification
```
mongosh
use test_database
db.users.find({role: "admin"}).pretty()
```
Verify: password_hash dimulai dengan `$2b$`, index unik pada users.username, index pada login_attempts.identifier dan activity.ts.

## Step 2: API Testing
```
curl -c cookies.txt -X POST http://localhost:8001/api/auth/login -H "Content-Type: application/json" -d '{"username":"admin","password":"KKN55-Admin#2026"}'
cat cookies.txt
curl -b cookies.txt http://localhost:8001/api/auth/me
curl -b cookies.txt http://localhost:8001/api/admin/stats
```
Login mengembalikan objek user + cookie access_token & refresh_token. /me dan /admin/stats harus 200 dengan cookie, 401 tanpa cookie.

## Step 3: UI Testing
- Buka /admin tanpa login → dialihkan ke /admin/login
- Login dengan kredensial admin → masuk Dashboard
- Tambah/edit/hapus konten → cek landing page ikut berubah
