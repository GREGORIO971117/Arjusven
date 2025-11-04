import React from 'react';

// Ahora, este componente espera recibir 'serviceData' que es la entidad Servicio
const RenderDatosServicio = ({ data, activeTab, setActiveTab, isEditing, setIsEditing }) => {
    
    // Si no hay datos de servicio, mostramos un mensaje (aunque en teoría siempre deberían venir)
    if (!data) {
        return <div className="no-data-message">No se encontraron datos de Servicio para este ticket.</div>;
    }

    const InfoItem = ({ label, value }) => {
        // Aseguramos que el valor no sea null/undefined y usamos un guion si está vacío
        const displayValue = value === undefined || value === null || value === '' ? '—' : value;
        
        return (
            <div className='infoItem'>
                <strong>{label}:</strong> <span>{displayValue}</span>
            </div>
        );
    }

    // --- Mapeo de Propiedades de serviceData a Variables Legibles ---
    // Usamos el destructuring para acceder directamente a las props del backend (Servicio.java)
    const {
        fechaDeAsignacion,
        resolucion,
        situacionActual,
        nombreDeEss, // Mapeado de 'Nombre_de_ESS'
        incidencia,
        codigoDeAfiliado,
        supervisor, // Nota: Este campo es String, no objeto Usuario
        idMerchant,
        tipoDeServicio,
        motivoDeServicio,
        motivoReal,
        observaciones,
        guiaDeEncomienda,
        fechaDeEnvio, // Mapeado de 'Fecha_de_envio'
        direccion,
        tecnico, // Nota: Este campo es String, no objeto Usuario
        sla
    } = data;


    // Solo mostramos el contenido de la pestaña de Servicio si está activa.
    // Asumimos que la lógica de pestañas ('adicionales') se maneja a nivel superior
    // o que este componente solo renderiza CUANDO la pestaña 'servicio' está activa.

    return (
        <>
            {/* --- Controles Superiores --- */}
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