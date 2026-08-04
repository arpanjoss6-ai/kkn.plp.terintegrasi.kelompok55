import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  Clock,
  Facebook,
  Link2,
  MessageCircle,
  Moon,
  Sun,
} from "lucide-react";
import { Footer } from "../components/Footer";
import { LogoMark } from "../components/LogoMark";
import { articles } from "../data/articles";
import { lenisStore } from "../hooks/useLenis";

const ArticleHeader = ({ theme, onToggleTheme }) => (
  <header className="glass fixed inset-x-0 top-0 z-50 shadow-lg shadow-brand-950/5">
    <div className="mx-auto flex h-[72px] max-w-5xl items-center justify-between px-5 sm:px-8">
      <Link
        to="/"
        data-testid="article-back-link"
        className="group inline-flex items-center gap-2 text-sm font-semibold text-foreground/75 transition-colors duration-300 hover:text-brand-700 dark:hover:text-gold-400"
      >
        <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
        Beranda
      </Link>
      <Link to="/" aria-label="Kembali ke beranda KKN 55">
        <LogoMark />
      </Link>
      <button
        type="button"
        data-testid="article-theme-toggle-button"
        onClick={onToggleTheme}
        aria-label="Ganti mode gelap / terang"
        className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-secondary-foreground transition-colors duration-300 hover:bg-secondary/70"
      >
        {theme === "dark" ? (
          <Sun className="h-5 w-5 text-gold-400" />
        ) : (
          <Moon className="h-5 w-5" />
        )}
      </button>
    </div>
  </header>
);

const ArticleBody = ({ article }) => (
  <div data-testid="article-content" className="space-y-6">
    {article.content.map((block, i) => {
      if (block.type === "h2") {
        return (
          <h2
            key={i}
            className="pt-4 font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
          >
            {block.text}
          </h2>
        );
      }
      if (block.type === "quote") {
        return (
          <blockquote
            key={i}
            className="relative my-10 rounded-3xl glass p-8 sm:p-10"
          >
            <span className="absolute left-6 top-4 font-display text-6xl font-bold text-gold-400/40">
              &ldquo;
            </span>
            <p className="relative pt-6 text-lg font-medium italic leading-relaxed text-foreground sm:text-xl">
              {block.text}
            </p>
            {block.author && (
              <footer className="mt-4 text-sm font-semibold text-brand-700 dark:text-gold-400">
                — {block.author}
              </footer>
            )}
          </blockquote>
        );
      }
      return (
        <p
          key={i}
          className={`text-base leading-loose text-muted-foreground sm:text-lg ${
            i === 0
              ? "first-letter:float-left first-letter:mr-3 first-letter:font-display first-letter:text-6xl first-letter:font-bold first-letter:leading-[0.85] first-letter:text-brand-700 dark:first-letter:text-gold-400"
              : ""
          }`}
        >
          {block.text}
        </p>
      );
    })}
  </div>
);

export default function ArticlePage({ theme, onToggleTheme }) {
  const { id } = useParams();
  const article = articles.find((a) => a.id === Number(id));
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (lenisStore.instance) {
      lenisStore.instance.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [id]);

  useEffect(() => {
    document.title = article
      ? `${article.title} — KKN 55`
      : "Artikel tidak ditemukan — KKN 55";
    return () => {
      document.title =
        "KKN-PLP Terintegrasi Angkatan 65 — Kelompok 55 | Kedungwuni Barat";
    };
  }, [article]);

  if (!article) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-background px-6 text-center">
        <p className="font-display text-7xl font-bold text-stroke-gold">404</p>
        <h1 className="font-display text-2xl font-bold text-foreground">
          Artikel tidak ditemukan
        </h1>
        <Link
          to="/"
          data-testid="article-not-found-back-link"
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-700 to-brand-900 px-7 py-3.5 font-display text-sm font-bold text-white shadow-lg transition-transform duration-300 hover:-translate-y-1"
        >
          <ArrowLeft className="h-4 w-4" />
          Kembali ke Beranda
        </Link>
      </div>
    );
  }

  const shareUrl = window.location.href;
  const shareText = `${article.title} — KKN-PLP Kelompok 55`;
  const related = articles.filter((a) => a.id !== article.id).slice(0, 3);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div data-testid="article-page" className="min-h-screen bg-background text-foreground">
      <ArticleHeader theme={theme} onToggleTheme={onToggleTheme} />

      <main className="mx-auto max-w-3xl px-5 pb-24 pt-32 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="inline-block rounded-full bg-brand-700/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-brand-800 ring-1 ring-brand-700/15 dark:bg-gold-400/10 dark:text-gold-300 dark:ring-gold-400/20">
            {article.category}
          </span>
          <h1
            data-testid="article-title"
            className="mt-5 font-display text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem]"
          >
            {article.title}
          </h1>
          <div
            data-testid="article-meta"
            className="mt-5 flex flex-wrap items-center gap-5 text-xs font-medium text-muted-foreground sm:text-sm"
          >
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="h-4 w-4 text-gold-500" />
              {article.date}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-gold-500" />
              {article.readTime} baca
            </span>
            <span className="inline-flex items-center gap-1.5">
              Redaksi KKN 55
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mt-9 overflow-hidden rounded-[2rem] shadow-2xl shadow-brand-950/15 ring-1 ring-border"
        >
          <img
            src={article.thumbnail}
            alt={article.title}
            className="aspect-video w-full object-cover"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12"
        >
          <ArticleBody article={article} />
        </motion.div>

        <div className="mt-14 rounded-3xl glass p-7 sm:p-8">
          <p className="font-display text-sm font-bold uppercase tracking-[0.2em] text-muted-foreground">
            Bagikan Artikel
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <a
              href={`https://wa.me/?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="article-share-whatsapp-button"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-green-600 to-emerald-700 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-green-900/20 transition-transform duration-300 hover:-translate-y-1"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </a>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="article-share-facebook-button"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-blue-800 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-900/20 transition-transform duration-300 hover:-translate-y-1"
            >
              <Facebook className="h-4 w-4" />
              Facebook
            </a>
            <button
              type="button"
              onClick={copyLink}
              data-testid="article-share-copy-button"
              className="inline-flex items-center gap-2 rounded-full bg-secondary px-5 py-2.5 text-sm font-bold text-secondary-foreground ring-1 ring-border transition-transform duration-300 hover:-translate-y-1"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 text-green-600" />
                  Tautan Disalin
                </>
              ) : (
                <>
                  <Link2 className="h-4 w-4" />
                  Salin Tautan
                </>
              )}
            </button>
          </div>
        </div>

        <div className="mt-16 border-t border-border pt-12">
          <h2 className="font-display text-2xl font-bold tracking-tight text-foreground">
            Artikel Lainnya
          </h2>
          <div className="mt-7 grid gap-5 sm:grid-cols-3">
            {related.map((r) => (
              <Link
                key={r.id}
                to={`/artikel/${r.id}`}
                data-testid={`related-article-card-${r.id}`}
                className="group overflow-hidden rounded-2xl glass transition-[transform,box-shadow] duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-brand-950/10"
              >
                <div className="overflow-hidden">
                  <img
                    src={r.thumbnail}
                    alt={r.title}
                    loading="lazy"
                    className="aspect-video w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gold-500">
                    {r.category}
                  </span>
                  <h3 className="mt-1.5 line-clamp-2 font-display text-sm font-semibold leading-snug text-foreground transition-colors duration-300 group-hover:text-brand-700 dark:group-hover:text-gold-400">
                    {r.title}
                  </h3>
                  <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-brand-700 dark:text-gold-400">
                    Baca
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
