import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { NodeNetwork } from './NodeNetwork';
import { HeroContent } from './HeroContent';

export const InteractiveHeader = () => {
  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      {/* 3D Interactive Network - Full Screen */}
      <div className="absolute inset-0">
        <Canvas
          camera={{ 
            position: [0, 0, 15], 
            fov: 60,
            near: 0.1,
            far: 1000
          }}
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true }}
        >
          <Suspense fallback={null}>
            {/* Minimal lighting for neon effect */}
            <ambientLight intensity={0.2} />
            <pointLight position={[10, 10, 10]} intensity={0.5} color="#ffffff" />
            
            <NodeNetwork />
            
            {/* Full interactive controls */}
            <OrbitControls
              enablePan={true}
              enableZoom={true}
              enableRotate={true}
              autoRotate={false}
              enableDamping={true}
              dampingFactor={0.1}
              maxDistance={30}
              minDistance={5}
              maxPolarAngle={Math.PI}
              minPolarAngle={0}
            />
          </Suspense>
        </Canvas>
      </div>

      {/* Minimal Hero Content Overlay */}
      <div className="relative z-10 flex items-center justify-center min-h-screen pointer-events-none">
        <HeroContent />
      </div>

      {/* Subtle vignette effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-background/20 via-transparent to-background/20 pointer-events-none" />
    </div>
  );
};