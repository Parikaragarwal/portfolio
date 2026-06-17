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
  transitionType: 'none', // 'void-enter', 'dom-tree', 'packet-explode'
  
  startTransition: (targetPath, type) => set({ 
    isTransitioning: true, 
    transitionTarget: targetPath,
    transitionType: type
  }),
  
  endTransition: () => set({ 
    isTransitioning: false, 
    transitionTarget: null,
    transitionType: 'none'
  }),
  
  // Global void state (has the user "entered" the site?)
  hasEnteredVoid: false,
  enterVoid: () => set({ hasEnteredVoid: true })
}));
