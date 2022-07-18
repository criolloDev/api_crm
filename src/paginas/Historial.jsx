import {useEffect, useState} from 'react'
import Cliente from '../components/Cliente';
import Spinner from '../components/Spinner';

const Historial = () => {
    const [pacientes, setPacientes] = useState([]);
  
    const [cargando, setCargando] = useState(true);
    
    useEffect(() => {
        const obtenerClientes = async () => {
          try {
              const url = 'http://localhost:4000/pacientes'
              const respuesta = await fetch(url)
              const resultado = await respuesta.json()
              const arrayPacientesActivos = resultado.filter( paciente => paciente.alta === true)
              setPacientes(arrayPacientesActivos)
          } catch (error) {
            console.log(error)
          }
          setTimeout(() => {
            setCargando(false)
          }, 100);
        }
        obtenerClientes();
    }, [])
    
    
    return (
      cargando ? <Spinner/> : (
      <>
        <h1 className="font-black text-4xl text-blue-900">Historial de pacientes</h1>
        <p className="mt-3">Administra tus pacientes</p>
  
        <table className=" w-full mt-5 table-auto shadow bg-white">
            <thead className="bg-blue-800 text-white">
              <tr>
                <th className="p-2">Fecha ingreso</th>
                <th className="p-2">Nombre mascota</th>
                <th className="p-2">Nombre propietario</th>
                <th className="p-2">Contacto</th>
                <th className="p-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
                {pacientes.map( paciente => (
                    <Cliente 
                        key={paciente.id}
                        paciente = {paciente}
                    />
                ))}
            </tbody>
        </table>
  
      </>
      )
    )
}

export default Historial