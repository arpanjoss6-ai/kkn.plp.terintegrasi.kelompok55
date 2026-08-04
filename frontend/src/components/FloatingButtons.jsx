import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp, MessageCircle } from "lucide-react";
import { siteConfig } from "../data/siteConfig";
import { scrollToId } from "../hooks/useLenis";

export const FloatingButtons = () => {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      data-testid="floating-elements"
      className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3"
    >
      <AnimatePresence>
        {showTop && (
          <motion.button
            type="button"
            data-testid="back-to-top-button"
            initial={{ opacity: 0, scale: 0.6, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.6, y: 10 }}
            onClick={() => scrollToId("#beranda")}
            aria-label="Kembali ke atas"
            className="glass flex h-12 w-12 items-center justify-center rounded-full text-foreground shadow-xl transition-transform duration-300 hover:-translate-y-1"
          >
            <ArrowUp className="h-5 w-5" />
          </motion.button>
        )}
      </AnimatePresence>
      <motion.a
        data-testid="floating-whatsapp-button"
        href={siteConfig.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat WhatsApp KKN 55"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2.6, type: "spring", stiffness: 200, damping: 16 }}
        className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-emerald-700 text-white shadow-2xl shadow-green-900/40 transition-transform duration-300 hover:scale-110"
      >
        <span className="absolute inset-0 animate-ping rounded-full bg-green-500/40 [animation-duration:2.5s]" />
        <MessageCircle className="relative h-6 w-6" />
      </motion.a>
    </div>
  );
};
