import React from 'react';
import { serviciosConfig } from '../../assets/serviciosConfig';
import '../Inventario/InventarioList.css'; 

const RenderDatosServicio = ({ data, activeTab, setActiveTab, isEditing, setIsEditing }) => {
    
    if (!data) {
        return (
            <div className="no-data-container">
                <div className="no-data-icon">📂</div>
                <div className="no-data-text">No se encontraron datos de Servicio para este ticket.</div>
            </div>
        );
    }

    // Componente de Item de Información Moderno
    const InfoItem = ({ label, value, isFullWidth = false }) => {
        const displayValue = value === undefined || value === null || value === '' ? '—' : value;
        
        return (
            <div className={`modern-info-item ${isFullWidth ? 'full-width' : ''}`}>
                <span className="info-label">{label}</span>
                <span className="info-value">{displayValue}</span>
            </div>
        );
    }
        
    const grid2Keys = [
        'fechaDeAsignacion',
        'fechaReporte',
        'resolucion', 
        'situacionActual', 
        'incidencia', 
        'supervisor', 
        'idMerchant', 
        'tipoDeServicio',
        'fechaDeEnvio', 
        'tecnico', 
        'sla'
    ];
    
    const gridKeys = [
        'direccion', 
        'guiaDeEncomienda',
        'observaciones',
        'motivoDeServicio',
        'motivoReal'
    ];
    
    const getConfig = (key) => serviciosConfig.find(field => field.key === key);
    const nombreDeEss = data.nombreDeEss;

    return (
        <div className="modern-service-container">
            {/* Header Moderno */}
            <header className="service-header">
                <div className="header-titles">
                    <h1 className="service-title">{nombreDeEss || 'Sin Nombre'}</h1>
                    <div className="service-meta">
                        <span className="meta-tag">Ticket: <strong>{data.incidencia || 'N/A'}</strong></span>
                        <span className={`status-badge ${data.situacionActual?.toLowerCase().replace(/\s/g, '-')}`}>
                            {data.situacionActual || 'Desconocido'}
                        </span>
                    </div>
                </div>

                <div className="header-actions">
                    {!isEditing && (
                        <button onClick={() => setIsEditing(true)} className="btn-modern btn-primary">
                            Editar
                        </button>
                    )}
                    <button className="btn-modern btn-secondary">
                        Inventario
                    </button> 
                </div>
            </header>

            {/* Navegación de Pestañas Moderna */}
            <nav className="modern-tabs">
                <button
                    className={`modern-tab ${activeTab === 'servicio' ? 'active' : ''}`}
                    onClick={() => setActiveTab('servicio')}
                >
                    Datos de Servicio
                </button>
                <button
                    className={`modern-tab ${activeTab === 'adicionales' ? 'active' : ''}`}
                    onClick={() => setActiveTab('adicionales')}
                >
                    Datos Adicionales
                </button>
            </nav>

            {/* Contenido Principal con Scroll suave si es necesario */}
            <div className="service-content-area">
                {activeTab === 'servicio' && (
                    <div className="info-grid-wrapper animate-fade-in">
                        
                        {/* Sección Principal: Grid de 2 o 3 columnas */}
                        <div className="modern-grid-3">
                            {grid2Keys.map(key => {
                                const field = getConfig(key);
                                const label = field ? field.label : key; 
                                return (
                                    <InfoItem 
                                        key={key} 
                                        label={label}
                                        value={data[key]} 
                                    />
                                );
                            })}
                        </div>
                        
                        <div className="divider"></div>

                        {/* Sección Secundaria: Campos largos (Observaciones, Direcciones) */}
                        <div className="modern-grid-2">
                            {gridKeys.map(key => {
                                const field = getConfig(key);
                                
                                let label = field ? field.label : key; 
                                if(key === 'motivoReal') label = 'Motivo real del Servicio en sitio';
                                if(key === 'motivoDeServicio') label = 'Motivo del Servicio';
                                if(key === 'observaciones') label = 'Observaciones ARJUSVEN';
                                
                                // Direccion y observaciones se ven mejor ocupando más espacio
                                const isWide = key === 'direccion' || key === 'observaciones' || key.includes('motivo');

                                return (
                                    <InfoItem 
                                        key={key} 
                                        label={label} 
                                        value={data[key]} 
                                        isFullWidth={isWide}
                                    />
                                );
                            })}
                        </div>
                    </div>
                )}
                
                {activeTab === 'adicionales' && (
                    <div className="info-grid-wrapper animate-fade-in">
                        {/* Aquí iría el contenido de adicionales si lo tuvieras */}
                        <div className="empty-state-placeholder">
                            Seleccione Datos Adicionales para ver más información.
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RenderDatosServicio;