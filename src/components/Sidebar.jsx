import { NavLink } from "react-router-dom";
import { HomeIcon, CalculatorIcon, ClipboardDocumentListIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            {/* Botón en la franja azul del título */}
            <div className="fixed top-2 left-2 z-50 lg:hidden">
                <button onClick={toggleSidebar} className="p-2 bg-[#000157] text-white rounded-md">
                    {isOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
                </button>
            </div>

            {/* Sidebar */}
            <div className={`fixed top-0 left-0 bg-white lg:overflow-y-auto lg:block lg:w-[15%] lg:min-w-[15%] md:px-0 justify-center sidebar min-h-screen overflow-y-auto lg:px-6 border-r-[#000157] border-r-[1px] transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform lg:translate-x-0 z-40`}>
                <div className="flex justify-center items-center pt-20 my-2 "> {/* Ajustar padding-top para que el logo no se superponga */}
                    <img className="w-52 h-436" src="/Production.png" alt="LOGO" />
                </div>
                <nav>
                    <ul className="mt-4">
                        <li>
                            <NavLink to='/Mantenimiento' title="Gestión de Mantenimiento" className="flex items-center text-[#000157] gap-2 hover:bg-blue-950 rounded-lg hover:text-white py-3 md:justify-center lg:justify-start lg:px-8 transition-colors text-lg">
                                <span className="w-min-6 h-min-6">
                                    <HomeIcon className="w-6 h-6" />
                                </span>
                                <span className=" lg:block truncate">Gestión de Mantenimiento</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/Inventarios" title="Administración de Inventarios" className="flex items-center text-[#000157] gap-2 hover:bg-blue-950 rounded-lg hover:text-white py-3 md:justify-center lg:justify-start lg:px-8 transition-colors text-lg">
                                <span className="w-min-6 h-min-6">
                                    <CalculatorIcon className="w-6 h-6" />
                                </span>
                                <span className=" lg:block truncate">Administración de Inventarios</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/MRP" title="MRP" className="flex items-center text-[#000157] gap-2 hover:bg-blue-950 rounded-lg hover:text-white py-3 md:justify-center lg:justify-start lg:px-8 transition-colors text-lg">
                                <span className="w-min-6 h-min-6">
                                    <ClipboardDocumentListIcon className="w-6 h-6" />
                                </span>
                                <span className="lg:block truncate">MRP</span>
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </>
    );
};

export default Sidebar;
