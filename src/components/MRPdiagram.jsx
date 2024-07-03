// src/components/MRPDiagram.js
import React, { useState, useEffect } from 'react';
import ReactFlow, { ReactFlowProvider, MiniMap, Controls, Background } from 'react-flow-renderer';

const MRPDiagram = ({ diagramData, temporaryComponents = [] }) => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  useEffect(() => {
    const initialNodes = [];
    const initialEdges = [];
    let xOffset = 0; // Initial x offset for components
    let numComponents = 0;

    if (diagramData) {
      numComponents = diagramData.components.length + temporaryComponents.length;
      xOffset = -((numComponents - 1) * 150); // Adjust xOffset to center the product

      initialNodes.push({
        id: 'product',
        data: { label: diagramData.productId.name },
        position: { x: xOffset + ((numComponents - 1) * 150) / 2, y: 0 },
        style: { width: 150, height: 50 },
        sourcePosition: 'bottom',
        targetPosition: 'top',
        draggable: false,
        selectable: false,
      });

      diagramData.components.forEach((component, index) => {
        initialNodes.push({
          id: `component-${index}`,
          data: { label: `${component.componentId.name} (${component.quantity})` },
          position: { x: xOffset + (index * 300), y: 200 },
          style: { width: 150, height: 50 },
          sourcePosition: 'bottom',
          targetPosition: 'top',
          draggable: false,
          selectable: false,
        });

        initialEdges.push({
          id: `edge-${index}`,
          source: 'product',
          target: `component-${index}`,
          type: 'smoothstep',
        });
      });

      temporaryComponents.forEach((component, index) => {
        initialNodes.push({
          id: `temp-component-${index}`,
          data: { label: `${component.componentId} (${component.quantity})` },
          position: { x: xOffset + ((diagramData.components.length + index) * 300), y: 200 },
          style: { width: 150, height: 50 },
          sourcePosition: 'bottom',
          targetPosition: 'top',
          draggable: false,
          selectable: false,
        });

        initialEdges.push({
          id: `temp-edge-${index}`,
          source: 'product',
          target: `temp-component-${index}`,
          type: 'smoothstep',
        });
      });
    }

    setNodes(initialNodes);
    setEdges(initialEdges);
  }, [diagramData, temporaryComponents]);

  return (
    <ReactFlowProvider>
      <div style={{ height: '100vh', width: '100%' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          fitView
          fitViewOptions={{ padding: 0.2 }}
          nodesDraggable={false}
          nodesConnectable={false}
          elementsSelectable={false}
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
