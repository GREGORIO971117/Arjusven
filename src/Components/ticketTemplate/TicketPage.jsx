import React, { useState, useEffect } from 'react';
import ServiceRequestForm from '../Service/ServiceRequestForm';
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
                    // Update keys for better readability
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

    return (
        <div className="ticket-page-container">
            <h1>Gestión de Tickets de Servicio</h1>
            <p>Sube un archivo de Excel para ver los tickets generados.</p>

            <ServiceRequestForm onNewTicket={loadTickets} />

            <div className='ticket-content-flex'>
                <div className="ticket-list-column">
                    <TicketList
                        tickets={ticketsData}
                        onSelectTicket={setSelectedTicket}
                    />
                </div>

                <div className="ticket-template-column">
                    {selectedTicket ? (
                        <TicketTemplate
                            data={selectedTicket}
                            onUpdateTicket={updateTicketData} // <-- Asegúrate de que esta línea esté presente
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