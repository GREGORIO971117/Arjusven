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
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isEditing, setIsEditing] = useState(false); 
    
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

    const handleUpdate = async (dataToUpdate) => {
    
    // El estado de envío (isSubmitting) debe estar en el padre
    setIsSubmitting(true);
    setError(""); // Usamos el setError del padre

    // 1. Obtener el ID
    const idInventario = dataToUpdate.idInventario;

    // 2. Definir la fecha de actualización
    const now = new Date();
    const updateDateString = now.toISOString().slice(0,10);
    
    // 3. Crear el objeto final para enviar, incluyendo la actualización
    const finalDataToSend = {
        ...dataToUpdate,
        ultimaActualizacion: updateDateString || null,
    };
    
    try {
        const response = await apiRequest(`${API_URL}/${idInventario}`, {
            method: 'PATCH', 
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(finalDataToSend),
        });
        
        if (!response.ok) {
            let errorMsg = `Error al actualizar el inventario. Estado: ${response.status}`;
            try {
                const errorData = await response.json();
                errorMsg = errorData.message || errorData.error || errorMsg;
            } catch {}
            throw new Error(errorMsg);
        }

        await handleSave(); 
        
        return { success: true }; 
        
    } catch (err) {
        setError(err.message || "Fallo la conexión con el servidor al intentar actualizar.");
        return { success: false, error: err.message }; // Retornar el error
    } finally {
        setIsSubmitting(false);
    }
};

  async function handleRemove() {
        const idInventario = selectedInventario.idInventario;

        if (!idInventario) {
            setError("Error: ID de Inventario no encontrado para borrar.");
            return;
        }

        if (!window.confirm(`¿Estás seguro de que quieres BORRAR permanentemente el inventario con Título: "${selectedInventario.titulo}"? Esta acción es irreversible.`)) {
            return;
        }

        setIsSubmitting(true);
        setError("");

        try {
            const response = await apiRequest(`${API_URL}/${idInventario}`, {
                method: 'DELETE',
            });
            
            if (!response.ok) {
                let errorMsg = `Error al borrar el inventario. Estado: ${response.status}`;
                try {
                    const errorData = await response.json();
                    errorMsg = errorData.message || errorData.error || errorMsg;
                } catch {}
                throw new Error(errorMsg);
            }

            await handleSave(); 
            
        } catch (err) {
            setError(err.message || "Fallo la conexión con el servidor al intentar borrar.");
        } finally {
            setIsSubmitting(false);
        }
    }

     const handleSave = async () => {
    try {
        await loadInventario(); 
        setSelectedInventario(null); // Opcional: Deseleccionar tras guardar
        setIsEditing(false);
    } catch (err) {
        console.error("Fallo la recarga de inventario después de guardar.", err);
    }
};


      const handleCancel = () => {
        setIsEditing(false);
    };


    const handleEnterEditMode = () => {
        setIsEditing(true);
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
                    />
                )}

                <div className="ticket-template-column">
                    {selectedInventario ? (
                        <InventarioTemplate
                            handleEnterEditMode={handleEnterEditMode}
                            setIsEditing={setIsEditing}
                            isEditing={isEditing}
                            data={selectedInventario}
                            loadInventario={loadInventario}
                            handleSave={handleSave}
                            handleCancel={handleCancel}
                            handleRemove={handleRemove}
                            handleUpdate={handleUpdate}
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