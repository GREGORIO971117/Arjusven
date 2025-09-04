import React, { useState } from 'react';
import './TicketList.css';
import data from '../../assets/datos.json';

const RenderFiltro = ({ repeatedTickets, handleDeleteRepeated, filterStatus, setFilterStatus, setShowFilterPanel, onApplyFilters }) => {
    // Estados locales para los nuevos filtros
    const options=data[0];
    const [dateRange, setDateRange] = useState({ start: '', end: '' });
    const [estadoMexico, setEstadoMexico] = useState('');
    const [tecnico, setTecnico] = useState('');
    const [idMerchant, setIdMerchant] = useState('');

    const handleApplyFilters = () => {
        // Llama a la función del componente padre con los nuevos valores
        onApplyFilters({ dateRange, estadoMexico, tecnico, supervisor, idMerchant, filterStatus });
        setShowFilterPanel(false); // Cierra el panel de filtro
    };

    return (
        <div className="filter-panel-overlay">
            <div className="filter-panel">
                <h2>Opciones de Filtro</h2>

                {/* Sección de filtros por fecha, estado, etc. */}
                <div className="filter-group">
                    <label htmlFor="date-start">Fecha de Asignación (Inicio):</label>
                    <input 
                        type="date" 
                        id="date-start" 
                        value={dateRange.start} 
                        onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })} 
                    />
                    <label htmlFor="date-end">Fecha de Asignación (Fin):</label>
                    <input 
                        type="date" 
                        id="date-end" 
                        value={dateRange.end} 
                        onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })} 
                    />
                </div>

                <div className="filter-group">
                    <label htmlFor="estado-mexico">Estado de México:</label>
                    <select
                        type="text" 
                        id="estado-mexico" 
                        placeholder="Ej. Puebla" 
                        value={estadoMexico} 
                        onChange={(e) => setEstadoMexico(e.target.value)} 
                    >

                        <option value="">Selecciona una estado</option>
                        {options.estadosMex.map(estados=>(
                            <option key={estados} value={estados}>{estados}</option>
                        ))}
                    </select>

                </div>

                <div className="filter-group">
                    <label htmlFor="tecnico">Técnico:</label>
                    <select
                        type="text" 
                        id="tecnico" 
                        placeholder="Nombre del técnico" 
                        value={tecnico} 
                        onChange={(e) => setTecnico(e.target.value)} 
                    >
                        <option value="">Selecciona un técnico</option>
                        {options.tecnicos.map(tecnicos=>(
                            <option key={tecnicos} value={tecnicos}>{tecnicos}</option>
                        ))}
                    </select>
                </div>

                <div className="filter-group">
                    <label htmlFor="supervisor">Supervisor</label>
                        <select>
                            <option value="">Selecciona un supervisor</option>
                            {options.supervisores.map(supervisor=>(
                                <option key={supervisor} value={supervisor}>{supervisor}</option>
                            ))}

                        </select>
                    
                </div>
                
                <div className="filter-group">
                    <label htmlFor="id-merchant">ID Merchant:</label>
                    <input 
                        type="text" 
                        id="id-merchant" 
                        placeholder="ID del comerciante" 
                        value={idMerchant} 
                        onChange={(e) => setIdMerchant(e.target.value)} 
                    />
                </div>
                
                {/* Botones de estado (Todos, Abiertos, Cerrados) */}
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

                {/* Botones de acción */}
                <div className="action-buttons">
                    <button className="apply-filter-button" onClick={handleApplyFilters}>
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