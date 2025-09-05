import React from 'react';

function RenderDatosAdicionales({ data }) {

  if (!data) {
    return null;
  }

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
        <div className="infoColumn">
          <div className="infoItem">
            <strong>Ciudad</strong>:
            <span>{ciudad}</span>
          </div>
          <div className="infoItem">
            <strong>Cantidad TPV en Base</strong>:
            <span>{cantidadTPV}</span>
          </div>
          <div className="infoItem">
            <strong>Modelo entra</strong>:
            <span>{modeloEntra}</span>
          </div>
          <div className="infoItem">
            <strong>Marca Entra</strong>:
            <span>{marcaEntra}</span>
          </div>
          <div className="infoItem">
            <strong>Serie Lógica entra</strong>:
            <span>{serieLogicaEntra}</span>
          </div>
          <div className="infoItem">
            <strong>Serie Física entra</strong>:
            <span>{serieFisicaEntra}</span>
          </div>
          <div className="infoItem">
            <strong>Versión Browser</strong>:
            <span>{versionBrowser}</span>
          </div>
          <div className="infoItem">
            <strong>Tipo de Comunicación</strong>:
            <span>{tipoComunicacion}</span>
          </div>
          <div className="infoItem">
            <strong>SIM entra</strong>:
            <span>{simEntra}</span>
          </div>
          <div className="infoItem">
            <strong>PTID entra</strong>:
            <span>{ptidEntra}</span>
          </div>
          <div className="infoItem">
            <strong>Eliminador Entra</strong>:
            <span>{eliminadorEntra}</span>
          </div>
          <div className="infoItem">
            <strong>Eliminador Sale</strong>:
            <span>{eliminadorSale}</span>
          </div>
          <div className="infoItem">
            <strong>Estado</strong>:
            <span>{estado}</span>
          </div>
          <div className="infoItem">
            <strong>Orden de Servicio</strong>:
            <span>{ordenDeServicio}</span>
          </div>
        </div>
        <div className="infoColumn">
          <div className="infoItem">
            <strong>Modelo Sale</strong>:
            <span>{modeloSale}</span>
          </div>
          <div className="infoItem">
            <strong>Marca Sale</strong>:
            <span>{marcaSale}</span>
          </div>
          <div className="infoItem">
            <strong>Serie Lógica sale</strong>:
            <span>{serieLogicaSale}</span>
          </div>
          <div className="infoItem">
            <strong>Serie Física sale</strong>:
            <span>{serieFisicaSale}</span>
          </div>
          <div className="infoItem">
            <strong>Versión Browser</strong>:
            <span>{versionBrowserSale}</span>
          </div>
          <div className="infoItem">
            <strong>Tipo de Comunicación</strong>:
            <span>{tipoComunicacionSale}</span>
          </div>
          <div className="infoItem">
            <strong>SIM Sale</strong>:
            <span>{simSale}</span>
          </div>
          <div className="infoItem">
            <strong>PTID Sale</strong>:
            <span>{ptidSale}</span>
          </div>
          <div className="infoItem">
            <strong>Plaza</strong>:
            <span>{plaza}</span>
          </div>
          <div className="infoItem">
            <strong>Técnico</strong>:
            <span>{tecnico}</span>
          </div>
          <div className="infoItem">
            <strong>Cerro en Punto Clave</strong>:
            <span>{cerroPuntoClave}</span>
          </div>
          <div className="infoItem">
            <strong>Atención en Punto</strong>:
            <span>{atencionEnPunto}</span>
          </div>
          <div className="infoItem">
            <strong>Firma en Estación</strong>:
            <span>{firmaEnEstacion}</span>
          </div>
          <div className="infoItem">
            <strong>#Tarjeta / TAG</strong>:
            <span>{tarjetaTag}</span>
          </div>
        </div>
      </div>
      <div className="fullWidthSection">
        <div className="infoItem">
          <strong>INVENTARIO</strong>
        </div>
        <div className="infoItem">
          <strong>Serie que queda de stock</strong>:
          <span>{serieStock}</span>
        </div>
        <div className="infoItem">
          <strong>SIM que queda de stock</strong>:
          <span>{simStock}</span>
        </div>
        <div className="infoItem">
          <strong>Modelo de Stock</strong>:
          <span>{modeloStock}</span>
        </div>
      </div>
    </>
  );
};

export default RenderDatosAdicionales;