import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

/*
  CircuitBackground
  
  Purely decorative SVG layer that draws subtle circuit traces
  connecting sections. Responds to scroll to create a sense of
  depth and flow through the page.
*/

export default function CircuitBackground() {
  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      pointerEvents: 'none',
      zIndex: 0,
      overflow: 'hidden',
    }}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        style={{ opacity: 0.15 }}
      >
        {/* Vertical trace - left side */}
        <motion.path
          d="M120 0 L120 200 L180 250 L180 450 L120 500 L120 700 L180 750 L180 900"
          stroke="var(--trace-color)"
          strokeWidth="1"
          fill="none"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 4, ease: 'easeInOut' }}
        />

        {/* Vertical trace - right side */}
        <motion.path
          d="M1320 0 L1320 150 L1260 200 L1260 400 L1320 450 L1320 650 L1260 700 L1260 900"
          stroke="var(--trace-color)"
          strokeWidth="1"
          fill="none"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 4, ease: 'easeInOut', delay: 0.5 }}
        />

        {/* Horizontal connection traces */}
        <motion.path
          d="M120 200 L300 200 L350 230"
          stroke="var(--trace-color)"
          strokeWidth="0.8"
          fill="none"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: 2 }}
        />

        <motion.path
          d="M1320 450 L1140 450 L1090 420"
          stroke="var(--trace-color)"
          strokeWidth="0.8"
          fill="none"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: 2.5 }}
        />

        {/* Circuit nodes (junction points) */}
        {[
          { cx: 120, cy: 200 },
          { cx: 180, cy: 250 },
          { cx: 180, cy: 450 },
          { cx: 120, cy: 500 },
          { cx: 120, cy: 700 },
          { cx: 1320, cy: 150 },
          { cx: 1260, cy: 200 },
          { cx: 1260, cy: 400 },
          { cx: 1320, cy: 450 },
          { cx: 1320, cy: 650 },
        ].map((pos, i) => (
          <motion.circle
            key={i}
            cx={pos.cx} cy={pos.cy}
            r="2.5"
            fill="var(--node-color)"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.6, scale: 1 }}
            transition={{ delay: 2 + i * 0.15, duration: 0.3 }}
          />
        ))}

        {/* Small decorative component outlines */}
        <motion.rect
          x="100" y="340" width="40" height="20" rx="2"
          stroke="var(--trace-color)" strokeWidth="0.8" fill="none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ delay: 3 }}
        />
        <motion.rect
          x="1280" y="540" width="40" height="20" rx="2"
          stroke="var(--trace-color)" strokeWidth="0.8" fill="none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ delay: 3.2 }}
        />

        {/* Capacitor symbols */}
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 0.3 }} transition={{ delay: 3.5 }}>
          <line x1="115" y1="605" x2="125" y2="605" stroke="var(--trace-color)" strokeWidth="1" />
          <line x1="115" y1="610" x2="125" y2="610" stroke="var(--trace-color)" strokeWidth="1" />
        </motion.g>

        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 0.3 }} transition={{ delay: 3.7 }}>
          <line x1="1315" y1="305" x2="1325" y2="305" stroke="var(--trace-color)" strokeWidth="1" />
          <line x1="1315" y1="310" x2="1325" y2="310" stroke="var(--trace-color)" strokeWidth="1" />
        </motion.g>
      </svg>
    </div>
  );
}
