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
        codigoDeAfiliado,
        supervisor, 
        idMerchant,
        tipoDeServicio,
        motivoDeServicio,
        motivoReal,
        observaciones,
        guiaDeEncomienda,
        fechaDeEnvio, // Mapeado de 'Fecha_de_envio'
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
                    {/* El título puede ser dinámico, por ejemplo, el nombre de la ESS */}
                    <strong>{nombreDeEss || 'Sin Nombre'}</strong> 
                </h2>

                <div className="ticket-actions">
                    {!isEditing && (
                        // 🔑 Llamada para cambiar el estado a edición en el componente padre (TicketTemplate)
                        <button onClick={() => setIsEditing(true)} className="edit-button">
                            Editar
                        </button>
                    )}
                    <button className="download-button">
                        Descargar
                    </button> 
                </div>
            </div>

            {/* --- Renderizado Condicional del Contenido --- */}
            {activeTab === 'servicio' && (
                <div className='infoSection'>
                    <div className="section">
                        {/* Columna 1 */}
                        <InfoItem label="Fecha de Asignación" value={fechaDeAsignacion} />
                        <InfoItem label="Resolución" value={resolucion} />
                        <InfoItem label="Situación Actual" value={situacionActual} />
                        <InfoItem label="Nombre de ESS" value={nombreDeEss} />
                        <InfoItem label="Incidencia" value={incidencia} />
                        <InfoItem label="Código de Afiliado" value={codigoDeAfiliado} />
                        <InfoItem label="Supervisor" value={supervisor} />
                        <InfoItem label="ID Merchant" value={idMerchant} />
                        <InfoItem label="Tipo de Servicio" value={tipoDeServicio} />
                    </div>

                    <div className="section">
                        {/* Columna 2 */}
                        <InfoItem label="Motivo del Servicio" value={motivoDeServicio} />
                        <InfoItem label="Motivo real del Servicio en sitio" value={motivoReal} />
                        <InfoItem label="Observaciones ARJUSVEN" value={observaciones} />
                        <InfoItem label="Guía de Encomienda" value={guiaDeEncomienda} />
                        <InfoItem label="Fecha de envío de guía" value={fechaDeEnvio} />
                        <InfoItem label="Dirección" value={direccion} />
                        <InfoItem label="Técnico de Campo" value={tecnico} />
                        <InfoItem label="SLA" value={sla} />
                    </div>
                </div>
            )}
            
            {/* Aquí iría la lógica para renderizar los Datos Adicionales si activeTab === 'adicionales' */}
            {/* Por ahora, si no es 'servicio', no renderiza nada en esta sección */}

        </>
    );
};

export default RenderDatosServicio;