import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../store';

const SECTIONS = [
  { id: 'hero', label: 'MIND' },
  { id: 'about', label: 'SYSTEMS' },
  { id: 'projects', label: 'MACHINE' },
  { id: 'contact', label: 'CONNECT' },
];

export default function FloatingNav() {
  const { theme, toggleTheme, bootPhase, activeSection, setActiveSection } = useStore();
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Hide on scroll down, show on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY > lastScrollY && currentY > 100) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      setLastScrollY(currentY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Track active section via Intersection Observer
  useEffect(() => {
    const observers = [];
    
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { rootMargin: '-30% 0px -60% 0px', threshold: 0 }
      );
      
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach(o => o.disconnect());
  }, [setActiveSection]);

  const scrollTo = useCallback((id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  // Don't show during boot
  if (bootPhase !== 'complete') return null;

  return (
    <AnimatePresence>
      <motion.nav
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: visible ? 0 : 80, opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'fixed',
          bottom: '1.5rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.25rem',
          padding: '0.5rem 0.75rem',
          background: 'var(--bg-overlay)',
          border: '1px solid var(--border-faint)',
          borderRadius: 'var(--radius-pill)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          boxShadow: 'var(--shadow-lg)',
          zIndex: 100,
          fontFamily: 'var(--font-mono)',
        }}
        role="navigation"
        aria-label="Main navigation"
      >
        {SECTIONS.map(({ id, label }) => (
          <button
            key={id}
            id={`nav-${id}`}
            onClick={() => scrollTo(id)}
            style={{
              position: 'relative',
              background: 'none',
              border: 'none',
              padding: '0.45rem 0.85rem',
              fontSize: '0.7rem',
              fontFamily: 'var(--font-mono)',
              fontWeight: activeSection === id ? 600 : 400,
              color: activeSection === id ? 'var(--accent-cyan)' : 'var(--text-tertiary)',
              cursor: 'pointer',
              letterSpacing: '0.08em',
              transition: 'color 0.2s ease',
              borderRadius: 'var(--radius-pill)',
            }}
          >
            {activeSection === id && (
              <motion.div
                layoutId="nav-indicator"
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'var(--bg-elevated)',
                  borderRadius: 'var(--radius-pill)',
                  border: '1px solid var(--border-medium)',
                  zIndex: -1,
                }}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
            {label}
          </button>
        ))}

        {/* Divider */}
        <div style={{
          width: '1px',
          height: '16px',
          background: 'var(--border-medium)',
          margin: '0 0.25rem',
          flexShrink: 0,
        }} />

        {/* Theme toggle */}
        <button
          id="theme-toggle"
          onClick={toggleTheme}
          title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          style={{
            background: 'none',
            border: 'none',
            padding: '0.4rem',
            cursor: 'pointer',
            color: 'var(--text-tertiary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '50%',
            transition: 'color 0.2s ease, background 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = 'var(--accent-amber)';
            e.currentTarget.style.background = 'var(--bg-elevated)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = 'var(--text-tertiary)';
            e.currentTarget.style.background = 'none';
          }}
        >
          {theme === 'dark' ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" />
              <line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          )}
        </button>
      </motion.nav>
    </AnimatePresence>
  );
}
