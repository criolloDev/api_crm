import { Formik, Form, Field} from 'formik'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import Alerta from './Alerta'
import Spinner from './Spinner'

const Formulario = ({cliente, cargando}) => {

    const navigate = useNavigate()

    const nuevoClienteSchema = Yup.object().shape({
        nombre: Yup.string()
                    .min(3, 'El nombre es muy corto')
                    .max(30, 'El nombre es muy largo')
                    .required('El nombre del cliente es obligatorio'),
        empresa: Yup.string()
                    .required('El nombre de la empresa es obligatorio'),
        email: Yup.string()
                    .email('Email no valido')
                    .required('El email es obligatorio'),
        telefono: Yup.number()
                    .positive('Numero no valido')
                    .integer('Numero no valido')
                    .typeError('El numero no es valido')
                    .required('El telefono es obligatorio'),
                 
    })

    const handleSubmit = async (valores) => {
        try {
            if (cliente.id) {
                //Editar un cliente
                const url = `http://localhost:4000/clientes/${cliente.id}`

                const respuesta = await fetch(url, {
                    method: 'PUT',
                    body: JSON.stringify(valores),
                    headers: {
                        'Content-type': 'application/json'
                    }
                })
                await respuesta.json()
                navigate('/clientes')
                
            }else{
                //Agregar un nuevo cliente
                const url = 'http://localhost:4000/clientes'

                const respuesta = await fetch(url, {
                    method: 'POST',
                    body: JSON.stringify(valores),
                    headers: {
                        'Content-type': 'application/json'
                    }
                })
                await respuesta.json()
                navigate('/clientes')
            }
            
        } catch (error) {
            console.log(error)
        }
    }

  return (

    cargando ? <Spinner /> : (

        <div className="bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto">
            
            <h1 className=" text-gray-600 font-bold text-xl uppercase 
            text-center"> {cliente?.nombre ? 'Editar cliente' : 'Agregar cliente'} </h1>

            <Formik
                initialValues={{
                    nombre: cliente?.nombre ?? '',
                    empresa: cliente?.empresa ?? '',
                    email: cliente?.email ?? '',
                    telefono: cliente?.telefono ?? '',
                    notas: cliente?.notas ?? '',
                }}
                enableReinitialize={true}
                onSubmit={ async(values, {resetForm}) => {
                    await handleSubmit(values)

                    resetForm();
                }}
                validationSchema={nuevoClienteSchema}
            >
                {({errors, touched}) => {
                    return (
                <Form
                    className="mt-10"
                >
                    <div className="mb-4">
                        <label 
                            className="text-gray-800"
                            htmlFor="nombre"
                        >
                            Nombre:
                        </label>
                        <Field 
                            id="nombre"
                            type="text"
                            className=" mt-3 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Nombre del cliente"
                            name="nombre"
                        />

                        {errors.nombre && touched.nombre ? (
                            <Alerta mensaje = {errors.nombre}/>
                        ): null}
                        
                    </div>
                    <div className="mb-4">
                        <label 
                            className="text-gray-800"
                            htmlFor="empresa"
                        >
                            Empresa:
                        </label>
                        <Field 
                            id="empresa"
                            type="text"
                            className=" mt-3 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Nombre de la empresa"
                            name="empresa"
                        />

                        {errors.empresa && touched.empresa ? (
                            <Alerta mensaje = {errors.empresa}/>
                        ): null}

                    </div>
                    <div className="mb-4">
                        <label 
                            className="text-gray-800"
                            htmlFor="email"
                        >
                            Email:
                        </label>
                        <Field 
                            id="email"
                            type="email"
                            className=" mt-3 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Email del cliente"
                            name="email"
                        />

                        {errors.email && touched.email ? (
                            <Alerta mensaje = {errors.email}/>
                        ): null}

                    </div>
                    <div className="mb-4">
                        <label 
                            className="text-gray-800"
                            htmlFor="telefono"
                        >
                            Telefono:
                        </label>
                        <Field 
                            id="telefono"
                            type="tel"
                            className=" mt-3 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Telefono del cliente"
                            name="telefono"
                        />

                        {errors.telefono && touched.telefono ? (
                            <Alerta mensaje = {errors.telefono}/>
                        ): null}
                    </div>
                    <div className="mb-4">
                        <label 
                            className="text-gray-800"
                            htmlFor="notas"
                        >
                            Notas:
                        </label>
                        <Field 
                            as="textarea"
                            id="notas"
                            type="text"
                            className=" mt-3 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Notas del cliente"
                            name="notas"
                        />
                    </div>
                    <input 
                        type="submit"
                        value= {cliente?.nombre ? 'Editar cliente' : 'Agregar cliente'}
                        className="cursor-pointer mt-5 w-full bg-blue-800 p-3 text-white uppercase font-bold text-lg"
                    />
                </Form>
                )}}
            </Formik>

        </div>
    )
  )
}

Formulario.defaultProps = {
    cliente: {},
    cargando: false
}

export default Formulario