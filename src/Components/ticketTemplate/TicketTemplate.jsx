import React, { useState } from 'react';
import RenderDatosServicio from './RenderDataServicios';
import RenderDatosAdicionales from './RenderDataAdicionales';
import RenderEditarDatosServicio from './EditDataServicios';
import RenderEditarDatosAdicionales from './EditDataAdicionales';
import datosEstaticos from '../../assets/datos.json';

const TicketTemplate = ({data}) => {
  const [activeTab, setActiveTab] = useState('servicio');
  const [isEditing, setIsEditing] = useState(false);
  

  const handleDownload = () => {
    
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
        return (
          <RenderDatosServicio 
                data={data} 
                setActiveTab={setActiveTab}
                activeTab={activeTab}
                isEditing={isEditing}
                />
      );
    }
      if (activeTab === 'adicionales') {
        return( <RenderDatosAdicionales 
                  data={data} 
                  setActiveTab={setActiveTab}
                  activeTab={activeTab}
                  isEditing={isEditing}
                  />
        );
      }
    }
    return null;
  };

  return (
    <div className="ticket-template-container">
      <div className="ticket-header">
        <h2 className="ticket-title">{data['Nombre de ESS']}</h2>
      </div>

      <button onClick={handleDownload} className="download-button">
            Descargar
          </button>
      
      <div className="ticket-content">{renderContent()}</div>
    </div>
  );
};

export default TicketTemplate;