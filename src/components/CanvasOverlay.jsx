import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Text, Float, Trail, Sphere, Line } from '@react-three/drei';
import { useStore } from '../store';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as THREE from 'three';

// 1. The Void Sequence (Initial Boot)
function VoidSequence() {
  const { enterVoid } = useStore();
  const [pressed, setPressed] = useState(false);
  const groupRef = useRef();

  useFrame((state) => {
    if (pressed && groupRef.current) {
      groupRef.current.position.z += 0.5; // Fly into the void
      if (groupRef.current.position.z > 20) {
        enterVoid(); // Transition to site
      }
    }
  });

  return (
    <group ref={groupRef}>
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      {!pressed && (
        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
          <Text
            position={[0, 0, 0]}
            fontSize={0.5}
            color="#34D399"
            onClick={() => setPressed(true)}
            onPointerOver={() => document.body.style.cursor = 'pointer'}
            onPointerOut={() => document.body.style.cursor = 'auto'}
          >
            Enter the Machine
          </Text>
        </Float>
      )}
    </group>
  );
}

// 2. The Packet Explode Sequence
function PacketSequence({ targetPath, onComplete }) {
  const orbRef = useRef();
  const [exploded, setExploded] = useState(false);

  useFrame((state, delta) => {
    if (!orbRef.current) return;
    
    // Fly in from right (-10 to 0)
    if (orbRef.current.position.x > 0 && !exploded) {
      orbRef.current.position.x -= delta * 15;
    } else if (!exploded) {
      setExploded(true);
      // Trigger dramatic explosion via state
      setTimeout(onComplete, 800); // Give explosion time to play
    }

    if (exploded) {
      orbRef.current.scale.x += delta * 50;
      orbRef.current.scale.y += delta * 50;
      orbRef.current.scale.z += delta * 50;
      orbRef.current.material.opacity = Math.max(0, orbRef.current.material.opacity - delta * 2);
    }
  });

  return (
    <group>
      {/* Wire */}
      <Line points={[[-20, 0, 0], [20, 0, 0]]} color="#2EA879" lineWidth={1} transparent opacity={0.3} />
      <Trail width={2} length={10} color="#34D399" attenuation={(t) => t * t}>
        <Sphere ref={orbRef} args={[0.2, 32, 32]} position={[15, 0, 0]}>
          <meshBasicMaterial color="#34D399" transparent opacity={1} />
        </Sphere>
      </Trail>
    </group>
  );
}

// 3. The DOM/CSSOM Parse Tree Sequence
function DOMTreeSequence({ onComplete }) {
  const groupRef = useRef();
  
  useEffect(() => {
    // A simplified timeout sequence simulating tree construction
    const t = setTimeout(onComplete, 2000);
    return () => clearTimeout(t);
  }, [onComplete]);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Simple representation of merging trees */}
      <Sphere position={[-2, 1, 0]} args={[0.3, 16, 16]}>
        <meshBasicMaterial color="#2EA879" wireframe />
      </Sphere>
      <Line points={[[-2, 1, 0], [0, -1, 0]]} color="#E5B25D" />
      
      <Sphere position={[2, 1, 0]} args={[0.3, 16, 16]}>
        <meshBasicMaterial color="#E5B25D" wireframe />
      </Sphere>
      <Line points={[[2, 1, 0], [0, -1, 0]]} color="#E5B25D" />

      <Sphere position={[0, -1, 0]} args={[0.5, 32, 32]}>
        <meshBasicMaterial color="#34D399" wireframe />
      </Sphere>
      
      <Text position={[0, -2, 0]} fontSize={0.3} color="#1A2E26">CPU Processing...</Text>
    </group>
  );
}


export default function CanvasOverlay() {
  const { hasEnteredVoid, isTransitioning, transitionTarget, transitionType, endTransition, theme, animationsEnabled } = useStore();
  const navigate = useNavigate();

  // Handle routing exactly when animation finishes
  const handleComplete = () => {
    if (transitionTarget) {
      navigate(transitionTarget);
    }
    endTransition();
  };

  // If animations are off, we shouldn't render the 3D blocking overlay
  if (!animationsEnabled && hasEnteredVoid && !isTransitioning) return null;
  if (hasEnteredVoid && !isTransitioning) return null;

  return (
    <div id="webgl-container" style={{ background: hasEnteredVoid ? 'transparent' : '#000' }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <React.Suspense fallback={null}>
          {!hasEnteredVoid && <VoidSequence />}
          
          {isTransitioning && transitionType === 'packet-explode' && (
            <PacketSequence targetPath={transitionTarget} onComplete={handleComplete} />
          )}

          {isTransitioning && transitionType === 'dom-tree' && (
            <DOMTreeSequence targetPath={transitionTarget} onComplete={handleComplete} />
          )}
        </React.Suspense>
      </Canvas>
    </div>
  );
}
