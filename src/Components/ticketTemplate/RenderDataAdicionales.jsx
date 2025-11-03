import React from 'react';

function RenderDatosAdicionales({ data,onEdit,activeTab,setActiveTab,isEditing,setIsEditing }) {

  if (!data) {
    return null;
  }

  const InfoItem = ({ label, value }) => {
  if (!value) return "Sin asignar";
  return (
    <div className="infoItem">
      <strong>{label}: <span>{value}</span></strong> 
    </div>
  );
};

  const {
    title,
    caseNumber,
    ciudad,
    cantidadTPV,
    modeloEntra,
    marcaEntra,
    serieLogicaEntra,
    serieFisicaEntra,
    versionBrowser,
    tipoComunicacion,
    simEntra,
    ptidEntra,
    eliminadorEntra,
    eliminadorSale,
    estado,
    ordenDeServicio,
    modeloSale,
    marcaSale,
    serieLogicaSale,
    serieFisicaSale,
    versionBrowserSale,
    tipoComunicacionSale,
    simSale,
    ptidSale,
    plaza,
    tecnico,
    cerroPuntoClave,
    atencionEnPunto,
    firmaEnEstacion,
    tarjetaTag,
    serieStock,
    simStock,
    modeloStock
  } = data.adicionales || {};

  return (
    <> 

  <div className="ticket-tabs">
        <button
          className={`tab-button ${activeTab === 'servicio' ? 'active' : ''}`}
          onClick={() => setActiveTab('servicio')}
        >
          Datos de Servicio
        </button>
        <button
          className={`tab-button ${activeTab === 'adicionales' ? 'active' : ''}`}
          onClick={() => setActiveTab('adicionales')}
        >
          Datos Adicionales
        </button>

        <h2 className="title">
          <strong> {data.title}</strong>
        </h2>
        <div className="ticket-actions">
          {!isEditing && (
            <>
            <button onClick={() => setIsEditing(true)} className="edit-button">
              Editar
            </button>   
            </>         
          )} 

          <button className="download-button">
            Descargar
          </button>   
        </div>
  </div>


<div className="detalleGridContainer">

  <div className="grid3">
    <div className="infoItem">
      <div className="label"><strong>Ciudad:</strong></div>
      <div className="value">{ciudad}</div>
    </div>
    <div className="infoItem">
      <div className="label"><strong>Plaza:</strong></div>
      <div className="value">{plaza}</div>
    </div>
    <div className="infoItem">
      <div className="label"><strong>Técnico:</strong></div>
      <div className="value">{tecnico}</div>
    </div>
    <div className="infoItem">
      <div className="label"><strong>Cerro en Punto Clave:</strong></div>
      <div className="value">{cerroPuntoClave}</div>
    </div>
    <div className="infoItem">
      <div className="label"><strong>Atención en Punto:</strong></div>
      <div className="value">{atencionEnPunto}</div>
    </div>
    <div className="infoItem">
      <div className="label"><strong>Firma en Estación:</strong></div>
      <div className="value">{firmaEnEstacion}</div>
    </div>
    <div className="infoItem">
      <div className="label"><strong>#Tarjeta / TAG:</strong></div>
      <div className="value">{tarjetaTag}</div>
    </div>
    <div className="infoItem">
      <div className="label"><strong>Cantidad TPV en Base:</strong></div>
      <div className="value">{cantidadTPV}</div>
    </div>
    <div className="infoItem">
      <div className="label"><strong>Modelo entra:</strong></div>
      <div className="value">{modeloEntra}</div>
    </div>
  </div>

  {/* --- Equipo Entrante --- */}
  <div className="grid3">
    <div className="infoItem">
      <div className="label"><strong>Marca Entra:</strong></div>
      <div className="value">{marcaEntra}</div>
    </div>
    <div className="infoItem">
      <div className="label"><strong>Serie Lógica entra:</strong></div>
      <div className="value">{serieLogicaEntra}</div>
    </div>
    <div className="infoItem">
      <div className="label"><strong>Serie Física entra:</strong></div>
      <div className="value">{serieFisicaEntra}</div>
    </div>
    <div className="infoItem">
      <div className="label"><strong>SIM entra:</strong></div>
      <div className="value">{simEntra}</div>
    </div>
    <div className="infoItem">
      <div className="label"><strong>PTID entra:</strong></div>
      <div className="value">{ptidEntra}</div>
    </div>
    <div className="infoItem">
      <div className="label"><strong>Eliminador Entra:</strong></div>
      <div className="value">{eliminadorEntra}</div>
    </div>
    <div className="infoItem">
      <div className="label"><strong>Modelo Sale:</strong></div>
      <div className="value">{modeloSale}</div>
    </div>
    <div className="infoItem">
      <div className="label"><strong>Marca Sale:</strong></div>
      <div className="value">{marcaSale}</div>
    </div>
    <div className="infoItem">
      <div className="label"><strong>Serie Lógica sale:</strong></div>
      <div className="value">{serieLogicaSale}</div>
    </div>
  </div>

  {/* --- Equipo Saliente --- */}
  <div className="grid3">
    <div className="infoItem">
      <div className="label"><strong>Serie Física sale:</strong></div>
      <div className="value">{serieFisicaSale}</div>
    </div>
    <div className="infoItem">
      <div className="label"><strong>SIM Sale:</strong></div>
      <div className="value">{simSale}</div>
    </div>
    <div className="infoItem">
      <div className="label"><strong>PTID Sale:</strong></div>
      <div className="value">{ptidSale}</div>
    </div>
    <div className="infoItem">
      <div className="label"><strong>Eliminador Sale:</strong></div>
      <div className="value">{eliminadorSale}</div>
    </div>
    <div className="infoItem">
      <div className="label"><strong>Versión Browser:</strong></div>
      <div className="value">{versionBrowser}</div>
    </div>
    <div className="infoItem">
      <div className="label"><strong>Versión Browser Sale:</strong></div>
      <div className="value">{versionBrowserSale}</div>
    </div>
    <div className="infoItem">
      <div className="label"><strong>Tipo de Comunicación:</strong></div>
      <div className="value">{tipoComunicacion}</div>
    </div>
    <div className="infoItem">
      <div className="label"><strong>Tipo de Comunicación Sale:</strong></div>
      <div className="value">{tipoComunicacionSale}</div>
    </div>
    <div className="infoItem">
      <div className="label"><strong>Estado:</strong></div>
      <div className="value">{estado}</div>
    </div>
  </div>

  <div className="grid3">
    <div className="infoItem">
      <div className="label"><strong>Orden de Servicio:</strong></div>
      <div className="value">{ordenDeServicio}</div>
    </div>
    <div className="infoItem">
      <div className="label"><strong>Serie que queda de stock:</strong></div>
      <div className="value">{serieStock}</div>
    </div>
    <div className="infoItem">
      <div className="label"><strong>SIM que queda de stock:</strong></div>
      <div className="value">{simStock}</div>
    </div>
    <div className="infoItem">
      <div className="label"><strong>Modelo de Stock:</strong></div>
      <div className="value">{modeloStock}</div>
    </div>
  </div>

</div>
 
    </>
  );
};

export default RenderDatosAdicionales;