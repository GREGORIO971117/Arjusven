import React from 'react';
import '../Inventario/InventarioList.css'

export default function EstacionesList ({
     items,
     onSelectEstacion, 
     setShowFilterPanel, 
     handleSearchSubmit,
     isLoading, 
     searchQuery, 
     setSearchQuery, 
     currentPage,
     totalPages,      
     onPageChange     
     }) {
    const currentItems = items; 

    const handleKeyDown = (event) => {
        if (event.key === 'Enter' || event.keyCode === 13) {
            event.preventDefault(); 
            handleSearchSubmit();
        }
    };

    const handleEstacionClick = (item) => {
        onSelectEstacion(item);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages - 1) {
            onPageChange(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 0) {
            onPageChange(currentPage - 1);
        }
    };

    const selectEncabezado = (items = []) => {
        const first = items[0];
        if (!first) return "";

        if (first.idMerchant != null) return "Id merchant | Nombre comercial";
        if (first.idInventario != null) return "Número de serie | Equipo";
        if (first.idTickets != null) return "Incidencia | Nombre de Ess";

        return "";
    };

    return (
        <div className="ticket-list">
            <div className="filter-button-container">
                <input
                    type="text"
                    placeholder="Buscar..."
                    className="search-input"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <button 
                    className="filter-toggle-button"
                    onClick={() => setShowFilterPanel(true)}
                >Filtro</button>
            </div>

            {isLoading ? (
                <p>Cargando datos...</p>
            ) : items.length === 0 ? (
                <p>No hay datos disponibles o no coinciden con la búsqueda.</p>
            ) : (
                <>
                    <div className="list-header-row">
                        <span className="header-column-title">
                            {selectEncabezado(items)}
                        </span>
                    </div>
                    
                    <ul>
                        {currentItems.map(item => (
                            <li
                                key={item.idMerchant || item.idInventario || item.idTickets}
                                className={`ticket-item`}
                                onClick={() => handleEstacionClick(item)}
                            >
                                <div className="ticket-info">
                                    <strong> {item.idMerchant || item.numeroDeSerie || item.servicios?.incidencia}</strong> 
                                    {item.nombreComercial || item.equipo || item.servicios?.nombreDeEss || " "}
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
                            Página {totalPages === 0 ? 0 : currentPage + 1} de {totalPages}
                        </span>
                        
                        <button
                            onClick={handleNextPage}
                            disabled={currentPage >= totalPages - 1} 
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