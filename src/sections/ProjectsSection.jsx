import { motion } from 'framer-motion';
import { useRef, useState, useEffect, useCallback } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolio';
import CpuTransition from '../components/CpuTransition';

const stagger = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

/*
  CPU Snap-Lock Strategy
  ──────────────────────
  Instead of IntersectionObserver (which is non-deterministic with slow scrolling),
  we attach a global scroll listener that watches for when the user's scroll position
  crosses the TOP of the projects section.

  The moment they cross that threshold (regardless of scroll speed):
    1. Immediately snap-scroll to the section's top
    2. Lock all scroll (wheel, touch, keyboard)
    3. Mount <CpuTransition /> which plays the 4s animation
    4. On completion, release all scroll locks

  The trigger fires ONCE (cpuTriggered guard). Once cpuDone=true the normal
  page content animates in.
*/
export default function ProjectsSection() {
  const sectionRef = useRef(null);
  const [cpuDone, setCpuDone] = useState(false);
  const [cpuTriggered, setCpuTriggered] = useState(false);
  const [isInViewAfterCpu, setIsInViewAfterCpu] = useState(false);

  // Stable callback — won't cause CpuTransition re-renders
  const handleCpuComplete = useCallback(() => {
    setCpuDone(true);
    // Small delay before revealing content so the CPU exit animation finishes
    setTimeout(() => setIsInViewAfterCpu(true), 100);
  }, []);

  useEffect(() => {
    // Don't attach listener if already triggered or done
    if (cpuTriggered || cpuDone) return;

    const handleScroll = () => {
      if (!sectionRef.current) return;

      const sectionTop = sectionRef.current.getBoundingClientRect().top;

      // Fire when the top of the projects section reaches the top half of the viewport
      // (i.e. user has scrolled far enough that the section is becoming the main content)
      if (sectionTop <= window.innerHeight * 0.55) {
        setCpuTriggered(true);

        // Remove listener immediately — one-shot
        window.removeEventListener('scroll', handleScroll);

        // Snap to the exact top of the section, synchronously
        const absoluteTop = window.scrollY + sectionTop;
        window.scrollTo({ top: absoluteTop, behavior: 'instant' });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Also check immediately in case the section is already in position on mount
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [cpuTriggered, cpuDone]);

  return (
    <section id="projects" className="section" ref={sectionRef}>
      {/* CPU Transition Animation */}
      {cpuTriggered && !cpuDone && (
        <CpuTransition onComplete={handleCpuComplete} />
      )}

      {/* Projects content - appears after CPU animation */}
      <motion.div
        variants={stagger}
        initial="hidden"
        animate={isInViewAfterCpu ? 'show' : 'hidden'}
      >
        <motion.span className="register-label amber" variants={fadeUp}>
          0x02 :: MOUNT_POINT /projects
        </motion.span>

        <motion.h2 variants={fadeUp} style={{ marginBottom: '3rem' }}>
          System Registry
        </motion.h2>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '2rem',
        }}>
          {PORTFOLIO_DATA.projects.map((project, idx) => (
            <motion.div
              key={project.id}
              className="chip-block"
              variants={fadeUp}
              style={{ position: 'relative' }}
            >
              {/* Header row */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '1rem',
                flexWrap: 'wrap',
                gap: '0.5rem',
              }}>
                <h3 style={{ fontSize: '1.25rem' }}>{project.title}</h3>
                <span className="register-label" style={{
                  margin: 0,
                  color: 'var(--text-dim)',
                  fontSize: '0.65rem',
                }}>
                  IC-{String(idx).padStart(2, '0')} :: {project.id.toUpperCase().replace(/-/g, '_')}
                </span>
              </div>

              {/* Tech stack as pin labels */}
              <div style={{
                display: 'flex',
                gap: '0.5rem',
                marginBottom: '1.25rem',
                flexWrap: 'wrap',
              }}>
                {project.tech.map(t => (
                  <span key={t} className="data-tag">{t}</span>
                ))}
              </div>

              {/* Description */}
              <p style={{
                marginBottom: '1.5rem',
                fontSize: '0.9rem',
                lineHeight: 1.7,
              }}>
                {project.description}
              </p>

              {/* Links as data ports */}
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'flex-end', marginTop: '1rem' }}>
                {project.links.github && (
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noreferrer"
                    className="port-link glowing"
                  >
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
                    </svg>
                    SRC
                  </a>
                )}
                {project.links.website && (
                  <a
                    href={project.links.website}
                    target="_blank"
                    rel="noreferrer"
                    className="port-link green glowing"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                    LIVE
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
