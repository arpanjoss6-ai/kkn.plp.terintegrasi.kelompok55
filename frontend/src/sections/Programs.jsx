import { motion } from "framer-motion";
import {
  Award,
  BookMarked,
  BookOpen,
  CalendarDays,
  Coins,
  Flag,
  GraduationCap,
  HandHeart,
  MonitorSmartphone,
  MoonStar,
  School,
  Sparkles,
} from "lucide-react";
import { SectionHeading } from "../components/SectionHeading";
import { primerPrograms, sekunderPrograms } from "../data/programs";

const iconMap = {
  Sparkles,
  HandHeart,
  BookOpen,
  BookMarked,
  GraduationCap,
  MonitorSmartphone,
  School,
  Flag,
  MoonStar,
  Award,
  Coins,
};

const categoryColors = {
  Pendidikan: "bg-blue-500/10 text-blue-700 ring-blue-500/20 dark:text-blue-300",
  Keagamaan: "bg-violet-500/10 text-violet-700 ring-violet-500/20 dark:text-violet-300",
  Lingkungan: "bg-emerald-500/10 text-emerald-700 ring-emerald-500/20 dark:text-emerald-300",
  "Eco Masjid": "bg-gold-400/15 text-gold-700 ring-gold-400/30 dark:text-gold-300",
  Sosial: "bg-rose-500/10 text-rose-700 ring-rose-500/20 dark:text-rose-300",
  Acara: "bg-amber-500/10 text-amber-700 ring-amber-500/20 dark:text-amber-300",
};

const GroupLabel = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 14 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.5 }}
    className="flex items-center gap-4"
  >
    <span className="rounded-full bg-gradient-to-r from-brand-700 to-brand-900 px-5 py-2 font-display text-xs font-bold uppercase tracking-[0.25em] text-gold-400 shadow-lg shadow-brand-950/20">
      {children}
    </span>
    <span className="h-px flex-1 bg-gradient-to-r from-gold-400/60 to-transparent" />
  </motion.div>
);

const PrimerCard = ({ program, wide }) => {
  const Icon = iconMap[program.icon];
  return (
    <motion.article
      data-testid={`program-primer-${program.id}`}
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65 }}
      className={`group relative overflow-hidden rounded-3xl glass p-8 shadow-xl shadow-brand-950/5 transition-shadow duration-300 hover:shadow-2xl hover:shadow-brand-950/10 sm:p-10 ${
        wide ? "lg:col-span-3" : "lg:col-span-2"
      }`}
    >
      <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gradient-to-br from-brand-500/10 to-gold-400/15 blur-3xl" />
      <div className="relative">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-700 to-brand-950 text-gold-400 shadow-lg shadow-brand-950/25 transition-transform duration-300 group-hover:rotate-3 group-hover:scale-110">
            <Icon className="h-6 w-6" />
          </div>
          <div>
            <span
              className={`inline-block rounded-full px-3 py-1 text-[11px] font-semibold ring-1 ${categoryColors[program.category]}`}
            >
              {program.category}
            </span>
            <h3 className="mt-1.5 font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              {program.title}
            </h3>
          </div>
        </div>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
          {program.description}
        </p>

        <ol className="mt-7 space-y-3.5">
          {program.steps.map((step, i) => (
            <motion.li
              key={step.text}
              data-testid={`program-step-${program.id}-${i + 1}`}
              initial={{ opacity: 0, x: -18 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: i * 0.07 }}
              className="flex items-start gap-4 rounded-2xl bg-background/60 p-4 ring-1 ring-border/70 transition-colors duration-300 hover:ring-gold-400/40 dark:bg-slate-950/40"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-gold-400 to-gold-600 font-display text-xs font-bold text-slate-900 shadow">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold leading-snug text-foreground">
                  {step.text}
                </p>
                <span className="mt-1.5 inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-wide text-brand-700 dark:text-gold-400">
                  <CalendarDays className="h-3.5 w-3.5" />
                  {step.date}
                </span>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </motion.article>
  );
};

export const Programs = () => (
  <section
    id="program"
    data-testid="programs-section"
    className="section-pad relative bg-brand-50/60 dark:bg-slate-900/40"
  >
    <div className="mx-auto max-w-7xl px-5 sm:px-8">
      <SectionHeading
        number="02"
        eyebrow="Program Kerja"
        title="Dua Program Primer, Sebelas Program Sekunder"
        description="Disusun dari hasil observasi langsung — dipimpin Gerakan Eco Masjid dan pendampingan BPJS Ketenagakerjaan, didukung belasan kegiatan rutin dan acara besar bersama warga."
      />

      <div className="mt-16 space-y-8">
        <GroupLabel>Primer</GroupLabel>
        <div className="grid gap-6 lg:grid-cols-5">
          <PrimerCard program={primerPrograms[0]} wide />
          <PrimerCard program={primerPrograms[1]} />
        </div>
      </div>

      <div className="mt-16 space-y-8">
        <GroupLabel>Sekunder</GroupLabel>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {sekunderPrograms.map((p, i) => {
            const Icon = iconMap[p.icon];
            return (
              <motion.article
                key={p.id}
                data-testid={`program-sekunder-${p.id}`}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: (i % 4) * 0.07 }}
                className="group relative overflow-hidden rounded-3xl glass p-6 transition-[transform,box-shadow] duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-brand-950/10"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-700 to-brand-950 text-gold-400 shadow-lg shadow-brand-950/25 transition-transform duration-300 group-hover:rotate-3 group-hover:scale-110">
                  <Icon className="h-5 w-5" />
                </div>
                <span
                  className={`inline-block rounded-full px-3 py-1 text-[11px] font-semibold ring-1 ${categoryColors[p.category]}`}
                >
                  {p.category}
                </span>
                <h3 className="mt-3 font-display text-base font-semibold leading-snug tracking-tight text-foreground sm:text-lg">
                  {p.title}
                </h3>
                <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-brand-700/10 px-3 py-1.5 text-[11px] font-semibold tracking-wide text-brand-800 ring-1 ring-brand-700/15 dark:bg-gold-400/10 dark:text-gold-300 dark:ring-gold-400/20">
                  <CalendarDays className="h-3.5 w-3.5" />
                  {p.schedule}
                </span>
              </motion.article>
            );
          })}
        </div>
      </div>
    </div>
  </section>
);
