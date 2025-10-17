import React, { useState, useEffect } from 'react';
import InventarioList from './InventarioList';
import InventarioTemplate from './InventarioTemplate';
import RenderFiltro from './RenderFiltro';
import './InventarioList.css';

function InventarioPage() {
    const [inventarioData, setInventarioData] = useState([]);
    const [selectedInventario, setSelectedInventario] = useState(null);
    const [showFilterPanel, setShowFilterPanel] = useState(false);
    const [isLoading, setIsLoading] = useState(false); // Nuevo estado de carga

    const API_URL = 'http://localhost:8080/api/inventario';

    // Función principal para cargar (GET) el inventario
    const loadInventario = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(API_URL);
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

    // 💡 NUEVA FUNCIÓN: Maneja la actualización (PATCH) del artículo en la lista local
    const handlePatch = (updatedItem) => {
        // 1. Actualiza el artículo seleccionado para reflejar los cambios inmediatamente
        setSelectedInventario(updatedItem);

        // 2. Actualiza la lista principal para que InventarioList se refresque
        setInventarioData(prevData =>
            prevData.map(item =>
                item.idInventario === updatedItem.idInventario ? updatedItem : item
            )
        );
    };

    // 💡 NUEVA FUNCIÓN: Maneja la eliminación (DELETE) del artículo
    const handleDelete = async (idInventario) => {
        if (!window.confirm("¿Estás seguro de que quieres eliminar este artículo?")) return;
        
        try {
            const response = await fetch(`${API_URL}/${idInventario}`, {
                method: 'DELETE',
            });
            
            if (!response.ok) {
                throw new Error('Fallo al eliminar el artículo.');
            }

            // 1. Quitar el artículo de la lista local
            setInventarioData(prevData => 
                prevData.filter(item => item.idInventario !== idInventario)
            );
            
            // 2. Quitar la selección del artículo
            setSelectedInventario(null);

        } catch (error) {
            console.error('Error al eliminar:', error);
            alert(`Error al eliminar: ${error.message}`);
        }
    };

    // Función para deseleccionar el inventario (al cancelar o eliminar)
    const handleGoBack = () => {
        setSelectedInventario(null);
    };

    return (
        <div className="ticket-page-container">
            <div className="ticket-content-flex">
                <div className="ticket-list-column">
                    <InventarioList
                        Inventario={inventarioData}
                        onSelectTicket={setSelectedInventario}
                        setShowFilterPanel={setShowFilterPanel}
                        isLoading={isLoading} // Pasar el estado de carga
                    />
                </div>

                {showFilterPanel && (
                    <RenderFiltro
                        setShowFilterPanel={setShowFilterPanel}
                    />
                )}

                <div className="ticket-template-column">
                    {selectedInventario ? (
                        // Pasamos las funciones de PATCH y DELETE al template
                        <InventarioTemplate
                            data={selectedInventario}
                            onGoBack={handleGoBack}
                            onPatch={handlePatch}      // Función para actualizar
                            onDelete={handleDelete}    // Función para eliminar
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