import React, { useState } from 'react';
import '../Inventario/InventarioList.css';

const InventarioList = ({ data, onSelectTicket }) => {

  const handleTicketClick = (ticket) => {
    onSelectTicket(ticket);
  };

  return (
    <div className="ticket-list">
      <div className="filter-button-container">
        <input
          type="text"
          placeholder="Buscar Inventario..."
          className="search-input"
        />
        <button
          className="filter-toggle-button"
        >
          Filtro
        </button>
      </div>

      <ul>
        {data.map(ticket => (
          <li
            key={ticket.numeroIncidencia + ticket.titulo}
            className="ticket-item"
            onClick={() => handleTicketClick(ticket)}
          >
            <div className="ticket-info">
              <strong>{ticket.numeroIncidencia}</strong> — {ticket.titulo}
            </div>
          </li>
        ))}
      </ul>

      
    </div>
  );
};

export default InventarioList;
