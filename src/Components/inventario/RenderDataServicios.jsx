import React from 'react';
import styles from './RenderDataServicios.module.css';

const RenderDatosServicio = ({ editableData }) => (
    <>
        <h2 className={styles.title}>
            <strong>{editableData.serviceRequest?.caseNumber}-{editableData.serviceRequest?.affiliation}</strong>
        </h2>
        <div className={styles.infoSection}>
            <div className={styles.infoColumn}>
                <div className={styles.infoItem}>
                    <strong>Fecha de Asignación: </strong>
                    <span>{editableData.serviceRequest?.assignmentDate}</span>
                </div>
                <div className={styles.infoItem}>
                    <strong>Resolución: </strong>
                    <span>{editableData.serviceRequest?.resolution}</span>
                </div>
                <div className={styles.infoItem}>
                    <strong>Situación Actual: </strong>
                    <span>{editableData.serviceRequest?.currentStatus}</span>
                </div>
                <div className={styles.infoItem}>
                    <strong>Nombre de ESS: </strong>
                    <span>{editableData.serviceRequest?.affiliation}</span>
                </div>
                <div className={styles.infoItem}>
                    <strong>Incidencia: </strong>
                    <span>{editableData.serviceRequest?.caseNumber}</span>
                </div>
                <div className={styles.infoItem}>
                    <strong>Código de Afiliado: </strong>
                    <span>{editableData.serviceRequest?.affiliateCode}</span>
                </div>
                
            </div>
            <div className={styles.infoColumn}>
                <div className={styles.infoItem}>
                    <strong>Supervisor: </strong>
                    <span>{editableData.contactInfo?.contactPerson?.supervisor}</span>
                </div>
                <div className={styles.infoItem}>
                    <strong>ID Merchant: </strong>
                    <span>{editableData.serviceRequest?.idMerchant}</span>
                </div>
                <div className={styles.infoItem}>
                    <strong>Tipo de Servicio: </strong>
                    <span>{editableData.contactInfo?.serviceType}</span>
                </div>
                <div className={styles.infoItem}>
                    <strong>Técnico de Campo: </strong>
                    <span>{editableData.contactInfo?.fieldTechnician}</span>
                </div>
                <div className={styles.infoItem}>
                    <strong>SLA: </strong>
                    <span>{editableData.contactInfo?.sla}</span>
                </div>
            </div>
        </div>
        
        <div className={styles.fullWidthSection}>
            <div className={styles.infoItem}>
                <strong>Motivo del Servicio: </strong>
                <span>{editableData.serviceDetails?.onSiteReason}</span>
            </div>
            <div className={styles.infoItem}>
                <strong>Motivo real del Servicio en sitio: </strong>
                <span>{editableData.serviceRequest?.serviceReason}</span>
            </div>
            <div className={styles.infoItem}>
                <strong>Observaciones ARJUSVEN: </strong>
                <span>{editableData.serviceDetails?.observations}</span>
            </div>
            <div className={styles.infoItem}>
                <strong>Dirección: </strong>
                <span>{editableData.serviceDetails?.address}</span>
            </div>
        </div>
        <div className={styles.fullWidthSection}>
            <div className={styles.infoItem}>
                <strong>Guía de Encomienda: </strong>
                <span>{editableData.bottomInfo?.encomiendaGuide}</span>
            </div>
            <div className={styles.infoItem}>
                <strong>Fecha de envío de guía: </strong>
                <span>{editableData.bottomInfo?.guideSendDate}</span>
            </div>
        </div>
    </>
);

export default RenderDatosServicio;