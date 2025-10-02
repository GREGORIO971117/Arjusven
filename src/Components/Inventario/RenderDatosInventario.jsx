import React from 'react';
import './InventarioList.css';

function RenderDatosInventario({ data, onGoBack,onEdit }) {

  if (!data) {
    return null; 
  }

   const InfoItem=({label,value})=>{
   
      return(
        <div className='infoItem'>
          <strong>{label}:<span>{value}</span></strong>
        </div>
      )}

  
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
        <div className="ticket-header">
                <h2 className="ticket-title">Equipo-{titulo}
                <span>
                  <button onClick={onEdit} className="edit-button">Editar</button>
                  </span>
                </h2>
              </div>  

             
        
        {/* Sección de información en dos columnas */}
      <div className="infoSection">

        <div className="section">
            <InfoItem label="Título" value={titulo} />
            <InfoItem label="Número de Serie" value={numeroSerie} />
            <InfoItem label="Equipo" value={equipo} />
            <InfoItem label="Estado" value={estado} />
            <InfoItem label="Responsable" value={responsable} />
            <InfoItem label="Cliente" value={cliente} />
            <InfoItem label="Plaza" value={plaza} />
            <InfoItem label="Técnico de Campo" value={tecnicoCampo} />

        </div>

        <div className="section">
            <InfoItem label="Número de Incidencia" value={numeroIncidencia} />
            <InfoItem label="Código de Email" value={codigoEmail} />
            <InfoItem label="Guías" value={guias} />
            <InfoItem label="Fecha de Inicio Prevista" value={fechaInicioPrevista} />
            <InfoItem label="Fecha de Fin Prevista" value={fechaFinPrevista} />
            <InfoItem label="Fecha de Fin" value={fechaFin} />
            <InfoItem label="Última Actualización" value={fechaActualizacion} />
            <InfoItem label="Descripción" value={descripcion} />

        </div>
        </div>
                
    </>
  );
  
};

export default RenderDatosInventario;