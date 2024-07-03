// src/components/MRPDiagram.js
import  { useState, useEffect } from 'react';
import ReactFlow, { ReactFlowProvider, addEdge, MiniMap, Controls, Background } from 'react-flow-renderer';

const MRPDiagram = ({ diagramData }) => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  useEffect(() => {
    if (diagramData) {
      const initialNodes = [
        {
          id: 'product',
          data: { label: `${diagramData.productId.name} (${diagramData.demand})` },
          position: { x: 250, y: 0 },
          style: { width: 150, height: 50 },
        },
      ];

      const initialEdges = [];
      let yOffset = 100;

      diagramData.components.forEach((component, index) => {
        initialNodes.push({
          id: `component-${index}`,
          data: { label: `${component.componentId.name} (${component.quantity})` },
          position: { x: 250, y: yOffset },
          style: { width: 150, height: 50 },
        });

        initialEdges.push({
          id: `edge-${index}`,
          source: 'product',
          target: `component-${index}`,
          type: 'smoothstep',
        });

        yOffset += 100;
      });

      setNodes(initialNodes);
      setEdges(initialEdges);
    }
  }, [diagramData]);

  return (
    <ReactFlowProvider>
      <div style={{ height: 500 }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={setNodes}
          onEdgesChange={setEdges}
          fitView
        >
          <MiniMap />
          <Controls />
          <Background />
        </ReactFlow>
      </div>
    </ReactFlowProvider>
  );
};

export default MRPDiagram;
