import React, { useState, useEffect } from 'react';
import InventoryTemplate from './InventoryTemplate';
import DataInventario from '../../assets/inventoryData.json';
import InventoryList from './InventoryList';
import './InventoryPage.css';

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

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = (updatedData) => {
        console.log("Saving data...", updatedData);
        setSelectedInventario(updatedData);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setIsEditing(false);
    };

    const handleGoBack = () => {
        setSelectedInventario(null);
        setIsEditing(false); 
    };
    return (
        <div className='ticket-page-container'>
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
                        <InventoryTemplate
                            data={selectedInventario}
                            isEditing={isEditing}
                            onEdit={handleEdit}
                            onSave={handleSave}
                            onCancel={handleCancel}
                            onGoBack={handleGoBack}
                        />
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