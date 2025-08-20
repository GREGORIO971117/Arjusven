import React, { useState } from 'react';
import './TicketTemplate.css';

function TicketTemplate({ data }) {
  const [activeTab, setActiveTab] = useState('solicitud');

  if (!data) {
    return <div>No se ha proporcionado información de ticket.</div>;
  }

  // Obtenemos los datos para cada pestaña
  const solicitudData = data.serviceRequest;
  const datosAdicionalesData = data.additionalData;
  const onSiteData = data.serviceDetails;
  const contactData = data.contactInfo;
  const bottomData = data.bottomInfo;

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const renderSolicitudDeServicio = () => (
    <>
      <div className="info-section">
        <div className="info-column">
          <p><strong>Fecha de Asignación</strong></p>
          <p>{solicitudData.assignmentDate}</p>
        </div>
        <div className="info-column">
          <p><strong>Resolución</strong></p>
          <p>{solicitudData.resolution}</p>
        </div>
        <div className="info-column">
          <p><strong>Situación Actual</strong></p>
          <p>{solicitudData.currentStatus}</p>
        </div>
        <div className="info-column">
          <p><strong>Nombre de ESS</strong></p>
          <p>{solicitudData.essName}</p>
        </div>
        <div className="info-column">
          <p><strong>No de Caso</strong></p>
          <p>{solicitudData.caseNumber}</p>
        </div>
        <div className="info-column">
          <p><strong>Código de Afiliado</strong></p>
          <p>{solicitudData.affiliateCode}</p>
        </div>
        <div className="info-column">
          <p><strong>AFILIACION</strong></p>
          <p>{solicitudData.affiliation}</p>
        </div>
        <div className="info-column">
          <p><strong>Afiliado ATPV</strong></p>
          <p>{solicitudData.atpvAffiliate}</p>
        </div>
        <div className="info-column">
          <p><strong>ID ATPV</strong></p>
          <p>{solicitudData.atpvID}</p>
        </div>
        <div className="info-column">
          <p><strong>Motivo del Servicio</strong></p>
          <p>{solicitudData.serviceReason}</p>
        </div>
      </div>
      <div className="info-section">
        <div className="info-column">
          <p><strong>Contrato relacionado</strong></p>
          <p>{contactData.relatedContract}</p>
        </div>
        <div className="info-column">
          <p><strong>Cliente</strong></p>
          <p>{contactData.client}</p>
        </div>
        <div className="info-column">
          <p><strong>Persona de contacto</strong></p>
          <p>{contactData.contactPerson.creator}</p>
          <p>{contactData.contactPerson.supervisor}</p>
        </div>
        <div className="info-column">
          <p><strong>TIPO DE SERVICIO</strong></p>
          <p>{contactData.serviceType}</p>
        </div>
        <div className="info-column">
          <p><strong>Técnico de Campo</strong></p>
          <p>{contactData.fieldTechnician}</p>
        </div>
        <div className="info-column">
          <p><strong>SLA</strong></p>
          <p>{contactData.sla}</p>
        </div>
      </div>
      <div className="full-width-section">
        <p><strong>Motivo real del Servicio en sitio</strong></p>
        <p>{onSiteData.onSiteReason}</p>
      </div>
      <div className="full-width-section">
        <p><strong>Observaciones ARJUSVEN</strong></p>
        <p>{onSiteData.observations}</p>
      </div>
      <div className="full-width-section">
        <p><strong>Dirección</strong></p>
        <p>{onSiteData.address}</p>
      </div>
      <div className="bottom-info">
        <div className="info-column">
          <p><strong>Guía de Encomienda</strong></p>
          <p>{bottomData.encomiendaGuide}</p>
        </div>
        <div className="info-column">
          <p><strong>Fecha de envío de guía</strong></p>
          <p>{bottomData.guideSendDate}</p>
        </div>
      </div>
    </>
  );

  const renderDatosAdicionales = () => (
    <>
      <div className="info-section">
        <div className="info-column">
          <p><strong>Ciudad</strong></p>
          <p>{datosAdicionalesData.ciudad}</p>
        </div>
        <div className="info-column">
          <p><strong>Cantidad TPV en Base</strong></p>
          <p>{datosAdicionalesData.cantidadTPV}</p>
        </div>
        <div className="info-column">
          <p><strong>Modelo entra</strong></p>
          <p>{datosAdicionalesData.modeloEntra}</p>
        </div>
        <div className="info-column">
          <p><strong>Marca Entra</strong></p>
          <p>{datosAdicionalesData.marcaEntra}</p>
        </div>
        <div className="info-column">
          <p><strong>Serie Lógica entra</strong></p>
          <p>{datosAdicionalesData.serieLogicaEntra}</p>
        </div>
        <div className="info-column">
          <p><strong>Serie Física entra</strong></p>
          <p>{datosAdicionalesData.serieFisicaEntra}</p>
        </div>
        <div className="info-column">
          <p><strong>Versión Browser</strong></p>
          <p>{datosAdicionalesData.versionBrowser}</p>
        </div>
        <div className="info-column">
          <p><strong>Tipo de Comunicación</strong></p>
          <p>{datosAdicionalesData.tipoComunicacion}</p>
        </div>
        <div className="info-column">
          <p><strong>SIM entra</strong></p>
          <p>{datosAdicionalesData.simEntra}</p>
        </div>
        <div className="info-column">
          <p><strong>PTID entra</strong></p>
          <p>{datosAdicionalesData.ptidEntra}</p>
        </div>
        <div className="info-column">
          <p><strong>Eliminador Entra</strong></p>
          <p>{datosAdicionalesData.eliminadorEntra}</p>
        </div>
        <div className="info-column">
          <p><strong>Eliminador Sale</strong></p>
          <p>{datosAdicionalesData.eliminadorSale}</p>
        </div>
      </div>
      
      <div className="info-section">
        <div className="info-column">
          <p><strong>Estado</strong></p>
          <p>{datosAdicionalesData.estado}</p>
        </div>
        <div className="info-column">
          <p><strong>Orden de Servicio</strong></p>
          <p>{datosAdicionalesData.ordenDeServicio}</p>
        </div>
        <div className="info-column">
          <p><strong>Modelo Sale</strong></p>
          <p>{datosAdicionalesData.modeloSale}</p>
        </div>
        <div className="info-column">
          <p><strong>Marca Sale</strong></p>
          <p>{datosAdicionalesData.marcaSale}</p>
        </div>
        <div className="info-column">
          <p><strong>Serie Lógica sale</strong></p>
          <p>{datosAdicionalesData.serieLogicaSale}</p>
        </div>
        <div className="info-column">
          <p><strong>Serie Física sale</strong></p>
          <p>{datosAdicionalesData.serieFisicaSale}</p>
        </div>
        <div className="info-column">
          <p><strong>Versión Browser</strong></p>
          <p>{datosAdicionalesData.versionBrowserSale}</p>
        </div>
        <div className="info-column">
          <p><strong>Tipo de Comunicación</strong></p>
          <p>{datosAdicionalesData.tipoComunicacionSale}</p>
        </div>
        <div className="info-column">
          <p><strong>SIM Sale</strong></p>
          <p>{datosAdicionalesData.simSale}</p>
        </div>
        <div className="info-column">
          <p><strong>PTID Sale</strong></p>
          <p>{datosAdicionalesData.ptidSale}</p>
        </div>
        <div className="info-column">
          <p><strong>Plaza</strong></p>
          <p>{datosAdicionalesData.plaza}</p>
        </div>
        <div className="info-column">
          <p><strong>Técnico</strong></p>
          <p>{datosAdicionalesData.tecnico}</p>
        </div>
        <div className="info-column">
          <p><strong>Cerro en Punto Clave</strong></p>
          <p>{datosAdicionalesData.cerroPuntoClave}</p>
        </div>
        <div className="info-column">
          <p><strong>Atención en Punto</strong></p>
          <p>{datosAdicionalesData.atencionEnPunto}</p>
        </div>
        <div className="info-column">
          <p><strong>Firma en Estación</strong></p>
          <p>{datosAdicionalesData.firmaEnEstacion}</p>
        </div>
        <div className="info-column">
          <p><strong>#Tarjeta / TAG</strong></p>
          <p>{datosAdicionalesData.tarjetaTag}</p>
        </div>
      </div>
      <div className="full-width-section">
        <p><strong>INVENTARIO</strong></p>
        <p><strong>Serie que queda de stock</strong></p>
        <p>{datosAdicionalesData.serieStock}</p>
        <p><strong>SIM que queda de stock</strong></p>
        <p>{datosAdicionalesData.simStock}</p>
        <p><strong>Modelo de Stock</strong></p>
        <p>{datosAdicionalesData.modeloStock}</p>
      </div>
    </>
  );

  return (
    <div className="ticket-container">
      <div className="ticket-header">
        <h1>{data.ticketNumber} {data.title}</h1>
        <p>{data.subTitle}</p>
      </div>
      
      <div className="ticket-tabs">
        <button 
          className={`tab-button ${activeTab === 'solicitud' ? 'active' : ''}`}
          onClick={() => handleTabChange('solicitud')}
        >
          Solicitud de Servicio
        </button>
        <button 
          className={`tab-button ${activeTab === 'adicionales' ? 'active' : ''}`}
          onClick={() => handleTabChange('adicionales')}
        >
          Datos Adicionales
        </button>
      </div>
      
      <div className="ticket-content">
        {activeTab === 'solicitud' ? renderSolicitudDeServicio() : renderDatosAdicionales()}
      </div>
    </div>
  );
}

export default TicketTemplate;