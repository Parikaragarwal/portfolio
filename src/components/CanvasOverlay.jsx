import React, { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Box, Cylinder } from '@react-three/drei';
import { useStore } from '../store';
import { useNavigate } from 'react-router-dom';
import * as THREE from 'three';
import { PORTFOLIO_DATA } from '../data/portfolio';

// Procedural Models

function Laptop({ position, scale = 1, isOpen = true }) {
  const group = useRef();
  return (
    <group position={position} scale={scale} ref={group}>
      {/* Base */}
      <Box args={[2, 0.1, 1.5]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#888888" metalness={0.8} roughness={0.2} />
      </Box>
      {/* Screen */}
      <group position={[0, 0.05, -0.7]} rotation={[isOpen ? -Math.PI / 6 : -Math.PI / 2, 0, 0]}>
        <Box args={[2, 1.4, 0.05]} position={[0, 0.7, 0]}>
          <meshStandardMaterial color="#333333" metalness={0.9} roughness={0.1} />
        </Box>
        {/* Glowing Screen Face */}
        <Box args={[1.9, 1.3, 0.01]} position={[0, 0.7, 0.03]}>
          <meshBasicMaterial color="#E8F2EB" />
        </Box>
      </group>
    </group>
  );
}

function ServerRack({ position, isProcessing }) {
  const rackRef = useRef();
  
  useFrame(() => {
    if (isProcessing && rackRef.current) {
      rackRef.current.position.x = position[0] + (Math.random() - 0.5) * 0.1;
      rackRef.current.position.y = position[1] + (Math.random() - 0.5) * 0.1;
    } else if (rackRef.current) {
      rackRef.current.position.set(...position);
    }
  });

  return (
    <group ref={rackRef}>
      {/* Main Rack Body */}
      <Box args={[1.5, 4, 1.5]} position={[0, 2, 0]}>
        <meshStandardMaterial color="#111" metalness={0.5} roughness={0.8} />
      </Box>
      {/* Server Blades / Lights */}
      {[0.5, 1.2, 1.9, 2.6, 3.3].map((y, i) => (
        <group key={i} position={[0, y, 0.76]}>
          <Box args={[1.3, 0.4, 0.1]}>
            <meshStandardMaterial color="#222" />
          </Box>
          {/* LED lights */}
          <Box args={[0.1, 0.05, 0.02]} position={[-0.4, 0, 0.06]}>
            <meshBasicMaterial color={isProcessing ? (Math.random() > 0.5 ? '#8CD9B1' : '#ff3333') : '#333'} />
          </Box>
          <Box args={[0.1, 0.05, 0.02]} position={[-0.2, 0, 0.06]}>
            <meshBasicMaterial color={isProcessing ? '#8CD9B1' : '#333'} />
          </Box>
        </group>
      ))}
    </group>
  );
}

function HardwareCPU({ position, isVibrating }) {
  const cpuRef = useRef();

  useFrame(() => {
    if (isVibrating && cpuRef.current) {
      cpuRef.current.rotation.z = (Math.random() - 0.5) * 0.05;
      cpuRef.current.position.y = position[1] + (Math.random() - 0.5) * 0.02;
    } else if (cpuRef.current) {
      cpuRef.current.rotation.z = 0;
      cpuRef.current.position.y = position[1];
    }
  });

  return (
    <group position={position} ref={cpuRef} rotation={[Math.PI / 2, 0, 0]}>
      {/* Green substrate */}
      <Box args={[2, 2, 0.1]}>
        <meshStandardMaterial color="#1A3324" />
      </Box>
      {/* Silver heat spreader */}
      <Box args={[1.4, 1.4, 0.1]} position={[0, 0, 0.1]}>
        <meshStandardMaterial color="#cccccc" metalness={0.9} roughness={0.2} />
      </Box>
      <Text position={[0, 0, 0.16]} fontSize={0.3} color="#333" rotation={[0, 0, 0]}>
        CORE
      </Text>
    </group>
  );
}


// Sequences

function BootJourney({ onComplete }) {
  const [stage, setStage] = useState(0); 
  const packetRef = useRef();
  const laptopGroupRef = useRef();
  
  useEffect(() => {
    const t1 = setTimeout(() => setStage(1), 800); // Packet out
    const t2 = setTimeout(() => setStage(2), 2000); // Server processing
    const t3 = setTimeout(() => setStage(3), 3500); // Packet back
    const t4 = setTimeout(() => setStage(4), 4700); // Blast
    const t5 = setTimeout(() => onComplete(), 5500); // Complete
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); clearTimeout(t5); };
  }, [onComplete]);

  useFrame((state, delta) => {
    // Smooth out camera look
    state.camera.lookAt(0, 0, 0);

    if (packetRef.current) {
      if (stage === 1) {
        // Move towards server smoothly
        packetRef.current.position.x = THREE.MathUtils.lerp(packetRef.current.position.x, 4, delta * 3);
      }
      if (stage === 3) {
        // Move towards laptop smoothly
        packetRef.current.position.x = THREE.MathUtils.lerp(packetRef.current.position.x, -4, delta * 3);
      }
    }

    if (stage === 4) {
      // Laptop blast
      state.camera.fov = THREE.MathUtils.lerp(state.camera.fov, 1, delta * 5);
      state.camera.updateProjectionMatrix();
      if (laptopGroupRef.current) {
        // Scale laptop up towards camera
        const s = laptopGroupRef.current.scale.x;
        laptopGroupRef.current.scale.set(s + delta * 2, s + delta * 2, s + delta * 2);
      }
    }
  });

  return (
    <group>
      <group ref={laptopGroupRef}>
        <Laptop position={[-4, -1, 0]} isOpen={true} />
      </group>
      
      <ServerRack position={[4, -2, -2]} isProcessing={stage === 2} />
      
      {(stage === 1 || stage === 3) && (
        <Box ref={packetRef} args={[0.2, 0.2, 0.2]} position={[stage === 1 ? -3 : 3, 0, 0]}>
          <meshBasicMaterial color="#8CD9B1" />
        </Box>
      )}
    </group>
  );
}

function CPUPainter({ targetPath, onComplete }) {
  const { incrementPaintedItems } = useStore();
  const [stage, setStage] = useState(0); // 0: Idle, 1: Loading JSON, 2: Painting lines
  const totalProjects = PORTFOLIO_DATA.projects.length;

  useEffect(() => {
    const t1 = setTimeout(() => setStage(1), 1000);
    const t2 = setTimeout(() => setStage(2), 2500);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  useEffect(() => {
    if (stage === 2) {
      // The CPU vibrates and "shoots" a beam, incrementing the painted items in UI.
      // It speeds up as it goes.
      let currentItem = 0;
      let delay = 800; // start slow

      const paintNext = () => {
        if (currentItem < totalProjects) {
          incrementPaintedItems();
          currentItem++;
          delay = Math.max(150, delay - 200); // speed up dramatically
          setTimeout(paintNext, delay);
        } else {
          setTimeout(onComplete, 1000);
        }
      };
      
      const t = setTimeout(paintNext, delay);
      return () => clearTimeout(t);
    }
  }, [stage, totalProjects, incrementPaintedItems, onComplete]);

  return (
    <group>
      {/* Floating JSON file */}
      {stage >= 1 && (
        <group position={[2, 1, 0]}>
          <Box args={[1.5, 2, 0.05]}>
            <meshStandardMaterial color="#fff" />
          </Box>
          <Text position={[0, 0, 0.03]} fontSize={0.15} color="#333" maxWidth={1.3}>
            {`[\n  { "id": "p1" },\n  { "id": "p2" }\n]`}
          </Text>
        </group>
      )}

      {/* The Hardware CPU Painter */}
      <HardwareCPU position={[-1, 0, 0]} isVibrating={stage === 2} />

      {/* The Laser beam painting the screen */}
      {stage === 2 && (
        <mesh position={[-1, 0, 2]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.05, 0.05, 5, 8]} />
          <meshBasicMaterial color="#8CD9B1" transparent opacity={0.6} />
        </mesh>
      )}
    </group>
  );
}


export default function CanvasOverlay() {
  const { hasEnteredVoid, isTransitioning, transitionTarget, transitionType, endTransition, animationsEnabled, enterVoid } = useStore();
  const navigate = useNavigate();

  const handleComplete = () => {
    if (transitionTarget) {
      navigate(transitionTarget);
    }
    endTransition();
  };

  const handleBootComplete = () => {
    enterVoid();
  };

  // If animations are globally disabled, just don't render the blocking overlay at all
  if (!animationsEnabled) {
    if (!hasEnteredVoid) enterVoid(); // instantly enter
    if (isTransitioning) handleComplete(); // instantly complete
    return null; 
  }

  // Once entered and not transitioning, don't show canvas
  if (hasEnteredVoid && !isTransitioning) return null;

  return (
    <div id="webgl-container" style={{ background: hasEnteredVoid ? 'transparent' : '#0F1A14' }}>
      <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
        <React.Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <pointLight position={[-10, -10, -10]} intensity={0.2} />

          {!hasEnteredVoid && <BootJourney onComplete={handleBootComplete} />}
          
          {isTransitioning && transitionType === 'cpu-painter' && (
            <CPUPainter targetPath={transitionTarget} onComplete={handleComplete} />
          )}
        </React.Suspense>
      </Canvas>
    </div>
  );
}
