import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

/*
  CircuitBackground
  
  Scroll-driven circuit trace system:
  - Traces glow and pulse as user scrolls
  - Nodes light up when scroll reaches their vertical zone
  - Data pulses travel along traces permanently
  - When CPU animation section is in view, extra traces burst into life
*/

// Track scroll progress + velocity for pulse intensity
function useScrollState() {
  const [state, setState] = useState({ progress: 0, velocity: 0, isCpuZone: false });
  const lastY = useRef(0);
  const lastT = useRef(Date.now());

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0;

      const now = Date.now();
      const dt = Math.max(now - lastT.current, 16);
      const velocity = Math.abs(scrollTop - lastY.current) / dt; // px/ms
      lastY.current = scrollTop;
      lastT.current = now;

      // CPU zone: roughly the "projects" section (40–70% of page)
      const isCpuZone = progress >= 0.38 && progress <= 0.75;

      setState({ progress, velocity: Math.min(velocity, 3), isCpuZone });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return state;
}

// All circuit nodes — left and right sides
const NODES = [
  // Left trace nodes
  { cx: 120, cy: 200,  zone: 0.05, side: 'left' },
  { cx: 180, cy: 250,  zone: 0.15, side: 'left' },
  { cx: 180, cy: 350,  zone: 0.28, side: 'left' },
  { cx: 120, cy: 400,  zone: 0.33, side: 'left' },
  { cx: 180, cy: 450,  zone: 0.40, side: 'left' },
  { cx: 120, cy: 500,  zone: 0.50, side: 'left' },
  { cx: 120, cy: 650,  zone: 0.62, side: 'left' },
  { cx: 180, cy: 700,  zone: 0.70, side: 'left' },
  // Right trace nodes
  { cx: 1320, cy: 150, zone: 0.05, side: 'right' },
  { cx: 1260, cy: 200, zone: 0.15, side: 'right' },
  { cx: 1320, cy: 300, zone: 0.25, side: 'right' },
  { cx: 1260, cy: 400, zone: 0.35, side: 'right' },
  { cx: 1320, cy: 450, zone: 0.45, side: 'right' },
  { cx: 1260, cy: 560, zone: 0.55, side: 'right' },
  { cx: 1320, cy: 650, zone: 0.65, side: 'right' },
  { cx: 1260, cy: 750, zone: 0.75, side: 'right' },
];

export default function CircuitBackground() {
  const { progress, velocity, isCpuZone } = useScrollState();

  // Pulse intensity: increases while scrolling, decays to a gentle idle
  const pulseIntensity = Math.min(velocity * 2.5, 1); // 0..1
  const glowRadius = 2 + progress * 5 + pulseIntensity * 4;
  const traceOpacity = 0.18 + progress * 0.42 + pulseIntensity * 0.15;
  const traceWidth   = progress > 0.1 ? 1.5 : 1;

  // CPU zone causes a burst: extra glow + brightness
  const cpuBurst = isCpuZone ? 1 : 0;
  const effectiveGlow  = glowRadius  + cpuBurst * 8;
  const effectiveOpacity = Math.min(traceOpacity + cpuBurst * 0.25, 0.9);

  // Stroke color shifts from neutral → green (left) / cyan (right)
  const leftColor  = progress > 0.05  ? 'var(--accent-green)' : 'var(--trace-color)';
  const rightColor = progress > 0.1   ? 'var(--accent-cyan)'  : 'var(--trace-color)';
  const crossColor = progress > 0.25  ? 'var(--accent-amber)' : 'var(--trace-color)';

  // Animation duration for data pulses — faster when scrolling
  const pulseDur = Math.max(3.5 - velocity * 1.5, 1.8);

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      pointerEvents: 'none',
      zIndex: 0,
      overflow: 'hidden',
    }}>
      <svg
        width="100%" height="100%"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        style={{
          opacity: effectiveOpacity,
          transition: 'opacity 0.25s ease',
        }}
      >
        <defs>
          <filter id="trace-glow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation={effectiveGlow} result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="node-glow" x="-250%" y="-250%" width="600%" height="600%">
            <feGaussianBlur stdDeviation={effectiveGlow * 1.8} result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="pulse-glow" x="-300%" y="-300%" width="700%" height="700%">
            <feGaussianBlur stdDeviation={effectiveGlow * 2.5} result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="blur" />
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* ── LEFT VERTICAL TRACE (extended) ── */}
        <motion.path
          d="M120 0 L120 200 L180 250 L180 350 L120 400 L180 450 L120 500 L120 650 L180 700 L180 900"
          stroke={leftColor}
          strokeWidth={traceWidth}
          fill="none" strokeLinecap="round"
          filter={progress > 0.05 ? 'url(#trace-glow)' : 'none'}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 4, ease: 'easeInOut' }}
          style={{ transition: 'stroke 0.5s ease' }}
        />

        {/* ── RIGHT VERTICAL TRACE (extended) ── */}
        <motion.path
          d="M1320 0 L1320 150 L1260 200 L1320 300 L1260 400 L1320 450 L1260 560 L1320 650 L1260 750 L1260 900"
          stroke={rightColor}
          strokeWidth={traceWidth}
          fill="none" strokeLinecap="round"
          filter={progress > 0.1 ? 'url(#trace-glow)' : 'none'}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 4, ease: 'easeInOut', delay: 0.5 }}
          style={{ transition: 'stroke 0.5s ease' }}
        />

        {/* ── CROSS TRACES (connect sections) ── */}
        <motion.path
          d="M120 200 L320 200 L370 230"
          stroke={crossColor} strokeWidth={0.8} fill="none" strokeLinecap="round"
          filter={progress > 0.25 ? 'url(#trace-glow)' : 'none'}
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: 1.8 }}
          style={{ transition: 'stroke 0.5s ease' }}
        />
        <motion.path
          d="M180 450 L420 450 L480 420"
          stroke={crossColor} strokeWidth={0.8} fill="none" strokeLinecap="round"
          filter={progress > 0.38 ? 'url(#trace-glow)' : 'none'}
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: 2.2 }}
          style={{ transition: 'stroke 0.5s ease' }}
        />
        <motion.path
          d="M1320 450 L1100 450 L1050 420"
          stroke={crossColor} strokeWidth={0.8} fill="none" strokeLinecap="round"
          filter={progress > 0.4 ? 'url(#trace-glow)' : 'none'}
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: 2.5 }}
          style={{ transition: 'stroke 0.5s ease' }}
        />
        <motion.path
          d="M1260 560 L980 560 L930 530"
          stroke={crossColor} strokeWidth={0.8} fill="none" strokeLinecap="round"
          filter={progress > 0.5 ? 'url(#trace-glow)' : 'none'}
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: 2.8 }}
          style={{ transition: 'stroke 0.5s ease' }}
        />

        {/* ── CPU BURST: extra branching lines that light up in CPU zone ── */}
        {isCpuZone && (<>
          <motion.path
            d="M120 400 L300 400 L400 350 L600 350"
            stroke="var(--accent-green)" strokeWidth={1.2} fill="none" strokeLinecap="round"
            filter="url(#trace-glow)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
          />
          <motion.path
            d="M1320 450 L1100 450 L950 480 L800 480"
            stroke="var(--accent-cyan)" strokeWidth={1.2} fill="none" strokeLinecap="round"
            filter="url(#trace-glow)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
          <motion.path
            d="M180 450 L350 450 L500 500 L700 500"
            stroke="var(--accent-amber)" strokeWidth={1} fill="none" strokeLinecap="round"
            filter="url(#trace-glow)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.1 }}
          />
        </>)}

        {/* ── NODES ── */}
        {NODES.map((node, i) => {
          const isLit = progress >= node.zone;
          const isBursting = isCpuZone && isLit;
          return (
            <motion.circle
              key={i}
              cx={node.cx} cy={node.cy}
              r={isBursting ? 4.5 : isLit ? 3.5 : 2.5}
              fill={isLit ? (node.side === 'left' ? 'var(--accent-green)' : 'var(--accent-cyan)') : 'var(--node-color)'}
              filter={isLit ? 'url(#node-glow)' : 'none'}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: isBursting ? 1 : isLit ? 0.85 : 0.5, scale: 1 }}
              transition={{ delay: 1.5 + i * 0.12, duration: 0.3 }}
              style={{ transition: 'fill 0.4s ease, opacity 0.4s ease' }}
            />
          );
        })}

        {/* ── COMPONENT OUTLINES ── */}
        <motion.rect x="100" y="300" width="40" height="20" rx="2"
          stroke={progress > 0.28 ? 'var(--accent-green)' : 'var(--trace-color)'}
          strokeWidth={progress > 0.28 ? 1.2 : 0.7} fill="none"
          filter={progress > 0.28 ? 'url(#trace-glow)' : 'none'}
          initial={{ opacity: 0 }} animate={{ opacity: progress > 0.28 ? 0.9 : 0.35 }}
          transition={{ delay: 2.5 }}
          style={{ transition: 'stroke 0.5s ease, opacity 0.4s ease' }}
        />
        <motion.rect x="100" y="580" width="40" height="20" rx="2"
          stroke={progress > 0.55 ? 'var(--accent-green)' : 'var(--trace-color)'}
          strokeWidth={progress > 0.55 ? 1.2 : 0.7} fill="none"
          filter={progress > 0.55 ? 'url(#trace-glow)' : 'none'}
          initial={{ opacity: 0 }} animate={{ opacity: progress > 0.55 ? 0.9 : 0.35 }}
          transition={{ delay: 2.8 }}
          style={{ transition: 'stroke 0.5s ease, opacity 0.4s ease' }}
        />
        <motion.rect x="1280" y="480" width="40" height="20" rx="2"
          stroke={progress > 0.45 ? 'var(--accent-cyan)' : 'var(--trace-color)'}
          strokeWidth={progress > 0.45 ? 1.2 : 0.7} fill="none"
          filter={progress > 0.45 ? 'url(#trace-glow)' : 'none'}
          initial={{ opacity: 0 }} animate={{ opacity: progress > 0.45 ? 0.9 : 0.35 }}
          transition={{ delay: 3 }}
          style={{ transition: 'stroke 0.5s ease, opacity 0.4s ease' }}
        />
        <motion.rect x="1280" y="670" width="40" height="20" rx="2"
          stroke={progress > 0.65 ? 'var(--accent-cyan)' : 'var(--trace-color)'}
          strokeWidth={progress > 0.65 ? 1.2 : 0.7} fill="none"
          filter={progress > 0.65 ? 'url(#trace-glow)' : 'none'}
          initial={{ opacity: 0 }} animate={{ opacity: progress > 0.65 ? 0.9 : 0.35 }}
          transition={{ delay: 3.2 }}
          style={{ transition: 'stroke 0.5s ease, opacity 0.4s ease' }}
        />

        {/* ── CAPACITOR SYMBOLS ── */}
        <motion.g initial={{ opacity: 0 }}
          animate={{ opacity: progress > 0.55 ? 0.9 : 0.25 }}
          style={{ transition: 'opacity 0.4s ease' }}
          transition={{ delay: 3.5 }}
        >
          <line x1="115" y1="555" x2="125" y2="555"
            stroke={progress > 0.55 ? 'var(--accent-green)' : 'var(--trace-color)'}
            strokeWidth="1.5" style={{ transition: 'stroke 0.5s ease' }} />
          <line x1="115" y1="561" x2="125" y2="561"
            stroke={progress > 0.55 ? 'var(--accent-green)' : 'var(--trace-color)'}
            strokeWidth="1.5" style={{ transition: 'stroke 0.5s ease' }} />
        </motion.g>
        <motion.g initial={{ opacity: 0 }}
          animate={{ opacity: progress > 0.28 ? 0.9 : 0.25 }}
          style={{ transition: 'opacity 0.4s ease' }}
          transition={{ delay: 3.7 }}
        >
          <line x1="1315" y1="270" x2="1325" y2="270"
            stroke={progress > 0.28 ? 'var(--accent-cyan)' : 'var(--trace-color)'}
            strokeWidth="1.5" style={{ transition: 'stroke 0.5s ease' }} />
          <line x1="1315" y1="276" x2="1325" y2="276"
            stroke={progress > 0.28 ? 'var(--accent-cyan)' : 'var(--trace-color)'}
            strokeWidth="1.5" style={{ transition: 'stroke 0.5s ease' }} />
        </motion.g>

        {/* ── DATA PULSES: always-on once energized, speed = scroll velocity ── */}
        {/* Left trace pulse — primary */}
        {progress > 0.05 && (
          <circle r={isCpuZone ? 3 : 2} fill="var(--accent-green)" filter="url(#pulse-glow)">
            <animateMotion dur={`${pulseDur}s`} repeatCount="indefinite"
              path="M120 0 L120 200 L180 250 L180 350 L120 400 L180 450 L120 500 L120 650 L180 700 L180 900" />
          </circle>
        )}
        {/* Left trace pulse — secondary (offset) */}
        {progress > 0.2 && (
          <circle r={1.2} fill="var(--accent-green)" filter="url(#pulse-glow)" opacity="0.6">
            <animateMotion dur={`${pulseDur * 1.4}s`} begin={`${pulseDur * 0.6}s`} repeatCount="indefinite"
              path="M120 0 L120 200 L180 250 L180 350 L120 400 L180 450 L120 500 L120 650 L180 700 L180 900" />
          </circle>
        )}

        {/* Right trace pulse — primary */}
        {progress > 0.1 && (
          <circle r={isCpuZone ? 3 : 2} fill="var(--accent-cyan)" filter="url(#pulse-glow)">
            <animateMotion dur={`${pulseDur * 1.1}s`} repeatCount="indefinite"
              path="M1320 0 L1320 150 L1260 200 L1320 300 L1260 400 L1320 450 L1260 560 L1320 650 L1260 750 L1260 900" />
          </circle>
        )}
        {/* Right trace pulse — secondary (offset) */}
        {progress > 0.3 && (
          <circle r={1.2} fill="var(--accent-cyan)" filter="url(#pulse-glow)" opacity="0.6">
            <animateMotion dur={`${pulseDur * 1.5}s`} begin={`${pulseDur * 0.5}s`} repeatCount="indefinite"
              path="M1320 0 L1320 150 L1260 200 L1320 300 L1260 400 L1320 450 L1260 560 L1320 650 L1260 750 L1260 900" />
          </circle>
        )}

        {/* CPU burst pulses — extra pulses along the burst traces */}
        {isCpuZone && (
          <circle r={2.5} fill="var(--accent-amber)" filter="url(#pulse-glow)">
            <animateMotion dur="1.5s" repeatCount="indefinite"
              path="M180 450 L420 450 L480 420" />
          </circle>
        )}
        {isCpuZone && (
          <circle r={2.5} fill="var(--accent-green)" filter="url(#pulse-glow)">
            <animateMotion dur="1.8s" repeatCount="indefinite"
              path="M120 400 L300 400 L400 350 L600 350" />
          </circle>
        )}
        {isCpuZone && (
          <circle r={2.5} fill="var(--accent-cyan)" filter="url(#pulse-glow)">
            <animateMotion dur="1.6s" repeatCount="indefinite"
              path="M1320 450 L1100 450 L950 480 L800 480" />
          </circle>
        )}
      </svg>
    </div>
  );
}
