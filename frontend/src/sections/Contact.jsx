import { motion } from "framer-motion";
import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  MessageCircle,
  Music2,
  Share2,
  Youtube,
} from "lucide-react";
import { SectionHeading } from "../components/SectionHeading";
import { useContent } from "../hooks/useContent";

export const Contact = () => {
  const { contact } = useContent();

  const cards = [
    {
      id: "alamat",
      icon: MapPin,
      title: "Alamat Posko",
      lines: [contact.address],
      testid: "contact-address",
    },
    {
      id: "whatsapp",
      icon: MessageCircle,
      title: "WhatsApp",
      lines: [contact.whatsappDisplay, contact.hours],
      testid: "contact-whatsapp",
    },
    {
      id: "email",
      icon: Mail,
      title: "Email",
      lines: [contact.email, "Balasan maks. 1x24 jam"],
      testid: "contact-email",
    },
  ];

  const socials = [
    { icon: Instagram, url: contact.socials?.instagram, label: "Instagram", testid: "contact-social-instagram" },
    { icon: Youtube, url: contact.socials?.youtube, label: "YouTube", testid: "contact-social-youtube" },
    { icon: Music2, url: contact.socials?.tiktok, label: "TikTok", testid: "contact-social-tiktok" },
    { icon: Facebook, url: contact.socials?.facebook, label: "Facebook", testid: "contact-social-facebook" },
  ];

  return (
    <section id="kontak" data-testid="contact-section" className="section-pad relative">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          number="11"
          eyebrow="Kontak"
          title="Terhubung dengan Kami"
          description="Punya ide kolaborasi, pertanyaan, atau ingin berkunjung ke posko? Kami senang mendengarnya."
          align="center"
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7 }}
          className="glass mt-14 grid gap-10 rounded-[2rem] p-8 shadow-xl shadow-brand-950/5 sm:p-12 lg:grid-cols-4"
        >
          {cards.map((c) => (
            <div key={c.id} data-testid={c.testid} className="flex flex-col items-start">
              <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-700 to-brand-950 text-gold-400 shadow-lg shadow-brand-950/25">
                <c.icon className="h-6 w-6" />
              </span>
              <h3 className="font-display text-base font-semibold tracking-tight text-foreground">
                {c.title}
              </h3>
              {c.lines.filter(Boolean).map((line) => (
                <p key={line} className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {line}
                </p>
              ))}
            </div>
          ))}

          <div data-testid="contact-socials" className="flex flex-col items-start">
            <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-gold-400 to-gold-600 text-slate-900 shadow-lg shadow-gold-500/25">
              <Share2 className="h-6 w-6" />
            </span>
            <h3 className="font-display text-base font-semibold tracking-tight text-foreground">
              Media Sosial
            </h3>
            <div className="mt-4 flex gap-2.5">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.url || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid={s.testid}
                  aria-label={s.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-secondary-foreground ring-1 ring-border transition-all duration-300 hover:-translate-y-1 hover:bg-gold-400 hover:text-slate-900"
                >
                  <s.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
            <a
              href={contact.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="contact-whatsapp-button"
              className="group mt-6 inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-green-600 to-emerald-700 px-6 py-3 font-display text-sm font-bold text-white shadow-lg shadow-green-900/25 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <MessageCircle className="h-4 w-4" />
              Hubungi Kami
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
