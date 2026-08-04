import { motion } from "framer-motion";
import { ArrowRight, CalendarDays, Clock } from "lucide-react";
import { SectionHeading } from "../components/SectionHeading";
import { articles } from "../data/articles";

export const Articles = () => (
  <section id="artikel" data-testid="articles-section" className="section-pad relative">
    <div className="mx-auto max-w-7xl px-5 sm:px-8">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading
          number="05"
          eyebrow="Kabar Terbaru"
          title="Artikel & Cerita Lapangan"
        />
        <motion.a
          href="#"
          onClick={(e) => e.preventDefault()}
          data-testid="articles-view-all-link"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="group inline-flex w-fit items-center gap-2 font-display text-sm font-bold text-brand-700 transition-colors duration-300 hover:text-gold-600 dark:text-gold-400"
        >
          Lihat Semua Artikel
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
        </motion.a>
      </div>

      <div className="mt-14 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((a, i) => (
          <motion.article
            key={a.id}
            data-testid={`article-card-${a.id}`}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.55, delay: (i % 3) * 0.09 }}
            className="group overflow-hidden rounded-3xl glass transition-[transform,box-shadow] duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-brand-950/10"
          >
            <div className="relative overflow-hidden">
              <img
                src={a.thumbnail}
                alt={a.title}
                loading="lazy"
                className="aspect-video w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              <span className="absolute left-4 top-4 rounded-full bg-brand-950/70 px-3 py-1 text-[11px] font-bold tracking-wide text-gold-300 backdrop-blur-md">
                {a.category}
              </span>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-4 text-[11px] font-medium text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <CalendarDays className="h-3.5 w-3.5 text-gold-500" />
                  {a.date}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-gold-500" />
                  {a.readTime}
                </span>
              </div>
              <h3 className="mt-3 font-display text-lg font-semibold leading-snug tracking-tight text-foreground transition-colors duration-300 group-hover:text-brand-700 dark:group-hover:text-gold-400">
                {a.title}
              </h3>
              <p className="mt-2.5 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                {a.summary}
              </p>
              <a
                href={a.url}
                onClick={(e) => e.preventDefault()}
                data-testid={`article-read-more-${a.id}`}
                className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-brand-700 transition-colors duration-300 hover:text-gold-600 dark:text-gold-400"
              >
                Baca Selengkapnya
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  </section>
);
