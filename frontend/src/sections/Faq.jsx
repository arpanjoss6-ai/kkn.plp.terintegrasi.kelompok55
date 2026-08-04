import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";
import { SectionHeading } from "../components/SectionHeading";
import { useContent } from "../hooks/useContent";

export const Faq = () => {
  const { faqs } = useContent();
  return (
  <section id="faq" data-testid="faq-section" className="section-pad relative">
    <div className="mx-auto max-w-3xl px-5 sm:px-8">
      <SectionHeading
        number="09"
        eyebrow="FAQ"
        title="Pertanyaan yang Sering Diajukan"
        align="center"
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6 }}
        className="mt-12"
      >
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((f) => (
            <AccordionItem
              key={f.id}
              value={f.id}
              data-testid={`faq-item-${f.id}`}
              className="border-b border-border/80"
            >
              <AccordionTrigger className="py-5 text-left font-display text-base font-semibold tracking-tight text-foreground transition-colors duration-200 hover:text-brand-700 hover:no-underline dark:hover:text-gold-400 sm:text-lg">
                {f.question}
              </AccordionTrigger>
              <AccordionContent className="pb-5 text-sm leading-relaxed text-muted-foreground sm:text-base">
                {f.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </motion.div>
    </div>
  </section>
  );
};
