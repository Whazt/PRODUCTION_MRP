import { useState, useEffect } from 'react';
import ReactFlow, { ReactFlowProvider, MiniMap, Controls, Background } from 'react-flow-renderer';

const MRPDiagram = ({ diagramData, temporaryComponents = [], demand }) => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [calculations, setCalculations] = useState([]);

  useEffect(() => {
    const initialNodes = [];
    const initialEdges = [];
    const calculationsTemp = [];

    const processComponent = (component, parentId, xOffset, index, parentDemand) => {
      const componentId = `component-${index}`;
      const componentDemand = parentDemand * component.quantity;

      calculationsTemp.push({ name: component?.componentId?.name, demand: componentDemand });

      initialNodes.push({
        id: componentId,
        data: { label: `${component?.componentId?.name} (${component.quantity})` },
        position: { x: xOffset + (index * 300), y: 200 },
        style: { width: 150, height: 50 },
        sourcePosition: 'bottom',
        targetPosition: 'top',
        draggable: false,
        selectable: false,
      });

      initialEdges.push({
        id: `${parentId}-edge-${index}`,
        source: parentId,
        target: componentId,
        type: 'smoothstep',
      });
    };

    if (diagramData) {
      const numComponents = diagramData.components.length + temporaryComponents.length;
      const xOffset = -((numComponents - 1) * 150); // Adjust xOffset to center the product

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

      calculationsTemp.push({ name: diagramData.productId.name, demand });

      diagramData.components.forEach((component, index) => {
        processComponent(component, 'product', xOffset, index, demand);
      });

      temporaryComponents.forEach((component, index) => {
        processComponent(component, 'product', xOffset, index, demand);
      });
    }

    setNodes(initialNodes);
    setEdges(initialEdges);
    setCalculations(calculationsTemp);
  }, [diagramData, temporaryComponents, demand]);

  const averageDemand = calculations.length
    ? calculations.reduce((sum, calc) => sum + calc.demand, 0) / calculations.length
    : 0;

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
        <div>
          <h2>Demands Calculations</h2>
          <ul>
            {calculations.map((calc, index) => (
              <li key={index}>{calc.name}: {calc.demand}</li>
            ))}
          </ul>
          <h2>Average Demand: {averageDemand}</h2>
        </div>
      </div>
    </ReactFlowProvider>
  );
};

export default MRPDiagram;
