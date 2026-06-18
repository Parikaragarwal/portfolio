import { create } from 'zustand';

export const useStore = create((set, get) => ({
  // --- Theme ---
  theme: (() => {
    // Check localStorage for saved preference, otherwise default to light
    try {
      const saved = localStorage.getItem('portfolio-theme');
      if (saved) {
        document.documentElement.setAttribute('data-theme', saved);
        return saved;
      }
    } catch (e) { /* no-op */ }
    return 'light';
  })(),

  toggleTheme: () => set((state) => {
    const newTheme = state.theme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    try { localStorage.setItem('portfolio-theme', newTheme); } catch (e) { /* no-op */ }
    return { theme: newTheme };
  }),

  // --- Boot Sequence ---
  // Session-based: plays once per browser session, not persisted across tabs
  bootPhase: (() => {
    try {
      if (sessionStorage.getItem('boot-complete')) return 'complete';
    } catch (e) { /* no-op */ }
    return 'idle';
  })(),

  setBootPhase: (phase) => {
    if (phase === 'complete') {
      try { sessionStorage.setItem('boot-complete', 'true'); } catch (e) { /* no-op */ }
    }
    set({ bootPhase: phase });
  },

  skipBoot: () => {
    try { sessionStorage.setItem('boot-complete', 'true'); } catch (e) { /* no-op */ }
    set({ bootPhase: 'complete' });
  },

  replayBoot: () => {
    try { sessionStorage.removeItem('boot-complete'); } catch (e) { /* no-op */ }
    set({ bootPhase: 'idle' });
  },

  // --- Navigation ---
  activeSection: 'hero',
  setActiveSection: (section) => set({ activeSection: section }),
}));
