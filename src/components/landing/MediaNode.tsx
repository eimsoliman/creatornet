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
      {/* Main cube node */}
      <mesh
        ref={meshRef}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={onClick}
      >
        <boxGeometry args={[0.4, 0.4, 0.4]} />
        <meshStandardMaterial
          color={isHighlighted ? "#fef08a" : "#fde047"}
          emissive={isHighlighted ? "#f59e0b" : "#eab308"}
          emissiveIntensity={isHighlighted ? 0.3 : 0.1}
          opacity={isDimmed ? 0.3 : 1}
          transparent
          roughness={0.3}
          metalness={0.6}
        />
      </mesh>

      {/* Wireframe overlay for highlighted state */}
      {isHighlighted && (
        <mesh>
          <boxGeometry args={[0.45, 0.45, 0.45]} />
          <meshBasicMaterial
            color="#fde047"
            wireframe
            opacity={0.6}
            transparent
          />
        </mesh>
      )}

      {/* Corner accent cubes for highlighted state */}
      {isHighlighted && Array.from({ length: 4 }).map((_, i) => (
        <mesh
          key={i}
          position={[
            (i % 2 === 0 ? -1 : 1) * 0.6,
            (i < 2 ? -1 : 1) * 0.6,
            0
          ]}
        >
          <boxGeometry args={[0.08, 0.08, 0.08]} />
          <meshBasicMaterial color="#c4b5fd" />
        </mesh>
      ))}

      {/* Info popup on hover/selection */}
      {(hovered || isHighlighted) && (
        <Html position={[0, 0.6, 0]} center>
          <div className="bg-card/90 backdrop-blur-sm border border-border rounded-lg p-3 shadow-lg max-w-xs">
            <h3 className="font-semibold text-foreground text-sm mb-1">{name}</h3>
            <p className="text-muted-foreground text-xs">{mediaType}</p>
            <div className="mt-2 px-2 py-1 bg-media-node/20 rounded text-xs text-media-node font-medium">
              Media Project
            </div>
          </div>
        </Html>
      )}
    </group>
  );
};