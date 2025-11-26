import React from 'react'; // Ya no necesitamos useState aquí
import options from '../../assets/datos.json';

const RenderFiltro = ({
    setShowFilterPanel,
    filterCriteria,    
    setFilterCriteria,  
    onApply             
}) => {

    // 1. Usamos el estado del padre directamente
    const botonesModal = filterCriteria.situacion;

    const handleSetStatus = (status) => {
        // Lógica: Si le das click al que ya está activo, lo pones en 'todos', si no, pones el nuevo
        const newStatus = (botonesModal === status) ? 'todos' : status;

        setFilterCriteria(prev => ({
            ...prev,
            situacion: newStatus
        }));
    }
return (
        <div className="modal-overlay"> 
            
            <div className="filter-panel">
                <h2 className="title">Opciones de Filtro y Búsqueda</h2>
                
                <div className="grid-container grid-cols-2">
                    
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
                            {options.tecnicoCampo.map(tecnico => (
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
                        <label htmlFor="sentDate">Fecha inicio:</label>
                        <input
                            type="date"
                            id="sentDate"
                            name="sentDate"
                            className="form-input"
                        />
                        <label htmlFor="sentDate">Fecha fin:</label>
                        <input
                            type="date"
                            id="sentDate"
                            name="sentDate"
                            className="form-input" 
                        />

                    </div>
                </div>                
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
                </div>

                <div className="pagination-controls">
                    {/* 2. CONECTAR EL BOTÓN A LA FUNCIÓN DE BÚSQUEDA */}
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