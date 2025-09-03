import React, { useState, useEffect } from 'react';
import RenderFiltro from './RenderFiltro';
import './TicketList.css';

const TicketList = ({tickets, onSelectTicket, onUpdateTickets}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 15;

    const [showFilterPanel, setShowFilterPanel] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState('Todos');
    const [selectedTicketId, setSelectedTicketId] = useState(null);
    const [sortedTickets, setSortedTickets] = useState([]);
    const [filteredTickets, setFilteredTickets] = useState([]);
    const [repeatedTickets, setRepeatedTickets] = useState([]);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentTickets = filteredTickets.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredTickets.length / itemsPerPage);

    useEffect(() => {
        const ticketsCopy = [...tickets];
        
        const sorted = ticketsCopy.sort((a, b) => {
            const dateA = a['Fecha de Asignación'] ? new Date(a['Fecha de Asignación'].split('/').reverse().join('-')) : new Date(0);
            const dateB = b['Fecha de Asignación'] ? new Date(b['Fecha de Asignación'].split('/').reverse().join('-')) : new Date(0);
            return dateB - dateA;
        });

        setSortedTickets(sorted);

        const counts = {};
        tickets.forEach(ticket => {
            counts[ticket.Incidencia] = (counts[ticket.Incidencia] || 0) + 1;
        });
        const duplicates = tickets.filter(ticket => counts[ticket.Incidencia] > 1);
        setRepeatedTickets(duplicates);

        setCurrentPage(1);

    }, [tickets]);

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
        setSelectedTicketId(ticket.Incidencia);
        onSelectTicket(ticket);
    };

    const handleDeleteRepeated = () => {
        const uniqueIncidencias = new Set();
        const ticketsToDelete = new Set();
        
        sortedTickets.forEach(ticket => {
            if (uniqueIncidencias.has(ticket.Incidencia)) {
                ticketsToDelete.add(ticket.Incidencia);
            } else {
                uniqueIncidencias.add(ticket.Incidencia);
            }
        });

        const updatedTickets = sortedTickets.filter(ticket => !ticketsToDelete.has(ticket.Incidencia));
        onUpdateTickets(updatedTickets);
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
                                className={`ticket-item ${ticket.Incidencia === selectedTicketId ? 'selected' : ''}`}
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