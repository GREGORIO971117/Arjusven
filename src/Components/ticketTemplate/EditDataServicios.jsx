import React from 'react';
import './TicketTemplate.css';

const RenderEditarDatosServicio = ({ editableData, handleInputChange, handleSave, handleCancel }) => {
  return (
    <div className="edit-form-container">
      <div className="info-section">
        <div className="info-column">
          <label>
            <strong>Fecha de Asignación</strong>
            <input
              type="text"
              value={editableData.serviceRequest?.assignmentDate || ''}
              onChange={(e) => handleInputChange('serviceRequest', 'assignmentDate', e.target.value)}
            />
          </label>
          <label>
            <strong>Resolución</strong>
            <input
              type="text"
              value={editableData.serviceRequest?.resolution || ''}
              onChange={(e) => handleInputChange('serviceRequest', 'resolution', e.target.value)}
            />
          </label>
          <label>
            <strong>Situación Actual</strong>
            <input
              type="text"
              value={editableData.serviceRequest?.currentStatus || ''}
              onChange={(e) => handleInputChange('serviceRequest', 'currentStatus', e.target.value)}
            />
          </label>
          <label>
            <strong>Nombre de ESS</strong>
            <input
              type="text"
              value={editableData.serviceRequest?.essName || ''}
              onChange={(e) => handleInputChange('serviceRequest', 'essName', e.target.value)}
            />
          </label>
          <label>
            <strong>No de Caso</strong>
            <input
              type="text"
              value={editableData.serviceRequest?.caseNumber || ''}
              onChange={(e) => handleInputChange('serviceRequest', 'caseNumber', e.target.value)}
            />
          </label>
          <label>
            <strong>Código de Afiliado</strong>
            <input
              type="text"
              value={editableData.serviceRequest?.affiliateCode || ''}
              onChange={(e) => handleInputChange('serviceRequest', 'affiliateCode', e.target.value)}
            />
          </label>

          <label>
            <strong>Supervisor</strong>
            <input
              type="text"
              value={editableData.serviceRequest?.atpvID || ''}
              onChange={(e) => handleInputChange('serviceRequest', 'atpvID', e.target.value)}
            />
          </label>

          <label>
            <strong>Tipo de Servicio</strong>
            <input
              type="text"
              value={editableData.serviceRequest?.atpvID || ''}
              onChange={(e) => handleInputChange('serviceRequest', 'atpvID', e.target.value)}
            />
          </label>

          <label>
            <strong>Técnico de Campo</strong>
            <input
              type="text"
              value={editableData.serviceRequest?.atpvID || ''}
              onChange={(e) => handleInputChange('serviceRequest', 'atpvID', e.target.value)}
            />
          </label>

          <label>
            <strong>SLA</strong>
            <input
              type="text"
              value={editableData.serviceRequest?.atpvID || ''}
              onChange={(e) => handleInputChange('serviceRequest', 'atpvID', e.target.value)}
            />
          </label>

        </div>
       
      </div>
      <div className="full-width-section">
        <label>
          <strong>Motivo del Servicio</strong>
          <textarea
            value={editableData.serviceRequest?.serviceReason || ''}
            onChange={(e) => handleInputChange('serviceRequest', 'serviceReason', e.target.value)}
          />
        </label>
      </div>
      <div className="full-width-section">
        <label>
          <strong>Motivo real del Servicio en sitio</strong>
          <textarea
            value={editableData.serviceDetails?.onSiteReason || ''}
            onChange={(e) => handleInputChange('serviceDetails', 'onSiteReason', e.target.value)}
          />
        </label>

    

        <label>
          <strong>Observaciones ARJUSVEN</strong>
          <textarea
            value={editableData.serviceDetails?.observations || ''}
            onChange={(e) => handleInputChange('serviceDetails', 'observations', e.target.value)}
          />
        </label>
        <label>
          <strong>Dirección</strong>
          <textarea
            value={editableData.serviceDetails?.address || ''}
            onChange={(e) => handleInputChange('serviceDetails', 'address', e.target.value)}
          />
        </label>
      </div>



      <div className="full-width-section">
        <label>
          <strong>Guía de Encomienda</strong>
          <input
            type="text"
            value={editableData.bottomInfo?.encomiendaGuide || ''}
            onChange={(e) => handleInputChange('bottomInfo', 'encomiendaGuide', e.target.value)}
          />
        </label>
        <label>
          <strong>Fecha de envío de guía</strong>
          <input
            type="text"
            value={editableData.bottomInfo?.guideSendDate || ''}
            onChange={(e) => handleInputChange('bottomInfo', 'guideSendDate', e.target.value)}
          />
        </label>
      </div>
      <div className="button-container">
        <button className="save-button" onClick={handleSave}>Guardar</button>
        <button className="cancel-button" onClick={handleCancel}>Cancelar</button>
      </div>
    </div>
  );
};

export default RenderEditarDatosServicio;