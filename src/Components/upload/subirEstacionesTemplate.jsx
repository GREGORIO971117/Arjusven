import React, { useState } from 'react';
import { apiRequest } from '../login/Api'; 
import { styles } from '../admin/adminTemplate'; 
import datosEstaticos from '../../assets/datos.json';

const API_URL = '/estaciones'; 

const initialEstacionFormState = {
    idMerchant: '',         
    nombreComercial: '',   
    direccion: '',          
    estado: '',             
    plazaDeAtencion: '',
    cobertura: ''         
};

export default function SubirEstacionTemplate({ ModalTemplate,showModal, closeModal,modalConfig}) {

    const [form, setForm] = useState(initialEstacionFormState); 
    const [formErrors, setFormErrors] = useState({}); 
    const [isSubmitting, setIsSubmitting] = useState(false);

    function handleChange(e) {
        const { name, value } = e.target;
        setForm((prev) => ({ 
            ...prev, 
            [name]: name === 'idMerchant' ? (value ? Number(value) : '') : value 
        }));
        
        if (formErrors[name]) {
            setFormErrors(prev => ({ ...prev, [name]: "" }));
        }
    }

    function validateForm() {
        const errs = {};
        
        // --- VALIDACIONES DE CAMPOS MÍNIMOS ---
        if (!form.idMerchant || form.idMerchant <= 0) {
            errs.idMerchant = "El ID Merchant es requerido y debe ser un número positivo.";
        }
        if (!form.nombreComercial || form.nombreComercial.trim() === "") {
            errs.nombreComercial = "El Nombre Comercial es requerido.";
        }
        if (!form.direccion || form.direccion.trim() === "") {
            errs.direccion = "La Dirección es requerida.";
        }
        
        if (!form.plazaDeAtencion || form.plazaDeAtencion.trim() === "") {
            errs.plazaDeAtencion = "La Plaza de Atención es requerida.";
        }
        
        if (Object.keys(errs).length > 0) {
             showModal({
                title: "Error de Validación",
                message: "Por favor, revisa y rellena los campos obligatorios.",
                type: "warning", 
            });
        }
        
        setFormErrors(errs);
        return Object.keys(errs).length === 0;
    }

    function resetForm() {
        setForm(initialEstacionFormState); 
        setFormErrors({});
    }

    async function submitEstacion(e) {
        e.preventDefault();
        closeModal(); // Asegurarse de que cualquier modal anterior esté cerrado
        
        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);
        
        try {
            const response = await apiRequest(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form), 
            });
            
            if (!response.ok) {
                let errorMsg = `Error ${response.status}: Falló la creación de la Estación. `;
                const isJson = response.headers.get('content-type')?.includes('application/json');
                
                if (isJson) {
                    const errorData = await response.json();
                    errorMsg += errorData.message || response.statusText; 
                } else {
                    errorMsg += await response.text();
                }
                throw new Error(errorMsg);
            }

            const nuevaEstacion = await response.json();
            
            showModal({
                title: "Estación Creada Exitosamente",
                message: `La Estación ha sido registrada. ID Merchant: ${nuevaEstacion.idMerchant}.`,
                type: "success",
            });
            resetForm(); 

        } catch (err) {
            showModal({
                title: "Error al Guardar Estación",
                message: err.message,
                type: "error",
            });
        } finally {
            setIsSubmitting(false);
        }
    }

    // --- RENDERIZADO ---
    return (
        <div style={styles.container}>
            <form onSubmit={submitEstacion} style={styles.form}>
                
                {/* Fila 1: ID Merchant y Nombre Comercial */}
                <div style={styles.row}>
                    <label style={styles.label}>
                        ID Merchant
                        <input 
                            name="idMerchant" 
                            type="number" 
                            value={form.idMerchant} 
                            onChange={handleChange} 
                            style={styles.input} 
                            min="1"
                        />
                        {formErrors.idMerchant && <div style={styles.errorTextRow}>{formErrors.idMerchant}</div>}
                    </label>
                    <label style={styles.label}>
                        Nombre Comercial 
                        <input name="nombreComercial" value={form.nombreComercial} onChange={handleChange} style={styles.input} />
                        {formErrors.nombreComercial && <div style={styles.errorTextRow}>{formErrors.nombreComercial}</div>}
                    </label>
                </div>
                
                {/* Fila 3: Plaza de Atención y Cobertura */}
                <div style={styles.row}>
                    <label style={styles.label}>
                        Plaza de Atención 
                      <select name="plazaDeAtencion" value={form.plazaDeAtencion} onChange={handleChange} style={styles.input}>
                            <option value="">Seleccione plaza</option>
                                {datosEstaticos.plazaDeAtencion?.map((opcion) => (
                                    <option key={opcion} value={opcion}>{opcion}</option>
                                ))}
                        </select> 
                        {formErrors.plazaDeAtencion && <div style={styles.errorTextRow}>{formErrors.plazaDeAtencion}</div>}
                    </label>

                    <label style={styles.label}>Cobertura
                        <select name="cobertura" value={form.cobertura} onChange={handleChange} style={styles.input}>
                            <option value="">Seleccione cobertura</option>
                                {datosEstaticos.sla?.map((opcion) => (
                                    <option key={opcion} value={opcion}>{opcion}</option>
                                ))}
                        </select>            
                           {formErrors.cobertura && <div style={styles.errorTextRow}>{formErrors.cobertura}</div>} 
                    </label>
                </div>

                <div style={styles.row}>
                    <label style={styles.label}>
                        Dirección 
                        <input name="direccion" value={form.direccion} onChange={handleChange} style={styles.input} />
                        {formErrors.direccion && <div style={styles.errorTextRow}>{formErrors.direccion}</div>}
                    </label>
                    
                     <label style={styles.label}>
                        Estado 
                        <input name="estado" value={form.estado} onChange={handleChange} style={styles.input} />
                        {formErrors.estado && <div style={styles.errorTextRow}>{formErrors.estado}</div>}
                    </label>
                </div>

                <div style={{ marginTop: 15 }}>
                    <button type="submit" style={styles.buttonPrimary} disabled={isSubmitting}>
                        {isSubmitting ? "Guardando Estación..." : "Guardar Estación"}
                    </button>
                </div>
            </form>
            
            <ModalTemplate
                isOpen={modalConfig.isOpen}
                onClose={closeModal}
                title={modalConfig.title}
                message={modalConfig.message}
                type={modalConfig.type}
            />
        </div>
    );
}