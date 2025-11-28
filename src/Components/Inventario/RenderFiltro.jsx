import React, {useState} from 'react';
import options from '../../assets/datos.json';

const RenderFiltro = ({
    setShowFilterPanel,
    filterCriteria,
    setFilterCriteria,
    onApply
}) => {

    return (
        <div className="modal-overlay"> 
            
            <div className="filter-panel">
                <h2 className="title">Filtro y Búsqueda</h2>

                <div className="grid-container grid-cols-2">
                    
                    <div className="info-item"> 
                        <label htmlFor="serviceType">Estado:</label>
                        <select 
                            className="form-input"
                            value={filterCriteria.estado}
                            onChange={e => setFilterCriteria({...filterCriteria, estado: e.target.value})}
                        >
                            <option value="">Selecciona el estado</option>
                            {options.estado.map(servicio => (
                                <option key={servicio} value={servicio}>{servicio}</option>
                            ))}
                        </select>

                        <label htmlFor="serviceType">Plaza:</label>
                        <select 
                            className="form-input"
                            value={filterCriteria.plaza}
                            onChange={e => setFilterCriteria({...filterCriteria, plaza: e.target.value})}
                        >
                            <option value="">Selecciona la Plaza</option>
                            {options.plazaDeAtencion.map(plaza => (
                                <option key={plaza} value={plaza}>{plaza}</option>
                            ))}
                        </select>




                    </div>
                    
                            <div className="date-range-container"> 
                        <label htmlFor="fechaInicio">Fecha inicio:</label>
                        <input
                            type="date"
                            id="fechaInicio"
                            name="fechaInicio"
                            className="form-input"
                            value={filterCriteria.fechaInicio || ''}
                            onChange={(e) => setFilterCriteria({...filterCriteria, fechaInicio: e.target.value})}
                        />
                        
                        <label htmlFor="fechaFin">Fecha fin:</label>
                        <input
                            type="date"
                            id="fechaFin"
                            name="fechaFin"
                            className="form-input" 
                            value={filterCriteria.fechaFin || ''}
                            onChange={(e) => setFilterCriteria({...filterCriteria, fechaFin: e.target.value})}
                        />
                    </div>
                
                </div>
            

                <div className="pagination-controls">
                    <button className="btn btn-primary" onClick={onApply}> 
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