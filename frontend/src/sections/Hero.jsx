import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, GraduationCap, Leaf, MapPin, Users } from "lucide-react";
import { Particles } from "../components/Particles";
import { images } from "../data/images";
import { siteConfig } from "../data/siteConfig";
import { scrollToId } from "../hooks/useLenis";

const lineVariants = {
  hidden: { y: "115%" },
  visible: (i) => ({
    y: "0%",
    transition: { duration: 0.9, delay: 0.15 + i * 0.15, ease: [0.22, 1, 0.36, 1] },
  }),
};

const fadeUp = (delay) => ({
  initial: { opacity: 0, y: 24 },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
});

export const Hero = ({ loaded }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const lines = [
    { text: "KKN-PLP Terintegrasi", cls: "text-white" },
    { text: "Angkatan 65", cls: "text-white" },
    { text: "Kelompok 55", cls: "text-gradient-gold animate-gradient-x" },
  ];

  return (
    <section
      id="beranda"
      ref={ref}
      data-testid="hero-section"
      className="relative flex min-h-screen flex-col overflow-hidden bg-brand-950"
    >
      <motion.div className="absolute inset-0" style={{ y: bgY, scale: bgScale }}>
        <img
          src={images.hero}
          alt="Suasana masjid dan kegiatan masyarakat"
          className="h-full w-full object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-brand-950/80 via-brand-900/60 to-slate-950/95" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(2,6,23,0.35)_100%)]" />
      <Particles />
      <div className="pointer-events-none absolute -left-24 top-1/4 h-72 w-72 animate-float-slow rounded-full bg-gold-400/15 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-1/4 h-80 w-80 animate-float rounded-full bg-brand-500/20 blur-3xl" />

      <motion.div
        className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-5 pb-24 pt-32 sm:px-8"
        style={{ opacity: fade }}
      >
        <motion.div
          initial={{ opacity: 0, y: -14 }}
          animate={loaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="mb-9 flex flex-wrap items-center gap-3"
        >
          <div className="flex animate-float items-center gap-2.5 rounded-full bg-white/10 px-4 py-2 ring-1 ring-white/20 backdrop-blur-xl">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-brand-600 to-brand-900">
              <Leaf className="h-3.5 w-3.5 text-gold-400" />
            </span>
            <span className="text-xs font-semibold tracking-wide text-white">
              {siteConfig.shortName} • {siteConfig.group}
            </span>
          </div>
          <div className="flex animate-float-slow items-center gap-2.5 rounded-full bg-white/10 px-4 py-2 ring-1 ring-white/20 backdrop-blur-xl">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-gold-400 to-gold-600">
              <GraduationCap className="h-3.5 w-3.5 text-slate-900" />
            </span>
            <span className="text-xs font-semibold tracking-wide text-white">
              {siteConfig.universityShort}
            </span>
          </div>
        </motion.div>

        <motion.div
          {...fadeUp(0.1)}
          animate={loaded ? { opacity: 1, y: 0 } : {}}
          className="mb-6 inline-flex w-fit items-center gap-2 rounded-full bg-gold-400/15 px-4 py-1.5 ring-1 ring-gold-400/30 backdrop-blur-md"
        >
          <MapPin className="h-3.5 w-3.5 text-gold-300" />
          <span
            data-testid="hero-village-chip"
            className="text-xs font-semibold tracking-[0.18em] text-gold-200"
          >
            {siteConfig.village.toUpperCase()}
          </span>
        </motion.div>

        <h1
          data-testid="hero-title"
          className="font-display text-4xl font-bold leading-[1.04] tracking-tight sm:text-6xl lg:text-7xl"
        >
          {lines.map((line, i) => (
            <span key={line.text} className="block overflow-hidden pb-1">
              <motion.span
                className={`block ${line.cls}`}
                custom={i}
                variants={lineVariants}
                initial="hidden"
                animate={loaded ? "visible" : "hidden"}
              >
                {line.text}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          data-testid="hero-subtitle"
          {...fadeUp(0.75)}
          animate={loaded ? { opacity: 1, y: 0 } : {}}
          className="mt-6 text-sm font-semibold tracking-[0.35em] text-white/85 sm:text-base"
        >
          {siteConfig.subtitle}
        </motion.p>

        <motion.p
          data-testid="hero-tagline"
          {...fadeUp(0.9)}
          animate={loaded ? { opacity: 1, y: 0 } : {}}
          className="mt-4 max-w-xl text-base leading-relaxed text-white/60 sm:text-lg"
        >
          &ldquo;{siteConfig.tagline}&rdquo; — mengabdi untuk masyarakat{" "}
          {siteConfig.village}, {siteConfig.kabupaten}.
        </motion.p>

        <motion.div
          {...fadeUp(1.05)}
          animate={loaded ? { opacity: 1, y: 0 } : {}}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <button
            type="button"
            data-testid="hero-cta-explore-button"
            onClick={() => scrollToId("#tentang")}
            className="group inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-gold-400 to-gold-500 px-8 py-4 font-display text-sm font-bold text-slate-900 shadow-[0_10px_40px_-8px_rgba(212,175,55,0.6)] transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_16px_50px_-8px_rgba(212,175,55,0.8)]"
          >
            Jelajahi Website
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
          </button>
          <button
            type="button"
            data-testid="hero-cta-profile-button"
            onClick={() => scrollToId("#tim")}
            className="group inline-flex items-center gap-2.5 rounded-full bg-white/10 px-8 py-4 font-display text-sm font-bold text-white ring-1 ring-white/25 backdrop-blur-xl transition-[transform,background-color] duration-300 hover:-translate-y-1 hover:bg-white/20"
          >
            <Users className="h-4 w-4 text-gold-300" />
            Profil Kelompok
          </button>
        </motion.div>
      </motion.div>

      <motion.button
        type="button"
        data-testid="hero-scroll-indicator"
        onClick={() => scrollToId("#tentang")}
        aria-label="Gulir ke bawah"
        initial={{ opacity: 0 }}
        animate={loaded ? { opacity: 1 } : {}}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <div className="flex h-12 w-7 items-start justify-center rounded-full border-2 border-white/40 p-1.5">
          <span className="h-2.5 w-1.5 animate-scroll-dot rounded-full bg-gold-400" />
        </div>
      </motion.button>
    </section>
  );
};
