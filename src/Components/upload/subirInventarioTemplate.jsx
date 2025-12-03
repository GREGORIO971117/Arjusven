import React, { useState, useRef } from 'react';
import { apiRequest } from '../login/Api'; 
import { styles } from '../admin/adminTemplate';

const INVENTARIO_API_URL = '/inventario';
const initialFormState = {
    numeroDeSerie: "",
    equipo: "",
    descripcion: "",
};

export default function SubirInventarioTemplate({datosEstaticos}) {

    const [inventario, setInventario] = useState([]); 
    const [form, setForm] = useState(initialFormState); 
    const [artErrors, setArtErrors] = useState({}); 
    const [error, setError] = useState(""); 
    const [isSubmitting, setIsSubmitting] = useState(false); 
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

        //await uploadExcel(file);
        
        e.target.value = null; 
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

    async function submitArticulo(e) {
        e.preventDefault();
        
        if (!validateForm()) {
            setError("Por favor, rellena los campos obligatorios.");
            return;
        }

        setIsSubmitting(true);
        setError(""); 
        
        try {
            const response = await apiRequest(INVENTARIO_API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form), 
            });
            

            if (!response.ok) {
                let errorMsg = `Error ${response.status}: Falló la creación. `;
                const isJson = response.headers.get('content-type')?.includes('application/json');
                
                if (isJson) {
                    const errorData = await response.json();
                    errorMsg += errorData.message || response.statusText;
                } else {
                    errorMsg += await response.text();
                }
                throw new Error(errorMsg);
            }

            const nuevoArticulo = await response.json();
            setInventario((prev) => [rticulnuevoAo, ...prev]);
            resetForm();
            setError("✅ Artículo de inventario creado correctamente."); 

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
                    
                    {/* Fila 1: Título y Número de Serie */}
                    <div style={styles.row}>
                        <label style={styles.label}>
                            Número de serie
                            <input name="numeroDeSerie" value={form.numeroDeSerie} onChange={handleChange} style={styles.input} />
                        </label>
                    </div>

                    {/* Fila de Errores 1 */}
                    <div style={styles.row}>
                        {artErrors.numeroDeSerie && <div style={styles.errorTextRow}>{artErrors.numeroDeSerie}</div>}
                    </div>

                    {/* Fila 2: Equipo y Estado */}
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
                    {/* Fila 4: Descripción */}
                    <div style={{...styles.row, flexWrap: 'nowrap'}}>
                        <label style={{...styles.label, flex: '1 1 100%'}}>
                            Descripción
                            <textarea name="descripcion" value={form.descripcion} onChange={handleChange} style={styles.textarea} rows="3" />
                        </label>
                    </div>

                    {/* Errores/Mensajes de API */}
                    {error && (
                        <div style={styles.error}>
                            {error}
                        </div>
                    )}

                      <div style={{ marginTop: 20, display: 'flex', gap: '10px' }}>
                        <button
                        type="submit" 
                        style={styles.buttonPrimary} 
                        disabled={isSubmitting}>
                            {isSubmitting ? "Creando artículo..." : "Crear artículo"}
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
                            disabled={isSubmitting}
                            onClick={triggerFileInput}
                        >
                            {isSubmitting ? "Subiendo..." : "Subir Excel Inventario"}
                        </button>

                    </div>
                </form>
        </div>
    );
}