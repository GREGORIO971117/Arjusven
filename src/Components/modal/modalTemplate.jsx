import React from 'react';
import './ModalStyles.css'; // Debes crear este archivo CSS/TSX para los estilos

export default function ModalTemplate({
    isOpen,
    onClose,
    title,
    message,
    type = 'info', 
    onConfirm,
    confirmText = 'Aceptar',
    children
}) {

    if (!isOpen) return null;

    // Iconos dinámicos basados en el tipo
    const getIcon = () => {
        switch (type) {
            case 'success': return '✅';
            case 'error': return '❌';
            case 'warning': return '⚠️';
            case 'confirm': return '❓';
            case 'info':
            default: return 'ℹ️';
        }
    };
    
    // Función para manejar la confirmación y el cierre
    const handleConfirm = () => {
        if (onConfirm) {
            onConfirm();
        }
        onClose();
    };

    return (
        <div className="modal-backdrop">
            <div className={`modal-container modal-type-${type}`}>
                
                <div className="modal-header">
                    <span className="modal-icon">{getIcon()}</span>
                    <h3 className="modal-title">{title}</h3>
                    <button className="modal-close-button" onClick={onClose}>&times;</button>
                </div>

                <div className="modal-body">
                    <p>{message}</p>
                    {children}
                </div>

                <div className="modal-footer">
                    {type === 'confirm' && (
                        <button className="btn btn-secondary" onClick={onClose}>
                            Cancelar
                        </button>
                    )}
                    
                    <button 
                        className={`btn btn-primary btn-type-${type}`} 
                        onClick={type === 'confirm' ? handleConfirm : onClose}
                    >
                        {type === 'confirm' ? confirmText : 'Cerrar'}
                    </button>
                </div>

            </div>
        </div>
    );
}