import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminApp from "./admin/AdminApp";
import { EditorialMarquee } from "./components/EditorialMarquee";
import { FloatingButtons } from "./components/FloatingButtons";
import { Footer } from "./components/Footer";
import { LoadingScreen } from "./components/LoadingScreen";
import { Navbar } from "./components/Navbar";
import { ContentProvider } from "./hooks/useContent";
import { useLenis } from "./hooks/useLenis";
import { useTheme } from "./hooks/useTheme";
import ArticlePage from "./pages/ArticlePage";
import { About } from "./sections/About";
import { Articles } from "./sections/Articles";
import { Contact } from "./sections/Contact";
import { Faq } from "./sections/Faq";
import { Gallery } from "./sections/Gallery";
import { Hero } from "./sections/Hero";
import { Location } from "./sections/Location";
import { Programs } from "./sections/Programs";
import { QuickLinks } from "./sections/QuickLinks";
import { Team } from "./sections/Team";
import { Testimonials } from "./sections/Testimonials";
import { Timeline } from "./sections/Timeline";

function App() {
  const [loaded, setLoaded] = useState(false);
  const { theme, toggleTheme } = useTheme();
  useLenis();

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 2100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!sessionStorage.getItem("kkn55_visited")) {
      fetch(`${process.env."https://kknplpterintegrasikelompok55-production.up.railway.app/api/track-visit`, {
        method: "POST",
      }).catch(() => {});
      sessionStorage.setItem("kkn55_visited", "1");
    }
  }, []);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background text-foreground">
        <AnimatePresence>{!loaded && <LoadingScreen />}</AnimatePresence>
        <Routes>
          <Route path="/admin/*" element={<AdminApp />} />
          <Route
            path="/"
            element={
              <ContentProvider>
                <Navbar theme={theme} onToggleTheme={toggleTheme} />
                <main>
                  <Hero loaded={loaded} />
                  <EditorialMarquee />
                  <About />
                  <Programs />
                  <Timeline />
                  <Gallery />
                  <Articles />
                  <Location />
                  <QuickLinks />
                  <Team />
                  <Faq />
                  <Testimonials />
                  <Contact />
                </main>
                <Footer />
                <FloatingButtons />
              </ContentProvider>
            }
          />
          <Route
            path="/artikel/:id"
            element={
              <ContentProvider>
                <ArticlePage theme={theme} onToggleTheme={toggleTheme} />
              </ContentProvider>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
