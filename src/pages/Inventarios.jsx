import { NavLink } from "react-router-dom"

const Inventarios =()=> {
    return(
        <div>
            <h1 className=" uppercase text-center py-1 bg-[#000157] text-white ">Gestión de Inventarios</h1>
            <div className="lg:mx-[5%] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-center justify-items-center ">
                
               
                <NavLink to={"/Inventarios/Eoq"} className={" mt-8 mx-4 border-[#000157] border-[1px] bg-[#002657] text-white shadow-md rounded-md"}>
                    <img  className=" w-80    h-60  rounded-md" src="/Eoq.png" alt="LOGO" />
                    EOQ
                </NavLink>
                <NavLink to={"/Inventarios/Rotacion-Inventario"} className={" mt-8 mx-4 border-[#000157] border-[1px] bg-[#002657] text-white shadow-md rounded-md"}>
                    <img  className="w-80    h-60  rounded-md" src="/cadenasuministro.png" alt="LOGO" />  
                    Rotación de Inventario
                </NavLink>
                <NavLink to={"/Inventarios/Luc"} className={" mt-8 mx-4 border-[#000157] border-[1px] bg-[#002657] text-white shadow-md rounded-md"}>
                    <img  className="w-80    h-60   rounded-md" src="/luc.png" alt="LOGO" />  
                    LUC
                </NavLink>
                <NavLink to={"/Inventarios/Ltc"} className={" mt-8 mx-4 border-[#000157] border-[1px] bg-[#002657] text-white shadow-md rounded-md"}>
                    <img  className="w-80    h-60   rounded-md" src="/ltc.png" alt="LOGO" />  
                    LTC
                </NavLink>
                <NavLink to={"/Inventarios/Cantidad-Recipientes"} className={" mt-8 mx-4 border-[#000157] border-[1px] bg-[#002657] text-white shadow-md rounded-md"}>
                    <img  className="w-80    h-60   rounded-md" src="/cantrecipientes.png" alt="LOGO" />  
                    Cantidad de Recipientes
                </NavLink>
                <NavLink to={"/Inventarios/Cantidad-Kanbanes"} className={" mt-8 mx-4 border-[#000157] border-[1px] bg-[#002657] text-white shadow-md rounded-md"}>
                    <img  className="w-80    h-60   rounded-md" src="/kanban.png" alt="LOGO" />  
                    Cantidad de Kanbanes
                </NavLink>
            </div>
        </div>
        
    )
}

export default Inventarios