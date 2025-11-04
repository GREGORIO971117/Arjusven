import React, { useState, useEffect } from 'react';

function RenderEditarDatosServicio({ data, onCancelEdit, datosEstaticos, onSaveEdit }) { 
    
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

    // --- Aquí se han corregido los 'name' y 'value' para que coincidan con la entidad Servicio ---
    return (
        <div className="formGridContainer">

            <div className="grid3">
                
                {/* 1. Nombre de ESS */}
                <div className="formFieldCompact">
                    <label htmlFor="nombreDeEss"><strong>Nombre de ESS:</strong></label>
                    <input type="text" id="nombreDeEss" name="nombreDeEss" 
                           value={formData.nombreDeEss || ''} onChange={handleChange} className="form-input" />
                </div>

                {/* 2. Número de Incidencia */}
                <div className="formFieldCompact">
                    <label htmlFor="incidencia"><strong>Número de Incidencia:</strong></label>
                    <input type="text" id="incidencia" name="incidencia" 
                           value={formData.incidencia || ''} onChange={handleChange} className="form-input" />
                </div>
                
                {/* 3. Resolución */}
                <div className="formFieldCompact">
                    <label htmlFor="resolucion"><strong>Resolución:</strong></label>
                    <input type="text" id="resolucion" name="resolucion" 
                           value={formData.resolucion || ''} onChange={handleChange} className="form-input" />
                </div>
                
                {/* 4. Situación Actual */}
                <div className="formFieldCompact">
                    <label htmlFor="situacionActual"><strong>Situación Actual:</strong></label>
                    <input type="text" id="situacionActual" name="situacionActual" 
                           value={formData.situacionActual || ''} onChange={handleChange} className="form-input" />
                </div>
                
                {/* 5. Código de Afiliado */}
                <div className="formFieldCompact">
                    <label htmlFor="codigoDeAfiliado"><strong>Código de Afiliado:</strong></label>
                    <input type="text" id="codigoDeAfiliado" name="codigoDeAfiliado" 
                           value={formData.codigoDeAfiliado || ''} onChange={handleChange} className="form-input" />
                </div>

                {/* 6. Supervisor */}
                <div className="formFieldCompact">
                    <label htmlFor="supervisor"><strong>Supervisor:</strong></label>
                    <input type="text" id="supervisor" name="supervisor" 
                           value={formData.supervisor || ''} onChange={handleChange} className="form-input" />
                </div>
                
                {/* 7. ID Merchant */}
                <div className="formFieldCompact">
                    <label htmlFor="idMerchant"><strong>ID Merchant:</strong></label>
                    <input type="text" id="idMerchant" name="idMerchant" 
                           value={formData.idMerchant || ''} onChange={handleChange} className="form-input" />
                </div>

                {/* 8. Tipo de Servicio */}
                <div className="formFieldCompact">
                    <label htmlFor="tipoDeServicio"><strong>Tipo de Servicio:</strong></label>
                    <input type="text" id="tipoDeServicio" name="tipoDeServicio" 
                           value={formData.tipoDeServicio || ''} onChange={handleChange} className="form-input" />
                </div>
                
                {/* 9. Motivo de Servicio */}
                <div className="formFieldCompact">
                    <label htmlFor="motivoDeServicio"><strong>Motivo del Servicio:</strong></label>
                    <input type="text" id="motivoDeServicio" name="motivoDeServicio" 
                           value={formData.motivoDeServicio || ''} onChange={handleChange} className="form-input" />
                </div>
                
                {/* 10. Motivo Real del Servicio en sitio */}
                <div className="formFieldCompact">
                    <label htmlFor="motivoReal"><strong>Motivo real en sitio:</strong></label>
                    <input type="text" id="motivoReal" name="motivoReal" 
                           value={formData.motivoReal || ''} onChange={handleChange} className="form-input" />
                </div>

                {/* 11. Guía de Encomienda */}
                <div className="formFieldCompact">
                    <label htmlFor="guiaDeEncomienda"><strong>Guía de Encomienda:</strong></label>
                    <input type="text" id="guiaDeEncomienda" name="guiaDeEncomienda" 
                           value={formData.guiaDeEncomienda || ''} onChange={handleChange} className="form-input" />
                </div>
                
                {/* 12. Fecha de envío de guía */}
                <div className="formFieldCompact">
                    <label htmlFor="fechaDeEnvio"><strong>Fecha de Envío:</strong></label>
                    <input type="date" id="fechaDeEnvio" name="fechaDeEnvio" 
                           value={formData.fechaDeEnvio || ''} onChange={handleChange} className="form-input" />
                </div>
                
                {/* 13. Dirección */}
                <div className="formFieldCompact">
                    <label htmlFor="direccion"><strong>Dirección:</strong></label>
                    <input type="text" id="direccion" name="direccion" 
                           value={formData.direccion || ''} onChange={handleChange} className="form-input" />
                </div>
                
                {/* 14. Técnico de Campo */}
                <div className="formFieldCompact">
                    <label htmlFor="tecnico"><strong>Técnico de Campo:</strong></label>
                    <input type="text" id="tecnico" name="tecnico" 
                           value={formData.tecnico || ''} onChange={handleChange} className="form-input" />
                </div>
                
                {/* 15. SLA */}
                <div className="formFieldCompact">
                    <label htmlFor="sla"><strong>SLA:</strong></label>
                    <input type="number" id="sla" name="sla" 
                           value={formData.sla || ''} onChange={handleChange} className="form-input" />
                </div>

                {/* 16. Fecha de Asignación */}
                <div className="formFieldCompact">
                    <label htmlFor="fechaDeAsignacion"><strong>Fecha de Asignación:</strong></label>
                    <input type="date" id="fechaDeAsignacion" name="fechaDeAsignacion" 
                           value={formData.fechaDeAsignacion || ''} onChange={handleChange} className="form-input" />
                </div>

            </div>

            {/* Observaciones (Textarea, full width) */}
            <div className="fullWidthSection">
                <div className="formFieldCompact">
                    <label htmlFor="observaciones"><strong>Observaciones ARJUSVEN:</strong></label>
                    <textarea id="observaciones" name="observaciones" 
                              value={formData.observaciones || ''} onChange={handleChange} rows="2" className="form-input" />
                </div>
            </div>
            
            {/* Mensaje de Error Local */}
            {localError && <div className="error-message" style={{ color: 'red', marginTop: '10px' }}>{localError}</div>}

            <div className="formActionsCompact">
                <button 
                    className="action-button save-button" 
                    onClick={handleSave}
                    disabled={isSubmitting} // Deshabilitar mientras se guarda
                >
                    {isSubmitting ? "Guardando..." : "Guardar Cambios"}
                </button>
                <button 
                    className="action-button cancel-button" 
                    onClick={handleCancel}
                    disabled={isSubmitting}
                >
                    Cancelar
                </button>
            </div>
        </div>
    );
}

export default RenderEditarDatosServicio;