import React, { useContext, useEffect, useState } from 'react';
import axios from "axios";
import TooltipBox from "@mui/material/Tooltip";
import { FiEdit3 } from "react-icons/fi";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { Link, useParams } from 'react-router-dom';
import Checkbox from "@mui/material/Checkbox";
import { MyContext } from '../../App';

const label = { inputProps: { "aria-label": "Checkbox demo" } }

const UserList = () => {
    const { usuarios, setUsuarios } = useContext(MyContext);
    const [isAllChecked, setIsAllChecked] = useState(false);

    const handleDelete = usuarioId => {
        axios.delete(`http://localhost:9999/usuario/${usuarioId}`)
          .then(response => {
            alert("Usuario eliminado con éxito!");
            setUsuarios(prevUsuarios => prevUsuarios.filter(usuario => usuario.id !== usuarioId))
          })
          .catch(error => {
            console.error("Error al eliminar el usuario:", error);
            alert("Hubo un error al intentar eliminar el usuario.");
        });
    }

    const selectAll = (e) => {
        if (e.target.checked === true) {
            setIsAllChecked(true);
        } else {
            setIsAllChecked(false);
        }
    };

  return (
    <>
        <div className="card shadow my-4 border-0 flex-center p-3">
            <div className="flex items-center justify-between">
                <h1 className="font-weight-bold mb-0">Usuarios</h1>
            </div>
        </div>
        <div className='card shadow my-4 border-0'>
            <div className='flex items-center mb-4 justify-between  pt-3 px-4'>
                <h2 className='mb-0 font-bold text-md'>Usuarios</h2>
            </div>
            <div className="table-responsive mb-2">
                <table className="table w-[100%] table-striped">
                    <thead className="thead-light">
                        <tr>
                            <th>
                                <Checkbox {...label} size="small" onChange={selectAll} />
                            </th>
                            <th>CORREO</th>
                            <th>SUSCRIPCIÓN</th>
                            <th>ACCIONES</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuarios.length > 0 ? usuarios.map((usuario) => (
                            <tr key={usuario.id}>
                                <td>
                                    <Checkbox {...label} size="small" checked={isAllChecked} />
                                </td>
                                <td>
                                    <h6>{usuario.correo}</h6>
                                </td>
                                <td>{usuario.estadoSuscripcion}</td>
                                <td>
                                    <div className="actions flex items-center gap-2">
                                    <TooltipBox title="Edit" placement="top">
                                        {/* <Link to={`/destination/edit/${paquete.id}`} className="no-link-style"> */}
                                        <button className="flex items-center justify-center w-[30px] h-[30px] rounded-md duration-300">
                                            <FiEdit3 />
                                        </button>
                                        {/* </Link> */}
                                    </TooltipBox>

                                    <TooltipBox title="View" placement="top">
                                        {/* <Link to={`/destination/view/${paquete.id}`} className="no-link-style"> */}
                                        <button className="flex items-center justify-center w-[30px] h-[30px] rounded-md duration-300">
                                            <MdOutlineRemoveRedEye />
                                        </button>
                                        {/* </Link> */}
                                    </TooltipBox>

                                    <TooltipBox title="Remove" placement="top">
                                        <button
                                            className="flex items-center justify-center w-[30px] h-[30px] rounded-md duration-300"
                                            onClick={() => handleDelete(usuario.id)}
                                        >
                                            <MdOutlineDeleteOutline />
                                        </button>
                                    </TooltipBox>
                                    </div>
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="7" className="text-center">No hay usuarios disponibles</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    </>
  )
}

export default UserList;
