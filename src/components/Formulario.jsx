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
                    .required('El nombre de la mascota es obligatorio'),
        propietario: Yup.string()
                    .required('El nombre del propietario es obligatorio'),
        email: Yup.string()
                    .email('Email no valido')
                    .required('El email es obligatorio'),
        telefono: Yup.number()
                    .positive('Numero no valido')
                    .integer('Numero no valido')
                    .typeError('El numero no es valido')
                    .required('El telefono es obligatorio'),
        fechaEntrada: Yup.date()
                    .required('La fecha de entrada es obligatoria'),
        fechaAlta: Yup.date()
                    .required('La fecha de alta es obligatoria'), 
        sintomas: Yup.string()
                    .required('Los sintomas del paciente son obligatorios'),        
    })

    const handleSubmit = async (valores) => {
        try {
            if (cliente.id) {
                //Editar un cliente
                const url = `http://localhost:4000/pacientes/${cliente.id}`

                const respuesta = await fetch(url, {
                    method: 'PUT',
                    body: JSON.stringify(valores),
                    headers: {
                        'Content-type': 'application/json'
                    }
                })
                await respuesta.json()
                navigate('/pacientes')
                
            }else{
                //Agregar un nuevo cliente
                const url = 'http://localhost:4000/pacientes'

                const respuesta = await fetch(url, {
                    method: 'POST',
                    body: JSON.stringify(valores),
                    headers: {
                        'Content-type': 'application/json'
                    }
                })
                await respuesta.json()
                navigate('/pacientes')
            }
            
        } catch (error) {
            console.log(error)
        }
    }

  return (

    cargando ? <Spinner /> : (

        <div className="bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto">
            
            <h1 className=" text-gray-600 font-bold text-xl uppercase 
            text-center"> {cliente?.nombre ? 'Editar paciente' : 'Agregar paciente'} </h1>

            <Formik
                initialValues={{
                    nombre: cliente?.nombre ?? '',
                    propietario: cliente?.propietario ?? '',
                    email: cliente?.email ?? '',
                    telefono: cliente?.telefono ?? '',
                    fechaEntrada: cliente?.fechaEntrada ?? '',
                    fechaAlta: cliente?.fechaAlta ?? '',
                    sintomas: cliente?.sintomas ?? '',
                    alta: false,
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
                            Nombre mascota:
                        </label>
                        <Field 
                            id="nombre"
                            type="text"
                            className=" mt-3 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Nombre de la mascota"
                            name="nombre"
                        />

                        {errors.nombre && touched.nombre ? (
                            <Alerta mensaje = {errors.nombre}/>
                        ): null}
                        
                    </div>
                    <div className="mb-4">
                        <label 
                            className="text-gray-800"
                            htmlFor="propietario"
                        >
                            Nombre propietario:
                        </label>
                        <Field 
                            id="propietario"
                            type="text"
                            className=" mt-3 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Nombre del propietario"
                            name="propietario"
                        />

                        {errors.propietario && touched.propietario ? (
                            <Alerta mensaje = {errors.propietario}/>
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
                            htmlFor="fechaEntrada"
                        >
                            Fecha de entrada:
                        </label>
                        <Field
                            id="fechaEntrada"
                            type="date"
                            className=" mt-3 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            name="fechaEntrada"
                        />
                        {errors.fechaEntrada && touched.fechaEntrada ? (
                            <Alerta mensaje = {errors.fechaEntrada}/>
                        ): null}
                    </div>
                    <div className="mb-4">
                        <label 
                            className="text-gray-800"
                            htmlFor="fechaAlta"
                        >
                            Fecha de alta estimada:
                        </label>
                        <Field
                            id="fechaAlta"
                            type="date"
                            className=" mt-3 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            name="fechaAlta"
                        />
                        {errors.fechaAlta && touched.fechaAlta ? (
                            <Alerta mensaje = {errors.fechaAlta}/>
                        ): null}
                    </div>
                    <div className="mb-4">
                        <label 
                            className="text-gray-800"
                            htmlFor="sintomas"
                        >
                            Sintomas:
                        </label>
                        <Field 
                            as="textarea"
                            id="sintomas"
                            type="text"
                            className=" mt-3 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Sintomas del paciente"
                            name="sintomas"
                        />
                        {errors.sintomas && touched.sintomas ? (
                            <Alerta mensaje = {errors.sintomas}/>
                        ): null}
                    </div>
                    <input 
                        type="submit"
                        value= {cliente?.nombre ? 'Editar paciente' : 'Agregar paciente'}
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