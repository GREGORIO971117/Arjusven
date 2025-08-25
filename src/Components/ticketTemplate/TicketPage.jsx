import React, { useState, useEffect } from 'react';
import ServiceRequestForm from '../Service/ServiceRequestForm';
import TicketList from './ticketList';
import TicketSummary from './ticketSummary';

function TicketPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [ticketsData, setTicketsData] = useState([]);

  useEffect(() => {
    loadTickets();
  }, []);

  const loadTickets = () => {
    try {
      const storedData = localStorage.getItem('excelData');
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        setTicketsData(parsedData);
      }
    } catch (error) {
      console.error('Error al cargar los datos de localStorage:', error);
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const updateTicketData = (updatedTicket, index) => {
    const newTicketsData = [...ticketsData];
    newTicketsData[index] = updatedTicket;
    setTicketsData(newTicketsData); // Update state to trigger re-render
    localStorage.setItem('excelData', JSON.stringify(newTicketsData)); // Save changes to localStorage
  };

  const filteredTickets = ticketsData.filter(ticket => {
    if (activeTab === 'open') {
      return ticket.currentStatus === 'Abierto';
    }
    if (activeTab === 'closed') {
      return ticket.currentStatus === 'Cerrado';
    }
    return true; // Returns all tickets for the 'all' tab
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
          Abiertos ({ticketsData.filter(t => t.currentStatus === 'Abierto').length})
        </button>
        <button
          className={`tab-button ${activeTab === 'closed' ? 'active' : ''}`}
          onClick={() => handleTabChange('closed')}
        >
          Cerrados ({ticketsData.filter(t => t.currentStatus === 'Cerrado').length})
        </button>
      </div>

      <div className='ticket-content'>

        <TicketList tickets={filteredTickets} onUpdateTicket={updateTicketData} />
      </div>


    </div>
  );
}

export default TicketPage;