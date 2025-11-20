import React, { useState, useEffect } from 'react';
import { styles } from '../admin/adminTemplate'; 
import { adicionalesConfig } from '../../assets/adicionalesConfig'; 

const RenderEditarDatosAdicionales = ({ data, onCancelEdit, onSaveEdit, onDeleteEdit }) => {
    
    const [formData, setFormData] = useState({});
    const [localError, setLocalError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (data) {
            setFormData(data);
        }
    }, [data]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setLocalError(null);
    };

    const handleCancel = () => {
        if (onCancelEdit) onCancelEdit();
    };

    const handleSave = async () => {
        setLocalError(null);
        setIsSubmitting(true);
        
        try {
            const result = await onSaveEdit(formData); 
            
            if (result && result.success) {
                if (onCancelEdit) onCancelEdit(); 
            } else {
                throw new Error(result?.error || "Error desconocido al guardar. Verifica el ID del servicio.");
            }
        } catch (err) {
            console.error("Fallo al ejecutar onSaveEdit:", err);
            setLocalError(err.message || "Fallo la operación de guardado.");
        } finally {
            setIsSubmitting(false);
        }
    };
    
    if (!formData || Object.keys(formData).length === 0) {
        return <div>Cargando datos de Servicio...</div>;
    }

    return(
        <div style={{...styles.card}}>
            <div style={styles.row}>
                
                {adicionalesConfig.map(field => (
                    <label key={field.key} style={styles.label}>
                        <strong>{field.label}:</strong>
                        <input 
                            type={field.type} 
                            id={field.key} 
                            name={field.key}
                            value={formData[field.key] || ''} 
                            onChange={handleChange} 
                            style={styles.input} 
                        />
                    </label>
                ))}
                
                {/* El campo oculto se mantiene si es necesario para el ID */}
                <input type="hidden" name="idServicios" value={formData.idServicios || ''} />

            </div>
            
            {localError && <div style={styles.error}>{localError}</div>}

            {/* Botones de Acción (Se mantienen iguales) */}
            <div style={{ marginTop: 20, display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
                <button 
                    type="button" 
                    onClick={onDeleteEdit}
                    style={styles.buttonDanger}
                    disabled={isSubmitting}
                >
                    Borrar Incidencia
                </button>
                <button 
                    type="button" 
                    onClick={handleCancel}
                    style={styles.navButton} 
                    disabled={isSubmitting}
                >
                    Cancelar
                </button>
                <button 
                    type="button" 
                    onClick={handleSave}
                    style={styles.buttonPrimary} 
                    disabled={isSubmitting} 
                >
                    {isSubmitting ? "Guardando..." : "Guardar Cambios"}
                </button>
            </div>
        </div>
    );
};

export default RenderEditarDatosAdicionales;