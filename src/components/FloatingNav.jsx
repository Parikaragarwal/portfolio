import { useStore } from '../store';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Moon, Sun, Play, Square, Terminal } from 'lucide-react';
import { motion } from 'framer-motion';

export default function FloatingNav() {
  const { theme, toggleTheme, animationsEnabled, toggleAnimations, startTransition, hasEnteredVoid } = useStore();
  const location = useLocation();
  const navigate = useNavigate();

  if (!hasEnteredVoid) return null;

  const handleNav = (path, type) => {
    if (location.pathname === path) return;
    if (!animationsEnabled) {
      navigate(path);
      return;
    }
    // Start the global 3D transition instead of immediate navigation
    startTransition(path, type);
  };

  return (
    <motion.nav 
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      style={{
        position: 'fixed',
        bottom: '2rem',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        alignItems: 'center',
        gap: '1.5rem',
        padding: '0.75rem 2rem',
        background: 'var(--bg-base)',
        border: '1px solid var(--border-light)',
        borderRadius: '50px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
        zIndex: 50,
        backdropFilter: 'blur(10px)'
      }}
    >
      <button onClick={() => handleNav('/', 'packet-explode')} style={btnStyle(location.pathname === '/')}>Mind</button>
      <button onClick={() => handleNav('/projects', 'dom-tree')} style={btnStyle(location.pathname === '/projects')}>Machine</button>
      
      <div style={{ width: '1px', height: '20px', background: 'var(--border-light)', margin: '0 0.5rem' }} />

      <button onClick={toggleTheme} style={iconBtnStyle} title="Toggle Theme">
        {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
      </button>

      <button onClick={toggleAnimations} style={iconBtnStyle} title="Toggle Animations">
        {animationsEnabled ? <Square size={18} /> : <Play size={18} />}
      </button>
    </motion.nav>
  );
}

const btnStyle = (active) => ({
  background: 'transparent',
  border: 'none',
  color: active ? 'var(--accent-primary)' : 'var(--text-muted)',
  fontFamily: 'var(--font-heading)',
  fontWeight: active ? 600 : 400,
  fontSize: '1rem',
  cursor: 'pointer',
  transition: 'color 0.2s'
});

const iconBtnStyle = {
  background: 'transparent',
  border: 'none',
  color: 'var(--text-muted)',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'color 0.2s'
};
