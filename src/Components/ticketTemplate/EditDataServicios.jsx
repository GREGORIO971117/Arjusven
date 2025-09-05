import React, { useState } from 'react';

const RenderEditarDatosServicio = ({ editableData, handleInputChange, handleSave, handleCancel, handleDelete, options }) => {
    // Estado para el modal de guardar
    const [showSaveModal, setShowSaveModal] = useState(false);
    // Estado para el modal de eliminar
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    
    // Funciones para manejar el modal de guardar
    const openSaveModal = () => {
        setShowSaveModal(true);
    };

    const closeSaveModal = () => {
        setShowSaveModal(false);
    };

    const handleConfirmSave = () => {
        handleSave();
        closeSaveModal();
    };

    // Funciones para manejar el modal de eliminar
    const openDeleteModal = () => {
        setShowDeleteModal(true);
    };

    const closeDeleteModal = () => {
        setShowDeleteModal(false);
    };

    const handleConfirmDelete = () => {
        handleDelete();
        closeDeleteModal();
    };

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
                            {options.situacion.map(situacion => (
                                <option key={situacion} value={situacion}>{situacion}</option>
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
                            {options.supervisores.map(supervisores => (
                                <option key={supervisores} value={supervisores}>{supervisores}</option>
                            ))}
                        </select>
                    </label>
                    <label className="info-item">
                        <strong>Tipo de Servicio</strong>
                        <select
                            type="text"
                            value={editableData.contactInfo?.serviceType || ''}
                            onChange={(e) => handleInputChange('contactInfo', 'serviceType', e.target.value)}
                        >
                            <option value="">Selecciona un tipo de servicio</option>
                            {options.servicio.map(servicio => (
                                <option key={servicio} value={servicio}>{servicio}</option>
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
                            <option value="">Selecciona un técnico</option>
                            {options.tecnicos.map(tecnico => (
                                <option key={tecnico} value={tecnico}>{tecnico}</option>
                            ))}
                        </select>
                    </label>
                    <label className="info-item">
                        <strong>SLA</strong>
                        <select
                            type="text"
                            value={editableData.contactInfo?.sla || ''}
                            onChange={(e) => handleInputChange('contactInfo', 'sla', e.target.value)}
                        >
                            <option value="">Selecciona un SLA</option>
                            {options.sla.map(sla => (
                                <option key={sla} value={sla}>{sla}</option>
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
                <button className="delete-button" onClick={openDeleteModal}>Eliminar</button>
                <button className="save-button" onClick={openSaveModal}>Guardar</button>
                <button className="cancel-button" onClick={handleCancel}>Cancelar</button>
            </div>

            {showSaveModal && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h3>Confirmar cambios</h3>
                        <p>¿Estás seguro de que deseas guardar cambios?</p>
                        <div className="modal-buttons">
                            <button className="confirm-save-button" onClick={handleConfirmSave}>Sí, Guardar</button>
                            <button className="cancel-save-button" onClick={closeSaveModal}>No, cancelar</button>
                        </div>
                    </div>
                </div>
            )}

            {showDeleteModal && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h3>Confirmar Eliminación</h3>
                        <p>¿Estás seguro de que deseas eliminar este ticket?</p>
                        <div className="modal-buttons">
                            <button className="confirm-delete-button" onClick={handleConfirmDelete}>Sí, eliminar</button>
                            <button className="cancel-delete-button" onClick={closeDeleteModal}>No, cancelar</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RenderEditarDatosServicio;