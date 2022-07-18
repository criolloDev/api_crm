import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Cliente = ({ paciente, handleEliminar, handleAlta }) => {
  
  const navigate = useNavigate();

  const {
    nombre,
    email,
    telefono,
    propietario,
    id,
    sintomas,
    fechaEntrada,
    fechaAlta,
    alta,
  } = paciente;


  return (
    <tr className="border-b hover:bg-gray-50">
      <td className="p-2 text-center"> {fechaEntrada} </td>
      <td className="p-2 text-center"> {nombre} </td>
      <td className="p-2 text-center"> {propietario} </td>
      <td className="p-2 text-center">
        <p>
          <span className="text-gray-800 uppercase font-bold">Email:</span>
          {email}
        </p>
        <p className="mt-2">
          <span className="text-gray-800 uppercase font-bold">Telefono:</span>
          {telefono}
        </p>
      </td>
      <td className="p-2 text-center">
        <button
          type="button"
          className="bg-green-500 hover:bg-green-600 block w-full text-white 
                p-1.5 uppercase font-bold text-xs"
          onClick={() => navigate(`/pacientes/${id}`)}
        >
          Ver
        </button>

        {alta ? null : (
          <button
            type="button"
            className="bg-sky-500 hover:bg-sky-600 block w-full text-white 
                    p-1.5 uppercase font-bold text-xs mt-3"
            onClick={() => navigate(`/pacientes/editar/${id}`)}
          >
            Editar
          </button>
        )}
        {alta ? null : (
          <button
            type="button"
            className="bg-red-500 hover:bg-red-6  00 block w-full text-white 
                p-1.5 uppercase font-bold text-xs mt-3"
            onClick={() => handleEliminar(id)}
          >
            Eliminar
          </button>
        )}
        {alta ? null : (
          <button
            type="button"
            className="bg-indigo-500 hover:bg-indigo-600 block w-full text-white 
                p-1.5 uppercase font-bold text-xs mt-3"
            onClick={() => handleAlta(id)}
          >
            Dar de alta
          </button>
        )}
      </td>
    </tr>
  );
};

export default Cliente;
