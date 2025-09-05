import React from 'react';
import './InventarioList.css';

const InventarioList = ({ Inventario, onSelectTicket }) => {
  const handleTicketClick = (ticket) => {
    onSelectTicket(ticket);
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
      {Inventario.length === 0 ? (
        <p>No hay inventario para mostrar.</p>
      ) : (
        <ul>
          {Inventario.map(ticket => (
            <li
              key={ticket.numeroIncidencia}
              className="ticket-item"
              onClick={() => handleTicketClick(ticket)}
            >
              <div className="ticket-info">
                <strong>{ticket.numeroIncidencia}</strong> — {ticket.titulo}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default InventarioList;
