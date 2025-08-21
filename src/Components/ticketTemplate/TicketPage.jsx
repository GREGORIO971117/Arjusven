import React, { useState, useEffect } from 'react';
import TicketTemplate from './TicketTemplate';
import { useNavigate } from 'react-router-dom';
import ticketsData from '../../assets/ticketsData.json'; 

function TicketPage() {
  const [ticketsList, setTicketsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentStatusFilter, setCurrentStatusFilter] = useState('all'); 
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setTicketsList(ticketsData);
      setLoading(false);
    }, 1500);
  }, []);

  const handleAddTicket = () => {
    navigate('/tickets/add');
  };

  const handleFilterChange = (status) => {
    setCurrentStatusFilter(status);
  };

  const filteredTickets = ticketsList.filter(ticket => {
    if (currentStatusFilter === 'all') {
      return true;
    }
    return ticket.serviceRequest.currentStatus === currentStatusFilter;
  });

  if (loading) {
    return <div>Cargando plantilla de tickets...</div>;
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

      <button onClick={handleAddTicket} className="add-button">
        Agregar
      </button>

      {/* Se renderiza la lista filtrada de tickets */}
      {filteredTickets.map((ticket, index) => (
        <TicketTemplate key={index} data={ticket} />
      ))}
    </div>
  );
}

export default TicketPage;