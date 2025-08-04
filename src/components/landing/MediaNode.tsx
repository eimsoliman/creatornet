import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

interface MediaNodeProps {
  position: [number, number, number];
  name: string;
  mediaType: string;
  isHighlighted: boolean;
  isDimmed: boolean;
  onHover: () => void;
  onHoverExit: () => void;
  onClick: () => void;
}

export const MediaNode: React.FC<MediaNodeProps> = ({
  position,
  name,
  mediaType,
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
      // Gentle floating animation with different pattern than creators
      meshRef.current.position.y += Math.cos(state.clock.elapsedTime + position[0] * 1.5) * 0.003;
      
      // Scale animation on hover/highlight
      const targetScale = isHighlighted ? 1.2 : hovered ? 1.05 : 1;
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
      
      // Subtle rotation
      meshRef.current.rotation.x += 0.003;
      meshRef.current.rotation.y += 0.002;
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
      {/* Main cube node with neon glow */}
      <mesh
        ref={meshRef}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={onClick}
      >
        <boxGeometry args={[0.5, 0.5, 0.5]} />
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

      {/* Wireframe glow overlay */}
      <mesh>
        <boxGeometry args={[isHighlighted ? 0.7 : 0.6, isHighlighted ? 0.7 : 0.6, isHighlighted ? 0.7 : 0.6]} />
        <meshBasicMaterial
          color="#ffffff"
          wireframe
          opacity={isHighlighted ? 0.6 : 0.2}
          transparent
        />
      </mesh>

      {/* Corner accent cubes for highlighted state */}
      {isHighlighted && Array.from({ length: 4 }).map((_, i) => (
        <mesh
          key={i}
          position={[
            (i % 2 === 0 ? -1 : 1) * 0.8,
            (i < 2 ? -1 : 1) * 0.8,
            0
          ]}
        >
          <boxGeometry args={[0.1, 0.1, 0.1]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
      ))}

      {/* Info popup on hover/selection */}
      {(hovered || isHighlighted) && (
        <Html position={[0, 0.8, 0]} center>
          <div className="bg-background/95 backdrop-blur-sm neon-border rounded-lg p-3 shadow-lg max-w-xs">
            <h3 className="font-semibold text-foreground text-sm mb-1">{name}</h3>
            <p className="text-muted-foreground text-xs">{mediaType}</p>
            <div className="mt-2 px-2 py-1 bg-foreground/10 neon-border rounded text-xs text-foreground font-medium">
              Media Project
            </div>
          </div>
        </Html>
      )}
    </group>
  );
};