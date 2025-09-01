import React from 'react';
import RenderEditDataInventory from './RenderEditDataInventory';
import './InventoryTemplate.css';

function InventoryTemplate({ data, isEditing, onEdit, onSave, onCancel }) {
    // Si no hay datos, muestra un mensaje
    if (!data) {
        return (
            <div className="no-data-message">
                No se ha proporcionado información de inventario.
            </div>
        );
    }

    // Renderiza el componente de edición si isEditing es verdadero
    if (isEditing) {
        return (
            <div className="ticket-template-container">
                <div className="ticket-header">
                    <h1 className="template-title">Editando: {data.numeroSerie}</h1>
                    <div className="template-actions">
                        {/* Se pasan las funciones de guardar y cancelar como props */}
                        <button className="save-button" onClick={onSave}>Guardar</button>
                        <button className="cancel-button" onClick={onCancel}>Cancelar</button>
                    </div>
                </div>
                <div className="ticket-content">
                    {/* Renderiza el formulario de edición */}
                    <RenderEditDataInventory data={data} />
                </div>
            </div>
        );
    }

    // Renderiza la vista de solo lectura si no se está editando
    return (
        <div className="template-container">
            <div className="template-header">
                <h1 className="template-title">{data.plaza}</h1>
                <p className="template-subtitle">
                    <strong>Número de Serie:</strong> {data.numeroSerie}
                </p>
                <div className="template-actions">
                    {/* Se pasa la función onEdit como prop */}
                    <button className="edit-button" onClick={onEdit}>Editar</button>
                </div>
            </div>

            <div className="template-content two-column-layout">
                {/* Primera Columna (Read-only) */}
                <div className="column">
                    <div className="section-title">Información General</div>
                    <div className="info-item">
                        <strong>Fecha inicio prevista:</strong>
                        <span>{data.fechaInicioPrevista}</span>
                    </div>
                    <div className="info-item">
                        <strong>Responsable:</strong>
                        <span>{data.responsable}</span>
                    </div>
                    <div className="info-item">
                        <strong>Código E-mail:</strong>
                        <span>{data.codigoEmail}</span>
                    </div>
                    <div className="info-item">
                        <strong>Título:</strong>
                        <span>{data.titulo}</span>
                    </div>
                    <div className="info-item">
                        <strong>Descripción:</strong>
                        <span>{data.descripcion}</span>
                    </div>
                    <div className="info-item">
                        <strong>Fecha de Actualización:</strong>
                        <span>{data.fechaActualizacion}</span>
                    </div>
                    <div className="info-item">
                        <strong>Equipo:</strong>
                        <span>{data.equipo}</span>
                    </div>
                </div>

                {/* Segunda Columna (Read-only) */}
                <div className="column">
                    <div className="section-title">Detalles del Inventario</div>
                    <div className="info-item">
                        <strong>Nº de Serie:</strong>
                        <span>{data.numeroSerie}</span>
                    </div>
                    <div className="info-item">
                        <strong>Nº última incidencia:</strong>
                        <span>{data.numeroIncidencia}</span>
                    </div>
                    <div className="info-item">
                        <strong>Estado:</strong>
                        <span>{data.estado}</span>
                    </div>
                    <div className="info-item">
                        <strong>Cliente:</strong>
                        <span>{data.cliente}</span>
                    </div>
                    <div className="info-item">
                        <strong>Plaza:</strong>
                        <span>{data.plaza}</span>
                    </div>
                    <div className="info-item">
                        <strong>Guías:</strong>
                        <span>{data.guias}</span>
                    </div>
                    <div className="info-item">
                        <strong>Técnico de Campo:</strong>
                        <span>{data.tecnicoCampo}</span>
                    </div>
                </div>
            </div>
            
            <div className="template-footer">
                <div className="section-title">Fechas</div>
                <div className="info-item">
                    <strong>Fecha fin prevista:</strong>
                    <span>{data.fechaFinPrevista}</span>
                </div>
                <div className="info-item">
                    <strong>Fecha Fin:</strong>
                    <span>{data.fechaFin}</span>
                </div>
            </div>
        </div>
    );
}

export default InventoryTemplate;