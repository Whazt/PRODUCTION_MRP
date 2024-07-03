import BackButton from "../components/BackButton"
import { useState } from 'react';

function RotacionInventario() {

    const [mode, setMode] = useState({
        m: '1',
        lbldemand: 'Demanda (D)', 
        lblquantity: 'Cantidad (Q)',
        divstate: 'hidden',
    });
    const [demand, setDemand] = useState('');
    const [quantity, setQuantity] = useState('');
    const [security, setSecurity] = useState('');
    const [periodo, setPeriodo] = useState('');
    const [rotation, setRotation] = useState(null);
    const [invprom, setInvprom] = useState(null);
    const [errors, setErrors] = useState({
        demand: '',
        quantity: '',
        security: '',
    }); 

    
    const handleKeyDownInt = (event) => {
        if (event.key === 'e' || event.key === '-' || event.key === '.' || event.key === '+') {
            event.preventDefault();
        }
    };

    const calculateRotation = () => {
        const D = parseFloat(demand);
        const QorT = parseFloat(quantity);
        const SS = parseFloat(security);

        const newErrors = {};
        
        if (D <= 0 || isNaN(D)) {
            newErrors.demand = 'Ingrese un número válido para la Demanda.';
        } else {
            newErrors.demand = '';
        }

        if (QorT <= 0 || isNaN(QorT)) {
            newErrors.quantity = 'Ingrese un número válido para la Cantidad.';
        } else {
            newErrors.quantity = '';
        }

        if (SS <= 0 || isNaN(SS)) {
            newErrors.security = 'Ingrese un número válido para la Inventario de Seguidad.';
        } else {
            newErrors.security = '';
        }

        if (Object.values(newErrors).some((error) => error !== '')) {
            setErrors(newErrors);
            return;
        }

        let Invprom = 0;
        let Rotacion = 0;

        if (mode.m === '1') {
            Invprom = (QorT / 2) + SS;
            Rotacion = D / Invprom;
        } else if (mode.m === '2') {
            Invprom = ((D * QorT) / 2) + SS;

            if (periodo === '1') {
                Rotacion = (D * 365) / Invprom;
            } else if (periodo === '2') {
                Rotacion = (D * 52) / Invprom;
            } else if (periodo === '3') {
                Rotacion = (D * 12) / Invprom;
            }
        }

        setRotation(Rotacion);
        setInvprom(Invprom);

        setDemand('');
        setQuantity('');
        setSecurity('');
        setPeriodo('');

        setErrors({
            demand: '',
            quantity: '',
            security: '',
        });
    };

    const handleModeChange = (e) => {
        const value = e.target.value;
        if (value === '1') {
            setMode({
                m: '1',
                lbldemand: 'Demanda (D)', 
                lblquantity: 'Cantidad (Q)', 
                divstate: 'hidden',
            });
        } else if (value === '2') {
            setMode({
                m: '2',
                lbldemand: 'Demanda del periodo (d)',
                lblquantity: 'Periodo (T)', 
                divstate: 'block',
            });
        }
    };

    return (
        <>  
        <div>
            <h1 className=" uppercase text-center py-1 bg-[#000157] text-white ">Rotación de Inventario</h1>    
        </div>
        <BackButton/>
        <div className="max-w-md mx-auto mt-20 p-6 bg-gray-100 rounded-lg shadow-md">
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="mode">
                    Tipo de Inventario
                </label>
                <select name="mode" id="mode" className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300 " onChange={handleModeChange}>
                    <option value="1">Fijo</option>
                    <option value="2">Variable</option>
                </select>
            </div>
            <div className={`mb-4 ${mode.divstate}`}>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="periodo">
                    Plazo del Periodo de la demanda
                </label>
                <select name="periodo" id="periodo" className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300" placeholder="Periodo" value={periodo} onChange={(e) => setPeriodo(e.target.value)}>
                    <option value="1">Diario</option>
                    <option value="2">Semanal</option>
                    <option value="3">Mensual</option>
                </select>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="demand">
                    {mode.lbldemand}
                </label>
                <input
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300 ${errors.demand && 'border-red-500'}`}
                    id="demand"
                    type="number"
                    placeholder="Ingrese la demanda"
                    value={demand}
                    onChange={(e) => setDemand(e.target.value)} 
                    onKeyDown={handleKeyDownInt}
                />
                {errors.demand && <p className="text-red-500 text-xs italic">{errors.demand}</p>}
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="quantity">
                    {mode.lblquantity}
                </label>
                <input
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300 ${errors.quantity && 'border-red-500'}`}
                    id="quantity"
                    type="number"
                    placeholder="Ingrese la cantidad"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)} 
                    onKeyDown={handleKeyDownInt}
                />
                {errors.quantity && <p className="text-red-500 text-xs italic">{errors.quantity}</p>}
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="security">
                    Inventario de Seguridad (SS)
                </label>
                <input
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300 ${errors.security && 'border-red-500'}`}
                    id="security"
                    type="number"
                    placeholder="Ingrese el inventario de seguridad"
                    value={security}
                    onChange={(e) => setSecurity(e.target.value)}
                    onKeyDown={handleKeyDownInt}
                />
                {errors.security && <p className="text-red-500 text-xs italic">{errors.security}</p>}
            </div>
            <div className="mb-4">
                <button
                    className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300"
                    onClick={calculateRotation}
                >a
                    Calcular
                </button>
            </div>
            {rotation !== null && (
                <div className="mt-4">
                    <p className="text-gray-900 bg-green-300 p-3 rounded-md w-full">
                        El inventario promedio es de: <strong>{invprom.toFixed(2)}</strong>
                    </p>
                    <p className="text-gray-900 bg-green-300 p-3 rounded-md w-full">
                        La rotación de inventario es de: <strong>{rotation.toFixed(2)}</strong>
                    </p>
                </div>
            )}
        </div>
        </>
    );
}

export default RotacionInventario;
