import React from 'react';
import './InventarioList.css';

/**
 * Función auxiliar para formatear fechas.
 * @param {string | LocalDate} dateString - Cadena de fecha (YYYY-MM-DD o formato largo).
 * @returns {string} Fecha formateada o una cadena vacía.
 */
const formatDate = (dateString) => {
    // Si Java devuelve LocalDate, el string ya será YYYY-MM-DD.
    if (typeof dateString === 'string') {
        return dateString.slice(0, 10);
    }
    return dateString || '';
};


function RenderDatosInventario({ data, onEdit }) {

    if (!data) {
        return null;
    }

    const InfoItem = ({ label, value }) => {
        return (
            <div className='infoItem'>
                <strong>{label}:<span>{value || 'Vacio'}</span></strong> 
            </div>
        );
    };
    const {
        fechaDeInicioPrevista,
        fechaDeFinPrevista, 
        fechaDeFin, 
        ultimaActualizacion, 
        responsable,
        codigoEmail,
        numeroDeSerie,
        titulo,
        descripcion,
        equipo,
        numeroIncidencia,
        estado,
        cliente,
        plaza,
        guias,
        tecnico
    } = data;

    return (

        <> 
            <div className="ticket-header">
                <h2 className="ticket-title">
                    {titulo}
                    <span>
                        <button onClick={onEdit} className="edit-button">Editar</button>
                    </span>
                </h2>
            </div>

            {/* Sección de información en dos columnas */}
            <div className="infoSection">

                {/* Columna 1 */}
                <div className="section">
                    <InfoItem label="Número de Serie" value={numeroDeSerie} />
                    <InfoItem label="Equipo" value={equipo} />
                    <InfoItem label="Estado" value={estado} />
                    <InfoItem label="Responsable" value={responsable} />
                    <InfoItem label="Cliente" value={cliente} />
                    <InfoItem label="Plaza" value={plaza} />
                    <InfoItem label="Técnico de Campo" value={tecnico} /> 
                </div>

                {/* Columna 2 */}
                <div className="section">
                    <InfoItem label="Número de Incidencia" value={numeroIncidencia} />
                    <InfoItem label="Código de Email" value={codigoEmail} />
                    <InfoItem label="Guías" value={guias} />
                    
                    {/* USANDO LOS NOMBRES DE LA API (fechaDeInicioPrevista, etc.) */}
                    <InfoItem label="Fecha de Inicio Prevista" value={formatDate(fechaDeInicioPrevista)} />
                    <InfoItem label="Fecha de Fin Prevista" value={formatDate(fechaDeFinPrevista)} />
                    <InfoItem label="Fecha de Fin" value={formatDate(fechaDeFin)} />
                    <InfoItem label="Última Actualización" value={formatDate(ultimaActualizacion)} />
                    
                    <InfoItem label="Descripción" value={descripcion} /> 
                </div>
            </div>

        </>
    );
};

export default RenderDatosInventario;