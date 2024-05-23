import BackButton from "../components/BackButton"
import { useState } from "react";

function CantKanbanes() {
    const [rows, setRows] = useState(0);
    const [formData, setFormData] = useState([]);
    
    const handleKeyDown = (event) => {
        if (event.key === 'e' || event.key === '-' || event.key === '+') {
          event.preventDefault();
        }
      };
    
      const handleKeyDownInt = (event) => {
        if (event.key === 'e' || event.key === '-' || event.key === '.' || event.key === '+') {
          event.preventDefault();
        }
      };

    const handleRowsChange = (e) => {
        const numRows = parseInt(e.target.value, 10);
        setRows(numRows);
        setFormData(Array.from({ length: numRows }, () => ({
            producto: "",
            demanda: "",
            tiempoDeEntrega: "",
            stockDeSeguridad: "",
            capacidadDeAlmacenaje: "",
            cantidadKanbanes: 0
        })));
    };

    const handleInputChange = (e, index, field) => {
        const value = e.target.value;
        const updatedFormData = formData.map((row, i) => {
            if (i === index) {
                const updatedRow = { ...row, [field]: value };

                // Calculate cantidadKanbanes
                const demanda = parseFloat(updatedRow.demanda) || 0;
                const tiempoDeEntrega = parseFloat(updatedRow.tiempoDeEntrega) || 0;
                const stockDeSeguridad = parseFloat(updatedRow.stockDeSeguridad) || 0;
                const capacidadDeAlmacenaje = parseFloat(updatedRow.capacidadDeAlmacenaje) || 1; // Avoid division by zero
                const cantidadKanbanes = (demanda * tiempoDeEntrega * (1 + stockDeSeguridad)) / capacidadDeAlmacenaje;

                return { ...updatedRow, cantidadKanbanes: cantidadKanbanes.toFixed(2) + " ≈ " + Math.ceil(cantidadKanbanes)  }; // Round to 2 decimal places
            }
            return row;
        });
        setFormData(updatedFormData);
    };
    return(
        <div>     
            <div>
             <h1 className=" uppercase text-center py-1 bg-[#000157] text-white ">Cantidad de Productos</h1>    
            </div>
            <BackButton/>
            <div className="p-4">
            <label htmlFor="numRows" className="block mb-2">Número de Filas:</label>
            <input
                type="number"
                id="numRows"
                className="border rounded px-2 py-1"
                value={rows}
                onChange={handleRowsChange}
                min="0"
                onKeyDown={handleKeyDownInt}
            />
            <div className="overflow-auto mt-4">
                <table className="min-w-full border-collapse border border-gray-200">
                    <thead>
                        <tr>
                            <th className="border border-gray-300 p-2">Producto</th>
                            <th className="border border-gray-300 p-2">Demanda</th>
                            <th className="border border-gray-300 p-2">Tiempo de Entrega</th>
                            <th className="border border-gray-300 p-2">Stock de Seguridad</th>
                            <th className="border border-gray-300 p-2">Capacidad de Almacenaje</th>
                            <th className="border border-gray-300 p-2">Cantidad de Kanbanes</th>
                        </tr>
                    </thead>
                    <tbody>
                        {formData.map((row, index) => (
                            <tr key={index}>
                                <td className="border border-gray-300 p-2">
                                    <input
                                        type="text"
                                        className="w-full  rounded px-2 py-1 bg-transparent border-0"
                                        value={row.producto}
                                        onChange={(e) => handleInputChange(e, index, "producto")}
                                    />
                                </td>
                                <td className="border border-gray-300 p-2">
                                    <input
                                        type="number"
                                        className="w-full  rounded px-2 py-1 no-spinner bg-transparent border-0"
                                        value={row.demanda}
                                        onChange={(e) => handleInputChange(e, index, "demanda")}
                                        onKeyDown={handleKeyDownInt}
                                    />
                                </td>
                                <td className="border border-gray-300 p-2">
                                    <input
                                        type="number"
                                        className="w-full  rounded px-2 py-1 no-spinner bg-transparent border-0"
                                        value={row.tiempoDeEntrega}
                                        onChange={(e) => handleInputChange(e, index, "tiempoDeEntrega")}
                                        onKeyDown={handleKeyDownInt}
                                    />
                                </td>
                                <td className="border border-gray-300 p-2">
                                    <input
                                        type="number"
                                        className="w-full  rounded px-2 py-1 no-spinner bg-transparent border-0"
                                        value={row.stockDeSeguridad}
                                        onChange={(e) => handleInputChange(e, index, "stockDeSeguridad")}
                                        onkeydown={handleKeyDown}
                                    />
                                </td>
                                <td className="border border-gray-300 p-2">
                                    <input
                                        type="number"
                                        className="w-full rounded px-2 py-1 no-spinner bg-transparent border-0"
                                        value={row.capacidadDeAlmacenaje}
                                        onChange={(e) => handleInputChange(e, index, "capacidadDeAlmacenaje")}
                                        onkeydown={handleKeyDownInt}
                                    />
                                </td>
                                <td className="border border-gray-300 p-2">
                                    {row.cantidadKanbanes}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
            
        
        </div>
    )
}

export default CantKanbanes;