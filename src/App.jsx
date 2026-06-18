import { useEffect } from 'react';
import BootSequence from './components/BootSequence';
import FloatingNav from './components/FloatingNav';
import CircuitBackground from './components/CircuitBackground';
import HeroSection from './sections/HeroSection';
import AboutSection from './sections/AboutSection';
import ProjectsSection from './sections/ProjectsSection';
import ContactSection from './sections/ContactSection';
import { useStore } from './store';

function SectionDivider() {
  return <div className="section-divider" />;
}

function App() {
  const { bootPhase, setThemeFromOS } = useStore();

  // Listen for OS-level theme changes and sync to store
  useEffect(() => {
    try {
      const mql = window.matchMedia('(prefers-color-scheme: dark)');
      const handler = (e) => setThemeFromOS(e.matches ? 'dark' : 'light');
      mql.addEventListener('change', handler);
      return () => mql.removeEventListener('change', handler);
    } catch (e) { /* no-op in unsupported environments */ }
  }, [setThemeFromOS]);

  return (
    <>
      {/* Boot sequence overlay */}
      <BootSequence />

      {/* Main content - only visible after boot */}
      {bootPhase === 'complete' && (
        <>
          {/* Decorative circuit traces */}
          <CircuitBackground />

          {/* Page content */}
          <main style={{ position: 'relative', zIndex: 1 }}>
            <HeroSection />
            <SectionDivider />
            <AboutSection />
            <SectionDivider />
            <ProjectsSection />
            <SectionDivider />
            <ContactSection />
          </main>

          {/* Navigation */}
          <FloatingNav />
        </>
      )}
    </>
  );
}

export default App;
