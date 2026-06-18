import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LaptopSVG, ServerSVG } from './HardwareDiagrams';
import { useStore } from '../store';

// Hook to detect mobile viewport for responsive layout
function useIsMobile(breakpoint = 600) {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth <= breakpoint : false
  );

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${breakpoint}px)`);
    const handler = (e) => setIsMobile(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, [breakpoint]);

  return isMobile;
}

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

// Desktop layout: SVG viewBox is 0 0 100 100 with preserveAspectRatio=none
// so SVG unit coordinates map 1:1 to percentage of viewport
const LAPTOP_SVG_X = 28;  // matches CSS left: 28%
const SERVER_SVG_X = 72;  // matches CSS left: 72%
const WIRE_SVG_Y  = 50;   // matches CSS top: 50%

export default function BootSequence() {
  const { bootPhase, setBootPhase, skipBoot } = useStore();
  const [stage, setStage] = useState(0); // index into STAGES
  const isMobile = useIsMobile();

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
          background: 'var(--bg-base)',
          zIndex: 9999,
          cursor: 'pointer',
          overflow: 'hidden',
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

        {isMobile ? (
          /* ── MOBILE LAYOUT: clean flexbox column ── */
          <MobileBootLayout currentStage={currentStage} stage={stage} />
        ) : (
          /* ── DESKTOP LAYOUT: SVG-positioned ── */
          <DesktopBootLayout currentStage={currentStage} stage={stage} />
        )}

        {/* Stage label */}
        <motion.div
          style={{
            position: 'absolute',
            bottom: isMobile ? '12%' : '18%',
            left: '50%',
            transform: 'translateX(-50%)',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.7rem',
            color: 'var(--text-dim)',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            whiteSpace: 'nowrap',
          }}
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {currentStage === 'drawing'    && '> initializing hardware...'}
          {currentStage === 'request'    && '> sending SYN packet...'}
          {currentStage === 'processing' && '> server processing request...'}
          {currentStage === 'response'   && '> receiving ACK + data...'}
          {currentStage === 'illuminate' && '> rendering viewport...'}
          {currentStage === 'reveal'     && '> mounting DOM...'}
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

/* ────────────────────────────────────────────────
   DESKTOP LAYOUT — SVG canvas positions everything
   SVG viewBox 0 0 100 100 + preserveAspectRatio=none
   means unit coords map 1:1 to viewport percentages
──────────────────────────────────────────────── */
function DesktopBootLayout({ currentStage, stage }) {
  return (
    <>
      {/* SVG canvas for wire and orbs */}
      <svg
        width="100%" height="100%"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
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
          <linearGradient id="wire-gradient" x1="0" y1="0" x2="1" y2="0" gradientUnits="objectBoundingBox">
            <stop offset="0%"   stopColor="var(--border-medium)" stopOpacity="0.3" />
            <stop offset="50%"  stopColor="var(--border-medium)" stopOpacity="1" />
            <stop offset="100%" stopColor="var(--border-medium)" stopOpacity="0.3" />
          </linearGradient>
        </defs>

        {/* Connection wire */}
        {stage >= 1 && (
          <motion.line
            x1={LAPTOP_SVG_X + 5} y1={WIRE_SVG_Y}
            x2={SERVER_SVG_X - 3} y2={WIRE_SVG_Y}
            stroke="var(--border-medium)"
            strokeWidth="0.3"
            strokeDasharray="1.5 1"
            strokeOpacity="0.7"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
          />
        )}

        {/* Static dots along wire */}
        {stage >= 1 && [0, 1, 2, 3, 4].map(i => (
          <motion.circle
            key={`dot-${i}`}
            cx={LAPTOP_SVG_X + 8 + i * 7}
            cy={WIRE_SVG_Y}
            r={0.25}
            fill="var(--border-medium)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ delay: 0.5 + i * 0.1 }}
          />
        ))}

        {/* Request orb: laptop → server (pure numeric cx animation) */}
        {currentStage === 'request' && (
          <motion.circle
            cy={WIRE_SVG_Y}
            r={0.9}
            fill="var(--accent-cyan)"
            filter="url(#orb-glow)"
            initial={{ cx: LAPTOP_SVG_X + 5, opacity: 0 }}
            animate={{ cx: SERVER_SVG_X - 3, opacity: [0, 1, 1, 1] }}
            transition={{ duration: 1.1, ease: 'easeInOut' }}
          />
        )}

        {/* Response orb: server → laptop (pure numeric cx animation) */}
        {currentStage === 'response' && (
          <motion.circle
            cy={WIRE_SVG_Y}
            r={0.9}
            fill="var(--accent-amber)"
            filter="url(#orb-glow)"
            initial={{ cx: SERVER_SVG_X - 3, opacity: 0 }}
            animate={{ cx: LAPTOP_SVG_X + 5, opacity: [0, 1, 1, 1] }}
            transition={{ duration: 0.9, ease: 'easeInOut' }}
          />
        )}
      </svg>

      {/* Laptop div — CSS positioned to match SVG coord */}
      {stage >= 1 && (
        <motion.div
          style={{
            position: 'absolute',
            left: `${LAPTOP_SVG_X}%`,
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

      {/* Server div */}
      {stage >= 1 && (
        <motion.div
          style={{
            position: 'absolute',
            left: `${SERVER_SVG_X}%`,
            top: '50%',
            transform: 'translate(-50%, -50%)',
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={
            currentStage === 'reveal' || currentStage === 'illuminate'
              ? { opacity: 0, x: 60 }
              : currentStage === 'processing'
              ? { opacity: 1, x: [0, -2, 2, -1, 1, 0] }
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
    </>
  );
}

/* ────────────────────────────────────────────────
   MOBILE LAYOUT — flexbox column, no SVG positioning
   Clean stacked layout: laptop on top, server below,
   HTML orb animates between them
──────────────────────────────────────────────── */
function MobileBootLayout({ currentStage, stage }) {
  if (stage < 1) return null;

  const isRevealing = currentStage === 'reveal' || currentStage === 'illuminate';

  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '1.5rem',
    }}>
      {/* Laptop */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={
          currentStage === 'reveal'
            ? { scale: 12, opacity: 0 }
            : currentStage === 'illuminate'
            ? { scale: 1.05, opacity: 1, y: 0 }
            : { scale: 1, opacity: 1, y: 0 }
        }
        transition={
          currentStage === 'reveal'
            ? { duration: 0.8, ease: [0.4, 0, 0.2, 1] }
            : { duration: 0.5 }
        }
        style={{ transformOrigin: 'center center' }}
      >
        <LaptopSVG
          screenLit={currentStage === 'illuminate' || currentStage === 'reveal'}
          style={{ width: 160, height: 'auto' }}
        />
      </motion.div>

      {/* Wire + orb column */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
        width: 2,
        height: 60,
      }}>
        {/* Dashed wire */}
        <svg width="2" height="60" style={{ overflow: 'visible', opacity: isRevealing ? 0 : 1 }}>
          <motion.line
            x1="1" y1="0" x2="1" y2="60"
            stroke="var(--border-medium)"
            strokeWidth="1.5"
            strokeDasharray="4 3"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5 }}
          />
        </svg>

        {/* Request orb — travels DOWN (laptop→server) */}
        {currentStage === 'request' && (
          <motion.div style={{
            position: 'absolute',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 10,
            height: 10,
            borderRadius: '50%',
            background: 'var(--accent-cyan)',
            boxShadow: '0 0 12px var(--accent-cyan), 0 0 24px var(--accent-cyan)',
          }}
            initial={{ y: 0, opacity: 0 }}
            animate={{ y: 60, opacity: [0, 1, 1, 0.8] }}
            transition={{ duration: 1.0, ease: 'easeInOut' }}
          />
        )}

        {/* Response orb — travels UP (server→laptop) */}
        {currentStage === 'response' && (
          <motion.div style={{
            position: 'absolute',
            bottom: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 10,
            height: 10,
            borderRadius: '50%',
            background: 'var(--accent-amber)',
            boxShadow: '0 0 12px var(--accent-amber), 0 0 24px var(--accent-amber)',
          }}
            initial={{ y: 0, opacity: 0 }}
            animate={{ y: -60, opacity: [0, 1, 1, 0.8] }}
            transition={{ duration: 0.9, ease: 'easeInOut' }}
          />
        )}
      </div>

      {/* Server */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={
          isRevealing
            ? { opacity: 0, y: 40 }
            : currentStage === 'processing'
            ? { opacity: 1, y: 0, x: [0, -2, 2, -1, 1, 0] }
            : { opacity: 1, y: 0 }
        }
        transition={
          currentStage === 'processing'
            ? { x: { duration: 0.3, repeat: Infinity } }
            : { duration: 0.5 }
        }
      >
        <ServerSVG
          isProcessing={currentStage === 'processing'}
          style={{ width: 90, height: 'auto' }}
        />
      </motion.div>
    </div>
  );
}
