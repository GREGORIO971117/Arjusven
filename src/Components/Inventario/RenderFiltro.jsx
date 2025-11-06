import React, {useState} from 'react';
import options from '../../assets/datos.json';

const RenderFiltro = ({setShowFilterPanel}) => {

    const[botonesModal,setBotonesModal]=useState('Todos');

    const handleSetStatus = (status) => {
if (botonesModal === status) {
            setBotonesModal(''); // Desactiva el botón (vuelve a la normalidad)
        } else {
            setBotonesModal(status); // Activa el nuevo botón
        }    }
  
    return (
        <div className="modal-overlay"> 
            
            <div className="filter-panel">
                <h2 className="title">Opciones de Filtro y Búsqueda</h2>

                <div className="grid-container grid-cols-2">

                    <div className="info-item"> 
                        <label htmlFor="estadosMx">Plaza:</label>
                        <select className="form-input">
                            <option value="">Selecciona un estado</option>
                            {options.estadosMx.map(estado => (
                                <option key={estado} value={estado}>{estado}</option>
                            ))}
                        </select>
                    </div>
                    
                    <div className="info-item"> 
                        <label htmlFor="technician">Técnico de Campo:</label>
                        <select className="form-input">
                            <option value="">Selecciona un técnico</option>
                            {options.tecnicos.map(tecnico => (
                                <option key={tecnico} value={tecnico}>{tecnico}</option>
                            ))}
                        </select>
                    </div>
                    
                    <div className="info-item"> 
                        <label htmlFor="serviceType">Estado:</label>
                        <select className="form-input">
                            <option value="">Selecciona el estado</option>
                            {options.estado.map(servicio => (
                                <option key={servicio} value={servicio}>{servicio}</option>
                            ))}
                        </select>
                    </div>
                    
                    <div className="info-item"> 
                        <label htmlFor="sla">Cliente:</label>
                        <select className="form-input">
                            <option value="">Selecciona un cliente</option>
                            {options.cliente.map(sla => (
                                <option key={sla} value={sla}>{sla}</option>
                            ))}
                        </select>
                    </div>
                    
                    <div className="info-item"> 
                        <label htmlFor="assignDate">Fecha de actualización:</label>
                        <input
                            type="date"
                            id="assignDate"
                            name="assignDate"
                            className="form-input" 
                        />
                    </div>

                    <div className="info-item"> 
                        <label htmlFor="dateInicio">Fecha de inicio:</label>
                        <input
                            type="date"
                            id="dateInicio"
                            name="dateInicio"
                            className="form-input" 
                        />
                        <label htmlFor="dateFinal">Fecha de fin:</label>
                        <input
                            type="date"
                            id="dateFinal"
                            name="dateFinal"
                            className="form-input" 
                        />
                    </div>
                
                </div>
            

                <div className="pagination-controls">

                <button className="btn btn-primary" onClick={() => setShowFilterPanel(false)}> 
                        Aplicar Filtros
                    </button>

                    <button className="btn btn-secondary" onClick={() => setShowFilterPanel(false)}> 
                        Cerrar
                    </button>
                </div>
                    
                </div>
            </div>
    );
};

export default RenderFiltro;