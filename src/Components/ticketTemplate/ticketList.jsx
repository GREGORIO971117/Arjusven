import React, { useState, useEffect } from 'react';

function ticketList({tickets,onSelectTicket}){
        const handleTicketClick = (tickets) => {
            onSelectTicket(tickets);
        };

        return (
    <div className="ticket-list">
      <div className="filter-button-container">
                <input
                    type="text"
                    placeholder="Buscar Inventario..."
                    className='search-input'/>
                    
                <button className="filter-toggle-button">
                    Filtro
                </button>
            </div>
      {tickets.length === 0 ? (
        <p>No hay inventario para mostrar.</p>
      ) : (
        <ul>
          {tickets.map(ticket => (
            <li
              key={ticket.ticketNumber}
              className="ticket-item"
              onClick={() => handleTicketClick(ticket)}
            >
              <div className="ticket-info">
                <strong>{ticket.ticketNumber}</strong> — {ticket.title}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ticketList;

