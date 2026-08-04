const avatar = (name, bg, color = "fbbf24") =>
  `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=${bg}&color=${color}&size=512&bold=true&format=png`;

export const team = [
  {
    id: 1,
    name: "M. Rizky Pratama",
    role: "Ketua Kelompok",
    photo: avatar("Rizky Pratama", "166534"),
    socials: { instagram: "#", linkedin: "#" },
  },
  {
    id: 2,
    name: "Nabila Aisyah Putri",
    role: "Wakil Ketua",
    photo: avatar("Nabila Aisyah", "0f172a"),
    socials: { instagram: "#", linkedin: "#" },
  },
  {
    id: 3,
    name: "Siti Maryam Zahra",
    role: "Sekretaris",
    photo: avatar("Siti Maryam", "d4af37", "0f172a"),
    socials: { instagram: "#", linkedin: "#" },
  },
  {
    id: 4,
    name: "Ahmad Fauzan Al-Hakim",
    role: "Bendahara",
    photo: avatar("Ahmad Fauzan", "14532d"),
    socials: { instagram: "#", linkedin: "#" },
  },
  {
    id: 5,
    name: "Dewi Lestari Ningrum",
    role: "Koord. Pendidikan",
    photo: avatar("Dewi Lestari", "166534"),
    socials: { instagram: "#", linkedin: "#" },
  },
  {
    id: 6,
    name: "Farhan Hidayatullah",
    role: "Koord. Keagamaan",
    photo: avatar("Farhan Hidayat", "0f172a"),
    socials: { instagram: "#", linkedin: "#" },
  },
  {
    id: 7,
    name: "Intan Permata Sari",
    role: "Koord. Lingkungan",
    photo: avatar("Intan Permata", "d4af37", "0f172a"),
    socials: { instagram: "#", linkedin: "#" },
  },
  {
    id: 8,
    name: "Bagas Saputra Wijaya",
    role: "Koord. Media & Publikasi",
    photo: avatar("Bagas Saputra", "14532d"),
    socials: { instagram: "#", linkedin: "#" },
  },
];
