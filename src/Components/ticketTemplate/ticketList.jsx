import React, { useState, useEffect } from 'react';
import './TicketList.css'; 

const TicketList = ({tickets, onSelectTicket, onUpdateTickets}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 15;

    const [filterStatus, setFilterStatus] = useState('Todos');
    const [selectedTicketId, setSelectedTicketId] = useState(null);

    const [sortedTickets, setSortedTickets] = useState([]);
    const [repeatedTickets, setRepeatedTickets] = useState([]);

    useEffect(() => {
        const ticketsCopy = [...tickets];
        
        const sorted = ticketsCopy.sort((a, b) => {
            const dateA = a['Fecha de Asignación'] ? new Date(a['Fecha de Asignación'].split('/').reverse().join('-')) : new Date(0);
            const dateB = b['Fecha de Asignación'] ? new Date(b['Fecha de Asignación'].split('/').reverse().join('-')) : new Date(0);
            return dateB - dateA;
        });

        setSortedTickets(sorted);
        setCurrentPage(1);

        // Logic to identify and store repeated tickets
        const counts = {};
        tickets.forEach(ticket => {
            counts[ticket.Incidencia] = (counts[ticket.Incidencia] || 0) + 1;
        });
        const duplicates = tickets.filter(ticket => counts[ticket.Incidencia] > 1);
        setRepeatedTickets(duplicates);
    }, [tickets]);

    const filteredTickets = sortedTickets.filter(ticket => {
        if (filterStatus === 'Todos') {
            return true;
        }
        if (filterStatus === 'Repetidos') {
            const counts = {};
            sortedTickets.forEach(t => {
                counts[t.Incidencia] = (counts[t.Incidencia] || 0) + 1;
            });
            return counts[ticket.Incidencia] > 1;
        }
        return ticket.currentStatus === filterStatus;
    });

   const handleDeleteRepeated = () => {
        const uniqueTickets = [];
        const seenIncidencias = new Set();
    
        sortedTickets.forEach(ticket => {
            if (!seenIncidencias.has(ticket.Incidencia)) {
                uniqueTickets.push(ticket);
                seenIncidencias.add(ticket.Incidencia);
            }
        });
        
        // Se llama al prop para actualizar el estado en el padre
        onUpdateTickets(uniqueTickets);
        localStorage.setItem('excelData', JSON.stringify(uniqueTickets)); // Se guarda en localStorage
        setFilterStatus('Todos'); // Opcionalmente, se restablece el filtro
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentTickets = filteredTickets.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredTickets.length / itemsPerPage);

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

    return (
        <div className="ticket-list">
            
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