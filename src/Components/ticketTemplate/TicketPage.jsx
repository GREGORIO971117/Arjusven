import React, { useState, useEffect } from 'react';
import TicketList from '../ticketTemplate/ticketList';
import TicketTemplate from './TicketTemplate';
import RenderFiltro from './RenderFiltro';
import {apiRequest} from '../login/Api';

const API_BASE_URL = '/tickets';

function TicketPage() {
    const [ticketsData, setTicketsData] = useState([]);
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [showFilterPanel, setShowFilterPanel] = useState(false);
    const [isLoading, setIsLoading] = useState(false); // Estado para la carga
    const [error, setError] = useState(""); // Estado para manejar errores

    // Función para obtener los tickets de la API
    const fetchTickets = async () => {
        setIsLoading(true);
        setError("");
        try {
            // Usa la API_BASE_URL y apiRequest para la llamada real, incluyendo el JWT
            const response = await apiRequest(API_BASE_URL, { method: 'GET' }); 
            
            if (!response.ok) {
                // Manejo de errores del servidor o autenticación
                throw new Error(`Error ${response.status}: ${response.statusText}. Por favor, verifique la conexión o inicie sesión de nuevo.`);
            }
            
            const data = await response.json();
            // Aseguramos que los datos sean un array antes de establecerlos
            setTicketsData(Array.isArray(data) ? data : []); 
            console.log(data);
        } catch (err) {
            console.error('Error al cargar los tickets:', err);
            setError(err.message || "No se pudo conectar al servidor de tickets.");
            setTicketsData([]); // Limpia los datos en caso de error
        } finally {
            setIsLoading(false);
        }
    };

    // Carga inicial de tickets al montar el componente
    useEffect(() => {
        fetchTickets();
    }, []); // El array vacío asegura que se ejecute solo una vez al montar

    return (
        <>
            <div className='ticket-content-flex'>
                <div className="ticket-list-column">
                    {/* Muestra un mensaje de carga o error si es necesario */}
                    {isLoading && <p>Cargando tickets...</p>}
                    {error && <div className="error-message">🚨 Error: {error}</div>}
                    
                    {/* Solo renderiza la lista si no está cargando Y no hay error, o si hay datos */}
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
                        // Aquí probablemente quieras pasar una función para aplicar el filtro
                        // y volver a llamar a fetchTickets con los parámetros de filtro.
                    />
                )}
                
                <div className="ticket-template-column">
                    {selectedTicket ? (
                        <TicketTemplate
                            data={selectedTicket}
                            onGoBack={() => setSelectedTicket(null)}
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