'use client';

import React, { useState, useCallback } from 'react';
import ReactFlow, {
  Node,
  Edge,
  Controls,
  Background,
  MiniMap,
  NodeChange,
  EdgeChange,
  Connection,
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';

interface GraphViewProps {
  initialNodes?: Node[];
  initialEdges?: Edge[];
  readOnly?: boolean;
  onNodesChange?: (changes: NodeChange[]) => void;
  onEdgesChange?: (changes: EdgeChange[]) => void;
  onConnect?: (connection: Connection) => void;
  onNodeClick?: (event: React.MouseEvent, node: Node) => void;
}

export const GraphView: React.FC<GraphViewProps> = ({
  initialNodes = [],
  initialEdges = [],
  readOnly = false,
  onNodesChange,
  onEdgesChange,
  onConnect,
  onNodeClick,
}) => {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);

  // Handle node changes (position, selection)
  const handleNodesChange = useCallback(
    (changes: NodeChange[]) => {
      if (readOnly) return;
      
      const updatedNodes = applyNodeChanges(changes, nodes);
      setNodes(updatedNodes);
      
      if (onNodesChange) {
        onNodesChange(changes);
      }
    },
    [nodes, readOnly, onNodesChange]
  );

  // Handle edge changes (add, remove)
  const handleEdgesChange = useCallback(
    (changes: EdgeChange[]) => {
      if (readOnly) return;
      
      const updatedEdges = applyEdgeChanges(changes, edges);
      setEdges(updatedEdges);
      
      if (onEdgesChange) {
        onEdgesChange(changes);
      }
    },
    [edges, readOnly, onEdgesChange]
  );

  // Handle new connections between nodes
  const handleConnect = useCallback(
    (params: Connection) => {
      if (readOnly) return;
      
      const newEdge = {
        ...params,
        id: `edge-${params.source}-${params.target}`,
        type: 'default',
        animated: false,
        style: { stroke: '#6868ff', strokeWidth: 2 },
      };
      
      setEdges((eds) => addEdge(newEdge, eds));
      
      if (onConnect) {
        onConnect(params);
      }
    },
    [readOnly, onConnect]
  );

  // Handle node click
  const handleNodeClick = useCallback(
    (event: React.MouseEvent, node: Node) => {
      setSelectedNode(node);
      
      if (onNodeClick) {
        onNodeClick(event, node);
      }
    },
    [onNodeClick]
  );

  // Custom node types
  const nodeTypes = {
    // Custom node types would be defined here
  };

  // Custom edge types
  const edgeTypes = {
    // Custom edge types would be defined here
  };

  return (
    <div className="w-full h-[600px] border border-gray-200 rounded-lg overflow-hidden">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={handleNodesChange}
        onEdgesChange={handleEdgesChange}
        onConnect={handleConnect}
        onNodeClick={handleNodeClick}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        fitView
        attributionPosition="bottom-right"
        minZoom={0.2}
        maxZoom={4}
        defaultViewport={{ x: 0, y: 0, zoom: 1 }}
        proOptions={{ hideAttribution: true }}
      >
        <Controls />
        <MiniMap />
        <Background color="#f8f8f8" gap={16} />
      </ReactFlow>
      
      {selectedNode && (
        <Card className="absolute top-4 right-4 w-72 p-4 z-10 shadow-lg">
          <h3 className="text-lg font-semibold mb-2">{selectedNode.data?.label}</h3>
          <p className="text-sm text-gray-600 mb-4">{selectedNode.data?.content}</p>
          <div className="flex justify-end space-x-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setSelectedNode(null)}
            >
              Close
            </Button>
            <Button 
              size="sm"
              onClick={() => {
                // Handle edit action
                console.log('Edit node', selectedNode);
              }}
            >
              Edit
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};
