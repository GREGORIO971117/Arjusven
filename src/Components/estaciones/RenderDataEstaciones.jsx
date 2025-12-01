import React from 'react';
import '../Inventario/InventarioList.css';
import { estacionesConfig } from '../../assets/estacionesConfig';

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

   const grid3keys = [
        'idMerchant',
        'nombreComercial',
        'codigoPEMEX',
        'tipoPEMEX',
        'coloniaAsentamiento',
        'cp',
        'municipio',
        'estado',
        'plazaDeAtencion',
        'cobertura',
        'afiliadoAS400',
        'afiliadoATPV',
        'controladorVolumetrico',
        'modelo',
        'tipoDeConexion',
        'tipoSIM',
        'carrier',
        'cantPOSActivas',
        'as400',
        'bo',
        'grupo',
        'prioridad',
        'rankingEdenred',
        'supervisorArjus',
        'tecnicoAsignado',
        'transporte',
        'rollos',
        'km',
        'telefono1',
        'telefono2',
        'soporteNoviembre2022',
        'direccion',
        'referencias'
   ];

    const getConfig = (key) => estacionesConfig.find(field => field.key === key);

    return (
        <> 
            <div className="ticket-header">
                <h2 className="ticket-title">
                  {data.idMerchant}  - {data.nombreComercial} 
                    
                    <button onClick={onEdit} className="edit-button">Editar</button>
                </h2>
            </div>

            <div className="detalleGridContainer">
                
                <div className="grid3"> 
                    {grid3keys.map(key => {
                        const config = getConfig(key);
                        const label = config ? config.label : key;
                        if (!config) return null;

                        return <InfoItem
                                 key={key}
                                 label={label}
                                 value={data[key]} 
                        />;
                    })}
                </div>
            </div>

        </>
    );
}