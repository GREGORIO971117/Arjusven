import React from 'react';
import './InventarioList.css';
import { inventarioConfig } from '../../assets/inventarioConfig';

const formatDate = (dateString) => {
    if (typeof dateString === 'string') {
        return dateString.slice(0, 10);
    }
    return dateString || '';
};


function RenderDatosInventario({ data, onEdit, loadHistorial }) {

    if (!data) {
        return <div>No hay datos disponibles.</div>;
    }

    const InfoItem = ({ label, value }) => {
        const displayValue = value === undefined || value === null || value === '' ? '—' : value;

        return (
            <div className='infoItem'>
                <strong>{label}:<span>{displayValue}</span></strong> 
            </div>
        );
    };

    const gri2dKeys = [
        'titulo',
        'numeroDeSerie',
        'responsable',
        'codigoEmail',
        'cliente',
        'plaza',
        'numeroDeIncidencia',
        'guias',
        'equipo',
        'estado',
        'tecnico',
        'fechaInicioPrevista',
        'fechaFinPrevista',
        'fechaActualizacion',
        'fechaFin',
        'descripcion'
    ];

    const getConfig = (key) => inventarioConfig.find(field => field.key === key);
    const { numeroDeSerie, equipo } = data;

    return (
        <> 
            <div className="ticket-header">
                <h2 className="ticket-title">
                    {numeroDeSerie} - {equipo}
                        <button onClick={onEdit} className="edit-button">Editar</button>
                        <button onClick={loadHistorial} className="delete-button">Historial</button>
                </h2>
            </div>

            <div className="detalleGridContainer">
                <div className="grid2">
                    {gri2dKeys.map((key) => {
                        const field = getConfig(key);
                        const label = field ? field.label : key; 
                        return (
                            <InfoItem 
                                key={key} 
                                label={label}
                                value={data[key]}
                                />
                        );
                    })}
                </div>
            </div>

        </>
    );
};

export default RenderDatosInventario;