import Marquee from "react-fast-marquee";

const items = [
  "Gerakan Eco Masjid",
  "Sedekah Sampah",
  "Pengabdian",
  "Pendidikan",
  "Kolaborasi",
];

export const EditorialMarquee = () => (
  <div
    data-testid="editorial-marquee"
    className="relative overflow-hidden border-y border-border bg-background py-7"
  >
    <Marquee speed={38} gradient={false} pauseOnHover>
      {[...items, ...items].map((item, i) => (
        <div key={`${item}-${i}`} className="flex items-center">
          <span
            className={`mx-8 font-display text-3xl font-bold uppercase tracking-tight sm:text-4xl ${
              i % 2 === 0
                ? "text-stroke-green"
                : "text-gradient-gold animate-gradient-x"
            }`}
          >
            {item}
          </span>
          <span className="h-2.5 w-2.5 rotate-45 rounded-[3px] bg-gold-400" />
        </div>
      ))}
    </Marquee>
  </div>
);
