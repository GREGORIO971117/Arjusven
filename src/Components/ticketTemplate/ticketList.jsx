import React, { useState } from 'react';

// El nombre del componente debe ser TicketList (PascalCase), no ticketList
function TicketList({ tickets, onSelectTicket, setShowFilterPanel }) {

    const [currentPage, setCurrentPage] = useState(0);

    const itemsPerPage = 15;
    const totalPages = Math.ceil(tickets.length / itemsPerPage);
    const currentItems = tickets.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
    );


    const handleTicketClick = (ticket) => {
        onSelectTicket(ticket);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages - 1) setCurrentPage(prev => prev + 1);
    };

    const handlePrevPage = () => {
        if (currentPage > 0) setCurrentPage(prev => prev - 1);
    };

    // Función para obtener el valor de un campo anidado de forma segura
    const getServiceValue = (ticket, key) => {
        // Aseguramos que 'servicios' exista antes de intentar acceder a sus propiedades
        return ticket.servicios ? ticket.servicios[key] || 'N/A' : 'N/A';
    };

    return ( 	
        <div className="ticket-list">
            <div className="filter-button-container">
                <input
                    type="text"
                    placeholder="Buscar tickets..."
                    className='search-input' />
                
                <button 
                    className="filter-toggle-button"
                    onClick={() => setShowFilterPanel(true)}
                >
                    Filtro
                </button>
            </div>
            {tickets.length === 0 ? (
                <p>No hay tickets para mostrar.</p>
            ) : (
                <>
                    <ul>
                        {currentItems.map(ticket => (
                            <li
                                key={ticket.idTickets}
                                className="ticket-item"
                                onClick={() => handleTicketClick(ticket)}
                            >
                                <div className="ticket-info">

                                    <span className="incidence-number">
                                        {getServiceValue(ticket, 'incidencia')}
                                    </span>
                                    
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

export default TicketList; // Asegúrate de exportar con el nombre correcto