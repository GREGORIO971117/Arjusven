import React from 'react';

const RenderDatosServicio = ({ data }) => {

  if (!data) {
    return null;
  }

  const InfoItem=({label,value})=>{
    if (!value) 
      {return value="Sin asignar";}
    else{
      return(
        <div className='infoItem'>
          <strong>{label}:<span>{value}</span></strong>
        </div>
      )}}


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

  <div className='infoSection'>

  <div className="section">
    <InfoItem label="Fecha de Asignación" value={assignmentDate} />
    <InfoItem label="Resolución" value={resolution} />
    <InfoItem label="Situación Actual" value={currentStatus} />
    <InfoItem label="Nombre de ESS" value={title} />
    <InfoItem label="Incidencia" value={caseNumber} />
    <InfoItem label="Código de Afiliado" value={affiliateCode} />
  </div>

  <div className="section">
    <InfoItem label="Supervisor" value={supervisor} />
    <InfoItem label="ID Merchant" value={idMerchant} />
    <InfoItem label="Tipo de Servicio" value={serviceType} />
    <InfoItem label="Técnico de Campo" value={fieldTechnician} />
    <InfoItem label="SLA" value={sla} />
  </div>

  <div className="section">
    <InfoItem label="Motivo del Servicio" value={onSiteReason} />
    <InfoItem label="Motivo real del Servicio en sitio" value={serviceReason} />
    <InfoItem label="Observaciones ARJUSVEN" value={observations} />
    <InfoItem label="Dirección" value={address} />
  </div>

  <div className="section">
    <InfoItem label="Guía de Encomienda" value={encomiendaGuide} />
    <InfoItem label="Fecha de envío de guía" value={guideSendDate} />
  </div>
  </div>
</>

  );
};

export default RenderDatosServicio;