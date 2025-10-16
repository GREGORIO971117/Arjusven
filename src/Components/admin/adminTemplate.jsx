import React, { useState, useEffect } from 'react';
import datosEstaticos from '../../assets/datos.json';

const API_BASE_URL = 'http://localhost:8080/api/usuarios'; // Endpoint base para Usuarios

export default function AdminTemplate() {
    
    const [users, setUsers] = useState([]);
    const [form, setForm] = useState({
        nombre: "",
        correo: "",
        estadoDeResidencia: "",
        edad: "",
        rol: "USUARIO",
        "contraseña": "",
    });
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(true); // Nuevo: Estado de carga
    const [isSubmitting, setIsSubmitting] = useState(false); // Nuevo: Estado de envío

    // Función de Fetch Genérica (Puede estar en un archivo de utilidad)
    const fetchUsers = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(API_BASE_URL);
            if (!response.ok) throw new Error("Error al cargar usuarios.");
            
            const data = await response.json();
            // Asegúrate de que el backend devuelve una lista (array)
            setUsers(Array.isArray(data) ? data : []); 
        } catch (err) {
            setError(err.message || "No se pudo conectar al servidor.");
            setUsers([]);
        } finally {
            setIsLoading(false);
        }
    };

    // 1. CARGA INICIAL (REEMPLAZA useEffect de localStorage)
    useEffect(() => {
        fetchUsers();
    }, []); 
    
    // El useEffect de guardar en localStorage ya no es necesario

    function handleChange(e) {
        const { name, value } = e.target;
        setForm((f) => ({ 
            ...f, 
            [name]: name === "edad" ? value.replace(/\D/g, "") : value 
        }));
    }

    function validateForm() {
        
        if (!form.nombre.trim()) return "El nombre es requerido.";
        if (!form.correo.trim()) return "El correo es requerido.";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.correo)) return "Correo inválido.";
        if (!form.estadoDeResidencia.trim()) return "El estado de residencia es requerido.";
        if (!form.edad || Number(form.edad) <= 0) return "Edad inválida.";
        if (!form.rol.trim()) return "El rol es requerido.";
        if (!form["contraseña"]) return "La contraseña es requerida.";
        
        // **NOTA:** La unicidad del correo ahora la maneja la base de datos (UNIQUE constraint).
        // Si el backend devuelve un error 400/500 por duplicado, lo manejaremos en la llamada POST.
        
        return "";
    }

    // 2. AÑADIR USUARIO (REEMPLAZA addUser con POST)
    async function addUser(e) {
        e.preventDefault();
        const err = validateForm();
        if (err) {
            setError(err);
            return;
        }

        setIsSubmitting(true);
        setError("");

        try {
            // Preparar los datos (convertir edad a número)
            const userData = { ...form, edad: Number(form.edad) };

            const response = await fetch(API_BASE_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData),
            });
            
            // Manejo de errores del backend (4xx o 5xx)
            if (!response.ok) {
                 let errorMsg = "Error al crear el usuario. ";
                 try {
                     const errorData = await response.json();
                     // Si el backend devuelve un mensaje de error específico (ej. UNIQUE constraint)
                     if (response.status === 400 || response.status === 500) {
                          errorMsg += errorData.message || errorData.error;
                     } else {
                          errorMsg += response.statusText;
                     }
                 } catch {
                     errorMsg += "Respuesta no es JSON.";
                 }
                 throw new Error(errorMsg);
            }

            const newUser = await response.json();
            
            // Éxito: Actualizar la lista local de usuarios con el nuevo usuario devuelto por el backend
            setUsers((prev) => [newUser, ...prev]);
            
            // Limpiar formulario y error
            setForm({ nombre: "", correo: "", estadoDeResidencia: "", edad: "", rol: "USUARIO", "contraseña": "" });
            
        } catch (err) {
            setError(err.message || "Fallo la conexión con el servidor.");
        } finally {
            setIsSubmitting(false);
        }
    }

    // 3. ELIMINAR USUARIO (REEMPLAZA removeUser con DELETE)
    async function removeUser(id) {
        if (!window.confirm("¿Borrar este usuario? Esta acción no se puede deshacer.")) return;
        
        try {
            const response = await fetch(`${API_BASE_URL}/${id}`, {
                method: 'DELETE',
            });
            
            if (!response.ok) {
                // DELETE generalmente devuelve 204 No Content si es exitoso
                throw new Error(`Error al borrar: ${response.statusText}`);
            }

            // Éxito: Filtrar el usuario de la lista local
            setUsers((prev) => prev.filter((u) => u.idUsuarios !== id));
            
        } catch (err) {
            setError(err.message || "Fallo la conexión con el servidor.");
        }
        console.log(`El usuario con ${id} fue eliminado`)
    }

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Administración de usuarios</h2>

            {/* SECCIÓN AGREGAR USUARIO */}
            <section style={styles.card}>
                <h3>Agregar usuario</h3>
                <form onSubmit={addUser} style={styles.form}>
                    {/* ... (Tus inputs de formulario se mantienen igual) ... */}
                    <div style={styles.row}>
            <label style={styles.label}>
              Nombre
              <input name="nombre" value={form.nombre} onChange={handleChange} style={styles.input} />
            </label>

            <label style={styles.label}>
              Correo
              <input name="correo" value={form.correo} onChange={handleChange} style={styles.input} />
            </label>
          </div>

          <div style={styles.row}>
            <label style={styles.label}>
              Estado de residencia
              <input name="estadoDeResidencia" value={form.estadoDeResidencia} onChange={handleChange} style={styles.input} />

            </label>
            <label style={styles.label}>
              Edad
              <input name="edad" value={form.edad} onChange={handleChange} style={styles.input} inputMode="numeric" />
            </label>

          </div>



          <div style={styles.row}>

            <label style={styles.label}>

              Rol

              <select name="rol" value={form.rol} onChange={handleChange} style={styles.input}>

                <option value="ADMINISTRADOR">ADMINISTRADOR</option>

                <option value="USUARIO">USUARIO</option>

              </select>

            </label>

            <label style={styles.label}>

              Contraseña

              <input name="contraseña" type="password" value={form["contraseña"]} onChange={handleChange} style={styles.input} />

            </label>

          </div>


                    
                    {error && <div style={styles.error}>{error}</div>}

                    <div style={{ marginTop: 8 }}>
                        <button type="submit" style={styles.buttonPrimary} disabled={isSubmitting}>
                            {isSubmitting ? "Agregando..." : "Agregar usuario"}
                        </button>
                    </div>
                </form>
            </section>

            {/* SECCIÓN LISTA DE USUARIOS */}
            <section style={styles.card}>
                <h3>Todos los usuarios ({users.length})</h3>
                {isLoading ? (
                    <div>Cargando usuarios...</div>
                ) : users.length === 0 ? (
                    <div>No hay usuarios registrados.</div>
                ) : (
                    <div style={{ overflowX: "auto" }}>
                        <table style={styles.table}>
                            <thead>
                                {/* ... (Tus encabezados de tabla) ... */}
                            </thead>
                            <tbody>
                                {users.map((u) => (
                                    // Usar el ID real del backend como key, no el índice local
                                    <tr key={u.idUsuarios}> 
                                        <td>{u.nombre}</td>
                                        {/* ... (Resto de las celdas) ... */}
                                        <td>
                                            {/* **IMPORTANTE:** Pasar el idUsuarios del backend a removeUser */}
                                            <button onClick={() => removeUser(u.idUsuarios)} style={styles.buttonDanger}>Borrar</button>
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

const styles = {
    container: { padding: 20, fontFamily: "Segoe UI, Roboto, system-ui, sans-serif", color: "#222" },
    title: { marginBottom: 12 },
    card: { background: "#fff", padding: 16, borderRadius: 6, boxShadow: "0 0 6px rgba(0,0,0,0.06)", marginBottom: 16 },
    form: {},
    row: { display: "flex", gap: 12, marginTop: 8, flexWrap: "wrap" },
    label: { display: "flex", flexDirection: "column", flex: "1 1 220px", fontSize: 14 },
    input: { marginTop: 6, padding: "8px 10px", borderRadius: 4, border: "1px solid #ccc", fontSize: 14 },
    buttonPrimary: { padding: "8px 12px", background: "#0078d4", color: "#fff", border: "none", borderRadius: 4, cursor: "pointer" },
    buttonDanger: { padding: "6px 10px", background: "#d9534f", color: "#fff", border: "none", borderRadius: 4, cursor: "pointer" },
    table: { width: "100%", borderCollapse: "collapse", marginTop: 8 },
    error: { color: "#b00020", marginTop: 8 },
};