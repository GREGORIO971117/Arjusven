import React, { useState, useMemo, useEffect } from 'react';
import './InventarioList.css';

const InventarioList = ({ Inventario, onSelectTicket }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 15;

  // 🔍 Eliminar duplicados por número de incidencia + título
  const uniqueInventario = useMemo(() => {
    const seen = new Set();
    return Inventario.filter(item => {
      const key = item.numeroIncidencia + item.titulo;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }, [Inventario]);

  // 🔎 Filtrar por búsqueda
  const filteredInventario = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return uniqueInventario.filter(ticket =>
      ticket.titulo?.toLowerCase().includes(term) ||
      ticket.numeroIncidencia?.toLowerCase().includes(term)
    );
  }, [uniqueInventario, searchTerm]);

  // 🔄 Resetear página al cambiar búsqueda
  useEffect(() => {
    setCurrentPage(0);
  }, [searchTerm]);

  const totalPages = Math.ceil(filteredInventario.length / itemsPerPage);

  const currentItems = filteredInventario.slice(
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
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="filter-toggle-button">Filtro</button>
      </div>

      {filteredInventario.length === 0 ? (
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

export default InventarioList;
