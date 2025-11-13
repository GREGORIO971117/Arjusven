import React from 'react';
import '../Inventario/InventarioList.css';

export default function RenderDatosEstacion({ data, onEdit }) {

    if (!data) {
        return null;
    }

    const InfoItem = ({ label, value }) => {
        let displayValue = value === null || value === undefined || value === '' ? 'Vacío' : value.toString();
        if (typeof value === 'number' && value === 0) {
            displayValue = '0';
        }

        return (
            <div className='infoItem'>
                {label}:
                <strong><span>{displayValue}</span></strong> 
            </div>
        );
    };

    const {
        idMerchant, afiliadoAS400, afiliadoATPV, controladorVolumetrico, rankingEdenred,
        modelo, tipoDeConexion, tipoSIM, carrier, cantPOSActivas, nombreComercial,
        codigoPEMEX, tipoPEMEX, direccion, coloniaAsentamiento, cp, municipio,
        estado, telefono1, telefono2, soporteNoviembre2022, km, cobertura, 
        plazaDeAtencion, as400, bo, grupo, prioridad, referencias, 
        supervisorArjus, rollos, transporte, tecnicoAsignado
    } = data;

    return (
        <> 
            <div className="ticket-header">
                <h2 className="ticket-title">
                  {idMerchant}  Estación: {nombreComercial} 
                    
                    <button onClick={onEdit} className="edit-button">Editar</button>
                </h2>
            </div>

            <div className="detalleGridContainer">
                
                <div className="grid3">
                    <InfoItem label="ID Merchant" value={idMerchant} />
                    <InfoItem label="Nombre Comercial" value={nombreComercial} />
                    <InfoItem label="Código PEMEX" value={codigoPEMEX} />
                    <InfoItem label="Tipo PEMEX" value={tipoPEMEX} />
                    
                    <InfoItem label="Colonia/Asentamiento" value={coloniaAsentamiento} />
                    <InfoItem label="CP" value={cp} />
                    <InfoItem label="Municipio" value={municipio} />
                    <InfoItem label="Estado" value={estado} />
                    <InfoItem label="Plaza de Atención" value={plazaDeAtencion} />
                    <InfoItem label="Cobertura" value={cobertura} />
                
                    <InfoItem label="Afiliado AS 400" value={afiliadoAS400} />
                    <InfoItem label="Afiliado ATPV" value={afiliadoATPV} />
                    <InfoItem label="Controlador Volumétrico" value={controladorVolumetrico} />
                    <InfoItem label="Modelo" value={modelo} />
                    <InfoItem label="Tipo de Conexión" value={tipoDeConexion} />
                    <InfoItem label="Tipo SIM" value={tipoSIM} />
                    <InfoItem label="Carrier" value={carrier} />
                    <InfoItem label="Cant. POS Activas" value={cantPOSActivas} />
                    <InfoItem label="AS 400" value={as400} />
                    <InfoItem label="BO" value={bo} />

                    <InfoItem label="Grupo" value={grupo} />
                    <InfoItem label="Prioridad" value={prioridad} />
                    <InfoItem label="Ranking Edenred" value={rankingEdenred} />
                    <InfoItem label="Supervisor ARJUS" value={supervisorArjus} />
                    <InfoItem label="Técnico Asignado" value={tecnicoAsignado} />
                    <InfoItem label="Transporte ($$)" value={transporte} />
                    <InfoItem label="Rollos (Cantidad)" value={rollos} />
                    <InfoItem label="KM" value={km} />
               
                    <InfoItem label="Teléfono 1" value={telefono1} />
                    <InfoItem label="Teléfono 2" value={telefono2} />
                    <InfoItem label="Soporte (Nov 2022)" value={soporteNoviembre2022} />
                    <InfoItem label="Referencias" value={referencias} />
                    
                </div>
                <div className="grid">
                    <InfoItem label="Dirección" value={direccion} />
                </div>
            </div>

        </>
    );
}