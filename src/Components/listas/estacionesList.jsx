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
     setCurrentPage
     }) {

    const itemsPerPage = 20;
    const totalPages = Math.ceil(items.length / itemsPerPage);
    const currentItems = items.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
    );

    const handleKeyDown = (event) => {
        if (event.key === 'Enter' || event.keyCode === 13) {
            event.preventDefault(); 
            handleSearchSubmit();
            setCurrentPage(0);
        }
    };

    const handleEstacionClick = (items) => {
        onSelectEstacion(items);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages - 1) setCurrentPage(prev => prev + 1);
    };

    const handlePrevPage = () => {
        if (currentPage > 0) setCurrentPage(prev => prev - 1);
    };

    const selectEncabezado = (items = []) => {
    const first = items[0];
    if (!first) return "";

    if (first.idMerchant != null) {
        return "Id merchant | Nombre comercial";
    }
    if (first.idInventario != null) {
        return "Número de serie | Equipo";
    }
    if (first.idTickets != null) {
        return "Incidencia | Nombre de Ess";
    }

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
                        {currentItems.map(items => (
                            <li
                                key={items.idMerchant || items.idInventario || items.idTickets}
                                className={`ticket-item`}
                                onClick={() => handleEstacionClick(items)}
                            >
                                <div className="ticket-info">

                                    <strong> {items.idMerchant || items.numeroDeSerie || items.servicios.incidencia}</strong> 
                                    {items.nombreComercial || items.equipo || items.servicios.nombreDeEss || " "}

                                </div>
                            </li>
                        ))}
                    </ul>

                    <div className="pagination-controls">
                        <button
                            onClick={handlePrevPage}
                            disabled={currentPage === 0 || totalPages <= 1}
                            className="pagination-button"
                        >
                            ← Anterior
                        </button>
                        <span className="page-indicator">
                            Página {currentPage + 1}:{totalPages}
                        </span>
                        <button
                            onClick={handleNextPage}
                            disabled={currentPage === totalPages - 1 || totalPages <= 1}
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
