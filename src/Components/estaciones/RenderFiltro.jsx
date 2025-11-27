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

                        <label htmlFor="estado">Estado:</label>
                        <select 
                            className="form-input"
                            value={filterCriteria.estado}
                            onChange={e => setFilterCriteria({...filterCriteria, estado: e.target.value})}
                        >
                            <option value="todos">Selecciona el estado</option>
                            {options.estadosMx.map(estado => (
                                <option key={estado} value={estado}>{estado}</option>
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