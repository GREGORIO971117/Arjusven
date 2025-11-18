import React, { useState, useEffect } from 'react';
import { styles} from '../admin/adminTemplate';
import { serviciosConfig } from '../../assets/serviciosConfig';

function RenderEditarDatosServicio({ data, onCancelEdit, datosEstaticos, onSaveEdit, onDeleteEdit }) { 
    
    const [formData, setFormData] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [localError, setLocalError] = useState(null);

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

    const handleCancel = () => {
        if (onCancelEdit) onCancelEdit();
    };

    if (!formData || Object.keys(formData).length === 0) {
        return <div>Cargando datos de Servicio...</div>;
    }
    
    // Filtramos los campos por su sección de grid
    const grid1Fields = serviciosConfig.filter(field => field.grid === 1);
    const grid2Fields = serviciosConfig.filter(field => field.grid === 2);


    return (
        <div style={{...styles.card, padding: 0}}> 

            {/* --- GRUPO DE CAMPOS PRINCIPALES (GRID 1) --- */}
            <div style={styles.row}> 
                {grid1Fields.map(field => (
                    <label key={field.key} style={styles.label}>
                        <strong>{field.label}:</strong>
                        {field.type === 'select' ? (
                            <select 
                                id={field.key} 
                                name={field.key} 
                                value={formData[field.key] || ''} 
                                onChange={handleChange} 
                                style={styles.input}
                            >
                                <option value="">{`Seleccione ${field.label}:`}</option>
                                {datosEstaticos[field.optionsKey]?.map((opcion) => (
                                    <option key={opcion} value={opcion}>{opcion}</option>
                                ))}
                            </select>
                        ) : (
                            <input 
                                type={field.type} 
                                id={field.key} 
                                name={field.key} 
                                value={formData[field.key] || ''} 
                                onChange={handleChange} 
                                style={styles.input}
                            />
                        )}
                    </label>
                ))}
            </div>

            <div style={{ ...styles.row, flexDirection: 'column', width: '100%', marginTop: '10px' }}>
                
                {grid2Fields.map(field => (
                    <React.Fragment key={field.key}>
                        {field.type === 'textarea' ? (
                            <>
                                <label style={styles.fullWidthLabel}>
                                    <strong>{field.label}:</strong>
                                </label>
                                <textarea 
                                    id={field.key} 
                                    name={field.key} 
                                    value={formData[field.key] || ''} 
                                    onChange={handleChange} 
                                    rows="3"
                                    style={{ ...styles.input, minHeight: '40px', width: '100%', boxSizing: 'border-box' }}
                                />
                            </>
                        ) : (
                            <label style={styles.fullWidthLabel}>
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
                        )}
                    </React.Fragment>
                ))}
            </div>
            
            {localError && <div style={styles.error}>{localError}</div>}

            <div style={{ marginTop: 20, display: 'flex', gap: 10, justifyContent: 'flex-end', padding: '0 20px 20px 20px' }}>
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
}

export default RenderEditarDatosServicio;