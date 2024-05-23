import { NavLink } from "react-router-dom"

const Formulas =()=> {
    return(
        <div>
            <h1 className=" uppercase text-center py-1 bg-[#000157] text-white ">FóRMULAS</h1>
            <div className=" flex text-center align-middle justify-center flex-wrap">
                
                <NavLink to={"/Formulas/Mantenimiento-Correctivo"} className={" mt-8 mx-4 border-[#000157] border-[1px] bg-[#002657] text-white shadow-md rounded-md"}>
                    <img  className=" w-80    h-64    rounded-md" src="/mantenimientocorrectivo.png" alt="LOGO" />
                    Mantenimiento Correctivo
                </NavLink>
                <NavLink to={"/Formulas/Eoq"} className={" mt-8 mx-4 border-[#000157] border-[1px] bg-[#002657] text-white shadow-md rounded-md"}>
                    <img  className=" w-80    h-64  rounded-md" src="/Eoq.png" alt="LOGO" />
                    EOQ
                </NavLink>
                <NavLink to={"/Formulas/Rotacion-Inventario"} className={" mt-8 mx-4 border-[#000157] border-[1px] bg-[#002657] text-white shadow-md rounded-md"}>
                    <img  className="w-80    h-64  rounded-md" src="/cadenasuministro.png" alt="LOGO" />  
                    Rotación de Inventario
                </NavLink>
                <NavLink to={"/Formulas/Eoq"} className={" mt-8 mx-4 border-[#000157] border-[1px] bg-[#002657] text-white shadow-md rounded-md"}>
                    <img  className="w-80    h-64   rounded-md" src="/cadenasuministro.png" alt="LOGO" />  
                    LUC
                </NavLink>
                <NavLink to={"/Formulas/Eoq"} className={" mt-8 mx-4 border-[#000157] border-[1px] bg-[#002657] text-white shadow-md rounded-md"}>
                    <img  className="w-80    h-64   rounded-md" src="/cadenasuministro.png" alt="LOGO" />  
                    LTC
                </NavLink>
                <NavLink to={"/Formulas/Cantidad-Reipientes"} className={" mt-8 mx-4 border-[#000157] border-[1px] bg-[#002657] text-white shadow-md rounded-md"}>
                    <img  className="w-80    h-64   rounded-md" src="/cadenasuministro.png" alt="LOGO" />  
                    Cantidad de Recipientes
                </NavLink>
                <NavLink to={"/Formulas/Cantidad-Kanbanes"} className={" mt-8 mx-4 border-[#000157] border-[1px] bg-[#002657] text-white shadow-md rounded-md"}>
                    <img  className="w-80    h-64   rounded-md" src="/cadenasuministro.png" alt="LOGO" />  
                    Cantidad de Kanbanes
                </NavLink>
            </div>
        </div>
        
    )
}

export default Formulas