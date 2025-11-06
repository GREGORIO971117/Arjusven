import React, { useState, useEffect } from "react";
import { apiRequest } from "../login/Api"; 
import {styles} from '../admin/adminTemplate'

// --- CONFIGURACIÓN DE ENDPOINTS Y ESTADO INICIAL ---
const API_TICKETS_URL = '/tickets'; 
const USERS_API_URL = '/usuarios'; 
const ADMIN_ID_DEFAULT = ""; // Cambiamos a cadena vacía para forzar la selección

export default function SubirTicketTemplate(datosEstaticos) {
    
    // --- ESTADOS ---
    const [nombreEstacion, setNombreEstacion] = useState("");
    const [idResponsable, setIdResponsable] = useState(ADMIN_ID_DEFAULT);
    const [incidencia,setIncidencia]= useState("");
    const [estadosMx, setEstadosMx] = useState("");
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

    
    function validateForm() {
        const errs = {};
        if (!nombreEstacion.trim()) {
            errs.nombreEstacion = "El nombre de la estación es requerido.";
        }
        if (!idResponsable || idResponsable === "") {
            errs.idResponsable = "Debe seleccionar un responsable (Admin).";
        }
        if(!incidencia.trim()){
            errs.incidencia = "Numero de incidencia es requerido.";
        }
        if (!estadosMx || estadosMx === "") {
            errs.idResponsable = "Debe seleccionar la ciudad.";
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
            setError("Por favor, rellena todos los campos obligatorios.");
            return;
        }
        
        // 1. CONSTRUIR EL PAYLOAD COMPLETO ANIDADO
        const payload = {
            "administrador": {
                "idUsuarios": Number(idResponsable)
            },
            "servicios": {
                "nombreDeEss": nombreEstacion.trim(),
                "incidencia": incidencia.trim()
            },
            "adicionales":{
                "ciudad":  estadosMx
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
                    
                        <label style={styles.label}>Ciudad
                            <select name="estadosMx"
                                    value={datosEstaticos.estadosMx}
                                    onChange={(e) => setEstadosMx(e.target.value)}
                                    style={styles.input}>
                                <option value="">Seleccione una ciudad</option>
                                    {datosEstaticos.estadosMx?.map((opcion) => (
                                <option key={opcion} value={opcion}>{opcion}</option>))}
                            </select>
                    </label>
                    
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

