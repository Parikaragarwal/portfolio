import { create } from 'zustand';

export const useStore = create((set) => ({
  theme: 'light',
  toggleTheme: () => set((state) => {
    const newTheme = state.theme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    return { theme: newTheme };
  }),
  
  animationsEnabled: true,
  toggleAnimations: () => set((state) => ({ animationsEnabled: !state.animationsEnabled })),
  
  // Transition state management
  isTransitioning: false,
  transitionTarget: null,
  transitionType: 'none', // 'boot-sequence', 'cpu-painter'
  
  startTransition: (targetPath, type) => set({ 
    isTransitioning: true, 
    transitionTarget: targetPath,
    transitionType: type,
    paintedItems: 0 // reset painter
  }),
  
  endTransition: () => set({ 
    isTransitioning: false, 
    transitionTarget: null,
    transitionType: 'none'
  }),
  
  // Painter logic for Projects page
  paintedItems: 0,
  incrementPaintedItems: () => set((state) => ({ paintedItems: state.paintedItems + 1 })),
  
  // Global void state (has the user "entered" the site?)
  hasEnteredVoid: false,
  enterVoid: () => set({ hasEnteredVoid: true })
}));
