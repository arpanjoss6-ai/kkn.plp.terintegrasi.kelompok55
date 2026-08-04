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
- P1: Halaman detail artikel (route baca lengkap); logo KKN & universitas asli; nomor WA & email asli.
- P2: Buku tamu digital; countdown menuju penutupan; integrasi backend untuk artikel/arsip; lighthouse audit 95+.

## Catatan
- Tidak ada autentikasi — test_credentials.md tidak diperlukan.
- Backend FastAPI masih template (Hello World) — belum dibutuhkan.
