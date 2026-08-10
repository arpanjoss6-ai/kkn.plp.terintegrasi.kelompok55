import { motion } from "framer-motion";
import { siteConfig } from "../data/siteConfig";

export const LoadingScreen = () => (
  <motion.div
    data-testid="loading-screen"
    exit={{
      y: "-100%",
      transition: {
        duration: 0.8,
        ease: [0.76, 0, 0.24, 1],
      },
    }}
    className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-brand-950 via-brand-900 to-slate-950"
  >
    {/* Decorative Background */}
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Soft glow */}
      <div className="absolute -left-32 -top-32 h-80 w-80 rounded-full bg-brand-500/15 blur-3xl" />

      <div className="absolute -bottom-40 -right-32 h-96 w-96 rounded-full bg-gold-400/10 blur-3xl" />

      <div className="absolute left-1/2 top-1/3 h-72 w-72 -translate-x-1/2 rounded-full bg-emerald-400/5 blur-3xl" />

      {/* Decorative shapes */}
      <div className="absolute left-8 top-16 h-24 w-24 rotate-45 rounded-[2rem] border border-gold-400/10" />

      <div className="absolute right-10 top-24 h-32 w-32 rotate-12 rounded-[2.5rem] border border-white/5" />

      <div className="absolute bottom-20 left-10 h-20 w-20 -rotate-12 rounded-[1.5rem] border border-white/5" />

      {/* Decorative dots */}
      <div className="absolute left-[18%] top-[22%] h-1.5 w-1.5 rounded-full bg-gold-300/70 shadow-[0_0_12px_rgba(250,204,21,0.6)]" />

      <div className="absolute right-[20%] top-[30%] h-1 w-1 rounded-full bg-white/60" />

      <div className="absolute bottom-[28%] left-[24%] h-1 w-1 rounded-full bg-gold-300/50" />

      <div className="absolute bottom-[22%] right-[25%] h-1.5 w-1.5 rounded-full bg-emerald-300/60" />
    </div>

    {/* Main Content */}
    <div className="relative z-10 flex w-full flex-col items-center px-6">

      {/* Logo Angkatan 65 */}
      <motion.div
        initial={{
          scale: 0.65,
          opacity: 0,
          y: 12,
        }}
        animate={{
          scale: 1,
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.75,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="relative mb-6 flex h-40 w-40 items-center justify-center"
      >
        <img
          src="/logo-kkn65-transparan.png"
          alt="Logo KKN PLP Angkatan 65"
          className="relative h-full w-full object-contain drop-shadow-[0_12px_30px_rgba(0,0,0,0.45)]"
        />
      </motion.div>

      {/* Main Title */}
      <motion.p
        initial={{
          opacity: 0,
          y: 10,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 0.25,
          duration: 0.5,
        }}
        className="text-center font-display text-sm font-semibold tracking-[0.25em] text-white/95"
      >
        KKN-PLP TERINTEGRASI
      </motion.p>

      {/* Group Information */}
      <motion.p
        initial={{
          opacity: 0,
          y: 10,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 0.35,
          duration: 0.5,
        }}
        className="mt-1 text-center font-display text-sm font-bold tracking-[0.25em] text-gold-400"
      >
        ANGKATAN 65 • KELOMPOK 55
      </motion.p>

      {/* Location */}
      <motion.p
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          delay: 0.5,
          duration: 0.5,
        }}
        className="mt-3 text-center text-xs tracking-widest text-white/55"
      >
        {siteConfig.village}
      </motion.p>

      {/* Divider */}
      <motion.div
        initial={{
          width: 0,
          opacity: 0,
        }}
        animate={{
          width: 96,
          opacity: 1,
        }}
        transition={{
          delay: 0.55,
          duration: 0.6,
        }}
        className="mt-5 h-px bg-gradient-to-r from-transparent via-gold-400/70 to-transparent"
      />

      {/* Loading Bar */}
      <div className="mt-7 h-[4px] w-52 overflow-hidden rounded-full bg-white/10 ring-1 ring-white/10">
        <motion.div
          initial={{
            scaleX: 0,
          }}
          animate={{
            scaleX: 1,
          }}
          transition={{
            duration: 1.8,
            ease: "easeInOut",
          }}
          className="h-full w-full origin-left rounded-full bg-gradient-to-r from-brand-500 via-emerald-400 to-gold-400 shadow-[0_0_14px_rgba(250,204,21,0.35)]"
        />
      </div>

      {/* Loading Text */}
      <motion.p
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          delay: 0.65,
          duration: 0.5,
        }}
        className="mt-4 text-[10px] font-medium tracking-[0.45em] text-white/55"
      >
        MEMUAT...
      </motion.p>

      {/* Animated Loading Dots */}
      <div className="mt-4 flex items-center gap-2">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="h-1.5 w-1.5 rounded-full bg-gold-400"
            animate={{
              opacity: [0.25, 1, 0.25],
              scale: [0.8, 1.15, 0.8],
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              delay: i * 0.18,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </div>
  </motion.div>
);
