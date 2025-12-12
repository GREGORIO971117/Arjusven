import React from 'react';
import { inventarioConfig } from '../../assets/inventarioConfig';
import './InventarioList.css';

export default function RenderDatosInventario({ data, onEdit, loadHistorial }) {

    if (!data) {
        return (
            <div className="no-data-container">
                <div className="no-data-icon">📦</div>
                <div className="no-data-text">Seleccione un artículo para ver detalles.</div>
            </div>
        );
    }

   
    const operationalKeys = ['plaza', 'estado', 'tecnico'];
    const trackingKeys = ['numeroDeIncidencia', 'guias', 'ultimaActualizacion'];
    const getConfig = (key) => inventarioConfig.find(field => field.key === key);

    const InfoItem = ({ label, value, isStatus = false }) => {
        const displayValue = value === undefined || value === null || value === '' ? '—' : value;

        if (isStatus) {
            return (
                <div className="modern-info-item">
                    <span className="info-label">{label}</span>
                    <div>
                        <span className={`status-badge ${String(value).toLowerCase().replace(/\s/g, '-')}`}>
                            {displayValue}
                        </span>
                    </div>
                </div>
            );
        }

        return (
            <div className="modern-info-item">
                <span className="info-label">{label}</span>
                <span className="info-value">{displayValue}</span>
            </div>
        );
    };

    return (
        <div className="modern-service-container">
          
            <header className="service-header">
                <div className="header-titles">
                    <h1 className="service-meta"><strong>{data.numeroDeSerie}</strong> {data.equipo || 'Equipo Sin Nombre'}</h1>
                </div>

                <div className="header-actions">
                    <button onClick={onEdit} className="btn-modern btn-primary">
                        Editar
                    </button>
                    <button onClick={loadHistorial} className="btn-modern btn-secondary">
                        📜 Ver Historial
                    </button>
                </div>
            </header>

            {/* --- Contenido Principal --- */}
            <div className="service-content-area">
                <div className="info-grid-wrapper animate-fade-in">
                    
                    {/* Fila Principal: Grid de 3 columnas espacioso */}
                    <section className="data-section">
                        <h3 className="subsection-title">Detalles Operativos</h3>
                        <div className="modern-grid-3">
                            {operationalKeys.map(key => {
                                const config = getConfig(key);
                                return (
                                    <InfoItem 
                                        key={key} 
                                        label={config ? config.label : key} 
                                        value={data[key]}
                                        isStatus={key === 'estado'} // Activa el diseño de badge
                                    />
                                );
                            })}
                        </div>
                    </section>

                    <div className="divider"></div>

                    {/* Fila Secundaria: Rastreo */}
                    <section className="data-section">
                        <h3 className="subsection-title">Rastreo y Actualizaciones</h3>
                        <div className="modern-grid-3">
                            {trackingKeys.map(key => {
                                const config = getConfig(key);
                                return (
                                    <InfoItem 
                                        key={key} 
                                        label={config ? config.label : key} 
                                        value={data[key]}
                                    />
                                );
                            })}
                        </div>
                    </section>

                    <div className="divider"></div>

                    {/* Sección Descripción (Ancho Completo) */}
                    <section className="data-section">
                        <h3 className="subsection-title">Descripción / Observaciones</h3>
                        <div className="description-box">
                            <p>{data.descripcion || "Sin descripción disponible."}</p>
                        </div>
                    </section>

                </div>
            </div>
        </div>
    );
}