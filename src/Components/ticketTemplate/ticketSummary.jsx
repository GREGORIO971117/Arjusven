
const TicketSummary = ({ tickets, onUpdateTicket }) => {
  if (tickets.length === 0) {
    return <div>No hay tickets disponibles para esta clasificación.</div>;
  }  
  return (

    <div className="ticket-summary-card" onClick={onClick}>
      <div className="summary-field">
        <strong>No de Caso:</strong> {ticket.Incidencia}
      </div>
      <div className="summary-field">
        <strong>Nombre de ESS:</strong> {ticket.contactInfo.contactPerson.creator}
      </div>
    </div>
  );

  onUpdateTicket={onUpdateTicket} // Pasa la función como prop

};

export default TicketSummary;