import React, { useContext, useEffect, useState } from 'react';
import axios from "axios";
import DashboardBox from './components/dashboardBox';
import { FaUserCircle } from "react-icons/fa";
import TooltipBox from "@mui/material/Tooltip";
import { FiEdit3 } from "react-icons/fi";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { TiWeatherPartlySunny } from "react-icons/ti";
import { MdShoppingBag } from "react-icons/md";
import { Link, useParams } from 'react-router-dom';
import Checkbox from "@mui/material/Checkbox";
import { MyContext } from '../../App';


const label = { inputProps: { "aria-label": "Checkbox demo" } }

const Dashbord = () => {

  const { id } = useParams();
  const { paquetes, usuarios, reservaciones, setPaquetes } = useContext(MyContext);
  const [isAllChecked, setIsAllChecked] = useState(false);

  const handleDelete = paqueteId => {
    axios.delete(`http://localhost:9999/paquete/${paqueteId}`)
      .then(response => {
        alert("Destino eliminado con éxito!");
        setPaquetes(prevPaquetes => prevPaquetes.filter(paquete => paquete.id !== paqueteId))
      })
      .catch(error => {
        console.error("Error al eliminar el destino:", error);
        alert("Hubo un error al intentar eliminar el destino.");
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
    <div className='section py-3'>
      <div className="dashboardBoxWrapper d-flex">
        <DashboardBox
          color={["#1da256", "#48d483"]}
          icon={<FaUserCircle />}
          grow={true}
          title="Usuarios Totales"
          value={usuarios.length}
        />
        <DashboardBox 
          color={["#c012e2", "#eb64fe"]}
          icon={<TiWeatherPartlySunny />}
          title="Destinos Totales"
          value={paquetes.length}
        />
        <DashboardBox
          color={["#2c78e5", "#60aff5"]}
          icon={<MdShoppingBag />}
          title="Reservas Totales"
          value={reservaciones.length}
        />
      </div>
      <div className='card shadow my-4 border-0'>
        <div className='flex items-center mb-4 justify-between  pt-3 px-4'>
          <h2 className='mb-0 font-bold text-md'>Destinos</h2>
        </div>
        <div className="table-responsive mb-2">
          <table className="table w-[100%] table-striped">
            <thead className="thead-light">
              <tr>
                <th>
                  <Checkbox {...label} size="small" onChange={selectAll} />
                </th>
                <th>DESTINO</th>
                <th>PRECIO</th>
                <th>STOCK</th>
                <th>FECHA DE SALIDA</th>
                <th>FECHA DE REGRESO</th>
                <th>ACCIONES</th>
              </tr>
            </thead>
            <tbody>
              {paquetes.length > 0 ? paquetes.map((paquete) => (
                <tr key={paquete.id}>
                  <td>
                    <Checkbox {...label} size="small" checked={isAllChecked} />
                  </td>
                  <td>
                    <div className="flex items-center gap-5 w-[300px]">
                      <div className="info w-[75%]">
                        <h6>{paquete.nombre}</h6>
                        <p>{paquete.descripcion}</p>
                      </div>
                    </div>
                  </td>
                  <td>${paquete.precio} USD</td>
                  <td>{paquete.stock}</td>
                  <td>{new Date(paquete.fechaSalida).toLocaleString('es-ES', { timeZone: 'UTC', hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit', year: 'numeric' })}</td>
                  <td>{new Date(paquete.fechaRegreso).toLocaleString('es-ES', { timeZone: 'UTC', hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit', year: 'numeric' })}</td>
                  <td>
                    <div className="actions flex items-center gap-2">
                      <TooltipBox title="Edit" placement="top">
                        <Link to={`/destination/edit/${paquete.id}`} className="no-link-style">
                          <button className="flex items-center justify-center w-[30px] h-[30px] rounded-md duration-300">
                            <FiEdit3 />
                          </button>
                        </Link>
                      </TooltipBox>

                      <TooltipBox title="View" placement="top">
                        <Link to={`/destination/view/${paquete.id}`} className="no-link-style">
                          <button className="flex items-center justify-center w-[30px] h-[30px] rounded-md duration-300">
                            <MdOutlineRemoveRedEye />
                          </button>
                        </Link>
                      </TooltipBox>

                      <TooltipBox title="Remove" placement="top">
                        <button
                          className="flex items-center justify-center w-[30px] h-[30px] rounded-md duration-300"
                          onClick={() => handleDelete(paquete.id)}
                        >
                          <MdOutlineDeleteOutline />
                        </button>
                      </TooltipBox>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="7" className="text-center">No hay paquetes disponibles</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashbord;