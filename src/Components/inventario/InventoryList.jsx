import React, { useState, useEffect } from 'react';
import DataInventario from '../../assets/inventoryData.json';
import RenderFiltro from './RenderFiltro';

const InventoryList = ({ onSelectInventario }) => {
    
    const [inventarioData, setInventarioData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 15;
    const [filterStatus, setFilterStatus] = useState('Todos');
    const [selectedInventarioId, setSelectedInventarioId] = useState(null);
    const [sortedInventario, setSortedInventario] = useState([]);
    
    // State to control the filter modal's visibility
    const [showFilterPanel, setShowFilterPanel] = useState(false); 
    // State for search query
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        loadInventario();
    }, []);

    const loadInventario = () => {
        try {
            const formattedData = DataInventario.map(item => ({
                ...item,
                "No. Serie": item.numeroSerie,
                "Estado": item.estado
            }));
            setInventarioData(formattedData);
        } catch (error) {
            console.error('Error al cargar los datos del inventario:', error);
        }
    };

    useEffect(() => {
        const inventarioCopy = [...inventarioData];
        const sorted = inventarioCopy.sort((a, b) => {
            if (a["No. Serie"] < b["No. Serie"]) return -1;
            if (a["No. Serie"] > b["No. Serie"]) return 1;
            return 0;
        });

        setSortedInventario(sorted);
        setCurrentPage(1);
    }, [inventarioData]);

    // Added search query to the filtering logic
    const filteredInventario = sortedInventario.filter(item => {
        const matchesStatus = filterStatus === 'Todos' || item.Estado === filterStatus;
        const matchesSearch = item["No. Serie"].toLowerCase().includes(searchQuery.toLowerCase()) ||
                              item.modelo.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesStatus && matchesSearch;
    });

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentInventario = filteredInventario.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredInventario.length / itemsPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleInventarioClick = (item) => {
        setSelectedInventarioId(item["No. Serie"]); 
        onSelectInventario(item); 
    };

    const handleApplyFilters = ({ status }) => {
        setFilterStatus(status);
        setShowFilterPanel(false);
    };

    return (
        <div className="ticket-list">
            
            <div className="filter-button-container">
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Buscar inventario..." // Changed placeholder
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="search-input"
                    />
                </div>
                <button
                    className="filter-toggle-button"
                    onClick={() => setShowFilterPanel(true)}>
                    Filtro
                </button>
            </div>

            {/* Conditionally render the modal */}
            {showFilterPanel && (
                <RenderFiltro 
                    filterStatus={filterStatus}
                    setFilterStatus={(status) => handleApplyFilters({ status })}
                    setShowFilterPanel={setShowFilterPanel}
                />
            )}

            {inventarioData.length === 0 ? (
                <p>No hay inventario para mostrar.</p>
            ) : (
                <>
                    <ul>
                        {currentInventario.map(item => (
                            <li
                                key={item["No. Serie"]}
                                className={`ticket-item ${item["No. Serie"] === selectedInventarioId ? 'selected' : ''}`}
                                onClick={() => handleInventarioClick(item)}
                            >
                                <div className="ticket-info">
                                    <strong>{item["No. Serie"]}</strong>
                                    <strong>{item.modelo}</strong>
                                    <span>{item.Estado}</span>
                                </div>
                            </li>
                        ))}
                    </ul>

                    {totalPages > 1 && (
                        <div className="pagination-controls">
                            <button onClick={handlePreviousPage} disabled={currentPage === 1}>
                                Anterior
                            </button>
                            <span>Página {currentPage} de {totalPages}</span>
                            <button onClick={handleNextPage} disabled={currentPage === totalPages}>
                                Siguiente
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default InventoryList;