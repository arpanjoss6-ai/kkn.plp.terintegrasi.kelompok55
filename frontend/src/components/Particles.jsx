import { useEffect, useRef } from "react";

export const Particles = () => {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext("2d");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const colors = ["rgba(212,175,55,", "rgba(134,239,172,", "rgba(255,255,255,"];
    let raf;
    let w = 0;
    let h = 0;
    let particles = [];

    const resize = () => {
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
      particles = Array.from(
        { length: Math.min(55, Math.max(20, Math.floor(w / 26))) },
        () => ({
          x: Math.random() * w,
          y: Math.random() * h,
          r: Math.random() * 2 + 0.6,
          s: Math.random() * 0.35 + 0.08,
          o: Math.random() * 0.5 + 0.15,
          c: colors[Math.floor(Math.random() * colors.length)],
          drift: (Math.random() - 0.5) * 0.25,
        })
      );
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `${p.c}${p.o})`;
        ctx.fill();
        if (!reduced) {
          p.y -= p.s;
          p.x += p.drift;
          if (p.y < -4) {
            p.y = h + 4;
            p.x = Math.random() * w;
          }
        }
      });
      raf = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      data-testid="particles-canvas"
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
};
