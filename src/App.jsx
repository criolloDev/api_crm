import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Layout from './layout/Layout'
import EditarCliente from './paginas/EditarCliente'
import PacientesA from './paginas/PacientesA'
import NuevoCliente from './paginas/NuevoCliente'
import VerCliente from './paginas/VerCliente'
import Historial from './paginas/Historial'

function App() {
  return (
    <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<IniciarSesion/>}>
              <Route index element= {<LoginForm/>} />
          </Route> */}

          <Route path="/pacientes" element={<Layout/>}>
              <Route index element={<PacientesA/>} />
              <Route path="nuevo" element={<NuevoCliente/>} />
              <Route path="editar/:id" element={<EditarCliente/>} />
              <Route path=":id" element={<VerCliente/>} />
              <Route path="historial" element={<Historial/>} />
          </Route>
        </Routes>
    </BrowserRouter>
  )
}

export default App
