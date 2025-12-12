import React, { useState, useEffect, useCallback } from 'react';
import Lista from '../listas/estacionesList';
import InventarioTemplate from './InventarioTemplate';
import RenderFiltro from './RenderFiltro';
import './InventarioList.css';
import { apiRequest } from '../login/Api';
import ModalTemplate from '../modal/modalTemplate';

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
    
    // 🆕 ESTADO PARA PAGINACIÓN
    const [pagination, setPagination] = useState({
        page: 0,
        size: 10,       // Cantidad de items por página
        totalPages: 0,
        totalElements: 0
    });

    const [filterCriteria, setFilterCriteria] = useState({
        estado: "todos",
        plaza: "todos",
        equipo: "todos",
        fechaInicio: '',
        fechaFin: ''
    });

    const [modalConfig, setModalConfig] = useState({
        isOpen: false, title: '', message: '', type: 'info',
    });

    const closeModal = () => setModalConfig(prev => ({ ...prev, isOpen: false }));
    const showModal = ({ title, message, type }) => setModalConfig({ isOpen: true, title, message, type });

    // =========================================================================
    // 🆕 FUNCIÓN MAESTRA DE CARGA (Unifica Load, Search y Filter)
    // =========================================================================
    const fetchData = useCallback(async (page = 0, query = "", filters = null) => {
        setIsLoading(true);
        setError("");

        try {
            // 1. Construir la URL base con paginación
            let endpoint = `${API_URL}?page=${page}&size=${pagination.size}`;

            // 2. Si hay búsqueda (Search)
            if (query && query.trim() !== "") {
                endpoint = `${API_URL}/search?query=${encodeURIComponent(query.trim())}&page=${page}&size=${pagination.size}`;
            } 
            // 3. Si hay filtros (Filter)
            else if (filters) {
                const params = new URLSearchParams();
                if (filters.estado) params.append('estado', filters.estado);
                if (filters.plaza) params.append('plaza', filters.plaza);
                if (filters.equipo) params.append('equipo', filters.equipo);
                if (filters.fechaInicio) params.append('fechaInicio', filters.fechaInicio);
                if (filters.fechaFin) params.append('fechaFin', filters.fechaFin);
                
                // Agregamos paginación a los filtros
                params.append('page', page);
                params.append('size', pagination.size);
                
                endpoint = `${API_URL}/filter?${params.toString()}`;
            }

            const response = await apiRequest(endpoint, { method: 'GET' });

            if (response.status === 204) {
                setInventarioData([]);
                setPagination(prev => ({ ...prev, totalPages: 0, totalElements: 0 }));
                return;
            }

            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();

            // 🆕 LÓGICA CRÍTICA: Extraer 'content' del objeto Page de Spring Boot
            if (data.content) {
                setInventarioData(data.content);
                setPagination(prev => ({
                    ...prev,
                    page: data.number,
                    totalPages: data.totalPages,
                    totalElements: data.totalElements
                }));
            } else {
                // Fallback por si el backend devuelve un array vacío directo (ej. búsqueda sin resultados)
                setInventarioData(Array.isArray(data) ? data : []);
            }

        } catch (err) {
            console.error("Error cargando inventario:", err);
            setError(err.message || "Error al cargar datos.");
            setInventarioData([]);
        } finally {
            setIsLoading(false);
        }
    }, [pagination.size]); // Dependencia: si cambias el tamaño de página, se recrea

    // =========================================================================
    // HANDLERS ACTUALIZADOS
    // =========================================================================

    // Carga inicial
    useEffect(() => {
        fetchData(0); 
    }, [fetchData]);

    // Buscar
    const handleSearchSubmit = () => {
        // Al buscar, siempre reseteamos a la página 0
        // Pasamos el query actual y null en filtros
        fetchData(0, searchQuery, null);
    };

    // Aplicar Filtros
    const handleApplyFilters = () => {
        setShowFilterPanel(false);
        // Al filtrar, reseteamos a la página 0, query vacío, y pasamos los criterios
        setSearchQuery(""); // Limpiamos la barra de búsqueda visualmente si quieres
        fetchData(0, "", filterCriteria);
    };

    // 🆕 Cambio de Página (Botones Anterior / Siguiente)
    const handlePageChange = (newPage) => {
        if (newPage >= 0 && newPage < pagination.totalPages) {
            // Mantenemos el contexto actual (si estaba buscando o filtrando)
            // Esto requiere un poco de lógica para saber "qué" estamos paginando.
            // Para simplificar, priorizamos: Search > Filter > All
            
            if (searchQuery) {
                fetchData(newPage, searchQuery, null);
            } else if (showFilterPanel || filterCriteria.estado !== 'todos' /* validación simple */) {
                // Nota: Aquí podrías mejorar la lógica para saber si los filtros están "activos"
                fetchData(newPage, "", filterCriteria);
            } else {
                fetchData(newPage);
            }
        }
    };

    // Recargar datos (usado al guardar/borrar)
    const loadInventario = async () => {
        // Recarga la página actual
        fetchData(pagination.page, searchQuery, null); // OJO: simplificado
    };

    // ... (MANTENER IGUAL: handleUpdate, handleRemove, handleSave, handleCancel, handleEnterEditMode) ...
    // Solo asegúrate de que handleSave llame al nuevo loadInventario o fetchData
    
    // ... Código de handleUpdate y handleRemove se mantiene igual ...
    const handleUpdate = async (dataToUpdate) => {
         // ... tu código existente ...
         // Al final, actualiza el estado local o recarga:
         // fetchData(pagination.page, searchQuery, filterCriteria);
         // Pero tu lógica actual de actualizar el array local (setInventarioData map) es mejor para UX, mantenla.
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

    const handleRemove = async () => {
        // ... tu código de borrado ...
        // Al final:
        // await loadInventario(); -> Esto ahora llamará a fetchData
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
                 // ... error handling
            }

            // Recargamos la pagina actual
            fetchData(pagination.page); 
            setSelectedInventario(null);
            
        } catch (err) {
            setError(err.message || "Fallo la conexión con el servidor al intentar borrar.");
        } finally {
            setIsSubmitting(false);
        }
    }
    
    const handleSave = async () => {
        fetchData(pagination.page);
        setSelectedInventario(null); 
        setIsEditing(false);
    };

    const handleCancel = () => { setIsEditing(false); };
    const handleEnterEditMode = () => { setIsEditing(true); };


    return (
        <div className="ticket-page-container">
            <div className="ticket-content-flex">
                <div className="ticket-list-column">
                    <Lista
                        items={inventarioData}
                        onSelectEstacion={setSelectedInventario}
                        setShowFilterPanel={setShowFilterPanel}
                        isLoading={isLoading}
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                        handleSearchSubmit={handleSearchSubmit}
                        
                        // 🆕 NUEVOS PROPS PARA PAGINACIÓN
                        currentPage={pagination.page}
                        totalPages={pagination.totalPages}
                        totalElements={pagination.totalElements}
                        onPageChange={handlePageChange}
                    />
                </div>

                {showFilterPanel && (
                    <RenderFiltro
                        setShowFilterPanel={setShowFilterPanel}
                        filterCriteria={filterCriteria}
                        setFilterCriteria={setFilterCriteria}
                        onApply={handleApplyFilters}
                        // Removemos currentPage de aquí si no se usa dentro del filtro
                    />
                )}

                <div className="ticket-template-column">
                    {/* ... (Tu código de template sigue igual) ... */}
                    {selectedInventario ? (
                        <InventarioTemplate
                            handleEnterEditMode={handleEnterEditMode}
                            setIsEditing={setIsEditing}
                            isEditing={isEditing}
                            data={selectedInventario}
                            // loadInventario={loadInventario} // Ya no es tan necesario si usas handleSave
                            handleSave={handleSave}
                            handleCancel={handleCancel}
                            handleRemove={handleRemove}
                            handleUpdate={handleUpdate}
                            ModalTemplate={ModalTemplate}
                            showModal={showModal}
                            closeModal={closeModal}
                            modalConfig={modalConfig}
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