import React, { useState, useEffect } from 'react';
import InventarioList from './InventarioList';
import InventarioTemplate from './InventarioTemplate';
import RenderFiltro from './RenderFiltro';
import './InventarioList.css';
import { apiRequest } from '../login/Api';

 const API_URL = '/inventario';

function InventarioPage() {
    const [inventarioData, setInventarioData] = useState([]);
    const [selectedInventario, setSelectedInventario] = useState(null);
    const [showFilterPanel, setShowFilterPanel] = useState(false);
    const [isLoading, setIsLoading] = useState(false); // Nuevo estado de carga

    const loadInventario = async () => {
        setIsLoading(true);
        try {
            const response = await apiRequest(API_URL, {method: "GET"});
            if (!response.ok) {
                throw new Error('Error al cargar los datos del inventario');
            }
            const data = await response.json();
            setInventarioData(data);
        } catch (error) {
            console.error('Error al cargar los datos:', error);
            alert(`Error de carga: ${error.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadInventario();
    }, []);

    return (
        <div className="ticket-page-container">
            <div className="ticket-content-flex">
                <div className="ticket-list-column">
                    <InventarioList
                        Inventario={inventarioData}
                        onSelectTicket={setSelectedInventario}
                        setShowFilterPanel={setShowFilterPanel}
                        isLoading={isLoading}
                    />
                </div>

                {showFilterPanel && (
                    <RenderFiltro
                        setShowFilterPanel={setShowFilterPanel}
                        data={selectedInventario}
                    />
                )}

                <div className="ticket-template-column">
                    {selectedInventario ? (
                        <InventarioTemplate
                            data={selectedInventario}
                            loadInventario={loadInventario}
                        />
                    ) : (
                        <div className="no-selection-message">
                            Selecciona Inventario para ver sus detalles.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default InventarioPage;