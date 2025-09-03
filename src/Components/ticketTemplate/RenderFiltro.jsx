import React from 'react';
import './TicketList.css';


const RenderFiltro = ({ repeatedTickets, handleDeleteRepeated, filterStatus, setFilterStatus, setShowFilterPanel }) => {
    
    
    return (
        <div className="filter-panel-overlay">
            <div className="filter-panel">
                <h2>Opciones de Filtro</h2>
                
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
                <button className="close-filter-button" onClick={() => setShowFilterPanel(false)}>Cerrar</button>
            </div>
        </div>
    );
};

export default RenderFiltro;