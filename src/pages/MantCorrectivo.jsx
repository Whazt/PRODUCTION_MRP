import { useState } from "react"
import BackButton from "../components/BackButton"

function MantCorrectivo (){

    const [horas, setHoras] = useState('');
    const [mtbf, setMtbf] = useState('');
    const [duracion, setDuracion] = useState('');
    const [ctrabajo, setCtrabajo] = useState('');
    const [crepuesto, setCrepuesto] = useState('');
    const [coperacional, setCoperacional] = useState('');
    const [retraso, setRetraso] = useState('');
    const [cparada, setCparada] =useState('');
    const [fallaUnica, setFallaUnica] =useState('');
    const [mantCorrectivo, setMantCorrectivo]=useState(null);
    const [errors, setErrors] = useState({
        horas:'',
        mtbf:'',
        duracion:'',
        ctrabajo:'',
        crepuesto:'',
        coperacional:'',
        retraso:'',
        cparada:'',
        fallaUnica:'',
    });

    const handleKeyDown = (event) => {
        if (event.key === 'e' || event.key === '-' || event.key === '+') {
          event.preventDefault();
        }
      };
    
      
    const CalcularMantCorrectivo = () => {
        const H = parseFloat(horas);
        const MTBF_ = parseFloat(mtbf);
        const DURA = parseFloat(duracion)
        const CosTra = parseFloat(ctrabajo);
        const CosRep = parseFloat(crepuesto);
        const CosOpe = parseFloat(coperacional);
        const Retra = parseFloat(retraso);
        const CosPar = parseFloat(cparada);
        const FalUni = parseFloat(fallaUnica);

        const newErrors = {};
        
        if (H <= 0 || isNaN(H)) {
            newErrors.horas = 'Ingrese un valor válido para las Horas.';
        } else {
            newErrors.horas = '';
        }

        if (MTBF_ <= 0 || isNaN(MTBF_)) {
            newErrors.mtbf = 'Ingrese un valor válido para el MTBF.';
        } else {
            newErrors.mtbf = '';
        }

        if (DURA <= 0 || isNaN(DURA)) {
            newErrors.duracion = 'Ingrese un valor válido para la Duración.';
        } else {
            newErrors.duracion = '';
        }        

        if (CosTra <= 0 || isNaN(CosTra)) {
            newErrors.ctrabajo = 'Ingrese un valor válido para el Costo de Trabajo por Hora.';
        } else {
            newErrors.ctrabajo = '';
        }

        if (CosRep <= 0 || isNaN(CosRep)) {
            newErrors.crepuesto = 'Ingrese un valor válido para el Costo de Repuesto.';
        } else {
            newErrors.crepuesto = '';
        }

        if (CosOpe <= 0 || isNaN(CosOpe)) {
            newErrors.coperacional = 'Ingrese un valor válido para los Costos Operacionales.';
        } else {
            newErrors.coperacional = '';
        }

        if (Retra < 0 || isNaN(Retra)) {
            newErrors.retraso = 'Ingrese un valor válido para el Retraso Logístico.';
        } else {
            newErrors.retraso = '';
        }

        if (CosPar <= 0 || isNaN(CosPar)) {
            newErrors.cparada = 'Ingrese un valor válido para el Costo Unitario por Parada.';
        } else {
            newErrors.cparada = '';
        }

        if (FalUni <= 0 || isNaN(FalUni)) {
            newErrors.fallaUnica = 'Ingrese un valor válido para el Costo de Falla de Vez Única.';
        } else {
            newErrors.fallaUnica = '';
        }

        if (Object.values(newErrors).some((error) => error !== '')) {
            setErrors(newErrors);
            setMantCorrectivo(null); // Limpiar el resultado si hay un error
            return;
        }
        

        const NoFallas= H/MTBF_;
        const MantCorrectivo = NoFallas * (((DURA*CosTra)+CosRep+CosOpe+Retra)+((DURA*CosPar)+FalUni));
        setMantCorrectivo(MantCorrectivo);
        setErrors({
            horas: '',
            mtbf: '',
            duracion: '',
            ctrabajo: '',
            crepuesto: '',
            coperacional: '',
            retraso: '',
            cparada: '',
            fallaUnica: '',
        });
        setHoras('');
        setMtbf('');
        setDuracion('');
        setCtrabajo('');
        setCrepuesto('');
        setCoperacional('');
        setRetraso('');
        setCparada('');
        setFallaUnica('');
    
    };

    return (
        <>
        <div>
            <h1 className="uppercase text-center py-1 bg-[#000157] text-white">Costo de Mantenimiento Correctivo</h1>
        </div>
        <BackButton />
        <div className="bg-gray-100 p-6 mt-15 flex items-center justify-center max-w-full">
            <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-md">
                <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="horas">
                            Horas Kilometradas
                        </label>
                        <input
                            type="number"
                            id="horas"
                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300 ${errors.horas && 'border-red-500'}`}
                            placeholder="Horas Kilometradas"
                            value={horas}
                            onChange={(e) => setHoras(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                        {errors.horas && <p className="text-red-500 text-xs italic">{errors.horas}</p>}
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="mtbf">
                            MTBF
                        </label>
                        <input
                            type="number"
                            id="mtbf"
                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300 ${errors.mtbf && 'border-red-500'}`}
                            placeholder="MTBF"
                            value={mtbf}
                            onChange={(e) => setMtbf(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                        {errors.mtbf && <p className="text-red-500 text-xs italic">{errors.mtbf}</p>}
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="duracion">
                            Duración de la Tarea
                        </label>
                        <input
                            type="number"
                            id="duracion"
                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300 ${errors.duracion && 'border-red-500'}`}
                            placeholder="Duración de la Tarea"
                            value={duracion}
                            onChange={(e) => setDuracion(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                        {errors.duracion && <p className="text-red-500 text-xs italic">{errors.duracion}</p>}
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="ctrabajo">
                            Costo de Trabajo por Hora
                        </label>
                        <input
                            type="number"
                            id="ctrabajo"
                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300 ${errors.ctrabajo && 'border-red-500'}`}
                            placeholder="Costo de Trabajo por Hora"
                            value={ctrabajo}
                            onChange={(e) => setCtrabajo(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                        {errors.ctrabajo && <p className="text-red-500 text-xs italic">{errors.ctrabajo}</p>}
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="crepuesto">
                            Costos de Repuesto
                        </label>
                        <input
                            type="number"
                            id="crepuesto"
                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300 ${errors.crepuesto && 'border-red-500'}`}
                            placeholder="Costos de Repuesto"
                            value={crepuesto}
                            onChange={(e) => setCrepuesto(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                        {errors.crepuesto && <p className="text-red-500 text-xs italic">{errors.crepuesto}</p>}
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="coperacional">
                            Costos Operacionales
                        </label>
                        <input
                            type="number"
                            id="coperacional"
                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300 ${errors.coperacional && 'border-red-500'}`}
                            placeholder="Costos Operacionales"
                            value={coperacional}
                            onChange={(e) => setCoperacional(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                        {errors.coperacional && <p className="text-red-500 text-xs italic">{errors.coperacional}</p>}
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="retraso">
                            Retraso Logístico
                        </label>
                        <input
                            type="number"
                            id="retraso"
                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300 ${errors.retraso && 'border-red-500'}`}
                            placeholder="Retraso Logístico"
                            value={retraso}
                            onChange={(e) => setRetraso(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                        {errors.retraso && <p className="text-red-500 text-xs italic">{errors.retraso}</p>}
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="cparada">
                            Costo Unitario por Parada
                        </label>
                        <input
                            type="number"
                            id="cparada"
                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300 ${errors.cparada && 'border-red-500'}`}
                            placeholder="Costo Unitario por Parada"
                            value={cparada}
                            onChange={(e) => setCparada(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                        {errors.cparada && <p className="text-red-500 text-xs italic">{errors.cparada}</p>}
                    </div>
                    <div className="md:col-span-2">
                        <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="fallaUnica">
                            Costo de Falla de Vez Única
                        </label>
                        <input
                            type="number"
                            id="fallaUnica"
                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300 ${errors.fallaUnica && 'border-red-500'}`}
                            placeholder="Costo de Falla de Vez Única"
                            value={fallaUnica}
                            onChange={(e) => setFallaUnica(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                        {errors.fallaUnica && <p className="text-red-500 text-xs italic">{errors.fallaUnica}</p>}
                    </div>
                    <div className="md:col-span-2">
                        <button
                            type="button"
                            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300"
                            onClick={CalcularMantCorrectivo}
                        >
                            Calcular
                        </button>
                    </div>
                    {mantCorrectivo !== null && (
                        <div className="mt-4 w-full md:col-span-2 text-center">
                            <p className="text-gray-900 bg-green-300 p-3 rounded-md w-full">
                                El costo del Mantenimiento Correctivo es de: <strong>${mantCorrectivo.toFixed(2)}</strong>
                            </p>
                        </div>
                    )}
                </form>
            </div>
        </div>
        </>
    )
}

export default MantCorrectivo;
