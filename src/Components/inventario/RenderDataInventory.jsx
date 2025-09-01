import React from 'react';
import './TemplateInventory.css';

const InventoryDataTemplate = ({ data }) => {
    if (!data) {
        return <div className="no-data-message">No se ha proporcionado información de inventario.</div>;
    }

    return (
        <div className="template-container">
            <div className="template-header">
                <h1 className="template-title">{data.numeroSerie}</h1>
                <p className="template-subtitle">Cliente: {data.cliente}</p>
            </div>
            <div className="template-content two-column-layout">
                <div className="column">
                    <div className="section-title">Información General</div>
                    <div className="info-item">
                        <strong>Responsable:</strong>
                        <span>{data.responsable}</span>
                    </div>
                    <div className="info-item">
                        <strong>Código E-mail:</strong>
                        <span>{data.codigoEmail}</span>
                    </div>
                    <div className="info-item">
                        <strong>Título:</strong>
                        <span>{data.titulo}</span>
                    </div>
                    <div className="info-item">
                        <strong>Descripción:</strong>
                        <span>{data.descripcion}</span>
                    </div>
                    <div className="info-item">
                        <strong>Equipo:</strong>
                        <span>{data.equipo}</span>
                    </div>
                </div>

                <div className="column">
                    <div className="section-title">Detalles del Inventario</div>
                    <div className="info-item">
                        <strong>Nº de Serie:</strong>
                        <span>{data.numeroSerie}</span>
                    </div>
                    <div className="info-item">
                        <strong>Estado:</strong>
                        <span>{data.estado}</span>
                    </div>
                    <div className="info-item">
                        <strong>Nº última incidencia:</strong>
                        <span>{data.numeroIncidencia}</span>
                    </div>
                    <div className="info-item">
                        <strong>Plaza:</strong>
                        <span>{data.plaza}</span>
                    </div>
                    <div className="info-item">
                        <strong>Guías:</strong>
                        <span>{data.guias}</span>
                    </div>
                    <div className="info-item">
                        <strong>Técnico de Campo:</strong>
                        <span>{data.tecnicoCampo}</span>
                    </div>
                </div>
            </div>
            
            <div className="template-footer">
                 <div className="section-title">Fechas</div>
                 <div className="info-item">
                    <strong>Fecha de Actualización:</strong>
                    <span>{data.fechaActualizacion}</span>
                </div>
                <div className="info-item">
                    <strong>Fecha inicio prevista:</strong>
                    <span>{data.fechaInicioPrevista}</span>
                </div>
                <div className="info-item">
                    <strong>Fecha fin prevista:</strong>
                    <span>{data.fechaFinPrevista}</span>
                </div>
                <div className="info-item">
                    <strong>Fecha Fin:</strong>
                    <span>{data.fechaFin}</span>
                </div>
            </div>
        </div>
    );
};

export default InventoryDataTemplate;