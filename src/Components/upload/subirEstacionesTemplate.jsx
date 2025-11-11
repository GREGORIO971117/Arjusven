import React, { useState } from 'react';
// Asumo que apiRequest está correctamente importado desde tu ruta
import { apiRequest } from '../login/Api'; 
import { styles } from '../admin/adminTemplate'; // Asumo que tus estilos están aquí

// Endpoint de la API para las Estaciones (ajusta si es necesario)
const API_URL = '/estaciones'; 

// Estado inicial con los campos básicos requeridos
const initialEstacionFormState = {
    idMerchant: '',        // Long
    nombreComercial: '',   // String
    direccion: '',         // String
    estado: '',            // String
    plazaDeAtencion: ''    // String
};

// El componente ya no necesita datosEstaticos ni la carga de usuarios
export default function SubirEstacionTemplate() {

    // --- ESTADOS ---
    const [form, setForm] = useState(initialEstacionFormState); 
    const [formErrors, setFormErrors] = useState({}); 
    const [error, setError] = useState(""); 
    const [isSubmitting, setIsSubmitting] = useState(false); 
    const [successMessage, setSuccessMessage] = useState("");


    // --- HANDLERS Y UTILIDADES ---
    function handleChange(e) {
        const { name, value } = e.target;
        setForm((prev) => ({ 
            ...prev, 
            // Convertir idMerchant a Number para que coincida con el tipo Long de Spring
            [name]: name === 'idMerchant' ? Number(value) : value 
        }));
        // Limpiar errores mientras se escribe
        if (formErrors[name]) {
            setFormErrors(prev => ({ ...prev, [name]: "" }));
        }
    }

    function validateForm() {
        const errs = {};
        if (!form.idMerchant || form.idMerchant === 0) {
            errs.idMerchant = "El ID Merchant es requerido y debe ser un número.";
        }
        if (!form.nombreComercial || form.nombreComercial.trim() === "") {
            errs.nombreComercial = "El Nombre Comercial es requerido.";
        }
        if (!form.direccion || form.direccion.trim() === "") {
            errs.direccion = "La Dirección es requerida.";
        }
        if (!form.estado || form.estado.trim() === "") {
            errs.estado = "El Estado es requerido.";
        }
        if (!form.plazaDeAtencion || form.plazaDeAtencion.trim() === "") {
            errs.plazaDeAtencion = "La Plaza de Atención es requerida.";
        }
        
        if (Object.keys(errs).length > 0) setError("Por favor, rellena los campos obligatorios.");
        else setError(""); 

        setFormErrors(errs);
        return Object.keys(errs).length === 0;
    }

    function resetForm() {
        setForm(initialEstacionFormState); 
        setFormErrors({});
        setSuccessMessage("");
    }

    async function submitEstacion(e) {
        e.preventDefault();
        setSuccessMessage(""); 
        
        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);
        setError(""); 
        
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
                    // Usar un campo común de error de Spring o el mensaje de la respuesta
                    errorMsg += errorData.message || errorData.error || response.statusText; 
                } else {
                    errorMsg += await response.text();
                }
                throw new Error(errorMsg);
            }

            const nuevaEstacion = await response.json();
            resetForm();
            setSuccessMessage(`✅ Estación creada. ID Merchant: ${nuevaEstacion.idMerchant}`); 

        } catch (err) {
            setError("Error: " + err.message);
        } finally {
            setIsSubmitting(false);
        }
    }

    // --- RENDERIZADO ---
    return (
        <div style={styles.container}>            
            <form onSubmit={submitEstacion} style={styles.form}>
                
                <div style={styles.row}>
                    <label style={styles.label}>
                        ID Merchant
                        <input 
                            name="idMerchant" 
                            type="number" 
                            value={form.idMerchant} 
                            onChange={handleChange} 
                            style={styles.input} 
                            // Convertir de vuelta a String para que el input funcione bien
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
                
                {/* Fila 2: Dirección y Estado */}
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

                 <div style={styles.row}>
                    <label style={styles.label}>
                        Plaza de Atención 
                        <input name="plazaDeAtencion" value={form.plazaDeAtencion} onChange={handleChange} style={styles.input} />
                        {formErrors.plazaDeAtencion && <div style={styles.errorTextRow}>{formErrors.plazaDeAtencion}</div>}
                    </label>
                    <label style={styles.label}>
                        Cobertura
                        <input name="cobertura" value={form.cobertura} onChange={handleChange} style={styles.input} />
                        {formErrors.cobertura && <div style={styles.errorTextRow}>{formErrors.cobertura}</div>}
                    </label>
                </div>


            

                {/* Mensajes de API */}
                {successMessage && (
                    <div style={{ ...styles.error, backgroundColor: '#d4edda', color: '#155724', border: '1px solid #c3e6cb', padding: '10px' }}>
                        {successMessage}
                    </div>
                )}
                {error && (
                    <div style={styles.error}>
                        {error}
                    </div>
                )}

                <div style={{ marginTop: 15 }}>
                    <button type="submit" style={styles.buttonPrimary} disabled={isSubmitting}>
                        {isSubmitting ? "Guardando Estación..." : "Guardar"}
                    </button>
                    
                </div>
            </form>
        </div>
    );
}