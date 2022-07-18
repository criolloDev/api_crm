import {useEffect, useState} from 'react'
import Cliente from '../components/Cliente';
import Spinner from '../components/Spinner';
import { useNavigate } from 'react-router-dom'

const PacientesA = () => {

  const navigate = useNavigate()

  const [pacientes, setPacientes] = useState([]);
  const [cargando, setCargando] = useState(true);
  
  useEffect(() => {
      const obtenerClientes = async () => {
        try {
            const url = 'http://localhost:4000/pacientes'
            const respuesta = await fetch(url)
            const resultado = await respuesta.json()
            const arrayPacientesActivos = resultado.filter( paciente => paciente.alta === false)
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
  
  const handleAlta = async id => {
    const confirmar = confirm('Deseas dar de alta a este paciente?')
      if (confirmar) {
          try {
            const pacs= [...pacientes]
            pacs.map( async paciente => { 
              if(paciente.id === id){

            const url = `http://localhost:4000/pacientes/${id}`

                const respuesta = await fetch(url, {
                    method: 'PATCH',
                    body: JSON.stringify({alta:true}),
                    headers: {
                        'Content-type': 'application/json'
                    }
                })
                await respuesta.json()
                navigate('/pacientes/historial')
          }})
          } catch (error) {
            console.log(error)
          }
      }
    }


  const handleEliminar = async id => {
      
    const confirmar = confirm('Deseas eliminar este paciente?')

      if (confirmar) {
          try {
            const url = `http://localhost:4000/pacientes/${id}`

            const respuesta = await fetch(url, {
                    method: 'DELETE'
            })
            await respuesta.json()

            const arrayPacientes = pacientes.filter( paciente => paciente.id !== id)
            setPacientes(arrayPacientes)

          } catch (error) {
            console.log(error)
          }
      }
    }
  
  return (
    cargando ? <Spinner/> : (
    <>
      <h1 className="font-black text-4xl text-blue-900">Pacientes</h1>
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
                      handleEliminar = {handleEliminar}
                      handleAlta = {handleAlta}
                  />
              ))}
          </tbody>
      </table>

    </>
    )
  )
}

export default PacientesA