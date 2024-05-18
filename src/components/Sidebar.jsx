import { NavLink } from "react-router-dom"
import { HomeIcon } from "@heroicons/react/24/outline"
import { CalculatorIcon } from "@heroicons/react/24/outline"
import { ClipboardDocumentListIcon } from "@heroicons/react/24/outline"


const Sidebar = () =>{
    return(

        <div className="hidden md:block md:w-[5%] lg:block lg:w-[15%] md:px-0 justify-center sidebar min-h-screen overflow-y-auto lg:px-6  border-r-[#000157] border-r-[1px] ">
            <div className="flex justify-center items-center pt-2 my-2 ">
                <img  className=" w-52 h-436" src="/Production.png" alt="LOGO" />
            </div>
            <nav>
                <ul className="mt-4">
                    <li>
                        <NavLink to='/Formulas' title="INICIO" className="flex items-center text-[#000157] gap-3  hover:bg-blue-950 rounded-lg hover:text-white py-3 md:justify-center lg:justify-start  lg:px-8 transition-colors text-lg  ">
                            <span className="w-min-6 h-min-6">
                                <HomeIcon className="w-6 h-6 "/>
                            </span>
                            <span className=" md:hidden lg:block truncate">Inicio</span>
                        </NavLink>
                    </li>
                    <li>
                       <NavLink href="/Formulas" title="FORMULAS" className=" flex items-center text-[#000157] gap-3  hover:bg-blue-950 rounded-lg hover:text-white py-3 md:justify-center  lg:justify-start lg:px-8 transition-colors text-lg" >
                        <span className="w-min-6 h-min-6">
                            <CalculatorIcon className="w-6 h-6 "/>
                        </span>
                        <span className="md:hidden lg:block truncate ">Fórmulas</span>
                       </NavLink>
                    </li>
                    <li>
                        <a href="#" title="MRP" className=" flex items-center text-[#000157] gap-3  hover:bg-blue-950 rounded-lg hover:text-white py-3 md:justify-center lg:justify-start lg:px-8 transition-colors text-lg " >
                        <span className="w-min-6 h-min-6">
                            <ClipboardDocumentListIcon className="w-6 h-6 "/>
                        </span>
                        <span className="md:hidden lg:block truncate">MRP</span>
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    
    )
}

export default Sidebar