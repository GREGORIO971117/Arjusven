import React from 'react';
import TicketTemplate from './TicketTemplate';

function TicketList({ tickets, onUpdateTicket }) {
  if (tickets.length === 0) {
    return <div>No hay tickets disponibles para esta clasificación.</div>;
  }

  return (
    <div className="ticket-list-container">
      {tickets.map((ticket, index) => (
        <TicketTemplate
          key={index} data={{
            ticketNumber: ticket.Incidencia,
            title: "Solicitud de Servicio",
            subTitle: "Detalles del caso",
            serviceRequest: {
              assignmentDate: "N/A",
              resolution: "N/A",
              currentStatus: "Abierto",
              essName: "N/A",
              caseNumber: ticket.Incidencia,
              affiliateCode: ticket.Afiliado,
              affiliation: ticket["Afiliado ATPV"],
              atpvAffiliate: ticket["Afiliado ATPV"],
              atpvID: ticket["ID ATPV "],
              serviceReason: ticket.Detalle,
            },
            contactInfo: {
              relatedContract: "N/A",
              client: ticket["Nombre Afiliado"],
              contactPerson: {
                creator: "N/A",
                supervisor: "N/A",
              },
              serviceType: ticket["Aplicación , Prioridad "],
              fieldTechnician: "N/A",
              sla: "N/A",
            },
            serviceDetails: {
              onSiteReason: ticket.Detalle,
              observations: ticket.Observaciones,
              address: "N/A",
            },
            bottomInfo: {
              encomiendaGuide: ticket["Insumo a enviar"],
              guideSendDate: "N/A",
            },
            additionalData: {
              ciudad: "N/A",
              cantidadTPV: "N/A",
              modeloEntra: "N/A",
              marcaEntra: "N/A",
              serieLogicaEntra: "N/A",
              serieFisicaEntra: ticket["Serie reportada"],
              versionBrowser: "N/A",
              tipoComunicacion: "N/A",
              simEntra: "N/A",
              ptidEntra: "N/A",
              eliminadorEntra: "N/A",
              eliminadorSale: "N/A",
              estado: "N/A",
              ordenDeServicio: "N/A",
              modeloSale: ticket["Modelo Reportado"],
              marcaSale: "N/A",
              serieLogicaSale: "N/A",
              serieFisicaSale: "N/A",
              versionBrowserSale: "N/A",
              tipoComunicacionSale: "N/A",
              simSale: "N/A",
              ptidSale: "N/A",
              plaza: "N/A",
              tecnico: "N/A",
              cerroPuntoClave: "N/A",
              atencionEnPunto: "N/A",
              firmaEnEstacion: "N/A",
              tarjetaTag: "N/A",
              serieStock: "N/A",
              simStock: "N/A",
              modeloStock: "N/A",
            }
          }}
          
          onUpdateTicket={onUpdateTicket} // Pasa la función como prop
          index={index} // Pasa el índice para identificar el ticket
        />
      ))}
    </div>
  );
}

export default TicketList;

