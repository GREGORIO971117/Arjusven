import React, { useState, useEffect } from 'react';
import { styles } from '../admin/adminTemplate'; 
import { inventarioConfig } from '../../assets/inventarioConfig';

function RenderEditDatosInventario({ 
    data, 
    handleUpdate, 
    handleRemove, 
    onCancelEdit, 
    datosEstaticos, 
    isSubmitting 
}) {

    const formatDate = (dateString) => dateString ? String(dateString).slice(0, 10) : '';
    
    // Inicializar estado dinámicamente basado en la config
    const [formData, setFormData] = useState({});
    const [error, setError] = useState("");

    useEffect(() => {
        const initialState = {};
        inventarioConfig.forEach(field => {
            let value = data[field.key] || "";
            if (field.type === 'date') value = formatDate(value);
            initialState[field.key] = value;
        });
        // Aseguramos el ID
        initialState.idInventario = data.idInventario;
        setFormData(initialState);
    }, [data]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const validateForm = () => {
        for (const field of inventarioConfig) {
            if (field.required && !String(formData[field.key]).trim()) {
                return `El campo ${field.label} es requerido.`;
            }
        }
        return "";
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationError = validateForm();
        if (validationError) {
            setError(validationError);
            return;
        }
        setError("");
        
        const result = await handleUpdate(formData);
        if (result && !result.success) {
            setError(result.error || "Error al actualizar.");
        }
    };

    // Renderizador de inputs dinámico
    const renderField = (field) => {
        const commonProps = {
            name: field.key,
            value: formData[field.key] || "",
            onChange: handleChange,
            style: field.type === 'textarea' 
                   ? { ...styles.input, minHeight: '80px', width: '100%' } 
                   : styles.input,
            disabled: field.readOnly || isSubmitting
        };

        if (field.type === 'select') {
            const options = datosEstaticos[field.optionsKey] || [];
            return (
                <select {...commonProps}>
                    <option value="">Seleccione...</option>
                    {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
            );
        }

        if (field.type === 'textarea') {
            return <textarea {...commonProps} rows="3" />;
        }

        return <input type={field.type} {...commonProps} />;
    };

    const gridContainerStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '15px',
        marginBottom: '20px',
        padding: '10px',
        borderBottom: '1px solid #eee' 
    };

    return (
        <section style={styles.card}>
            <h3>{formData.numeroDeSerie} - {formData.equipo}</h3>
            
            <form onSubmit={handleSubmit} style={styles.form}>
                {error && <div style={styles.error}>{error}</div>}
                
                <div style={gridContainerStyle}>
                    {inventarioConfig.map(field => (
                        <div key={field.key} style={{ 
                                    gridColumn: field.fullWidth ? 'span 3' : 'span 1',
                                    display: 'flex',
                                    flexDirection: 'column'
                                }}>
                            <label style={styles.label}>
                                {field.label}
                            </label>
                            {renderField(field)}
                        </div>
                    ))}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 20 }}>
                    <button type="button" onClick={handleRemove} style={styles.buttonDanger} disabled={isSubmitting}>
                        Borrar
                    </button>
                    <div style={{ display: 'flex', gap: 10 }}>
                        <button type="button" onClick={onCancelEdit} style={styles.navButton} disabled={isSubmitting}>
                            Cancelar
                        </button>
                        <button type="submit" style={styles.buttonPrimary} disabled={isSubmitting}>
                            {isSubmitting ? "Guardando..." : "Guardar Cambios"}
                        </button>
                    </div>
                </div>
            </form>
        </section>
    );
}

export default RenderEditDatosInventario;