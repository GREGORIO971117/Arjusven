import React, { useState } from 'react';
import '../Inventario/InventarioList.css'

export default function EstacionesList ({
     estaciones,
     onSelectEstacion, 
     setShowFilterPanel, 
     isLoading, 
     selectedEstacionId, 
     searchQuery, 
     setSearchQuery, 
     currentPage,
     setCurrentPage,
     handleKeyDown
     }) {

    const itemsPerPage = 20;

    // 2. Lógica de Paginación
    const totalPages = Math.ceil(estaciones.length / itemsPerPage);

    const currentItems = estaciones.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
    );


    const handleEstacionClick = (estacion) => {
        onSelectEstacion(estacion);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages - 1) setCurrentPage(prev => prev + 1);
    };

    const handlePrevPage = () => {
        if (currentPage > 0) setCurrentPage(prev => prev - 1);
    };

    return (
        <div className="ticket-list"> {/* Mantengo la clase CSS que usas */}
            <div className="filter-button-container">
                <input
                    type="text"
                    placeholder="Buscar estación..."
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
                <p>Cargando datos de estaciones...</p>
            ) : estaciones.length === 0 ? (
                <p>No hay estaciones disponibles o no coinciden con la búsqueda.</p>
            ) : (
                <>

                 <div className="list-header-row">
                    <span className="header-column-title">Id merchant | Nombre comercial</span>
                </div>
                    <ul>
                        {currentItems.map(estacion => (
                            <li
                                key={estacion.idMerchant}
                                className={`ticket-item ${estacion.idMerchant === selectedEstacionId ? 'selected-item' : ''}`}
                                onClick={() => handleEstacionClick(estacion)}
                            >
                                <div className="ticket-info">
                                    <strong> {estacion.idMerchant}</strong> 
                                    {estacion.nombreComercial}
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
