import { useState } from "react";
import { motion } from "framer-motion";
import { Images } from "lucide-react";
import { Lightbox } from "../components/Lightbox";
import { SectionHeading } from "../components/SectionHeading";
import { useContent } from "../hooks/useContent";

export const Gallery = () => {
  const { gallery } = useContent();
  const [selected, setSelected] = useState(null);

  return (
    <section
      id="galeri"
      data-testid="gallery-section"
      className="section-pad relative bg-brand-50/60 dark:bg-slate-900/40"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          number="04"
          eyebrow="Galeri"
          title="Jejak Kegiatan di Lapangan"
          description="Dokumentasi momen pengabdian, pendidikan, dan kolaborasi bersama warga. Klik foto untuk memperbesar."
          align="center"
        />

        <div className="mt-14 columns-2 gap-4 md:columns-3">
          {gallery.map((g, i) => (
            <motion.button
              key={g.id}
              type="button"
              data-testid={`gallery-item-${g.id}`}
              onClick={() => setSelected(i)}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: (i % 3) * 0.08 }}
              className="group relative mb-4 block w-full overflow-hidden rounded-2xl break-inside-avoid text-left focus:outline-none focus:ring-2 focus:ring-gold-400"
              aria-label={`Perbesar foto: ${g.caption}`}
            >
              <img
                src={g.src}
                alt={g.caption}
                loading="lazy"
                className={`w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 ${
                  g.tall ? "aspect-[3/4]" : "aspect-[4/3]"
                }`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-950/85 via-brand-950/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <span className="absolute right-3 top-3 flex h-9 w-9 translate-y-2 items-center justify-center rounded-full bg-white/15 text-white opacity-0 backdrop-blur-md transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                <Images className="h-4 w-4" />
              </span>
              <div className="absolute bottom-0 left-0 right-0 translate-y-4 p-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                <span className="rounded-full bg-gold-400/20 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-gold-300">
                  {g.category}
                </span>
                <p className="mt-2 text-sm font-medium leading-snug text-white">
                  {g.caption}
                </p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <Lightbox
        items={gallery}
        index={selected}
        onClose={() => setSelected(null)}
        onNavigate={(d) =>
          setSelected((s) => (s + d + gallery.length) % gallery.length)
        }
      />
    </section>
  );
};
