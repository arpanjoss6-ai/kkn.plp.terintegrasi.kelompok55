import { motion } from "framer-motion";
import { Leaf } from "lucide-react";
import { siteConfig } from "../data/siteConfig";

export const LoadingScreen = () => (
  <motion.div
    data-testid="loading-screen"
    exit={{ y: "-100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
    className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-gradient-to-br from-brand-950 via-brand-900 to-slate-950"
  >
    <motion.div
      initial={{ scale: 0.6, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-white/5 ring-1 ring-white/15 backdrop-blur-xl"
    >
      <Leaf className="h-8 w-8 text-gold-400" />
      <span className="absolute -bottom-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-gold-400 font-display text-xs font-bold text-slate-900">
        55
      </span>
    </motion.div>
    <motion.p
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.25, duration: 0.5 }}
      className="font-display text-sm font-semibold tracking-[0.3em] text-white/90"
    >
      {siteConfig.shortName} • {siteConfig.group}
    </motion.p>
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4, duration: 0.5 }}
      className="mt-2 text-xs tracking-widest text-white/50"
    >
      {siteConfig.village}
    </motion.p>
    <div className="mt-8 h-[3px] w-44 overflow-hidden rounded-full bg-white/10">
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        className="h-full w-full origin-left bg-gradient-to-r from-brand-500 to-gold-400"
      />
    </div>
  </motion.div>
);
