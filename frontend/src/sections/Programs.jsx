import { motion } from "framer-motion";
import {
  BookOpen,
  Coins,
  GraduationCap,
  HeartPulse,
  Leaf,
  MonitorSmartphone,
  MoonStar,
  Recycle,
  Sparkles,
} from "lucide-react";
import { SectionHeading } from "../components/SectionHeading";
import { programs } from "../data/programs";

const iconMap = {
  Sparkles,
  Recycle,
  Coins,
  GraduationCap,
  BookOpen,
  Leaf,
  MonitorSmartphone,
  HeartPulse,
  MoonStar,
};

const categoryColors = {
  Pendidikan: "bg-blue-500/10 text-blue-700 ring-blue-500/20 dark:text-blue-300",
  Keagamaan: "bg-violet-500/10 text-violet-700 ring-violet-500/20 dark:text-violet-300",
  Lingkungan: "bg-emerald-500/10 text-emerald-700 ring-emerald-500/20 dark:text-emerald-300",
  "Eco Masjid": "bg-gold-400/15 text-gold-700 ring-gold-400/30 dark:text-gold-300",
  "Sedekah Sampah": "bg-teal-500/10 text-teal-700 ring-teal-500/20 dark:text-teal-300",
  Digitalisasi: "bg-indigo-500/10 text-indigo-700 ring-indigo-500/20 dark:text-indigo-300",
  Sosial: "bg-rose-500/10 text-rose-700 ring-rose-500/20 dark:text-rose-300",
};

export const Programs = () => (
  <section
    id="program"
    data-testid="programs-section"
    className="section-pad relative bg-brand-50/60 dark:bg-slate-900/40"
  >
    <div className="mx-auto max-w-7xl px-5 sm:px-8">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading
          number="02"
          eyebrow="Program Kerja"
          title="Sembilan Program, Satu Tujuan"
          description="Dirancang dari hasil observasi langsung — setiap program menjawab kebutuhan nyata warga Kedungwuni Barat."
        />
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap gap-2"
        >
          {Object.keys(categoryColors).map((c) => (
            <span
              key={c}
              className={`rounded-full px-3.5 py-1.5 text-[11px] font-semibold ring-1 ${categoryColors[c]}`}
            >
              {c}
            </span>
          ))}
        </motion.div>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {programs.map((p, i) => {
          const Icon = iconMap[p.icon];
          return (
            <motion.article
              key={p.id}
              data-testid={`program-card-${p.id}`}
              initial={{ opacity: 0, y: 34 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: (i % 4) * 0.08 }}
              className={`group relative overflow-hidden rounded-3xl glass p-8 transition-[transform,box-shadow] duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-brand-950/10 ${p.span}`}
            >
              <div className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-gradient-to-br from-brand-500/10 to-gold-400/15 blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="relative">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-700 to-brand-950 text-gold-400 shadow-lg shadow-brand-950/25 transition-transform duration-300 group-hover:rotate-3 group-hover:scale-110">
                  <Icon className="h-6 w-6" />
                </div>
                <span
                  className={`inline-block rounded-full px-3 py-1 text-[11px] font-semibold ring-1 ${categoryColors[p.category]}`}
                >
                  {p.category}
                </span>
                <h3 className="mt-4 font-display text-xl font-semibold tracking-tight text-foreground">
                  {p.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                  {p.description}
                </p>
              </div>
            </motion.article>
          );
        })}
      </div>
    </div>
  </section>
);
