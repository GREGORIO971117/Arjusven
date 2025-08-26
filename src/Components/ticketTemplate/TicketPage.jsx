import React, { useState, useEffect } from 'react';
import ServiceRequestForm from '../Service/ServiceRequestForm';
import TicketList from '../ticketTemplate/ticketList';   // 👈 corregida la ruta
import TicketTemplate from '../ticketTemplate/TicketTemplate'; // 👈 corregida la ruta

function TicketPage() {
  const [activeTab, setActiveTab] = useState('all');
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
          setTicketsData(parsedData);
        }
      }
    } catch (error) {
      console.error('Error al cargar los datos de localStorage:', error);
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSelectedTicket(null);
  };

  const updateTicketData = (updatedTicket) => {
    const newTicketsData = ticketsData.map(t =>
      t.Incidencia === updatedTicket.Incidencia ? updatedTicket : t
    );
    setTicketsData(newTicketsData);
    localStorage.setItem('excelData', JSON.stringify(newTicketsData));
    setSelectedTicket(updatedTicket);
  };

  const filteredTickets = ticketsData.filter(ticket => {
    if (activeTab === 'open') {
      return ticket["Situación Actual"] === 'Abierto';
    }
    if (activeTab === 'closed') {
      return ticket["Situación Actual"] === 'Cerrado';
    }
    return true;
  });

  return (
  <div className="ticket-page-container">
<h1>Gestión de Tickets de Servicio</h1>
      <p>Sube un archivo de Excel para ver los tickets generados.</p>

      <ServiceRequestForm onNewTicket={() => loadTickets()} />

      <div className="ticket-filter-buttons">
        <button
          className={`tab-button ${activeTab === 'all' ? 'active' : ''}`}
          onClick={() => handleTabChange('all')}
        >
          Todos ({ticketsData.length})
        </button>
        <button
          className={`tab-button ${activeTab === 'open' ? 'active' : ''}`}
          onClick={() => handleTabChange('open')}
        >
          Abiertos ({ticketsData.filter(t => t["Situación Actual"] === 'Abierto').length})
        </button>
        <button
          className={`tab-button ${activeTab === 'closed' ? 'active' : ''}`}
          onClick={() => handleTabChange('closed')}
        >
          Cerrados ({ticketsData.filter(t => t["Situación Actual"] === 'Cerrado').length})
        </button>
      </div>
      
    <div className='ticket-content-flex'> {/* Este es el contenedor flex */}
      <div className="ticket-list-column"> {/* Esta es la columna para la lista (1/3) */}
        <TicketList
          tickets={filteredTickets}
          selectedTicket={selectedTicket}
          onSelectTicket={setSelectedTicket}
          onUpdateTicket={updateTicketData}
        />
      </div>

      <div className="ticket-template-column"> {/* Esta es la columna para el template (2/3) */}
        {selectedTicket ? (
          <TicketTemplate
            data={selectedTicket}
            onUpdateTicket={updateTicketData}
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
