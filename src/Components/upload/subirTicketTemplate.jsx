import React, { useState, useRef } from "react"; // Agregamos useRef
import { apiRequest } from "../login/Api"; 
import { styles } from '../admin/adminTemplate';

const API_TICKETS_URL = '/tickets';
const ADMIN_ID_DEFAULT = localStorage.getItem("idUsuario"); 

export default function SubirTicketTemplate() { 
    
    // --- ESTADOS EXISTENTES ---
    const [idMerchant, setIdMerchant] = useState("");
    const [motivoServicio, setMotivoServicio] = useState("");
    const [observaciones, setObservaciones] = useState("");
    const [incidencia, setIncidencia] = useState("");
    const [loading, setLoading] = useState(false);
    const [mensaje, setMensaje] = useState(null);
    const [error, setError] = useState(null);
    const [formErrors, setFormErrors] = useState({});

    // --- NUEVO: ESTADOS PARA CARGA MASIVA ---
    const fileInputRef = useRef(null); 
    const [uploadResult, setUploadResult] = useState(null); 

    function validateForm() {
        const errs = {};
        if(!incidencia.trim()) errs.incidencia = "Número de incidencia es requerido.";
        if (!idMerchant || idMerchant === "") errs.idMerchant="Ese IdMerchant no existe";
        
        if (Object.keys(errs).length > 0) setError(null); 
        setFormErrors(errs);
        return Object.keys(errs).length === 0;
    }
    
    // --- LOGICA DE CREACIÓN MANUAL (Tu código existente) ---
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMensaje(null);
        setError(null);
        setUploadResult(null); 

        if (!validateForm()) {
            if (Object.keys(formErrors).length === 0) {
                 setError("Por favor, rellena todos los campos obligatorios.");
            }
            return;
        }
        
        const payload = {
                "administrador": {
                     "idUsuarios": Number(ADMIN_ID_DEFAULT)
                     },
                "servicios": {
                    "motivoDeServicio": motivoServicio.trim(),
                    "observaciones": observaciones.trim(),
                    "incidencia": incidencia.trim(), 
                    "idMerchant": Number(idMerchant.trim()),
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
            const displayId = newTicket?.idTickets || 'desconocido'; 
            setMensaje(`✅ Ticket ${displayId} creado con éxito.`); 
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

 
    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (!file.name.endsWith('.xls') && !file.name.endsWith('.xlsx')) {
            setError("Solo se permiten archivos Excel (.xls, .xlsx)");
            return;
        }

        await uploadExcel(file);
        
        e.target.value = null; 
    };

    const uploadExcel = async (file) => {
        setLoading(true);
        setError(null);
        setMensaje(null);
        setUploadResult(null);

        const formData = new FormData();
        formData.append("file", file);
        formData.append("idAdministrador", ADMIN_ID_DEFAULT);

        try {
            
            const uploadUrl = `http://localhost:8080/api/tickets/upload`; 
            const token = localStorage.getItem("jwtToken"); 
            const response = await fetch(uploadUrl, { 
                method: "POST",
                headers: {
                     "Authorization": `Bearer ${token}` 
                },
                body: formData
            });

            const data = await response.json();

            if (!response.ok && response.status !== 200) {
                throw new Error(data.message || "Error al subir el archivo");
            }

            setUploadResult(data);
            
        } catch (err) {
            console.error("Error upload:", err);
            setError(err.message || "Error de conexión al subir Excel.");
        } finally {
            setLoading(false);
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current.click();
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
                            style={styles.input}
                        />
                        {formErrors.idMerchant && <div style={styles.errorTextRow}>{formErrors.idMerchant}</div>}
                    </label>

                    <label style={styles.label}>
                        Observaciones
                        <input
                            type="text"
                            value={observaciones}
                            onChange={(e) => setObservaciones(e.target.value)}
                            disabled={loading}
                            style={styles.input}
                        />
                    </label>

                    <label style={styles.label}>
                        Motivo Servicio
                        <input
                            type="text"
                            value={motivoServicio}
                            onChange={(e) => setMotivoServicio(e.target.value)}
                            disabled={loading}
                            style={styles.input}
                        />
                    </label>
                </div>
                
                <div style={{...styles.row, flexWrap: 'nowrap'}}>
                    {mensaje && <div style={{...styles.success, flex: '1 1 100%' }}>{mensaje}</div>}
                    {error && <div style={{...styles.error, flex: '1 1 100%'}}>🚨 {error}</div>}
                </div>

                {uploadResult && (
                    <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#f9f9f9', borderRadius: '5px', width: '100%' }}>
                        <h4 style={{ margin: '0 0 10px 0' }}>Resumen de Carga Masiva:</h4>
                        <p><strong>Procesados:</strong> {uploadResult.totalProcesados}</p>
                        <p style={{ color: 'green' }}><strong>Exitosos:</strong> {uploadResult.totalExitosos}</p>
                        <p style={{ color: 'red' }}><strong>Fallidos:</strong> {uploadResult.totalFallidos}</p>
                        
                        {uploadResult.errores.length > 0 && (
                            <div style={{ marginTop: '10px', color: 'red', fontSize: '0.9em' }}>
                                <strong>Errores:</strong>
                                <ul>
                                    {uploadResult.errores.map((err, idx) => (
                                        <li key={idx}>{err}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {uploadResult.advertencias.length > 0 && (
                            <div style={{ marginTop: '10px', color: '#e67e22', fontSize: '0.9em' }}>
                                <strong>Advertencias:</strong>
                                <ul>
                                    {uploadResult.advertencias.map((adv, idx) => (
                                        <li key={idx}>{adv}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                )}


                {/* --- BOTONES --- */}
                <div style={{ marginTop: 20, display: 'flex', gap: '10px' }}>
                    <button 
                    type="submit" 
                    style={styles.buttonPrimary} disabled={loading}>
                        {loading ? "Procesando..." : "Publicar Ticket"}
                    </button>

                    <input 
                        type="file" 
                        ref={fileInputRef}
                        style={{ display: 'none' }} 
                        onChange={handleFileChange}
                        accept=".xls,.xlsx"
                    />

                    <button 
                        type="button" 
                        style={{...styles.buttonPrimary, backgroundColor: '#28a745'}}
                        disabled={loading}
                        onClick={triggerFileInput}
                    >
                        {loading ? "Subiendo..." : "Subir Excel Ticket"}
                    </button>
                </div>
            </form>
        </div>
    );
}