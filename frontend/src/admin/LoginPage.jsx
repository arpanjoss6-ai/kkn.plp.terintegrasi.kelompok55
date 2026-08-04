import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { KeyRound, Leaf, User } from "lucide-react";
import { useAuth } from "./AuthContext";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(username, password);
      navigate("/admin", { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      data-testid="admin-login-page"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-brand-950 via-brand-900 to-slate-950 px-5"
    >
      <div className="pointer-events-none absolute -left-24 top-1/4 h-72 w-72 animate-float-slow rounded-full bg-gold-400/15 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-1/4 h-80 w-80 animate-float rounded-full bg-brand-500/20 blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-md rounded-[2rem] bg-white/10 p-8 ring-1 ring-white/15 backdrop-blur-2xl sm:p-10"
      >
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="relative mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-600 to-brand-950 shadow-xl shadow-brand-950/40">
            <Leaf className="h-7 w-7 text-gold-400" />
            <span className="absolute -bottom-1.5 -right-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-gold-400 font-display text-[11px] font-bold text-slate-900">
              55
            </span>
          </div>
          <h1 className="font-display text-2xl font-bold tracking-tight text-white">
            Admin CMS KKN 55
          </h1>
          <p className="mt-1.5 text-sm text-white/55">
            Masuk untuk mengelola konten website
          </p>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-xs font-semibold tracking-wide text-white/70">
              Username
            </label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
              <input
                type="text"
                data-testid="admin-login-username-input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
                required
                className="w-full rounded-xl bg-white/10 py-3 pl-11 pr-4 text-sm text-white placeholder-white/35 ring-1 ring-white/15 outline-none transition focus:ring-2 focus:ring-gold-400"
                placeholder="Masukkan username"
              />
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-semibold tracking-wide text-white/70">
              Password
            </label>
            <div className="relative">
              <KeyRound className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
              <input
                type="password"
                data-testid="admin-login-password-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
                className="w-full rounded-xl bg-white/10 py-3 pl-11 pr-4 text-sm text-white placeholder-white/35 ring-1 ring-white/15 outline-none transition focus:ring-2 focus:ring-gold-400"
                placeholder="Masukkan password"
              />
            </div>
          </div>

          {error && (
            <p
              data-testid="admin-login-error"
              className="rounded-xl bg-red-500/15 px-4 py-2.5 text-sm font-medium text-red-300 ring-1 ring-red-500/25"
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            data-testid="admin-login-submit-button"
            disabled={loading}
            className="w-full rounded-xl bg-gradient-to-r from-gold-400 to-gold-500 py-3.5 font-display text-sm font-bold text-slate-900 shadow-[0_10px_36px_-10px_rgba(212,175,55,0.7)] transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_44px_-10px_rgba(212,175,55,0.85)] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Memeriksa..." : "Masuk Dashboard"}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-white/40">
          Hanya untuk administrator KKN-PLP Kelompok 55
        </p>
      </motion.div>
    </div>
  );
}
