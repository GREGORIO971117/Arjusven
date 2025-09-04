import React, { useState, useEffect } from 'react';
import InventarioList from './InventarioList';
import InventarioTemplate from './InventarioTemplate';
import './InventarioPage.css';

// Esta es una función simulada. En un proyecto real,
// harías una llamada a una API para obtener tus datos.
const fetchTicketsFromBackend = async () => {
  try {
    
    // Aquí iría tu lógica para llamar a una API real, por ejemplo,
    // const response = await fetch('https://api.tudominio.com/tickets');
    // const data = await response.json();
    // return data;
    // Para este ejemplo, retornamos datos de prueba.

    return [
      {
        Incidencia: 449434,
        "Aplicación , Prioridad ": "PRIORIDAD 1",
        Modelo: "N910",
        Teléfono: 6691537731,
        Afiliado: 123079193,
        "Nombre Afiliado": "PERICLES 50036",
        Detalle: "Dispositivo - Tamper/Alerta de Seguridad",
        currentDate: "4/9/2025",
        currentStatus: "Abierto"
      },
      // Puedes añadir más tickets de prueba aquí.
    ];
  } catch (error) {
    console.error("Error al obtener tickets del backend:", error);
    return [];
  }
};

function TicketPage() {
  const [ticketsData, setTicketsData] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchTicketsFromBackend();
      setTicketsData(data);
    };
    loadData();
  }, []);

  const updateTicketInBackend = async (updatedTicket) => {
    // Aquí iría tu lógica para enviar la actualización a una API real.
    // await fetch('https://api.tudominio.com/tickets', {
    //   method: 'PUT',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(updatedTicket)
    // });
    
    // Luego de la actualización exitosa, actualizamos el estado local.
    const newTicketsData = ticketsData.map(t =>
      t.Incidencia === updatedTicket.Incidencia ? updatedTicket : t
    );
    setTicketsData(newTicketsData);
    setSelectedTicket(updatedTicket);
  };

  const deleteTicketFromBackend = async () => {
    if (!selectedTicket) return;

    // Aquí iría tu lógica para enviar la eliminación a una API real.
    // await fetch(`https://api.tudominio.com/tickets/${selectedTicket.Incidencia}`, {
    //   method: 'DELETE'
    // });
    
    // Luego de la eliminación exitosa, actualizamos el estado local.
    const updatedTickets = ticketsData.filter(t => t.Incidencia !== selectedTicket.Incidencia);
    setTicketsData(updatedTickets);
    setSelectedTicket(null);
  };

  return (
    <div className="ticket-page-container">
      <div className='ticket-content-flex'>
        <div className="ticket-list-column">
          <InventarioList
            tickets={ticketsData}
            onSelectTicket={setSelectedTicket}
          />
        </div>

        <div className="ticket-template-column">
          {selectedTicket ? (
            <InventarioTemplate
              data={selectedTicket}
              onUpdateTicket={updateTicketInBackend}
              onGoBack={() => setSelectedTicket(null)}
              handleDelete={deleteTicketFromBackend}
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