import React, { useState } from 'react'
import ImageUpload from './ImageUpload';
import Button from "@mui/material/Button";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const DestinationCreate = () => {
    const navigate = useNavigate();
    const [imagePreview, setImagePreview] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [paquete, setPaquete] = useState({
        nombre: "",
        descripcion: "",
        lugares: "",
        hospedaje: "",
        fechaSalida: "",
        fechaRegreso: "",
        precio: "",
        promocion: "",
        stock: "",
        estado: "",
        tipoDestino: ""
    });

    const handleImageSelect = (imageUrl, file) => {
        setImagePreview(imageUrl);
        setImageFile(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!paquete.nombre || !paquete.descripcion || !paquete.lugares || !paquete.hospedaje || !paquete.fechaSalida || !paquete.fechaRegreso || !paquete.precio || !paquete.promocion || !paquete.stock || !paquete.estado || !paquete.tipoDestino) {
            alert("Por favor, complete todos los campos obligatorios.");
            return;
        }
    
        if (new Date(paquete.fechaRegreso) <= new Date(paquete.fechaSalida)) {
            alert("La fecha de regreso debe ser posterior a la fecha de salida.");
            return;
        }
    
        try {
            const formData = new FormData();
            formData.append('nombre', paquete.nombre);
            formData.append('descripcion', paquete.descripcion);
            formData.append('lugares', paquete.lugares);
            formData.append('hospedaje', paquete.hospedaje);
            formData.append('fechaSalida', paquete.fechaSalida);
            formData.append('fechaRegreso', paquete.fechaRegreso);
            formData.append('precio', paquete.precio);
            formData.append('promocion', paquete.promocion);
            formData.append('stock', paquete.stock);
            formData.append('estado', paquete.estado);
            formData.append('tipoDestino', paquete.tipoDestino);
    
            if (imageFile) {
                formData.append('image', imageFile);
            }
    
            await axios.post("http://localhost:9999/paquete", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
    
            alert("Destino creado con éxito!");
            navigate('/');
    
        } catch (error) {
            console.error("Error al crear el paquete:", error);
            alert("Hubo un error al intentar crear el paquete");
        }
    };
    

  return (
    <>
        <div className="card shadow my-4 border-0 flex-center p-3">
            <div className="flex items-center justify-between">
                <h1 className="font-weight-bold mb-0">Crear Destino</h1>
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
                                value={paquete.nombre}
                                placeholder="Ingrese el nombre"
                                onChange={e => setPaquete({ ...paquete, nombre: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="col-md-12 col_">
                        <h4>Descripción del Destino</h4>
                        <div className="form-group">
                            <input
                                type="text"
                                className="input"
                                value={paquete.descripcion}
                                placeholder="Ingrese la descripción"
                                onChange={e => setPaquete({ ...paquete, descripcion: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="col-md-12 col_">
                        <h4>Lugares a recorrer</h4>
                        <div className="form-group">
                            <input
                                type="text"
                                className="input"
                                value={paquete.lugares}
                                placeholder="Ingrese los lugares a recorrer"
                                onChange={e => setPaquete({ ...paquete, lugares: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="col-md-3 col_">
                        <h4>Hospedaje</h4>
                        <div className="form-group">
                            <input
                                type="text"
                                className="input"
                                value={paquete.hospedaje}
                                placeholder="Ingrese el hospedaje"
                                onChange={e => setPaquete({ ...paquete, hospedaje: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="col-md-3 col_">
                        <h4>Fecha y Hora de Salida</h4>
                        <div className="form-group">
                            <input
                            type="datetime-local" 
                            className="input"
                            value={paquete.fechaSalida}
                            placeholder="Seleccione una fecha y hora"
                            onChange={e => setPaquete({ ...paquete, fechaSalida: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="col-md-3 col_">
                        <h4>Fecha y Hora de Regreso</h4>
                        <div className="form-group">
                            <input
                            type="datetime-local" 
                            className="input"
                            value={paquete.fechaRegreso}
                            placeholder="Seleccione una fecha y hora"
                            onChange={e => setPaquete({ ...paquete, fechaRegreso: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="col-md-3 col_">
                        <h4>Precio</h4>
                        <div className="form-group">
                            <input
                                type="number" 
                                className="input" 
                                value={paquete.precio}
                                placeholder="Ingrese el precio" 
                                onChange={e => setPaquete({ ...paquete, precio: parseFloat(e.target.value) || 0 })}
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
                                value={paquete.promocion}
                                placeholder="Ingrese la promoción"
                                onChange={e => setPaquete({ ...paquete, promocion: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="col-md-3 col_">
                        <h4>Stock</h4>
                        <div className="form-group">
                            <input
                                type="number" 
                                className="input"
                                value={paquete.stock}
                                placeholder="Ingrese el stock"
                                onChange={e => setPaquete({ ...paquete, stock: e.target.value })}
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
                                value={paquete.estado}
                                className="form-control"
                                onChange={e => setPaquete({ ...paquete, estado: e.target.value })}
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
                                value={paquete.tipoDestino}
                                className="form-control"
                                onChange={e => setPaquete({ ...paquete, tipoDestino: e.target.value })}
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
                <h2 className="font-weight-bold text-black/70">
                    Subir imágen del destino
                </h2>
                
                <ImageUpload onImageSelect={handleImageSelect} />
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
                    onClick={handleSubmit}
                    >
                    Crear Destino
                </Button>
            </div>
        </form>
    </>
  )
}

export default DestinationCreate
