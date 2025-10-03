import React, { useState, useMemo, useEffect } from 'react';
import './InventarioList.css';

const InventarioList = ({ Inventario, onSelectTicket,setShowFilterPanel}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 15;

  const totalPages = Math.ceil(Inventario.length / itemsPerPage);

  const currentItems = Inventario.slice(
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
          onClick={()=>setShowFilterPanel(true)}
        >Filtro</button>
      </div>

      {Inventario.length === 0 ? (
        <p>No hay inventario para mostrar.</p>
      ) : (
        <>
          <ul>
            {currentItems.map(ticket => (
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

          <div className="pagination-controls">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 0}
              className="pagination-button"
            >
              ← Anterior
            </button>
            <span className="page-indicator">
              Página {currentPage + 1}:{totalPages}
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

export default InventarioList;
