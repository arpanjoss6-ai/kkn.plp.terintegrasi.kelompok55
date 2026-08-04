import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { articles as staticArticles } from "../data/articles";
import { faqs as staticFaqs } from "../data/faq";
import { gallery as staticGallery } from "../data/gallery";
import { images } from "../data/images";
import { quickLinks as staticLinks } from "../data/links";
import { partners as staticPartners } from "../data/partners";
import {
  primerPrograms as staticPrimer,
  sekunderPrograms as staticSekunder,
} from "../data/programs";
import { siteConfig } from "../data/siteConfig";
import { stats as staticStats } from "../data/stats";
import { team as staticTeam } from "../data/team";
import { testimonials as staticTestimonials } from "../data/testimonials";
import { timeline as staticTimeline } from "../data/timeline";

const API = process.env.REACT_APP_BACKEND_URL;

const defaults = {
  primerPrograms: staticPrimer,
  sekunderPrograms: staticSekunder,
  articles: staticArticles,
  gallery: staticGallery,
  team: staticTeam,
  faqs: staticFaqs,
  timeline: staticTimeline,
  quickLinks: staticLinks,
  partners: staticPartners.map((name) => ({ name, url: "", logo: "" })),
  testimonials: staticTestimonials,
  hero: {
    line1: "KKN-PLP Terintegrasi",
    line2: "Angkatan 65",
    line3: siteConfig.group,
    village: siteConfig.village,
    subtitle: siteConfig.subtitle,
    tagline: siteConfig.tagline,
    background: images.hero,
    logoKkn: "",
    logoUniv: "",
    ctaPrimaryLabel: "Jelajahi Website",
    ctaPrimaryTarget: "#tentang",
    ctaSecondaryLabel: "Profil Kelompok",
    ctaSecondaryTarget: "#tim",
  },
  about: {
    eyebrow: "Tentang Kami",
    title: "Mengabdi dengan Hati, Mengajar dengan Ilmu",
    paragraphs: [
      `KKN-PLP Terintegrasi Angkatan 65 ${siteConfig.group} adalah program pengabdian masyarakat ${siteConfig.university} yang digabungkan dengan Praktik Lapangan Persekolahan — mahasiswa mengabdi di tengah warga sekaligus mengajar di sekolah-sekolah mitra.`,
      `Berpusat di ${siteConfig.village}, kami mengusung gerakan Eco Masjid melalui Sedekah Sampah: menjadikan rumah ibadah sebagai pusat peradaban hijau, tempat jamaah bersedekah dengan sampah terpilah demi lingkungan yang bersih dan berkah.`,
    ],
    photo: images.about,
    period: siteConfig.period,
    highlights: ["Eco Masjid", "BPJS Ketenagakerjaan", "Bimbel Cendekia", "TPQ Al-Maula"],
    stats: staticStats,
  },
  contact: {
    address: siteConfig.address,
    whatsappUrl: siteConfig.whatsappUrl,
    whatsappDisplay: siteConfig.whatsappDisplay,
    email: siteConfig.email,
    mapsEmbedUrl: siteConfig.mapsEmbedUrl,
    mapsUrl: siteConfig.mapsUrl,
    hours: "Senin — Sabtu, 08.00–20.00 WIB",
    socials: siteConfig.socials,
  },
  site: {
    name: siteConfig.name,
    group: siteConfig.group,
    tagline: siteConfig.tagline,
    university: siteConfig.university,
    universityShort: siteConfig.universityShort,
    village: siteConfig.village,
    period: siteConfig.period,
  },
};

const nonEmpty = (arr) => Array.isArray(arr) && arr.length > 0;

const ContentContext = createContext(defaults);

export const useContent = () => useContext(ContentContext);

export const ContentProvider = ({ children }) => {
  const [remote, setRemote] = useState(null);

  useEffect(() => {
    fetch(`${API}/api/public/content`)
      .then((r) => (r.ok ? r.json() : null))
      .then(setRemote)
      .catch(() => {});
  }, []);

  const value = useMemo(() => {
    if (!remote) return defaults;
    const c = remote.collections || {};
    const s = remote.settings || {};
    const programs = nonEmpty(c.programs) ? c.programs : null;
    return {
      primerPrograms: programs
        ? programs.filter((p) => p.group === "primer")
        : defaults.primerPrograms,
      sekunderPrograms: programs
        ? programs.filter((p) => p.group === "sekunder")
        : defaults.sekunderPrograms,
      articles: nonEmpty(c.articles)
        ? c.articles.filter((a) => a.status !== "draft")
        : defaults.articles,
      gallery: nonEmpty(c.gallery) ? c.gallery : defaults.gallery,
      team: nonEmpty(c.team) ? c.team : defaults.team,
      faqs: nonEmpty(c.faqs) ? c.faqs : defaults.faqs,
      timeline: nonEmpty(c.timeline) ? c.timeline : defaults.timeline,
      quickLinks: nonEmpty(c.links)
        ? c.links.filter((l) => l.active !== false)
        : defaults.quickLinks,
      partners: nonEmpty(c.partners) ? c.partners : defaults.partners,
      testimonials: nonEmpty(c.testimonials)
        ? c.testimonials
        : defaults.testimonials,
      hero: { ...defaults.hero, ...(s.hero || {}) },
      about: { ...defaults.about, ...(s.about || {}) },
      contact: { ...defaults.contact, ...(s.contact || {}) },
      site: { ...defaults.site, ...(s.site || {}) },
    };
  }, [remote]);

  return (
    <ContentContext.Provider value={value}>{children}</ContentContext.Provider>
  );
};
