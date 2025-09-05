import React, { useState } from 'react';
import RenderDatosServicio from './RenderDataServicios';
import RenderDatosAdicionales from './RenderDataAdicionales';
import RenderEditarDatosServicio from './EditDataServicios';
import RenderEditarDatosAdicionales from './EditDataAdicionales';
import datosEstaticos from '../../assets/datos.json';

const TicketTemplate = ({data,onGoBack,}) => {
  const [activeTab, setActiveTab] = useState('servicio');
  const [isEditing, setIsEditing] = useState(false);
  

  const handleDownload = () => {
    // This logic would interact with a backend endpoint to generate and download the file
    // Example: fetch('/api/download-word', { method: 'POST', body: JSON.stringify(data) })...
    alert('La función de descarga está pendiente de implementación en el backend.');
  };

  const renderContent = () => {
    if (isEditing) {
      if (activeTab === 'servicio') {
        return (
          <RenderEditarDatosServicio
            data={data}
            datosEstaticos={datosEstaticos}
            onCancelEdit={() => setIsEditing(false)}
          />
        );
      }
      if (activeTab === 'adicionales') {
        return (
          <RenderEditarDatosAdicionales
            data={data}
            datosEstaticos={datosEstaticos}
            onCancelEdit={() => setIsEditing(false)}
          />
        );
      }
    } else {
      if (activeTab === 'servicio') {
        return <RenderDatosServicio data={data} />;
      }
      if (activeTab === 'adicionales') {
        return <RenderDatosAdicionales data={data} />;
      }
    }
    return null;
  };

  return (
    <div className="ticket-template-container">
      <div className="ticket-header">
        <h2 className="ticket-title">{data['Nombre de ESS']}</h2>
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
        <div className="ticket-actions">
          <button onClick={onGoBack} className="back-button">
            ← Regresar
          </button>

          {!isEditing && (
            <button onClick={() => setIsEditing(true)} className="edit-button">
              Editar
            </button>
          )}
          
          <button onClick={handleDownload} className="download-button">
            Descargar
          </button>
        </div>
      </div>
      <div className="ticket-content">{renderContent()}</div>
    </div>
  );
};

export default TicketTemplate;