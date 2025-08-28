import React, { useState, useEffect } from 'react';
import './TicketList.css'; 

const TicketList = ({ tickets, onSelectTicket }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 15;

    // Se crea un nuevo estado para los tickets ordenados.
    const [sortedTickets, setSortedTickets] = useState([]);

    // Utilizamos useEffect para ordenar los tickets cada vez que el prop 'tickets' cambie.
    useEffect(() => {
        // Hacemos una copia de la matriz para no mutar el estado original.
        const ticketsCopy = [...tickets];
        
        // Ordenamos la copia por la fecha.
        // Asumimos que la fecha está en un formato que se puede comparar (ej. "DD/MM/YYYY").
        const sorted = ticketsCopy.sort((a, b) => {
            const dateA = a['Fecha de Asignación'] ? new Date(a['Fecha de Asignación'].split('/').reverse().join('-')) : new Date(0);
            const dateB = b['Fecha de Asignación'] ? new Date(b['Fecha de Asignación'].split('/').reverse().join('-')) : new Date(0);
            return dateB - dateA; // Orden descendente (más reciente primero)
        });
        
        setSortedTickets(sorted);
        // Regresamos a la primera página cada vez que la lista se reordena.
        setCurrentPage(1);
    }, [tickets]); // Este efecto se ejecuta cada vez que el array de tickets cambie.

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    
    // Ahora usamos el array ordenado para la paginación.
    const currentTickets = sortedTickets.slice(indexOfFirstItem, indexOfLastItem);
    
    const totalPages = Math.ceil(sortedTickets.length / itemsPerPage);

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

    return (
        <div className="ticket-list">
            <h2>Tickets Subidos</h2>
            {tickets.length === 0 ? (
                <p>No hay tickets para mostrar.</p>
            ) : (
                <>
                    <ul>
                        {currentTickets.map((ticket, index) => (
                            <li key={ticket.Incidencia} className="ticket-item" onClick={() => onSelectTicket(ticket)}>
                                <div className="ticket-info">
                                    <strong>No de Caso: {ticket.Incidencia}</strong>
                                    <strong>Nombre de ESS: {ticket["Nombre Afiliado"]}</strong>   
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