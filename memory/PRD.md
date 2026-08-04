# PRD — Landing Page KKN-PLP Terintegrasi Angkatan 65 Kelompok 55

## Problem Statement (ringkas)
Landing page modern, premium, elegan, responsif, dan interaktif untuk KKN Angkatan 65 Terintegrasi PLP Kelompok 55, Kelurahan Kedungwuni Barat. Tagline: "Gerakan Eco Masjid melalui sedekah Sampah." Standar tampilan setara website organisasi/universitas profesional.

## Arsitektur
- Frontend: React (CRA + craco), Tailwind CSS, Framer Motion, Lenis smooth scroll, react-countup, react-fast-marquee, lucide-react, shadcn/ui (accordion).
- Backend: FastAPI template (tidak dipakai untuk konten — landing page statis).
- Data: semua konten terpisah di `/app/frontend/src/data/*.js` (siteConfig, programs, timeline, gallery, articles, links, team, faq, testimonials, partners, stats, images) — mudah diganti tanpa mengubah komponen.
- Struktur: `components/`, `sections/`, `hooks/`, `data/`.

## Persona Pengguna
- Warga & tokoh masyarakat Kedungwuni Barat (info kegiatan, kontak, partisipasi).
- Mitra: takmir masjid, sekolah, LP2M, perangkat kelurahan.
- Mahasiswa/DPL: akses laporan, modul, dashboard.

## Kebutuhan Inti (statis, dari brief)
Hero 100vh + logo + CTA; sticky glass navbar + scroll progress; Tentang + animated counters; Program Kerja (7 kategori); Timeline 6 fase; Galeri masonry + lightbox; Artikel; Google Maps + info lokasi; Quick Access Hub 14 link; Tim; FAQ; Testimoni slider; Logo mitra marquee; Kontak; Footer premium; Dark mode (ikut sistem); loading screen; floating WA + back-to-top; particles; cursor glow; PWA-ready; SEO meta.

## Yang Sudah Diimplementasikan (4 Agu 2026)
- CMS/Admin Panel lengkap di `/admin`: login admin tunggal (JWT httpOnly cookie + refresh + brute-force lockout, tanpa registrasi), dashboard statistik + aktivitas terakhir, sidebar 15 menu, CRUD (cari, paginasi, urutan, modal form, konfirmasi hapus, toast) untuk Program Kerja (tab Primer/Sekunder), Artikel (editor blok + preview + draft/publish), Galeri, Tim, FAQ, Timeline, Link Penting, Testimoni, Sponsor; pengaturan Hero, Tentang, Kontak, Website; profil admin + ganti password
- Upload gambar drag-and-drop (preview + progress) → Emergent Object Storage via `/api/upload` dan `/api/files/...`
- Backend: CRUD generik `/api/content/{collection}`, `/api/settings/{key}`, agregat `/api/public/content`, `/api/admin/stats`, `/api/track-visit`, activity log, seed otomatis dari konten statis
- Landing membaca konten dari database via ContentProvider (fallback statis) — perubahan CMS langsung tampil tanpa deploy
- Section Program Kerja disesuaikan dengan dokumen proker asli (foto dari user): Primer — Eco Masjid (6 tahap: sosialisasi Masjid Jami' Sunan Kalijaga, SDN 07 KDW, Ponpes Miftahul Huda, pelatihan pemilahan & drop box, pembentukan tim, monitoring) dan BPJS Ketenagakerjaan (observasi, edukasi, implementasi); Sekunder — 11 kegiatan (Tahlilan, Manaqib & Pengajian, TPQ Al-Maula, One Day Without Handphone, Bimbel Cendekia, HUT RI TPQ, Tirakatan, HUT RI Paesan Utara & Gembong, Karnaval, Maulid Nabi Gembong, Pasar Jajan) lengkap dengan jadwal
- Halaman baca artikel `/artikel/:id`: isi tulisan utuh 6 artikel (paragraf, subjudul, kutipan tokoh, drop cap), tombol bagikan WhatsApp/Facebook/Salin Tautan, artikel terkait, halaman 404 khusus, judul tab dinamis, header khusus dengan tombol kembali + toggle tema
- Routing react-router: `/` landing page, `/artikel/:id` halaman artikel; tombol "Baca Selengkapnya" mengarah ke halaman artikel
- Seluruh 12 section lengkap dengan data placeholder realistis (Bahasa Indonesia).
- Hero kinetik: masked line-by-line reveal, parallax background (foto masjid dusk), particles canvas, floating badges, scroll indicator.
- Lenis momentum scroll + anchor navigation halus; scroll progress bar emas di navbar.
- Dark mode (default ikut `prefers-color-scheme`, toggle di navbar, tersimpan di localStorage).
- Animated counters (24 mahasiswa, 4 sekolah, 1 kelurahan, 45 hari).
- Lightbox galeri (navigasi keyboard, zoom spring).
- Google Maps embed Kedungwuni Barat aktif.
- Quick Access Hub 14 kartu glass dengan glow warna per platform; URL placeholder di `data/links.js`.
- Editorial marquee + marquee mitra (react-fast-marquee).
- Manifest PWA + meta SEO + lang="id"; font Poppins/Inter; palet hijau #166534, emas #D4AF37, navy.
- Semua elemen interaktif punya data-testid.
- Gambar: Pexels diganti Unsplash (Pexels 503); semua URL terverifikasi HTTP 200 dan relevan isinya.

## Backlog Prioritas
- P0: Ganti foto asli kegiatan & anggota (menunggu kiriman user); ganti URL placeholder (IG, WA, Form, dst) dengan link asli; nama anggota tim asli.
- P1: Ganti foto asli kegiatan & anggota (menunggu kiriman user); ganti URL placeholder (IG, WA, Form, dst) dengan link asli; nama anggota tim asli; logo KKN & universitas asli
- P2: Buku tamu digital; countdown menuju penutupan; halaman arsip semua artikel; integrasi backend untuk artikel (CMS); lighthouse audit 95+

## Catatan
- Admin CMS: username `admin`, password `KKN55-Admin#2026` (lihat test_credentials.md) — bisa diganti via menu Profil Admin.
- Backend FastAPI melayani API CMS + file upload; konten tersimpan di MongoDB.
