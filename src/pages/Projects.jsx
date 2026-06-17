import { motion } from 'framer-motion';
import { PORTFOLIO_DATA } from '../data/portfolio';

export default function Projects() {
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0, filter: 'blur(10px)' }}
      animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
      exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      style={{ padding: '5rem 2rem', maxWidth: '1200px', margin: '0 auto' }}
    >
      <h1 style={{ fontSize: '4rem', letterSpacing: '-1.5px', marginBottom: '4rem', color: 'var(--text-main)' }}>
        Systems Lab
      </h1>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
        {PORTFOLIO_DATA.projects.map((project, idx) => (
          <div 
            key={project.id}
            style={{ 
              display: 'flex', 
              flexDirection: 'column',
              gap: '1.5rem',
              borderTop: '1px solid var(--border-light)',
              paddingTop: '2rem'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '2rem' }}>
              <div>
                <h2 style={{ fontSize: '2.5rem', color: 'var(--accent-primary)', marginBottom: '0.5rem' }}>{project.title}</h2>
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                  {project.tech.map(t => (
                    <span key={t} style={{ color: 'var(--text-muted)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                      [{t}]
                    </span>
                  ))}
                </div>
                <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', maxWidth: '600px' }}>{project.description}</p>
              </div>

              <div style={{ flex: '1 1 300px', background: 'var(--bg-surface)', padding: '2rem', borderRadius: '4px' }}>
                <h4 style={{ color: 'var(--accent-secondary)', marginBottom: '1rem', fontFamily: 'var(--font-heading)' }}>Architecture Trace</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.95rem' }}>
                  <p><strong style={{ color: 'var(--text-main)' }}>Surface:</strong> <span style={{ color: 'var(--text-muted)' }}>{project.layers.surface}</span></p>
                  <p><strong style={{ color: 'var(--text-main)' }}>Mechanism:</strong> <span style={{ color: 'var(--text-muted)' }}>{project.layers.mechanism}</span></p>
                  <p><strong style={{ color: 'var(--text-main)' }}>Implementation:</strong> <span style={{ color: 'var(--text-muted)' }}>{project.layers.implementation}</span></p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
