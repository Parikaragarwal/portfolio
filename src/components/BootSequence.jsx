import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LaptopSVG, ServerSVG, GlowFilter } from './HardwareDiagrams';
import { useStore } from '../store';

/*
  Boot Sequence Animation
  
  Flow:
  1. idle       → dark screen, nothing visible
  2. drawing    → laptop & server SVGs draw in (pathLength animations)
  3. request    → cyan orb travels laptop → server along wire
  4. processing → server LEDs flicker rapidly
  5. response   → amber orb travels server → laptop  
  6. illuminate → laptop screen fills with light
  7. reveal     → laptop zooms in, screen fills viewport
  8. complete   → content is shown
*/

const STAGES = ['idle', 'drawing', 'request', 'processing', 'response', 'illuminate', 'reveal', 'complete'];

export default function BootSequence() {
  const { bootPhase, setBootPhase, skipBoot } = useStore();
  const [stage, setStage] = useState(0); // index into STAGES

  const skip = useCallback(() => {
    skipBoot();
  }, [skipBoot]);

  useEffect(() => {
    if (bootPhase === 'complete') return;

    // Start the sequence
    setBootPhase('booting');

    const timings = [
      300,   // idle → drawing (SVGs start drawing)
      1800,  // drawing → request (orb starts traveling)
      1200,  // request → processing (orb arrives, server processes)
      1200,  // processing → response (response orb starts)
      1000,  // response → illuminate (orb arrives, screen lights up)
      600,   // illuminate → reveal (zoom begins)
      900,   // reveal → complete (zoom finishes, content shows)
    ];

    let currentStage = 0;
    const timeouts = [];

    const advanceStage = () => {
      currentStage++;
      if (currentStage < STAGES.length) {
        setStage(currentStage);
        if (STAGES[currentStage] === 'complete') {
          setBootPhase('complete');
        } else if (currentStage < timings.length) {
          timeouts.push(setTimeout(advanceStage, timings[currentStage]));
        }
      }
    };

    // Start first transition
    timeouts.push(setTimeout(advanceStage, timings[0]));

    return () => timeouts.forEach(clearTimeout);
  }, [bootPhase, setBootPhase]);

  // Don't render if boot is complete
  if (bootPhase === 'complete') return null;

  const currentStage = STAGES[stage];

  // Wire endpoints (laptop is at ~28%, server at ~72%)
  const laptopX = 28;
  const serverX = 72;
  const wireY = 50;

  return (
    <AnimatePresence>
      <motion.div
        key="boot-sequence"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          position: 'fixed',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'var(--bg-base)',
          zIndex: 9999,
          cursor: 'pointer',
        }}
        onClick={skip}
      >
        {/* Circuit dot grid background */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(circle, var(--grid-dot) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          opacity: 0.4,
        }} />

        {/* Main SVG canvas for the animation */}
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid meet"
          style={{ position: 'absolute', inset: 0 }}
        >
          <defs>
            <filter id="orb-glow" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur stdDeviation="1.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Gradient for the connection wire */}
            <linearGradient id="wire-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="var(--border-medium)" stopOpacity="0.3" />
              <stop offset="50%" stopColor="var(--border-medium)" stopOpacity="1" />
              <stop offset="100%" stopColor="var(--border-medium)" stopOpacity="0.3" />
            </linearGradient>
          </defs>

          {/* Connection wire between laptop and server */}
          {stage >= 1 && (
            <motion.line
              x1={`${laptopX + 5}%`} y1={`${wireY}%`}
              x2={`${serverX - 3}%`} y2={`${wireY}%`}
              stroke="url(#wire-gradient)"
              strokeWidth="0.3"
              strokeDasharray="1.5 1"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
            />
          )}

          {/* Data flow dots along wire */}
          {stage >= 1 && [0, 1, 2, 3, 4].map(i => (
            <motion.circle
              key={`dot-${i}`}
              cx={`${laptopX + 7 + i * 8}%`}
              cy={`${wireY}%`}
              r="0.25"
              fill="var(--border-medium)"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              transition={{ delay: 0.5 + i * 0.1 }}
            />
          ))}

          {/* Request orb: laptop → server */}
          {(currentStage === 'request') && (
            <motion.circle
              r="0.8"
              fill="var(--accent-cyan)"
              filter="url(#orb-glow)"
              cy={`${wireY}%`}
              initial={{ cx: `${laptopX + 5}%`, opacity: 0, r: 0.4 }}
              animate={{ cx: `${serverX - 3}%`, opacity: [0, 1, 1, 0.8], r: [0.4, 0.9, 0.8, 0.6] }}
              transition={{ duration: 1.0, ease: 'easeInOut' }}
            />
          )}

          {/* Response orb: server → laptop */}
          {(currentStage === 'response') && (
            <motion.circle
              r="0.8"
              fill="var(--accent-amber)"
              filter="url(#orb-glow)"
              cy={`${wireY}%`}
              initial={{ cx: `${serverX - 3}%`, opacity: 0, r: 0.4 }}
              animate={{ cx: `${laptopX + 5}%`, opacity: [0, 1, 1, 0.8], r: [0.4, 0.9, 0.8, 0.6] }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
            />
          )}
        </svg>

        {/* Laptop - positioned at left-center */}
        {stage >= 1 && (
          <motion.div
            style={{
              position: 'absolute',
              left: `${laptopX}%`,
              top: '50%',
              transform: 'translate(-50%, -50%)',
              transformOrigin: 'center center',
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={
              currentStage === 'reveal'
                ? { scale: 15, opacity: 0 }
                : currentStage === 'illuminate'
                ? { scale: 1.05, opacity: 1 }
                : { scale: 1, opacity: 1 }
            }
            transition={
              currentStage === 'reveal'
                ? { duration: 0.8, ease: [0.4, 0, 0.2, 1] }
                : { duration: 0.5, ease: 'easeOut' }
            }
          >
            <LaptopSVG screenLit={currentStage === 'illuminate' || currentStage === 'reveal'} />
          </motion.div>
        )}

        {/* Server - positioned at right-center */}
        {stage >= 1 && (
          <motion.div
            style={{
              position: 'absolute',
              left: `${serverX}%`,
              top: '50%',
              transform: 'translate(-50%, -50%)',
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={
              currentStage === 'reveal' || currentStage === 'illuminate'
                ? { opacity: 0, x: 50 }
                : currentStage === 'processing'
                ? {
                    opacity: 1,
                    x: [0, -2, 2, -1, 1, 0], // vibration
                  }
                : { opacity: 1, scale: 1 }
            }
            transition={
              currentStage === 'processing'
                ? { x: { duration: 0.3, repeat: Infinity } }
                : { duration: 0.5 }
            }
          >
            <ServerSVG isProcessing={currentStage === 'processing'} />
          </motion.div>
        )}

        {/* Stage label */}
        <motion.div
          style={{
            position: 'absolute',
            bottom: '18%',
            left: '50%',
            transform: 'translateX(-50%)',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.7rem',
            color: 'var(--text-dim)',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
          }}
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {currentStage === 'drawing' && '> initializing hardware...'}
          {currentStage === 'request' && '> sending SYN packet...'}
          {currentStage === 'processing' && '> server processing request...'}
          {currentStage === 'response' && '> receiving ACK + data...'}
          {currentStage === 'illuminate' && '> rendering viewport...'}
          {currentStage === 'reveal' && '> mounting DOM...'}
        </motion.div>

        {/* Skip hint */}
        <motion.div
          style={{
            position: 'absolute',
            bottom: '2rem',
            right: '2rem',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.65rem',
            color: 'var(--text-dim)',
            letterSpacing: '0.1em',
            opacity: 0.5,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 1.5 }}
        >
          click anywhere to skip →
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
