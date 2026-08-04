import { motion } from "framer-motion";
import {
  BookMarked,
  CalendarDays,
  ClipboardList,
  ExternalLink,
  Facebook,
  FileText,
  Globe,
  Instagram,
  LayoutDashboard,
  MapPin,
  MessageCircle,
  Music2,
  Newspaper,
  Send,
  Youtube,
} from "lucide-react";
import { SectionHeading } from "../components/SectionHeading";
import { useContent } from "../hooks/useContent";
import { scrollToId } from "../hooks/useLenis";

const iconMap = {
  Instagram, Youtube, Music2, Facebook, MessageCircle, Send, ClipboardList,
  CalendarDays, Globe, MapPin, BookMarked, FileText, LayoutDashboard, Newspaper,
};

const ICON_THEMES = {
  Instagram: { color: "from-pink-500 to-rose-600", glow: "hover:shadow-[0_0_44px_-10px_rgba(236,72,153,0.55)]" },
  Youtube: { color: "from-red-500 to-red-700", glow: "hover:shadow-[0_0_44px_-10px_rgba(239,68,68,0.55)]" },
  Music2: { color: "from-slate-600 to-slate-900", glow: "hover:shadow-[0_0_44px_-10px_rgba(15,23,42,0.55)]" },
  Facebook: { color: "from-blue-500 to-blue-700", glow: "hover:shadow-[0_0_44px_-10px_rgba(59,130,246,0.55)]" },
  MessageCircle: { color: "from-green-500 to-emerald-600", glow: "hover:shadow-[0_0_44px_-10px_rgba(34,197,94,0.55)]" },
  Send: { color: "from-emerald-400 to-teal-600", glow: "hover:shadow-[0_0_44px_-10px_rgba(16,185,129,0.55)]" },
  ClipboardList: { color: "from-violet-500 to-purple-700", glow: "hover:shadow-[0_0_44px_-10px_rgba(139,92,246,0.55)]" },
  CalendarDays: { color: "from-amber-400 to-orange-500", glow: "hover:shadow-[0_0_44px_-10px_rgba(245,158,11,0.55)]" },
  Globe: { color: "from-green-600 to-emerald-800", glow: "hover:shadow-[0_0_44px_-10px_rgba(22,163,74,0.55)]" },
  MapPin: { color: "from-rose-500 to-red-600", glow: "hover:shadow-[0_0_44px_-10px_rgba(244,63,94,0.55)]" },
  BookMarked: { color: "from-indigo-500 to-blue-800", glow: "hover:shadow-[0_0_44px_-10px_rgba(99,102,241,0.55)]" },
  FileText: { color: "from-teal-500 to-cyan-600", glow: "hover:shadow-[0_0_44px_-10px_rgba(20,184,166,0.55)]" },
  LayoutDashboard: { color: "from-gold-400 to-amber-600", glow: "hover:shadow-[0_0_44px_-10px_rgba(212,175,55,0.6)]" },
  Newspaper: { color: "from-cyan-500 to-sky-700", glow: "hover:shadow-[0_0_44px_-10px_rgba(6,182,212,0.55)]" },
  default: { color: "from-brand-600 to-brand-800", glow: "hover:shadow-[0_0_44px_-10px_rgba(22,101,52,0.55)]" },
};

export const QuickLinks = () => {
  const { quickLinks } = useContent();
  return (
    <section id="tautan" data-testid="links-hub-section" className="section-pad relative overflow-hidden">
      <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-[42rem] -translate-x-1/2 rounded-full bg-gold-400/10 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          number="07"
          eyebrow="Quick Access Hub"
          title="Semua Tautan Penting, Satu Tempat"
          description="Akses cepat ke media sosial, dokumentasi, laporan, dan kanal resmi KKN 55."
          align="center"
        />

        <div className="mt-14 grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-4">
          {quickLinks.map((l, i) => {
            const Icon = iconMap[l.icon] || Globe;
            const theme = l.color
              ? { color: l.color, glow: l.glow || ICON_THEMES.default.glow }
              : ICON_THEMES[l.icon] || ICON_THEMES.default;
            const internal = (l.url || "").startsWith("#");
            return (
              <motion.a
                key={l.id || l.label}
                data-testid={`link-card-${l.label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                href={l.url}
                target={internal ? undefined : "_blank"}
                rel={internal ? undefined : "noopener noreferrer"}
                onClick={
                  internal
                    ? (e) => {
                        e.preventDefault();
                        scrollToId(l.url);
                      }
                    : undefined
                }
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: (i % 4) * 0.06 }}
                className={`group relative overflow-hidden rounded-3xl glass p-6 transition-[transform,box-shadow] duration-300 hover:-translate-y-2 ${theme.glow} ${l.span || ""}`}
              >
                <div
                  className={`mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${theme.color} text-white shadow-lg transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110`}
                >
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-display text-sm font-semibold tracking-tight text-foreground sm:text-base">
                  {l.label}
                </h3>
                <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground sm:text-xs">
                  {l.description}
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-brand-700 transition-colors duration-300 group-hover:text-gold-600 dark:text-gold-400">
                  Buka
                  <ExternalLink className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
};
