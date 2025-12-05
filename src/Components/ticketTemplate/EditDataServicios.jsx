import React, { useState, useEffect } from 'react';
import { styles } from '../admin/adminTemplate';
import { serviciosConfig } from '../../assets/serviciosConfig';

function RenderEditarDatosServicio({ 
    data, 
    onCancelEdit, 
    datosEstaticos, 
    onSaveEdit, 
    onDeleteEdit 
}) {

    const formatDate = (dateString) => dateString ? String(dateString).slice(0, 10) : '';

    const [formData, setFormData] = useState({});
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (data) {
            const initialState = {};
            serviciosConfig.forEach(field => {
                let value = data[field.key] || "";
                if (field.type === 'date') value = formatDate(value);
                initialState[field.key] = value;
            });
            // Mantener cualquier ID u otros datos que no estén en la config pero vengan en data
            setFormData({ ...data, ...initialState });
        }
    }, [data]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setError(""); // Limpiar error al escribir
    };

    // 2. Validación dinámica
    const validateForm = () => {
        for (const field of serviciosConfig) {
            if (field.required && !String(formData[field.key]).trim()) {
                return `El campo ${field.label} es requerido.`;
            }
        }
        return "";
    };

    // 3. Manejo del envío (Submit)
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const validationError = validateForm();
        if (validationError) {
            setError(validationError);
            return;
        }
        setError("");
        setIsSubmitting(true);

        try {
            // Lógica específica de limpieza de datos de Servicios
            let dataToSend = { ...formData };
            if (dataToSend.ticket) delete dataToSend.ticket;
            if (dataToSend.estaciones) delete dataToSend.estaciones;

            const result = await onSaveEdit(dataToSend);

            if (result && result.success) {
                if (onCancelEdit) onCancelEdit();
            } else {
                setError(result?.error || "Error desconocido al guardar.");
            }
        } catch (err) {
            console.error("Fallo al ejecutar onSaveEdit:", err);
            setError(err.message || "Falló la operación de guardado.");
        } finally {
            setIsSubmitting(false);
        }
    };

    // 4. Renderizador de inputs dinámico (Igual que en Inventario)
    const renderField = (field) => {
        const commonProps = {
            name: field.key,
            value: formData[field.key] || "",
            onChange: handleChange,
            disabled: field.readOnly || isSubmitting, // field.disabled no existe en serviciosConfig, pero lo dejamos preparado
            style: field.type === 'textarea' 
                   ? { ...styles.input, minHeight: '80px', width: '100%' } 
                   : styles.input
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

    // Estilo para Grid de 2 columnas (para acomodar grid:1 y grid:2 de tu config)
    const gridContainerStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)', 
        gap: '5px',
        marginBottom: '10px',
        padding: '10px',
        borderBottom: '1px solid #eee' 
    };

    if (!formData || Object.keys(formData).length === 0) {
        return <div>Cargando datos...</div>;
    }

    return (
        <section style={styles.card}>
            {/* Título dinámico basado en datos disponibles */}
            <h3>{formData.nombreDeEss} - {formData.incidencia}</h3>
            
            <form onSubmit={handleSubmit} style={styles.form}>
                {error && <div style={styles.error}>{error}</div>}
                
                <div style={gridContainerStyle}>
                    {serviciosConfig.map(field => (
                        <div key={field.key} style={{ 
                            gridColumn: field.grid === 2 ? 'span 2' : 'span 1',
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
                    <button 
                        type="button" 
                        onClick={onDeleteEdit} 
                        style={styles.buttonDanger} 
                        disabled={isSubmitting}
                    >
                        Borrar Incidencia
                    </button>
                    
                    <div style={{ display: 'flex', gap: 10 }}>
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

export default RenderEditarDatosServicio;