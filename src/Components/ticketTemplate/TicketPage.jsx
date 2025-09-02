import React, { useState, useEffect } from 'react';
import TicketList from '../ticketTemplate/ticketList';
import TicketTemplate from './TicketTemplate';
import './TicketPage.css'

function TicketPage() {
    const [ticketsData, setTicketsData] = useState([]);
    const [selectedTicket, setSelectedTicket] = useState(null);

    useEffect(() => {
        loadTickets();
    }, []);

    const loadTickets = () => {
        try {
            const storedData = localStorage.getItem('excelData');
            if (storedData) {
                const parsedData = JSON.parse(storedData);
                if (Array.isArray(parsedData)) {
                    const formattedData = parsedData.map(item => ({
                        ...item,
                        "No de Caso": item.Incidencia,
                        "Motivo del Servicio": item["Aplicación , Prioridad "]
                    }));
                    setTicketsData(formattedData);
                }
            }
        } catch (error) {
            console.log('Error al cargar los datos de localStorage:', error);
        }
    };

    const updateTicketData = (updatedTicket) => {
        const newTicketsData = ticketsData.map(t =>
            t.Incidencia === updatedTicket.Incidencia ? updatedTicket : t
        );
        setTicketsData(newTicketsData);
        localStorage.setItem('excelData', JSON.stringify(newTicketsData));
        setSelectedTicket(updatedTicket);
    };

   const handleDelete = () => {
        if (!selectedTicket) return;

        // Filtra el array, creando una nueva lista sin el ticket seleccionado
        const updatedTickets = ticketsData.filter(t => t.Incidencia !== selectedTicket.Incidencia);
        
        // Actualiza el estado de la aplicación
        setTicketsData(updatedTickets);
        
        // Guarda el nuevo array en localStorage
        localStorage.setItem('excelData', JSON.stringify(updatedTickets));
        
        // Limpia el ticket seleccionado para que el panel de detalles desaparezca
        setSelectedTicket(null);
    };


    return (
        <div className="ticket-page-container">
            
            <div className='ticket-content-flex'>
                <div className="ticket-list-column">
                    <TicketList
                        tickets={ticketsData}
                        onSelectTicket={setSelectedTicket}
                        onUpdateTickets={setTicketsData} 
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