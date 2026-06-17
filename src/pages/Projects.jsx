import { motion } from 'framer-motion';
import { PORTFOLIO_DATA } from '../data/portfolio';
import { useStore } from '../store';

export default function Projects() {
  const { paintedItems, isTransitioning, animationsEnabled } = useStore();

  return (
    <div style={{ padding: '5rem 2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '4rem', letterSpacing: '-1.5px', color: 'var(--text-main)', marginBottom: '4rem' }}>
        Projects
      </h1>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
        {PORTFOLIO_DATA.projects.map((project, idx) => {
          // If animations are off, show everything.
          // Otherwise, only show items if the CPU painter has reached their index.
          const isRevealed = !animationsEnabled || (!isTransitioning && paintedItems > idx);

          return (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, height: 0, overflow: 'hidden' }}
              animate={isRevealed ? { opacity: 1, height: 'auto' } : { opacity: 0, height: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              style={{
                borderBottom: '1px solid var(--border-light)',
                paddingBottom: '3rem'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <h2 style={{ fontSize: '2rem', color: 'var(--text-main)', marginBottom: '1rem' }}>{project.title}</h2>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  {project.links.github && (
                    <a href={project.links.github} target="_blank" rel="noreferrer" style={{ color: 'var(--text-muted)', fontSize: '0.9rem', border: '1px solid var(--border-light)', padding: '0.25rem 0.75rem', borderRadius: '4px' }}>
                      GitHub
                    </a>
                  )}
                  {project.links.website && (
                    <a href={project.links.website} target="_blank" rel="noreferrer" style={{ color: 'var(--text-muted)', fontSize: '0.9rem', border: '1px solid var(--border-light)', padding: '0.25rem 0.75rem', borderRadius: '4px' }}>
                      Live Site
                    </a>
                  )}
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                {project.tech.map(t => (
                  <span key={t} style={{ fontSize: '0.8rem', padding: '0.25rem 0.75rem', background: 'var(--bg-surface)', borderRadius: '4px', color: 'var(--text-muted)' }}>
                    {t}
                  </span>
                ))}
              </div>
              
              <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: '1.6' }}>
                {project.description}
              </p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
