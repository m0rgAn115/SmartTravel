import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import Button from "@mui/material/Button";

const DestinationEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [destino, setDestino] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:9999/paquete/${id}`)
            .then(response => {
                setDestino(response.data);
            })
            .catch(error => {
                console.error("Error al obtener los detalles del destino:", error);
            });
    }, [id]);

    const handleUpdate = () => {
        if (!destino.nombre || !destino.descripcion || !destino.lugares || !destino.hospedaje || !destino.fechaSalida || !destino.fechaRegreso || !destino.precio || !destino.promocion || !destino.estado || !destino.tipoDestino) {
            alert("Por favor, complete todos los campos obligatorios.");
            return;
        }

        if (new Date(destino.fechaRegreso) <= new Date(destino.fechaSalida)) {
            alert("La fecha de regreso debe ser posterior a la fecha de salida.");
            return;
        }
        axios.put(`http://localhost:9999/paquete/${id}`, destino)
            .then(response => {
                alert("Destino actualizado con éxito!");
                navigate('/');
            })
            .catch(error => {
                console.error("Error al actualizar el destino:", error);
            });
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toISOString().slice(0, 16); // Formato correcto "yyyy-MM-ddThh:mm"
      };

    if (!destino) {
        return <p>Cargando destino...</p>;  // Mostrar un mensaje de carga
    }
  return (
    <>
        <div className="card shadow my-4 border-0 flex-center p-3">
            <div className="flex items-center justify-between">
                <h1 className="font-weight-bold mb-0">Editar Destino</h1>
            </div>
        </div>

        <form className='form w-[100%] mt-4'>
            <div style={{fontSize: 'inherit'}} className='card shadow my-4 border-0 flex-center p-3'>
                <h2 className="font-weight-bold text-black/70 mb-4">Información Básica</h2>

                <div className="row">
                    <div className="col-md-12 col_">
                        <h4>Nombre del Destino</h4>
                        <div className="form-group">
                            <input 
                                type="text"
                                className="input"
                                value={destino.nombre}
                                onChange={e => setDestino({ ...destino, nombre: e.target.value })}
                                placeholder="Ingrese el nombre"
                            />
                        </div>
                    </div>

                    <div className="col-md-12 col_">
                        <h4>Descripción del Destino</h4>
                        <div className="form-group">
                            <input
                                type="text"
                                className="input"
                                value={destino.descripcion}
                                onChange={e => setDestino({ ...destino, descripcion: e.target.value })}
                                placeholder="Ingrese la descripción"
                            />
                        </div>
                    </div>

                    <div className="col-md-12 col_">
                        <h4>Lugares a recorrer</h4>
                        <div className="form-group">
                            <input
                                type="text"
                                className="input"
                                value={destino.lugares}
                                onChange={e => setDestino({ ...destino, lugares: e.target.value })}
                                placeholder="Ingrese los lugares a recorrer"
                            />
                        </div>
                    </div>

                    <div className="col-md-3 col_">
                        <h4>Hospedaje</h4>
                        <div className="form-group">
                            <input
                                type="text"
                                className="input"
                                value={destino.hospedaje}
                                onChange={e => setDestino({ ...destino, hospedaje: e.target.value })}
                                placeholder="Ingrese el hospedaje"
                            />
                        </div>
                    </div>

                    <div className="col-md-3 col_">
                        <h4>Fecha y Hora de Salida</h4>
                        <div className="form-group">
                            <input
                                type="datetime-local" 
                                className="input" 
                                value={formatDate(destino.fechaSalida)}
                                onChange={e => setDestino({ ...destino, fechaSalida: e.target.value })}
                                placeholder="Seleccione una fecha y hora"
                            />
                        </div>
                    </div>

                    <div className="col-md-3 col_">
                        <h4>Fecha y Hora de Regreso</h4>
                        <div className="form-group">
                            <input
                            type="datetime-local" 
                            className="input" 
                            value={formatDate(destino.fechaRegreso)}
                            onChange={e => setDestino({ ...destino, fechaRegreso: e.target.value })}
                            placeholder="Seleccione una fecha y hora"
                            />
                        </div>
                    </div>

                    <div className="col-md-3 col_">
                        <h4>Precio</h4>
                        <div className="form-group">
                            <input
                                type="number" 
                                className="input" 
                                value={destino.precio}
                                onChange={e => setDestino({ ...destino, precio: e.target.value })}
                                placeholder="Ingrese el precio"
                                min="0" 
                                max="10000" 
                                step="1" 
                            />
                        </div>
                    </div>

                    <div className="col-md-3 col_">
                        <h4>Promoción</h4>
                        <div className="form-group">
                            <input
                                type="text"
                                className="input"
                                value={destino.promocion}
                                onChange={e => setDestino({ ...destino, promocion: e.target.value })}
                                placeholder="Ingrese la promoción"
                            />
                        </div>
                    </div>

                    <div className="col-md-3 col_">
                        <h4>Stock</h4>
                        <div className="form-group">
                            <input
                                type="number" 
                                className="input" 
                                value={destino.stock}
                                onChange={e => setDestino({ ...destino, stock: e.target.value })}
                                placeholder="Ingrese el stock"
                                min="0" 
                                max="10" 
                                step="1" 
                            />
                        </div>
                    </div>

                    <div className="col-md-3 col_">
                        <h4>Estado</h4>
                        <div className="form-group">
                            <select
                                value={destino.estado}
                                onChange={e => setDestino({ ...destino, estado: e.target.value })}
                                className="form-control"
                            >
                                <option value="" disabled selected>
                                    Seleccione un estado
                                </option>
                                <option value="Activo">Activo</option>
                                <option value="Inactivo">Inactivo</option>
                                <option value="Eliminado">Eliminado</option>
                            </select>
                        </div>
                    </div>

                    <div className="col-md-3 col_">
                        <h4>Tipo</h4>
                        <div className="form-group">
                            <select
                                value={destino.tipoDestino}
                                onChange={e => setDestino({ ...destino, tipoDestino: e.target.value })}
                                className="form-control"
                            >
                                <option value="" disabled selected>
                                    Seleccione el tipo
                                </option>
                                <option value="Nacional">Nacional</option>
                                <option value="Internacional">Internacional</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div className="card shadow my-4 border-0 flex-center p-3">
                <Button 
                        style={{
                            background: "#346ae7", 
                            color: "#fff", 
                            padding: "10px 20px", 
                            fontWeight: "bold", 
                            fontSize: "16px",
                            borderRadius: "6px",
                            border: "none",
                            textTransform: "none"
                        }} 
                        className="btn-blue btn-lg"
                        onClick={handleUpdate}
                        >
                        Editar Destino
                </Button>
            </div>
        </form>
    </>
  )
}

export default DestinationEdit