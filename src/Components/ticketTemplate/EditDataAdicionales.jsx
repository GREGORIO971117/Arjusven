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
            const sale = formData.serieLogicaSale ? formData.serieLogicaSale.trim() : "";
            const entra = formData.serieLogicaEntra ? formData.serieLogicaEntra.trim() : "";

            if (sale && entra && sale === entra) {
                throw new Error("Los números de serie de Salida y Entrada no pueden ser iguales.");
            }
            const result = await onSaveEdit(formData); 
            
            if (result && result.success) {
                if (onCancelEdit) onCancelEdit(); 
            } else {
                throw new Error(result?.error || "Error desconocido al guardar.");
            }
        } catch (err) {
            console.error("Error en validación o guardado:", err);
            setLocalError(err.message); 
        } finally {
            setIsSubmitting(false);
        }
    };
    
    if (!formData || Object.keys(formData).length === 0) {
        return <div>Cargando datos...</div>;
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
                
                <input type="hidden" name="idAdicionales" value={formData.idAdicionales || ''} />

            </div>
            
            {localError && (
                <div style={{ 
                    color: '#721c24', 
                    backgroundColor: '#f8d7da', 
                    borderColor: '#f5c6cb', 
                    padding: '10px', 
                    marginTop: '10px', 
                    borderRadius: '5px',
                    border: '1px solid transparent' 
                }}>
                    <strong>Error: </strong> {localError}
                </div>
            )}

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
                    {isSubmitting ? "Validando..." : "Guardar Cambios"}
                </button>
            </div>
        </div>
    );
};

export default RenderEditarDatosAdicionales;