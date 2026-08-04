import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export const CursorGlow = () => {
  const [enabled, setEnabled] = useState(false);
  const x = useMotionValue(-400);
  const y = useMotionValue(-400);
  const springX = useSpring(x, { stiffness: 140, damping: 22, mass: 0.6 });
  const springY = useSpring(y, { stiffness: 140, damping: 22, mass: 0.6 });

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return undefined;
    setEnabled(true);
    const move = (e) => {
      x.set(e.clientX - 160);
      y.set(e.clientY - 160);
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      data-testid="cursor-glow"
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[1] h-80 w-80 rounded-full opacity-70 mix-blend-soft-light dark:mix-blend-screen"
      style={{
        x: springX,
        y: springY,
        background:
          "radial-gradient(circle, rgba(212,175,55,0.4), rgba(22,101,52,0.2) 45%, transparent 70%)",
      }}
    />
  );
};
