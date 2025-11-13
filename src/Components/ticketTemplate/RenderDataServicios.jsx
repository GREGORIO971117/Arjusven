import React from 'react';

const RenderDatosServicio = ({ data, activeTab, setActiveTab, isEditing, setIsEditing }) => {
    
    if (!data) {
        return <div className="no-data-message">No se encontraron datos de Servicio para este ticket.</div>;
    }

    const InfoItem = ({ label, value }) => {
        const displayValue = value === undefined || value === null || value === '' ? '—' : value;
        
        return (
            <div className='infoItem'>
                <strong>{label}:</strong> <span>{displayValue}</span>
            </div>
        );
    }
  
    const {
        fechaDeAsignacion,
        resolucion,
        situacionActual,
        nombreDeEss, 
        incidencia,
        supervisor, 
        idMerchant,
        tipoDeServicio,
        motivoDeServicio,
        motivoReal,
        observaciones,
        guiaDeEncomienda,
        fechaDeEnvio, 
        direccion,
        tecnico, 
        sla
    } = data;

    return (
        <>
            <div className="ticket-tabs">
                <div className="tabs-container">
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
                </div>
                <h2 className="title">
                    <strong>{nombreDeEss || 'Sin Nombre'}</strong> 
                </h2>

                <div className="ticket-actions">
                    {!isEditing && (
                        <button onClick={() => setIsEditing(true)} className="edit-button">
                            Editar
                        </button>
                    )}

                     <button className="edit-button">
                        Inventario usado
                    </button> 

                    <button className="download-button">
                        Descargar
                    </button> 
                   
                </div>
            </div>

            {/* --- Renderizado Condicional del Contenido --- */}
            {activeTab === 'servicio' && (
                <div className='detalleGridContainer'>
                    <div className="grid2">
                        <InfoItem label="Fecha de Asignación" value={fechaDeAsignacion} />
                        <InfoItem label="Resolución" value={resolucion} />
                        <InfoItem label="Situación Actual" value={situacionActual} />
                        <InfoItem label="Nombre de ESS" value={nombreDeEss} />
                        <InfoItem label="Incidencia" value={incidencia} />
                        <InfoItem label="Supervisor" value={supervisor} />
                        <InfoItem label="ID Merchant" value={idMerchant} />
                        <InfoItem label="Tipo de Servicio" value={tipoDeServicio} />
                        <InfoItem label="Guía de Encomienda" value={guiaDeEncomienda} />
                        <InfoItem label="Fecha de envío de guía" value={fechaDeEnvio} />
                        <InfoItem label="Dirección" value={direccion} />
                        <InfoItem label="Técnico de Campo" value={tecnico} />
                        <InfoItem label="SLA" value={sla} />
                        
                    </div>
                    <div className="grid">
                        <InfoItem label="Observaciones ARJUSVEN" value={observaciones} />
                        <InfoItem label="Motivo del Servicio" value={motivoDeServicio} />
                        <InfoItem label="Motivo real del Servicio en sitio" value={motivoReal} />
                    </div>
                </div>
            )}
            
       
        </>
    );
};

export default RenderDatosServicio;