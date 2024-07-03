import { NavLink } from "react-router-dom"
import { HomeIcon } from "@heroicons/react/24/outline"
import { CalculatorIcon } from "@heroicons/react/24/outline"
import { ClipboardDocumentListIcon } from "@heroicons/react/24/outline"


const Sidebar = () =>{
    return(

        <div className="hidden fixed bg-white lg:overflow-y-auto md:block md:w-[5%] lg:block lg:min-w-[15%] md:px-0 justify-center sidebar min-h-screen overflow-y-auto overflow-x  lg:px-6  border-r-[#000157] border-r-[1px] ">
            <div className="flex justify-center items-center pt-2 my-2 ">
                <img  className=" w-52 h-436" src="/Production.png" alt="LOGO" />
            </div>
            <nav>
                <ul className="mt-4">
                    <li>
                        <NavLink to='/Mantenimiento' title="Gestión de Mantenimiento" className="flex items-center text-[#000157] gap-2 hover:bg-blue-950 rounded-lg hover:text-white py-3 md:justify-center lg:justify-start  lg:px-8 transition-colors text-lg  ">
                            <span className="w-min-6 h-min-6">
                                <HomeIcon className="w-6 h-6 "/>
                            </span>
                            <span className=" md:hidden lg:block truncate">Gestión de Mantenimiento</span>
                        </NavLink>
                    </li>
                    <li>
                       <NavLink to="/Inventarios" title="Administración de Inventarios" className=" flex items-center text-[#000157] gap-2  hover:bg-blue-950 rounded-lg hover:text-white py-3 md:justify-center  lg:justify-start lg:px-8 transition-colors text-lg" >
                        <span className="w-min-6 h-min-6">
                            <CalculatorIcon className="w-6 h-6 "/>
                        </span>
                        <span className="md:hidden lg:block truncate ">Administración de Inventarios</span>
                       </NavLink>
                    </li>
                    <li>
                    <NavLink to="/MRP" title="MRP" className=" flex items-center text-[#000157] gap-2  hover:bg-blue-950 rounded-lg hover:text-white py-3 md:justify-center  lg:justify-start lg:px-8 transition-colors text-lg" >
                        <span className="w-min-6 h-min-6">
                            <ClipboardDocumentListIcon className="w-6 h-6 "/>
                        </span>
                        <span className="md:hidden lg:block truncate">MRP</span>
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    
    )
}

export default Sidebar