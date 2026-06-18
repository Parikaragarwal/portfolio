import { create } from 'zustand';

export const useStore = create((set, get) => ({
  // --- Theme ---
  theme: (() => {
    // 1. Check localStorage for a saved manual preference
    try {
      const saved = localStorage.getItem('portfolio-theme');
      if (saved) {
        document.documentElement.setAttribute('data-theme', saved);
        return saved;
      }
    } catch (e) { /* no-op */ }
    // 2. Detect OS / browser preference via prefers-color-scheme
    try {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const osTheme = prefersDark ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', osTheme);
      return osTheme;
    } catch (e) { /* no-op */ }
    return 'light';
  })(),

  // Tracks whether the user manually toggled the theme (vs OS auto-detection)
  themeManuallySet: (() => {
    try { return !!localStorage.getItem('portfolio-theme'); } catch (e) { return false; }
  })(),

  toggleTheme: () => set((state) => {
    const newTheme = state.theme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    try { localStorage.setItem('portfolio-theme', newTheme); } catch (e) { /* no-op */ }
    return { theme: newTheme, themeManuallySet: true };
  }),

  // Called by OS theme change listener — only applies if user hasn't manually toggled
  setThemeFromOS: (osTheme) => set((state) => {
    if (state.themeManuallySet) return state;
    document.documentElement.setAttribute('data-theme', osTheme);
    return { theme: osTheme };
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
