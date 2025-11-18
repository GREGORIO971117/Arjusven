import React, { useState, useEffect } from "react";
import { apiRequest } from "../login/Api"; 
import {styles} from '../admin/adminTemplate'

// --- CONFIGURACIÓN DE ENDPOINTS Y ESTADO INICIAL ---
const API_TICKETS_URL = '/tickets'; 
const ADMIN_ID_DEFAULT = localStorage.getItem("idUsuario"); 

export default function SubirTicketTemplate() { // Desestructuramos datosEstaticos de props
    
    
    const [idMerchant,setIdMerchant] = useState("");
    const [motivoServicio,setMotivoServicio] = useState("");
    const [observaciones,setObservaciones] = useState("")
    const [incidencia,setIncidencia]= useState("");
    const [loading, setLoading] = useState(false);
    const [mensaje, setMensaje] = useState(null);
    const [error, setError] = useState(null);
    const [formErrors, setFormErrors] = useState({});

    function validateForm() {
        const errs = {};
        if(!incidencia.trim()){
            errs.incidencia = "Número de incidencia es requerido.";
        }
       
        if (!idMerchant || idMerchant === "") {
            errs.idMerchant="Ese IdMerchant no existe";
        }
        
        if (Object.keys(errs).length > 0) setError(null); 

        setFormErrors(errs);
        return Object.keys(errs).length === 0;
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMensaje(null);
        setError(null);
        

        if (!validateForm()) {
            if (Object.keys(formErrors).length === 0) {
                 setError("Por favor, rellena todos los campos obligatorios.");
            }
            return;
        }
        
   
        const payload = {

                "administrador": {
                    "idUsuarios":Number(ADMIN_ID_DEFAULT),
                },
                "servicios": {
                    "motivoDeServicio": motivoServicio.trim(),
                    "observaciones": observaciones.trim(),
                    "incidencia": incidencia.trim(), 
                    "idMerchant": Number(idMerchant.trim()),
                },
                "adicionales":{
                    "ciudad":"Puebla"
                }
            };
        
        setLoading(true);

        try {
            const response = await apiRequest(API_TICKETS_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({})); 
                throw new Error(errorData.message || `Error ${response.status}: Falló la creación del Ticket.`);
            }
            
            const newTicket = await response.json();
            console.log(newTicket);
            const displayId = newTicket?.idTickets || 'desconocido'; 
            setMensaje(`✅ Ticket ${displayId} y sus entidades creados con éxito.`); 
            setIncidencia("");
            setObservaciones("");
            setMotivoServicio("");
            setIdMerchant("");
            setFormErrors({}); 
            
        } catch (err) {
            console.error("Error al publicar ticket:", err);
            setError(err.message || "Error desconocido al publicar el ticket.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            
            <form onSubmit={handleSubmit} style={styles.form}>
                
                <div style={styles.row}>

                    <label style={styles.label}>
                        Numero de incidencia
                        <input
                            type="text"
                            value={incidencia}
                            onChange={(e) => setIncidencia(e.target.value)}
                            disabled={loading}
                            required
                            style={styles.input}
                        />
                        {formErrors.incidencia && <div style={styles.errorTextRow}>{formErrors.incidencia}</div>}
                    </label>

                     <label style={styles.label}>
                        IdMerchant
                        <input
                            type="text"
                            value={idMerchant}
                            onChange={(e) => setIdMerchant(e.target.value)}
                            disabled={loading}
                            required
                            style={styles.input}
                        />
                        {/* Muestra el error específico */}
                        {formErrors.idMerchant && <div style={styles.errorTextRow}>{formErrors.idMerchant}</div>}
                    </label>

                     <label style={styles.label}>
                        Observaciones
                        <input
                            type="text"
                            value={observaciones}
                            onChange={(e) => setObservaciones(e.target.value)}
                            disabled={loading}
                            required
                            style={styles.input}
                        />
                        {/* Muestra el error específico */}
                        {formErrors.observaciones && <div style={styles.errorTextRow}>{formErrors.observaciones}</div>}
                    </label>

                    <label style={styles.label}>
                        Motivo Servicio
                        <input
                            type="text"
                            value={motivoServicio}
                            onChange={(e) => setMotivoServicio(e.target.value)}
                            disabled={loading}
                            required
                            style={styles.input}
                        />
                        {/* Muestra el error específico */}
                        {formErrors.motivoServicio && <div style={styles.errorTextRow}>{formErrors.motivoServicio}</div>}
                    </label>
                    
                </div>
                
                {/* Mensajes de estado/error general */}
                <div style={{...styles.row, flexWrap: 'nowrap'}}>
                    {mensaje && <div style={{...styles.success, flex: '1 1 100%' }}>{mensaje}</div>}
                    {error && <div style={{...styles.error, flex: '1 1 100%'}}>🚨 {error}</div>}
                </div>

                {/* Botón de envío */}
                <div style={{ marginTop: 20 }}>
                    <button type="submit" style={styles.buttonPrimary} disabled={loading}>
                        {loading ? "Creando Ticket..." : "Publicar Ticket"}
                    </button>

                    <button type="submit" style={styles.buttonPrimary} disabled={loading}>
                        {loading ? "Creando Ticket..." : "Subir excel Ticket"}
                    </button>
                </div>
            </form>
        </div>
    );
}