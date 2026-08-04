import { useState } from "react";
import { toast } from "sonner";
import { KeyRound, ShieldCheck } from "lucide-react";
import { api } from "./api";
import { useAuth } from "./AuthContext";

const inputCls =
  "w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground outline-none transition focus:ring-2 focus:ring-gold-400/60";

export default function ProfilePage() {
  const { user } = useAuth();
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [saving, setSaving] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (next !== confirm) {
      toast.error("Konfirmasi password tidak sama");
      return;
    }
    setSaving(true);
    try {
      await api.post("/api/auth/change-password", { current, new: next });
      toast.success("Password berhasil diganti");
      setCurrent("");
      setNext("");
      setConfirm("");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div data-testid="admin-profile" className="max-w-2xl space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Profil Admin
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Satu-satunya akun administrator website ini.
        </p>
      </div>

      <div className="flex items-center gap-4 rounded-2xl border border-border bg-card p-6 shadow-sm">
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-700 to-brand-950 font-display text-xl font-bold text-gold-400">
          {(user?.username || "A").charAt(0).toUpperCase()}
        </span>
        <div>
          <p className="font-display text-lg font-semibold text-foreground">{user?.name}</p>
          <p className="text-sm text-muted-foreground">@{user?.username}</p>
          <span className="mt-1.5 inline-flex items-center gap-1.5 rounded-full bg-gold-400/15 px-3 py-1 text-[11px] font-bold text-gold-700 ring-1 ring-gold-400/30 dark:text-gold-300">
            <ShieldCheck className="h-3.5 w-3.5" />
            Administrator
          </span>
        </div>
      </div>

      <form
        onSubmit={onSubmit}
        className="space-y-4 rounded-2xl border border-border bg-card p-6 shadow-sm"
      >
        <h2 className="flex items-center gap-2 font-display text-lg font-semibold text-foreground">
          <KeyRound className="h-5 w-5 text-gold-500" />
          Ganti Password
        </h2>
        <div>
          <label className="mb-1.5 block text-xs font-semibold text-foreground/75">
            Password Saat Ini
          </label>
          <input
            type="password"
            data-testid="profile-current-password"
            className={inputCls}
            value={current}
            onChange={(e) => setCurrent(e.target.value)}
            autoComplete="current-password"
            required
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-semibold text-foreground/75">
            Password Baru (min. 8 karakter)
          </label>
          <input
            type="password"
            data-testid="profile-new-password"
            className={inputCls}
            value={next}
            onChange={(e) => setNext(e.target.value)}
            autoComplete="new-password"
            minLength={8}
            required
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-semibold text-foreground/75">
            Konfirmasi Password Baru
          </label>
          <input
            type="password"
            data-testid="profile-confirm-password"
            className={inputCls}
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            autoComplete="new-password"
            minLength={8}
            required
          />
        </div>
        <button
          type="submit"
          data-testid="profile-save-password-button"
          disabled={saving}
          className="rounded-xl bg-gradient-to-r from-brand-700 to-brand-900 px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-brand-950/20 disabled:opacity-60"
        >
          {saving ? "Menyimpan..." : "Simpan Password Baru"}
        </button>
      </form>
    </div>
  );
}
