import React, { useState, useEffect } from "react";
import { apiRequest } from "../login/Api"; 

// --- CONFIGURACIÓN DE ENDPOINTS Y ESTADO INICIAL ---
const API_TICKETS_URL = '/tickets'; 
const USERS_API_URL = '/usuarios'; 
const ADMIN_ID_DEFAULT = ""; // Cambiamos a cadena vacía para forzar la selección

export default function SubirTicketTemplate() {
    
    // --- ESTADOS ---
    const [nombreEstacion, setNombreEstacion] = useState("");
    const [idResponsable, setIdResponsable] = useState(ADMIN_ID_DEFAULT); // Almacenará el idUsuarios del responsable
    const [usuarios, setUsuarios] = useState([]); // Lista de usuarios (Administradores)
    
    const [loading, setLoading] = useState(false);
    const [isLoadingUsers, setIsLoadingUsers] = useState(true);
    const [mensaje, setMensaje] = useState(null);
    const [error, setError] = useState(null);
    const [formErrors, setFormErrors] = useState({});

    // --- LÓGICA DE CARGA DE USUARIOS (Igual que en Inventario) ---
    const fetchUsers = async () => {
        try {
            const response = await apiRequest(USERS_API_URL, {method: 'GET'});
            if (!response.ok) throw new Error("Error al cargar la lista de responsables.");
            
            const data = await response.json();
            // Asumimos que todos los usuarios devueltos pueden ser "Administradores"
            setUsuarios(Array.isArray(data) ? data : []); 
        } catch (err) {
            console.error("Fallo de API al cargar usuarios:", err);
            setError("No se pudo cargar la lista de responsables.");
        } finally {
            setIsLoadingUsers(false);
        }
    };

    useEffect(() => {
        fetchUsers(); 
    }, []);

    // --- HANDLERS ---
    
    function validateForm() {
        const errs = {};
        if (!nombreEstacion.trim()) {
            errs.nombreEstacion = "El nombre de la estación es requerido.";
        }
        // Validar que se haya seleccionado un responsable
        if (!idResponsable || idResponsable === "") {
            errs.idResponsable = "Debe seleccionar un responsable (Admin).";
        }
        
        // Limpiar mensaje de error general si la validación falla
        if (Object.keys(errs).length > 0) setError(null); 

        setFormErrors(errs);
        return Object.keys(errs).length === 0;
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMensaje(null);
        setError(null);
        
        if (!validateForm()) {
            setError("Por favor, rellena todos los campos obligatorios.");
            return;
        }
        
        // 1. CONSTRUIR EL PAYLOAD COMPLETO ANIDADO
        const payload = {
            "administrador": {
                "idUsuarios": Number(idResponsable) // Referencia al usuario administrador
            },
            "servicios": {
                "nombreDeEss": nombreEstacion.trim() 
            },
            "adicionales":{
                "ciudad": "Puebla" // Valor inicial dummy
            }
        };
        
        setLoading(true);

        try {
            // 2. Ejecutar un ÚNICO POST
            const response = await apiRequest(API_TICKETS_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                // Captura de errores de API/servidor
                const errorData = await response.json().catch(() => ({})); 
                throw new Error(errorData.message || `Error ${response.status}: Falló la creación del Ticket.`);
            }
            
            const newTicket = await response.json();
            
            // 3. ÉXITO
            setMensaje(`✅ Ticket ${newTicket.idTickets} y sus entidades creados con éxito.`);
            setNombreEstacion(""); 
            // Opcional: setea idResponsable a un valor por defecto o déjalo.
            setFormErrors({}); 
            
        } catch (err) {
            console.error("Error al publicar ticket:", err);
            setError(err.message || "Error desconocido al publicar el ticket.");
        } finally {
            setLoading(false);
        }
    };

    // --- RENDERIZADO ---
    return (
        <div style={styles.container}>
            
            <form onSubmit={handleSubmit} style={styles.form}>
                
                {/* Fila 1: Nombre de Estación y Responsable */}
                <div style={styles.row}>
                    
                    {/* Nombre de Estación (Servicio) */}
                    <label style={styles.label}>
                        Nombre de estación (ESS)
                        <input
                            type="text"
                            value={nombreEstacion}
                            onChange={(e) => setNombreEstacion(e.target.value)}
                            disabled={loading}
                            required
                            style={styles.input}
                        />
                         {formErrors.nombreEstacion && <div style={styles.errorTextRow}>{formErrors.nombreEstacion}</div>}
                    </label>
                    
                    {/* ID del Responsable (Administrador) */}
                    <label style={styles.label}>Responsable (Admin)
                        <select
                            name="idResponsable"
                            value={idResponsable}
                            onChange={(e) => setIdResponsable(e.target.value)}
                            style={styles.input}
                            disabled={loading || isLoadingUsers}
                            required
                        >
                            <option value="">{isLoadingUsers ? 'Cargando responsables...' : 'Seleccione Administrador'}</option>
                            {!isLoadingUsers && usuarios.map((user) => (
                                <option key={user.idUsuarios} value={user.idUsuarios}> 
                                    {user.nombre} (ID: {user.idUsuarios})
                                </option>
                            ))}
                        </select>
                        {formErrors.idResponsable && <div style={styles.errorTextRow}>{formErrors.idResponsable}</div>}
                    </label>
                </div>
                
                {/* Fila de mensajes (Éxito / Error) */}
                <div style={{...styles.row, flexWrap: 'nowrap'}}>
                    {mensaje && <div style={{...styles.success, flex: '1 1 100%' }}>{mensaje}</div>}
                    {error && <div style={{...styles.error, flex: '1 1 100%'}}>🚨 {error}</div>}
                </div>

                <div style={{ marginTop: 20 }}>
                    <button type="submit" style={styles.buttonPrimary} disabled={loading}>
                        {loading ? "Creando Ticket..." : "Publicar Ticket"}
                    </button>
                </div>
            </form>
        </div>
    );
}

// --- ESTILOS UNIFICADOS ---
const styles = {
    container: { padding: 20, fontFamily: "Segoe UI, Roboto, system-ui, sans-serif", color: "#222" },
    title: { marginBottom: 12 },
    form: {},
    row: { 
        display: "flex", 
        gap: 12, 
        marginTop: 8, 
        flexWrap: "wrap" 
    },
    label: { 
        display: "flex", 
        flexDirection: "column", 
        flex: "1 1 220px", 
        fontSize: 14 
    },
    input: { marginTop: 6, padding: "8px 10px", borderRadius: 4, border: "1px solid #ccc", fontSize: 14 },
    buttonPrimary: { padding: "8px 12px", background: "#0078d4", color: "#fff", border: "none", borderRadius: 4, cursor: "pointer" },
    error: { 
        color: "#b00020", 
        marginTop: 8, 
        padding: 8, 
        border: "1px solid #b00020", 
        borderRadius: 4, 
        background: "#ffdddd" 
    },
    success: {
        color: "#155724", 
        marginTop: 8, 
        padding: 8, 
        border: "1px solid #c3e6cb", 
        borderRadius: 4, 
        background: "#d4edda"
    },
    errorTextRow: { 
        color: "#b00020", 
        fontSize: 12, 
        flex: "1 1 220px",
        marginTop: 4 
    }
};