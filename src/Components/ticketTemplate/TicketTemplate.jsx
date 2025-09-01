import React, { useState } from 'react';
import RenderDatosServicio from './RenderDataServicios';
import RenderDatosAdicionales from './RenderDataAdicionales';
import RenderEditarDatosServicio from './EditDataServicios';
import RenderEditarDatosAdicionales from './EditDataAdicionales';
import getFormattedTicketData from './Utils';
import './TicketTemplate.css';

const TicketTemplate = ({ data, onUpdateTicket, onGoBack,handleDelete}) => {
  const [activeTab, setActiveTab] = useState('servicio');
  const [isEditing, setIsEditing] = useState(false);
  const [editableData, setEditableData] = useState(getFormattedTicketData(data));

  const handleInputChange = (section, field, value) => {
    setEditableData(prevData => ({
      ...prevData,
      [section]: {
        ...prevData[section],
        [field]: value,
      },
    }));
  };
  
  const handleSave = () => {
    const updatedTicket = {
      ...data,
      ...editableData.serviceRequest,
      ...editableData.contactInfo,
      ...editableData.serviceDetails,
      ...editableData.bottomInfo,
      ...editableData.additionalData,
    };
    
    updatedTicket.Incidencia = data.Incidencia;

    onUpdateTicket(updatedTicket);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditableData(getFormattedTicketData(data));
  };

  const handleDownload = () => {
    // La lógica para generar y descargar el archivo de Word va aquí
    alert('La función de descarga está pendiente de implementación.');
  };

  const renderContent = () => {
    if (isEditing) {
      if (activeTab === 'servicio') {
        return <RenderEditarDatosServicio editableData={editableData} handleInputChange={handleInputChange} handleSave={handleSave} handleCancel={handleCancel} handleDelete={handleDelete} />;
      }
      if (activeTab === 'adicionales') {
        return <RenderEditarDatosAdicionales editableData={editableData} handleInputChange={handleInputChange} handleSave={handleSave} handleCancel={handleCancel} />;
      }
    } else {
      if (activeTab === 'servicio') {
        return <RenderDatosServicio editableData={editableData} />;
      }
      if (activeTab === 'adicionales') {
        return <RenderDatosAdicionales editableData={editableData} />;
      }
    }
    return null;
  };

  return (
    <div className="ticket-template-container">
      <div className="ticket-header">
        <h2 className="ticket-title">{data['Nombre de ESS']}</h2>
        <div className="ticket-actions">
          <button onClick={onGoBack} className="back-button">← Regresar</button>
          {!isEditing && (
            <button onClick={() => setIsEditing(true)} className="edit-button">Editar</button>
          )}
          <button onClick={handleDownload} className="download-button">Descargar</button>
        </div>
      </div>
      <div className="ticket-tabs">
        <button
          className={`tab-button ${activeTab === 'servicio' ? 'active' : ''}`}
          onClick={() => setActiveTab('servicio')}
        >
          Solicitud de Servicio
        </button>
        <button
          className={`tab-button ${activeTab === 'adicionales' ? 'active' : ''}`}
          onClick={() => setActiveTab('adicionales')}
        >
          Datos Adicionales
        </button>

      </div>
      <div className="ticket-content">
        {renderContent()}
      </div>
    </div>
  );
};

export default TicketTemplate;