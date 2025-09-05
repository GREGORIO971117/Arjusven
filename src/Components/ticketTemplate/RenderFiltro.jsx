import React from 'react';
import './TicketList.css';
import data from '../../assets/datos.json';

const RenderFiltro = ({
    repeatedTickets,
    handleDeleteRepeated,
    filterStatus,
    setFilterStatus,
    setShowFilterPanel
}) => {

    const options = data;
    
    return (
        <div className="filter-panel-overlay">
            <div className="filter-panel">
                <h2>Opciones de Filtro y Búsqueda</h2>

                {/* Campos de Búsqueda */}
                <div className="search-fields">
                    <div className="search-field-group">
                        <label htmlFor="supervisor">Supervisor:</label>
                        <select>
                            <option value="">Selecciona un supervisor</option>
                            {options.supervisores.map(supervisores=>(
                                <option key={supervisores} value={supervisores}>{supervisores}</option>
                            ))}
                        </select>
                    </div>

                    <div className="search-field-group">
                        <label htmlFor="estadosMx">Estado de la República:</label>
                        <select>
                            <option value="">Selecciona un estado</option>
                            {options.estadosMx.map(estados=>(
                                <option key={estados} value={estados}>{estados}</option>
                            ))}
                        </select>
                    </div>
                    <div className="search-field-group">
                        <label htmlFor="technician">Técnico de Campo:</label>
                        <select>
                            <option value="">Selecciona un técnico</option>
                            {options.tecnicos.map(tecnicos=>(
                                <option key={tecnicos} value={tecnicos}>{tecnicos}</option>
                            ))}
                        </select>
                    </div>
                    <div className="search-field-group">
                        <label htmlFor="serviceType">Tipo de Servicio:</label>
                        <select>
                            <option value="">Selecciona un servicio</option>
                            {options.servicio.map(servicio=>(
                                <option key={servicio} value={servicio}>{servicio}</option>
                            ))}
                        </select>
                    </div>
                    <div className="search-field-group">
                        <label htmlFor="sla">SLA:</label>
                        <select>
                            <option value="">Selecciona un SLA</option>
                            {options.sla.map(sla=>(
                                <option key={sla} value={sla}>{sla}</option>
                            ))}
                        </select>
                    </div>
                    <div className="search-field-group">
                        <label htmlFor="assignDate">Fecha de Asignación:</label>
                        <input
                            type="date"
                            id="assignDate"
                            name="assignDate"
                        />
                    </div>
                    <div className="search-field-group">
                        <label htmlFor="sentDate">Fecha de Envío:</label>
                        <input
                            type="date"
                            id="sentDate"
                            name="sentDate"
                        />
                    </div>
                </div>
                
                {/* Botones de Filtro por Estado */}
                <div className="filter-buttons">
                    <button 
                        className={filterStatus === 'Todos' ? 'active' : ''}
                        onClick={() => setFilterStatus('Todos')}>
                        Todos
                    </button>
                    <button 
                        className={filterStatus === 'Abierto' ? 'active' : ''}
                        onClick={() => setFilterStatus('Abierto')}>
                        Abiertos
                    </button>
                    <button 
                        className={filterStatus === 'Cerrado' ? 'active' : ''}
                        onClick={() => setFilterStatus('Cerrado')}>
                        Cerrados
                    </button>
                    <div className="repeated-filter-container">
                        <button 
                            className={filterStatus === 'Repetidos' ? 'active' : ''}
                            onClick={() => setFilterStatus('Repetidos')}>
                            Repetidos
                        </button>
                        {filterStatus === 'Repetidos' && repeatedTickets.length > 0 && (
                            <button className="delete-repeated-button" onClick={handleDeleteRepeated}>
                                Eliminar Repetidos ({repeatedTickets.length})
                            </button>
                        )}
                    </div>
                </div>
                
                <div className="action-buttons">
                    <button className="apply-filter-button" onClick={() => setShowFilterPanel(false)}>
                        Aplicar Filtros
                    </button>
                    <button className="close-filter-button" onClick={() => setShowFilterPanel(false)}>
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RenderFiltro;