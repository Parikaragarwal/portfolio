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
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="section" ref={ref}>
      <motion.div
        variants={stagger}
        initial="hidden"
        animate={isInView ? 'show' : 'hidden'}
      >
        <motion.span className="register-label green" variants={fadeUp}>
          0x01 :: CORE_DUMP /about
        </motion.span>

        <motion.h2 variants={fadeUp} style={{ marginBottom: '3rem' }}>
          System Architecture
        </motion.h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2rem',
        }}>
          {/* Philosophy block */}
          <motion.div className="chip-block" variants={fadeUp}>
            <span className="register-label cyan">LEARNING_PHILOSOPHY</span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginTop: '0.75rem' }}>
              <p>
                I believe in taking things apart. My learning process usually starts at the highest level of abstraction, and then I systematically peel back the layers until I reach the core primitives.
              </p>
              <blockquote style={{
                paddingLeft: '1rem',
                borderLeft: '2px solid var(--accent-amber)',
                color: 'var(--text-primary)',
                fontStyle: 'italic',
                fontSize: '0.9rem',
              }}>
                "I don't just read about distributed systems; I build toy versions of them. I don't just use React; I try to write a basic reconciler."
              </blockquote>
              <p>
                By recreating the history of a tool's development, its design choices become obvious.
              </p>
            </div>
          </motion.div>

          {/* Admired Systems */}
          <motion.div className="chip-block" variants={fadeUp}>
            <span className="register-label amber">ADMIRED_SYSTEMS[]</span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '0.75rem' }}>
              {PORTFOLIO_DATA.admiredSystems.map((sys, i) => {
                const [name, reason] = sys.split(' - ');
                return (
                  <div key={i}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      marginBottom: '0.3rem',
                    }}>
                      <span style={{
                        display: 'inline-block',
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        background: 'var(--node-color)',
                        boxShadow: '0 0 6px var(--accent-cyan-glow)',
                        flexShrink: 0,
                      }} />
                      <strong style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '1rem',
                        fontWeight: 600,
                        color: 'var(--text-primary)',
                      }}>
                        {name}
                      </strong>
                    </div>
                    <p style={{ fontSize: '0.85rem', paddingLeft: '1.1rem' }}>{reason}</p>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Active Inquiries */}
          <motion.div className="chip-block" variants={fadeUp}>
            <span className="register-label green">PTR_ACTIVE_INQUIRIES</span>
            <ul style={{
              listStyle: 'none',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              marginTop: '0.75rem',
            }}>
              {PORTFOLIO_DATA.questions.map((q, i) => (
                <li key={i} style={{
                  display: 'flex',
                  gap: '0.75rem',
                  alignItems: 'flex-start',
                  fontSize: '0.9rem',
                }}>
                  <span style={{
                    color: 'var(--text-dim)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    flexShrink: 0,
                    marginTop: '2px',
                  }}>
                    [{String(i).padStart(2, '0')}]
                  </span>
                  <span style={{ color: 'var(--text-secondary)' }}>{q}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Current Obsessions */}
          <motion.div className="chip-block" variants={fadeUp}>
            <span className="register-label amber">ALLOCATED_OBSESSIONS</span>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.6rem',
              marginTop: '0.75rem',
            }}>
              {PORTFOLIO_DATA.obsessions.map((obs, i) => (
                <span key={i} className="data-tag">
                  {obs}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
