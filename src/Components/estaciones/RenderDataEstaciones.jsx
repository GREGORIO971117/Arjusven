import React from 'react';
import { estacionesConfig } from '../../assets/estacionesConfig';
import '../Inventario/InventarioList.css';

export default function RenderDatosEstacion({ data, onEdit }) {
    if (!data) {
        return (
            <div className="no-data-container">
                <div className="no-data-icon">⛽</div>
                <div className="no-data-text">Seleccione una estación para ver los detalles.</div>
            </div>
        );
    }

    const identityKeys = ['grupo', 'prioridad', 'rankingEdenred', 'codigoPEMEX', 'tipoPEMEX', 'as400', 'bo'];
    const locationKeys = ['direccion', 'coloniaAsentamiento', 'municipio', 'estado', 'cp', 'plazaDeAtencion', 'referencias', 'km', 'transporte'];
    const techKeys = ['controladorVolumetrico', 'modelo', 'tipoDeConexion', 'carrier', 'tipoSIM', 'afiliadoAS400', 'afiliadoATPV', 'cantPOSActivas', 'cobertura'];
    const contactKeys = ['supervisorArjus', 'tecnicoAsignado', 'telefono1', 'telefono2', 'soporteNoviembre2022', 'rollos'];

    const getConfig = (key) => estacionesConfig.find(field => field.key === key);
    const InfoItem = ({ label, value, isWide = false }) => {
        let displayValue = value === null || value === undefined || value === '' ? '—' : value.toString();
        if (typeof value === 'number' && value === 0) displayValue = '0';

        return (
            <div className={`modern-info-item ${isWide ? 'span-2' : ''}`}>
                <span className="info-label">{label}</span>
                <span className="info-value compact">{displayValue}</span>
            </div>
        );
    };

    const RenderSection = ({ title, keys, gridClass = "modern-grid-4" }) => (
        <section className="data-section-compact">
            <h4 className="subsection-title">{title}</h4>
            <div className={gridClass}>
                {keys.map(key => {
                    const config = getConfig(key);
                    const label = config ? config.label : key;
                    const isWide = key === 'direccion' || key === 'referencias';
                    return <InfoItem key={key} label={label} value={data[key]} isWide={isWide} />;
                })}
            </div>
        </section>
    );

    return (
        <div className="modern-service-container">
            {/* Header */}
            <header className="service-header compact-header">
                <div className="header-titles">
                    <div className="service-meta">
                    </div>
                    <h1 className="service-title"><strong>ID Merchant: {data.idMerchant}</strong>-{data.nombreComercial || 'Sin Nombre Comercial'}</h1>
                </div>
                <div className="header-actions">
                    <button onClick={onEdit} className="btn-modern btn-primary">
                        Editar Estación
                    </button>
                </div>
            </header>

            <div className="service-content-area dense-content">
                <div className="info-grid-wrapper animate-fade-in">
                    
                    <div className="dashboard-row">
                        <div className="dashboard-card">
                            <RenderSection keys={identityKeys} gridClass="modern-grid-3-dense" />
                        </div>
                        <div className="dashboard-card">
                            <RenderSection keys={contactKeys} gridClass="modern-grid-3-dense" />
                        </div>
                    </div>

                    <div className="dashboard-card full-width-card mt-2">
                        <RenderSection keys={techKeys} gridClass="modern-grid-5" />
                    </div>

                    <div className="dashboard-card full-width-card mt-2">
                        <RenderSection keys={locationKeys} gridClass="modern-grid-4" />
                    </div>

                </div>
            </div>
        </div>
    );
}