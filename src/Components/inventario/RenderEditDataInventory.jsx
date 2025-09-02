import React, { useState } from 'react';
import './TemplateInventory.css';

const RenderEditDataInventory = ({ data, onSave, onCancel }) => {
    // Inicializa el estado con los datos o un objeto vacío para evitar errores
    const [editedData, setEditedData] = useState(data || {});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className="ticket-template-container">
            <h3>Editar Inventario</h3>
            <div className="info-section">
                <div className="info-column">
                    <label>
                        <strong>Responsable</strong>
                        <input
                            type="text"
                            name="responsable"
                            value={editedData.responsable || ''}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        <strong>Código E-mail</strong>
                        <input
                            type="text"
                            name="codigoEmail"
                            value={editedData.codigoEmail || ''}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        <strong>Número de Serie</strong>
                        <input
                            type="text"
                            name="numeroSerie"
                            value={editedData.numeroSerie || ''}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        <strong>Título</strong>
                        <input
                            type="text"
                            name="titulo"
                            value={editedData.titulo || ''}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        <strong>Descripción</strong>
                        <textarea
                            name="descripcion"
                            value={editedData.descripcion || ''}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        <strong>Equipo</strong>
                        <input
                            type="text"
                            name="equipo"
                            value={editedData.equipo || ''}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        <strong>Nº última incidencia</strong>
                        <input
                            type="text"
                            name="numeroIncidencia"
                            value={editedData.numeroIncidencia || ''}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                    <strong>Estado:</strong>
                    <select
                        name="estado"
                        value={editedData.estado || ''}
                        onChange={handleInputChange}
                    >
                        <option value="dañado">Dañado</option>
                        <option value="instalado">Instalado</option>
                        <option value="stock">Stock</option>
                        <option value="devuelto a PC">Devuelto a PC</option>
                        <option value="robado">Robado</option>
                        <option value="para instalar">Para instalar</option>
                        <option value="almacen tijuana">Almacen tijuana</option>
                    </select>
                </label>
                </div>
                <div className="info-column">
                    
                    
                    <label>
                        <strong>Cliente</strong>
                        <input
                            type="text"
                            name="cliente"
                            value={editedData.cliente || ''}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        <strong>Plaza</strong>
                        <input
                            type="text"
                            name="plaza"
                            value={editedData.plaza || ''}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        <strong>Guías</strong>
                        <input
                            type="text"
                            name="guias"
                            value={editedData.guias || ''}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        <strong>Técnico de Campo</strong>
                        <input
                            type="text"
                            name="tecnicoCampo"
                            value={editedData.tecnicoCampo || ''}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        <strong>Fecha Actualización</strong>
                        <input
                            type="date"
                            name="fechaFin"
                            value={editedData.fechaActualizacion || ''}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        <strong>Fecha Inicio prevista:</strong>
                        <input
                            type="date"
                            name="fechaFin"
                            value={editedData.fechaInicioPrevista || ''}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        <strong>Fecha fin prevista:</strong>
                        <input
                            type="date"
                            name="fechaFin"
                            value={editedData.fechaFinPrevista || ''}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        <strong>Fecha Fin:</strong>
                        <input
                            type="date"
                            name="fechaFin"
                            value={editedData.fechaFin || ''}
                            onChange={handleInputChange}
                        />
                    </label>
                </div>
            </div>
            <div className="button-container">
                <button className="save-button" onClick={() => onSave(editedData)}>Guardar</button>
                <button className="cancel-button" onClick={onCancel}>Cancelar</button>
            </div>
        </div>
    );
};

export default RenderEditDataInventory;