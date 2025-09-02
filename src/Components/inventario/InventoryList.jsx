import React, { useState, useEffect } from 'react';
import './InventarioList.css'; 
import DataInventario from '../../assets/inventoryData.json';

const InventoryList = ({ onSelectInventario }) => {
    const [inventarioData, setInventarioData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 15;

    const [filterStatus, setFilterStatus] = useState('Todos');
    const [selectedInventarioId, setSelectedInventarioId] = useState(null);
    const [sortedInventario, setSortedInventario] = useState([]);

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
        // Aquí se puede añadir una lógica de ordenamiento si es necesaria
        const sorted = inventarioCopy.sort((a, b) => {
            if (a["No. Serie"] < b["No. Serie"]) return -1;
            if (a["No. Serie"] > b["No. Serie"]) return 1;
            return 0;
        });

        setSortedInventario(sorted);
        setCurrentPage(1);
    }, [inventarioData]);

    const filteredInventario = sortedInventario.filter(item => {
        if (filterStatus === 'Todos') {
            return true;
        }
        return item.Estado === filterStatus;
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

    return (
        <div className="ticket-list">
            
            <div className="filter-buttons">
                <button 
                    className={filterStatus === 'Todos' ? 'active' : ''}
                    onClick={() => setFilterStatus('Todos')}>
                    Todos
                </button>
                <button 
                    className={filterStatus === 'Disponible' ? 'active' : ''}
                    onClick={() => setFilterStatus('Disponible')}>
                    Disponibles
                </button>
                <button 
                    className={filterStatus === 'Asignado' ? 'active' : ''}
                    onClick={() => setFilterStatus('Asignado')}>
                    Asignados
                </button>
            </div>

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