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
import { quickLinks } from "../data/links";
import { scrollToId } from "../hooks/useLenis";

const iconMap = {
  Instagram,
  Youtube,
  Music2,
  Facebook,
  MessageCircle,
  Send,
  ClipboardList,
  CalendarDays,
  Globe,
  MapPin,
  BookMarked,
  FileText,
  LayoutDashboard,
  Newspaper,
};

export const QuickLinks = () => (
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
          const Icon = iconMap[l.icon];
          const internal = l.url.startsWith("#");
          return (
            <motion.a
              key={l.id}
              data-testid={`link-card-${l.id}`}
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
              className={`group relative overflow-hidden rounded-3xl glass p-6 transition-[transform,box-shadow] duration-300 hover:-translate-y-2 ${l.glow} ${l.span}`}
            >
              <div
                className={`mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${l.color} text-white shadow-lg transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110`}
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
