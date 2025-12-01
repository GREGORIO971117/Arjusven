import React, { useState } from 'react';

function TicketList({ tickets, onSelectTicket, setShowFilterPanel, searchQuery, setSearchQuery, onSearchSubmit }) {

    const [currentPage, setCurrentPage] = useState(0);

    const itemsPerPage = 20;
    const totalPages = Math.ceil(tickets.length / itemsPerPage);
    const currentItems = tickets.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
    );
  
    const handleKeyDown = (event) => {
        if (event.key === 'Enter' || event.keyCode === 13) {
            event.preventDefault(); 
            onSearchSubmit();
            setCurrentPage(0);
        }
    };

    const handleTicketClick = (ticket) => {
        onSelectTicket(ticket);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages - 1) setCurrentPage(prev => prev + 1);
    };

    const handlePrevPage = () => {
        if (currentPage > 0) setCurrentPage(prev => prev - 1);
    };

    const getServiceValue = (ticket, key) => {
        return ticket.servicios ? ticket.servicios[key] || 'N/A' : 'N/A';
    };


    return (  
        <div className="ticket-list">
            <div className="filter-button-container">
                <input
                    type="text"
                    placeholder="Buscar tickets..."
                    className='search-input'
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    />
                
                <button 
                    className="filter-toggle-button"
                    onClick={() => setShowFilterPanel(true)}
                >
                    Filtro
                </button>
            
            </div>
            {tickets.length === 0 ? (
                <p>No hay tickets disponibles o no coinciden con la búsqueda.</p>
            ) : (
                <>

                 <div className="list-header-row">
                    <span className="header-column-title">Incidencia | Estación</span>
                </div>
                    <ul>
                        {currentItems.map(ticket => (
                            <li
                                key={ticket.idTickets}
                                className="ticket-item"
                                onClick={() => handleTicketClick(ticket)}
                            >
                                <div className="ticket-info">

                                    <strong className="incidence-number">
                                        {getServiceValue(ticket, 'incidencia')}
                                    </strong>
                                    
                                    <span className="station-name">
                                        {getServiceValue(ticket, 'nombreDeEss')}
                                    </span>
                                    
                                </div>
                            </li>
                        ))}
                    </ul>

                    <div className="pagination-controls">
                        <button
                            onClick={handlePrevPage}
                            disabled={currentPage === 0}
                            className="pagination-button"
                        >
                            ← Anterior
                        </button>
                        <span className="page-indicator">
                            Página {currentPage + 1} de {totalPages}
                        </span>
                        <button
                            onClick={handleNextPage}
                            disabled={currentPage === totalPages - 1}
                            className="pagination-button"
                        >
                            Siguiente →
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default TicketList;