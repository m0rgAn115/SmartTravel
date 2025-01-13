import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const DestinationView = () => {
    const { id } = useParams();
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

    if (!destino) {
        return <p>Cargando destino...</p>;
    }

    return (
        <>
            <div className="card shadow my-4 border-0 flex-center p-3">
                <div className="flex items-center justify-between">
                    <h1 className="font-weight-bold mb-0">Ver Destino</h1>
                </div>
            </div>

            <form className='form w-[100%] mt-4'>
                <div style={{fontSize: 'inherit'}} className='card shadow my-4 border-0 flex-center p-3'>
                    <h2 className="font-weight-bold text-black/70 mb-4">Información Básica</h2>

                    <div className="row">
                        <div className="col-md-12 col_">
                            <h4>Nombre del Destino</h4>
                            <div className="form-group">
                                <p>{destino.nombre}</p>
                            </div>
                        </div>

                        <div className="col-md-12 col_">
                            <h4>Descripción del Destino</h4>
                            <div className="form-group">
                                <p>{destino.descripcion}</p>
                            </div>
                        </div>

                        <div className="col-md-12 col_">
                            <h4>Lugares a recorrer</h4>
                            <div className="form-group">
                                <p>{destino.lugares}</p>
                            </div>
                        </div>

                        <div className="col-md-3 col_">
                            <h4>Hospedaje</h4>
                            <div className="form-group">
                                <p>{destino.hospedaje}</p>
                            </div>
                        </div>

                        <div className="col-md-3 col_">
                            <h4>Fecha de Salida</h4>
                            <div className="form-group">
                                <p>{new Date(destino.fechaSalida).toLocaleString('es-ES', { timeZone: 'UTC', hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit', year: 'numeric' })}</p>
                            </div>
                        </div>

                        <div className="col-md-3 col_">
                            <h4>Fecha de Regreso</h4>
                            <div className="form-group">
                                <p>{new Date(destino.fechaRegreso).toLocaleString('es-ES', { timeZone: 'UTC', hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit', year: 'numeric' })}</p>
                            </div>
                        </div>

                        <div className="col-md-3 col_">
                            <h4>Precio</h4>
                            <div className="form-group">
                                <p>${destino.precio} USD</p>
                            </div>
                        </div>

                        <div className="col-md-3 col_">
                            <h4>Promoción</h4>
                            <div className="form-group">
                                <p>{destino.promocion}</p>
                            </div>
                        </div>

                        <div className="col-md-3 col_">
                            <h4>Stock</h4>
                            <div className="form-group">
                                <p>{destino.stock}</p>
                            </div>
                        </div>

                        <div className="col-md-3 col_">
                            <h4>Estado</h4>
                            <div className="form-group">
                                <p>{destino.estado}</p>
                            </div>
                        </div>

                        <div className="col-md-3 col_">
                            <h4>Tipo</h4>
                            <div className="form-group">
                                <p>{destino.tipoDestino}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
};

export default DestinationView;