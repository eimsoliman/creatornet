import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { NodeNetwork } from './NodeNetwork';
import { HeroContent } from './HeroContent';

export const InteractiveHeader = () => {
  return (
    <div className="relative min-h-screen bg-gradient-primary overflow-hidden">
      {/* 3D Background Network */}
      <div className="absolute inset-0">
        <Canvas
          camera={{ 
            position: [0, 0, 10], 
            fov: 75,
            near: 0.1,
            far: 1000
          }}
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true }}
        >
          <Suspense fallback={null}>
            <ambientLight intensity={0.4} />
            <pointLight position={[10, 10, 10]} intensity={0.8} color="#c4b5fd" />
            <pointLight position={[-10, -10, -10]} intensity={0.3} color="#fde047" />
            
            <NodeNetwork />
            
            <OrbitControls
              enablePan={false}
              enableZoom={false}
              enableRotate={true}
              autoRotate={true}
              autoRotateSpeed={0.5}
              maxPolarAngle={Math.PI / 2}
              minPolarAngle={Math.PI / 2}
            />
          </Suspense>
        </Canvas>
      </div>

      {/* Hero Content Overlay */}
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <HeroContent />
      </div>

      {/* Gradient Overlay for Better Text Readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-background/20 pointer-events-none" />
    </div>
  );
};