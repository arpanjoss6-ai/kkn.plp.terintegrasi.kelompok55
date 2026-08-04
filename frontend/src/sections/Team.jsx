import { motion } from "framer-motion";
import { Instagram, Mail } from "lucide-react";
import { SectionHeading } from "../components/SectionHeading";
import { useContent } from "../hooks/useContent";

export const Team = () => {
  const { team } = useContent();
  return (
  <section
    id="tim"
    data-testid="team-section"
    className="section-pad relative bg-brand-50/60 dark:bg-slate-900/40"
  >
    <div className="mx-auto max-w-7xl px-5 sm:px-8">
      <SectionHeading
        number="08"
        eyebrow="Tim Kami"
        title="Orang-Orang di Balik Gerakan"
        description="24 mahasiswa dari berbagai program studi, disatukan oleh semangat pengabdian."
        align="center"
      />

      <div className="mt-14 grid grid-cols-2 gap-5 sm:gap-6 lg:grid-cols-4">
        {team.map((m, i) => (
          <motion.div
            key={m.id}
            data-testid={`team-card-${m.id}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.55, delay: (i % 4) * 0.08 }}
            className="group overflow-hidden rounded-3xl glass transition-[transform,box-shadow] duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-brand-950/10"
          >
            <div className="relative overflow-hidden">
              <img
                src={m.photo}
                alt={`Foto ${m.name}`}
                loading="lazy"
                className="aspect-square w-full object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
              />
              <div className="absolute inset-x-0 bottom-0 flex translate-y-full justify-center gap-2.5 bg-gradient-to-t from-brand-950/90 to-transparent p-4 pt-10 transition-transform duration-500 group-hover:translate-y-0">
                <a
                  href={m.socials?.instagram || m.instagram || "#"}
                  onClick={(e) => e.preventDefault()}
                  data-testid={`team-social-instagram-${m.id}`}
                  aria-label={`Instagram ${m.name}`}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-md transition-colors duration-300 hover:bg-gold-400 hover:text-slate-900"
                >
                  <Instagram className="h-4 w-4" />
                </a>
                <a
                  href={m.email ? `mailto:${m.email}` : "#"}
                  onClick={(e) => e.preventDefault()}
                  data-testid={`team-social-email-${m.id}`}
                  aria-label={`Email ${m.name}`}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-md transition-colors duration-300 hover:bg-gold-400 hover:text-slate-900"
                >
                  <Mail className="h-4 w-4" />
                </a>
              </div>
            </div>
            <div className="p-5 text-center">
              <h3 className="font-display text-sm font-semibold tracking-tight text-foreground sm:text-base">
                {m.name}
              </h3>
              <p className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-brand-700 dark:text-gold-400 sm:text-xs">
                {m.role}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
  );
};
