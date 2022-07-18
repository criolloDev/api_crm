import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Spinner from '../components/Spinner';


const VerCliente = () => {

    const {id} = useParams();

    const [paciente, setPaciente] = useState({})

    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        const obtenerPacienteAPI = async () => {
            try {
                const url = `http://localhost:4000/pacientes/${id}`
                const respuesta = await fetch(url)
                const resultado = await respuesta.json()
                setPaciente(resultado)
                
            } catch (error) {
                console.log(error)
            }

            setTimeout(() => {
                setCargando(false)
            }, 100);
      
        }
        obtenerPacienteAPI()
    }, [])
    
    const {nombre, email, telefono, propietario, sintomas, fechaEntrada, fechaAlta} = paciente;

  return (
    
    cargando ? <Spinner />: Object.keys(paciente).length === 0 ? <p> No hay resultados </p> : (
    
        <div>
            <>
                <h1 className="font-black text-5xl text-blue-900">Vista clientes</h1>
            
                <p className="text-2xl mt-3">informacion del cliente: </p>
                
                <div className="bg-white mt-5 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto">
        
                    <p className="text-3xl text-gray-600 mt-5 text-center capitalize">
                        <span className="text-gray-600 uppercase font-bold "> Cliente: </span>
                        {nombre} 
                    </p>
                    <p className="text-2xl text-gray-600 mt-10 capitalize">
                        <span className="text-gray-600 font-bold "> Nombre propietario: </span>
                        {propietario} 
                    </p>
                    <p className="text-2xl text-gray-600 mt-4 capitalize">
                        <span className="text-gray-600 font-bold "> Email: </span>
                        {email} 
                    </p>
                    <p className="text-2xl text-gray-600 mt-4 capitalize">
                        <span className="text-gray-600 font-bold "> Telefono: </span>
                        {telefono} 
                    </p>
                    <p className="text-2xl text-gray-600 mt-4 capitalize">
                        <span className="text-gray-600 font-bold "> Fecha de entrada: </span>
                        {fechaEntrada} 
                    </p>
                    <p className="text-2xl text-gray-600 mt-4 capitalize">
                        <span className="text-gray-600 font-bold "> Fecha aproximada de alta: </span>
                        {fechaAlta} 
                    </p>
                    { sintomas && (
                        <p className="text-2xl text-gray-600 mt-4 capitalize">
                        <span className="text-gray-600 font-bold "> Sintomas: </span>
                        {sintomas} 
                        </p>
                    )}
                    
                </div>
            </>
        </div>
    )
  )
}

export default VerCliente