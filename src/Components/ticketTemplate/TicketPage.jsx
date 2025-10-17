import React, { useState, useEffect } from 'react';
import TicketList from '../ticketTemplate/ticketList';
import TicketTemplate from './TicketTemplate';
import RenderFiltro from './RenderFiltro';


function TicketPage() {
    const [ticketsData, setTicketsData] = useState([]);
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [showFilterPanel, setShowFilterPanel] = useState(false);


    // URL base de tu API, debes cambiarla
    const API_URL = '/assets/ticketsData.json'; 

    useEffect(() => {
        const loadInventario = async () => {
          try {
            const response = await fetch(API_URL);
            if (!response.ok) {
              throw new Error('Error al cargar los tickets');
            }
            const data = await response.json();
            setTicketsData(data);
          } catch (error) {
            console.error('Error al cargar los tickets:', error);
          }
        };
    
        loadInventario();
      }, []);


    return (
        <>
        
        
            <div className='ticket-content-flex'>
                <div className="ticket-list-column">
                    <TicketList
                    tickets={ticketsData}
                    onSelectTicket={setSelectedTicket}
                    setShowFilterPanel={setShowFilterPanel}
                    />
                </div>
                
                {showFilterPanel && (
                    <RenderFiltro
                    setShowFilterPanel={setShowFilterPanel}
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