import React, { useState, useEffect } from 'react';
import RenderFiltro from './RenderFiltro';

const TicketList = ({ 
    tickets, 
    onSelectTicket, 
    filterStatus,
    setFilterStatus,
    showFilterPanel,
    setShowFilterPanel,
    handleDeleteRepeated,
    repeatedTickets,
    searchQuery,
    setSearchQuery,
    onApplyFilters
}) => {
    const itemsPerPage = 15;
    const [currentPage, setCurrentPage] = useState(1);

    // This component no longer needs to manage its own filtered/sorted state
    // It receives the already-filtered and sorted list from the parent.

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentTickets = tickets.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(tickets.length / itemsPerPage);

    useEffect(() => {
        // Reset to the first page when the ticket list changes (e.g., after filtering)
        setCurrentPage(1);
    }, [tickets]);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleTicketClick = (ticket) => {
        // The selectedTicketId state is now managed by the parent component, so we pass the data up.
        onSelectTicket(ticket);
    };

    return (
        <div className="ticket-list">
            <div className="filter-button-container">
                <input
                    type="text"
                    placeholder="Buscar ticket..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input"
                />
                <button 
                    className="filter-toggle-button"
                    onClick={() => setShowFilterPanel(true)}>
                    Filtro
                </button>
            </div>

            {showFilterPanel && (
                <RenderFiltro
                    handleDeleteRepeated={handleDeleteRepeated}
                    repeatedTickets={repeatedTickets}
                    filterStatus={filterStatus}
                    setFilterStatus={setFilterStatus}
                    setShowFilterPanel={setShowFilterPanel}
                    onApplyFilters={onApplyFilters} // This new prop tells the parent to apply filters
                />
            )}
            
            {tickets.length === 0 ? (
                <p>No hay tickets para mostrar.</p>
            ) : (
                <>
                    <ul>
                        {currentTickets.map(ticket => (
                            <li
                                key={ticket.Incidencia}
                                className={`ticket-item ${ticket.Incidencia === (onSelectTicket.selectedTicket ? onSelectTicket.selectedTicket.Incidencia : null) ? 'selected' : ''}`}
                                onClick={() => handleTicketClick(ticket)}
                            >
                                <div className="ticket-info">
                                    <strong>{ticket.Incidencia}</strong>
                                    {ticket["Nombre Afiliado"]}
                                </div>
                            </li>
                        ))}
                    </ul>

                    {totalPages > 1 && (
                        <div className="pagination-controls">
                            <button onClick={handlePreviousPage} disabled={currentPage === 1}>
                                Anterior
                            </button>
                            <span>Página {currentPage} de {totalPages}</span>
                            <button onClick={handleNextPage} disabled={currentPage === totalPages}>
                                Siguiente
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default TicketList;