import BackButton from "../components/BackButton"

function MantCorrectivo (){

    const CalcularMantCorrectivo = () => {

    }

    return (
        <>
            <BackButton/>
         <div className="bg-gray-100 p-6 mt-20 flex items-center justify-center max-w-full ">
            <div className="min-w-[800px]   bg-white p-8 rounded-lg shadow-md">
                <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="horas_kilometradas">
                    Horas Kilometradas
                    </label>
                    <input
                    type="number"
                    id="horas_kilometradas"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300"
                    placeholder="Horas Kilometradas"
                    />
                </div>
                <div>
                    <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="mtbf">
                    MTBF
                    </label>
                    <input
                    type="number"
                    id="mtbf"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300"
                    placeholder="MTBF"
                    />
                </div>
                <div>
                    <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="duracion_tarea">
                    Duración de la Tarea
                    </label>
                    <input
                    type="number"
                    id="duracion_tarea"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300"
                    placeholder="Duración de la Tarea"
                    />
                </div>
                <div>
                    <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="costo_trabajo_hora">
                    Costo de Trabajo por Hora
                    </label>
                    <input
                    type="number"
                    id="costo_trabajo_hora"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300"
                    placeholder="Costo de Trabajo por Hora"
                    />
                </div>
                <div>
                    <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="costos_repuesto">
                    Costos de Repuesto
                    </label>
                    <input
                    type="number"
                    id="costos_repuesto"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300"
                    placeholder="Costos de Repuesto"
                    />
                </div>
                <div>
                    <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="costos_operacionales">
                    Costos Operacionales
                    </label>
                    <input
                    type="number"
                    id="costos_operacionales"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300"
                    placeholder="Costos Operacionales"
                    />
                </div>
                <div>
                    <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="retraso_logistico">
                    Retraso Logístico
                    </label>
                    <input
                    type="number"
                    id="retraso_logistico"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300"
                    placeholder="Retraso Logístico"
                    />
                </div>
                <div>
                    <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="costo_unitario_parada">
                    Costo Unitario por Parada
                    </label>
                    <input
                    type="number"
                    id="costo_unitario_parada"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300"
                    placeholder="Costo Unitario por Parada"
                    />
                </div>
                <div className="md:col-span-2">
                    <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="costo_falla_unica">
                    Costo de Falla de Vez Única
                    </label>
                    <input
                    type="number"
                    id="costo_falla_unica"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300"
                    placeholder="Costo de Falla de Vez Única"
                    />
                </div>
                <div className="md:col-span-2">
                    <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300"
                    >
                    Calcular
                    </button>
                </div>
                </form>
            </div>
        </div>
        </>
       
    )
}

export default MantCorrectivo