import React, { useState, useEffect,useCallback } from 'react';
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
    const [isLoading, setIsLoading] = useState(false); 
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isEditing, setIsEditing] = useState(false); 
    const [searchQuery, setSearchQuery] = useState("");
   const [filterCriteria, setFilterCriteria] = useState({
                                                        estado: "todos",
                                                        plaza: "todos",
                                                        fechaInicio: '',
                                                        fechaFin: ''  
                                                        });

const fetchFilteredInventario = async () => {
        setIsLoading(true);
        setError("");
        
        try {
            const params = new URLSearchParams();
            
            if (filterCriteria.estado) {
                params.append('estado', filterCriteria.estado);
            }
            if (filterCriteria.plaza) {
                params.append('plaza', filterCriteria.plaza);
            }
            if (filterCriteria.fechaInicio) {
                params.append('fechaInicio', filterCriteria.fechaInicio);
            }
            if (filterCriteria.fechaFin) {
                params.append('fechaFin', filterCriteria.fechaFin);
            }

            const endpoint = `${API_URL}/filter?${params.toString()}`;
            
            const response = await apiRequest(endpoint, 
                { method: 'GET' });
            
            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }
            
            const data = await response.json();
            console.log("Inventario filtrado:", data);
            setInventarioData(Array.isArray(data) ? data : []);

        } catch (err) {
            console.error("Error filtrando inventario:", err);
            setError(err.message || "Error al aplicar filtros.");
            setInventarioData([]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleApplyFilters = () => {
        fetchFilteredInventario();
        setShowFilterPanel(false); 
    };

    
    const loadInventario = useCallback(async () => {
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
    }, [apiRequest]);


    const handleSearchSubmit = useCallback(async () => {

        const q = searchQuery?.trim();

        if (!q) {
            try {
                await loadInventario();
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
            setInventarioData(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error("Error buscando Inventario:", err);
            setInventarioData([]);
        } finally {
            setIsLoading(false);
        }
    }, [searchQuery, apiRequest, loadInventario]);

    const handleUpdate = async (dataToUpdate) => {
    try {
        const response = await apiRequest(`/inventario/${dataToUpdate.idInventario}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dataToUpdate),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || `Error ${response.status} al actualizar.`);
        }
        
        const updatedInventoryItem = await response.json(); 
        setSelectedInventario(updatedInventoryItem); 
        setInventarioData(prevList => 
            prevList.map(item => 
                item.idInventario === updatedInventoryItem.idInventario ? updatedInventoryItem : item
            )
        );

        setIsEditing(false); 
        return { success: true };

    } catch (error) {
        console.error("Error al actualizar inventario:", error);
        return { success: false, error: error.message }; 
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
        setSelectedInventario(null); 
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
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                        onSearchSubmit={handleSearchSubmit} 
                    />
                </div>

                {showFilterPanel && (
                    <RenderFiltro
                        setShowFilterPanel={setShowFilterPanel}
                        filterCriteria={filterCriteria}
                        setFilterCriteria={setFilterCriteria}
                        onApply={handleApplyFilters}
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