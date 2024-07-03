import { useState } from 'react';
import BackButton from "../components/BackButton"

const Luc = () => {
  const [weeks, setWeeks] = useState(null);
  const [reqBrutoData, setReqBrutoData] = useState([]);
  const [secondTableData, setSecondTableData] = useState([]);
  const [constantS, setConstantS] = useState(null);
  const [constantK, setConstantK] = useState(null);
  const [planeacionData, setPlaneacionData] = useState([]);
  const [highestCostUnitIndices, setHighestCostUnitIndices] = useState([]);
  const [error, setError] = useState('');

  const handleWeeksChange = (event) => {
    const value = event.target.value;
    if (/^\d*$/.test(value) && value <= 52) {
      setWeeks(Number(value));
    }
  };

  const handleSChange = (event) => {
    const value = event.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      setConstantS(Number(value));
    } else {
      setConstantS(null);
    }
  };

  const handleKChange = (event) => {
    const value = event.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      setConstantK(Number(value));
    } else {
      setConstantK(null);
    }
  };

  const handleKeyDown = (event) => {
    if (['-', 'e', 'E', '+', '.'].includes(event.key)) {
      event.preventDefault();
    }
  };

  const handleKeyDownDecimal = (event) => {
    if (['-', 'e', 'E', '+'].includes(event.key)) {
      event.preventDefault();
    }
  };

  const generateFirstTable = () => {
    if (weeks < 2) {
      setError('Por favor, ingrese un número de semanas mayor o igual a 2.');
      return;
    }
    const initialData = Array.from({ length: weeks }, () => ({ reqBruto: '' }));
    setReqBrutoData(initialData);
    setError('');
  };

  const handleReqBrutoChange = (index, event) => {
    const value = event.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      const newData = [...reqBrutoData];
      newData[index].reqBruto = Number(value);
      setReqBrutoData(newData);
    }
  };

  const calculateSecondTable = () => {
    if (constantS === null || constantK === null || constantS === 0 || constantK === 0 || reqBrutoData.some(data => data.reqBruto === '')) {
      setError('Por favor, complete todos los campos y asegúrese de que ni K ni S sean 0 antes de continuar.');
      return;
    }

    setError('');
    const newTableData = [];
    let totalCost = 0;
    let highestCostUnitIndices = [];
    let cumulativePeriod = '';
    let planeacion = Array(weeks).fill(null);

    for (let i = 0; i < reqBrutoData.length; i++) {
      cumulativePeriod += (cumulativePeriod === '' ? '' : '+') + (i % 5 + 1);

      const units = reqBrutoData.slice(Math.floor(i / 5) * 5, i + 1).reduce((acc, curr) => acc + curr.reqBruto, 0);
      const x = i % 5;
      const k = reqBrutoData[i].reqBruto * x * constantK;

      if (i % 5 === 0) {
        totalCost = constantS + k;
      } else {
        totalCost += k;
      }

      const costPerUnit = totalCost / units;

      newTableData.push({
        period: cumulativePeriod,
        units,
        s: constantS,
        k,
        totalCost,
        costPerUnit,
      });

      if ((i + 1) % 5 === 0 || i === reqBrutoData.length - 1) {
        const startIndex = i - (i % 5);
        const endIndex = i;
        let highestIndex = startIndex;

        for (let j = startIndex; j <= endIndex; j++) {
          if (newTableData[j].totalCost > newTableData[highestIndex].totalCost) {
            highestIndex = j;
          }
        }

        highestCostUnitIndices.push(highestIndex);
        planeacion[endIndex] = newTableData[highestIndex].units;
        cumulativePeriod = '';
        totalCost = 0;
      }
    }

    setSecondTableData(newTableData);
    setHighestCostUnitIndices(highestCostUnitIndices);
    setPlaneacionData(planeacion);
  };

  return (
    <>
      <div>
        <h1 className="uppercase text-center py-3 bg-[#000157] text-white text-xl">Método LUC</h1>
      </div>
      <BackButton />

      <div className="p-1 py-8 mt-2">
        <div className="mb-4">
          <label className="block mb-2">
            ¿Cuántas semanas se van a evaluar?
            <input
              type="number"
              value={weeks}
              onChange={handleWeeksChange}
              onKeyDown={handleKeyDown}
              className="ml-2 p-1 border rounded"
              placeholder="Semanas"
              inputMode="numeric"
              max="52"
            />
          </label>
          <button
            onClick={generateFirstTable}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Generar Tabla
          </button>
        </div>

        {reqBrutoData.length > 0 && (
          <div className="my-4">
            <label className="block mb-2">
              Constante S:
              <input
                type="number"
                value={constantS}
                onChange={handleSChange}
                onKeyDown={handleKeyDownDecimal}
                className="ml-2 p-1 border rounded"
                inputMode="decimal"
              />
            </label>
            <label className="block mb-2">
              Constante K:
              <input
                type="number"
                value={constantK}
                onChange={handleKChange}
                onKeyDown={handleKeyDownDecimal}
                className="ml-2 p-1 border rounded"
                inputMode="decimal"
              />
            </label>
          </div>
        )}

        {reqBrutoData.length > 0 && (
          <div className='overflow-auto'>
            <table className="min-w-full border-collapse border border-gray-200">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border min-w-[60px] border-gray-300 px-4 py-2">Semana</th>
                  {reqBrutoData.map((_, index) => (
                    <th className="border min-w-[60px] border-gray-300 px-1 py-1" key={index}>{index + 1}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border max-h-[41px] border-gray-300 px-4 py-2">Req. Bruto</td>
                  {reqBrutoData.map((data, index) => (
                    <td className="border min-w-[60px] max-h-[41px] border-gray-300" key={index}>
                      <input
                        type="number"
                        value={data.reqBruto}
                        onChange={(event) => handleReqBrutoChange(index, event)}
                        onKeyDown={handleKeyDown}
                        className="bg-transparent border-0 w-full h-full py-2 rounded text-center no-spinner"
                        inputMode="numeric"
                      />
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">Planeación</td>
                  {reqBrutoData.map((_, index) => (
                    <td className="border min-w-[60px] border-gray-300 px-1 py-2 min-h-[65px] text-center" key={index}>
                      {planeacionData[index]}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
            <button
              onClick={calculateSecondTable}
              className="px-4 py-2 bg-green-500 text-white rounded"
            >
              Calcular Segunda Tabla
            </button>
          </div>
        )}

        {error && (
          <div className="text-red-500 my-4">
            {error}
          </div>
        )}

        {secondTableData.length > 0 && (
          <table className="min-w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2">Periodo</th>
                <th className="border border-gray-300 px-4 py-2">Unidades</th>
                <th className="border border-gray-300 px-4 py-2">s</th>
                <th className="border border-gray-300 px-4 py-2">k</th>
                <th className="border border-gray-300 px-4 py-2">Costo total</th>
                <th className="border border-gray-300 px-4 py-2">Costo unitario $ total/unidades</th>
              </tr>
            </thead>
            <tbody>
              {secondTableData.map((data, index) => (
                <tr
                  key={index}
                  className={`${
                    highestCostUnitIndices.includes(index) ? 'bg-red-200' : ''
                  }`}
                >
                  <td className="border border-gray-300 px-4 py-2 text-center">{data.period}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">{data.units}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">{data.s}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">{data.k % 1 !== 0 ? data.k.toFixed(4) : data.k}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">{data.totalCost % 1 !== 0 ? data.totalCost.toFixed(4) : data.totalCost}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">{data.costPerUnit % 1 !== 0 ? data.costPerUnit.toFixed(4) : data.costPerUnit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default Luc;
