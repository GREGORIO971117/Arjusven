import React from 'react';

function RenderDatosAdicionales({ data, activeTab, setActiveTab, isEditing, setIsEditing }) {

    if (!data.adicionales) {
        return <div>No hay datos adicionales disponibles.</div>;
    }

    const {

        ciudad, 
        modeloEntra,      
        marcaEntra,       
        serieLogicaEntra, 
        serieFisicaEntra, 
        eliminadorEntra,  
        modeloSale,       
        marcaSale,        
        serieLogicaSale,  
        serieFisicaSale,  
        eliminadorSale,     
        estado,        
        ordenDeServicio,    
        plaza,              
        tecnico,            
        cerroEnPuntoClave, 
        atencionEnPunto,   
        firmaEnEstacion,    
        tarjeta,            
        cantidadTpv,   
        tipoDeComunicacion, 
        sim,              
        ptidEntra,        
        simSale,         
        ptidSale,           
        versionDeBrowserSale,    
        versionDeBrowserEntra,
        tipoDeComunicacionSale,   
        serieQueQuedaDeStock, 
        simQueQuedaDeStock,  
        modeloDeStock         
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
                    <InfoItem label="Ciudad" value={ciudad} />
                    <InfoItem label="Cantidad TPV en Base" value={cantidadTpv} /> 
                    <InfoItem label="Estado" value={estado} />
                    <InfoItem label="Orden de Servicio" value={ordenDeServicio} />
                    <InfoItem label="Plaza" value={plaza} />
                    <InfoItem label="Técnico" value={tecnico} />
                    <InfoItem label="Cerro en Punto Clave" value={cerroEnPuntoClave} /> 
                    <InfoItem label="Atención en Punto" value={atencionEnPunto} />
                    <InfoItem label="Firma en Estación" value={firmaEnEstacion} />
                    <InfoItem label="#Tarjeta / TAG" value={tarjeta} /> 
                    <InfoItem label="Modelo entra" value={modeloEntra} />
                    <InfoItem label="Marca Entra" value={marcaEntra} />
                    <InfoItem label="Serie Lógica entra" value={serieLogicaEntra} />
                    <InfoItem label="Serie Física entra" value={serieFisicaEntra} />
                    <InfoItem label="Tipo de Comunicación" value={tipoDeComunicacion} /> 
                    <InfoItem label="SIM entra" value={sim} /> 
                    <InfoItem label="PTID entra" value={ptidEntra} />
                    <InfoItem label="Eliminador Entra" value={eliminadorEntra} />
                    <InfoItem label="Modelo Sale" value={modeloSale} />
                    <InfoItem label="Marca Sale" value={marcaSale} />
                    <InfoItem label="Serie Lógica sale" value={serieLogicaSale} />
                    <InfoItem label="Serie Física sale" value={serieFisicaSale} />
                    <InfoItem label="Versión Browser Sale" value={versionDeBrowserSale} />
                    <InfoItem label="Versión Browser Entra" value={versionDeBrowserEntra} />
                    <InfoItem label="Tipo Comunicación Sale" value={tipoDeComunicacionSale} />
                    <InfoItem label="SIM Sale" value={simSale} />
                    <InfoItem label="PTID Sale" value={ptidSale} />
                    <InfoItem label="Eliminador Sale" value={eliminadorSale} />

                    <InfoItem label="Serie de Stock" value={serieQueQuedaDeStock} /> 
                    <InfoItem label="SIM de Stock" value={simQueQuedaDeStock} /> 
                    <InfoItem label="Modelo de Stock" value={modeloDeStock} /> 
                                        
                </div>

            </div>
        </>
    );
};

export default RenderDatosAdicionales;