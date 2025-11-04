import React, { useState, useEffect } from 'react';
import {apiRequest} from '../login/Api'; // Asegúrate de que la ruta sea correcta
import UsuariosList from './usuariosList'; // Asegúrate de que la ruta sea correcta
import UsuariosEdit from './usuariosedit';

const API_BASE_URL = '/usuarios'; // Endpoint relativo. apiRequest añade la URL base.

// Definición de las "páginas" o vistas para evitar errores tipográficos
const VIEWS = {
    FORM: 'agregarUsuario',
    LIST: 'listaUsuarios',
    EDIT: 'editarUsuario',
};

export default function AdminTemplate() {
    
    const USERS_PER_PAGE = 10;
    
    const [currentView, setCurrentView] = useState(VIEWS.FORM); 
    const [currentPage, setCurrentPage] = useState(1);
    const [editingUser, setEditingUser] = useState(null);
    const [users, setUsers] = useState([]);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(true); 
    const [isSubmitting, setIsSubmitting] = useState(false); 
    
    const [form, setForm] = useState({
        nombre: "",
        correo: "",
        estadoDeResidencia: "",
        edad: "",
        rol: "USUARIO",
        "contraseña": "",
    });

    // 1. FUNCIÓN PARA OBTENER USUARIOS (PROTEGIDO - GET)
    const fetchUsers = async () => {
        setIsLoading(true);
        setError("");
        try {
            // 🔑 JWT: Usa apiRequest para enviar el token
            const response = await apiRequest(API_BASE_URL, { method: 'GET' }); 
            
            if (!response.ok) {
                // Manejo de error de JWT (401/403) o servidor
                throw new Error(`Error al cargar usuarios: ${response.statusText}. Por favor, inicie sesión de nuevo.`);
            }
            
            const data = await response.json();
            setUsers(Array.isArray(data) ? data : []); 
        } catch (err) {
            setError(err.message || "No se pudo conectar al servidor.");
            setUsers([]);
        } finally {
            setIsLoading(false);
        }
    };

    // Carga inicial de usuarios al montar el componente
    useEffect(() => {
        fetchUsers();
    }, []); 
    
    // Manejo de cambios en el formulario
    function handleChange(e) {
        const { name, value } = e.target;
        setForm((f) => ({ 
            ...f, 
            [name]: name === "edad" ? value.replace(/\D/g, "") : value 
        }));
    }
    const handleEdit = (user) => {
        setEditingUser(user);
        setCurrentView(VIEWS.EDIT);
    };

    const handleCancelEdit = () => {
        setEditingUser(null);
        setCurrentView(VIEWS.LIST);
        fetchUsers();
    };

    // Validación simple del formulario
    function validateForm() {
        if (!form.nombre.trim()) return "El nombre es requerido.";
        if (!form.correo.trim()) return "El correo es requerido.";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.correo)) return "Correo inválido.";
        if (!form.estadoDeResidencia.trim()) return "El estado de residencia es requerido.";
        if (!form.edad || Number(form.edad) <= 0) return "Edad inválida.";
        if (!form.rol.trim()) return "El rol es requerido.";
        if (!form["contraseña"]) return "La contraseña es requerida.";
        return "";
    }


    const totalPages = Math.ceil(users.length / USERS_PER_PAGE);
    const startIndex = (currentPage - 1) * USERS_PER_PAGE;
    const endIndex = startIndex + USERS_PER_PAGE;
    const currentUsers = users.slice(startIndex, endIndex);

    // 4. Funciones de navegación
    const handleNextPage = () => {
        setCurrentPage(prev => Math.min(prev + 1, totalPages));
    };

    const handlePrevPage = () => {
        setCurrentPage(prev => Math.max(prev - 1, 1));
    };

    // 2. AÑADIR USUARIO (PROTEGIDO - POST)
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
            const userData = { ...form, edad: Number(form.edad) };

            // 🔑 JWT: Usa apiRequest para POST (adjunta token)
            const response = await apiRequest(API_BASE_URL, {
                method: 'POST',
                body: JSON.stringify(userData),
            });
            
            if (!response.ok) {
                 let errorMsg = "Error al crear el usuario. ";
                 try {
                     const errorData = await response.json();
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
            setUsers((prev) => [newUser, ...prev]);
            setForm({ nombre: "", correo: "", estadoDeResidencia: "", edad: "", rol: "USUARIO", "contraseña": "" });
            
        } catch (err) {
            setError(err.message || "Fallo la conexión con el servidor.");
        } finally {
            setIsSubmitting(false);
        }
    }

    // 3. ELIMINAR USUARIO (PROTEGIDO - DELETE)
    async function removeUser(id) {
        if (!window.confirm("¿Borrar este usuario?")) return;
        
        try {
            // 🔑 JWT: Usa apiRequest para DELETE (adjunta token)
            const response = await apiRequest(`${API_BASE_URL}/${id}`, {
                method: 'DELETE',
            });
            
            if (!response.ok) {
                throw new Error(`Error al borrar: ${response.statusText}`);
            }

            // Éxito: Filtrar el usuario de la lista local
            setUsers((prev) => prev.filter((u) => u.idUsuarios !== id));
            
        } catch (err) {
            setError(err.message || "Fallo la conexión con el servidor.");
        }
    }

    // --- LÓGICA DE RENDERIZADO (MOSTRAR VISTA) ---

    const renderContent = () => {
        if (currentView === VIEWS.LIST) {
            return (
                <UsuariosList
                    users={currentUsers}
                    isLoading={isLoading}
                    removeUser={removeUser} 
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onNextPage={handleNextPage}
                    onPrevPage={handlePrevPage}
                    onEdit={handleEdit}
                />
            );
        }

        if (currentView === VIEWS.EDIT && editingUser) {
            return (
                <UsuariosEdit
                    user={editingUser}
                    onCancel={handleCancelEdit}
                    onSave={handleCancelEdit}
                />
            );
        }

        // Muestra el formulario si la vista es FORM
        if (currentView === VIEWS.FORM) {
            return (
                    <form onSubmit={addUser} style={styles.form}>
                        
                        <div style={styles.row}>
                            <label style={styles.label}>Nombre
                                <input name="nombre" value={form.nombre} onChange={handleChange} style={styles.input} />
                            </label>
                            <label style={styles.label}>Correo
                                <input name="correo" value={form.correo} onChange={handleChange} style={styles.input} />
                            </label>
                        </div>
                        <div style={styles.row}>
                            <label style={styles.label}>Estado de residencia
                                <input name="estadoDeResidencia" value={form.estadoDeResidencia} onChange={handleChange} style={styles.input} />
                            </label>
                            <label style={styles.label}>Edad
                                <input name="edad" value={form.edad} onChange={handleChange} style={styles.input} inputMode="numeric" />
                            </label>
                        </div>
                        <div style={styles.row}>
                            <label style={styles.label}>Rol
                                <select name="rol" value={form.rol} onChange={handleChange} style={styles.input}>
                                    <option value="ADMINISTRADOR">ADMINISTRADOR</option>
                                    <option value="TECNICO">TECNICO</option>
                                    <option value="SUPERVISOR">SUPERVISOR</option>
                                    <option value="USUARIO">USUARIO</option>
                                </select>
                            </label>
                            <label style={styles.label}>Contraseña
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
             
            );
        }
        
        return null; 
    };


    return (
        <div style={styles.container}>

            <div style={styles.cardNav}> 
                <button
                    style={{ 
                        ...styles.navButton, 
                        ...(currentView === VIEWS.FORM ? styles.activeNavButton : {}) 
                    }}
                    onClick={() => setCurrentView(VIEWS.FORM)}
                >
                    Agregar Usuario
                </button>
                <button
                    style={{ 
                        ...styles.navButton, 
                        ...(currentView === VIEWS.LIST ? styles.activeNavButton : {}) 
                    }}
                    onClick={() => setCurrentView(VIEWS.LIST)}
                >
                    Lista de Usuarios
                </button>
            </div>

            <div style={{ marginTop: 20 }}>
                {renderContent()}
            </div>
            
        </div>
    );
}

// --- ESTILOS ---
export const styles = {
    container: { padding: 20, fontFamily: "Segoe UI, Roboto, system-ui, sans-serif", color: "#222" },
    title: { marginBottom: 12 },
    // Estilos para la tarjeta de contenido
    card: { background: "#fff", padding: 16, borderRadius: 6, boxShadow: "0 0 6px rgba(0,0,0,0.06)", marginBottom: 16 },
    // Estilos para la navegación de pestañas
    cardNav: { background: "#fff", padding: 16, borderRadius: 6, boxShadow: "0 0 6px rgba(0,0,0,0.06)", marginBottom: 16, display: 'flex', gap: 10 },
    form: {},
    row: { display: "flex", gap: 12, marginTop: 8, flexWrap: "wrap" },
    label: { display: "flex", flexDirection: "column", flex: "1 1 20px", fontSize: 14 },
    input: { marginTop: 6, padding: "4px 8px", borderRadius: 4, border: "1px solid #ccc", fontSize: 14 },
    buttonPrimary: { padding: "8px 12px", background: "#0078d4", color: "#fff", border: "none", borderRadius: 4, cursor: "pointer" },
    buttonDanger: { padding: "6px 10px", background: "#d9534f", color: "#fff", border: "none", borderRadius: 4, cursor: "pointer" },
    navButton: { 
        padding: "10px 15px", 
        border: "1px solid #ccc", 
        borderRadius: 4, 
        cursor: "pointer", 
        background: "#f0f0f0"
    },
    activeNavButton: {
        background: "#0078d4",
        color: "#fff",
        borderColor: "#0078d4"
    },
    table: { width: "100%", borderCollapse: "collapse", marginTop: 8 },
    error: { color: "#b00020", marginTop: 8 },
    th: {
        textAlign: 'left',
        padding: '12px',
        borderBottom: '2px solid #ddd', // Borde inferior más grueso
        backgroundColor: '#f8f8f8', // Fondo ligeramente gris para encabezados
        fontWeight: '600'
    },
    td: {
        padding: '10px 12px',
        borderBottom: '1px solid #eee', // Borde inferior delgado para filas
    }
};