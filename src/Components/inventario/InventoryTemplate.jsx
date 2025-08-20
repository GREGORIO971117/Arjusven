import React from 'react';
import './InventoryTemplate.css';

function InventoryTemplate({ data }) {
  if (!data) {
    return <div>No se ha proporcionado información de inventario.</div>;
  }

  return (
    <div className="inventory-container">
      <div className="inventory-header">
        <h1>Inventario TPV</h1>
      </div>
      
      <div className="inventory-content">
        <div className="info-section-column">
          <div className="info-column">
            <p><strong>Fecha inicio prevista</strong></p>
            <p>{data.fechaInicioPrevista}</p>
          </div>
          <div className="info-column">
            <p><strong>Responsable</strong></p>
            <p>{data.responsable}</p>
          </div>
          <div className="info-column">
            <p><strong>Código E-mail</strong></p>
            <p>{data.codigoEmail}</p>
          </div>
          <div className="info-column">
            <p><strong>Nº de Serie</strong></p>
            <p>{data.numeroSerie}</p>
          </div>
          <div className="info-column">
            <p><strong>Título</strong></p>
            <p>{data.titulo}</p>
          </div>
          <div className="info-column">
            <p><strong>Descripción</strong></p>
            <p>{data.descripcion}</p>
          </div>
          <div className="info-column">
            <p><strong>Fecha de Actualización</strong></p>
            <p>{data.fechaActualizacion}</p>
          </div>
          <div className="info-column">
            <p><strong>Equipo</strong></p>
            <p>{data.equipo}</p>
          </div>
          <div className="info-column">
            <p><strong>Nº última incidencia</strong></p>
            <p>{data.numeroIncidencia}</p>
          </div>
          <div className="info-column">
            <p><strong>Estado</strong></p>
            <p>{data.estado}</p>
          </div>
          <div className="info-column">
            <p><strong>Cliente</strong></p>
            <p>{data.cliente}</p>
          </div>
          <div className="info-column">
            <p><strong>Plaza</strong></p>
            <p>{data.plaza}</p>
          </div>
          <div className="info-column">
            <p><strong>Guías</strong></p>
            <p>{data.guias}</p>
          </div>
          <div className="info-column">
            <p><strong>Técnico de Campo</strong></p>
            <p>{data.tecnicoCampo}</p>
          </div>
        </div>
        
        <div className="info-section-column">
          <div className="info-column">
            <p><strong>Fecha fin prevista</strong></p>
            <p>{data.fechaFinPrevista}</p>
          </div>
          <div className="info-column">
            <p><strong>Fecha Fin</strong></p>
            <p>{data.fechaFin}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InventoryTemplate;