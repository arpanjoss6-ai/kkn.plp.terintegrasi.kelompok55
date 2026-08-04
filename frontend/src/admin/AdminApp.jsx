import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { Toaster } from "../components/ui/sonner";
import AdminLayout from "./AdminLayout";
import { AuthProvider, useAuth } from "./AuthContext";
import CrudPage from "./CrudPage";
import Dashboard from "./Dashboard";
import LoginPage from "./LoginPage";
import ProfilePage from "./ProfilePage";
import SettingsPage from "./SettingsPage";
import {
  aboutSettingsConfig,
  articlesConfig,
  contactSettingsConfig,
  faqsConfig,
  galleryConfig,
  heroSettingsConfig,
  linksConfig,
  partnersConfig,
  programsConfig,
  siteSettingsConfig,
  teamConfig,
  testimonialsConfig,
  timelineConfig,
} from "./config";

const RequireAuth = () => {
  const { user } = useAuth();
  if (user === null) {
    return (
      <div
        data-testid="admin-auth-loading"
        className="flex min-h-screen items-center justify-center bg-background"
      >
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-brand-700 border-t-gold-400" />
      </div>
    );
  }
  if (user === false) {
    return <Navigate to="/admin/login" replace />;
  }
  return <Outlet />;
};

export default function AdminApp() {
  return (
    <AuthProvider>
      <Toaster richColors position="top-center" />
      <Routes>
        <Route path="login" element={<LoginPage />} />
        <Route element={<RequireAuth />}>
          <Route element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="hero" element={<SettingsPage config={heroSettingsConfig} />} />
            <Route path="tentang" element={<SettingsPage config={aboutSettingsConfig} />} />
            <Route path="program" element={<CrudPage config={programsConfig} />} />
            <Route path="artikel" element={<CrudPage config={articlesConfig} />} />
            <Route path="galeri" element={<CrudPage config={galleryConfig} />} />
            <Route path="tim" element={<CrudPage config={teamConfig} />} />
            <Route path="faq" element={<CrudPage config={faqsConfig} />} />
            <Route path="timeline" element={<CrudPage config={timelineConfig} />} />
            <Route path="tautan" element={<CrudPage config={linksConfig} />} />
            <Route path="testimoni" element={<CrudPage config={testimonialsConfig} />} />
            <Route path="kontak" element={<SettingsPage config={contactSettingsConfig} />} />
            <Route path="sponsor" element={<CrudPage config={partnersConfig} />} />
            <Route path="pengaturan" element={<SettingsPage config={siteSettingsConfig} />} />
            <Route path="profil" element={<ProfilePage />} />
            <Route path="*" element={<Navigate to="/admin" replace />} />
          </Route>
        </Route>
      </Routes>
    </AuthProvider>
  );
}
