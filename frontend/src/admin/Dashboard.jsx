import { useEffect, useState } from "react";
import {
  Activity,
  CalendarDays,
  Eye,
  Images,
  Link2,
  Newspaper,
  Users,
} from "lucide-react";
import { api } from "./api";

const cards = [
  { key: "articles", label: "Artikel", icon: Newspaper, testid: "stat-articles" },
  { key: "programs", label: "Program Kerja", icon: CalendarDays, testid: "stat-programs" },
  { key: "gallery", label: "Galeri", icon: Images, testid: "stat-gallery" },
  { key: "team", label: "Anggota Tim", icon: Users, testid: "stat-team" },
  { key: "links", label: "Link Penting", icon: Link2, testid: "stat-links" },
  { key: "visitors", label: "Pengunjung", icon: Eye, testid: "stat-visitors" },
];

const actionBadge = {
  tambah: "bg-green-500/10 text-green-700 ring-green-500/20 dark:text-green-300",
  edit: "bg-amber-500/10 text-amber-700 ring-amber-500/20 dark:text-amber-300",
  hapus: "bg-red-500/10 text-red-700 ring-red-500/20 dark:text-red-300",
  upload: "bg-blue-500/10 text-blue-700 ring-blue-500/20 dark:text-blue-300",
  urutkan: "bg-violet-500/10 text-violet-700 ring-violet-500/20 dark:text-violet-300",
};

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get("/api/admin/stats")
      .then(setStats)
      .catch((e) => setError(e.message));
  }, []);

  if (error) {
    return <p className="text-sm text-red-500">{error}</p>;
  }

  if (!stats) {
    return (
      <div data-testid="dashboard-loading" className="space-y-6">
        <div className="h-9 w-56 animate-pulse rounded-xl bg-secondary" />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-28 animate-pulse rounded-2xl bg-secondary" />
          ))}
        </div>
        <div className="h-72 animate-pulse rounded-2xl bg-secondary" />
      </div>
    );
  }

  const valueOf = (key) =>
    key === "visitors" ? stats.visitors : stats.counts[key] ?? 0;

  return (
    <div data-testid="admin-dashboard" className="space-y-8">
      <div>
        <h1 className="font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Dashboard
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Ringkasan konten website KKN-PLP Kelompok 55
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-6">
        {cards.map((c) => (
          <div
            key={c.key}
            data-testid={c.testid}
            className="rounded-2xl border border-border bg-card p-5 shadow-sm transition-shadow duration-300 hover:shadow-md"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-700 to-brand-950 text-gold-400">
              <c.icon className="h-5 w-5" />
            </span>
            <p className="mt-4 font-display text-3xl font-bold tracking-tight text-foreground">
              {valueOf(c.key)}
            </p>
            <p className="mt-0.5 text-xs font-medium text-muted-foreground">{c.label}</p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
        <h2 className="flex items-center gap-2 font-display text-lg font-semibold tracking-tight text-foreground">
          <Activity className="h-5 w-5 text-gold-500" />
          Aktivitas Terakhir
        </h2>
        {stats.activity.length === 0 ? (
          <p className="mt-4 text-sm text-muted-foreground">Belum ada aktivitas.</p>
        ) : (
          <ul className="mt-5 divide-y divide-border">
            {stats.activity.map((a, i) => (
              <li key={i} className="flex flex-wrap items-center gap-3 py-3">
                <span
                  className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ring-1 ${
                    actionBadge[a.action] || "bg-secondary text-secondary-foreground ring-border"
                  }`}
                >
                  {a.action}
                </span>
                <span className="text-sm font-medium text-foreground">
                  {a.collection}
                  {a.label ? ` — ${a.label}` : ""}
                </span>
                <span className="ml-auto text-xs text-muted-foreground">
                  {new Date(a.ts).toLocaleString("id-ID", {
                    day: "numeric",
                    month: "short",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
