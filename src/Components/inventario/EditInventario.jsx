import React from 'react';
import './EditDataServicios.css';
import data from '../../assets/datos.json';

const RenderEditarDatosServicio = ({ editableData, handleInputChange, handleSave, handleCancel, handleDelete }) => {
    const options=data[0];
    
    return (
        <div className="edit-form-container">
            <div className="info-section">
                <div className="info-column">
                    <label className="info-item">
                        <strong>Fecha de Asignación</strong>
                        <input
                            type="date"
                            value={editableData.serviceRequest?.assignmentDate || ''}
                            onChange={(e) => handleInputChange('serviceRequest', 'assignmentDate', e.target.value)}
                        />
                    </label>
                    <label className="info-item">
                        <strong>Fecha de resolución</strong>
                        <input
                            type="date"
                            value={editableData.serviceRequest?.resolution || ''}
                            onChange={(e) => handleInputChange('serviceRequest', 'resolution', e.target.value)}
                        />
                    </label>
                    <label className="info-item">
                        <strong>Situación Actual</strong>
                        <select
                            value={editableData.serviceRequest?.currentStatus || ''}
                            onChange={(e) => handleInputChange('serviceRequest', 'currentStatus', e.target.value)}
                        >
                            <option value="">Selecciona una situación</option>
                            {options.sitaucionActual.map(sitaucionActual=>(
                                <option key={sitaucionActual} value={sitaucionActual}>{sitaucionActual}</option>
                            ))}
                        </select>
                    </label>
                    <label className="info-item">
                        <strong>Nombre de ESS</strong>
                        <input
                            type="text"
                            value={editableData.serviceRequest?.affiliation || ''}
                            onChange={(e) => handleInputChange('serviceRequest', 'affiliation', e.target.value)}
                        />
                    </label>
                    <label className="info-item">
                        <strong>No de Caso</strong>
                        <input
                            type="text"
                            value={editableData.serviceRequest?.caseNumber || ''}
                            onChange={(e) => handleInputChange('serviceRequest', 'caseNumber', e.target.value)}
                        />
                    </label>
                    <label className="info-item">
                        <strong>Código de Afiliado</strong>
                        <input
                            type="text"
                            value={editableData.serviceRequest?.affiliateCode || ''}
                            onChange={(e) => handleInputChange('serviceRequest', 'affiliateCode', e.target.value)}
                        />
                    </label>
                </div>
                
                <div className="info-column">
                    <label className="info-item">
                        <strong>Supervisor</strong>
                        <select
                            value={editableData.contactInfo?.contactPerson?.supervisor || ''}
                            onChange={(e) => handleInputChange('contactInfo', 'contactPerson', { ...editableData.contactInfo?.contactPerson, supervisor: e.target.value })}
                        >
                            <option value="">Selecciona un supervisor</option>
                            {options.supervisores.map(supervisor=>(
                                <option key={supervisor} value={supervisor}>{supervisor}</option>
                            ))}

                        </select>
                    </label>
                    <label className="info-item">
                        <strong>Tipo de Servicio</strong>
                        <select
                            name="serviceType"
                            value={editableData.contactInfo?.serviceType || ''}
                            onChange={(e) => handleInputChange('contactInfo', 'serviceType', e.target.value)}
                        >
                            <option value="">Selecciona un servicio</option>
                            {options.tipoServicio.map(tipoServicio => (
                                <option key={tipoServicio} value={tipoServicio}>{tipoServicio}</option>
                            ))}
                        </select>
                    </label>
                    <label className="info-item">
                        <strong>Técnico de Campo</strong>
                        <select
                            type="text"
                            value={editableData.contactInfo?.fieldTechnician || ''}
                            onChange={(e) => handleInputChange('contactInfo', 'fieldTechnician', e.target.value)}
                        >
                            <option value="">Selecctiona un técnico</option>
                            {options.tecnicos.map(tecnicos=>(
                                <option key={tecnicos} value={tecnicos}>{tecnicos}</option>
                            ))}
                        </select>
                    </label>
                    <label className="info-item">
                        <strong>SLA</strong>
                        <select 
                            name="SLA"
                            value={editableData.contactInfo?.sla || ''}
                            onChange={(e) => handleInputChange('contactInfo', 'sla', e.target.value)}
                        >
                            <option value="">Selecciona un SLA</option>
                            {options.SLA.map(SLA => (
                                <option key={SLA} value={SLA}>{SLA}</option>
                            ))}
                        </select>
                    </label>
                    <label className="info-item">
                        <strong>Guía de Encomienda</strong>
                        <input
                            type="text"
                            value={editableData.bottomInfo?.encomiendaGuide || ''}
                            onChange={(e) => handleInputChange('bottomInfo', 'encomiendaGuide', e.target.value)}
                        />
                    </label>
                    <label className="info-item">
                        <strong>Fecha de envío de guía</strong>
                        <input
                            type="date"
                            value={editableData.bottomInfo?.guideSendDate || ''}
                            onChange={(e) => handleInputChange('bottomInfo', 'guideSendDate', e.target.value)}
                        />
                    </label>
                </div>
            </div>

            <div className="full-width-section">
                <label className="info-item">
                    <strong>Motivo del Servicio</strong>
                    <textarea
                        value={editableData.serviceDetails?.onSiteReason || ''}
                        onChange={(e) => handleInputChange('serviceDetails', 'onSiteReason', e.target.value)}
                    />
                </label>
                <label className="info-item">
                    <strong>Motivo real del Servicio en sitio</strong>
                    <textarea
                        value={editableData.serviceRequest?.serviceReason || ''}
                        onChange={(e) => handleInputChange('serviceRequest', 'serviceReason', e.target.value)}
                    />
                </label>
                <label className="info-item">
                    <strong>Observaciones ARJUSVEN</strong>
                    <textarea
                        value={editableData.serviceDetails?.observations || ''}
                        onChange={(e) => handleInputChange('serviceDetails', 'observations', e.target.value)}
                    />
                </label>
                <label className="info-item">
                    <strong>Dirección</strong>
                    <textarea
                        value={editableData.serviceDetails?.address || ''}
                        onChange={(e) => handleInputChange('serviceDetails', 'address', e.target.value)}
                    />
                </label>
            </div>

            <div className="button-container">
                <button className="delete-button" onClick={handleDelete}>Eliminar</button>
                <button className="save-button" onClick={handleSave}>Guardar</button>
                <button className="cancel-button" onClick={handleCancel}>Cancelar</button>
            </div>
        </div>
    );
};

export default RenderEditarDatosServicio;