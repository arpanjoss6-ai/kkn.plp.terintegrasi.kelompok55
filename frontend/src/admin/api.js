const API = https://kknplpterintegrasikelompok55-production.up.railway.app;

let onUnauthorized = null;
export const setUnauthorizedHandler = (fn) => {
  onUnauthorized = fn;
};

const request = async (path, options = {}, retry = true) => {
  const res = await fetch(`${API}${path}`, {
    credentials: "include",
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options,
  });
  if (res.status === 401 && retry) {
    const r = await fetch(`${API}/api/auth/refresh`, {
      method: "POST",
      credentials: "include",
    });
    if (r.ok) return request(path, options, false);
    onUnauthorized?.();
    throw new Error("Sesi berakhir, silakan login ulang");
  }
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    const detail = data.detail;
    throw new Error(
      typeof detail === "string"
        ? detail
        : Array.isArray(detail)
          ? detail.map((e) => e?.msg || "").join(" ")
          : "Terjadi kesalahan"
    );
  }
  return res.json();
};

export const api = {
  get: (p) => request(p),
  post: (p, body) => request(p, { method: "POST", body: JSON.stringify(body || {}) }),
  put: (p, body) => request(p, { method: "PUT", body: JSON.stringify(body || {}) }),
  del: (p) => request(p, { method: "DELETE" }),
};

export const uploadImage = (file, onProgress) =>
  new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", `${API}/api/upload`);
    xhr.withCredentials = true;
    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable && onProgress) {
        onProgress(Math.round((e.loaded / e.total) * 100));
      }
    };
    xhr.onload = () => {
      try {
        const d = JSON.parse(xhr.responseText);
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve({ ...d, url: `${API}${d.url}` });
        } else {
          reject(new Error(typeof d.detail === "string" ? d.detail : "Upload gagal"));
        }
      } catch (e) {
        reject(e);
      }
    };
    xhr.onerror = () => reject(new Error("Upload gagal, periksa koneksi"));
    const fd = new FormData();
    fd.append("file", file);
    xhr.send(fd);
  });
