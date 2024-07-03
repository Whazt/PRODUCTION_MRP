import  { useState, useEffect } from 'react';
import axios from 'axios';
import * as d3 from 'd3';

const Arboral = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [diagramData, setDiagramData] = useState(null);

  useEffect(() => {
      axios.get('http://localhost:3000/products')
          .then(response => {
              setProducts(response.data);
          })
          .catch(error => {
              console.error('Error fetching products:', error);
              setProducts([]);
          });
  }, []);

  const fetchProductData = (productId) => {
      axios.get(`http://localhost:3000/product/${productId}`)
          .then(response => {
              const { components, dependencies } = response.data;

              // Crear un mapa de nodos
              const nodeMap = new Map();
              components.forEach(comp => {
                  nodeMap.set(comp.component_id, {
                      id: comp.component_id,
                      name: comp.component_name,
                      quantity: comp.quantity,
                      children: []
                  });
              });

              // Crear un mapa de dependencias
              const dependencyMap = new Map();
              dependencies.forEach(dep => {
                  if (!dependencyMap.has(dep.parent_component_id)) {
                      dependencyMap.set(dep.parent_component_id, []);
                  }
                  dependencyMap.get(dep.parent_component_id).push(dep.child_component_id);
              });

              // Función para construir el árbol
              const buildTree = (nodeId) => {
                  const node = nodeMap.get(nodeId);
                  if (!node) return null;
                  const childrenIds = dependencyMap.get(nodeId) || [];
                  node.children = childrenIds.map(childId => buildTree(childId)).filter(Boolean);
                  return node;
              };

              // Construir el nodo raíz
              const rootNode = {
                  id: parseInt(productId),
                  name: components.find(comp => comp.id === parseInt(productId)).name,
                  quantity: 1,
                  children: components.map(comp => buildTree(comp.component_id)).filter(Boolean)
              };

              console.log('Root node for diagram:', rootNode);
              setDiagramData(rootNode);
          })
          .catch(error => {
              console.error('Error fetching product data:', error);
              setDiagramData(null);
          });
  };

  const renderDiagram = () => {
      if (!diagramData) {
          return;
      }

      const svg = d3.select('#diagram-svg');
      svg.selectAll('*').remove();
      const width = +svg.attr('width');
      const height = +svg.attr('height');
      const margin = { top: 20, right: 120, bottom: 20, left: 120 };
      const adjustedWidth = width - margin.left - margin.right;
      const adjustedHeight = height - margin.top - margin.bottom;

      const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

      const root = d3.hierarchy(diagramData);

      const treeLayout = d3.tree().size([adjustedWidth, adjustedHeight]);
      treeLayout(root);

      const link = g.selectAll('.link')
          .data(root.descendants().slice(1))
          .enter().append('path')
          .attr('class', 'link')
          .attr('d', d => {
              return `M${d.x},${d.y}
                      C${d.x},${(d.y + d.parent.y) / 2}
                       ${d.parent.x},${(d.y + d.parent.y) / 2}
                       ${d.parent.x},${d.parent.y}`;
          })
          .attr('fill', 'none')
          .attr('stroke', '#ccc');

      const node = g.selectAll('.node')
          .data(root.descendants())
          .enter().append('g')
          .attr('class', d => 'node' + (d.children ? ' node--internal' : ' node--leaf'))
          .attr('transform', d => `translate(${d.x},${d.y})`);

      node.append('rect')
          .attr('width', 150)
          .attr('height', 30)
          .attr('x', -75)
          .attr('y', -15)
          .attr('rx', 5)
          .attr('ry', 5)
          .attr('fill', '#69b3a2');

      node.append('text')
          .attr('dy', 5)
          .attr('dx', 0)
          .attr('text-anchor', 'middle')
          .attr('fill', 'white')
          .text(d => `${d.data.name} (${d.data.quantity})`);
  };

  useEffect(() => {
      if (diagramData) {
          renderDiagram();
      }
  }, [diagramData]);

  return (
      <div>
          <select onChange={(e) => {
              setSelectedProduct(e.target.value);
              fetchProductData(e.target.value);
          }}>
              <option value="">Select a Product</option>
              {Array.isArray(products) && products.map(product => (
                  <option key={product.id} value={product.id}>{product.name}</option>
              ))}
          </select>
          <svg id="diagram-svg" width="800" height="800"></svg>
      </div>
  );
};

export default Arboral;