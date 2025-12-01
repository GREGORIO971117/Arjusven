import React, { useState, useEffect } from 'react';
import '../Inventario/InventarioList.css'; 
import { styles } from '../admin/adminTemplate'; 
import { estacionesConfig } from '../../assets/estacionesConfig';

export default function RenderEditDatosEstacion({ 
    handleUpdate, 
    onCancelEdit, 
    data, 
    handleRemove, 
    isSubmitting,
    datosEstaticos
}) {
    
    const [formData, setFormData] = useState({});
    const [localError, setLocalError] = useState("");

    // 1. Inicialización Dinámica del Estado
    useEffect(() => {
        if (!data) return;
        const initialState = {};
        
        estacionesConfig.forEach(field => {
            initialState[field.key] = data[field.key] ?? '';
        });

        setFormData(initialState);
        setLocalError("");
    }, [data]);

    // 2. Manejador de Cambios Dinámico
    const handleChange = (e) => {
        const { name, value, type } = e.target;
        let finalValue = value;

        if (type === 'number') {
            finalValue = value === '' ? 0 : (value.includes('.') ? parseFloat(value) : parseInt(value, 10));
        }

        setFormData(prev => ({ ...prev, [name]: finalValue }));
    };

    // 3. Validación Dinámica
    const validateForm = () => {
        for (const field of estacionesConfig) {
            if (field.required && !String(formData[field.key]).trim()) {
                return `El campo ${field.label} es requerido.`;
            }
        }
        return "";
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const err = validateForm();
        if (err) {
            setLocalError(err);
            return;
        }
        setLocalError("");
        
        const result = await handleUpdate(formData);
        if (result && result.success === false) {
             setLocalError(result.error || "Fallo la actualización en el servidor.");
        }
    };

    // 4. Función de Renderizado de Inputs (El "Obrero")
    const renderField = (field) => {
        const commonProps = {
            name: field.key,
            value: formData[field.key] !== undefined ? formData[field.key] : '',
            onChange: handleChange,
            disabled: field.readOnly || isSubmitting,
            style: styles.input
        };

        if (field.type === 'select') {
            // Busca las opciones en datosEstaticos usando la llave 'optionsKey' del config
            const options = datosEstaticos?.[field.optionsKey] || [];
            return (
                <select {...commonProps}>
                    <option value="">Seleccione {field.label}</option>
                    {options.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                    ))}
                </select>
            );
        }

        if (field.type === 'textarea') {
            return <textarea {...commonProps} rows="3" style={{...styles.input, minHeight: '80px', width: '100%'}} />;
        }

        return <input type={field.type} {...commonProps} />;
    };

    const groupedFields = estacionesConfig.reduce((acc, field) => {
        (acc[field.grid] = acc[field.grid] || []).push(field);
        return acc;
    }, {});

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
            <h3>Editar Estación: {formData.nombreComercial}</h3>
            
            <form onSubmit={handleSubmit} style={styles.form}>
                {localError && <div style={styles.error}>{localError}</div>}
                {Object.keys(groupedFields).map(gridKey => (
                    <div key={gridKey} style={gridContainerStyle}>
                        {groupedFields[gridKey].map(field => (
                            <div 
                                key={field.key} 
                                style={{ 
                                    gridColumn: field.fullWidth ? 'span 3' : 'span 1',
                                    display: 'flex',
                                    flexDirection: 'column'
                                }}
                            >
                                <label style={styles.label}>
                                    {field.label}
                                </label>
                                {renderField(field)}
                            </div>
                        ))}
                    </div>
                ))}

                {/* Botones de Acción */}
                <div style={{ marginTop: 20, display: 'flex', gap: 10, alignItems: 'center', width: '100%' }}>
                    <button 
                        type="button" 
                        onClick={handleRemove}
                        style={styles.buttonDanger}
                        disabled={isSubmitting}
                    >
                        Borrar Estación
                    </button>
                    
                    <div style={{ marginLeft: 'auto', display: 'flex', gap: 10 }}>
                        <button 
                            type="button" 
                            onClick={onCancelEdit}
                            style={styles.navButton} 
                            disabled={isSubmitting}
                        >
                            Cancelar
                        </button>
                        <button 
                            type="submit" 
                            style={styles.buttonPrimary}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Guardando..." : "Guardar Cambios"}
                        </button>
                    </div>
                </div>
            </form>
        </section>
    );
}