import React from 'react';
import './TicketTemplate.css';

const RenderDatosAdicionales = ({ editableData }) => (
  <>
    <div className="info-section">
      <div className="info-column">
        <p><strong>Ciudad</strong>: {editableData.additionalData?.ciudad}</p>
        <p><strong>Cantidad TPV en Base</strong>: {editableData.additionalData?.cantidadTPV}</p>
        <p><strong>Modelo entra</strong>: {editableData.additionalData?.modeloEntra}</p>
        <p><strong>Marca Entra</strong>: {editableData.additionalData?.marcaEntra}</p>
        <p><strong>Serie Lógica entra</strong>: {editableData.additionalData?.serieLogicaEntra}</p>
        <p><strong>Serie Física entra</strong>: {editableData.additionalData?.serieFisicaEntra}</p>
        <p><strong>Versión Browser</strong>: {editableData.additionalData?.versionBrowser}</p>
        <p><strong>Tipo de Comunicación</strong>: {editableData.additionalData?.tipoComunicacion}</p>
        <p><strong>SIM entra</strong>: {editableData.additionalData?.simEntra}</p>
        <p><strong>PTID entra</strong>: {editableData.additionalData?.ptidEntra}</p>
        <p><strong>Eliminador Entra</strong>: {editableData.additionalData?.eliminadorEntra}</p>
        <p><strong>Eliminador Sale</strong>: {editableData.additionalData?.eliminadorSale}</p>
      </div>
      <div className="info-column">
        <p><strong>Estado</strong>: {editableData.additionalData?.estado}</p>
        <p><strong>Orden de Servicio</strong>: {editableData.additionalData?.ordenDeServicio}</p>
        <p><strong>Modelo Sale</strong>: {editableData.additionalData?.modeloSale}</p>
        <p><strong>Marca Sale</strong>: {editableData.additionalData?.marcaSale}</p>
        <p><strong>Serie Lógica sale</strong>: {editableData.additionalData?.serieLogicaSale}</p>
        <p><strong>Serie Física sale</strong>: {editableData.additionalData?.serieFisicaSale}</p>
        <p><strong>Versión Browser</strong>: {editableData.additionalData?.versionBrowserSale}</p>
        <p><strong>Tipo de Comunicación</strong>: {editableData.additionalData?.tipoComunicacionSale}</p>
        <p><strong>SIM Sale</strong>: {editableData.additionalData?.simSale}</p>
        <p><strong>PTID Sale</strong>: {editableData.additionalData?.ptidSale}</p>
        <p><strong>Plaza</strong>: {editableData.additionalData?.plaza}</p>
        <p><strong>Técnico</strong>: {editableData.additionalData?.tecnico}</p>
        <p><strong>Cerro en Punto Clave</strong>: {editableData.additionalData?.cerroPuntoClave}</p>
        <p><strong>Atención en Punto</strong>: {editableData.additionalData?.atencionEnPunto}</p>
        <p><strong>Firma en Estación</strong>: {editableData.additionalData?.firmaEnEstacion}</p>
        <p><strong>#Tarjeta / TAG</strong>: {editableData.additionalData?.tarjetaTag}</p>
      </div>
    </div>
    <div className="full-width-section">
      <p><strong>INVENTARIO</strong></p>
      <p><strong>Serie que queda de stock</strong>: {editableData.additionalData?.serieStock}</p>
      <p><strong>SIM que queda de stock</strong>: {editableData.additionalData?.simStock}</p>
      <p><strong>Modelo de Stock</strong>: {editableData.additionalData?.modeloStock}</p>
    </div>
  </>
);

export default RenderDatosAdicionales;