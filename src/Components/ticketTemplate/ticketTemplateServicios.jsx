function RenderSolicitudDeServicio({ editableData }) {
  

  return (
    <>
      <div className="info-section">
        <div className="info-column">
          <p><strong>Fecha de Asignación</strong></p>
          <p>{editableData.serviceRequest.assignmentDate}</p>
        </div>
        <div className="info-column">
          <p><strong>Resolución</strong></p>
          <p>{editableData.serviceRequest.resolution}</p>
        </div>
        <div className="info-column">
          <p><strong>Situación Actual</strong></p>
          <p>{editableData.serviceRequest.currentStatus}</p>
        </div>
        <div className="info-column">
          <p><strong>Nombre de ESS</strong></p>
          <p>{editableData.serviceRequest.essName}</p>
        </div>
        <div className="info-column">
          <p><strong>No de Caso</strong></p>
          <p>{editableData.serviceRequest.caseNumber}</p>
        </div>
        <div className="info-column">
          <p><strong>Código de Afiliado</strong></p>
          <p>{editableData.serviceRequest.affiliateCode}</p>
        </div>
        <div className="info-column">
          <p><strong>AFILIACION</strong></p>
          <p>{editableData.serviceRequest.affiliation}</p>
        </div>
        <div className="info-column">
          <p><strong>Afiliado ATPV</strong></p>
          <p>{editableData.serviceRequest.atpvAffiliate}</p>
        </div>
        <div className="info-column">
          <p><strong>ID ATPV</strong></p>
          <p>{editableData.serviceRequest.atpvID}</p>
        </div>
        <div className="info-column">
          <p><strong>Motivo del Servicio</strong></p>
          <p>{editableData.serviceRequest.serviceReason}</p>
        </div>
      </div>
      <div className="info-section">
        <div className="info-column">
          <p><strong>Contrato relacionado</strong></p>
          <p>{editableData.contactInfo.relatedContract}</p>
        </div>
        <div className="info-column">
          <p><strong>Cliente</strong></p>
          <p>{editableData.contactInfo.client}</p>
        </div>
        <div className="info-column">
          <p><strong>Persona de contacto</strong></p>
          <p>{editableData.contactInfo.contactPerson.creator}</p>
          <p>{editableData.contactInfo.contactPerson.supervisor}</p>
        </div>
        <div className="info-column">
          <p><strong>TIPO DE SERVICIO</strong></p>
          <p>{editableData.contactInfo.serviceType}</p>
        </div>
        <div className="info-column">
          <p><strong>Técnico de Campo</strong></p>
          <p>{editableData.contactInfo.fieldTechnician}</p>
        </div>
        <div className="info-column">
          <p><strong>SLA</strong></p>
          <p>{editableData.contactInfo.sla}</p>
        </div>
      </div>
      <div className="full-width-section">
        <p><strong>Motivo real del Servicio en sitio</strong></p>
        <p>{editableData.serviceDetails.onSiteReason}</p>
      </div>
      <div className="full-width-section">
        <p><strong>Observaciones ARJUSVEN</strong></p>
        <p>{editableData.serviceDetails.observations}</p>
      </div>
      <div className="full-width-section">
        <p><strong>Dirección</strong></p>
        <p>{editableData.serviceDetails.address}</p>
      </div>
      <div className="bottom-info">
        <div className="info-column">
          <p><strong>Guía de Encomienda</strong></p>
          <p>{editableData.bottomInfo.encomiendaGuide}</p>
        </div>
        <div className="info-column">
          <p><strong>Fecha de envío de guía</strong></p>
          <p>{editableData.bottomInfo.guideSendDate}</p>
        </div>
      </div>
      <div className="button-container">
        <button className="edit-button" onClick={() => handleTabChange('editar')}>
          Editar datos
        </button>
      </div>
    </>
  );
}

export default RenderSolicitudDeServicio;