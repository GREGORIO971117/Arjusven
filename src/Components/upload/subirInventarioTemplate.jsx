import React, { useState, useEffect } from 'react';
// Asegúrate de que las rutas sean correctas
import { apiRequest } from '../login/Api'; 
import { styles } from '../admin/adminTemplate';

// Endpoints
const INVENTARIO_API_URL = '/inventario'; // Asumiendo que POST es a /inventario
const USERS_API_URL = '/usuarios'; 

// Estado inicial para resetear y usar en el useState
const initialFormState = {
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
};

export default function SubirInventarioTemplate({datosEstaticos}) {

    // --- ESTADOS ---
    const [inventario, setInventario] = useState([]); 
    const [usuarios, setUsuarios] = useState([]); 
    const [form, setForm] = useState(initialFormState); 

    const [artErrors, setArtErrors] = useState({}); 
    const [error, setError] = useState(""); 
    const [isLoadingUsers, setIsLoadingUsers] = useState(true); // Renombrado para más claridad
    const [isSubmitting, setIsSubmitting] = useState(false); 

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

    // --- HANDLERS Y UTILIDADES ---
    function handleChange(e) {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    }

    function validateForm() {
        const errs = {};
        if (!form.titulo || form.titulo.trim() === "") {
            errs.titulo = "El título es requerido.";
        }
        if (!form.numeroDeSerie || form.numeroDeSerie.trim() === "") {
            errs.numeroDeSerie = "El número de serie es requerido.";
        }
        // Agregando validación para el select de responsable
        if (!form.responsable || form.responsable.trim() === "") {
            errs.responsable = "Debe seleccionar un responsable.";
        }
        
        // Limpiar mensaje de error general si la validación falla
        if (Object.keys(errs).length > 0) setError(""); 

        setArtErrors(errs);
        return Object.keys(errs).length === 0;
    }

    function resetForm() {
        setForm(initialFormState); // Usamos el objeto de estado inicial
        setArtErrors({});
    }

    // --- FUNCIÓN DE ENVÍO PROTEGIDA (CORREGIDA) ---
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
            
            console.log(response);

            if (!response.ok) {
                // Manejo de errores detallado (como ya lo tenías)
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
            setInventario((prev) => [nuevoArticulo, ...prev]);
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
                            Título
                            <input name="titulo" value={form.titulo} onChange={handleChange} style={styles.input} />
                        </label>
                        <label style={styles.label}>
                            Número de serie
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
                        <label style={styles.label}>Equipo
                        <select name="equipo" value={form.equipo} onChange={handleChange} style={styles.input}>
                            <option value="">Seleccione Equipo</option>
                            {datosEstaticos.equipos?.map((opcion) => (
                                <option key={opcion} value={opcion}>{opcion}</option>
                            ))}
                        </select>
                    </label>
                        <label style={styles.label}>Estado
                        <select name="estado" value={form.estado} onChange={handleChange} style={styles.input}>
                            <option value="">Seleccione Estado</option>
                            {datosEstaticos.estado?.map((opcion) => (
                                <option key={opcion} value={opcion}>{opcion}</option>
                            ))}
                        </select>
                    </label>
                    </div>
                    
                    {/* Fila 3: Responsable y Cliente */}
                    <div style={styles.row}>
                        <label style={styles.label}>Responsable
                        <select 
                            name="responsable" 
                            value={form.responsable} 
                            onChange={handleChange} 
                            style={styles.input}
                            disabled={isLoadingUsers} // Desactivar si están cargando
                        >
                            <option value="">{isLoadingUsers ? 'Cargando responsables...' : 'Seleccione Responsable'}</option>
                            {/* Renderizar solo si no hay error y se cargaron */}
                            {!isLoadingUsers && usuarios.map((user) => (
                                <option key={user.idUsuarios} value={user.nombre}> 
                                    {user.nombre} ({user.correo})
                                </option>
                            ))}
                        </select>
                        {artErrors.responsable && <div style={styles.errorTextRow}>{artErrors.responsable}</div>}
                    </label>
                        {/* CAMPO CLIENTE EXISTENTE */}
                        <label style={styles.label}>Cliente
                        <select name="cliente" value={form.cliente} onChange={handleChange} style={styles.input}>
                            <option value="">Seleccione Cliente</option>
                            {datosEstaticos.cliente?.map((opcion) => (
                                <option key={opcion} value={opcion}>{opcion}</option>
                            ))}
                        </select>
                    </label>
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

                    <div style={{ marginTop: 8 }}>
                        <button type="submit" style={styles.buttonPrimary} disabled={isSubmitting}>
                            {isSubmitting ? "Creando artículo..." : "Crear artículo"}
                        </button>
                    </div>
                </form>
    

        </div>
    );
}

