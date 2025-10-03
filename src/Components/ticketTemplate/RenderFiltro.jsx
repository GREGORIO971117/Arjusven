import React, {useState} from 'react';
import options from '../../assets/datos.json';

const RenderFiltro = ({
    setShowFilterPanel
}) => {

    const[botonesModal,setBotonesModal]=useState('Todos');

    const handleSetStatus = (status) => {
if (botonesModal === status) {
            setBotonesModal(''); // Desactiva el botón (vuelve a la normalidad)
        } else {
            setBotonesModal(status); // Activa el nuevo botón
        }    }
  
    return (
        // CLASE CORREGIDA: Usa 'modal-overlay' para el fondo oscuro y fijo.
        <div className="modal-overlay"> 
            
            <div className="filter-panel">
                <h2 className="title">Opciones de Filtro y Búsqueda</h2>

                <div className="grid-container grid-cols-2">
                    
                    {/* Estructura para cada campo de selección */}
                    <div className="info-item">
                        <label htmlFor="supervisor">Supervisor:</label>
                        <select className="form-input">
                            <option value="">Selecciona un supervisor</option>
                            {options.supervisores.map(supervisor => (
                                <option key={supervisor} value={supervisor}>{supervisor}</option>
                            ))}
                        </select>
                    </div>

                    <div className="info-item"> 
                        <label htmlFor="estadosMx">Estado de la República:</label>
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
                        <label htmlFor="serviceType">Tipo de Servicio:</label>
                        <select className="form-input">
                            <option value="">Selecciona un servicio</option>
                            {options.servicio.map(servicio => (
                                <option key={servicio} value={servicio}>{servicio}</option>
                            ))}
                        </select>
                    </div>
                    
                    <div className="info-item"> 
                        <label htmlFor="sla">SLA:</label>
                        <select className="form-input">
                            <option value="">Selecciona un SLA</option>
                            {options.sla.map(sla => (
                                <option key={sla} value={sla}>{sla}</option>
                            ))}
                        </select>
                    </div>
                    
                    <div className="info-item"> 
                        <label htmlFor="assignDate">Fecha de Asignación:</label>
                        <input
                            type="date"
                            id="assignDate"
                            name="assignDate"
                            className="form-input" // CLASE CORREGIDA
                        />
                    </div>
                    
                    <div className="info-item"> 
                        <label htmlFor="sentDate">Fecha de Envío:</label>
                        <input
                            type="date"
                            id="sentDate"
                            name="sentDate"
                            className="form-input" // CLASE CORREGIDA
                        />
                    </div>
                </div>
                
                {/* CLASE CORREGIDA: Usa 'ticket-tabs' para los botones de estado/filtrado. */}
                <div className="modal-button-container">
                    <button
                        className={`modal-button ${botonesModal === 'todos' ? 'active' : ''}`}
                        onClick={ () => handleSetStatus('todos')}
                    >
                        Todos
                    </button>
                    <button className={`modal-button ${botonesModal === 'abierto' ? 'active' : ''}`}
                        onClick={ () => handleSetStatus('abierto')}>
                        Abiertos
                    </button>
                    <button className={`modal-button ${botonesModal === 'cerrado' ? 'active' : ''}`}
                        onClick={ () => handleSetStatus('cerrado')}>
                        Cerrados
                    </button>
                    
                        <button className={`modal-button ${botonesModal === 'repetidos' ? 'active' : ''}`}
                        onClick={ () => handleSetStatus('repetidos')}>
                            Repetidos
                        </button>
                        
                        
                </div>

                <div className="pagination-controls">

                <button className="btn btn-primary" onClick={() => setShowFilterPanel(false)}> {/* CLASE CORREGIDA: Usa 'btn btn-primary' */}
                        Aplicar Filtros
                    </button>
                    
                    <button className="btn ">
                            Eliminar Repetidos
                    </button>

                    <button className="btn btn-secondary" onClick={() => setShowFilterPanel(false)}> {/* CLASE CORREGIDA: Usa 'btn btn-secondary' */}
                        Cerrar
                    </button>
                </div>
                    
                </div>
            </div>
    );
};

export default RenderFiltro;