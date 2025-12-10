import React, { useState } from 'react';
import { adicionalesConfig } from '../../assets/adicionalesConfig'; // Asegúrate de la ruta correcta
import '../Inventario/InventarioList.css';

const RenderDatosAdicionales = ({ 
    data, 
    activeTab,
    setActiveTab, 
    isEditing, 
    setIsEditing,
    handleDownload
}) => {

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    if (!data || !data.adicionales) {
        return (
            <div className="no-data-container">
                <div className="no-data-icon">📋</div>
                <div className="no-data-text">No hay datos adicionales disponibles.</div>
            </div>
        );
    }

    const { nombreDeEss } = data.servicios || {};

    // Helper para filtrar campos por sección
    const getFieldsBySection = (sectionName) => {
        return adicionalesConfig.filter(field => field.section === sectionName);
    };

    const handleAction = (type) => {
        handleDownload(type); 
        setIsDropdownOpen(false); 
    }

    // Componente de Item (Reutilizado para consistencia visual)
    const InfoItem = ({ label, value }) => {
        const displayValue = value ? value : "—"; 
        return (
            <div className="modern-info-item">
                <span className="info-label">{label}</span>
                <span className="info-value compact">{displayValue}</span>
            </div>
        );
    };

    return (
        <div className="modern-service-container">
            <header className="service-header">
                <div className="header-titles">
                    <h1 className="service-title">{nombreDeEss || 'Sin Nombre'}</h1>
                    <div className="service-meta">
                        <span className="meta-tag">Sección: <strong>Adicionales</strong></span>
                    </div>
                </div>

                <div className="header-actions">
                    {!isEditing && (
                        <button onClick={() => setIsEditing(true)} className="btn-modern btn-primary">
                            Editar
                        </button>
                    )}
                    
                    <div className="modern-dropdown-container">
                        <button 
                            className={`btn-modern btn-secondary ${isDropdownOpen ? 'active' : ''}`}
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        >
                            Descargar ▾
                        </button>
                        
                        {isDropdownOpen && (
                            <>
                                <div className="dropdown-overlay" onClick={() => setIsDropdownOpen(false)}/>
                                <div className="modern-dropdown-menu">
                                    <button className="dropdown-item" onClick={() => handleAction('intercambio')}>
                                        📥 Formato Cambio
                                    </button>
                                    <button className="dropdown-item" onClick={() => handleAction('mantenimiento')}>
                                        🛠️ Formato Mantenimiento
                                    </button>
                                    <button className="dropdown-item" onClick={() => handleAction('retiro')}>
                                        📤 Formato Retiro
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </header>

            {/* --- Tabs --- */}
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

            {/* --- Contenido Principal (Alta Densidad) --- */}
            <div className="service-content-area">
                <div className="info-grid-wrapper animate-fade-in">
                    
                    {/* Sección 1: General */}
                    <section className="data-section">
                        <div className="modern-grid-4">
                            {getFieldsBySection('General').map(field => (
                                <InfoItem 
                                    key={field.key} 
                                    label={field.label} 
                                    value={data.adicionales[field.key]} 
                                />
                            ))}
                        </div>
                    </section>

                    <div className="divider"></div>

                    <div className="comparison-wrapper">
                        <section className="data-section">
                            <div className="modern-grid-2-dense">
                                {getFieldsBySection('Entra').map(field => (
                                    <InfoItem 
                                        key={field.key} 
                                        label={field.label} 
                                        value={data.adicionales[field.key]} 
                                    />
                                ))}
                            </div>
                        </section>

                        <section className="data-section">
                            <div className="modern-grid-2-dense">
                                {getFieldsBySection('Sale').map(field => (
                                    <InfoItem 
                                        key={field.key} 
                                        label={field.label} 
                                        value={data.adicionales[field.key]} 
                                    />
                                ))}
                            </div>
                        </section>
                    </div>

                    <div className="divider"></div>

                    {/* Sección 3: Stock */}
                    <section className="data-section">
                        <div className="modern-grid-4">
                            {getFieldsBySection('Stock').map(field => (
                                <InfoItem 
                                    key={field.key} 
                                    label={field.label} 
                                    value={data.adicionales[field.key]} 
                                />
                            ))}
                        </div>
                    </section>

                </div>
            </div>
        </div>
    );
}

export default RenderDatosAdicionales;