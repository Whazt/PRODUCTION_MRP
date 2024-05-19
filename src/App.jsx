import Sidebar from "./components/Sidebar"
import Navbar from "./components/Navbar"
import Formulas from "./pages/Formulas"
import Eoq from "./pages/Eoq"
import MantCorrectivo from "./pages/MantCorrectivo"
import { BrowserRouter as Router, Routes, Route, RouterProvider } from 'react-router-dom'


function App() {

  return (
    <Router>
      <div className="flex h-screen">
        <Sidebar/>
        <div className="flex flex-col flex-grow">
          <Navbar/>
          <div className="content w-full h-full bg-slate-100 pt-8 md:pt-10 lg:pt-16 ">
            <Routes>
             
              <Route path='/Formulas' exact={true} element={<Formulas/>}/>
              <Route path='/Formulas/Eoq' exact={true} element={<Eoq/>}/>
              <Route path='/Formulas/Mantenimiento-Correctivo' exact={true} element={<MantCorrectivo/>}/>
              
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  )
}

export default App
