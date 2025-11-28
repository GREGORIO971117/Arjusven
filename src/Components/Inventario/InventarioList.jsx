import React, { useState } from 'react';
import './InventarioList.css';

const InventarioList = ({ Inventario, onSelectTicket,setShowFilterPanel, searchQuery, setSearchQuery, onSearchSubmit }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 15;

  const totalPages = Math.ceil(Inventario.length / itemsPerPage);

  const currentItems = Inventario.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );
  
    const handleKeyDown = (event) => {
        if (event.key === 'Enter' || event.keyCode === 13) {
            event.preventDefault(); 
            onSearchSubmit();
            setCurrentPage(0);
        }
    };

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
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button 
          className="filter-toggle-button"
          onClick={()=>setShowFilterPanel(true)}
        >Filtro</button>
      </div>

      {Inventario.length === 0 ? (
        <p className="no-results-message">No hay estaciones disponibles o no coinciden con la búsqueda.</p>
      ) : (
        <>
         
          <div className="list-header-row">
             <span className="header-column-title">Numero de serie | Equipo</span>
          </div>

          <ul>
            {currentItems.map(Inventario => (
              
              <li
                key={Inventario.idInventario}
                className="ticket-item"
                onClick={() => handleTicketClick(Inventario)}
              >
                <div className="ticket-info">
                  <strong>{Inventario.numeroDeSerie}</strong>
                  {Inventario.equipo}
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
