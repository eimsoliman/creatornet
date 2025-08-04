import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Html } from '@react-three/drei';
import * as THREE from 'three';

interface CreatorNodeProps {
  position: [number, number, number];
  name: string;
  specialty: string;
  isHighlighted: boolean;
  isDimmed: boolean;
  onHover: () => void;
  onHoverExit: () => void;
  onClick: () => void;
}

export const CreatorNode: React.FC<CreatorNodeProps> = ({
  position,
  name,
  specialty,
  isHighlighted,
  isDimmed,
  onHover,
  onHoverExit,
  onClick
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      // Gentle floating animation
      meshRef.current.position.y += Math.sin(state.clock.elapsedTime + position[0]) * 0.002;
      
      // Scale animation on hover/highlight
      const targetScale = isHighlighted ? 1.3 : hovered ? 1.1 : 1;
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
      
      // Subtle rotation
      meshRef.current.rotation.z += 0.005;
    }
  });

  const handlePointerOver = () => {
    setHovered(true);
    onHover();
    document.body.style.cursor = 'pointer';
  };

  const handlePointerOut = () => {
    setHovered(false);
    onHoverExit();
    document.body.style.cursor = 'auto';
  };

  return (
    <group position={position}>
      {/* Main sphere node with neon glow */}
      <mesh
        ref={meshRef}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={onClick}
      >
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#ffffff"
          emissiveIntensity={isHighlighted ? 0.8 : 0.4}
          opacity={isDimmed ? 0.2 : 1}
          transparent
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>

      {/* Outer glow ring */}
      <mesh>
        <sphereGeometry args={[isHighlighted ? 0.7 : 0.5, 16, 16]} />
        <meshBasicMaterial
          color="#ffffff"
          opacity={isHighlighted ? 0.3 : 0.1}
          transparent
          side={THREE.BackSide}
        />
      </mesh>

      {/* Floating particles around highlighted node */}
      {isHighlighted && Array.from({ length: 8 }).map((_, i) => (
        <mesh
          key={i}
          position={[
            Math.cos((i / 8) * Math.PI * 2) * 1.0,
            Math.sin((i / 8) * Math.PI * 2) * 1.0,
            (Math.random() - 0.5) * 0.4
          ]}
        >
          <sphereGeometry args={[0.03, 8, 8]} />
          <meshBasicMaterial 
            color="#ffffff" 
          />
        </mesh>
      ))}

      {/* Info popup on hover/selection */}
      {(hovered || isHighlighted) && (
        <Html position={[0, 0.8, 0]} center>
          <div className="bg-background/95 backdrop-blur-sm neon-border rounded-lg p-3 shadow-lg max-w-xs">
            <h3 className="font-semibold text-foreground text-sm mb-1">{name}</h3>
            <p className="text-muted-foreground text-xs">{specialty}</p>
            <div className="mt-2 px-2 py-1 bg-foreground/10 neon-border rounded text-xs text-foreground font-medium">
              Creator
            </div>
          </div>
        </Html>
      )}
    </group>
  );
};