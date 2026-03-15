'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

function BackgroundElements() {
  const points = useMemo(() => {
    const p = new Float32Array(500 * 3);
    for (let i = 0; i < 500; i++) {
      p[i * 3] = (Math.random() - 0.5) * 10;
      p[i * 3 + 1] = (Math.random() - 0.5) * 10;
      p[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return p;
  }, []);

  const ref = useRef<THREE.Points>(null!);
  useFrame((state) => {
    ref.current.rotation.y = state.clock.getElapsedTime() * 0.05;
    ref.current.rotation.x = state.clock.getElapsedTime() * 0.03;
  });

  return (
    <group>
      <points ref={ref}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={points.length / 3}
            array={points}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial size={0.02} color="#4f46e5" transparent opacity={0.4} sizeAttenuation />
      </points>
      
      <Float speed={2} rotationIntensity={1} floatIntensity={1}>
        <Sphere args={[1, 64, 64]} position={[3, 1, -2]}>
          <MeshDistortMaterial
            color="#4338ca"
            speed={3}
            distort={0.4}
            radius={1}
            transparent
            opacity={0.1}
          />
        </Sphere>
      </Float>
    </group>
  );
}

export default function Scene3D() {
  return (
    <div className="absolute inset-0 -z-10 bg-white">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <BackgroundElements />
      </Canvas>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-white" />
    </div>
  );
}
