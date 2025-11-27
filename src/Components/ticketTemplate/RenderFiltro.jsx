import React from 'react';
import options from '../../assets/datos.json';

const RenderFiltro = ({
    setShowFilterPanel,
    filterCriteria,
    setFilterCriteria,
    onApply
}) => {
  
    const handleSetStatus = (status) => {
        const newStatus = filterCriteria.situacion === status ? 'todos' : status;
        setFilterCriteria({ ...filterCriteria, situacion: newStatus });
    };
  
    return (
        <div className="modal-overlay"> 
            
            <div className="filter-panel">
                <h2 className="title">Filtro y Búsqueda</h2>

                <div className="grid-container grid-cols-2">
                    
                    <div className="info-item"> 
                        <label htmlFor="sla">SLA:</label>
                        <select 
                            className="form-input"
                            onChange={(e) => setFilterCriteria({...filterCriteria, sla: e.target.value})}
                            value={filterCriteria.sla || 'todos'}
                        >
                            <option value="todos">Todos los SLA</option>
                            {options.sla.map(sla => (
                                <option key={sla} value={sla}>{sla}</option>
                            ))}
                        </select>

                        <label htmlFor="tipoDeServicio">Tipo de Servicio:</label>
                        <select 
                            className="form-input"
                            onChange={(e) => setFilterCriteria({...filterCriteria, tipoDeServicio: e.target.value})}
                            value={filterCriteria.tipoDeServicio || 'todos'}
                        >
                            <option value="todos">Todos los tipos de servicio</option>
                            {options.servicio.map(tipoDeServicio => (
                                <option key={tipoDeServicio} value={tipoDeServicio}>{tipoDeServicio}</option>
                            ))}
                        </select>

                        <label htmlFor="supervisor">Supervisores:</label>
                        <select 
                            className="form-input"
                            onChange={(e) => setFilterCriteria({...filterCriteria, supervisor: e.target.value})}
                            value={filterCriteria.supervisor || 'todos'}
                        >
                            <option value="todos">Todos los supervisores</option>
                            {options.supervisores.map(supervisor => (
                                <option key={supervisor} value={supervisor}>{supervisor}</option>
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
                
                <div className="modal-button-container">
                    <button 
                        className={`modal-button ${filterCriteria.situacion === 'todos' ? 'active' : ''}`}
                        onClick={() => handleSetStatus('todos')}
                    >
                        Todos
                    </button>
                    <button 
                        className={`modal-button ${filterCriteria.situacion === 'abierto' ? 'active' : ''}`}
                        onClick={() => handleSetStatus('abierto')}
                    >
                        Abiertos
                    </button>
                    <button 
                        className={`modal-button ${filterCriteria.situacion === 'cerrado' ? 'active' : ''}`}
                        onClick={() => handleSetStatus('cerrado')}
                    >
                        Cerrados
                    </button>
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