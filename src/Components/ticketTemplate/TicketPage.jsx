import React, { useState, useEffect } from 'react';
import TicketList from '../ticketTemplate/ticketList';
import TicketTemplate from './TicketTemplate';

function TicketPage() {
    const [ticketsData, setTicketsData] = useState([]);
    const [selectedTicket, setSelectedTicket] = useState(null);

    // URL base de tu API, debes cambiarla
    const API_URL = '/assets/ticketsData.json'; 

    useEffect(() => {
        const loadInventario = async () => {
          try {
            const response = await fetch(API_URL);
            if (!response.ok) {
              throw new Error('Error al cargar los datos del inventario');
            }
            const data = await response.json();
            setTicketsData(data);
          } catch (error) {
            console.error('Error al cargar los datos:', error);
          }
        };
    
        loadInventario();
      }, []);


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
                            onGoBack={() => setSelectedTicket(null)}
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