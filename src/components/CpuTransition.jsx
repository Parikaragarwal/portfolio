import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CpuSVG } from './HardwareDiagrams';

/*
  CPU Fetch-Decode-Execute Transition
  
  Plays when the Projects section scrolls into view:
  1. CPU appears centered with a "file" feeding into it
  2. FETCH: data orb travels from file label to CPU
  3. DECODE: internal pathways pulse 
  4. EXECUTE: output fires, CPU fades away
  5. onComplete callback fires → projects appear
*/

export default function CpuTransition({ onComplete }) {
  const [stage, setStage] = useState('init'); // 'init', 'fetch', 'decode', 'execute', 'done'

  useEffect(() => {
    const timings = [
      { delay: 400, stage: 'fetch' },
      { delay: 1400, stage: 'decode' },
      { delay: 2600, stage: 'execute' },
      { delay: 3600, stage: 'done' },
    ];

    const timeouts = timings.map(({ delay, stage: s }) =>
      setTimeout(() => setStage(s), delay)
    );

    const completeTimeout = setTimeout(() => {
      onComplete?.();
    }, 4000);

    return () => {
      timeouts.forEach(clearTimeout);
      clearTimeout(completeTimeout);
    };
  }, [onComplete]);

  if (stage === 'done') return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.4 }}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem 0 3rem',
          position: 'relative',
        }}
      >
        {/* File label feeding into CPU */}
        <motion.div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.7rem',
            color: 'var(--accent-amber)',
            letterSpacing: '0.1em',
            padding: '0.4rem 0.8rem',
            border: '1px dashed var(--border-medium)',
            borderRadius: 'var(--radius-sm)',
            background: 'var(--bg-surface)',
            marginBottom: '1rem',
          }}
          animate={{
            opacity: stage === 'fetch' ? [1, 0.5, 1] : stage === 'init' ? 1 : 0.3,
          }}
          transition={{ duration: 0.5, repeat: stage === 'fetch' ? Infinity : 0 }}
        >
          portfolio.js → PORTFOLIO_DATA
        </motion.div>

        {/* Connection line */}
        <svg width="2" height="30" style={{ overflow: 'visible' }}>
          <motion.line
            x1="1" y1="0" x2="1" y2="30"
            stroke="var(--border-medium)" strokeWidth="1.5" strokeDasharray="4 3"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.4 }}
          />
          {/* Fetch orb traveling down */}
          {stage === 'fetch' && (
            <motion.circle
              cx="1" r="3"
              fill="var(--accent-amber)"
              style={{ filter: 'drop-shadow(0 0 4px var(--accent-amber))' }}
              initial={{ cy: 0, opacity: 0 }}
              animate={{ cy: 30, opacity: [0, 1, 1, 0] }}
              transition={{ duration: 0.6, repeat: Infinity }}
            />
          )}
        </svg>

        {/* CPU */}
        <motion.div
          animate={{
            scale: stage === 'execute' ? [1, 1.02, 1] : 1,
          }}
          transition={{ duration: 0.3, repeat: stage === 'execute' ? 3 : 0 }}
        >
          <CpuSVG stage={stage === 'init' ? 'idle' : stage === 'done' ? 'idle' : stage} size={160} />
        </motion.div>

        {/* Stage indicator */}
        <motion.div
          style={{
            marginTop: '1rem',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.65rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            display: 'flex',
            gap: '1.5rem',
          }}
        >
          {['fetch', 'decode', 'execute'].map(s => (
            <span
              key={s}
              style={{
                color: stage === s ? (
                  s === 'execute' ? 'var(--accent-green)' : 'var(--accent-amber)'
                ) : 'var(--text-dim)',
                transition: 'color 0.3s ease',
                textShadow: stage === s ? `0 0 8px ${s === 'execute' ? 'var(--accent-green-glow)' : 'var(--accent-amber-glow)'}` : 'none',
              }}
            >
              {stage === s ? '● ' : '○ '}{s}
            </span>
          ))}
        </motion.div>

        {/* Execute output - laser sweep */}
        {stage === 'execute' && (
          <motion.div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '2px',
              background: 'linear-gradient(90deg, transparent, var(--accent-green), transparent)',
              boxShadow: '0 0 12px var(--accent-green-glow)',
            }}
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: [0, 1, 0], scaleX: [0, 1, 1] }}
            transition={{ duration: 0.8, repeat: 2 }}
          />
        )}
      </motion.div>
    </AnimatePresence>
  );
}
