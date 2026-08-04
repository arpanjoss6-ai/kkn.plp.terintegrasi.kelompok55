import { useEffect } from "react";
import Lenis from "lenis";

export const lenisStore = { instance: null };

export const scrollToId = (target) => {
  if (lenisStore.instance) {
    lenisStore.instance.scrollTo(target, { offset: -72, duration: 1.4 });
  } else {
    document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
  }
};

export const useLenis = () => {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return undefined;

    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
    lenisStore.instance = lenis;

    let rafId;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisStore.instance = null;
    };
  }, []);
};
