import React, { useState, useEffect } from 'react';
import TicketTemplate from './TicketTemplate';
import ServiceRequestForm from '../Service/ServiceRequestForm';
import ticketsData from '../../assets/ticketsData.json';
import './TicketPage.css';

// Clave para localStorage
const LOCAL_STORAGE_KEY = 'ticketsList';

function TicketPage() {
  const [ticketsList, setTicketsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentStatusFilter, setCurrentStatusFilter] = useState(null);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [isAddingNew, setIsAddingNew] = useState(false);

  useEffect(() => {
    // Intenta cargar desde localStorage
    const savedTickets = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (savedTickets) {
      setTicketsList(savedTickets);
    } else {
      // Si no hay datos, usa los del JSON de prueba y los guarda
      setTicketsList(ticketsData);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(ticketsData));
    }
    setLoading(false);
  }, []);

  const addNewTicket = (newTicket) => {
    // 1. Añade el nuevo ticket al estado
    const updatedList = [newTicket, ...ticketsList];
    setTicketsList(updatedList);
    
    // 2. Guarda la lista actualizada en localStorage
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedList));

    // 3. Vuelve a la vista de la lista de tickets
    setIsAddingNew(false);
    setCurrentStatusFilter("abierta");
    setSelectedTicket(null);
  };

  const handleAddTicket = () => {
    setIsAddingNew(true);
  };

  const handleFilterChange = (status) => {
    setCurrentStatusFilter(status);
    setSelectedTicket(null);
    setIsAddingNew(false);
  };

  const handleTicketSelect = (ticket) => {
    setSelectedTicket(ticket);
    setIsAddingNew(false);
  };
  
  const handleBackToList = () => {
    setSelectedTicket(null);
  };

  const filteredTickets = ticketsList.filter(ticket => {
    if (currentStatusFilter === 'all') {
      return true;
    }
    if (ticket.serviceRequest && ticket.serviceRequest.currentStatus) {
      return ticket.serviceRequest.currentStatus === currentStatusFilter;
    }
    return false;
  });

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (isAddingNew) {
    return (
      <>
        <button onClick={() => setIsAddingNew(false)} className="back-button">Volver</button>
        <ServiceRequestForm addNewTicket={addNewTicket} />
      </>
    );
  }
  
  if (selectedTicket) {
    return (
      <div>
        <button onClick={handleBackToList} className="back-button">Volver a la lista</button>
        <TicketTemplate data={selectedTicket} />
      </div>
    );
  }

  return (
    <div>
      <div className="button-group">
        <button 
          onClick={() => handleFilterChange('abierta')} 
          className={`filter-button ${currentStatusFilter === 'abierta' ? 'active' : ''}`}
        >
          Tickets Abiertos
        </button>
        <button 
          onClick={() => handleFilterChange('cerrada')} 
          className={`filter-button ${currentStatusFilter === 'cerrada' ? 'active' : ''}`}
        >
          Tickets Cerrados
        </button>
        <button 
          onClick={() => handleFilterChange('all')} 
          className={`filter-button ${currentStatusFilter === 'all' ? 'active' : ''}`}
        >
          Todos los Tickets
        </button>
      </div>

      {currentStatusFilter && (
        <div className="ticket-list-container">
          <button onClick={handleAddTicket} className="add-button">
            Agregar Ticket
          </button>
          
          {filteredTickets.length === 0 ? (
            <div>No hay tickets con el estado seleccionado.</div>
          ) : (
            filteredTickets.map((ticket, index) => (
              <button 
                key={index}
                onClick={() => handleTicketSelect(ticket)}
                className="ticket-item-button"
              >
                <strong>{ticket.ticketNumber || ticket.serviceRequest.caseNumber}</strong> - {ticket.title || ticket.contactInfo.client}
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default TicketPage;