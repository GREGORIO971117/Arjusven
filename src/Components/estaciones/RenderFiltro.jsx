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
                        <label htmlFor="serviceType">Supervisor:</label>
                        <select 
                            className="form-input"
                            value={filterCriteria.supervisorArjus}
                            onChange={e => setFilterCriteria({...filterCriteria, supervisorArjus: e.target.value})}
                        >
                            <option value="todos">Selecciona el supervisor</option>
                            {options.supervisores.map(supervisor => (
                                <option key={supervisor} value={supervisor}>{supervisor}</option>
                            ))}
                        </select>

                        <label htmlFor="cobertura">Cobertura:</label>
                        <select 
                            className="form-input"
                            value={filterCriteria.cobertura}
                            onChange={e => setFilterCriteria({...filterCriteria, cobertura: e.target.value})}
                        >
                            <option value="todos">Selecciona la cobertura</option>
                            {options.sla.map(cobertura => (
                                <option key={cobertura} value={cobertura}>{cobertura}</option>
                            ))}
                        </select>

                        <label htmlFor="plazaDeAtencion">Plaza de atención:</label>
                        <select 
                            className="form-input"
                            value={filterCriteria.plazaDeAtencion}
                            onChange={e => setFilterCriteria({...filterCriteria, plazaDeAtencion: e.target.value})}
                        >
                            <option value="todos">Seleccione plaza de atención:</option>
                            {options.plazaDeAtencion.map(plaza => (
                                <option key={plaza} value={plaza}>{plaza}</option>
                            ))}
                        </select>
                       
                       


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