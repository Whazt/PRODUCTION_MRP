import { useState } from 'react';
import BackButton from '../components/BackButton';


function Eoq() {
  const [demand, setDemand] = useState('');
  const [orderingCost, setOrderingCost] = useState('');
  const [holdingCost, setHoldingCost] = useState('');
  const [eoq, setEOQ] = useState(null);
  const [errors, setErrors] = useState({
    demand: '',
    orderingCost: '',
    holdingCost: '',
  });
  
  const handleKeyDown = (event) => {
    if (event.key === 'e' || event.key === '-') {
      event.preventDefault();
    }
  };

  const handleKeyDownDemand = (event) => {
    if (event.key === 'e' || event.key === '-' || event.key === '.') {
      event.preventDefault();
    }
  };

  const calculateEOQ = () => {
    const D = parseFloat(demand);
    const S = parseFloat(orderingCost);
    const H = parseFloat(holdingCost);

    const newErrors = {};


    if (D <= 0 || isNaN(D)) {
      newErrors.demand = 'Ingrese un número válido para la Demanda.';
    } else {
      newErrors.demand = '';
    }

    if (S <= 0 || isNaN(S)) {
      newErrors.orderingCost = 'Ingrese un número válido para el costo de ordenar.';
    } else {
      newErrors.orderingCost = '';
    }

    if (H <= 0 || isNaN(H)) {
      newErrors.holdingCost = 'Ingrese un número válido para el costo de mantener.';
    } else {
      newErrors.holdingCost = '';
    }

    if (Object.values(newErrors).some((error) => error !== '')) {
      setErrors(newErrors);
      return;
    }

    const EOQValue = Math.sqrt((2 * D * S) / H);
    setEOQ(EOQValue);
    setErrors({
      demand: '',
      orderingCost: '',
      holdingCost: '',
    });
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Calculadora EOQ</h2>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="demand">
          Demanda (D)
        </label>
        <input
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.demand && 'border-red-500'}`}
          id="demand"
          type="number"
          placeholder="Ingrese la demanda"
          value={demand}
          onChange={(e) => setDemand(e.target.value)} 
          onKeyDown={handleKeyDownDemand}
        />
        {errors.demand && <p className="text-red-500 text-xs italic">{errors.demand}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="orderingCost">
          Costo de ordenar por pedido (S)
        </label>
        <input
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.orderingCost && 'border-red-500'}`}
          id="orderingCost"
          type="number"
          placeholder="Ingrese el costo de ordenar"
          value={orderingCost}
          onChange={(e) => setOrderingCost(e.target.value)} 
          onKeyDown={handleKeyDown}
        />
        {errors.orderingCost && <p className="text-red-500 text-xs italic">{errors.orderingCost}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="holdingCost">
          Costo de mantener por unidad (H)
        </label>
        <input
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.holdingCost && 'border-red-500'}`}
          id="holdingCost"
          type="number"
          placeholder="Ingrese el costo de mantener"
          value={holdingCost}
          onChange={(e) => setHoldingCost(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        {errors.holdingCost && <p className="text-red-500 text-xs italic">{errors.holdingCost}</p>}
      </div>
      <div className="mb-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={calculateEOQ}
        >
          Calcular EOQ
        </button>
      </div>
      {eoq !== null && (
        <div className="mt-4">
          <p className="text-gray-700">
            La Cantidad Económica de Pedido (EOQ) es: <strong>{eoq.toFixed(2)}</strong>
          </p>
        </div>
      )}
    </div>
  );
}

export default Eoq;