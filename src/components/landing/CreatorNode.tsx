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
      {/* Main sphere node */}
      <mesh
        ref={meshRef}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={onClick}
      >
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial
          color={isHighlighted ? "#e879f9" : "#c4b5fd"}
          emissive={isHighlighted ? "#7c3aed" : "#6366f1"}
          emissiveIntensity={isHighlighted ? 0.3 : 0.1}
          opacity={isDimmed ? 0.3 : 1}
          transparent
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Glow effect */}
      {isHighlighted && (
        <mesh>
          <sphereGeometry args={[0.5, 16, 16]} />
          <meshBasicMaterial
            color="#c4b5fd"
            opacity={0.2}
            transparent
            side={THREE.BackSide}
          />
        </mesh>
      )}

      {/* Floating particles around highlighted node */}
      {isHighlighted && Array.from({ length: 6 }).map((_, i) => (
        <mesh
          key={i}
          position={[
            Math.cos((i / 6) * Math.PI * 2) * 0.8,
            Math.sin((i / 6) * Math.PI * 2) * 0.8,
            0
          ]}
        >
          <sphereGeometry args={[0.02, 8, 8]} />
          <meshBasicMaterial color="#fde047" />
        </mesh>
      ))}

      {/* Info popup on hover/selection */}
      {(hovered || isHighlighted) && (
        <Html position={[0, 0.6, 0]} center>
          <div className="bg-card/90 backdrop-blur-sm border border-border rounded-lg p-3 shadow-lg max-w-xs">
            <h3 className="font-semibold text-foreground text-sm mb-1">{name}</h3>
            <p className="text-muted-foreground text-xs">{specialty}</p>
            <div className="mt-2 px-2 py-1 bg-creator-node/20 rounded text-xs text-creator-node font-medium">
              Creator
            </div>
          </div>
        </Html>
      )}
    </group>
  );
};