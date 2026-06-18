import { motion } from 'framer-motion';

/* ============================================================
   SVG Hardware Diagrams
   Excalidraw-inspired line-art components for the boot sequence
   and hardware-schematic visual language.
   ============================================================ */

// ---- SVG Filter for Glow Effects ----
export function GlowFilter({ id = 'glow' }) {
  return (
    <defs>
      <filter id={id} x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="4" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
      <filter id={`${id}-strong`} x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="8" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
  );
}

// ---- Laptop SVG ----
export function LaptopSVG({ screenLit = false, style }) {
  return (
    <svg
      width="220" height="170" viewBox="0 0 220 170"
      fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ overflow: 'visible', ...style }}
    >
      <GlowFilter id="laptop-glow" />

      {/* Screen bezel */}
      <motion.rect
        x="30" y="10" width="160" height="105" rx="6"
        stroke="var(--text-tertiary)" strokeWidth="2.5"
        fill="var(--bg-surface)"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: 'easeInOut' }}
      />

      {/* Inner screen area */}
      <motion.rect
        x="38" y="18" width="144" height="89" rx="2"
        fill={screenLit ? 'var(--accent-cyan)' : 'var(--bg-elevated)'}
        initial={{ opacity: 0 }}
        animate={{ opacity: screenLit ? [0.3, 0.9, 0.6] : 0.6 }}
        transition={screenLit ? { duration: 0.6, repeat: Infinity, repeatType: 'mirror' } : { duration: 0.8, delay: 0.5 }}
      />

      {/* Screen content lines (code) */}
      {!screenLit && (
        <>
          <motion.line
            x1="46" y1="32" x2="100" y2="32"
            stroke="var(--accent-cyan)" strokeWidth="2" strokeLinecap="round"
            initial={{ opacity: 0, pathLength: 0 }}
            animate={{ opacity: 0.7, pathLength: 1 }}
            transition={{ delay: 1.3, duration: 0.4 }}
          />
          <motion.line
            x1="46" y1="44" x2="130" y2="44"
            stroke="var(--text-dim)" strokeWidth="2" strokeLinecap="round"
            initial={{ opacity: 0, pathLength: 0 }}
            animate={{ opacity: 0.5, pathLength: 1 }}
            transition={{ delay: 1.5, duration: 0.4 }}
          />
          <motion.line
            x1="56" y1="56" x2="110" y2="56"
            stroke="var(--accent-amber)" strokeWidth="2" strokeLinecap="round"
            initial={{ opacity: 0, pathLength: 0 }}
            animate={{ opacity: 0.6, pathLength: 1 }}
            transition={{ delay: 1.7, duration: 0.4 }}
          />
          <motion.line
            x1="56" y1="68" x2="90" y2="68"
            stroke="var(--text-dim)" strokeWidth="2" strokeLinecap="round"
            initial={{ opacity: 0, pathLength: 0 }}
            animate={{ opacity: 0.4, pathLength: 1 }}
            transition={{ delay: 1.9, duration: 0.4 }}
          />
          <motion.line
            x1="46" y1="80" x2="120" y2="80"
            stroke="var(--accent-green)" strokeWidth="2" strokeLinecap="round"
            initial={{ opacity: 0, pathLength: 0 }}
            animate={{ opacity: 0.5, pathLength: 1 }}
            transition={{ delay: 2.1, duration: 0.4 }}
          />
        </>
      )}

      {/* Hinge */}
      <motion.path
        d="M25 115 L195 115"
        stroke="var(--text-tertiary)" strokeWidth="2.5" strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      />

      {/* Keyboard base - trapezoid */}
      <motion.path
        d="M15 118 L205 118 L215 150 L5 150 Z"
        stroke="var(--text-tertiary)" strokeWidth="2.5" fill="var(--bg-surface)"
        strokeLinejoin="round" strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
      />

      {/* Keyboard keys (simplified grid) */}
      {[0, 1, 2].map(row => (
        [0, 1, 2, 3, 4, 5, 6].map(col => (
          <motion.rect
            key={`key-${row}-${col}`}
            x={40 + col * 20} y={122 + row * 8}
            width="14" height="5" rx="1"
            fill="var(--bg-elevated)"
            stroke="var(--border-medium)" strokeWidth="0.5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 1.4 + (row * 7 + col) * 0.02 }}
          />
        ))
      ))}

      {/* Trackpad */}
      <motion.rect
        x="85" y="148" width="50" height="1"
        fill="var(--border-medium)" rx="0.5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 1.8 }}
      />

      {/* Power LED */}
      <motion.circle
        cx="110" cy="12" r="2"
        fill="var(--accent-green)"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0.5, 1] }}
        transition={{ delay: 1, duration: 1.5 }}
      />
    </svg>
  );
}

// ---- Server Rack SVG ----
export function ServerSVG({ isProcessing = false, style }) {
  const bladeYPositions = [28, 58, 88, 118, 148];

  return (
    <svg
      width="130" height="200" viewBox="0 0 130 200"
      fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ overflow: 'visible', ...style }}
    >
      <GlowFilter id="server-glow" />

      {/* Main rack chassis */}
      <motion.rect
        x="10" y="10" width="110" height="180" rx="4"
        stroke="var(--text-tertiary)" strokeWidth="2.5"
        fill="var(--bg-surface)"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: 'easeInOut' }}
      />

      {/* Server blades */}
      {bladeYPositions.map((y, i) => (
        <g key={i}>
          {/* Blade divider */}
          <motion.line
            x1="10" y1={y} x2="120" y2={y}
            stroke="var(--border-medium)" strokeWidth="1.5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 + i * 0.1 }}
          />

          {/* Status LEDs */}
          <motion.circle
            cx="25" cy={y + 12} r="3"
            fill="var(--accent-green)"
            filter={isProcessing ? 'url(#server-glow)' : 'none'}
            animate={isProcessing ? {
              opacity: [0.2, 1, 0.3, 0.9, 0.1, 1],
            } : { opacity: 0.3 }}
            transition={isProcessing ? {
              duration: 0.4,
              repeat: Infinity,
              delay: i * 0.08,
            } : {}}
          />
          <motion.circle
            cx="38" cy={y + 12} r="2.5"
            fill="var(--accent-amber)"
            animate={isProcessing ? {
              opacity: [0.3, 0.8, 0.2, 1, 0.4],
            } : { opacity: 0.2 }}
            transition={isProcessing ? {
              duration: 0.5,
              repeat: Infinity,
              delay: i * 0.06,
            } : {}}
          />

          {/* Drive bays (small rectangles) */}
          {[0, 1, 2, 3].map(j => (
            <motion.rect
              key={`drive-${i}-${j}`}
              x={55 + j * 15} y={y + 6} width="10" height="14" rx="1"
              stroke="var(--border-medium)" strokeWidth="1"
              fill="var(--bg-elevated)"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              transition={{ delay: 1 + (i * 4 + j) * 0.03 }}
            />
          ))}
        </g>
      ))}

      {/* Ventilation grills at bottom */}
      {[0, 1, 2, 3, 4, 5, 6].map(i => (
        <motion.line
          key={`vent-${i}`}
          x1={25 + i * 12} y1="178" x2={25 + i * 12} y2="186"
          stroke="var(--border-medium)" strokeWidth="1.5" strokeLinecap="round"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 1.2 + i * 0.03 }}
        />
      ))}

      {/* Network port indicator */}
      <motion.rect
        x="85" y="176" width="30" height="14" rx="2"
        stroke="var(--accent-cyan)" strokeWidth="1.5"
        fill="var(--bg-elevated)"
        initial={{ opacity: 0 }}
        animate={{ opacity: isProcessing ? 1 : 0.4 }}
        transition={{ duration: 0.3 }}
      />
      <motion.circle
        cx="105" cy="183" r="2"
        fill="var(--accent-cyan)"
        filter={isProcessing ? 'url(#server-glow)' : 'none'}
        animate={isProcessing ? { opacity: [0, 1, 0, 1] } : { opacity: 0.3 }}
        transition={isProcessing ? { duration: 0.2, repeat: Infinity } : {}}
      />
    </svg>
  );
}

// ---- CPU / IC Chip SVG ----
export function CpuSVG({ stage = 'idle', style, size = 200 }) {
  const scale = size / 200;

  return (
    <svg
      width={size} height={size}
      viewBox="0 0 200 200"
      fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ overflow: 'visible', ...style }}
    >
      <GlowFilter id="cpu-glow" />

      {/* Outer chip package */}
      <motion.rect
        x="30" y="30" width="140" height="140" rx="6"
        stroke="var(--text-tertiary)" strokeWidth="2.5"
        fill="var(--bg-surface)"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1 }}
      />

      {/* Pins - top */}
      {[0, 1, 2, 3, 4, 5, 6].map(i => (
        <motion.line
          key={`pin-t-${i}`}
          x1={50 + i * 16} y1="18" x2={50 + i * 16} y2="30"
          stroke="var(--text-tertiary)" strokeWidth="2" strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 0.5 + i * 0.04 }}
        />
      ))}
      {/* Pins - bottom */}
      {[0, 1, 2, 3, 4, 5, 6].map(i => (
        <motion.line
          key={`pin-b-${i}`}
          x1={50 + i * 16} y1="170" x2={50 + i * 16} y2="182"
          stroke="var(--text-tertiary)" strokeWidth="2" strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 0.5 + i * 0.04 }}
        />
      ))}
      {/* Pins - left */}
      {[0, 1, 2, 3, 4, 5, 6].map(i => (
        <motion.line
          key={`pin-l-${i}`}
          x1="18" y1={50 + i * 16} x2="30" y2={50 + i * 16}
          stroke="var(--text-tertiary)" strokeWidth="2" strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 0.5 + i * 0.04 }}
        />
      ))}
      {/* Pins - right */}
      {[0, 1, 2, 3, 4, 5, 6].map(i => (
        <motion.line
          key={`pin-r-${i}`}
          x1="170" y1={50 + i * 16} x2="182" y2={50 + i * 16}
          stroke="var(--text-tertiary)" strokeWidth="2" strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 0.5 + i * 0.04 }}
        />
      ))}

      {/* Pin 1 marker (dot in top-left corner) */}
      <circle cx="40" cy="40" r="3" fill="var(--text-dim)" />

      {/* Die area - the ALU */}
      <motion.rect
        x="60" y="60" width="80" height="80" rx="2"
        stroke={stage === 'execute' ? 'var(--accent-green)' : stage === 'decode' ? 'var(--accent-amber)' : 'var(--border-medium)'}
        strokeWidth="1.5"
        fill="var(--bg-base)"
        animate={stage === 'execute' ? {
          boxShadow: ['0 0 0px transparent', '0 0 20px var(--accent-green-glow)'],
        } : {}}
        transition={{ duration: 0.3 }}
      />

      {/* ALU label */}
      <text
        x="100" y="98"
        textAnchor="middle"
        fill={stage !== 'idle' ? 'var(--accent-cyan)' : 'var(--text-dim)'}
        fontFamily="var(--font-mono)"
        fontSize="11" fontWeight="600"
      >
        ALU
      </text>

      {/* Stage label */}
      <text
        x="100" y="112"
        textAnchor="middle"
        fill={stage === 'fetch' ? 'var(--accent-amber)' : stage === 'decode' ? 'var(--accent-amber)' : stage === 'execute' ? 'var(--accent-green)' : 'var(--text-dim)'}
        fontFamily="var(--font-mono)"
        fontSize="8" fontWeight="500"
        letterSpacing="0.1em"
      >
        {stage !== 'idle' ? stage.toUpperCase() : ''}
      </text>

      {/* Internal pathways - light up during decode */}
      <motion.path
        d="M30 100 L60 100"
        stroke="var(--accent-amber)" strokeWidth="2" strokeLinecap="round"
        animate={{
          opacity: stage === 'fetch' ? [0.3, 1, 0.3] : stage === 'decode' ? 1 : 0.1,
          strokeWidth: stage === 'decode' ? [2, 4, 2] : 2,
        }}
        transition={{ duration: 0.4, repeat: (stage === 'fetch' || stage === 'decode') ? Infinity : 0 }}
      />
      <motion.path
        d="M140 100 L170 100"
        stroke="var(--accent-amber)" strokeWidth="2" strokeLinecap="round"
        animate={{
          opacity: stage === 'execute' ? [0.3, 1, 0.3] : 0.1,
        }}
        transition={{ duration: 0.3, repeat: stage === 'execute' ? Infinity : 0 }}
      />
      <motion.path
        d="M100 30 L100 60"
        stroke="var(--accent-cyan)" strokeWidth="2" strokeLinecap="round"
        animate={{
          opacity: stage === 'fetch' ? [0.3, 1, 0.3] : 0.1,
        }}
        transition={{ duration: 0.5, repeat: stage === 'fetch' ? Infinity : 0 }}
      />
      <motion.path
        d="M100 140 L100 170"
        stroke="var(--accent-green)" strokeWidth="2" strokeLinecap="round"
        animate={{
          opacity: stage === 'execute' ? [0.3, 1, 0.3] : 0.1,
        }}
        transition={{ duration: 0.3, repeat: stage === 'execute' ? Infinity : 0 }}
      />

      {/* Corner trace details */}
      <motion.path
        d="M38 50 L50 50 L50 38"
        stroke="var(--border-medium)" strokeWidth="1" fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 0.8 }}
      />
      <motion.path
        d="M162 50 L150 50 L150 38"
        stroke="var(--border-medium)" strokeWidth="1" fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 0.9 }}
      />
      <motion.path
        d="M38 150 L50 150 L50 162"
        stroke="var(--border-medium)" strokeWidth="1" fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 1 }}
      />
      <motion.path
        d="M162 150 L150 150 L150 162"
        stroke="var(--border-medium)" strokeWidth="1" fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 1.1 }}
      />
    </svg>
  );
}

// ---- Data Packet / Glowing Orb ----
export function DataPacket({ color = 'var(--accent-cyan)', size = 8 }) {
  return (
    <motion.circle
      r={size}
      fill={color}
      filter="url(#glow)"
      style={{ filter: `drop-shadow(0 0 ${size}px ${color})` }}
    />
  );
}
