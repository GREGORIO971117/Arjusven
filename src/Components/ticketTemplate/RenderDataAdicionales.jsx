import {useState} from 'react';
import {adicionalesConfig} from '../../assets/adicionalesConfig';

function RenderDatosAdicionales({ 
    data, 
    activeTab,
    setActiveTab, 
    isEditing, 
    setIsEditing,
    handleDownload,
    styles}) {


    const [isOpen, setIsOpen] = useState(false);

    const handleAction = (type) => {
        handleDownload(type); 
        setIsOpen(false); 
    }

    if (!data.adicionales) {
        return <div>No hay datos adicionales disponibles.</div>;
    }

    const { nombreDeEss } = data.servicios || {};

    const InfoItem = ({ label, value }) => {
        const displayValue = value ? value : "—"; 
        return (
            <div className="infoItem">
                <strong>{label}:</strong><span>{displayValue} </span>
            </div>
        );
    };

    return (
        <>
            <div className="ticket-tabs">
                <button
                    className={`tab-button ${activeTab === 'servicio' ? 'active' : ''}`}
                    onClick={() => setActiveTab('servicio')}
                >
                    Datos de Servicio
                </button>
                <button
                    className={`tab-button ${activeTab === 'adicionales' ? 'active' : ''}`}
                    onClick={() => setActiveTab('adicionales')}
                >
                    Datos Adicionales
                </button>

                <h2 className="title">
                    <strong>{nombreDeEss}</strong>
                </h2>
                
                {/* Contenedor de Acciones del Ticket */}
                <div className="ticket-actions">
                    {!isEditing && (
                        <button onClick={() => setIsEditing(true)} className="edit-button">
                            Editar
                        </button>
                    )}
                    
                    {/* --- Dropdown de Descarga IMPLEMENTADO --- */}
                    <div style={styles.downloadDropdownContainer}>
                        <button 
                            style={styles.downloadButton}
                            onClick={() => setIsOpen(!isOpen)} // Alterna el estado del menú
                        > 
                            Descargar <span style={styles.dropdownArrow}>{isOpen ? '▲' : '▼'}</span>
                        </button>
                        
                        {isOpen && (
                            <div style={styles.dropdownMenu}>
                                {/* Botones configurados para usar los nombres de plantillas del backend */}
                                <button style={styles.dropdownItem} onClick={() => handleAction('intercambio')}>
                                    Descargar Cambio
                                </button>
                                <button style={styles.dropdownItem} onClick={() => handleAction('mantenimiento')}>
                                    Descargar Mantenimiento
                                </button>
                                <button style={styles.dropdownItem} onClick={() => handleAction('retiro')}>
                                    Descargar Retiro
                                </button>
                            </div>
                        )}
                    </div>
                    {/* -------------------------------------- */}
                </div>
            </div>

            <div className="detalleGridContainer">
                <div className="grid3">
                    {adicionalesConfig.map(field => (
                        <InfoItem 
                            key={field.key} 
                            label={field.label} 
                            value={data.adicionales[field.key]} 
                        />
                    ))}
                </div>
            </div>
        </>
    );
}

export default RenderDatosAdicionales;