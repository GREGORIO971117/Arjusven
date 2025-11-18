import React, { useState, useEffect } from 'react';
import { estacionesConfig } from '../../assets/estacionesConfig'; // ⬅️ Importamos la configuración central
import { styles } from '../admin/adminTemplate';

const formatInitialValue = (value) => value === null || value === undefined ? '' : String(value);

const getInitialState = (data) => {
    if (!data) return {};
    
    const initialState = {};
    
    estacionesConfig.forEach(field => {
        const key = field.key;
        let value = data[key];
        
        if (field.type === 'number') {
            if (key === 'cantPOSActivas' || key === 'rollos' || key === 'transporte') {
                 value = data[key] ?? 0;
            } else if (key === 'km') {
                 value = data[key] ?? 0.0;
            } else {
                 value = data[key] ?? '';
            }
        }
        
        initialState[key] = formatInitialValue(value);
    });
    
    return initialState;
};


const renderField = (field, formData, handleChange, inputStyle, labelStyle, datosEstaticos) => {
    const isReadOnly = field.key === 'idMerchant';
    
    const baseInputProps = {
        name: field.key,
        value: formData[field.key] || '',
        onChange: handleChange,
        style: inputStyle,
        disabled: isReadOnly,
        readOnly: isReadOnly,
        required: field.required
    };
    
    let inputElement;

    switch (field.type) {
        case 'textarea':
            inputElement = (
                <textarea {...baseInputProps} style={{ ...inputStyle, minHeight: '80px' }} />
            );
            break;
        case 'select':
            const options = datosEstaticos?.[field.optionsKey] || [];
            inputElement = (
                <select {...baseInputProps}>
                    <option value="">Seleccione {field.label}</option>
                    {options.map((opcion) => (
                        <option key={opcion} value={opcion}>{opcion}</option>
                    ))}
                </select>
            );
            break;
        case 'number':
            inputElement = (
                <input 
                    {...baseInputProps} 
                    type="number" 
                    step={field.key === 'km' ? 'any' : '1'} 
                />
            );
            break;
        default: 
            inputElement = (
                <input 
                    {...baseInputProps} 
                    type={field.type} 
                />
            );
            break;
    }

    return (
        <label key={field.key} style={labelStyle}>
            {field.label}
            {isReadOnly && " (ID)"}
            {inputElement}
        </label>
    );
};


export default function RenderEditDatosEstacion({ 
    handleUpdate, 
    onCancelEdit, 
    data, 
    handleRemove, 
    isSubmitting = false,
    datosEstaticos 
}) {
    
    const { card, form, row, label, input, buttonDanger, buttonPrimary, navButton, error } = styles;
    
    const [formData, setFormData] = useState(getInitialState(data));
    const [localError, setLocalError] = useState("");
    
    useEffect(() => {
        setFormData(getInitialState(data));
        setLocalError("");
    }, [data]);
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        let finalValue = value;

        const fieldConfig = estacionesConfig.find(f => f.key === name);
        
        if (fieldConfig && fieldConfig.type === 'number') {
            if (['cantPOSActivas', 'rollos', 'transporte'].includes(name)) {
                // Enteros (Si está vacío, guarda 0 para evitar problemas con la DB)
                finalValue = value === '' ? 0 : parseInt(value, 10) || 0;
            } else if (name === 'km') {
                // Decimales (Si está vacío, guarda 0.0)
                finalValue = value === '' ? 0.0 : parseFloat(value) || 0.0;
            }
        }
        
        setFormData((f) => ({
            ...f,
            [name]: finalValue
        }));
    };

    // 3. Validación basada en la configuración
    const validateForm = () => {
        for (const field of estacionesConfig) {
            if (field.required && !formData[field.key]) {
                // Se asume que 'required: true' significa que el valor no puede ser vacío/cero
                if (typeof formData[field.key] !== 'number' || formData[field.key] === 0) {
                    return `El campo '${field.label}' es requerido.`;
                }
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
        
        // Filtra los datos para enviar solo las claves válidas y limpias
        const dataToUpdate = Object.keys(formData).reduce((acc, key) => {
            if (estacionesConfig.some(f => f.key === key)) {
                acc[key] = formData[key];
            }
            return acc;
        }, {});
        
        const result = await handleUpdate(dataToUpdate); 
        
        if (result && result.success === false) {
             setLocalError(result.error || "Fallo la actualización en el servidor.");
        }
    }; 
    
    // 4. Filtrar campos por las secciones (grid)
    const gridFields = (gridNum) => estacionesConfig.filter(field => field.grid === gridNum);
    
    const FieldsRow = ({ fields, className }) => {
        // Para las filas estándar (3 columnas), usamos el estilo 'row'.
        // Para la dirección (grid 4), usamos un estilo de columna para que tome todo el ancho.
        const style = className === 'full-width' ? 
            { ...row, flexDirection: 'column', width: '100%', alignItems: 'flex-start' } : 
            row;

        return (
            <div style={style} className={className}>
                {fields.map(field => renderField(field, formData, handleChange, input, label, datosEstaticos))}
            </div>
        );
    };

    return (
        <section style={card}>
            <h3>Editar Estación: {formData.nombreComercial}</h3>
            
            <form onSubmit={handleSubmit} style={form}> 
                
                {localError && <div style={error}>{localError}</div>} 

                {/* GRID 1: Identificación y Ubicación Principal */}
                <FieldsRow fields={gridFields(1)} /> 
                
                
                {/* GRID 2: Conexión y Equipos */}
                <FieldsRow fields={gridFields(2)} /> 
                
                {/* GRID 3: Logística y Contacto */}
                <FieldsRow fields={gridFields(3)} />
                
                {/* GRID 4: Dirección y Referencias (Full Width Textareas) */}
                <FieldsRow fields={gridFields(4)}/>
 

                {/* BOTONES DE ACCIÓN (Mantienen la estructura original) */}
                <div style={{ marginTop: 20, display: 'flex', gap: 10, alignItems: 'center', width: '100%' }}>
                    
                    <button 
                        type="button" 
                        onClick={handleRemove}
                        style={buttonDanger}
                        disabled={isSubmitting}
                    >
                        Borrar Estación
                    </button>
                    
                    <div style={{ marginLeft: 'auto', display: 'flex', gap: 10 }}>
                        <button 
                            type="button" 
                            onClick={onCancelEdit}
                            style={navButton} 
                            disabled={isSubmitting}
                        >
                            Cancelar
                        </button>
                        <button 
                            type="submit" 
                            style={buttonPrimary}
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