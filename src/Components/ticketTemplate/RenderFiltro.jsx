import React, { useState, useEffect } from 'react';
import './TicketList.css';

const RenderFiltro = ({sortedTickets}) => {

    useEffect(() => {
            let filtered = [...sortedTickets];
    
            // Apply search filter
            if (searchQuery) {
                filtered = filtered.filter(ticket => 
                    ticket.Incidencia.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    ticket["Nombre Afiliado"].toLowerCase().includes(searchQuery.toLowerCase())
                );
            }
    
            // Apply status filter
            if (filterStatus === 'Repetidos') {
                const counts = {};
                filtered.forEach(t => {
                    counts[t.Incidencia] = (counts[t.Incidencia] || 0) + 1;
                });
                filtered = filtered.filter(t => counts[t.Incidencia] > 1);
            } else if (filterStatus !== 'Todos') {
                filtered = filtered.filter(ticket => ticket["Situación Actual"] === filterStatus);
            }
    
            setFilteredTickets(filtered);
        }, [sortedTickets, filterStatus, searchQuery]);
    
    

        return(

            <>
                <div className="filter-buttons">
                <button 
                    className={filterStatus === 'Todos' ? 'active' : ''}
                    onClick={() => setFilterStatus('Todos')}>
                    Filtros
                </button>
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
                <div className="search-container">
                <input
                    type="text"
                    placeholder="Buscar ticket..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input"
                />
                </div>
            </div>
            
            </>
        )
};

export default RenderFiltro;
