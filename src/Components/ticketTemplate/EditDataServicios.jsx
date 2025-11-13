import React, { useState, useEffect } from 'react';
import {styles as baseStyles} from '../admin/adminTemplate';

const styles = {
        ...baseStyles, 
        label: {
            ...baseStyles.label,
            flex: '1 1 calc(33.33% - 20px)', 
            minWidth: '250px',
        },
    
    };

function RenderEditarDatosServicio({ data, onCancelEdit, datosEstaticos, onSaveEdit,onDeleteEdit }) { 
    
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

    return (
       <div style={{...styles.card, padding: 0}}> {/* Usamos styles.card para el contenedor principal */}

    <div style={styles.row}> 
        
        {/* 1. Nombre de ESS */}
        <label style={styles.label}>
            <strong>Nombre de ESS:</strong>
            <input 
                type="text" 
                id="nombreDeEss" 
                name="nombreDeEss" 
                value={formData.nombreDeEss || ''} 
                onChange={handleChange} 
                style={styles.input} // Reemplaza className="form-input"
            />
        </label>

        {/* 2. Número de Incidencia */}
        <label style={styles.label}>
            <strong>Número de Incidencia:</strong>
            <input 
                type="text" 
                id="incidencia" 
                name="incidencia" 
                value={formData.incidencia || ''} 
                onChange={handleChange} 
                style={styles.input}
            />
        </label>
        
        {/* 3. Resolución */}
        <label style={styles.label}>
            <strong>Resolución:</strong>
            <input 
                type="date" 
                id="resolucion" 
                name="resolucion" 
                value={formData.resolucion || ''} 
                onChange={handleChange} 
                style={styles.input}
            />
        </label>
        
        {/* 4. Situación Actual */}
         <label style={styles.label}>
            <strong>Situación actual:</strong>
            <select 
                id="situacionActual" 
                name="situacionActual" 
                value={formData.situacionActual || ''} 
                onChange={handleChange} 
                style={styles.input}
            >
                <option value="">Seleccione la situación Actual:</option>
                {datosEstaticos.situacion?.map((opcion) => (
                <option key={opcion} value={opcion}>{opcion}</option>
            ))}

            </select>
        </label>        

        {/* 6. Supervisor */}
        <label style={styles.label}>
            <strong>Supervisor:</strong>
            <input 
                type="text" 
                id="supervisor" 
                name="supervisor" 
                value={formData.supervisor || ''} 
                onChange={handleChange} 
                style={styles.input}
            />
        </label>
        
        {/* 7. ID Merchant */}
        <label style={styles.label}>
            <strong>ID Merchant:</strong>
            <input 
                type="text" 
                id="idMerchant" 
                name="idMerchant" 
                value={formData.idMerchant || ''} 
                onChange={handleChange} 
                style={styles.input}
            />
        </label>

        {/* 8. Tipo de Servicio */}
        <label style={styles.label}>
            <strong>Tipo de Servicio:</strong>
            <select 
                id="tipoDeServicio" 
                name="tipoDeServicio" 
                value={formData.tipoDeServicio || ''} 
                onChange={handleChange} 
                style={styles.input}
            >
                <option value="">Seleccione la situación Actual:</option>
                {datosEstaticos.servicio?.map((opcion) => (
                <option key={opcion} value={opcion}>{opcion}</option>
            ))}

            </select>
        </label>
             

        {/* 12. Fecha de envío de guía */}
        <label style={styles.label}>
            <strong>Fecha de Envío:</strong>
            <input 
                type="date" 
                id="fechaDeEnvio" 
                name="fechaDeEnvio" 
                value={formData.fechaDeEnvio || ''} 
                onChange={handleChange} 
                style={styles.input}
            />
        </label>
        
        {/* 13. Dirección */}
        <label style={styles.label}>
            <strong>Dirección:</strong>
            <input 
                type="text" 
                id="direccion" 
                name="direccion" 
                value={formData.direccion || ''} 
                onChange={handleChange} 
                style={styles.input}
            />
        </label>
        
        {/* 14. Técnico de Campo */}
        <label style={styles.label}>
            <strong>Técnico de Campo:</strong>
            <input 
                type="text" 
                id="tecnico" 
                name="tecnico" 
                value={formData.tecnico || ''} 
                onChange={handleChange} 
                style={styles.input}
            />
        </label>
        
        <label style={styles.label}>
            <strong>SLA:</strong>
            <select 
                id="sla" 
                name="sla" 
                value={formData.sla || ''} 
                onChange={handleChange} 
                style={styles.input}
            >
                <option value="">SLA:</option>
                {datosEstaticos.sla?.map((opcion) => (
                <option key={opcion} value={opcion}>{opcion}</option>
            ))}

            </select>
        </label>  

        {/* 16. Fecha de Asignación */}
        <label style={styles.label}>
            <strong>Fecha de Asignación:</strong>
            <input 
                type="date" 
                id="fechaDeAsignacion" 
                name="fechaDeAsignacion" 
                value={formData.fechaDeAsignacion || ''} 
                onChange={handleChange} 
                style={styles.input}
            />
        </label>

        {/* 9. Motivo de Servicio */}
        <label style={styles.label}>
            <strong>Motivo del Servicio:</strong>
            <input 
                type="text" 
                id="motivoDeServicio" 
                name="motivoDeServicio" 
                value={formData.motivoDeServicio || ''} 
                onChange={handleChange} 
                style={styles.input}
            />
        </label>   

         <label style={styles.label}>
                <strong>Guía de Encomienda:</strong>
                <input 
                    type="text" 
                    id="guiaDeEncomienda" 
                    name="guiaDeEncomienda" 
                    value={formData.guiaDeEncomienda || ''} 
                    onChange={handleChange} 
                    style={styles.input}
                />
            </label>

            

        </div>

   <div style={{ ...styles.row, flexDirection: 'column', width: '100%' }}>

            <label style={styles.label}>
                <strong>Motivo real en sitio:</strong>
                <input 
                    type="text" 
                    id="motivoReal" 
                    name="motivoReal" 
                    value={formData.motivoReal || ''} 
                    onChange={handleChange} 
                    style={styles.input}
                />
            </label>

        <label style={{...styles.label, flex: '1 1 100%'}}>
            <strong>Observaciones ARJUSVEN:</strong>
        </label>
        <textarea 
            id="observaciones" 
            name="observaciones" 
            value={formData.observaciones || ''} 
            onChange={handleChange} 
            rows="3"
            style={{ ...styles.input, minHeight: '40px', width: '100%', boxSizing: 'border-box' }}
        />
    </div>
    
    {localError && <div style={styles.error}>{localError}</div>}

    <div style={{ marginTop: 20, display: 'flex', gap: 10, justifyContent: 'flex-end' }}>

        <button 
            type="button" 
            onClick={onDeleteEdit}
            style={styles.buttonDanger}
            disabled={isSubmitting}
        >
            Borrar Inventario
        </button>
        <button 
            type="button" // Cancelar (similar al onCancelEdit)
            onClick={handleCancel}
            style={styles.navButton} // Estilo 'Cancelar'
            disabled={isSubmitting}
        >
            Cancelar
        </button>
        <button 
            type="button" 
            onClick={handleSave}
            style={styles.buttonPrimary} // Estilo 'Guardar'
            disabled={isSubmitting} 
        >
            
            {isSubmitting ? "Guardando..." : "Guardar Cambios"}
        </button>
        
    </div>
</div>
    );
}

export default RenderEditarDatosServicio;