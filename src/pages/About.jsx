import { motion } from 'framer-motion';
import { PORTFOLIO_DATA } from '../data/portfolio';

export default function About() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      style={{ padding: '5rem 2rem', maxWidth: '1000px', margin: '0 auto' }}
    >
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem' }}>
        
        <section>
          <h2 style={{ marginBottom: '2rem', color: 'var(--text-main)', borderBottom: '1px solid var(--border-light)', paddingBottom: '0.5rem' }}>
            Systems I Admire
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {PORTFOLIO_DATA.admiredSystems.map((sys, i) => {
              const [name, reason] = sys.split(' - ');
              return (
                <div key={i}>
                  <strong style={{ fontSize: '1.2rem', color: 'var(--accent-primary)' }}>{name}</strong>
                  <p style={{ marginTop: '0.2rem', color: 'var(--text-muted)' }}>{reason}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section>
          <h2 style={{ marginBottom: '2rem', color: 'var(--text-main)', borderBottom: '1px solid var(--border-light)', paddingBottom: '0.5rem' }}>
            Learning Philosophy
          </h2>
          <div style={{ fontSize: '1.1rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <p>
              I believe in taking things apart. My learning process usually starts at the highest level of abstraction, and then I systematically peel back the layers until I reach the core primitives.
            </p>
            <p>
              I don't just read about distributed systems; I build toy versions of them. I don't just use React; I try to write a basic reconciler.
            </p>
            <p>
              By recreating the history of a tool's development, its design choices become obvious.
            </p>
          </div>
        </section>

      </div>
    </motion.div>
  );
}
