import React, { useMemo } from 'react';
import * as THREE from 'three';

interface NodeData {
  id: string;
  type: 'creator' | 'media';
  position: [number, number, number];
  connections: string[];
}

interface ConnectionLinesProps {
  networkData: NodeData[];
  hoveredNode: string | null;
  selectedNode: string | null;
}

export const ConnectionLines: React.FC<ConnectionLinesProps> = ({
  networkData,
  hoveredNode,
  selectedNode
}) => {
  const connections = useMemo(() => {
    const lines: Array<{
      start: [number, number, number];
      end: [number, number, number];
      isHighlighted: boolean;
    }> = [];

    networkData.forEach((node) => {
      node.connections.forEach((connectionId) => {
        const connectedNode = networkData.find(n => n.id === connectionId);
        if (connectedNode) {
          const isHighlighted = 
            (hoveredNode && (hoveredNode === node.id || hoveredNode === connectionId)) ||
            (selectedNode && (selectedNode === node.id || selectedNode === connectionId));

          lines.push({
            start: node.position,
            end: connectedNode.position,
            isHighlighted: !!isHighlighted
          });
        }
      });
    });

    return lines;
  }, [networkData, hoveredNode, selectedNode]);

  return (
    <group>
      {connections.map((connection, index) => {
        const start = new THREE.Vector3(...connection.start);
        const end = new THREE.Vector3(...connection.end);
        const distance = start.distanceTo(end);
        
        // Create curve for more organic connections
        const curve = new THREE.QuadraticBezierCurve3(
          start,
          new THREE.Vector3(
            (start.x + end.x) / 2 + (Math.random() - 0.5) * 0.5,
            (start.y + end.y) / 2 + (Math.random() - 0.5) * 0.5,
            (start.z + end.z) / 2 + (Math.random() - 0.5) * 0.5
          ),
          end
        );

        const points = curve.getPoints(50);
        const geometry = new THREE.BufferGeometry().setFromPoints(points);

        return (
          <line key={index}>
            <bufferGeometry attach="geometry" {...geometry} />
            <lineBasicMaterial
              attach="material"
              color={connection.isHighlighted ? "#e879f9" : "#64748b"}
              opacity={connection.isHighlighted ? 0.8 : 0.3}
              transparent
              linewidth={connection.isHighlighted ? 3 : 1}
            />
          </line>
        );
      })}
    </group>
  );
};