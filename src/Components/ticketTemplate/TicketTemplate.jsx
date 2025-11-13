import React, { useState } from 'react';
import RenderDatosServicio from './RenderDataServicios';
import RenderDatosAdicionales from './RenderDataAdicionales';
import RenderEditarDatosServicio from './EditDataServicios';
import RenderEditarDatosAdicionales from './EditDataAdicionales';
import datosEstaticos from '../../assets/datos.json';

const TicketTemplate = ({data, onSaveService, onSaveAdicional, onDeleteService,handleDownload}) => {
  const [activeTab, setActiveTab] = useState('servicio');
  const [isEditing, setIsEditing] = useState(false);
  

  const renderContent = () => {
    if (isEditing) {
      if (activeTab === 'servicio') {
        return (
          <RenderEditarDatosServicio
            data={data.servicios}
            datosEstaticos={datosEstaticos}
            onCancelEdit={() => setIsEditing(false)}
            handleDownload={handleDownload}
            onSaveEdit={onSaveService}
            onDeleteEdit={onDeleteService}
          />
        );
      }
      if (activeTab === 'adicionales') {
        return (
          <RenderEditarDatosAdicionales
            data={data.adicionales}
            datosEstaticos={datosEstaticos}
            onCancelEdit={() => setIsEditing(false)}
            handleDownload={handleDownload}
            onSaveEdit={onSaveAdicional}
            onDeleteEdit={onDeleteService}
          />
        );
      }
    } else {
      if (activeTab === 'servicio') {
        return (
          <RenderDatosServicio 
                data={data.servicios} 
                setActiveTab={setActiveTab}
                setIsEditing={setIsEditing}
                activeTab={activeTab}
                isEditing={isEditing}
                handleDownload={handleDownload}
                />
      );
    }
      if (activeTab === 'adicionales') {
        return( <RenderDatosAdicionales 
                  data={data} 
                  setActiveTab={setActiveTab}
                  activeTab={activeTab}
                  isEditing={isEditing}
                  setIsEditing={setIsEditing}
                  />
        );
      }
    }
    return null;
  };

  return (
    <div className="ticket-template-container">
      
      <div className="ticket-content">{renderContent()}</div>
    </div>
  );
};

export default TicketTemplate;