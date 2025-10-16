import React, { useState, useEffect } from 'react';

const API_BASE_URL = 'http://localhost:8080/api/inventario'; // Endpoint base para Inventario

export default function SubirInventarioTemplate() {

    // --- ESTADOS ---
    const [inventario, setInventario] = useState([]); // Lista de todos los artículos de inventario
    const [form, setForm] = useState({ // Estado del formulario para agregar
        titulo: "",
        numeroDeSerie: "",
        equipo: "",
        estado: "ACTIVO",
        responsable: "",
        cliente: "",
        plaza: "",
        tecnico: "",
        numeroDeIncidencia: "",
        codigoEmail: "",
        guias: "",
        fechaDeInicioPrevista: "",
        fechaDeFinPrevista: "",
        fechaDeFin: "",
        ultimaActualizacion: "",
        descripcion: "",
        // Eliminamos "attachments: []"
    });

    const [artErrors, setArtErrors] = useState({}); // Errores de validación del formulario
    const [error, setError] = useState(""); // Errores de API y mensajes de éxito
    const [isLoading, setIsLoading] = useState(true); // Estado de carga inicial (GET)
    const [isSubmitting, setIsSubmitting] = useState(false); // Estado de envío (POST)

    // --- FUNCIONES DE FETCH Y LÓGICA ---

    // Función para cargar todos los artículos de inventario (GET)
    const fetchInventario = async () => {
        setIsLoading(true);
        setError("");
        try {
            const response = await fetch(API_BASE_URL);
            if (!response.ok) throw new Error("Error al cargar el inventario.");

            const data = await response.json();
            setInventario(Array.isArray(data) ? data : []);
        } catch (err) {
            setError(err.message || "No se pudo conectar al servidor de inventario.");
            setInventario([]);
        } finally {
            setIsLoading(false);
        }
    };

    // Carga inicial del inventario
    useEffect(() => {
        fetchInventario();
    }, []);

    // Manejador de cambios en inputs de texto/select
    function handleChange(e) {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    }

    // Validación del formulario de inventario
    function validateForm() {
        const errs = {};
        if (!form.titulo || form.titulo.trim() === "") {
            errs.titulo = "El título es requerido.";
        }
        if (!form.numeroDeSerie || form.numeroDeSerie.trim() === "") {
            errs.numeroDeSerie = "El número de serie es requerido.";
        }
        
        if (error) setError(""); 

        setArtErrors(errs);
        return Object.keys(errs).length === 0;
    }

    // Función para resetear el formulario
    function resetForm() {
        setForm({
            titulo: "",
            numeroDeSerie: "",
            equipo: "",
            estado: "ACTIVO",
            responsable: "",
            cliente: "",
            plaza: "",
            tecnico: "",
            numeroDeIncidencia: "",
            codigoEmail: "",
            guias: "",
            fechaDeInicioPrevista: "",
            fechaDeFinPrevista: "",
            fechaDeFin: "",
            ultimaActualizacion: "",
            descripcion: "",
        });
        setArtErrors({});
    }

    // Función para agregar un nuevo artículo (POST - USANDO JSON)
    async function submitArticulo(e) {
        e.preventDefault();
        
        if (!validateForm()) {
             setError("Por favor, rellena los campos obligatorios.");
             return;
        }

        setIsSubmitting(true);
        setError(""); // Limpiar errores de API
        
        try {
            // EL FETCH CRÍTICO: Usando JSON y el header Content-Type
            const response = await fetch(API_BASE_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form), // Se envía directamente el objeto 'form'
            });

            if (!response.ok) {
                let errorMsg = `Error ${response.status}: Falló la creación. `;
                try {
                    const errorData = await response.json();
                    errorMsg += errorData.message || response.statusText;
                } catch {
                    errorMsg += await response.text();
                }
                throw new Error(errorMsg);
            }

            const nuevoArticulo = await response.json();
            setInventario((prev) => [nuevoArticulo, ...prev]);
            resetForm();
            setError("Artículo de inventario creado correctamente."); // Mensaje de éxito

        } catch (err) {
            setError("Error: " + err.message);
        } finally {
            setIsSubmitting(false);
        }
    }

    // Función para eliminar un artículo (DELETE)
    async function removeArticulo(id) {
        if (!window.confirm("¿Borrar este artículo de inventario? Esta acción no se puede deshacer.")) return;

        setError("");
        try {
            const response = await fetch(`${API_BASE_URL}/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error(`Error al borrar: ${response.statusText}`);
            }

            setInventario((prev) => prev.filter((art) => art.idInventario !== id));
            setError("Artículo eliminado correctamente.");
        } catch (err) {
            setError(err.message || "Fallo la conexión con el servidor.");
        }
    }


    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Gestión de Inventario</h2>

            {/* SECCIÓN AGREGAR ARTÍCULO */}
            <section style={styles.card}>
                <h3>Agregar artículo</h3>
                <form onSubmit={submitArticulo} style={styles.form}>
                    
                    {/* Fila 1: Título y Número de Serie */}
                    <div style={styles.row}>
                        <label style={styles.label}>
                            Título*
                            <input name="titulo" value={form.titulo} onChange={handleChange} style={styles.input} />
                        </label>
                        <label style={styles.label}>
                            Número de serie*
                            <input name="numeroDeSerie" value={form.numeroDeSerie} onChange={handleChange} style={styles.input} />
                        </label>
                    </div>

                    {/* Fila de Errores 1 */}
                    <div style={styles.row}>
                        {artErrors.titulo && <div style={styles.errorTextRow}>{artErrors.titulo}</div>}
                        {artErrors.numeroDeSerie && <div style={styles.errorTextRow}>{artErrors.numeroDeSerie}</div>}
                    </div>

                    {/* Fila 2: Equipo y Estado */}
                    <div style={styles.row}>
                        <label style={styles.label}>
                            Equipo
                            <input name="equipo" value={form.equipo} onChange={handleChange} style={styles.input} />
                        </label>
                        <label style={styles.label}>
                            Estado
                            <select name="estado" value={form.estado} onChange={handleChange} style={styles.input}>
                                <option value="ACTIVO">ACTIVO</option>
                                <option value="EN REPARACIÓN">EN REPARACIÓN</option>
                                <option value="INACTIVO">INACTIVO</option>
                            </select>
                        </label>
                    </div>
                    
                    {/* Fila 3: Responsable y Cliente */}
                    <div style={styles.row}>
                        <label style={styles.label}>
                            Responsable
                            <input name="responsable" value={form.responsable} onChange={handleChange} style={styles.input} />
                        </label>
                        <label style={styles.label}>
                            Cliente
                            <input name="cliente" value={form.cliente} onChange={handleChange} style={styles.input} />
                        </label>
                    </div>

                    {/* Fila 4: Descripción (ocupa toda la fila) */}
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

                    <div style={{ marginTop: 8 }}>
                        <button type="submit" style={styles.buttonPrimary} disabled={isSubmitting}>
                            {isSubmitting ? "Creando artículo..." : "Crear artículo"}
                        </button>
                    </div>
                </form>
            </section>

            {/* SECCIÓN LISTA DE ARTÍCULOS */}
            <section style={styles.card}>
                <h3>Artículos en Inventario ({inventario.length})</h3>
                {isLoading ? (
                    <div>Cargando inventario...</div>
                ) : inventario.length === 0 ? (
                    <div>No hay artículos registrados.</div>
                ) : (
                    <div style={{ overflowX: "auto" }}>
                        <table style={styles.table}>
                            <thead>
                                <tr>
                                    <th style={styles.th}>ID</th>
                                    <th style={styles.th}>Título</th>
                                    <th style={styles.th}>Serie</th>
                                    <th style={styles.th}>Estado</th>
                                    <th style={styles.th}>Responsable</th>
                                    <th style={styles.th}>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {inventario.map((art) => (
                                    <tr key={art.idInventario}>
                                        <td style={styles.td}>{art.idInventario}</td>
                                        <td style={styles.td}>{art.titulo}</td>
                                        <td style={styles.td}>{art.numeroDeSerie}</td>
                                        <td style={styles.td}>{art.estado}</td>
                                        <td style={styles.td}>{art.responsable}</td>
                                        <td style={styles.td}>
                                            <button onClick={() => removeArticulo(art.idInventario)} style={styles.buttonDanger}>Borrar</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </section>
        </div>
    );
}

// Estilos copiados y adaptados de AdminTemplate
const styles = {
    container: { padding: 20, fontFamily: "Segoe UI, Roboto, system-ui, sans-serif", color: "#222" },
    title: { marginBottom: 12 },
    card: { background: "#fff", padding: 16, borderRadius: 6, boxShadow: "0 0 6px rgba(0,0,0,0.06)", marginBottom: 16 },
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
    textarea: { marginTop: 6, padding: "8px 10px", borderRadius: 4, border: "1px solid #ccc", fontSize: 14, width: "100%", boxSizing: "border-box" },
    buttonPrimary: { padding: "8px 12px", background: "#0078d4", color: "#fff", border: "none", borderRadius: 4, cursor: "pointer" },
    buttonDanger: { padding: "6px 10px", background: "#d9534f", color: "#fff", border: "none", borderRadius: 4, cursor: "pointer" },
    table: { width: "100%", borderCollapse: "collapse", marginTop: 8 },
    th: { border: "1px solid #ddd", padding: 8, textAlign: "left", background: "#f4f4f4" },
    td: { border: "1px solid #ddd", padding: 8, verticalAlign: "top" },
    error: { 
        color: "#b00020", 
        marginTop: 8, 
        padding: 8, 
        border: "1px solid #b00020", 
        borderRadius: 4, 
        background: "#ffdddd" 
    },
    errorTextRow: { 
        color: "#b00020", 
        fontSize: 12, 
        flex: "1 1 220px",
        marginTop: 4 
    }
};