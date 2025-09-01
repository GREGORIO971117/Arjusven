// En InventarioPage.jsx
import React, { useState, useEffect } from 'react';
import InventoryTemplate from './InventoryTemplate';
import DataInventario from '../../assets/inventoryData.json';
import InventoryList from './InventoryList';
import './InventoryPage.css';
import RenderEditarDatosInventario from './RenderEditDataInventory'; // Asegúrate de que este componente exista

function InventarioPage() {
    const [inventarioData, setInventarioData] = useState([]);
    const [selectedInventario, setSelectedInventario] = useState(null);
    const [isEditing, setIsEditing] = useState(false); // Nuevo estado para controlar la edición

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
        // Lógica para guardar los datos actualizados
        // Aquí puedes guardar en localStorage o una API
        console.log("Guardando datos:", updatedData);
        // Actualiza el estado principal con los datos editados
        setInventarioData(prevData =>
            prevData.map(item =>
                item["No. Serie"] === updatedData["No. Serie"] ? updatedData : item
            )
        );
        setSelectedInventario(updatedData);
        setIsEditing(false); // Sale del modo de edición
    };

    const handleCancel = () => {
        // Simplemente sale del modo de edición sin guardar
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
                            setIsEditing(false); // Restablece el estado de edición al seleccionar un nuevo ítem
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
                                edit={() => setIsEditing(true)} // Activa el modo de edición
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