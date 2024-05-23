import { useState } from 'react';
import BackButton from '../components/BackButton';


function CantRecipientes() {
  const [demand, setDemand] = useState('');
  const [tiempoVuelta, setTiempoVuelta] = useState('');
  const [tamaRecipiente, setTamaRecipiente] = useState('');
  const [cantRecipientes, setCantRecipientes] = useState(null);
  const [nivelMax, setNivelMax] = useState(null);
  const [errors, setErrors] = useState({
    demand: '',
    tiempoVuelta: '',
    tamaRecipiente: '',
  });
  
  const handleKeyDown = (event) => {
    if (event.key === 'e' || event.key === '-' || event.key === '+') {
      event.preventDefault();
    }
  };

  const handleKeyDownDemand = (event) => {
    if (event.key === 'e' || event.key === '-' || event.key === '.' || event.key === '+') {
      event.preventDefault();
    }
  };

  const calculateCantRecipientes = () => {
    const D = parseFloat(demand);
    const T = parseFloat(tiempoVuelta);
    const C = parseFloat(tamaRecipiente);

    const newErrors = {};


    if (D <= 0 || isNaN(D)) {
      newErrors.demand = 'Ingrese un número válido para la tasa de Demanda.';
    } else {
      newErrors.demand = '';
    }

    if (T <= 0 || isNaN(T)) {
      newErrors.tiempoVuelta = 'Ingrese un número válido para el tiempo de vuelta de recipiente.';
    } else {
      newErrors.tiempoVuelta = '';
    }

    if (C <= 0 || isNaN(C)) {
      newErrors.tamaRecipiente = 'Ingrese un número válido para el tamaño de recipiente.';
    } else {
      newErrors.tamaRecipiente = '';
    }

    if (Object.values(newErrors).some((error) => error !== '')) {
      setErrors(newErrors);
      return;
    }

    const CantReci = (D*T) / (60*C);
    const NivMax = CantReci * C;
    setCantRecipientes(CantReci);
    setNivelMax(NivMax);
    setErrors({
      demand: '',
      tiempoVuelta: '',
      tamaRecipiente: '',
    });
    
  };

  return (
    <>
    <div>
      <h1 className=" uppercase text-center py-1 bg-[#000157] text-white ">Cantidad de Recipientes</h1>    
    </div>
    <BackButton/>
    <div className="max-w-md mx-auto mt-20 p-6 bg-gray-100 rounded-lg shadow-md">
      
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="demand">
          Tasa de Demanda (D)
        </label>
        <input
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300 ${errors.demand && 'border-red-500'}`}
          id="demand"
          type="number"
          placeholder="Ingrese la tasa de demanda"
          value={demand}
          onChange={(e) => setDemand(e.target.value)} 
          onKeyDown={handleKeyDownDemand}
        />
        {errors.demand && <p className="text-red-500 text-xs italic">{errors.demand}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="orderingCost">
        Tiempo de vuelta de recipiente (T)
        </label>
        <input
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300 ${errors.tiempoVuelta && 'border-red-500'}`}
          id="tiempoVuelta"
          type="number"
          placeholder="Tiempo de vuelta de recipiente"
          value={tiempoVuelta}
          onChange={(e) => setTiempoVuelta(e.target.value)} 
          onKeyDown={handleKeyDown}
        />
        {errors.tiempoVuelta && <p className="text-red-500 text-xs italic">{errors.tiempoVuelta}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="holdingCost">
        Tamaño de recipiente (C)
        </label>
        <input
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300 ${errors.tamaRecipiente && 'border-red-500'}`}
          id="tamaRecipiente"
          type="number"
          placeholder="Ingrese el Tamaño de recipiente"
          value={tamaRecipiente}
          onChange={(e) => setTamaRecipiente(e.target.value)}
          onKeyDown={handleKeyDownDemand}
        />
        {errors.tamaRecipiente && <p className="text-red-500 text-xs italic">{errors.tamaRecipiente}</p>}
      </div>
      <div className="mb-4">
        <button
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300"
          onClick={calculateCantRecipientes}
        >
          Calcular
        </button>
      </div>
      {cantRecipientes!== null && (
        <div className="mt-4">
        <p className="text-gray-900 bg-green-300 p-3 rounded-md w-full">
            La cantidad de Recipientes es de: <strong>{cantRecipientes.toFixed(2)}</strong> ≈ <strong>{Math.ceil(cantRecipientes)}</strong>
        </p>
        <p className="text-gray-900 bg-green-300 p-3 rounded-md w-full">
           El inventario maximo es de: <strong>{nivelMax.toFixed(2)}</strong> ≈ <strong>{Math.ceil(nivelMax)}</strong>
        </p>
        </div>
      )}
    </div>
    </>
    
  );
}

export default CantRecipientes;