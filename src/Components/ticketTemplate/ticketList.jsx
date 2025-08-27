import React from 'react';
import './TicketList.css'; 

const TicketList = ({ tickets, onSelectTicket }) => {
    return (
        <div className="ticket-list">
            <h2>Tickets Subidos</h2>
            {tickets.length === 0 ? (
                <p>No hay tickets para mostrar.</p>
            ) : (
                <ul>
                    {tickets.map((ticket, index) => (
                        <li key={index} className="ticket-item" onClick={() => onSelectTicket(ticket)}>
                            <div className="ticket-info">
                                <strong>No de Caso: {ticket.Incidencia}</strong>
                            </div>
                            <div className="ticket-info">
                                <strong>Nombre de ESS: {ticket["Nombre Afiliado"]}</strong>   
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default TicketList;