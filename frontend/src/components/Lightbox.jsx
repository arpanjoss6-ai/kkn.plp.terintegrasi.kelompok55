import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export const Lightbox = ({ items, index, onClose, onNavigate }) => {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNavigate(1);
      if (e.key === "ArrowLeft") onNavigate(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, onNavigate]);

  const item = index != null ? items[index] : null;
  const navBtn =
    "absolute top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-colors duration-300 hover:bg-gold-400 hover:text-slate-900";

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          data-testid="lightbox-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[90] flex items-center justify-center bg-slate-950/90 p-4 backdrop-blur-md"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="Pratinjau foto"
        >
          <button
            type="button"
            data-testid="lightbox-close-button"
            onClick={onClose}
            aria-label="Tutup"
            className="absolute right-5 top-5 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-colors duration-300 hover:bg-gold-400 hover:text-slate-900"
          >
            <X className="h-5 w-5" />
          </button>
          <button
            type="button"
            data-testid="lightbox-prev-button"
            onClick={(e) => {
              e.stopPropagation();
              onNavigate(-1);
            }}
            aria-label="Foto sebelumnya"
            className={`${navBtn} left-4`}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <motion.figure
            key={item.id}
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 220, damping: 24 }}
            className="w-full max-w-4xl overflow-hidden rounded-3xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={item.src}
              alt={item.caption}
              className="max-h-[75vh] w-full object-cover"
            />
            <figcaption className="flex items-center justify-between gap-4 bg-slate-900/95 px-6 py-4">
              <p className="text-sm font-medium text-white/85">{item.caption}</p>
              <span className="shrink-0 rounded-full bg-gold-400/15 px-3 py-1 text-xs font-semibold text-gold-300">
                {item.category}
              </span>
            </figcaption>
          </motion.figure>
          <button
            type="button"
            data-testid="lightbox-next-button"
            onClick={(e) => {
              e.stopPropagation();
              onNavigate(1);
            }}
            aria-label="Foto berikutnya"
            className={`${navBtn} right-4`}
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
