import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolio';

const stagger = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

export default function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <section id="contact" className="section" ref={ref} style={{ paddingBottom: '8rem' }}>
      <motion.div
        variants={stagger}
        initial="hidden"
        animate={isInView ? 'show' : 'hidden'}
      >
        <motion.span className="register-label cyan" variants={fadeUp}>
          0x03 :: SYSCALL /connect
        </motion.span>

        <motion.h2 variants={fadeUp} style={{ marginBottom: '1.5rem' }}>
          Establish Connection
        </motion.h2>

        <motion.p variants={fadeUp} style={{ marginBottom: '2.5rem', fontSize: '0.95rem' }}>
          Open to collaborating on systems-level work, open source projects, or interesting engineering challenges.
        </motion.p>

        {/* Connection ports */}
        <motion.div
          variants={fadeUp}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.75rem',
            marginBottom: '4rem',
          }}
        >
          {PORTFOLIO_DATA.socials.map((s, i) => (
            <a
              key={i}
              href={s.url}
              target="_blank"
              rel="noreferrer"
              className="port-link"
            >
              <span style={{ color: 'var(--accent-green)', fontSize: '0.7rem' }}>PORT:{3000 + i}</span>
              {s.name}
            </a>
          ))}
        </motion.div>

        {/* Footer */}
        <motion.div
          variants={fadeUp}
          style={{
            borderTop: '1px solid var(--border-faint)',
            paddingTop: '2rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.7rem',
            color: 'var(--text-dim)',
            letterSpacing: '0.05em',
          }}>
            <span style={{ color: 'var(--text-tertiary)' }}>// built with</span>{' '}
            React + Vite + Framer Motion
          </div>

          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.7rem',
            color: 'var(--text-dim)',
            letterSpacing: '0.05em',
          }}>
            <span style={{ color: 'var(--text-tertiary)' }}>// philosophy:</span>{' '}
            remove the abstraction, build from the foundation
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
