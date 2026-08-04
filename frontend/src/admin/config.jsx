export const ICON_OPTIONS = [
  "Sparkles", "Recycle", "Coins", "GraduationCap", "BookOpen", "Leaf",
  "MonitorSmartphone", "HeartPulse", "MoonStar", "HandHeart", "BookMarked",
  "School", "Flag", "Award", "Users", "ClipboardList", "Rocket",
  "TrendingUp", "Search", "CalendarDays", "Globe", "MapPin", "FileText",
  "LayoutDashboard", "Newspaper", "Instagram", "Youtube", "Facebook",
  "Music2", "MessageCircle", "Send", "Images", "Camera", "Mail", "Phone",
  "Clock", "Share2",
];

const iconSelect = (name = "icon", label = "Icon") => ({
  name,
  label,
  type: "select",
  options: ICON_OPTIONS.map((i) => ({ value: i, label: i })),
});

const CATEGORY_OPTIONS = [
  "Eco Masjid", "Sedekah Sampah", "Pendidikan", "Keagamaan",
  "Lingkungan", "Digitalisasi", "Sosial", "Acara",
].map((c) => ({ value: c, label: c }));

const orderField = { name: "order", label: "Urutan Tampil", type: "number" };

export const programsConfig = {
  title: "Program Kerja",
  collection: "programs",
  searchKeys: ["title", "category"],
  columns: [
    { label: "Judul", render: (p) => p.title },
    { label: "Kategori", render: (p) => p.category, badge: true },
    {
      label: "Jadwal",
      render: (p) =>
        p.group === "primer" ? `${(p.steps || []).length} tahap` : p.schedule,
    },
  ],
  tabs: [
    {
      label: "Primer",
      filter: (p) => p.group === "primer",
      defaults: { group: "primer", icon: "Sparkles", category: "Eco Masjid", steps: [], order: 0 },
      fields: [
        { name: "title", label: "Judul Program", type: "text" },
        { name: "category", label: "Kategori", type: "select", options: CATEGORY_OPTIONS },
        iconSelect(),
        { name: "description", label: "Deskripsi", type: "textarea", rows: 3 },
        { name: "steps", label: "Rincian Kegiatan (tahap & jadwal)", type: "steps" },
        orderField,
      ],
    },
    {
      label: "Sekunder",
      filter: (p) => p.group === "sekunder",
      defaults: { group: "sekunder", icon: "CalendarDays", category: "Sosial", order: 0 },
      fields: [
        { name: "title", label: "Judul Kegiatan", type: "text" },
        { name: "category", label: "Kategori", type: "select", options: CATEGORY_OPTIONS },
        iconSelect(),
        { name: "schedule", label: "Jadwal", type: "text", placeholder: "Setiap Malam Jum'at" },
        orderField,
      ],
    },
  ],
};

export const articlesConfig = {
  title: "Artikel",
  collection: "articles",
  searchKeys: ["title", "category", "author"],
  columns: [
    {
      label: "Artikel",
      render: (a) => (
        <span className="flex items-center gap-3">
          {a.thumbnail && (
            <img src={a.thumbnail} alt="" className="h-10 w-14 rounded-lg object-cover" />
          )}
          <span className="line-clamp-1 font-medium">{a.title}</span>
        </span>
      ),
    },
    { label: "Kategori", render: (a) => a.category, badge: true },
    {
      label: "Status",
      render: (a) => a.status || "publish",
      badge: true,
    },
    { label: "Tanggal", render: (a) => a.date },
  ],
  defaults: {
    status: "draft", author: "Redaksi KKN 55", category: "Eco Masjid",
    content: [], order: 0,
  },
  fields: [
    { name: "title", label: "Judul Artikel", type: "text" },
    { name: "category", label: "Kategori", type: "select", options: CATEGORY_OPTIONS },
    { name: "status", label: "Status", type: "select", options: [
      { value: "publish", label: "Publish" },
      { value: "draft", label: "Draft" },
    ] },
    { name: "date", label: "Tanggal", type: "text", placeholder: "12 Agustus 2026" },
    { name: "readTime", label: "Waktu Baca", type: "text", placeholder: "4 menit" },
    { name: "author", label: "Penulis", type: "text" },
    { name: "summary", label: "Ringkasan", type: "textarea", rows: 2 },
    { name: "thumbnail", label: "Thumbnail", type: "image" },
    { name: "content", label: "Isi Artikel", type: "blocks" },
    orderField,
  ],
};

export const galleryConfig = {
  title: "Galeri",
  collection: "gallery",
  searchKeys: ["caption", "category"],
  columns: [
    {
      label: "Foto",
      render: (g) => (
        <span className="flex items-center gap-3">
          {g.src && <img src={g.src} alt="" className="h-10 w-14 rounded-lg object-cover" />}
          <span className="line-clamp-1">{g.caption}</span>
        </span>
      ),
    },
    { label: "Kategori", render: (g) => g.category, badge: true },
  ],
  defaults: { tall: false, order: 0 },
  fields: [
    { name: "src", label: "Foto", type: "image" },
    { name: "caption", label: "Judul / Caption", type: "text" },
    { name: "category", label: "Kategori", type: "select", options: CATEGORY_OPTIONS },
    { name: "tall", label: "Format tinggi (portrait)", type: "toggle" },
    orderField,
  ],
};

export const teamConfig = {
  title: "Tim KKN",
  collection: "team",
  searchKeys: ["name", "role"],
  columns: [
    {
      label: "Anggota",
      render: (m) => (
        <span className="flex items-center gap-3">
          {m.photo && (
            <img src={m.photo} alt="" className="h-10 w-10 rounded-full object-cover" />
          )}
          <span className="font-medium">{m.name}</span>
        </span>
      ),
    },
    { label: "Jabatan", render: (m) => m.role, badge: true },
    { label: "NIM", render: (m) => m.nim || "—" },
  ],
  defaults: { order: 0 },
  fields: [
    { name: "photo", label: "Foto", type: "image" },
    { name: "name", label: "Nama Lengkap", type: "text" },
    { name: "role", label: "Jabatan", type: "text" },
    { name: "nim", label: "NIM", type: "text" },
    { name: "prodi", label: "Program Studi", type: "text" },
    { name: "instagram", label: "Instagram", type: "text", placeholder: "https://instagram.com/..." },
    { name: "whatsapp", label: "WhatsApp", type: "text", placeholder: "https://wa.me/62..." },
    { name: "email", label: "Email", type: "text" },
    orderField,
  ],
};

export const faqsConfig = {
  title: "FAQ",
  collection: "faqs",
  searchKeys: ["question"],
  columns: [
    { label: "Pertanyaan", render: (f) => f.question },
    { label: "Jawaban", render: (f) => <span className="line-clamp-1">{f.answer}</span> },
  ],
  defaults: { order: 0 },
  fields: [
    { name: "question", label: "Pertanyaan", type: "text" },
    { name: "answer", label: "Jawaban", type: "textarea", rows: 4 },
    orderField,
  ],
};

export const timelineConfig = {
  title: "Timeline",
  collection: "timeline",
  searchKeys: ["title"],
  columns: [
    { label: "Fase", render: (t) => t.phase, badge: true },
    { label: "Judul", render: (t) => t.title },
    { label: "Tanggal", render: (t) => t.date },
  ],
  defaults: { icon: "CalendarDays", order: 0 },
  fields: [
    { name: "phase", label: "Nomor Fase", type: "text", placeholder: "01" },
    { name: "title", label: "Judul", type: "text" },
    { name: "date", label: "Tanggal", type: "text" },
    { name: "description", label: "Deskripsi", type: "textarea", rows: 3 },
    iconSelect(),
    orderField,
  ],
};

export const linksConfig = {
  title: "Link Penting",
  collection: "links",
  searchKeys: ["label", "description"],
  columns: [
    { label: "Nama", render: (l) => l.label },
    { label: "URL", render: (l) => <span className="line-clamp-1 max-w-56 text-xs">{l.url}</span> },
    { label: "Status", render: (l) => (l.active === false ? "Nonaktif" : "Aktif"), badge: true },
  ],
  defaults: { icon: "Globe", active: true, span: "", order: 0 },
  fields: [
    { name: "label", label: "Nama Link", type: "text" },
    { name: "description", label: "Deskripsi Singkat", type: "text" },
    { name: "url", label: "URL", type: "text", placeholder: "https://..." },
    iconSelect(),
    { name: "span", label: "Ukuran Kartu", type: "select", options: [
      { value: "", label: "Normal" },
      { value: "md:col-span-2", label: "Lebar (2 kolom)" },
    ] },
    { name: "active", label: "Aktif", type: "toggle" },
    orderField,
  ],
};

export const partnersConfig = {
  title: "Sponsor & Mitra",
  collection: "partners",
  searchKeys: ["name"],
  columns: [
    { label: "Nama", render: (p) => p.name },
    { label: "Website", render: (p) => p.url || "—" },
  ],
  defaults: { order: 0 },
  fields: [
    { name: "name", label: "Nama Sponsor / Mitra", type: "text" },
    { name: "url", label: "Website", type: "text", placeholder: "https://..." },
    { name: "logo", label: "Logo (opsional)", type: "image" },
    orderField,
  ],
};

export const testimonialsConfig = {
  title: "Testimoni",
  collection: "testimonials",
  searchKeys: ["name", "role"],
  columns: [
    { label: "Nama", render: (t) => t.name },
    { label: "Peran", render: (t) => t.role, badge: true },
    { label: "Kutipan", render: (t) => <span className="line-clamp-1">{t.quote}</span> },
  ],
  defaults: { order: 0 },
  fields: [
    { name: "quote", label: "Kutipan", type: "textarea", rows: 4 },
    { name: "name", label: "Nama", type: "text" },
    { name: "role", label: "Peran / Jabatan", type: "text" },
    { name: "photo", label: "Foto", type: "image" },
    orderField,
  ],
};

export const heroSettingsConfig = {
  key: "hero",
  title: "Hero Section",
  description: "Atur judul, tagline, latar, dan tombol utama halaman depan.",
  defaults: {},
  groups: [
    {
      legend: "Teks Utama",
      fields: [
        { name: "line1", label: "Judul Baris 1", type: "text" },
        { name: "line2", label: "Judul Baris 2", type: "text" },
        { name: "line3", label: "Judul Baris 3 (emas)", type: "text" },
        { name: "village", label: "Lokasi (chip)", type: "text" },
        { name: "subtitle", label: "Subjudul", type: "text" },
        { name: "tagline", label: "Tagline", type: "textarea", rows: 2 },
      ],
    },
    {
      legend: "Visual",
      fields: [
        { name: "background", label: "Background Hero", type: "image" },
        { name: "logoKkn", label: "Logo KKN (opsional)", type: "image" },
        { name: "logoUniv", label: "Logo Universitas (opsional)", type: "image" },
      ],
    },
    {
      legend: "Tombol",
      fields: [
        { name: "ctaPrimaryLabel", label: "Tombol Utama — Teks", type: "text" },
        { name: "ctaPrimaryTarget", label: "Tombol Utama — Target", type: "text", placeholder: "#tentang" },
        { name: "ctaSecondaryLabel", label: "Tombol Kedua — Teks", type: "text" },
        { name: "ctaSecondaryTarget", label: "Tombol Kedua — Target", type: "text", placeholder: "#tim" },
      ],
    },
  ],
};

export const aboutSettingsConfig = {
  key: "about",
  title: "Tentang",
  description: "Deskripsi, foto, sorotan program, dan statistik pada bagian Tentang.",
  defaults: {},
  groups: [
    {
      legend: "Konten",
      fields: [
        { name: "title", label: "Judul", type: "text" },
        { name: "paragraphs", label: "Paragraf Deskripsi", type: "lines", rows: 6, hint: "Satu paragraf per baris" },
        { name: "photo", label: "Foto", type: "image" },
        { name: "period", label: "Periode (badge foto)", type: "text" },
        { name: "highlights", label: "Sorotan Program (chips)", type: "lines", rows: 4 },
      ],
    },
    {
      legend: "Statistik (Counter)",
      fields: [{ name: "stats", label: "Statistik", type: "stats", icons: ["Users", "School", "MapPin", "CalendarDays", "Flag", "Award"] }],
    },
  ],
};

export const contactSettingsConfig = {
  key: "contact",
  title: "Kontak",
  description: "Alamat, WhatsApp, email, peta, dan media sosial.",
  defaults: {},
  groups: [
    {
      legend: "Informasi Kontak",
      fields: [
        { name: "address", label: "Alamat Posko", type: "text" },
        { name: "whatsappDisplay", label: "Nomor WhatsApp (tampilan)", type: "text" },
        { name: "whatsappUrl", label: "Link WhatsApp", type: "text", placeholder: "https://wa.me/62..." },
        { name: "email", label: "Email", type: "text" },
        { name: "hours", label: "Jam Operasional", type: "text" },
      ],
    },
    {
      legend: "Peta",
      fields: [
        { name: "mapsEmbedUrl", label: "Google Maps Embed URL", type: "textarea", rows: 2 },
        { name: "mapsUrl", label: "Google Maps Link", type: "text" },
      ],
    },
    {
      legend: "Media Sosial",
      fields: [{ name: "socials", label: "URL Media Sosial", type: "socials" }],
    },
  ],
};

export const siteSettingsConfig = {
  key: "site",
  title: "Pengaturan Website",
  description: "Identitas website yang tampil di footer dan seluruh halaman.",
  defaults: {},
  groups: [
    {
      legend: "Identitas",
      fields: [
        { name: "name", label: "Nama Website", type: "text" },
        { name: "group", label: "Kelompok", type: "text" },
        { name: "tagline", label: "Tagline", type: "text" },
        { name: "university", label: "Universitas", type: "text" },
        { name: "universityShort", label: "Universitas (singkat)", type: "text" },
        { name: "village", label: "Kelurahan", type: "text" },
        { name: "period", label: "Periode KKN", type: "text" },
      ],
    },
  ],
};
