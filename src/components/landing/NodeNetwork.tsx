import React, { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { CreatorNode } from './CreatorNode';
import { MediaNode } from './MediaNode';
import { ConnectionLines } from './ConnectionLines';
import * as THREE from 'three';

interface NodeData {
  id: string;
  type: 'creator' | 'media';
  position: [number, number, number];
  name: string;
  specialty?: string;
  mediaType?: string;
  connections: string[];
  color?: string;
}

export const NodeNetwork = () => {
  const groupRef = useRef<THREE.Group>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  // Generate network data
  const networkData = useMemo<NodeData[]>(() => [
    // Creators (circles)
    {
      id: 'creator1',
      type: 'creator',
      position: [0, 0, 0],
      name: 'Alex Chen',
      specialty: 'Visual Artist',
      connections: ['media1', 'media2', 'creator2'],
      color: '#c4b5fd'
    },
    {
      id: 'creator2',
      type: 'creator',
      position: [4, 2, -1],
      name: 'Maya Rodriguez',
      specialty: 'Film Director',
      connections: ['media1', 'media3', 'creator3'],
      color: '#c4b5fd'
    },
    {
      id: 'creator3',
      type: 'creator',
      position: [-3, -2, 1],
      name: 'Jordan Kim',
      specialty: 'Music Producer',
      connections: ['media2', 'media4', 'creator4'],
      color: '#c4b5fd'
    },
    {
      id: 'creator4',
      type: 'creator',
      position: [2, -3, 2],
      name: 'Sam Turner',
      specialty: 'Fashion Designer',
      connections: ['media3', 'media4', 'creator1'],
      color: '#c4b5fd'
    },
    {
      id: 'creator5',
      type: 'creator',
      position: [-4, 1, -2],
      name: 'Riley Foster',
      specialty: '3D Artist',
      connections: ['media1', 'media5', 'creator3'],
      color: '#c4b5fd'
    },
    
    // Media/Projects (squares)
    {
      id: 'media1',
      type: 'media',
      position: [2, 1, 0],
      name: 'Neon Dreams Campaign',
      mediaType: 'Advertisement',
      connections: ['creator1', 'creator2', 'creator5'],
      color: '#fde047'
    },
    {
      id: 'media2',
      type: 'media',
      position: [-1, -1, -1],
      name: 'Short Film: Echoes',
      mediaType: 'Film',
      connections: ['creator1', 'creator3'],
      color: '#fde047'
    },
    {
      id: 'media3',
      type: 'media',
      position: [1, 2, 1],
      name: 'Fashion Week Collection',
      mediaType: 'Fashion',
      connections: ['creator2', 'creator4'],
      color: '#fde047'
    },
    {
      id: 'media4',
      type: 'media',
      position: [-2, 0, 2],
      name: 'Music Video: Starlight',
      mediaType: 'Music Video',
      connections: ['creator3', 'creator4'],
      color: '#fde047'
    },
    {
      id: 'media5',
      type: 'media',
      position: [-3, 2, -1],
      name: '3D Printed Jewelry',
      mediaType: '3D Product',
      connections: ['creator5'],
      color: '#fde047'
    }
  ], []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.001;
    }
  });

  const handleNodeHover = (nodeId: string | null) => {
    setHoveredNode(nodeId);
  };

  const handleNodeClick = (nodeId: string) => {
    setSelectedNode(selectedNode === nodeId ? null : nodeId);
  };

  return (
    <group ref={groupRef}>
      {/* Render Nodes */}
      {networkData.map((node) => {
        const isHighlighted = hoveredNode === node.id || selectedNode === node.id;
        const isConnected = selectedNode && node.connections.includes(selectedNode);
        const shouldDimmed = (hoveredNode || selectedNode) && !isHighlighted && !isConnected;

        if (node.type === 'creator') {
          return (
            <CreatorNode
              key={node.id}
              position={node.position}
              name={node.name}
              specialty={node.specialty!}
              isHighlighted={isHighlighted}
              isDimmed={shouldDimmed}
              onHover={() => handleNodeHover(node.id)}
              onHoverExit={() => handleNodeHover(null)}
              onClick={() => handleNodeClick(node.id)}
            />
          );
        } else {
          return (
            <MediaNode
              key={node.id}
              position={node.position}
              name={node.name}
              mediaType={node.mediaType!}
              isHighlighted={isHighlighted}
              isDimmed={shouldDimmed}
              onHover={() => handleNodeHover(node.id)}
              onHoverExit={() => handleNodeHover(null)}
              onClick={() => handleNodeClick(node.id)}
            />
          );
        }
      })}

      {/* Render Connection Lines */}
      <ConnectionLines 
        networkData={networkData}
        hoveredNode={hoveredNode}
        selectedNode={selectedNode}
      />
    </group>
  );
};