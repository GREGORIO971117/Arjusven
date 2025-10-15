import React from 'react';

const RenderDatosServicio = ({ data,onEdit,activeTab,setActiveTab,isEditing,setIsEditing}) => { // Agregué setIsEditing a los props para que funcione el botón de Editar

 if (!data) {
  return null;
 }

 const InfoItem=({label,value})=>{
 
   return(
    <div className='infoItem'>
     <strong>{label}:<span>{value}</span></strong>
    </div>
   )}

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
 

 <div className="ticket-tabs">
    <div className="tabs-container">
     <button
      className={`tab-button ${activeTab === 'servicio' ? 'active' : ''}`}
      onClick={() => setActiveTab('servicio')}
     >
      Datos de Servicio
     </button>
     <button
      className={`tab-button ${activeTab === 'adicionales' ? 'active' : ''}`}
      onClick={() => setActiveTab('adicionales')}
     >
      Datos Adicionales
     </button>
    </div>
    <h2 className="title">
          <strong> {data.title}</strong>
    </h2>

    <div className="ticket-actions">
     {!isEditing && (
      <>
      <button onClick={() => setIsEditing(true)} className="edit-button">
       Editar
      </button>
      
      </>
     )}

     <button className="download-button">
        Descargar
      </button>  
    </div>
 </div>

 <div className='infoSection'>

 <div className="section">
  <InfoItem label="Fecha de Asignación" value={assignmentDate} />
  <InfoItem label="Resolución" value={resolution} />
  <InfoItem label="Situación Actual" value={currentStatus} />
  <InfoItem label="Nombre de ESS" value={title} />
  <InfoItem label="Incidencia" value={caseNumber} />
  <InfoItem label="Código de Afiliado" value={affiliateCode} />
  <InfoItem label="Supervisor" value={supervisor} />
  <InfoItem label="ID Merchant" value={idMerchant} />
  <InfoItem label="Tipo de Servicio" value={serviceType} />
 </div>

 <div className="section">
  <InfoItem label="Motivo del Servicio" value={onSiteReason} />
  <InfoItem label="Motivo real del Servicio en sitio" value={serviceReason} />
  <InfoItem label="Observaciones ARJUSVEN" value={observations} />
  <InfoItem label="Guía de Encomienda" value={encomiendaGuide} />
  <InfoItem label="Fecha de envío de guía" value={guideSendDate} />
  <InfoItem label="Dirección" value={address} />
  <InfoItem label="Técnico de Campo" value={fieldTechnician} />
  <InfoItem label="SLA" value={sla} />
 </div>
 </div>
</>

 );
};

export default RenderDatosServicio;