import { Leaf } from "lucide-react";
import { siteConfig } from "../data/siteConfig";

export const LogoMark = ({ light = false }) => (
  <div className="flex items-center gap-3">
    <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-700 to-brand-950 shadow-lg shadow-brand-950/30">
      <Leaf className="h-5 w-5 text-gold-400" />
      <span className="absolute -bottom-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-gold-400 font-display text-[10px] font-bold text-slate-900">
        55
      </span>
    </div>
    <div className="leading-tight">
      <p
        className={`font-display text-sm font-bold tracking-tight ${
          light ? "text-white" : "text-foreground"
        }`}
      >
        {siteConfig.shortName} • {siteConfig.group}
      </p>
      <p
        className={`text-[11px] font-medium tracking-wide ${
          light ? "text-white/60" : "text-muted-foreground"
        }`}
      >
        {siteConfig.universityShort}
      </p>
    </div>
  </div>
);
