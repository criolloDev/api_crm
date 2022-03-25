import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Spinner from '../components/Spinner';


const VerCliente = () => {

    const {id} = useParams();

    const [cliente, setCliente] = useState({})

    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        const obtenerClienteAPI = async () => {
            try {
                const url = `http://localhost:4000/clientes/${id}`
                const respuesta = await fetch(url)
                const resultado = await respuesta.json()
                console.log(resultado)
                setCliente(resultado)
                
            } catch (error) {
                console.log(error)
            }

            setTimeout(() => {
                setCargando(false)
            }, 100);
      
        }
        obtenerClienteAPI()
    }, [])
    
    const {nombre, empresa, telefono, email, notas} = cliente;

  return (
    
    cargando ? <Spinner />: Object.keys(cliente).length === 0 ? <p> No hay resultados </p> : (
    
        <div>
            <>
                <h1 className="font-black text-5xl text-blue-900">Vista clientes</h1>
            
                <p className="text-2xl mt-3">informacion del cliente: </p>
                
                <div className="bg-white mt-5 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto">
        
                    <p className="text-4xl text-gray-600 mt-10 text-center capitalize">
                        <span className="text-gray-600 uppercase font-bold "> Cliente: </span>
                        {nombre} 
                    </p>
                    <p className="text-2xl text-gray-600 mt-10 capitalize">
                        <span className="text-gray-600 uppercase font-bold "> Email: </span>
                        {email} 
                    </p>
                    <p className="text-2xl text-gray-600 mt-4 capitalize">
                        <span className="text-gray-600 uppercase font-bold "> Telefono: </span>
                        {telefono} 
                    </p>
                    <p className="text-2xl text-gray-600 mt-4 capitalize">
                        <span className="text-gray-600 uppercase font-bold "> Empresa: </span>
                        {empresa} 
                    </p>
                    { notas && (
                        <p className="text-2xl text-gray-600 mt-4 capitalize">
                        <span className="text-gray-600 uppercase font-bold "> Notas: </span>
                        {notas} 
                        </p>
                    )}
                    
                </div>
            </>
        </div>
    )
  )
}

export default VerCliente