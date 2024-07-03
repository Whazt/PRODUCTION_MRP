import { useState, useEffect } from 'react';
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
  const [diagramName, setDiagramName] = useState('');

  useEffect(() => {
    fetchProducts();
    fetchComponents();
    fetchDiagrams();
  }, []);

  const fetchProducts = async () => {
    const response = await fetch('https://mrpback-production.up.railway.app/api/products');
    const data = await response.json();
    setProducts(data);
  };

  const fetchComponents = async () => {
    const response = await fetch('https://mrpback-production.up.railway.app/api/components');
    const data = await response.json();
    setComponents(data);
  };

  const fetchDiagrams = async () => {
    const response = await fetch('https://mrpback-production.up.railway.app/api/diagrams');
    const data = await response.json();
    setDiagrams(data);
  };

  const handleAddProduct = async () => {
    await fetch('https://mrpback-production.up.railway.app/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newProduct }),
    });
    fetchProducts();
    setNewProduct('');
  };

  const handleAddCompo = async () => {
    await fetch('https://mrpback-production.up.railway.app/api/components', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newComponent }),
    });
    fetchComponents();
    setNewComponent('');
  };

  const handleAddComponent = () => {
    if (!selectedComponent || componentQuantity <= 0) return;

    const existingComponent = temporaryComponents.find(
      (comp) => comp.componentId === selectedComponent
    );

    if (existingComponent) {
      existingComponent.quantity += componentQuantity;
      setTemporaryComponents([...temporaryComponents]);
    } else {
      const component = {
        componentId: selectedComponent,
        quantity: componentQuantity,
      };
      setTemporaryComponents([...temporaryComponents, component]);
    }

    setSelectedComponent('');
    setComponentQuantity(0);
  };

  const handleSaveDiagram = async () => {
    const componentsData = temporaryComponents.map((component) => ({
      componentId: component.componentId,
      quantity: component.quantity,
    }));

    const payload = {
      name: diagramName,
      productId: selectedProduct,
      components: componentsData,
      demand,
    };

    console.log('Payload:', JSON.stringify(payload));

    try {
      const response = await fetch('https://mrpback-production.up.railway.app/api/diagrams', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log(data);

      fetchDiagrams(); // Refresh the list of saved diagrams
      setTemporaryComponents([]);
      setDemand(0);
      setDiagramName('');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDeleteDiagram = async (diagramId) => {
    try {
      await fetch(`https://mrpback-production.up.railway.app/api/diagrams/${diagramId}`, {
        method: 'DELETE',
      });
      fetchDiagrams(); // Refresh the list of saved diagrams
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await fetch(`https://mrpback-production.up.railway.app/api/products/${productId}`, {
        method: 'DELETE',
      });
      fetchProducts(); // Refresh the list of products
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDeleteComponent = async (componentId) => {
    try {
      await fetch(`https://mrpback-production.up.railway.app/api/components/${componentId}`, {
        method: 'DELETE',
      });
      fetchComponents(); // Refresh the list of components
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSelectDiagram = async (diagramId) => {
    setSelectedDiagram(diagramId);
    const response = await fetch(`https://mrpback-production.up.railway.app/api/diagrams/${diagramId}`);
    const data = await response.json();
    setDiagramData(data);
    setDemand(data.demand); // Set demand to the selected diagram's demand
  };

  return (
    <>
    <h1 className="uppercase text-center py-3 bg-[#000157] text-white text-xl">Diagrama Arboral</h1>

<div className="container mx-auto p-4">
 
  <div className="mb-4">
    <label className="block mb-2">Nombre del Diagrama</label>
    <input
      type="text"
      value={diagramName}
      onChange={(e) => setDiagramName(e.target.value)}
      className="p-2 border rounded"
      placeholder="Enter diagram name"
    />
  </div>

  <div className="mb-4">
    <label className="block mb-2">Seleccion de Producto</label>
    <select
      value={selectedProduct}
      onChange={(e) => setSelectedProduct(e.target.value)}
      className="p-2 border rounded"
    >
      <option value="">Selecciona un producto</option>  
      {products.map((product) => (
        <option key={product._id} value={product._id}>
          {product.name}
        </option>
      ))}
    </select>
    {selectedProduct && (
      <button
        onClick={() => handleDeleteProduct(selectedProduct)}
        className="ml-2 p-2 bg-red-500 text-white rounded"
      >
        Eliminar Producto
      </button>
    )}
  </div>

  <div className="mb-4">
    <label className="block mb-2">Seleccion de Componente</label>
    <select
      value={selectedComponent}
      onChange={(e) => setSelectedComponent(e.target.value)}
      className="p-2 border rounded"
    >
      <option value="">Selecciona un componente</option>
      {components.map((component) => (
        <option key={component._id} value={component._id}>
          {component.name}
        </option>
      ))}
    </select>
    <input
      type="number"
      value={componentQuantity}
      onChange={(e) => setComponentQuantity(parseInt(e.target.value, 10))}
      className="p-2 border rounded ml-2"
      placeholder="Cantidad"
    />
    <button
      onClick={handleAddComponent}
      className="p-2 bg-blue-500 text-white rounded ml-2"
    >
      Agregar Componente
    </button>
    {selectedComponent && (
      <button
        onClick={() => handleDeleteComponent(selectedComponent)}
        className="ml-2 p-2 bg-red-500 text-white rounded"
      >
        Eliminar Componente
      </button>
    )}
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
    <label className="block mb-2">Demanda</label>
    <input
      type="number"
      value={demand}
      onChange={(e) => setDemand(parseInt(e.target.value, 10))}
      className="p-2 border rounded"
    />
  </div>

  <button onClick={handleSaveDiagram} className="p-2 bg-green-500 text-white rounded">
    Guardar Diagrama
  </button>

  <h2 className="text-xl font-bold mt-4">Agregar</h2>

  <div className="mb-4">
    <label className="block mb-2">Nuevo Producto</label>
    <input
      type="text"
      value={newProduct}
      onChange={(e) => setNewProduct(e.target.value)}
      className="p-2 border rounded"
      placeholder="Nuevo nombre del producto"
    />
    <button onClick={handleAddProduct} className="p-2 bg-blue-500 text-white rounded ml-2">
      Agregar Producto
    </button>
  </div>

  <div className="mb-4">
    <label className="block mb-2">Nuevo Componente</label>
    <input
      type="text"
      value={newComponent}
      onChange={(e) => setNewComponent(e.target.value)}
      className="p-2 border rounded"
      placeholder="Nuevo nombre del componente"
    />
    <button onClick={handleAddCompo} className="p-2 bg-blue-500 text-white rounded ml-2">
      Agregar Componente
    </button>
  </div>

  <h2 className="text-xl font-bold mt-4">Diagramas Guardados</h2>
  
  <div className="flex items-center mb-4">
    <label className="block mb-2 mr-2">Diagramas</label>
    <select
      value={selectedDiagram}
      onChange={(e) => handleSelectDiagram(e.target.value)}
      className="p-2 border rounded"
    >
      <option value="">Selecciona un diagrama</option>
      {diagrams.map((diagram) => (
        <option key={diagram._id} value={diagram._id}>
          {diagram.name} - {diagram.productId.name}
        </option>
      ))}
    </select>
    {selectedDiagram && (
      <button
        onClick={() => handleDeleteDiagram(selectedDiagram)}
        className="ml-2 p-2 bg-red-500 text-white rounded"
      >
        Eliminar Diagrama
      </button>
    )}
  </div>

  {diagramData && (
    <MRPDiagram
      diagramData={diagramData}
      temporaryComponents={temporaryComponents}
      demand={demand} // Pass the demand to the diagram component
    />
  )}
</div>
    </>
  );
};

export default MRPPage;
