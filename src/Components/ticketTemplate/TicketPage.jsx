import React, { useState, useEffect, useCallback } from 'react';
import Lista from '../listas/estacionesList';
import TicketTemplate from './TicketTemplate';
import RenderFiltro from './RenderFiltro';
import { apiRequest } from '../login/Api';

const API_BASE_URL = '/tickets';
const API_SERVICIOS_URL = '/servicio'; 
const API_ADICIONALES_URL = '/adicional';

function TicketPage() {
    
    const [ticketsData, setTicketsData] = useState([]);
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [showFilterPanel, setShowFilterPanel] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [isSaving, setIsSaving] = useState(false); 
    const [saveError, setSaveError] = useState(null); 
    const [currentPage, setCurrentPage] = useState(0);
    const [searchQuery, setSearchQuery] = useState("");

    const [filterCriteria, setFilterCriteria] = useState({
                                                situacion:'todos',
                                                sla:'todos',
                                                tipoDeServicio:'todos',
                                                supervisor:'todos',
                                                plaza:'todos',
                                                fechaInicio: '',
                                                fechaFin: ''
                                                });

    const fetchFilteredTickets = async () => {
        setIsLoading(true);
        setError("");
        
        try {
            const params = new URLSearchParams();
            
            if (filterCriteria.situacion) {
                params.append('situacion', filterCriteria.situacion);
            }
            if (filterCriteria.sla) {
                params.append('sla', filterCriteria.sla);
            }
            if (filterCriteria.tipoDeServicio) {
                params.append('tipoDeServicio', filterCriteria.tipoDeServicio);
            }
            if (filterCriteria.supervisor) {
                params.append('supervisor', filterCriteria.supervisor);
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

            const endpoint = `${API_BASE_URL}/filter?${params.toString()}`;
            
            const response = await apiRequest(endpoint, 
                { method: 'GET' });

            if (response.status === 204) {
            setTicketsData([]); 
            setIsLoading(false);
            return;
        }
            
            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }
            
            const data = await response.json();
            console.log("Tickets filtrados:", data);
            setTicketsData(Array.isArray(data) ? data : []);

        } catch (err) {
            console.error("Error filtrando tickets:", err);
            setError(err.message || "Error al aplicar filtros.");
            setTicketsData([]);
        } finally {
            setIsLoading(false);
        }
    };

      const handleKeyDown = (event) => {
        if (event.key === 'Enter' || event.keyCode === 13) {
            event.preventDefault(); 
            onSearchSubmit();
            setCurrentPage(0);
        }
    };

    const handleApplyFilters = () => {
        fetchFilteredTickets();
        setShowFilterPanel(false); 
        setCurrentPage(0);
    };

    const fetchTickets = useCallback(async () => {
        setIsLoading(true);
        setError("");
        try {
            const response = await apiRequest(API_BASE_URL, { method: 'GET' }); 
            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}.`);
            }
            const data = await response.json();
            console.log("Tickets cargados:", data);
            setTicketsData(Array.isArray(data) ? data : []); 
        } catch (err) {
            console.error('Error al cargar los tickets:', err);
            setError(err.message || "No se pudo conectar al servidor de tickets.");
            setTicketsData([]);
        } finally {
            setIsLoading(false);
        }
    }, [apiRequest]);

    const handleSearchSubmit = useCallback(async () => {
        const q = searchQuery?.trim();

        if (!q) {
            try {
                await fetchTickets();
            } catch (e) {
                console.error("Error al recargar tickets vacíos:", e);
            }
            return;
        }

        setIsLoading(true);
        setError("");
        
        try {
            const endpoint = `${API_BASE_URL}/search?query=${encodeURIComponent(q)}`;
            const response = await apiRequest(endpoint, { method: "GET" });

            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();
            setTicketsData(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error("Error buscando tickets:", err);
            setError(err.message || "No se pudo conectar al servidor de búsqueda.");
            setTicketsData([]);
        } finally {
            setIsLoading(false);
        }
    }, [searchQuery, apiRequest, fetchTickets]);

    useEffect(() => {
        fetchTickets();
    }, [fetchTickets]);

    const handleSave = useCallback(async () => {
        try {

            await fetchTickets(); 
        } catch (err) {
            console.error("Fallo la recarga de inventario después de guardar.", err);
        }
    }, [fetchTickets]);

    const handleDownload = async (type) => {
        const id = selectedTicket.idTickets;
        if (!id) {
            alert('Error: ID del ticket no encontrado.');
            return;
        }
        
        let templateType = 'intercambio'; 
        let templateName = 'Intercambio';

        switch (type) {
            case 'mantenimiento': 
                templateType = 'mantenimiento';
                templateName = 'Mantenimiento';
                break;
            case 'retiro': 
                templateType = 'retiro';
                templateName = 'Retiro';
                break;
            case 'intercambio': 
            default:
                templateType = 'intercambio';
                templateName = 'Intercambio';
                break;
        }

        const URL = `/tickets/download/${id}?type=${templateType}`; 

        try {
            const response = await apiRequest(URL, { method: 'GET' });

            if (!response.ok) {
                throw new Error(`Error del servidor: ${response.statusText}`);
            }

            const blob = await response.blob(); 
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            
            const contentDisposition = response.headers.get('Content-Disposition');
            let filename = `${selectedTicket.servicios.incidencia}_${selectedTicket.servicios.nombreDeEss}_${templateName}.docx`; 

            if (contentDisposition) {
                const encodedMatch = contentDisposition.match(/filename\*=UTF-8''(.+)/i);
                
                if (encodedMatch && encodedMatch.length > 1) {
                    filename = decodeURIComponent(encodedMatch[1]);
                } else {
                    const filenameMatch = contentDisposition.match(/filename="(.+)"/);
                    if (filenameMatch && filenameMatch.length > 1) {
                        filename = filenameMatch[1];
                    }
                }
            }

            link.setAttribute('download', filename);
            document.body.appendChild(link);
            
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);

        } catch (error) {
            console.error('Error durante la descarga del documento:', error);
            alert('No se pudo descargar el documento. Verifique la conexión al servidor.');
        }
    }; 
    
    async function handleServiceDelete() {
        setIsSaving(true);
        setSaveError(null);
        const idTickets = selectedTicket.idTickets;

        if (!idTickets) {
            setError("Error: ID del ticket no ha sido encontrado para borrar.");
            return;
        }

        if (!window.confirm(`¿Estás seguro de que quieres BORRAR permanentemente el Ticket?`)) {
            return;
        }
    
        try {
            const response = await apiRequest(`${API_BASE_URL}/${idTickets}`, {
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
            setIsSaving(false);
        }
    }

    const handleServicePatch = async (updatedServiceData) => {
        setIsSaving(true);
        setSaveError(null);

        const idServicio = updatedServiceData.idServicios; 
        
        if (!idServicio) {
            setSaveError("Error: El campo 'idServicio' no fue encontrado para realizar la actualización.");
            setIsSaving(false);
            return { success: false };
        }

        try {
            const response = await apiRequest(`${API_SERVICIOS_URL}/${idServicio}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedServiceData),
            });

            if (!response.ok) {
                let errorMsg = `Error ${response.status} al actualizar el servicio.`;
                if (response.headers.get('content-length') > 0 || response.headers.get('content-type')?.includes('application/json')) {
                    try {
                        const errorData = await response.json();
                        errorMsg = errorData.message || errorData.error || errorMsg;
                    } catch (e) {
                    }
                }
                throw new Error(errorMsg);
            }

            let newServiceData = updatedServiceData;
            
            if (response.status !== 204) {
                newServiceData = await response.json();
                
            } 
            
            setSelectedTicket(prevTicket => {
                if (!prevTicket) return null;
                return {
                    ...prevTicket,
                    servicios: newServiceData, 
                };
            });
            
            return { success: true };
            
        } catch (err) {
            console.error("Fallo la operación de guardado de Servicio:", err);
            setSaveError(err.message || "Fallo la conexión o la actualización del servicio.");
            return { success: false, error: err.message };
        } finally {
            setIsSaving(false);
        }
    };


    const handleAdicionalPatch = async (updatedAdicionalData) => {
        setIsSaving(true);
        setSaveError(null);

        const idAdicionales = updatedAdicionalData.idAdicionales; 
        
        if (!idAdicionales) {
            const msg = "Error: El campo 'idAdicionales' no fue encontrado.";
            setSaveError(msg);
            setIsSaving(false);
            return { success: false, error: msg };
        }

        try {
            const response = await apiRequest(`${API_ADICIONALES_URL}/${idAdicionales}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedAdicionalData),
            });

            if (!response.ok) {
                let errorMsg = `Error ${response.status}`;
                
                try {
                    const errorData = await response.json();
                    if (errorData.error) errorMsg = errorData.error;
                    else if (errorData.message) errorMsg = errorData.message;
                } catch (e) {
                    console.log("No se pudo parsear el JSON de error del servidor");
                }

                throw new Error(errorMsg);
            }

            let newAdicionalData = updatedAdicionalData;
            if (response.status !== 204) {
                try {
                    newAdicionalData = await response.json();
                } catch(e) {}
            } 
            
            setSelectedTicket(prevTicket => {
                if (!prevTicket) return null;
                return {
                    ...prevTicket,
                    adicionales: { ...prevTicket.adicionales,
                        ...newAdicionalData }
                };
            });
            
            return { success: true };
            
        } catch (err) {
            console.error("Error en PATCH Adicionales:", err);
            return { success: false, error: err.message };
        } finally {
            setIsSaving(false);
        }
    };
    

    return (
        <>
            <div className='ticket-content-flex'>
                <div className="ticket-list-column">
                        <Lista
                            items={ticketsData}
                            onSelectEstacion={setSelectedTicket}
                            setShowFilterPanel={setShowFilterPanel}
                            isLoading={isLoading}
                            searchQuery={searchQuery}
                            setSearchQuery={setSearchQuery} 
                            handleSearchSubmit={handleSearchSubmit} 
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                            handleKeyDown={handleKeyDown}
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
                    {isSaving && <div className="saving-message"> Guardando cambios...</div>}
                    {saveError && <div className="error-message"> Error al guardar: {saveError}</div>}
                    
                    {selectedTicket ? (
                        <TicketTemplate
                            data = {selectedTicket}
                            onGoBack = {() => setSelectedTicket(null)}
                            onSaveService = {handleServicePatch} 
                            onSaveAdicional = {handleAdicionalPatch}
                            onDeleteService = {handleServiceDelete}
                            handleDownload = {handleDownload}
                        />
                    ) : (
                        <div className="no-selection-message">
                            Selecciona un ticket para ver sus detalles.
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default TicketPage;