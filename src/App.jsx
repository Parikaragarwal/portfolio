import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import FloatingNav from './components/FloatingNav';
import CanvasOverlay from './components/CanvasOverlay';
import { useStore } from './store';

function App() {
  const { hasEnteredVoid, isTransitioning } = useStore();

  return (
    <BrowserRouter>
      <CanvasOverlay />
      
      {/* Only render actual content if we have entered the void and are not currently hiding it behind a transition */}
      {hasEnteredVoid && (
        <div style={{ opacity: isTransitioning ? 0 : 1, transition: 'opacity 0.5s ease', minHeight: '100vh', paddingBottom: '100px' }}>
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/projects" element={<Projects />} />
            </Routes>
          </AnimatePresence>
          <FloatingNav />
        </div>
      )}
    </BrowserRouter>
  );
}

export default App;
