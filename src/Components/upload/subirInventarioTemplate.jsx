import React, { useState, useRef } from 'react';
import { apiRequest } from '../login/Api'; 
import { styles } from '../admin/adminTemplate';

// Ajusta esto a tu URL base real si no usas un proxy
const BASE_URL = 'http://localhost:8080/api'; 
const INVENTARIO_API_URL = '/inventario';

const initialFormState = {
    numeroDeSerie: "",
    equipo: "",
    descripcion: "",
};

export default function SubirInventarioTemplate({ datosEstaticos }) {

    // --- ESTADOS ---
    const [inventario, setInventario] = useState([]); 
    const [form, setForm] = useState(initialFormState); 
    const [artErrors, setArtErrors] = useState({}); 
    
    // Mensajes generales
    const [error, setError] = useState(""); 
    const [mensaje, setMensaje] = useState("");

    // Estados de carga
    const [isSubmitting, setIsSubmitting] = useState(false); 
    const [isUploading, setIsUploading] = useState(false);

    // Resultado de la carga masiva (Excel)
    const [uploadResult, setUploadResult] = useState(null);

    const fileInputRef = useRef(null); 

    // --- HANDLERS Y UTILIDADES ---

    function handleChange(e) {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    }

    const triggerFileInput = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (!file.name.endsWith('.xls') && !file.name.endsWith('.xlsx')) {
            setError("Solo se permiten archivos Excel (.xls, .xlsx)");
            return;
        }

        await uploadExcel(file);
        e.target.value = null; // Reset input
    };

    const uploadExcel = async (file) => {
        setIsUploading(true);
        setError("");
        setMensaje("");
        setUploadResult(null);

        // OBTENER ID ADMIN Y TOKEN
        // NOTA: Ajusta esto según cómo guardes tu usuario en el login.
        const idAdmin = localStorage.getItem("idUsuario") || 1; 
        const token = localStorage.getItem("jwtToken"); 

        const formData = new FormData();
        formData.append("file", file);
        formData.append("idAdministrador", idAdmin);

        try {
            // Usamos fetch directo para FormData para evitar problemas de Content-Type
            const response = await fetch(`${BASE_URL}${INVENTARIO_API_URL}/upload`, { 
                method: "POST",
                headers: {
                      "Authorization": `Bearer ${token}` 
                },
                body: formData
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Error al subir el archivo");
            }

            setUploadResult(data);
            
            // Mensaje de éxito o advertencia dependiendo del resultado
            if(data.errores && data.errores.length > 0) {
                 setMensaje(`Proceso terminado con ${data.errores.length} incidencias.`);
            } else {
                 setMensaje("Carga masiva completada exitosamente.");
            }
            
        } catch (err) {
            console.error("Error upload:", err);
            setError(err.message || "Error de conexión al subir Excel.");
        } finally {
            setIsUploading(false);
        }
    };


    function validateForm() {
        const errs = {};
        if (!form.numeroDeSerie || form.numeroDeSerie.trim() === "") {
            errs.numeroDeSerie = "El número de serie es requerido.";
        }
        if (!form.equipo || form.equipo.trim() === "") {
            errs.equipo = "El equipo es requerido.";
        }
        
        if (Object.keys(errs).length > 0) setError(""); 

        setArtErrors(errs);
        return Object.keys(errs).length === 0;
    }

    function resetForm() {
        setForm(initialFormState); 
        setArtErrors({});
    }

    // --- SUBIDA MANUAL (UN SOLO ITEM) ---
    async function submitArticulo(e) {
        e.preventDefault();
        
        if (!validateForm()) {
            setError("Por favor, rellena los campos obligatorios.");
            return;
        }

        setIsSubmitting(true);
        setError(""); 
        setMensaje("");
        setUploadResult(null);
        
        try {
            const response = await apiRequest(INVENTARIO_API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form), 
            });

            if (!response.ok) {
                let errorMsg = `Error ${response.status}: Falló la creación. `;
                // Intentar leer error del backend
                try {
                    const errorData = await response.json();
                    errorMsg = errorData.message || errorMsg;
                } catch(e) { /* ignorar si no es json */ }
                
                throw new Error(errorMsg);
            }

            const nuevoArticulo = await response.json();
            
            // CORREGIDO: Typo anterior 'rticulnuevoAo'
            setInventario((prev) => [nuevoArticulo, ...prev]);
            
            resetForm();
            setMensaje("✅ Artículo de inventario creado correctamente."); 

        } catch (err) {
            setError("Error: " + err.message);
        } finally {
            setIsSubmitting(false);
        }
    }

    // --- RENDERIZADO ---
    return (
        <div style={styles.container}>

                <form onSubmit={submitArticulo} style={styles.form}>
                    
                    {/* Fila 1: Número de Serie */}
                    <div style={styles.row}>
                        <label style={styles.label}>
                            Número de serie
                            <input 
                                name="numeroDeSerie" 
                                value={form.numeroDeSerie} 
                                onChange={handleChange} 
                                style={styles.input} 
                                placeholder="Ej: SN12345678"
                            />
                        </label>
                    </div>

                    {/* Fila de Errores 1 */}
                    <div style={styles.row}>
                        {artErrors.numeroDeSerie && <div style={styles.errorTextRow}>{artErrors.numeroDeSerie}</div>}
                    </div>

                    {/* Fila 2: Equipo */}
                    <div style={styles.row}>
                        <label style={styles.label}>Equipo
                        <select name="equipo" value={form.equipo} onChange={handleChange} style={styles.input}>
                            <option value="">Seleccione Equipo</option>
                            {datosEstaticos.equipos?.map((opcion) => (
                                <option key={opcion} value={opcion}>{opcion}</option>
                            ))}
                        </select>
                        </label>
                    </div>
                    <div style={styles.row}>
                         {artErrors.equipo && <div style={styles.errorTextRow}>{artErrors.equipo}</div>}
                    </div>

                    {/* Fila 3: Descripción */}
                    <div style={{...styles.row, flexWrap: 'nowrap'}}>
                        <label style={{...styles.label, flex: '1 1 100%'}}>
                            Descripción
                            <textarea 
                                name="descripcion" 
                                value={form.descripcion} 
                                onChange={handleChange} 
                                style={styles.textarea} 
                                rows="3" 
                            />
                        </label>
                    </div>

                    {/* Mensajes Generales */}
                    {error && (
                        <div style={{...styles.error, color: 'red', marginTop: '10px'}}>
                            ⚠️ {error}
                        </div>
                    )}
                    {mensaje && (
                        <div style={{...styles.error, color: 'green', borderColor: 'green', marginTop: '10px'}}>
                            {mensaje}
                        </div>
                    )}

                    {/* --- ZONA DE RESULTADOS EXCEL --- */}
                    {uploadResult && (
                        <div style={{ marginTop: '15px', padding: '10px', backgroundColor: '#f8f9fa', border: '1px solid #ddd', borderRadius: '5px' }}>
                            <h4 style={{margin: '0 0 10px 0'}}>Resumen de Carga:</h4>
                            <p><strong>Total Procesados:</strong> {uploadResult.totalProcesados}</p>
                            <p style={{color: 'green'}}><strong>Exitosos:</strong> {uploadResult.totalExitosos}</p>
                            
                            {uploadResult.errores && uploadResult.errores.length > 0 && (
                                <div style={{marginTop: '10px'}}>
                                    <strong style={{color: 'red'}}>Errores ({uploadResult.errores.length}):</strong>
                                    <ul style={{maxHeight: '100px', overflowY: 'auto', fontSize: '0.9em', color: '#d9534f'}}>
                                        {uploadResult.errores.map((err, idx) => (
                                            <li key={idx}>{err}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            
                            {uploadResult.advertencias && uploadResult.advertencias.length > 0 && (
                                <div style={{marginTop: '10px'}}>
                                    <strong style={{color: 'orange'}}>Advertencias:</strong>
                                    <ul style={{maxHeight: '100px', overflowY: 'auto', fontSize: '0.9em'}}>
                                        {uploadResult.advertencias.map((adv, idx) => (
                                            <li key={idx}>{adv}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Botones */}
                    <div style={{ marginTop: 20, display: 'flex', gap: '10px' }}>
                        <button
                            type="submit" 
                            style={styles.buttonPrimary} 
                            disabled={isSubmitting || isUploading}>
                            {isSubmitting ? "Creando..." : "Crear artículo"}
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
                            disabled={isSubmitting || isUploading}
                            onClick={triggerFileInput}
                        >
                            {isUploading ? "Subiendo..." : "Subir Excel Inventario"}
                        </button>
                    </div>
                </form>
        </div>
    );
}