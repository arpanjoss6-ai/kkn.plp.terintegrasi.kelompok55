const avatar = (name, bg, color = "fbbf24") =>
  `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=${bg}&color=${color}&size=256&bold=true&format=png`;

export const testimonials = [
  {
    id: 1,
    quote:
      "Program Sedekah Sampah membuka mata warga kami — masjid kini tidak hanya tempat ibadah, tapi juga pusat kepedulian lingkungan. Terima kasih adik-adik KKN 55.",
    name: "H. Ahmad Syaifudin",
    role: "Takmir Masjid Baitussalam",
    photo: avatar("Ahmad Syaifudin", "166534"),
  },
  {
    id: 2,
    quote:
      "Anak-anak sangat antusias mengikuti bimbingan belajar. Nilai dan semangat belajar mereka meningkat hanya dalam beberapa pekan.",
    name: "Ibu Sri Wahyuni, S.Pd.",
    role: "Guru SDN 01 Kedungwuni Barat",
    photo: avatar("Sri Wahyuni", "0f172a"),
  },
  {
    id: 3,
    quote:
      "Kolaborasi mahasiswa UIN Gusdur dengan perangkat kelurahan sangat membantu digitalisasi layanan kami. Semoga berlanjut di angkatan berikutnya.",
    name: "Bapak H. M. Choirul Anam",
    role: "Lurah Kedungwuni Barat",
    photo: avatar("Choirul Anam", "d4af37", "0f172a"),
  },
  {
    id: 4,
    quote:
      "Lewat bank sampah, saya bisa menabung sambil menjaga lingkungan. Programnya nyata dan menyentuh kebutuhan warga.",
    name: "Ibu Lastri Handayani",
    role: "Warga & Kader Bank Sampah",
    photo: avatar("Lastri Handayani", "14532d"),
  },
];
