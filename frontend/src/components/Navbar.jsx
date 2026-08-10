import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll } from "framer-motion";
import { Menu, Moon, Sun, X } from "lucide-react";
import { siteConfig } from "../data/siteConfig";
import { scrollToId } from "../hooks/useLenis";

export const Navbar = ({ theme, onToggleTheme }) => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (e, href) => {
    e.preventDefault();
    setOpen(false);
    scrollToId(href);
  };

  return (
    <motion.header
      data-testid="navbar-container"
      initial={{ y: -90, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: 0.7,
        delay: 2.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,border-color] duration-500 ${
        scrolled || open
          ? "glass shadow-xl shadow-brand-950/5"
          : "border-b border-white/10 bg-white/5 backdrop-blur-md"
      }`}
    >
      {/* LOGO */}
      <a
        href="#beranda"
        onClick={(e) => go(e, "#beranda")}
        data-testid="navbar-logo-link"
        aria-label="Beranda KKN 55"
        className="flex items-center gap-3"
      >
        <img
          src="/logo-kkn65-transparan.png"
          alt="Logo KKN PLP Angkatan 65 Kelompok 55"
          className="h-12 w-12 object-contain drop-shadow-lg"
        />

        <div className="leading-tight">
    <div className="font-bold text-white">
      KKN 65 • Kelompok 55
    </div>
    <div className="text-sm text-white/60">
      UIN Gusdur Pekalongan
    </div>
  </div>
</a>

      {/* MENU DESKTOP */}
      <ul className="hidden items-center gap-7 lg:flex">
        {siteConfig.navLinks.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              onClick={(e) => go(e, link.href)}
              data-testid={`nav-link-${link.href.slice(1)}`}
              className={`relative text-sm font-medium tracking-wide transition-colors duration-300 after:absolute after:-bottom-1.5 after:left-0 after:h-[2px] after:w-0 after:rounded-full after:bg-gold-400 after:transition-[width] after:duration-300 hover:after:w-full ${
                scrolled
                  ? "text-foreground/75 hover:text-brand-700 dark:hover:text-gold-400"
                  : "text-white/85 hover:text-gold-300"
              }`}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>

      {/* BUTTONS */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          data-testid="navbar-theme-toggle-button"
          onClick={onToggleTheme}
          aria-label="Ganti mode gelap / terang"
          className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors duration-300 ${
            scrolled
              ? "bg-secondary text-secondary-foreground hover:bg-secondary/70"
              : "bg-white/10 text-white hover:bg-white/20"
          }`}
        >
          {theme === "dark" ? (
            <Sun className="h-5 w-5 text-gold-400" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </button>

        <button
          type="button"
          data-testid="mobile-menu-button"
          onClick={() => setOpen((o) => !o)}
          aria-label="Buka menu"
          className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors duration-300 lg:hidden ${
            scrolled || open
              ? "bg-secondary text-secondary-foreground"
              : "bg-white/10 text-white"
          }`}
        >
          {open ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* SCROLL PROGRESS */}
      <motion.div
        data-testid="scroll-progress-bar"
        className="absolute bottom-0 left-0 h-[2px] w-full origin-left bg-gradient-to-r from-brand-600 via-gold-400 to-gold-300"
        style={{ scaleX: scrollYProgress }}
      />

      {/* MOBILE MENU */}
      <AnimatePresence>
        {open && (
          <motion.nav
            data-testid="mobile-menu-panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              duration: 0.35,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="overflow-hidden border-t border-border/60 lg:hidden"
          >
            <ul className="space-y-1 px-5 py-4">
              {siteConfig.navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => go(e, link.href)}
                    data-testid={`mobile-nav-link-${link.href.slice(1)}`}
                    className="block rounded-xl px-4 py-3 text-sm font-medium text-foreground/80 transition-colors duration-200 hover:bg-secondary hover:text-brand-700 dark:hover:text-gold-400"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
