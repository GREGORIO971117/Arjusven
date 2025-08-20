import React, { useState, useEffect } from 'react';
import TicketTemplate from './TicketTemplate';
import { useNavigate } from 'react-router-dom';
import ticketsData from '../../assets/ticketsData.json';

function TicketPage() {
  const [ticketData, setTicketData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Inicializa el hook de navegación

  useEffect(() => {
    // Simula una llamada a la API con un retraso
    setTimeout(() => {
      setTicketData(ticketsData);
      setLoading(false);
    }, 1500);
  }, []);

  const handleAddTicket = () => {
    // Redirige al usuario a la ruta del formulario de Service Request
    navigate('/tickets/add');
  };

  if (loading) {
    return <div>Cargando plantilla de ticket...</div>;
  }

  return (
    <div>
      <button onClick={handleAddTicket} className="add-button">
        Agregar
      </button>
      <button className="add-button">
        Tickets Pendientes
      </button>
      <button className="add-button">
        Tickets Cerrados
      </button>

     <TicketTemplate data={ticketData} />
    </div>
  );
}

export default TicketPage;