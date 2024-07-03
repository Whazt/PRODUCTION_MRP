// src/pages/MRPPage.js
import React, { useState, useEffect } from 'react';
import MRPDiagram from '../components/MRPdiagram';

const MRPPage = () => {
  const [products, setProducts] = useState([]);
  const [components, setComponents] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [selectedComponent, setSelectedComponent] = useState('');
  const [componentQuantity, setComponentQuantity] = useState(0);
  const [temporaryComponents, setTemporaryComponents] = useState([]);
  const [diagrams, setDiagrams] = useState([]);
  const [selectedDiagram, setSelectedDiagram] = useState('');
  const [demand, setDemand] = useState(0);
  const [newProduct, setNewProduct] = useState('');
  const [newComponent, setNewComponent] = useState('');
  const [diagramData, setDiagramData] = useState(null);

  useEffect(() => {
    fetchProducts();
    fetchComponents();
    fetchDiagrams();
  }, []);

  const fetchProducts = async () => {
    const response = await fetch('http://localhost:3001/api/products');
    const data = await response.json();
    setProducts(data);
  };

  const fetchComponents = async () => {
    const response = await fetch('http://localhost:3001/api/components');
    const data = await response.json();
    setComponents(data);
  };

  const fetchDiagrams = async () => {
    const response = await fetch('http://localhost:3001/api/diagrams');
    const data = await response.json();
    setDiagrams(data);
  };

  const handleAddProduct = async () => {
    await fetch('http://localhost:3001/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newProduct }),
    });
    fetchProducts();
    setNewProduct('');
  };

  const handleAddComponent = () => {
    const component = {
      componentId: selectedComponent,
      quantity: componentQuantity,
    };
    setTemporaryComponents([...temporaryComponents, component]);
    setSelectedComponent('');
    setComponentQuantity(0);
  };

  const handleSaveDiagram = async () => {
    await fetch('http://localhost:3001/api/diagrams', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        productId: selectedProduct,
        components: temporaryComponents,
        demand,
      }),
    });
    fetchDiagrams(); // Para actualizar la lista de diagramas guardados
    setTemporaryComponents([]);
    setDemand(0);
  };

  const handleSelectDiagram = async (diagramId) => {
    const response = await fetch(`http://localhost:3001/api/diagrams/${diagramId}`);
    const data = await response.json();
    setDiagramData(data);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">MRP Diagrams</h1>

      <div className="mb-4">
        <label className="block mb-2">Select Product</label>
        <select
          value={selectedProduct}
          onChange={(e) => setSelectedProduct(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">Select a product</option>
          {products.map((product) => (
            <option key={product._id} value={product._id}>
              {product.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-2">Select Component</label>
        <select
          value={selectedComponent}
          onChange={(e) => setSelectedComponent(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">Select a component</option>
          {components.map((component) => (
            <option key={component._id} value={component._id}>
              {component.name}
            </option>
          ))}
        </select>
        <input
          type="number"
          value={componentQuantity}
          onChange={(e) => setComponentQuantity(e.target.value)}
          className="p-2 border rounded ml-2"
          placeholder="Quantity"
        />
        <button
          onClick={handleAddComponent}
          className="p-2 bg-blue-500 text-white rounded ml-2"
        >
          Add Component to Product
        </button>
      </div>

      {temporaryComponents.length > 0 && (
        <div className="mb-4">
          <h2 className="text-lg font-bold mb-2">Temporary Components</h2>
          <ul className="list-disc pl-5">
            {temporaryComponents.map((component, index) => (
              <li key={index}>
                {components.find((comp) => comp._id === component.componentId)?.name} - Quantity: {component.quantity}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mb-4">
        <label className="block mb-2">Demand</label>
        <input
          type="number"
          value={demand}
          onChange={(e) => setDemand(e.target.value)}
          className="p-2 border rounded"
        />
      </div>

      <button onClick={handleSaveDiagram} className="p-2 bg-green-500 text-white rounded">
        Save Diagram
      </button>

      <h2 className="text-xl font-bold mt-4">Add New Product or Component</h2>

      <div className="mb-4">
        <label className="block mb-2">New Product</label>
        <input
          type="text"
          value={newProduct}
          onChange={(e) => setNewProduct(e.target.value)}
          className="p-2 border rounded"
          placeholder="New product name"
        />
        <button onClick={handleAddProduct} className="p-2 bg-blue-500 text-white rounded ml-2">
          Add Product
        </button>
      </div>

      <div className="mb-4">
        <label className="block mb-2">New Component</label>
        <input
          type="text"
          value={newComponent}
          onChange={(e) => setNewComponent(e.target.value)}
          className="p-2 border rounded"
          placeholder="New component name"
        />
        <button onClick={handleAddComponent} className="p-2 bg-blue-500 text-white rounded ml-2">
          Add Component
        </button>
      </div>

      <h2 className="text-xl font-bold mt-4">View Saved Diagrams</h2>
      
      <div className="mb-4">
        <label className="block mb-2">Select Diagram</label>
        <select
          value={selectedDiagram}
          onChange={(e) => handleSelectDiagram(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">Select a diagram</option>
          {diagrams.map((diagram) => (
            <option key={diagram._id} value={diagram._id}>
              {diagram.productId.name}
            </option>
          ))}
        </select>
      </div>

      {diagramData && (
        <MRPDiagram
          diagramData={diagramData}
        />
      )}
    </div>
  );
};

export default MRPPage;
