import { motion } from 'framer-motion';
import { PORTFOLIO_DATA } from '../data/portfolio';

export default function About() {
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0, filter: 'blur(10px)' }}
      animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
      exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      style={{ padding: '5rem 2rem', maxWidth: '1200px', margin: '0 auto' }}
    >
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6rem' }}>
        
        <section>
          <h1 style={{ fontSize: '3rem', letterSpacing: '-1px', marginBottom: '2rem', color: 'var(--accent-primary)' }}>
            Systems I Admire
          </h1>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {PORTFOLIO_DATA.admiredSystems.map((sys, i) => {
              const [name, reason] = sys.split(' - ');
              return (
                <div key={i}>
                  <strong style={{ fontSize: '1.5rem', color: 'var(--text-main)', fontFamily: 'var(--font-heading)' }}>{name}</strong>
                  <p style={{ marginTop: '0.5rem', color: 'var(--text-muted)', fontSize: '1.1rem' }}>{reason}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section>
          <h1 style={{ fontSize: '3rem', letterSpacing: '-1px', marginBottom: '2rem', color: 'var(--accent-secondary)' }}>
            How I Learn
          </h1>
          <div style={{ fontSize: '1.15rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <p>
              I believe in taking things apart. My learning process usually starts at the highest level of abstraction, and then I systematically peel back the layers until I reach the core primitives.
            </p>
            <p>
              I don't just read about distributed systems; I build toy versions of them. I don't just use React; I try to write a basic reconciler to understand why it was built the way it was.
            </p>
          </div>
        </section>

      </div>
    </motion.div>
  );
}
