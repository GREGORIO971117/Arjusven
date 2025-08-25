import React, { useState } from 'react';
import './TicketTemplate.css';
import RenderSolicitudDeServicio from './ticketTemplateServicios';
import RenderSolicitudDeAdicionales from './ticketTemplateAdicionales'; // Corrección del typo en el nombre del archivo.
import RenderEditarDatosServicio from './ticketEditarServicios';
import RenderEditarDatosAdicionales from './ticketEditarAdicionales';

function TicketTemplate({ data, onUpdateTicket, index, onGoBack }) {
  const [activeTab, setActiveTab] = useState('solicitud');
  const [editableData, setEditableData] = useState(data);

  if (!data) {
    return <div>No se ha proporcionado información de ticket.</div>;
  }

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleInputChange = (section, field, value) => {
    setEditableData(prevData => ({
      ...prevData,
      [section]: {
        ...prevData[section],
        [field]: value
      }
    }));
  };

  const handleSave = () => {
    if (onSave) {
      onSave(editableData);
    }
    handleTabChange('solicitud');
  };

  const handleCancel = () => {
    setEditableData(data);
    handleTabChange('solicitud');
    onGoBack();
  };

  return (
    <div className="ticket-container">
      <div className="ticket-header">
        <h1>{editableData.ticketNumber} {editableData.title}</h1>
        <p>{editableData.subTitle}</p>
      </div>

      <div className="ticket-tabs">
        <button
          className={`tab-button ${activeTab === 'solicitud' ? 'active' : ''}`}
          onClick={() => handleTabChange('solicitud')}
        >
          Solicitud de Servicio
        </button>
        <button
          className={`tab-button ${activeTab === 'adicionales' ? 'active' : ''}`}
          onClick={() => handleTabChange('adicionales')}
        >
          Datos Adicionales
        </button>
        <button
          className={`tab-button ${activeTab === 'editarServicio' ? 'active' : ''}`}
          onClick={() => handleTabChange('editarServicio')}
        >
          Editar datos de Servicio
        </button>
        <button
          className={`tab-button ${activeTab === 'editarAdicionales' ? 'active' : ''}`}
          onClick={() => handleTabChange('editarAdicionales')}
        >
          Editar datos adicionales
        </button>
      </div>

      <div className="ticket-content">
        
        {activeTab === 'solicitud' && <RenderSolicitudDeServicio editableData={editableData} onEdit={() => handleTabChange('editar')} />}
        {activeTab === 'adicionales' && <RenderSolicitudDeAdicionales editableData={editableData} onEdit={() => handleTabChange('editar')} />}
        {activeTab === 'editarServicio' && (<RenderEditarDatosServicio editableData={editableData} handleInputChange={handleInputChange} handleSave={handleSave} handleCancel={handleCancel}/>)}
        {activeTab === 'editarAdicionales' && (<RenderEditarDatosAdicionales editableData={editableData} handleInputChange={handleInputChange} handleSave={handleSave} handleCancel={handleCancel} />)}
      </div>
    </div>
  );


  
}

export default TicketTemplate;