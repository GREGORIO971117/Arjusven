import React, { useState, useRef } from 'react';
import { apiRequest } from '../login/Api'; 
import { styles } from '../admin/adminTemplate';

const BASE_URL = 'http://localhost:8080/api'; 
const INVENTARIO_API_URL = '/inventario';

const initialFormState = {
    numeroDeSerie: "",
    equipo: "",
    descripcion: "",
};

export default function SubirInventarioTemplate({ datosEstaticos, showModal , closeModal,ModalTemplate,modalConfig}) {

    const [inventario, setInventario] = useState([]); 
    const [form, setForm] = useState(initialFormState); 
    const [artErrors, setArtErrors] = useState({}); 
    const [isSubmitting, setIsSubmitting] = useState(false); 
    const [isUploading, setIsUploading] = useState(false);

    const [uploadResult, setUploadResult] = useState(null);

    const fileInputRef = useRef(null); 
    function handleChange(e) {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    }

    const triggerFileInput = () => {
        setUploadResult(null); 
        showModal({
            title: "Seleccionar Archivo",
            message: "A continuación, selecciona el archivo Excel (.xls o .xlsx) con los datos del inventario.",
            type: "info",
        });
        setTimeout(() => {
            fileInputRef.current.click();
        }, 500); 
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
        setIsUploading(true);
        setUploadResult(null);

        const idAdmin = localStorage.getItem("idUsuario") || 1; 
        const token = localStorage.getItem("jwtToken"); 

        const formData = new FormData();
        formData.append("file", file);
        formData.append("idAdministrador", idAdmin);

        try {
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
            
            let modalTitle = "Carga Masiva Completada";
            let modalType = "success";
            let modalMessage = `Se procesaron ${data.totalProcesados} registros. ${data.totalExitosos} se guardaron correctamente.`;

            if(data.errores && data.errores.length > 0) {
                modalTitle = "Carga con Incidencias";
                modalType = "warning";
                modalMessage += ` Hubo ${data.errores.length} errores. Revisa el detalle.`;
            } else if (data.advertencias && data.advertencias.length > 0) {
                modalTitle = "Carga con Advertencias";
                modalType = "warning";
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
                message: err.message || "Error de conexión al subir Excel.",
                type: "error",
            });
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
        
        if (Object.keys(errs).length > 0) {
            showModal({
                title: "Campos Requeridos",
                message: "Por favor, rellena los campos obligatorios para el artículo.",
                type: "warning",
            });
        }

        setArtErrors(errs);
        return Object.keys(errs).length === 0;
    }

    function resetForm() {
        setForm(initialFormState); 
        setArtErrors({});
    }

    async function submitArticulo(e) {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);
        setUploadResult(null); 
        
        try {
            const response = await apiRequest(INVENTARIO_API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form), 
            });

            if (!response.ok) {
                let errorMsg = `Error ${response.status}: Falló la creación. `;
                try {
                    const errorData = await response.json();
                    errorMsg = errorData.message || errorMsg;
                } catch(e) { }
                
                throw new Error(errorMsg);
            }

            const nuevoArticulo = await response.json();
            
            setInventario((prev) => [nuevoArticulo, ...prev]);
            
            resetForm();
            
            showModal({
                title: "Artículo Creado",
                message: `El artículo con N/S ${nuevoArticulo.numeroDeSerie} se ha registrado correctamente.`,
                type: "success",
            });

        } catch (err) {
            showModal({
                title: "Error al Crear Artículo",
                message: err.message,
                type: "error",
            });
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div style={styles.container}>
            
            <form onSubmit={submitArticulo} style={styles.form}>
                
                <div style={styles.row}>
                    <label style={styles.label}>
                        Número de serie
                        <input 
                            name="numeroDeSerie" 
                            type="text" 
                            value={form.numeroDeSerie} 
                            onChange={handleChange} 
                            style={styles.input} 
                            placeholder="Ej: SN12345678"
                        />
                    </label>
                </div>

                <div style={styles.row}>
                    {artErrors.numeroDeSerie && <div style={styles.errorTextRow}>{artErrors.numeroDeSerie}</div>}
                </div>

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