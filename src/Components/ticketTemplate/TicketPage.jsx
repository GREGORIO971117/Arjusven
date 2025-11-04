import React, { useState, useEffect } from 'react';
import TicketList from '../ticketTemplate/ticketList';
import TicketTemplate from './TicketTemplate';
import RenderFiltro from './RenderFiltro';
import { apiRequest } from '../login/Api';

const API_BASE_URL = '/tickets';
const API_SERVICIOS_URL = '/servicio'; 

function TicketPage() {
    const [ticketsData, setTicketsData] = useState([]);
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [showFilterPanel, setShowFilterPanel] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [isSaving, setIsSaving] = useState(false); 
    const [saveError, setSaveError] = useState(null); 

    const fetchTickets = async () => {
        setIsLoading(true);
        setError("");
        try {
            const response = await apiRequest(API_BASE_URL, { method: 'GET' }); 
            
            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}.`);
            }
            
            const data = await response.json();
            setTicketsData(Array.isArray(data) ? data : []); 
        } catch (err) {
            console.error('Error al cargar los tickets:', err);
            setError(err.message || "No se pudo conectar al servidor de tickets.");
            setTicketsData([]);
        } finally {
            setIsLoading(false);
        }
    };


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
            // Intenta leer el JSON de error solo si la respuesta tiene contenido
            if (response.headers.get('content-length') > 0 || response.headers.get('content-type')?.includes('application/json')) {
                 try {
                    const errorData = await response.json();
                    errorMsg = errorData.message || errorData.error || errorMsg;
                } catch (e) {
                    // Ignora el error de JSON si el cuerpo no es JSON (ej: HTML de error)
                }
            }
            throw new Error(errorMsg);
        }

        let newServiceData = updatedServiceData;
      
        if (response.status !== 204) {
            newServiceData = await response.json();
            
        } 
        
        // 1. Actualizar el estado central del ticket (`selectedTicket`)
        setSelectedTicket(prevTicket => {
            if (!prevTicket) return null;
            return {
                ...prevTicket,
                servicios: newServiceData, // Usamos los datos devueltos (o los enviados si fue 204)
            };
        });
        
        // 2. Notificar al componente de edición que todo salió bien
        return { success: true };
        
    } catch (err) {
        console.error("Fallo la operación de guardado de Servicio:", err);
        setSaveError(err.message || "Fallo la conexión o la actualización del servicio.");
        return { success: false, error: err.message };
    } finally {
        setIsSaving(false);
    }
};
    
    useEffect(() => {
        fetchTickets();
    }, []);

    return (
        <>
            <div className='ticket-content-flex'>
                <div className="ticket-list-column">
                    {/* ... (renderizado de lista de tickets) ... */}
                    {isLoading && <p>Cargando tickets...</p>}
                    {error && <div className="error-message"> Error: {error}</div>}
                    {!isLoading && !error && (
                        <TicketList
                            tickets={ticketsData}
                            onSelectTicket={setSelectedTicket}
                            setShowFilterPanel={setShowFilterPanel}
                        />
                    )}
                </div>
                
                {showFilterPanel && (
                    <RenderFiltro
                        setShowFilterPanel={setShowFilterPanel}
                    />
                )}
                
                <div className="ticket-template-column">
                    {isSaving && <div className="saving-message"> Guardando cambios...</div>}
                    {saveError && <div className="error-message"> Error al guardar: {saveError}</div>}
                    
                    {selectedTicket ? (
                        <TicketTemplate
                            data={selectedTicket}
                            onGoBack={() => setSelectedTicket(null)}
                            onSaveService={handleServicePatch} 
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