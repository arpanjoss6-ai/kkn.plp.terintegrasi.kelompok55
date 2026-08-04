import { useRef } from "react";
import CountUp from "react-countup";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import {
  Award,
  BadgeCheck,
  CalendarDays,
  Flag,
  MapPin,
  School,
  Users,
} from "lucide-react";
import { SectionHeading } from "../components/SectionHeading";
import { useContent } from "../hooks/useContent";

const iconMap = { Users, School, MapPin, CalendarDays, Flag, Award };

const StatCard = ({ stat, started }) => {
  const Icon = iconMap[stat.icon] || Users;
  return (
    <div
      data-testid={`about-stat-${stat.label}`}
      className="glass rounded-2xl px-4 py-5 text-center shadow-xl shadow-brand-950/5"
    >
      <Icon className="mx-auto mb-2 h-5 w-5 text-brand-700 dark:text-gold-400" />
      <p className="font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
        {started ? (
          <CountUp end={Number(stat.value) || 0} duration={2} suffix={stat.suffix || ""} />
        ) : (
          0
        )}
      </p>
      <p className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
        {stat.label}
      </p>
    </div>
  );
};

export const About = () => {
  const { about } = useContent();
  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-100px" });
  const imgRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: imgRef,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section id="tentang" data-testid="about-section" className="section-pad relative">
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-5 sm:px-8 lg:grid-cols-2">
        <div>
          <SectionHeading
            number="01"
            eyebrow={about.eyebrow || "Tentang Kami"}
            title={about.title}
          />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground"
          >
            {(about.paragraphs || []).map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </motion.div>
          <motion.ul
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-7 flex flex-wrap gap-2.5"
          >
            {(about.highlights || []).map((h) => (
              <li
                key={h}
                className="inline-flex items-center gap-1.5 rounded-full bg-brand-700/10 px-4 py-2 text-xs font-semibold text-brand-800 ring-1 ring-brand-700/15 dark:bg-gold-400/10 dark:text-gold-300 dark:ring-gold-400/20"
              >
                <BadgeCheck className="h-3.5 w-3.5" />
                {h}
              </li>
            ))}
          </motion.ul>
        </div>

        <div className="relative" ref={imgRef}>
          <div className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full bg-gold-400/20 blur-3xl" />
          <motion.div
            initial={{ opacity: 0, scale: 0.94, rotate: 3 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 2 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden rounded-[2rem] shadow-2xl shadow-brand-950/20 ring-1 ring-border"
          >
            <motion.img
              src={about.photo}
              alt="Kegiatan mahasiswa KKN 55"
              loading="lazy"
              style={{ y: imgY, scale: 1.15 }}
              className="aspect-[4/3] w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-950/50 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 rounded-2xl bg-white/10 px-4 py-2.5 ring-1 ring-white/25 backdrop-blur-xl">
              <p className="font-display text-xs font-bold tracking-wide text-white">
                {about.period}
              </p>
            </div>
          </motion.div>

          <div
            ref={statsRef}
            className="relative z-10 mx-auto -mt-14 grid max-w-md grid-cols-2 gap-4 px-2"
          >
            {(about.stats || []).map((s, i) => (
              <StatCard key={s.label || i} stat={s} started={statsInView} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
