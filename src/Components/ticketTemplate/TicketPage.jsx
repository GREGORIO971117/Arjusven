import React, { useState, useEffect } from 'react';
import TicketList from '../ticketTemplate/ticketList';
import TicketTemplate from './TicketTemplate';

function TicketPage() {
    const [ticketsData, setTicketsData] = useState([]);
    const [selectedTicket, setSelectedTicket] = useState(null);

    // URL base de tu API, debes cambiarla
    const API_URL = '/api/tickets'; 

    useEffect(() => {
        // Cargar los tickets del servidor al montar el componente
        loadTickets();
    }, []);

    const loadTickets = async () => {
        try {
            const response = await fetch(API_URL);
            if (!response.ok) {
                throw new Error('Error al cargar los tickets del servidor');
            }
            const data = await response.json();
            
            // Si la data viene del servidor, puede que no necesites reformatear
            // Asumiendo que tu backend ya te devuelve los datos limpios:
            setTicketsData(data);
        } catch (error) {
            console.error('Error al cargar los datos:', error);
            // Manejo de errores en la UI, como mostrar un mensaje
        }
    };

    const updateTicketData = async (updatedTicket) => {
        try {
            const response = await fetch(`${API_URL}/${updatedTicket.Incidencia}`, {
                method: 'PUT', // o 'PATCH'
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedTicket),
            });

            if (!response.ok) {
                throw new Error('Error al actualizar el ticket en el servidor');
            }

            // Actualiza el estado localmente después de una respuesta exitosa
            const newTicketsData = ticketsData.map(t =>
                t.Incidencia === updatedTicket.Incidencia ? updatedTicket : t
            );
            setTicketsData(newTicketsData);
            setSelectedTicket(updatedTicket);

        } catch (error) {
            console.error('Error al actualizar el ticket:', error);
        }
    };

    const handleDelete = async () => {
        if (!selectedTicket) return;

        try {
            const response = await fetch(`${API_URL}/${selectedTicket.Incidencia}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Error al eliminar el ticket del servidor');
            }

            // Actualiza el estado localmente
            const updatedTickets = ticketsData.filter(t => t.Incidencia !== selectedTicket.Incidencia);
            setTicketsData(updatedTickets);
            setSelectedTicket(null); // Oculta el panel de detalles
            
        } catch (error) {
            console.error('Error al eliminar el ticket:', error);
        }
    };

    return (
        <div className="ticket-page-container">
            <div className='ticket-content-flex'>
                <div className="ticket-list-column">
                    <TicketList
                        tickets={ticketsData}
                        onSelectTicket={setSelectedTicket}
                        // La prop onUpdateTickets ya no es necesaria si el padre maneja la actualización
                    />
                </div>

                <div className="ticket-template-column">
                    {selectedTicket ? (
                        <TicketTemplate
                            data={selectedTicket}
                            onUpdateTicket={updateTicketData}
                            onGoBack={() => setSelectedTicket(null)}
                            handleDelete={handleDelete}
                        />
                    ) : (
                        <div className="no-selection-message">
                            Selecciona un ticket para ver sus detalles.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default TicketPage;