import React from 'react';

// Se removió 'onEdit' ya que no se usa y se pasó 'data' como prop principal
function RenderDatosAdicionales({ data, activeTab, setActiveTab, isEditing, setIsEditing }) {

    if (!data.adicionales) {
        return <div>No hay datos adicionales disponibles.</div>;
    }

    // 🔑 Desestructuramos directamente el objeto 'adicionales' para simplificar el código
    const {
        caseNumber,
        ciudad, 
        cantidadTPV, 
        modeloEntra, 
        marcaEntra,
        serieLogicaEntra, 
        serieFisicaEntra, 
        versionBrowser, 
        tipoComunicacion,
        simEntra, 
        ptidEntra, 
        eliminadorEntra, 
        eliminadorSale, 
        estado,
        ordenDeServicio, 
        modeloSale, 
        marcaSale, 
        serieLogicaSale,
        serieFisicaSale, 
        versionBrowserSale, 
        tipoComunicacionSale,
        simSale, 
        ptidSale, 
        plaza, 
        tecnico, 
        cerroPuntoClave,
        atencionEnPunto, 
        firmaEnEstacion, 
        tarjetaTag, 
        serieStock,
        simStock, 
        modeloStock
    } = data.adicionales;

    const{
      nombreDeEss
    }=data.servicios;



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
                    <strong>{nombreDeEss || 'Sin pena ni gloria'}</strong>
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
                    <InfoItem label="Case Number" value={caseNumber} />
                    <InfoItem label="Ciudad" value={ciudad} />
                    <InfoItem label="Plaza" value={plaza} />
                    <InfoItem label="Técnico" value={tecnico} />
                    <InfoItem label="Estado" value={estado} />
                    <InfoItem label="Orden de Servicio" value={ordenDeServicio} />
                    <InfoItem label="Cerro en Punto Clave" value={cerroPuntoClave} />
                    <InfoItem label="Atención en Punto" value={atencionEnPunto} />
                    <InfoItem label="Firma en Estación" value={firmaEnEstacion} />
                    <InfoItem label="#Tarjeta / TAG" value={tarjetaTag} />
                    <InfoItem label="Cantidad TPV en Base" value={cantidadTPV} />
                    <InfoItem label="Modelo entra" value={modeloEntra} />
                    <InfoItem label="Marca Entra" value={marcaEntra} />
                    <InfoItem label="Serie Lógica entra" value={serieLogicaEntra} />
                    <InfoItem label="Serie Física entra" value={serieFisicaEntra} />
                    <InfoItem label="SIM entra" value={simEntra} />
                    <InfoItem label="PTID entra" value={ptidEntra} />
                    <InfoItem label="Eliminador Entra" value={eliminadorEntra} />
                    <InfoItem label="Versión Browser" value={versionBrowser} />
                    <InfoItem label="Tipo de Comunicación" value={tipoComunicacion} />
                    <InfoItem label="Modelo Sale" value={modeloSale} />
                    <InfoItem label="Marca Sale" value={marcaSale} />
                    <InfoItem label="Serie Lógica sale" value={serieLogicaSale} />
                    <InfoItem label="Serie Física sale" value={serieFisicaSale} />
                    <InfoItem label="SIM Sale" value={simSale} />
                    <InfoItem label="PTID Sale" value={ptidSale} />
                    <InfoItem label="Eliminador Sale" value={eliminadorSale} />
                    <InfoItem label="Versión Browser Sale" value={versionBrowserSale} />
                    <InfoItem label="Tipo Com. Sale" value={tipoComunicacionSale} />
                    <InfoItem label="Modelo de Stock" value={modeloStock} />
                    <InfoItem label="Serie de Stock" value={serieStock} />
                    <InfoItem label="SIM de Stock" value={simStock} />
                </div>

            </div>
        </>
    );
};

export default RenderDatosAdicionales;