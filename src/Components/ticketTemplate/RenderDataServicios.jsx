import React from 'react';
import './TicketTemplate.css';

const RenderDatosServicio = ({ editableData }) => (
    <>
        <div className="info-section">
            <div className="info-column">
                <p><strong>Fecha de Asignación</strong>{editableData.serviceRequest?.assignmentDate}</p>
                <p><strong>Resolución</strong>: {editableData.serviceRequest?.resolution}</p>
                <p><strong>Situación Actual</strong>: {editableData.serviceRequest?.currentStatus}</p>
                <p><strong>Nombre de ESS</strong>: {editableData.serviceRequest?.affiliation}</p>
                <p><strong>No de Caso</strong>: {editableData.serviceRequest?.caseNumber}</p>
                <p><strong>Código de Afiliado</strong>: {editableData.serviceRequest?.affiliateCode}</p>
                
            </div>
            <div className="info-column">
                <p><strong>Supervisor</strong>: {editableData.contactInfo?.contactPerson?.supervisor}</p>
                <p><strong>ID Merchant</strong>: {editableData.serviceRequest?.idMerchant}</p>
                <p><strong>Tipo de Servicio</strong>: {editableData.contactInfo?.serviceType}</p>
                <p><strong>Técnico de Campo</strong>: {editableData.contactInfo?.fieldTechnician}</p>
                <p><strong>SLA</strong>: {editableData.contactInfo?.sla}</p>
            </div>
        </div>
        <div className="full-width-section">
            <p><strong>Motivo del Servicio</strong>: {editableData.serviceDetails?.onSiteReason}</p>
        </div>
        <div className="full-width-section">
            <p><strong>Motivo real del Servicio en sitio</strong>: {editableData.serviceRequest?.serviceReason}</p>
            <p><strong>Observaciones ARJUSVEN</strong>: {editableData.serviceDetails?.observations}</p>
            <p><strong>Dirección</strong>: {editableData.serviceDetails?.address}</p>
        </div>
        <div className="full-width-section">
            <p><strong>Guía de Encomienda</strong>: {editableData.bottomInfo?.encomiendaGuide}</p>
            <p><strong>Fecha de envío de guía</strong>: {editableData.bottomInfo?.guideSendDate}</p>
        </div>
    </>
);

export default RenderDatosServicio;