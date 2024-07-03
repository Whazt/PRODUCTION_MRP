import BackButton from "../components/BackButton"
import { useState } from "react";

function CantKanbanes() {
    const [rows, setRows] = useState(null);
    const [formData, setFormData] = useState([]);
    const [resultMessage, setResultMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

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
            cantidadKanbanes: ""
        })));
        setResultMessage(""); // Limpiar el mensaje de resultado al cambiar el número de filas
        setErrorMessage(""); // Limpiar el mensaje de error al cambiar el número de filas
    };

    const handleInputChange = (e, index, field) => {
        const value = e.target.value;
        const updatedFormData = formData.map((row, i) => {
            if (i === index) {
                return { ...row, [field]: value };
            }
            return row;
        });
        setFormData(updatedFormData);
    };

    const calculateKanbanes = () => {
        // Verificar si hay campos vacíos
        for (let row of formData) {
            if (!row.producto || !row.demanda || !row.tiempoDeEntrega || !row.stockDeSeguridad || !row.capacidadDeAlmacenaje) {
                setErrorMessage("Todos los campos deben estar llenos.");
                setResultMessage(""); // Limpiar el mensaje de resultado si hay un error
                setFormData(formData.map(row => ({ ...row, cantidadKanbanes: "" }))); // Limpiar los campos de cantidadKanbanes
                return;
            }
        }
        setErrorMessage(""); // Limpiar el mensaje de error si no hay campos vacíos

        const updatedFormData = formData.map(row => {
            const demanda = parseFloat(row.demanda) || 0;
            const tiempoDeEntrega = parseFloat(row.tiempoDeEntrega) || 0;
            const stockDeSeguridad = parseFloat(row.stockDeSeguridad) || 0;
            const capacidadDeAlmacenaje = parseFloat(row.capacidadDeAlmacenaje) || 1; // Avoid division by zero
            const cantidadKanbanes = (demanda * tiempoDeEntrega * (1 + stockDeSeguridad)) / capacidadDeAlmacenaje;
            const cantidadKanbanesRounded = Math.round(cantidadKanbanes * 100) / 100; // Round to 2 decimal places

            const cantidadKanbanesDisplay = cantidadKanbanesRounded % 1 === 0 ? 
                cantidadKanbanesRounded.toFixed(0) : 
                cantidadKanbanesRounded.toFixed(2);
            
            const cantidadKanbanesFinal = cantidadKanbanes - Math.floor(cantidadKanbanes) >= 0.5 ? 
                Math.ceil(cantidadKanbanes) : 
                Math.floor(cantidadKanbanes);

            const displayText = cantidadKanbanesFinal !== cantidadKanbanesRounded ? 
                `${cantidadKanbanesDisplay} ≈ ${cantidadKanbanesFinal}` : 
                `${cantidadKanbanesFinal}`;

            return { 
                ...row, 
                cantidadKanbanes: displayText
            };
        });
        setFormData(updatedFormData);

        // Crear mensaje de resultado
        const resultText = updatedFormData.map(row => `Producto: ${row.producto}, Cantidad de Kanbanes: ${row.cantidadKanbanes}`).join("\n");
        setResultMessage(resultText);
    };

    return (
        <div>     
            <div>
                <h1 className="uppercase text-center py-1 bg-[#000157] text-white">Cantidad de Kanbanes</h1>    
            </div>
            <BackButton />
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
                                            className="w-full rounded px-2 py-1 bg-transparent border-0"
                                            value={row.producto}
                                            onChange={(e) => handleInputChange(e, index, "producto")}
                                        />
                                    </td>
                                    <td className="border border-gray-300 p-2">
                                        <input
                                            type="number"
                                            className="w-full rounded px-2 py-1 no-spinner bg-transparent border-0"
                                            value={row.demanda}
                                            onChange={(e) => handleInputChange(e, index, "demanda")}
                                            onKeyDown={handleKeyDownInt}
                                        />
                                    </td>
                                    <td className="border border-gray-300 p-2">
                                        <input
                                            type="number"
                                            className="w-full rounded px-2 py-1 no-spinner bg-transparent border-0"
                                            value={row.tiempoDeEntrega}
                                            onChange={(e) => handleInputChange(e, index, "tiempoDeEntrega")}
                                            onKeyDown={handleKeyDownInt}
                                        />
                                    </td>
                                    <td className="border border-gray-300 p-2">
                                        <input
                                            type="number"
                                            className="w-full rounded px-2 py-1 no-spinner bg-transparent border-0"
                                            value={row.stockDeSeguridad}
                                            onChange={(e) => handleInputChange(e, index, "stockDeSeguridad")}
                                            onKeyDown={handleKeyDown}
                                        />
                                    </td>
                                    <td className="border border-gray-300 p-2">
                                        <input
                                            type="number"
                                            className="w-full rounded px-2 py-1 no-spinner bg-transparent border-0"
                                            value={row.capacidadDeAlmacenaje}
                                            onChange={(e) => handleInputChange(e, index, "capacidadDeAlmacenaje")}
                                            onKeyDown={handleKeyDownInt}
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
                <button
                    onClick={calculateKanbanes}
                    className="mt-4 px-4 py-2 bg-green-500 text-white rounded"
                >
                    Calcular Cantidad de Kanbanes
                </button>
                {errorMessage && (
                    <div className="mt-4 p-4 bg-red-200 text-red-800 rounded">
                        {errorMessage}
                    </div>
                )}
                {resultMessage && (
                    <div className="mt-4 p-4 bg-green-200 text-green-800 rounded">
                        <pre>{resultMessage}</pre>
                    </div>
                )}
            </div>
        </div>
    );
}

export default CantKanbanes;
