import { motion } from 'framer-motion';
import { PORTFOLIO_DATA } from '../data/portfolio';

export default function Home() {
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0, filter: 'blur(10px)' }}
      animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
      exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      style={{ padding: '5rem 2rem', maxWidth: '1200px', margin: '0 auto' }}
    >
      <div style={{ marginBottom: '8rem' }}>
        <h1 style={{ fontSize: '5rem', letterSpacing: '-2px', marginBottom: '1rem', color: 'var(--text-main)' }}>
          {PORTFOLIO_DATA.about.name}
        </h1>
        <h2 style={{ fontSize: '2rem', fontWeight: 300, color: 'var(--accent-primary)' }}>
          {PORTFOLIO_DATA.about.tagline}
        </h2>
        <p style={{ marginTop: '2rem', fontSize: '1.25rem', maxWidth: '600px', color: 'var(--text-muted)' }}>
          {PORTFOLIO_DATA.about.bio}
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem' }}>
        <section>
          <h3 style={{ borderBottom: '1px solid var(--border-light)', paddingBottom: '1rem', marginBottom: '2rem', color: 'var(--text-main)' }}>
            Active Inquiries
          </h3>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {PORTFOLIO_DATA.questions.map((q, i) => (
              <li key={i} style={{ fontSize: '1.1rem', color: 'var(--text-muted)' }}>— {q}</li>
            ))}
          </ul>
        </section>

        <section>
          <h3 style={{ borderBottom: '1px solid var(--border-light)', paddingBottom: '1rem', marginBottom: '2rem', color: 'var(--text-main)' }}>
            Current Obsessions
          </h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
            {PORTFOLIO_DATA.obsessions.map((obs, i) => (
              <span key={i} style={{ 
                color: 'var(--accent-secondary)',
                fontSize: '1.1rem',
                border: '1px solid var(--border-light)',
                padding: '0.5rem 1rem',
                borderRadius: '4px'
              }}>
                {obs}
              </span>
            ))}
          </div>
        </section>
      </div>
    </motion.div>
  );
}
