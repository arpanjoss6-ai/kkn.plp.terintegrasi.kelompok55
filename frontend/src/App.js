import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { EditorialMarquee } from "./components/EditorialMarquee";
import { FloatingButtons } from "./components/FloatingButtons";
import { Footer } from "./components/Footer";
import { LoadingScreen } from "./components/LoadingScreen";
import { Navbar } from "./components/Navbar";
import { useLenis } from "./hooks/useLenis";
import { useTheme } from "./hooks/useTheme";
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

  return (
    <div className="min-h-screen bg-background text-foreground">
      <AnimatePresence>{!loaded && <LoadingScreen />}</AnimatePresence>
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
    </div>
  );
}

export default App;
