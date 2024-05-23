import { useState } from 'react';

const Luc = () => {
      const [weeks, setWeeks] = useState(null);
      const [reqBrutoData, setReqBrutoData] = useState([]);
      const [secondTableData, setSecondTableData] = useState([]);
      const [constantS, setConstantS] = useState(null);
      const [constantK, setConstantK] = useState(null);
    
      const handleWeeksChange = (event) => {
        setWeeks(Number(event.target.value));
      };
    
      const handleSChange = (event) => {
        setConstantS(Number(event.target.value));
      };
    
      const handleKChange = (event) => {
        setConstantK(Number(event.target.value));
      };
    
      const generateFirstTable = () => {
        const initialData = Array.from({ length: weeks }, () => ({ reqBruto: '' }));
        setReqBrutoData(initialData);
      };
    
      const handleReqBrutoChange = (index, event) => {
        const newData = [...reqBrutoData];
        newData[index].reqBruto = Number(event.target.value);
        setReqBrutoData(newData);
      };
    
      const calculateSecondTable = () => {
        const newTableData = [];
        let totalCost = 0;
        let highestCostUnitIndices = [];
        let cumulativePeriod = '';
    
        for (let i = 0; i < reqBrutoData.length; i++) {
            // Incremental period string
            cumulativePeriod += (cumulativePeriod === '' ? '' : '+') + (i % 5 + 1);
    
            const units = reqBrutoData.slice(Math.floor(i / 5) * 5, i + 1).reduce((acc, curr) => acc + curr.reqBruto, 0);
            const x = i % 5;
            const k = reqBrutoData[i].reqBruto * x * constantK;
            
            // Total cost calculation
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
                cumulativePeriod = ''; // Reset cumulative period string
                totalCost = 0; // Reset total cost for the next iteration
            }
        }
    
        setSecondTableData(newTableData);
        setHighestCostUnitIndices(highestCostUnitIndices);
    };
    
      const [highestCostUnitIndices, setHighestCostUnitIndices] = useState([]);
    
      return (
        <div className="p-4">
          <div className="mb-4">
            <label className="block mb-2">
              ¿Cuántas semanas se van a evaluar?
              <input
                type="number"
                value={weeks}
                onChange={handleWeeksChange}
                className="ml-2 p-1 border rounded "
                placeholder="Semanas"
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
                  className="ml-2 p-1 border rounded"
                />
              </label>
              <label className="block mb-2">
                Constante K:
                <input
                  type="number"
                  value={constantK}
                  onChange={handleKChange}
                  className="ml-2 p-1 border rounded"
                />
              </label>
              
            </div>
          )}
    
          {reqBrutoData.length > 0 && (
            <div>
            <table className="min-w-full border-collapse border border-gray-200">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2">Semana</th>
                  {reqBrutoData.map((_, index) => (
                    <th className="border w-min-[100px] border-gray-300 px-1 py-1" key={index}>{index + 1}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">Requerimiento bruto</td>
                  {reqBrutoData.map((data, index) => (
                    <td className="border  w-min-[100px] border-gray-300 px-1 " key={index}>
                      <input
                        type="number"
                        value={data.reqBruto}
                        onChange={(event) => handleReqBrutoChange(index, event)}
                        className="bg-transparent border-0 w-full w-min-20 p-1  rounded text-center no-spinner"
                      />
                    </td>
                  ))}
                </tr>
                {secondTableData.length > 0 && (
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">Planeacion</td>
                  
                  </tr>
                )}
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
                    <td className="border border-gray-300 px-4 py-2 text-center">{data.k.toFixed(4)}</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">{data.totalCost.toFixed(4)}</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">{data.costPerUnit.toFixed(4)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      );
    };
    
    export default Luc;
    