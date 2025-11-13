import React, { useState, useEffect } from 'react';

import EstacionesList from './EstacionesList'; 
import EstacionesTemplate from './EstacionesTemplate';
import RenderFiltroEstaciones from './RenderFiltroEstaciones'; 
import '../Inventario/InventarioList.css';
import { apiRequest } from '../login/Api';

const API_URL = '/estaciones'; 

export default function EstacionesPage() {

    // --- 1. ESTADO ---
    const [estacionesData, setEstacionesData] = useState([]);
    const [selectedEstacion, setSelectedEstacion] = useState(null);
    const [showFilterPanel, setShowFilterPanel] = useState(false);
    const [isLoading, setIsLoading] = useState(false); 
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isEditing, setIsEditing] = useState(false); 
    
    // --- 2. LÓGICA DE LECTURA (R) ---
    const loadEstaciones = async () => {
        setIsLoading(true);
        setError("");
        try {
            const response = await apiRequest(API_URL, {method: "GET"});
            if (!response.ok) {
                throw new Error('Error al cargar los datos de las estaciones');
            }
            const data = await response.json();
            setEstacionesData(data);
        } catch (error) {
            console.error('Error al cargar los datos:', error);
            setError(`Error de carga: ${error.message}`);
        } finally {
            setIsLoading(false);
        }
    };
    
    // Cargar datos al iniciar
    useEffect(() => {
        loadEstaciones();
    }, []);

    const handleSave = async () => {
        try {
            await loadEstaciones(); 
            setSelectedEstacion(null); 
            setIsEditing(false);
        } catch (err) {
            console.error("Fallo la recarga de estaciones después de guardar.", err);
        }
    };

    // --- 3. LÓGICA DE ACTUALIZACIÓN (U) ---
    const handleUpdate = async (dataToUpdate) => {
    
        setIsSubmitting(true);
        setError(""); 

        const idMerchant = dataToUpdate.idMerchant; 
                
        try {
            const response = await apiRequest(`${API_URL}/${idMerchant}`, {
                method: 'PATCH', 
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dataToUpdate), 
            });
            
            if (!response.ok) {
                let errorMsg = `Error al actualizar la estación. Estado: ${response.status}`;
                try {
                    const errorData = await response.json();
                    errorMsg = errorData.message || errorData.error || errorMsg;
                } catch {}
                throw new Error(errorMsg);
            }

            await handleSave(); // Recargar datos y resetear selección
            
            return { success: true }; 
            
        } catch (err) {
            setError(err.message || "Fallo la conexión con el servidor al intentar actualizar.");
            return { success: false, error: err.message };
        } finally {
            setIsSubmitting(false);
        }
    };

        // --- 4. LÓGICA DE BORRADO (D) ---
async function handleRemove() {
    const idMerchant = selectedEstacion.idMerchant;

     if (!window.confirm(`¿Estás seguro de que quieres BORRAR permanentemente la estación con ID: "${idMerchant}"? Esta acción es irreversible.`)) {
            return;
        }
    setIsSubmitting(true);
    setError("");

    try {
        const response = await apiRequest(`${API_URL}/${idMerchant}`, {
            method: 'DELETE',
        });
        
        // Asumiendo que el borrado fue exitoso (status 200 o 204)
        if (response.ok || response.status === 200 || response.status === 204) {
            
            // 1. ACTUALIZACIÓN INMEDIATA DEL ESTADO (¡SOLUCIÓN!)
            setEstacionesData(prevData => 
                prevData.filter(estacion => estacion.idMerchant !== idMerchant)
            );
            
            // 2. Limpiar la selección actual para que el panel de detalles se cierre
            setSelectedEstacion(null);
            setMessage("Estación eliminada correctamente.");

        } else {
             // ... (manejo de errores de API) ...
             let errorMsg = `Error al borrar la estación. Estado: ${response.status}`;
             try {
                const errorData = await response.json();
                errorMsg = errorData.message || errorData.error || errorMsg;
             } catch {}
             throw new Error(errorMsg);
        }

    } catch (err) {
        setError(err.message || "Fallo la conexión con el servidor al intentar borrar.");
    } finally {
        setIsSubmitting(false);
    }
}



    // --- 5. LÓGICA DE VISTA ---
    const handleCancel = () => {
        setIsEditing(false);
    };

    const handleEnterEditMode = () => {
        setIsEditing(true);
    };
    
    // --- 6. RENDERIZADO ---
    return (
        <div className="ticket-page-container"> 
            <div className="ticket-content-flex"> 
                
                {/* COLUMNA DE LA LISTA */}
                <div className="ticket-list-column"> 
                    <EstacionesList
                        estaciones={estacionesData} 
                        onSelectEstacion={setSelectedEstacion}
                        setShowFilterPanel={setShowFilterPanel}
                        isLoading={isLoading}
                        selectedEstacionId={selectedEstacion ? selectedEstacion.idMerchant : null}
                    />
                </div>

                {/* PANEL DE FILTRO (si está visible) */}
                {showFilterPanel && (
                    <RenderFiltroEstaciones
                        setShowFilterPanel={setShowFilterPanel}
                    />
                )}

                <div className="ticket-template-column"> 
                    {selectedEstacion ? (
                        <EstacionesTemplate
                            handleEnterEditMode={handleEnterEditMode}
                            setIsEditing={setIsEditing}
                            isEditing={isEditing}
                            data={selectedEstacion}
                            loadEstaciones={loadEstaciones}
                            handleSave={handleSave}
                            handleCancel={handleCancel}
                            handleRemove={handleRemove}
                            handleUpdate={handleUpdate}
                            isSubmitting={isSubmitting} 
                            error={error} 
                        />
                    ) : (
                        <div className="no-selection-message">
                            Selecciona una Estación para ver sus detalles.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}