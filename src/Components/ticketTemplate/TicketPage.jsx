import React, { useState, useEffect } from 'react';
import ServiceRequestForm from '../Service/ServiceRequestForm';
import TicketList from '../Service/ticketList';

function TicketPage() {
  const [ticketsData, setTicketsData] = useState([]);
  const [filter, setFilter] = useState('all');

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
      console.error("Error al cargar los datos de localStorage:", error);
    }
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  // Función para actualizar los datos, llamada desde los componentes hijos
  const updateTicketData = (updatedTicket, index) => {
  const newTicketsData = [...ticketsData];
  newTicketsData[index] = updatedTicket;
  
  // Guarda los cambios en el estado y en localStorage
  setTicketsData(newTicketsData);
  localStorage.setItem('excelData', JSON.stringify(newTicketsData));
};

  const filteredTickets = ticketsData.filter(ticket => {
    if (filter === 'open') {
      return ticket.currentStatus === 'Abierto';
    }
    if (filter === 'closed') {
      return ticket.currentStatus === 'Cerrado';
    }
    return true;
  });

  return (
    <div className="ticket-page-container">
      <h1>Gestión de Tickets de Servicio</h1>
      <p>Sube un archivo de Excel para ver los tickets generados.</p>
      <ServiceRequestForm />

      <div className="ticket-filter-buttons">
        <button
          onClick={() => handleFilterChange('all')}
          className={filter === 'all' ? 'active' : ''}
        >
          Todos ({ticketsData.length})
        </button>
        <button
          onClick={() => handleFilterChange('open')}
          className={filter === 'open' ? 'active' : ''}
        >
          Abiertos ({ticketsData.filter(t => t.currentStatus === 'Abierto').length})
        </button>
        <button
          onClick={() => handleFilterChange('closed')}
          className={filter === 'closed' ? 'active' : ''}
        >
          Cerrados ({ticketsData.filter(t => t.currentStatus === 'Cerrado').length})
        </button>
      </div>

      <TicketList tickets={filteredTickets} onUpdateTicket={updateTicketData} />
    </div>
  );
}

export default TicketPage;