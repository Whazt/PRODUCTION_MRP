import { NavLink } from "react-router-dom"

const  Mrp =()=> {
    return(
        <div>
            <h1 className=" uppercase text-center py-1 bg-[#000157] text-white ">Gestión de Mantenimiento</h1>
            <div className="lg:mx-[5%] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-center justify-items-center ">
                
                <NavLink to={"/MRP/Arboral"} className={" mt-8 mx-4 border-[#000157] border-[1px] bg-[#002657] text-white shadow-md rounded-md"}>
                    <img  className=" w-80    h-64    rounded-md" src="/Arboral.png" alt="LOGO" />
                    Diagrama Arboral
                </NavLink>
               
            </div>
        </div>
        
    )
}

export default Mrp