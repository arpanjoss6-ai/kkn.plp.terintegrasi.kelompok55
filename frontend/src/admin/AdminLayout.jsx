import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  Award,
  CalendarDays,
  FileText,
  Globe,
  Images,
  LayoutDashboard,
  Link2,
  LogOut,
  MapPin,
  Menu,
  MessageCircle,
  Newspaper,
  PanelLeft,
  Settings,
  Sparkles,
  User,
  Users,
  X,
} from "lucide-react";
import { LogoMark } from "../components/LogoMark";
import { useAuth } from "./AuthContext";

const menu = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/admin/hero", label: "Hero Section", icon: Sparkles },
  { to: "/admin/tentang", label: "Tentang", icon: FileText },
  { to: "/admin/program", label: "Program Kerja", icon: CalendarDays },
  { to: "/admin/artikel", label: "Artikel", icon: Newspaper },
  { to: "/admin/galeri", label: "Galeri", icon: Images },
  { to: "/admin/tim", label: "Tim KKN", icon: Users },
  { to: "/admin/faq", label: "FAQ", icon: MessageCircle },
  { to: "/admin/timeline", label: "Timeline", icon: PanelLeft },
  { to: "/admin/tautan", label: "Link Penting", icon: Link2 },
  { to: "/admin/testimoni", label: "Testimoni", icon: Award },
  { to: "/admin/kontak", label: "Kontak", icon: MapPin },
  { to: "/admin/sponsor", label: "Sponsor", icon: Globe },
  { to: "/admin/pengaturan", label: "Pengaturan Website", icon: Settings },
  { to: "/admin/profil", label: "Profil Admin", icon: User },
];

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const onLogout = async () => {
    await logout();
    navigate("/admin/login", { replace: true });
  };

  const sidebar = (
    <div className="flex h-full flex-col">
      <div className="border-b border-border px-5 py-5">
        <LogoMark />
        <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-500">
          Content Management
        </p>
      </div>
      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        {menu.map((m) => (
          <NavLink
            key={m.to}
            to={m.to}
            end={m.end}
            data-testid={`admin-menu-${m.label.toLowerCase().replace(/\s+/g, "-")}`}
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors duration-200 ${
                isActive
                  ? "bg-gradient-to-r from-brand-700 to-brand-900 text-white shadow-md shadow-brand-950/20"
                  : "text-foreground/65 hover:bg-secondary hover:text-foreground"
              }`
            }
          >
            <m.icon className="h-4 w-4 shrink-0" />
            {m.label}
          </NavLink>
        ))}
      </nav>
      <div className="border-t border-border p-3">
        <button
          type="button"
          data-testid="admin-logout-button"
          onClick={onLogout}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-semibold text-red-600 transition-colors duration-200 hover:bg-red-500/10 dark:text-red-400"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </div>
  );

  return (
    <div data-testid="admin-layout" className="flex min-h-screen bg-background text-foreground">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 border-r border-border bg-card lg:block">
        {sidebar}
      </aside>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <aside className="absolute inset-y-0 left-0 w-72 bg-card shadow-2xl">
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Tutup menu"
              className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-secondary-foreground"
            >
              <X className="h-4 w-4" />
            </button>
            {sidebar}
          </aside>
        </div>
      )}

      <div className="flex min-h-screen flex-1 flex-col lg:pl-64">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-card/80 px-4 backdrop-blur-xl sm:px-6">
          <button
            type="button"
            data-testid="admin-mobile-menu-button"
            onClick={() => setOpen(true)}
            aria-label="Buka menu"
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary text-secondary-foreground lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div className="hidden lg:block" />
          <div className="flex items-center gap-3">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="admin-view-site-link"
              className="rounded-full bg-secondary px-4 py-2 text-xs font-semibold text-secondary-foreground transition-colors hover:bg-secondary/70"
            >
              Lihat Website
            </a>
            <div className="text-right">
              <p className="text-sm font-semibold text-foreground">{user?.name || "Administrator"}</p>
              <p className="text-[11px] text-muted-foreground">@{user?.username}</p>
            </div>
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-brand-700 to-brand-950 font-display text-sm font-bold text-gold-400">
              {(user?.username || "A").charAt(0).toUpperCase()}
            </span>
          </div>
        </header>
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
