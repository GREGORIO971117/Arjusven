import React, { useState, useEffect } from 'react';
import InventoryTemplate from './InventoryTemplate';
import DataInventario from '../../assets/inventoryData.json';
import InventoryList from './InventoryList';
import './InventoryPage.css';
import RenderEditarDatosInventario from './RenderEditDataInventory'; // Asegúrate de que este componente exista

function InventarioPage() {
    const [inventarioData, setInventarioData] = useState([]);
    const [selectedInventario, setSelectedInventario] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

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

    const handleSave = (updatedData) => {
        console.log("Guardando datos:", updatedData);
        setInventarioData(prevData =>
            prevData.map(item =>
                item["No. Serie"] === updatedData["No. Serie"] ? updatedData : item
            )
        );
        setSelectedInventario(updatedData);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setIsEditing(false);
    };

    return (
        <div className='ticket-page-container'>
            <h1>Gestión de Inventario</h1>
            <div className='ticket-content-flex'>
                <div className="ticket-list-column">
                    <InventoryList
                        inventario={inventarioData}
                        onSelectInventario={item => {
                            setSelectedInventario(item);
                            setIsEditing(false); 
                        }}
                    />
                </div>
                <div className="ticket-template-column">
                    {selectedInventario ? (
                        isEditing ? (
                            <RenderEditarDatosInventario
                                editableData={selectedInventario}
                                handleSave={handleSave}
                                handleCancel={handleCancel}
                            />
                        ) : (
                            <InventoryTemplate
                                data={selectedInventario}
                                edit={() => setIsEditing(true)}
                                onGoBack={() => setSelectedInventario(null)}
                            />
                        )
                    ) : (
                        <div className="no-selection-message">
                            Selecciona un elemento para ver sus detalles.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default InventarioPage;