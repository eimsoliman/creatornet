import React, { useMemo } from 'react';
import { Line } from '@react-three/drei';
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
      points: [number, number, number][];
      isHighlighted: boolean;
    }> = [];

    networkData.forEach((node) => {
      node.connections.forEach((connectionId) => {
        const connectedNode = networkData.find(n => n.id === connectionId);
        if (connectedNode) {
          const isHighlighted = 
            (hoveredNode && (hoveredNode === node.id || hoveredNode === connectionId)) ||
            (selectedNode && (selectedNode === node.id || selectedNode === connectionId));

          // Create a simple straight line between nodes
          lines.push({
            points: [node.position, connectedNode.position],
            isHighlighted: !!isHighlighted
          });
        }
      });
    });

    return lines;
  }, [networkData, hoveredNode, selectedNode]);

  return (
    <group>
      {connections.map((connection, index) => (
        <Line
          key={index}
          points={connection.points}
          color={connection.isHighlighted ? "#e879f9" : "#64748b"}
          opacity={connection.isHighlighted ? 0.8 : 0.3}
          transparent
          lineWidth={connection.isHighlighted ? 2 : 1}
        />
      ))}
    </group>
  );
};