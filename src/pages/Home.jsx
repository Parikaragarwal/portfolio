import { motion } from 'framer-motion';
import { PORTFOLIO_DATA } from '../data/portfolio';

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      style={{ padding: '5rem 2rem', maxWidth: '1000px', margin: '0 auto' }}
    >
      <div style={{ marginBottom: '6rem' }}>
        <h1 style={{ fontSize: '5rem', letterSpacing: '-2px', marginBottom: '1rem' }}>
          {PORTFOLIO_DATA.about.name}
        </h1>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 400, color: 'var(--accent-primary)', marginBottom: '2rem' }}>
          {PORTFOLIO_DATA.about.tagline}
        </h2>
        <p style={{ fontSize: '1.25rem', maxWidth: '700px', color: 'var(--text-muted)' }}>
          {PORTFOLIO_DATA.about.bio}
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem' }}>
        <div>
          <h3 style={{ marginBottom: '1.5rem', color: 'var(--text-main)', borderBottom: '1px solid var(--border-light)', paddingBottom: '0.5rem' }}>
            Active Inquiries
          </h3>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {PORTFOLIO_DATA.questions.map((q, i) => (
              <li key={i} style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>— {q}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 style={{ marginBottom: '1.5rem', color: 'var(--text-main)', borderBottom: '1px solid var(--border-light)', paddingBottom: '0.5rem' }}>
            Current Obsessions
          </h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
            {PORTFOLIO_DATA.obsessions.map((obs, i) => (
              <span key={i} style={{ 
                padding: '0.5rem 1rem', 
                background: 'var(--bg-surface)', 
                borderRadius: '50px',
                color: 'var(--text-main)',
                fontSize: '0.9rem'
              }}>
                {obs}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
