import { useParams } from 'react-router-dom';
import TicketTemplate from './TicketTemplate';

function TicketWrapper({ tickets }) {
  const { index } = useParams(); 
  const ticketData = tickets[index];

  if (!ticketData) {
    return <div>Ticket no encontrado.</div>;
  }

  return <TicketTemplate data={ticketData} />;
}

export default TicketWrapper;