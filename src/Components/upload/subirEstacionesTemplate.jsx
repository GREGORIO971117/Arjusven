import React, { useState } from 'react';
import { apiRequest } from '../login/Api'; 
import '../Inventario/InventarioList.css';
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

export default function SubirEstacionTemplate({ ModalTemplate, showModal, closeModal, modalConfig }) {

    const [form, setForm] = useState(initialEstacionFormState); 
    const [formErrors, setFormErrors] = useState({}); 
    const [isSubmitting, setIsSubmitting] = useState(false);

    function handleChange(e) {
        const { name, value } = e.target;
        setForm((prev) => ({ 
            ...prev, 
            [name]: name === 'idMerchant' ? (value ? Number(value) : '') : value 
        }));
        
        // Limpiar error al cambiar el valor
        if (formErrors[name]) {
            setFormErrors(prev => ({ ...prev, [name]: "" }));
        }
    }

    function validateForm() {
        const errs = {};
        
        // VALIDACIONES DE CAMPOS MÍNIMOS
        if (!form.idMerchant || form.idMerchant <= 0) {
            errs.idMerchant = "El ID Merchant es requerido y debe ser un número positivo.";
        }
        if (!form.nombreComercial || form.nombreComercial.trim() === "") {
            errs.nombreComercial = "El Nombre Comercial es requerido.";
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
        closeModal(); 
        
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

    const FormField = ({ label, name, type = 'text', value, options, placeholder, min }) => (
        <div className="form-group">
            <label htmlFor={name} className="form-label">{label}</label>
            {options ? (
                <select 
                    id={name}
                    name={name} 
                    value={value} 
                    onChange={handleChange} 
                    className="form-input modern-input"
                >
                    <option value="">Seleccione...</option>
                    {options.map((opcion) => (
                        <option key={opcion} value={opcion}>{opcion}</option>
                    ))}
                </select>
            ) : (
                <input 
                    id={name}
                    name={name} 
                    type={type} 
                    value={value} 
                    onChange={handleChange} 
                    className="form-input modern-input"
                    placeholder={placeholder}
                    min={min}
                />
            )}
            {formErrors[name] && <span className="error-message-text">{formErrors[name]}</span>}
        </div>
    );

    return (
        <div className="profile-page-wrapper"> 
            <div className="modern-service-container form-card">
                
                <header className="service-header">
                    <div className="header-titles">
                        <h1 className="service-title">Registro de Nueva Estación</h1>
                    </div>
                </header>
                
                <form onSubmit={submitEstacion} className="service-content-area">
                    <div className="info-grid-wrapper animate-fade-in">
                        
                        <section className="data-section">
                            <div className="modern-grid-2">
                                <FormField 
                                    label="ID Merchant" 
                                    name="idMerchant" 
                                    type="number" 
                                    value={form.idMerchant} 
                                    min="1"
                                />
                                <FormField 
                                    label="Nombre Comercial" 
                                    name="nombreComercial" 
                                    value={form.nombreComercial} 
                                />
                                
                                <FormField 
                                    label="Dirección Completa" 
                                    name="direccion" 
                                    value={form.direccion} 
                                />
                                <FormField 
                                    label="Estado" 
                                    name="estado" 
                                    value={form.estado}
                                    options={datosEstaticos.estadosMx} 
                                />
                            </div>
                        </section>

                        <div className="divider"></div>

                        <section className="data-section">
                            <div className="modern-grid-2">
                                {/* Fila 3: Plaza de Atención y Cobertura */}
                                <FormField 
                                    label="Plaza de Atención" 
                                    name="plazaDeAtencion" 
                                    value={form.plazaDeAtencion} 
                                    options={datosEstaticos.plazaDeAtencion}
                                />
                                <FormField 
                                    label="Cobertura (SLA)" 
                                    name="cobertura" 
                                    value={form.cobertura} 
                                    options={datosEstaticos.sla}
                                />
                            </div>
                        </section>

                        <div className="form-actions-footer">
                            <button type="submit" className="btn-modern btn-primary large-button" disabled={isSubmitting}>
                                {isSubmitting ? "Guardando Estación..." : "Guardar Nueva Estación"}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            
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