import React from 'react';
// Importamos la configuración centralizada
import {adicionalesConfig} from '../../assets/adicionalesConfig';

function RenderDatosAdicionales({ data, activeTab, setActiveTab, isEditing, setIsEditing }) {

    if (!data.adicionales) {
        return <div>No hay datos adicionales disponibles.</div>;
    }

    const { nombreDeEss } = data.servicios || {};

    // El componente InfoItem se mantiene igual
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
                
                <div className="ticket-actions">
                    {!isEditing && (
                        <button onClick={() => setIsEditing(true)} className="edit-button">
                            Editar
                        </button>
                    )}
                    <button className="download-button">
                        Descargar
                    </button>
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