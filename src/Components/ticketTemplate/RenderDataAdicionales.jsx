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
  } = data.additionalData;

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


    <div className="info-item">

  {/* Punto de Venta */}
  <div className="grid3">
    <InfoItem label="Ciudad" value={ciudad} />
    <InfoItem label="Plaza" value={plaza} />
    <InfoItem label="Técnico" value={tecnico} />
    <InfoItem label="Cerro en Punto Clave" value={cerroPuntoClave} />
    <InfoItem label="Atención en Punto" value={atencionEnPunto} />
    <InfoItem label="Firma en Estación" value={firmaEnEstacion} />
    <InfoItem label="#Tarjeta / TAG" value={tarjetaTag} />
    <InfoItem label="Cantidad TPV en Base" value={cantidadTPV} />
    <InfoItem label="Modelo entra" value={modeloEntra} />

  </div>

  {/* Equipo Entrante */}
  <div className="grid3">
    <InfoItem label="Marca Entra" value={marcaEntra} />
    <InfoItem label="Serie Lógica entra" value={serieLogicaEntra} />
    <InfoItem label="Serie Física entra" value={serieFisicaEntra} />
    <InfoItem label="SIM entra" value={simEntra} />
    <InfoItem label="PTID entra" value={ptidEntra} />
    <InfoItem label="Eliminador Entra" value={eliminadorEntra} />
    <InfoItem label="Modelo Sale" value={modeloSale} />
    <InfoItem label="Marca Sale" value={marcaSale} />
    <InfoItem label="Serie Lógica sale" value={serieLogicaSale} />
  </div>

  {/* Equipo Saliente */}
  <div className="grid3">
    
    <InfoItem label="Serie Física sale" value={serieFisicaSale} />
    <InfoItem label="SIM Sale" value={simSale} />
    <InfoItem label="PTID Sale" value={ptidSale} />
    <InfoItem label="Eliminador Sale" value={eliminadorSale} />
    <InfoItem label="Versión Browser" value={versionBrowser} />
    <InfoItem label="Versión Browser Sale" value={versionBrowserSale} />
    <InfoItem label="Tipo de Comunicación" value={tipoComunicacion} />
    <InfoItem label="Tipo de Comunicación Sale" value={tipoComunicacionSale} />
    <InfoItem label="Estado" value={estado} />
  </div>

  {/* Servicio */}
  <div className="grid3">
    
    <InfoItem label="Orden de Servicio" value={ordenDeServicio} />
    <InfoItem label="Serie que queda de stock" value={serieStock} />
    <InfoItem label="SIM que queda de stock" value={simStock} />
    <InfoItem label="Modelo de Stock" value={modeloStock} />
  </div>

  {/* Inventario */}
  <div className="grid3">
    
  </div>

</div>

    </>
  );
};

export default RenderDatosAdicionales;