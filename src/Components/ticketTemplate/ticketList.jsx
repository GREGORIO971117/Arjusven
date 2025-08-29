import React, { useState, useEffect } from 'react';
import './TicketList.css'; 

const TicketList = ({ tickets, onSelectTicket }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  const [filterStatus, setFilterStatus] = useState('Todos');
    // Nuevo estado para guardar el ticket seleccionado
  const [selectedTicketId, setSelectedTicketId] = useState(null);

  const [sortedTickets, setSortedTickets] = useState([]);

  useEffect(() => {
   const ticketsCopy = [...tickets];
   
   const sorted = ticketsCopy.sort((a, b) => {
     const dateA = a['Fecha de Asignación'] ? new Date(a['Fecha de Asignación'].split('/').reverse().join('-')) : new Date(0);
     const dateB = b['Fecha de Asignación'] ? new Date(b['Fecha de Asignación'].split('/').reverse().join('-')) : new Date(0);
     return dateB - dateA;
   });

   setSortedTickets(sorted);
   setCurrentPage(1);
  }, [tickets]);

  const filteredTickets = sortedTickets.filter(ticket => {
    if (filterStatus === 'Todos') {
      return true;
    }
    return ticket.currentStatus === filterStatus;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  
  const currentTickets = filteredTickets.slice(indexOfFirstItem, indexOfLastItem);
  
  const totalPages = Math.ceil(filteredTickets.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

    // Función para manejar el clic en un ticket
    const handleTicketClick = (ticket) => {
        setSelectedTicketId(ticket.Incidencia); // Guarda el ID del ticket seleccionado
        onSelectTicket(ticket); // Llama a la función del componente padre
    };

  return (
    <div className="ticket-list">
      <h2>Tickets Subidos</h2>
      
      <div className="filter-buttons">
        <button 
          className={filterStatus === 'Todos' ? 'active' : ''}
          onClick={() => setFilterStatus('Todos')}>
          Todos
        </button>
        <button 
          className={filterStatus === 'Abierto' ? 'active' : ''}
          onClick={() => setFilterStatus('Abierto')}>
          Abiertos
        </button>
        <button 
          className={filterStatus === 'Cerrado' ? 'active' : ''}
          onClick={() => setFilterStatus('Cerrado')}>
          Cerrados
        </button>
      </div>

      {tickets.length === 0 ? (
        <p>No hay tickets para mostrar.</p>
      ) : (
        <>
          <ul>
            {currentTickets.map(ticket => (
              <li
                key={ticket.Incidencia}
                                // Usamos una condicional para agregar la clase 'selected'
                className={`ticket-item ${ticket.Incidencia === selectedTicketId ? 'selected' : ''}`}
                                // Se usa la nueva función para el click
                onClick={() => handleTicketClick(ticket)}
              >
                <div className="ticket-info">
                  <strong>{ticket.Incidencia}</strong>
                  <strong>{ticket["Nombre Afiliado"]}</strong>  
                </div>
              </li>
            ))}
          </ul>

          {totalPages > 1 && (
            <div className="pagination-controls">
              <button onClick={handlePreviousPage} disabled={currentPage === 1}>
                Anterior
              </button>
              <span>Página {currentPage} de {totalPages}</span>
              <button onClick={handleNextPage} disabled={currentPage === totalPages}>
                Siguiente
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default TicketList;