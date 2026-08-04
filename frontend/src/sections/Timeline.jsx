import { motion } from "framer-motion";
import {
  ClipboardList,
  Flag,
  Rocket,
  Search,
  TrendingUp,
  Users,
} from "lucide-react";
import { SectionHeading } from "../components/SectionHeading";
import { timeline } from "../data/timeline";

const iconMap = { Search, Users, ClipboardList, Rocket, TrendingUp, Flag };

export const Timeline = () => (
  <section id="timeline" data-testid="timeline-section" className="section-pad relative">
    <div className="mx-auto max-w-7xl px-5 sm:px-8">
      <SectionHeading
        number="03"
        eyebrow="Perjalanan Kami"
        title="Dari Observasi hingga Penutupan"
        description="Enam fase terstruktur selama 45 hari pengabdian di Kedungwuni Barat."
        align="center"
      />

      <div className="relative mx-auto mt-16 max-w-4xl">
        <div className="absolute left-5 top-0 h-full w-px bg-gradient-to-b from-brand-500/40 via-gold-400/60 to-brand-500/40 md:left-1/2" />
        {timeline.map((t, i) => {
          const Icon = iconMap[t.icon];
          const leftSide = i % 2 === 0;
          return (
            <motion.div
              key={t.phase}
              data-testid={`timeline-item-${t.phase}`}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className={`relative mb-12 pl-16 last:mb-0 md:w-1/2 md:pl-0 ${
                leftSide ? "md:pr-16" : "md:ml-auto md:pl-16"
              }`}
            >
              <span className="absolute left-5 top-7 z-10 flex h-11 w-11 -translate-x-1/2 items-center justify-center rounded-full bg-gradient-to-br from-brand-700 to-brand-950 text-gold-400 shadow-lg shadow-brand-950/30 ring-4 ring-background md:left-1/2">
                <Icon className="h-5 w-5" />
              </span>
              <div
                className={`glass rounded-3xl p-7 transition-[transform,box-shadow] duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-brand-950/10 ${
                  leftSide ? "md:text-right" : ""
                }`}
              >
                <span className="font-display text-3xl font-bold text-stroke-gold">
                  {t.phase}
                </span>
                <h3 className="mt-1 font-display text-xl font-semibold tracking-tight text-foreground">
                  {t.title}
                </h3>
                <span className="mt-2 inline-block rounded-full bg-brand-700/10 px-3 py-1 text-[11px] font-semibold tracking-wide text-brand-800 ring-1 ring-brand-700/15 dark:bg-gold-400/10 dark:text-gold-300 dark:ring-gold-400/20">
                  {t.date}
                </span>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {t.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
);
