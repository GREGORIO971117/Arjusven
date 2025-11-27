import React, { useState, useEffect, useCallback } from 'react';

import EstacionesList from './EstacionesList'; 
import EstacionesTemplate from './EstacionesTemplate';
import RenderFiltroEstaciones from './RenderFiltro'; 
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
    const [searchQuery, setSearchQuery] = useState("");
    const [filterCriteria, setFilterCriteria] = useState({
                                                         supervisorArjus: "todos",
                                                         });


const fetchFilteredEstaciones = async () => {
        setIsLoading(true);
        setError("");
        
        try {
            const params = new URLSearchParams();
            
            if (filterCriteria.supervisorArjus) {
                params.append('supervisorArjus', filterCriteria.supervisorArjus);
            }

            const endpoint = `${API_URL}/filter?${params.toString()}`;
            
            const response = await apiRequest(endpoint, 
                { method: 'GET' });
            
            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }
            
            const data = await response.json();
            console.log("Estaciones filtradas:", data);
            setEstacionesData(Array.isArray(data) ? data : []);

        } catch (err) {
            console.error("Error filtrando estaciones:", err);
            setError(err.message || "Error al aplicar filtros.");
            setEstacionesData([]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleApplyFilters = () => {
        fetchFilteredEstaciones();
        setShowFilterPanel(false); 
    };
                                
    
    // --- 2. LÓGICA DE LECTURA (R) ---
     const loadEstaciones = useCallback(async () => {
            setIsLoading(true);
            try {
                const response = await apiRequest(API_URL, {method: "GET"});
                if (!response.ok) {
                    throw new Error('Error al cargar los datos de las estaciones');
                }
                const data = await response.json();
                setEstacionesData(data);
            } catch (error) {
                console.error('Error al cargar los datos:', error);
                alert(`Error de carga: ${error.message}`);
            } finally {
                setIsLoading(false);
            }
        }, [apiRequest]);



          const handleSearchSubmit = useCallback(async () => {
        
                const q = searchQuery?.trim();
        
                if (!q) {
                    try {
                        await loadEstaciones();
                    } catch (e) {
                        console.error("Error al recargar tickets vacíos:", e);
                    }
                    return;
                }
                setIsLoading(true);
            
                
                try {
                    const endpoint = `${API_URL}/search?query=${encodeURIComponent(q)}`;
                    const response = await apiRequest(endpoint, { method: "GET" });
        
                    if (!response.ok) {
                        throw new Error(`Error ${response.status}: ${response.statusText}`);
                    }
        
                    const data = await response.json();
                    setEstacionesData(Array.isArray(data) ? data : []);
                } catch (err) {
                    console.error("Error buscando Estaciones:", err);
                    setEstacionesData([]);
                } finally {
                    setIsLoading(false);
                }
            }, [searchQuery, apiRequest, loadEstaciones]);
    
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
        
        if (response.ok || response.status === 200 || response.status === 204) {
            
            setEstacionesData(prevData => 
                prevData.filter(estacion => estacion.idMerchant !== idMerchant)
            );
            
            setSelectedEstacion(null);

        } else {
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
                        selectedEstacionId={selectedEstacion}
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                        handleSearchSubmit={handleSearchSubmit}
                    />
                </div>

                {/* PANEL DE FILTRO (si está visible) */}
                {showFilterPanel && (
                    <RenderFiltroEstaciones
                        setShowFilterPanel={setShowFilterPanel}
                        filterCriteria={filterCriteria}
                        setFilterCriteria={setFilterCriteria}
                        onApply={handleApplyFilters}
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