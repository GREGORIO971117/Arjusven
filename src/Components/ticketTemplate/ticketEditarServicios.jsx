import React from 'react';

const RenderEditarDatosServicio = ({ editableData, handleInputChange, handleSave, handleCancel }) => {
  if (!editableData) {
    return <div>No se ha proporcionado información para editar.</div>;
  }

  return (
    <>
      <div className="form-section">
        <h3>Datos de Solicitud de Servicio</h3>
        <div className="input-group">
          <label>No de Caso</label>
          <input
            type="text"
            value={editableData.serviceRequest.caseNumber}
            onChange={(e) => handleInputChange('serviceRequest', 'caseNumber', e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>Motivo del Servicio</label>
          <input
            type="text"
            value={editableData.serviceRequest.serviceReason}
            onChange={(e) => handleInputChange('serviceRequest', 'serviceReason', e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>Fecha de Asignación</label>
          <input
            type="text"
            value={editableData.serviceRequest.assignmentDate}
            onChange={(e) => handleInputChange('serviceRequest', 'assignmentDate', e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>Resolución</label>
          <input
            type="text"
            value={editableData.serviceRequest.resolution}
            onChange={(e) => handleInputChange('serviceRequest', 'resolution', e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>Situación Actual</label>
          <input
            type="text"
            value={editableData.serviceRequest.currentStatus}
            onChange={(e) => handleInputChange('serviceRequest', 'currentStatus', e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>Nombre de ESS</label>
          <input
            type="text"
            value={editableData.serviceRequest.essName}
            onChange={(e) => handleInputChange('serviceRequest', 'essName', e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>Código de Afiliado</label>
          <input
            type="text"
            value={editableData.serviceRequest.affiliateCode}
            onChange={(e) => handleInputChange('serviceRequest', 'affiliateCode', e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>Afiliación</label>
          <input
            type="text"
            value={editableData.serviceRequest.affiliation}
            onChange={(e) => handleInputChange('serviceRequest', 'affiliation', e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>Afiliado ATPV</label>
          <input
            type="text"
            value={editableData.serviceRequest.atpvAffiliate}
            onChange={(e) => handleInputChange('serviceRequest', 'atpvAffiliate', e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>ID ATPV</label>
          <input
            type="text"
            value={editableData.serviceRequest.atpvID}
            onChange={(e) => handleInputChange('serviceRequest', 'atpvID', e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>Contrato relacionado</label>
          <input
            type="text"
            value={editableData.contactInfo.relatedContract}
            onChange={(e) => handleInputChange('contactInfo', 'relatedContract', e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>Cliente</label>
          <input
            type="text"
            value={editableData.contactInfo.client}
            onChange={(e) => handleInputChange('contactInfo', 'client', e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>Persona de contacto (Creador)</label>
          <input
            type="text"
            value={editableData.contactInfo.contactPerson.creator}
            onChange={(e) => handleInputChange('contactInfo', 'contactPerson', e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>Persona de contacto (Supervisor)</label>
          <input
            type="text"
            value={editableData.contactInfo.contactPerson.supervisor}
            onChange={(e) => handleInputChange('contactInfo', 'contactPerson', e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>Tipo de Servicio</label>
          <input
            type="text"
            value={editableData.contactInfo.serviceType}
            onChange={(e) => handleInputChange('contactInfo', 'serviceType', e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>Técnico de Campo</label>
          <input
            type="text"
            value={editableData.contactInfo.fieldTechnician}
            onChange={(e) => handleInputChange('contactInfo', 'fieldTechnician', e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>SLA</label>
          <input
            type="text"
            value={editableData.contactInfo.sla}
            onChange={(e) => handleInputChange('contactInfo', 'sla', e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>Motivo real del Servicio en sitio</label>
          <input
            type="text"
            value={editableData.serviceDetails.onSiteReason}
            onChange={(e) => handleInputChange('serviceDetails', 'onSiteReason', e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>Observaciones ARJUSVEN</label>
          <input
            type="text"
            value={editableData.serviceDetails.observations}
            onChange={(e) => handleInputChange('serviceDetails', 'observations', e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>Dirección</label>
          <input
            type="text"
            value={editableData.serviceDetails.address}
            onChange={(e) => handleInputChange('serviceDetails', 'address', e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>Guía de Encomienda</label>
          <input
            type="text"
            value={editableData.bottomInfo.encomiendaGuide}
            onChange={(e) => handleInputChange('bottomInfo', 'encomiendaGuide', e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>Fecha de envío de guía</label>
          <input
            type="text"
            value={editableData.bottomInfo.guideSendDate}
            onChange={(e) => handleInputChange('bottomInfo', 'guideSendDate', e.target.value)}
          />
        </div>
        <div className="button-container">
        <button className="save-button" onClick={handleSave}>Guardar Cambios</button>
        <button className="cancel-button" onClick={handleCancel}>Cancelar</button>
      </div>
      </div>
    </>
  );
};

export default RenderEditarDatosServicio;