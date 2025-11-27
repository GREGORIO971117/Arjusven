import React, {useState} from 'react';
import options from '../../assets/datos.json';

const RenderFiltro = ({
    setShowFilterPanel,
    filterCriteria,
    setFilterCriteria,
    onApply
}) => {

    const[botonesModal,setBotonesModal]=useState('');

    const handleSetStatus = (status) => {
        if (botonesModal === status) {
                    setBotonesModal('todos'); 
                } else {
                    setBotonesModal(status); 
                }    
    }
  
    return (
        <div className="modal-overlay"> 
            
            <div className="filter-panel">
                <h2 className="title">Opciones de Filtro y Búsqueda</h2>

                <div className="grid-container grid-cols-2">
                    
                    <div className="info-item"> 
                        <label htmlFor="sla">SLA:</label>
                        <select 
                            className="form-input"
                            onChange={(e) => setFilterCriteria({...filterCriteria, sla: e.target.value})}
                            value={filterCriteria.sla || ''}
                        >
                            <option value="todos">Selecciona un SLA</option>
                            {options.sla.map(sla => (
                                <option key={sla} value={sla}>{sla}</option>
                            ))}
                        </select>

                        <label htmlFor="tipoDeServicio">Tipo de Servicio:</label>
                        <select 
                            className="form-input"
                            onChange={(e) => setFilterCriteria({...filterCriteria, tipoDeServicio: e.target.value})}
                            value={filterCriteria.tipoDeServicio || ''}
                        >
                            <option value="todos">Selecciona un tipo de servicio</option>
                            {options.servicio.map(tipoDeServicio => (
                                <option key={tipoDeServicio} value={tipoDeServicio}>{tipoDeServicio}</option>
                            ))}
                        </select>
                    </div>

                    {/* Botones de estado */}
                    <button 
                        className={`modal-button ${botonesModal === 'todos' ? 'active' : ''}`}
                        onClick={ () => {
                            handleSetStatus('todos');
                            setFilterCriteria({...filterCriteria, situacion: 'todos'});
                        }}
                    >
                        Todos
                    </button>
                    <button className={`modal-button ${botonesModal === 'abierto' ? 'active' : ''}`}
                        onClick={ () => {
                            handleSetStatus('abierto');
                            setFilterCriteria({...filterCriteria, situacion: 'abierto'});
                        }}
                    >
                        Abiertos
                    </button>
                    <button className={`modal-button ${botonesModal === 'cerrado' ? 'active' : ''}`}
                        onClick={ () => {
                            handleSetStatus('cerrado');
                            setFilterCriteria({...filterCriteria, situacion: 'cerrado'});
                        }}
                    >
                        Cerrados
                    </button>
                        
                        
                </div>

                <div className="pagination-controls">

                <button className="btn btn-primary" onClick={onApply}> {/* CLASE CORREGIDA: Usa 'btn btn-primary' */}
                        Aplicar Filtros
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