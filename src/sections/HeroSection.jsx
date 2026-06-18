import { motion } from 'framer-motion';
import { PORTFOLIO_DATA } from '../data/portfolio';

const stagger = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

export default function HeroSection() {
  return (
    <section id="hero" className="section" style={{ paddingTop: '8rem', paddingBottom: '4rem' }}>
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
      >
        {/* Register label */}
        <motion.span
          className="register-label cyan"
          variants={fadeUp}
        >
          0x00 :: BOOT_SEQUENCE /usr/parikar
        </motion.span>

        {/* Name */}
        <motion.h1
          variants={fadeUp}
          style={{ marginBottom: '0.75rem', marginTop: '0.5rem' }}
        >
          {PORTFOLIO_DATA.about.name}
          <motion.span
            style={{
              display: 'inline-block',
              width: '3px',
              height: '0.8em',
              background: 'var(--accent-cyan)',
              marginLeft: '0.2em',
              verticalAlign: 'baseline',
              borderRadius: '1px',
            }}
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.8, repeat: Infinity, repeatType: 'reverse' }}
          />
        </motion.h1>

        {/* Tagline as terminal prompt */}
        <motion.div
          variants={fadeUp}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '1rem',
            color: 'var(--accent-cyan)',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <span style={{ color: 'var(--accent-green)' }}>$</span>
          <span>{PORTFOLIO_DATA.about.tagline}</span>
        </motion.div>

        {/* Bio */}
        <motion.p
          variants={fadeUp}
          style={{
            fontSize: '1.05rem',
            lineHeight: 1.8,
            marginBottom: '2.5rem',
            maxWidth: '600px',
          }}
        >
          {PORTFOLIO_DATA.about.bio}
        </motion.p>

        {/* Social links as register addresses */}
        <motion.div
          variants={fadeUp}
          style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}
        >
          {PORTFOLIO_DATA.socials.map((s, i) => (
            <a
              key={i}
              href={s.url}
              target="_blank"
              rel="noreferrer"
              className="port-link glowing"
            >
              <span style={{ color: 'var(--text-dim)', fontSize: '0.7rem' }}>REG-{String(i).padStart(2, '0')}</span>
              {s.name}
            </a>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
