import React, { useState, useRef } from "react";
import { apiRequest } from "../login/Api"; 
import { styles } from '../admin/adminTemplate';

const API_TICKETS_URL = '/tickets';
const ADMIN_ID_DEFAULT = localStorage.getItem("idUsuario"); 

export default function SubirTicketTemplate({ showModal , closeModal,ModalTemplate,modalConfig }) { 
    
    const [idMerchant, setIdMerchant] = useState("");
    const [motivoServicio, setMotivoServicio] = useState("");
    const [observaciones, setObservaciones] = useState("");
    const [incidencia, setIncidencia] = useState("");
    const [loading, setLoading] = useState(false);
    const [formErrors, setFormErrors] = useState({});
    const fileInputRef = useRef(null); 
    const [uploadResult, setUploadResult] = useState(null); 

    function validateForm() {
        const errs = {};
        if(!incidencia.trim()) errs.incidencia = "Número de incidencia es requerido.";
        if (!idMerchant || String(idMerchant).trim() === "") errs.idMerchant="El IdMerchant es requerido.";
        
        if (Object.keys(errs).length > 0) {
            showModal({
                title: "Error de Validación",
                message: "Por favor, revisa los campos marcados en rojo.",
                type: "warning",
            });
        }
        setFormErrors(errs);
        return Object.keys(errs).length === 0;
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setUploadResult(null); 

        if (!validateForm()) {
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
            },
            "adicionales": {}
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
            
            // 💡 Mostrar Modal de éxito
            showModal({
                title: "Ticket Creado con Éxito",
                message: `El Ticket ${displayId} ha sido publicado.`,
                type: "success",
            });
            
            // Limpiar formulario
            setIncidencia("");
            setObservaciones("");
            setMotivoServicio("");
            setIdMerchant("");
            setFormErrors({}); 
            
        } catch (err) {
            console.error("Error al publicar ticket:", err);
            showModal({
                title: "Error al Publicar Ticket",
                message: err.message || "Error desconocido al publicar el ticket.",
                type: "error",
            });
        } finally {
            setLoading(false);
        }
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (!file.name.endsWith('.xls') && !file.name.endsWith('.xlsx')) {
            showModal({
                title: "Formato de Archivo Inválido",
                message: "Solo se permiten archivos Excel (.xls, .xlsx).",
                type: "error",
            });
            return;
        }

        await uploadExcel(file);
        
        e.target.value = null; 
    };

    const uploadExcel = async (file) => {
        setLoading(true);
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

            if (!response.ok) {
                throw new Error(data.message || `Error ${response.status}: Falló la carga masiva.`);
            }

            setUploadResult(data);
            
            let modalTitle = "Carga Masiva Exitosa";
            let modalType = "success";
            let modalMessage = `Se procesaron ${data.totalProcesados} tickets. ${data.totalExitosos} creados.`;

            if (data.totalFallidos > 0) {
                modalTitle = "Carga con Fallos";
                modalType = "warning";
                modalMessage += ` Hubo ${data.totalFallidos} fallidos. Revisa el detalle en el resumen.`;
            } else if (data.advertencias.length > 0) {
                 modalTitle = "Carga con Advertencias";
                 modalType = "info";
            }
            
            showModal({
                title: modalTitle,
                message: modalMessage,
                type: modalType
            });
            
        } catch (err) {
            console.error("Error upload:", err);
            showModal({
                title: "Error de Carga Masiva",
                message: err.message || "Error de conexión al subir el archivo Excel.",
                type: "error",
            });
        } finally {
            setLoading(false);
        }
    };

    const triggerFileInput = () => {
        setUploadResult(null); 
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
            
                {uploadResult && (
                    <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#f9f9f9', borderRadius: '5px', width: '100%' }}>
                        <h4 style={{ margin: '0 0 10px 0' }}>Resumen de Carga Masiva:</h4>
                        <p><strong>Procesados:</strong> {uploadResult.totalProcesados}</p>
                        <p style={{ color: 'green' }}><strong>Exitosos:</strong> {uploadResult.totalExitosos}</p>
                        <p style={{ color: 'red' }}><strong>Fallidos:</strong> {uploadResult.totalFallidos}</p>
                        
                        {uploadResult.errores.length > 0 && (
                            <div style={{ marginTop: '10px', color: 'red', fontSize: '0.9em' }}>
                                <strong>Errores:</strong>
                                <ul style={{maxHeight: '100px', overflowY: 'auto'}}>
                                    {uploadResult.errores.map((err, idx) => (
                                        <li key={idx}>{err}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {uploadResult.advertencias.length > 0 && (
                            <div style={{ marginTop: '10px', color: '#e67e22', fontSize: '0.9em' }}>
                                <strong>Advertencias:</strong>
                                <ul style={{maxHeight: '100px', overflowY: 'auto'}}>
                                    {uploadResult.advertencias.map((adv, idx) => (
                                        <li key={idx}>{adv}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                )}


                <div style={{ marginTop: 20, display: 'flex', gap: '10px' }}>
                    <button 
                    type="submit" 
                    style={styles.buttonPrimary}
                    disabled={loading}>
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
                
                <ModalTemplate
                isOpen={modalConfig.isOpen}
                onClose={closeModal}
                title={modalConfig.title}
                message={modalConfig.message}
                type={modalConfig.type}
            />
            </form>
        </div>
    );
}