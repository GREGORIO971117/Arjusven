import React, { useState, useEffect } from "react";
import { apiRequest } from "../login/Api"; 
import {styles} from '../admin/adminTemplate'

// --- CONFIGURACIÓN DE ENDPOINTS Y ESTADO INICIAL ---
const API_TICKETS_URL = '/tickets'; 
const USERS_API_URL = '/usuarios'; 
const ADMIN_ID_DEFAULT = ""; 

export default function SubirTicketTemplate({ datosEstaticos }) { // Desestructuramos datosEstaticos de props
    
    // --- ESTADOS ---
    const [nombreEstacion, setNombreEstacion] = useState("");
    const [idResponsable, setIdResponsable] = useState(ADMIN_ID_DEFAULT);
    const [idMerchant,setIdMerchant] = useState("")
    const [incidencia,setIncidencia]= useState("");
    const [ciudadSeleccionada, setCiudadSeleccionada] = useState(""); 
    const [usuarios, setUsuarios] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isLoadingUsers, setIsLoadingUsers] = useState(true);
    const [mensaje, setMensaje] = useState(null);
    const [error, setError] = useState(null);
    const [formErrors, setFormErrors] = useState({});

    // --- LÓGICA DE CARGA DE USUARIOS ---
    const fetchUsers = async () => {
        try {
            const response = await apiRequest(USERS_API_URL, {method: 'GET'});
            if (!response.ok) throw new Error("Error al cargar la lista de responsables.");
            
            const data = await response.json();
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
        
        // 1. Validar Nombre de Estación
        if (!nombreEstacion.trim()) {
            errs.nombreEstacion = "El nombre de la estación es requerido.";
        }
        
        // 2. Validar Número de Incidencia
        if(!incidencia.trim()){
            errs.incidencia = "Número de incidencia es requerido.";
        }
        
        // 3. Validar Ciudad (Corregido: usa ciudadSeleccionada)
        if (!ciudadSeleccionada || ciudadSeleccionada === "") {
            errs.ciudadSeleccionada = "Debe seleccionar la ciudad."; // Nuevo campo de error
        }
        
        // 4. Validar Responsable (Admin)
        if (!idResponsable || idResponsable === "") {
            errs.idResponsable = "Debe seleccionar un responsable (Admin).";
        }
        
        if (!idMerchant || idMerchant === "") {
            errs.idMerchant="Ese IdMerchant no existe";
        }
        
        // Si hay errores de formulario, aseguramos que el error global no se muestre inicialmente.
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
                    "idUsuarios": Number(idResponsable) // Dinámico
                },
                "servicios": {
                    "nombreDeEss": nombreEstacion.trim(), // Dinámico
                    "incidencia": incidencia.trim(), // Dinámico
                    "idMerchant": idMerchant.trim(),
                },
                "adicionales":{
                    "ciudad": ciudadSeleccionada // Dinámico
                }
            };
        
        setLoading(true);

        try {
            const response = await apiRequest(API_TICKETS_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            console.log(response);
            
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({})); 
                throw new Error(errorData.message || `Error ${response.status}: Falló la creación del Ticket.`);
            }
            
            const newTicket = await response.json();
            console.log(newTicket);
            const displayId = newTicket?.idTickets || 'desconocido'; 
            setMensaje(`✅ Ticket ${displayId} y sus entidades creados con éxito. (Solo se envió el ID: ${Number(idResponsable)})`); 
            setNombreEstacion(""); 
            setIncidencia("");
            setCiudadSeleccionada("");
            setIdResponsable(ADMIN_ID_DEFAULT);
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
                    
                    {/* Nombre de estación (ESS) */}
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
                         {/* Muestra el error específico */}
                         {formErrors.nombreEstacion && <div style={styles.errorTextRow}>{formErrors.nombreEstacion}</div>}
                    </label>

                    {/* Numero de incidencia */}
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
                        {/* Muestra el error específico */}
                        {formErrors.incidencia && <div style={styles.errorTextRow}>{formErrors.incidencia}</div>}
                    </label>

                    {/*El campo de idmerchant */}
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
                    
                    {/* Ciudad (Corregido: usa ciudadSeleccionada) */}
                    <label style={styles.label}>Ciudad
                        <select 
                            name="ciudadSeleccionada" 
                            value={ciudadSeleccionada} 
                            onChange={(e) => setCiudadSeleccionada(e.target.value)}
                            style={styles.input}
                            required
                        >
                            <option value="">Seleccione Ciudad</option>
                            {datosEstaticos.estadosMx?.map((opcion) => (
                                <option key={opcion} value={opcion}>{opcion}</option>
                            ))}
                        </select>
                         {formErrors.ciudadSeleccionada && <div style={styles.errorTextRow}>{formErrors.ciudadSeleccionada}</div>}
                    </label>
                    
                    {/* Responsable (Admin) */}
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
                </div>
            </form>
        </div>
    );
}