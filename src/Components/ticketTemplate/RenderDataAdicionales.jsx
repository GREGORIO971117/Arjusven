import React from 'react';

function RenderDatosAdicionales({ data }) {

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
    <div className="infoSection">

  {/* Punto de Venta */}
  <div className="section">
    <InfoItem label="Ciudad" value={ciudad} />
    <InfoItem label="Plaza" value={plaza} />
    <InfoItem label="Técnico" value={tecnico} />
    <InfoItem label="Cerro en Punto Clave" value={cerroPuntoClave} />
    <InfoItem label="Atención en Punto" value={atencionEnPunto} />
    <InfoItem label="Firma en Estación" value={firmaEnEstacion} />
    <InfoItem label="#Tarjeta / TAG" value={tarjetaTag} />
    <InfoItem label="Cantidad TPV en Base" value={cantidadTPV} />
  </div>

  {/* Equipo Entrante */}
  <div className="section">
    <InfoItem label="Modelo entra" value={modeloEntra} />
    <InfoItem label="Marca Entra" value={marcaEntra} />
    <InfoItem label="Serie Lógica entra" value={serieLogicaEntra} />
    <InfoItem label="Serie Física entra" value={serieFisicaEntra} />
    <InfoItem label="SIM entra" value={simEntra} />
    <InfoItem label="PTID entra" value={ptidEntra} />
    <InfoItem label="Eliminador Entra" value={eliminadorEntra} />
  </div>

  {/* Equipo Saliente */}
  <div className="section">
    <InfoItem label="Modelo Sale" value={modeloSale} />
    <InfoItem label="Marca Sale" value={marcaSale} />
    <InfoItem label="Serie Lógica sale" value={serieLogicaSale} />
    <InfoItem label="Serie Física sale" value={serieFisicaSale} />
    <InfoItem label="SIM Sale" value={simSale} />
    <InfoItem label="PTID Sale" value={ptidSale} />
    <InfoItem label="Eliminador Sale" value={eliminadorSale} />
  </div>

  {/* Servicio */}
  <div className="section">
    <InfoItem label="Versión Browser" value={versionBrowser} />
    <InfoItem label="Versión Browser Sale" value={versionBrowserSale} />
    <InfoItem label="Tipo de Comunicación" value={tipoComunicacion} />
    <InfoItem label="Tipo de Comunicación Sale" value={tipoComunicacionSale} />
    <InfoItem label="Estado" value={estado} />
    <InfoItem label="Orden de Servicio" value={ordenDeServicio} />
  </div>

  {/* Inventario */}
  <div className="section">
    <InfoItem label="Serie que queda de stock" value={serieStock} />
    <InfoItem label="SIM que queda de stock" value={simStock} />
    <InfoItem label="Modelo de Stock" value={modeloStock} />
  </div>

</div>

    </>
  );
};

export default RenderDatosAdicionales;