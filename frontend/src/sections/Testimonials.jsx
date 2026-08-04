import { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import { AnimatePresence, motion } from "framer-motion";
import { Quote } from "lucide-react";
import { SectionHeading } from "../components/SectionHeading";
import { partners } from "../data/partners";
import { testimonials } from "../data/testimonials";

export const Testimonials = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setIndex((i) => (i + 1) % testimonials.length),
      5500
    );
    return () => clearInterval(id);
  }, []);

  const t = testimonials[index];

  return (
    <section
      id="testimoni"
      data-testid="testimonials-sponsors-section"
      className="section-pad relative bg-brand-50/60 dark:bg-slate-900/40"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          number="10"
          eyebrow="Testimoni"
          title="Kata Mereka tentang Kami"
          align="center"
        />

        <div className="relative mx-auto mt-12 max-w-3xl">
          <Quote className="absolute -top-6 left-1/2 h-12 w-12 -translate-x-1/2 text-gold-400/40" />
          <div
            data-testid="testimonial-card"
            className="glass rounded-[2rem] px-8 py-12 text-center shadow-xl shadow-brand-950/5 sm:px-14"
          >
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={t.id}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }}
                transition={{ duration: 0.45 }}
              >
                <p className="text-base leading-relaxed text-foreground sm:text-lg">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <footer className="mt-8 flex flex-col items-center gap-3">
                  <img
                    src={t.photo}
                    alt={`Foto ${t.name}`}
                    loading="lazy"
                    className="h-14 w-14 rounded-full object-cover ring-2 ring-gold-400/60"
                  />
                  <div>
                    <p className="font-display text-sm font-bold text-foreground">
                      {t.name}
                    </p>
                    <p className="text-xs font-medium tracking-wide text-muted-foreground">
                      {t.role}
                    </p>
                  </div>
                </footer>
              </motion.blockquote>
            </AnimatePresence>
          </div>

          <div className="mt-7 flex justify-center gap-2.5">
            {testimonials.map((item, i) => (
              <button
                key={item.id}
                type="button"
                data-testid={`testimonial-dot-${item.id}`}
                onClick={() => setIndex(i)}
                aria-label={`Testimoni ${i + 1}`}
                className={`h-2.5 rounded-full transition-[width,background-color] duration-300 ${
                  i === index ? "w-8 bg-gold-400" : "w-2.5 bg-foreground/20 hover:bg-foreground/35"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="mt-20 border-t border-border pt-12">
          <p className="mb-8 text-center text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
            Didukung oleh Mitra & Sponsor
          </p>
          <Marquee speed={45} gradient={false} pauseOnHover className="relative" data-testid="partners-marquee">
            {partners.map((p) => (
              <span
                key={p}
                className="mx-7 inline-flex items-center gap-3 rounded-full bg-card px-6 py-3 font-display text-sm font-semibold text-muted-foreground ring-1 ring-border grayscale transition-all duration-300 hover:text-brand-700 hover:grayscale-0 dark:hover:text-gold-400"
              >
                <span className="h-2 w-2 rotate-45 rounded-[2px] bg-gold-400" />
                {p}
              </span>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
};
