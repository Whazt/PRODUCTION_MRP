import Sidebar from "./components/Sidebar"

import Inventarios from "./pages/Inventarios"
import Eoq from "./pages/Eoq"
import MantCorrectivo from "./pages/MantCorrectivo"
import RotacionInventario from "./pages/RotacionInventario"
import Luc from "./pages/Luc"
import Ltc from "./pages/Ltc"
import CantRecipientes from "./pages/CantRecipientes"
import CantKanbanes from "./pages/CantKanbanes"
import Mantenimiento from "./pages/Mantenimiento"
import Mrp from "./pages/MRP"
import Arboral from "./pages/Arboral"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'



function App() {

  return (
    <Router>
      <div className="flex h-screen">
        <div className="block ">
          <Sidebar/>
        </div>
          <div className="content w-full h-full bg-slate-100  lg:ml-[15%]   overflow-y-auto ">
            <Routes>
              <Route path='/Mantenimiento' exact={true} element={<Mantenimiento/>}/>
              <Route path='/Inventarios' exact={true} element={<Inventarios/>}/>
              <Route path='/Inventarios/Eoq' exact={true} element={<Eoq/>}/>
              <Route path='/Mantenimiento/Mantenimiento-Correctivo' exact={true} element={<MantCorrectivo/>}/>
              <Route path='/Inventarios/Rotacion-Inventario' exact={true} element={<RotacionInventario/>}/>
              <Route path='/Inventarios/Luc' exact={true} element={<Luc/>}/>
              <Route path='/Inventarios/Ltc' exact={true} element={<Ltc/>}/>
              <Route path='/Inventarios/Cantidad-Recipientes' exact={true} element={<CantRecipientes/>}/>
              <Route path='/Inventarios/Cantidad-Kanbanes' exact={true} element={<CantKanbanes/>}/>
              <Route path='/MRP' exact={true} element={<Mrp/>}/>
              <Route path='/MRP/Arboral' exact={true} element={<Arboral/>}/>
            </Routes>
          </div>
        
      </div>
    </Router>
  )
}

export default App
