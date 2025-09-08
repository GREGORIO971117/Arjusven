import React from 'react';
import './InventarioList.css';

function RenderDatosInventario({ data, onGoBack,onEdit }) {

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
  
  <>  
    <div className="inventario-template-container">
      <div className="inventario-details-card">
        <div className="ticket-header">
                <h2 className="ticket-title">Equipo-{titulo}
                <span>
                  <button onClick={onEdit} className="edit-button">Editar</button>
                  </span>
                </h2>
              </div>       
        
        {/* Sección de información en dos columnas */}
        <div className="infoSection">
          <div className="infoColumn">
            <div className="infoItem">
              <strong>Título:<span>{titulo}</span></strong> 
            </div>
            <div className="infoItem">
              <strong>Número de Serie:<span>{numeroSerie}</span></strong> 
            </div>
            <div className="infoItem">
              <strong>Equipo:<span>{equipo}</span></strong> 
            </div>
            <div className="infoItem">
              <strong>Estado:<span>{estado}</span></strong> 
            </div>
            <div className="infoItem">
              <strong>Responsable:<span>{responsable}</span></strong> 
            </div>
            <div className="infoItem">
              <strong>Cliente:<span>{cliente}</span></strong> 
            </div>
            <div className="infoItem">
              <strong>Plaza:<span>{plaza}</span></strong> 
            </div>
          </div>
          
          <div className="infoColumn">
            <div className="infoItem">
              <strong>Técnico de Campo:<span>{tecnicoCampo}</span></strong> 
            </div>
            <div className="infoItem">
              <strong>Número de Incidencia:<span>{numeroIncidencia}</span></strong> 
            </div>
            <div className="infoItem">
              <strong>Código de Email:<span>{codigoEmail}</span></strong> 
            </div>
            <div className="infoItem">
              <strong>Guías:<span>{guias}</span></strong> 
            </div>
            <div className="infoItem">
              <strong>Fecha de Inicio Prevista:<span>{fechaInicioPrevista}</span></strong> 
            </div>
            <div className="infoItem">
              <strong>Fecha de Fin Prevista:<span>{fechaFinPrevista}</span></strong> 
            </div>
            <div className="infoItem">
              <strong>Fecha de Fin:<span>{fechaFin}</span></strong> 
            </div>
            <div className="infoItem">
              <strong>Última Actualización:<span>{fechaActualizacion}</span></strong> 
            </div>
          </div>
        </div>

        {/* Sección de descripción de ancho completo */}
        <div className="fullWidthSection">
          <div className="infoItem">
            <strong>Descripción:<span>{descripcion}</span></strong> 
          </div>
        </div>
        
      </div>
    </div>
    </>
  );
  
};

export default RenderDatosInventario;