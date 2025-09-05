import React from 'react';

const RenderDatosServicio = ({ data }) => {

  if (!data) {
    return null;
  }

  const {
    ticketNumber,
    title,
    subTitle,
    serviceRequest,
    contactInfo,
    serviceDetails,
    bottomInfo,
    additionalData
  } = data;
  
  // Destructuring the nested objects
  const { 
    assignmentDate, 
    resolution, 
    currentStatus, 
    essName, 
    caseNumber, 
    affiliateCode, 
    affiliation, 
    atpvAffiliate, 
    atpvID, 
    serviceReason,
    idMerchant 
  } = serviceRequest || {};
  
  const { 
    relatedContract, 
    client, 
    contactPerson, 
    serviceType, 
    fieldTechnician, 
    sla 
  } = contactInfo || {};
  
  const { 
    onSiteReason, 
    observations, 
    address 
  } = serviceDetails || {};
  
  const { 
    encomiendaGuide, 
    guideSendDate 
  } = bottomInfo || {};

  
  // Destructuring a nested object within another
  const { supervisor } = contactPerson || {};

  return (
    <>
      <h2 className="title">
        <strong>{caseNumber}-{title}</strong>
      </h2>
      <div className="infoSection">
        <div className="infoColumn">
          <div className="infoItem">
            <strong>Fecha de Asignación: </strong>
            <span>{assignmentDate}</span>
          </div>
          <div className="infoItem">
            <strong>Resolución: </strong>
            <span>{resolution}</span>
          </div>
          <div className="infoItem">
            <strong>Situación Actual: </strong>
            <span>{currentStatus}</span>
          </div>
          <div className="infoItem">
            <strong>Nombre de ESS: </strong>
            <span>{title}</span>
          </div>
          <div className="infoItem">
            <strong>Incidencia: </strong>
            <span>{caseNumber}</span>
          </div>
          <div className="infoItem">
            <strong>Código de Afiliado: </strong>
            <span>{affiliateCode}</span>
          </div>
        </div>
        <div className="infoColumn">
          <div className="infoItem">
            <strong>Supervisor: </strong>
            <span>{supervisor}</span>
          </div>
          <div className="infoItem">
            <strong>ID Merchant: </strong>
            <span>{idMerchant}</span>
          </div>
          <div className="infoItem">
            <strong>Tipo de Servicio: </strong>
            <span>{serviceType}</span>
          </div>
          <div className="infoItem">
            <strong>Técnico de Campo: </strong>
            <span>{fieldTechnician}</span>
          </div>
          <div className="infoItem">
            <strong>SLA: </strong>
            <span>{sla}</span>
          </div>
        </div>
      </div>
      
      <div className="fullWidthSection">
        <div className="infoItem">
          <strong>Motivo del Servicio: </strong>
          <span>{onSiteReason}</span>
        </div>
        <div className="infoItem">
          <strong>Motivo real del Servicio en sitio: </strong>
          <span>{serviceReason}</span>
        </div>
        <div className="infoItem">
          <strong>Observaciones ARJUSVEN: </strong>
          <span>{observations}</span>
        </div>
        <div className="infoItem">
          <strong>Dirección: </strong>
          <span>{address}</span>
        </div>
      </div>
      <div className="fullWidthSection">
        <div className="infoItem">
          <strong>Guía de Encomienda: </strong>
          <span>{encomiendaGuide}</span>
        </div>
        <div className="infoItem">
          <strong>Fecha de envío de guía: </strong>
          <span>{guideSendDate}</span>
        </div>
      </div>
    </>
  );
};

export default RenderDatosServicio;