import React from 'react';
import './InventarioList.css';

function RenderDatosInventario({ data, onGoBack }) {
  if (!data) {
    return null; 
  }
  
  const {
    fechaInicioPrevista,
    responsable,
    codigoEmail,
    numeroSerie,
    titulo,
    descripcion,
    fechaActualizacion,
    equipo,
    numeroIncidencia,
    estado,
    cliente,
    plaza,
    guias,
    tecnicoCampo,
    fechaFinPrevista,
    fechaFin
  } = data;

  return (
    <div className="inventario-template-container">
      <div className="inventario-details-card">
        <h2 className="title">Equipo-{titulo}</h2>
        
        {/* Sección de información en dos columnas */}
        <div className="infoSection">
          <div className="infoColumn">
            <div className="infoItem">
              <strong>Título:</strong> <span>{titulo}</span>
            </div>
            <div className="infoItem">
              <strong>Número de Serie:</strong> <span>{numeroSerie}</span>
            </div>
            <div className="infoItem">
              <strong>Equipo:</strong> <span>{equipo}</span>
            </div>
            <div className="infoItem">
              <strong>Estado:</strong> <span>{estado}</span>
            </div>
            <div className="infoItem">
              <strong>Responsable:</strong> <span>{responsable}</span>
            </div>
            <div className="infoItem">
              <strong>Cliente:</strong> <span>{cliente}</span>
            </div>
            <div className="infoItem">
              <strong>Plaza:</strong> <span>{plaza}</span>
            </div>
          </div>
          
          <div className="infoColumn">
            <div className="infoItem">
              <strong>Técnico de Campo:</strong> <span>{tecnicoCampo}</span>
            </div>
            <div className="infoItem">
              <strong>Número de Incidencia:</strong> <span>{numeroIncidencia}</span>
            </div>
            <div className="infoItem">
              <strong>Código de Email:</strong> <span>{codigoEmail}</span>
            </div>
            <div className="infoItem">
              <strong>Guías:</strong> <span>{guias}</span>
            </div>
            <div className="infoItem">
              <strong>Fecha de Inicio Prevista:</strong> <span>{fechaInicioPrevista}</span>
            </div>
            <div className="infoItem">
              <strong>Fecha de Fin Prevista:</strong> <span>{fechaFinPrevista}</span>
            </div>
            <div className="infoItem">
              <strong>Fecha de Fin:</strong> <span>{fechaFin}</span>
            </div>
            <div className="infoItem">
              <strong>Última Actualización:</strong> <span>{fechaActualizacion}</span>
            </div>
          </div>
        </div>

        {/* Sección de descripción de ancho completo */}
        <div className="fullWidthSection">
          <div className="infoItem">
            <strong>Descripción:</strong> <span>{descripcion}</span>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default RenderDatosInventario;