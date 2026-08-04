import { motion } from "framer-motion";
import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  MessageCircle,
  Music2,
  Youtube,
} from "lucide-react";
import { siteConfig } from "../data/siteConfig";
import { useContent } from "../hooks/useContent";
import { scrollToId } from "../hooks/useLenis";
import { LogoMark } from "./LogoMark";

const programLinks = [
  { label: "Eco Masjid", href: "#program" },
  { label: "BPJS Ketenagakerjaan", href: "#program" },
  { label: "Bimbingan Belajar Cendekia", href: "#program" },
  { label: "TPQ Al-Maula", href: "#program" },
];

export const Footer = () => {
  const { contact, site } = useContent();

  const socials = [
    { label: "Instagram", icon: Instagram, url: contact.socials?.instagram, testid: "footer-social-instagram" },
    { label: "YouTube", icon: Youtube, url: contact.socials?.youtube, testid: "footer-social-youtube" },
    { label: "TikTok", icon: Music2, url: contact.socials?.tiktok, testid: "footer-social-tiktok" },
    { label: "Facebook", icon: Facebook, url: contact.socials?.facebook, testid: "footer-social-facebook" },
    { label: "WhatsApp", icon: MessageCircle, url: contact.socials?.whatsapp, testid: "footer-social-whatsapp" },
  ];

  const go = (e, href) => {
    e.preventDefault();
    scrollToId(href);
  };

  return (
    <footer
      data-testid="footer-section"
      className="relative overflow-hidden bg-slate-950 text-white"
    >
      <div className="pointer-events-none absolute -left-32 top-0 h-96 w-96 rounded-full bg-brand-700/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-gold-400/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 pb-10 pt-20 sm:px-8 sm:pt-24">
        <motion.h2
          data-testid="footer-cta-heading"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl"
        >
          Mari{" "}
          <span className="text-gradient-gold animate-gradient-x">
            Berkolaborasi
          </span>{" "}
          untuk {site.village}.
        </motion.h2>

        <div className="mt-16 grid gap-12 border-t border-white/10 pt-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <LogoMark light />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/60">
              {site.tagline} Program pengabdian dan pendidikan terpadu{" "}
              {site.university}.
            </p>
            <div className="mt-6 flex gap-2.5">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.url || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid={s.testid}
                  aria-label={s.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-white/70 ring-1 ring-white/10 transition-all duration-300 hover:-translate-y-1 hover:bg-gold-400 hover:text-slate-900"
                >
                  <s.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-gold-400">
              Quick Menu
            </h3>
            <ul className="mt-5 space-y-3">
              {siteConfig.navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => go(e, link.href)}
                    data-testid={`footer-menu-${link.href.slice(1)}`}
                    className="text-sm text-white/60 transition-colors duration-200 hover:text-gold-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-gold-400">
              Program Unggulan
            </h3>
            <ul className="mt-5 space-y-3">
              {programLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => go(e, link.href)}
                    className="text-sm text-white/60 transition-colors duration-200 hover:text-gold-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-gold-400">
              Kontak
            </h3>
            <ul className="mt-5 space-y-4 text-sm text-white/60">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
                <span>{contact.address}</span>
              </li>
              <li className="flex gap-3">
                <MessageCircle className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
                <a
                  href={contact.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors duration-200 hover:text-gold-300"
                >
                  {contact.whatsappDisplay}
                </a>
              </li>
              <li className="flex gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
                <a
                  href={`mailto:${contact.email}`}
                  className="transition-colors duration-200 hover:text-gold-300"
                >
                  {contact.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-xs text-white/45">
            © 2026 {site.name} {site.group} • {site.village}. All rights
            reserved.
          </p>
          <div className="flex items-center gap-5">
            <p className="text-xs text-white/45">{site.university} • LP2M</p>
            <a
              href="/admin/login"
              data-testid="footer-admin-login-link"
              className="rounded-full bg-white/5 px-4 py-1.5 text-xs font-semibold text-white/55 ring-1 ring-white/10 transition-colors duration-200 hover:bg-gold-400 hover:text-slate-900"
            >
              Login Admin
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
