import { motion } from "framer-motion";
import { ExternalLink, MapPin } from "lucide-react";
import { SectionHeading } from "../components/SectionHeading";
import { siteConfig } from "../data/siteConfig";

const rows = [
  { label: "Kelurahan", value: siteConfig.kelurahan },
  { label: "Kecamatan", value: siteConfig.kecamatan },
  { label: "Kabupaten", value: siteConfig.kabupaten },
  { label: "Provinsi", value: siteConfig.provinsi },
];

export const Location = () => (
  <section
    id="lokasi"
    data-testid="location-section"
    className="section-pad relative bg-brand-50/60 dark:bg-slate-900/40"
  >
    <div className="mx-auto max-w-7xl px-5 sm:px-8">
      <SectionHeading
        number="06"
        eyebrow="Lokasi"
        title="Temukan Posko Kami"
        description="Posko utama KKN 55 berada di jantung Kelurahan Kedungwuni Barat — mudah dijangkau warga dan mitra."
      />

      <div className="mt-14 grid gap-8 lg:grid-cols-5">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7 }}
          className="overflow-hidden rounded-3xl shadow-2xl shadow-brand-950/15 ring-1 ring-border lg:col-span-3"
        >
          <iframe
            title="Peta Lokasi Posko KKN 55"
            data-testid="location-map-iframe"
            src={siteConfig.mapsEmbedUrl}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            className="h-[420px] w-full border-0 grayscale-[30%] transition-[filter] duration-500 hover:grayscale-0"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="glass flex flex-col justify-center rounded-3xl p-8 sm:p-10 lg:col-span-2"
        >
          <div className="flex items-start gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-700 to-brand-950 text-gold-400 shadow-lg shadow-brand-950/25">
              <MapPin className="h-5 w-5" />
            </span>
            <div>
              <h3 className="font-display text-lg font-semibold tracking-tight text-foreground">
                {siteConfig.address}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {siteConfig.village}, Kec. {siteConfig.kecamatan}
              </p>
            </div>
          </div>

          <dl className="mt-8 space-y-4">
            {rows.map((r) => (
              <div
                key={r.label}
                className="flex items-center justify-between border-l-2 border-gold-400/70 pl-4"
              >
                <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {r.label}
                </dt>
                <dd className="text-sm font-semibold text-foreground">{r.value}</dd>
              </div>
            ))}
          </dl>

          <a
            href={siteConfig.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="location-open-maps-button"
            className="group mt-9 inline-flex w-fit items-center gap-2.5 rounded-full bg-gradient-to-r from-brand-700 to-brand-900 px-7 py-3.5 font-display text-sm font-bold text-white shadow-lg shadow-brand-950/25 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            Buka di Google Maps
            <ExternalLink className="h-4 w-4 text-gold-400 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </motion.div>
      </div>
    </div>
  </section>
);
