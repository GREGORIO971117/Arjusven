import React, { useState, useEffect } from "react";
import { apiRequest } from '../login/Api'; 

const DEFAULT_PROFILE = {
    idUsuarios: "", // Debería ser String o Number, pero vacío para el estado inicial
    nombre: "",
    correo: "",
    estadoDeResidencia: "",
    edad: 0,
    rol: "USUARIO", // Valor por defecto
    contraseña: "", // Solo para edición, no para mostrar
};

export default function PerfilTemplate() {
    
    // 1. Estados para manejo de datos y UI
    const [profile, setProfile] = useState(DEFAULT_PROFILE); // Almacenará los datos del perfil
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [editing, setEditing] = useState(false);
    const [errors, setErrors] = useState({});

    // 2. Construcción de la URL
    const API_BASE_URL = '/usuarios/';
    const idEditUsuario = localStorage.getItem('idUsuario'); 
    const EditUsuarioURL = `${API_BASE_URL}${idEditUsuario}`;

    // 3. Función de validación (debe estar dentro o importarse)
    const validate = (currentProfile) => {
        const err = {};
        if (!currentProfile.nombre || currentProfile.nombre.trim().length < 2) err.nombre = "Nombre inválido.";
        if (!currentProfile.correo || !/^\S+@\S+\.\S+$/.test(currentProfile.correo)) err.correo = "Correo inválido.";
        if (!currentProfile.estadoDeResidencia) err.estadoDeResidencia = "Requerido.";
        if (!Number.isInteger(currentProfile.edad) || currentProfile.edad <= 0) err.edad = "Edad inválida.";
        if (!currentProfile.rol) err.rol = "Requerido.";
        return err;
    };
    
    const fetchProfile = async () => {
        // Manejo de caso si el ID no existe (no logueado)
        if (!idEditUsuario) {
             setError("ID de usuario no encontrado. Por favor, inicie sesión.");
             setIsLoading(false);
             return;
        }

        setIsLoading(true);
        try {
            // Se asume que apiRequest maneja el token JWT
            const response = await apiRequest(EditUsuarioURL, { method: 'GET' });

            if (!response.ok) {
                throw new Error(`Error ${response.status}: Por favor, inicie sesión de nuevo.`);
            }
            
            const data = await response.json();
            //Se establece el estado con los datos del perfil
            setProfile(data); 

        } catch (err) {
            setError(err.message || "No se pudo conectar al servidor.");
        } finally {
            setIsLoading(false);
        }
    };

    // 5. useEffect: Ejecutar el fetch al cargar el componente
    useEffect(() => {
        fetchProfile();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // 6. Handlers de UI
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile((p) => ({ ...p, [name]: name === "edad" ? Number(value) : value }));
    };

    const handleSave = () => {
        const err = validate(profile);
        setErrors(err);
        if (Object.keys(err).length > 0) return;
        handleProfileUpdate(profile);
    };

    const handleProfileUpdate = async (updatedProfile) => {
    
    // 1. Ocultar los errores previos
    setErrors({});
    setError("");
    
    // 2. Definir la URL de actualización
    const updateURL = `${API_BASE_URL}${idEditUsuario}`; // Ej: /usuarios/5

    try {

        setIsLoading(true);
        const response = await apiRequest(updateURL, {
            method: 'PATCH', 
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedProfile),
        });

        // 4. Manejo de respuesta
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: 'Error desconocido' }));
            throw new Error(errorData.message || `Error ${response.status}: No se pudo actualizar el perfil.`);
        }

  
        const updatedData = await response.json();
        setProfile(updatedData); 
        setEditing(false); 
        
    } catch (err) {
        setError(err.message);
        setEditing(true); 

    } finally {
        setIsLoading(false);
    }
};
    

    const handleCancel = () => {
        // Para cancelar, volvemos a hacer un fetch o usamos una copia guardada del original
        fetchProfile(); 
        setErrors({});
        setEditing(false);
    };
    

    // 8. Renderizado del Template (usando el estado 'profile')
    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2 style={styles.title}>Perfil de usuario</h2>
                
                {/* ID */}
                <div style={styles.row}>
                    <label style={styles.label}>ID</label>
                    <div style={styles.value}>{profile.idUsuarios}</div>
                </div>

                {/* Nombre */}
                <div style={styles.row}>
                    <label style={styles.label}>Nombre</label>
                    {editing ? (
                        <input
                            name="nombre"
                            value={profile.nombre}
                            onChange={handleChange}
                            style={styles.input}
                        />
                    ) : (
                        <div style={styles.value}>{profile.nombre}</div>
                    )}
                    {errors.nombre && <div style={styles.error}>{errors.nombre}</div>}
                </div>
                
                {/* Correo */}
                <div style={styles.row}>
                    <label style={styles.label}>Correo</label>
                    {editing ? (
                        <input
                            name="correo"
                            value={profile.correo}
                            onChange={handleChange}
                            style={styles.input}
                        />
                    ) : (
                        <div style={styles.value}>{profile.correo}</div>
                    )}
                    {errors.correo && <div style={styles.error}>{errors.correo}</div>}
                </div>

                {/* Estado de residencia */}
                <div style={styles.row}>
                    <label style={styles.label}>Estado de residencia</label>
                    {editing ? (
                        <input
                            name="estadoDeResidencia"
                            value={profile.estadoDeResidencia}
                            onChange={handleChange}
                            style={styles.input}
                        />
                    ) : (
                        <div style={styles.value}>{profile.estadoDeResidencia}</div>
                    )}
                    {errors.estadoDeResidencia && <div style={styles.error}>{errors.estadoDeResidencia}</div>}
                </div>

                {/* Edad */}
                <div style={styles.row}>
                    <label style={styles.label}>Edad</label>
                    {editing ? (
                        <input
                            name="edad"
                            type="number"
                            min="0"
                            value={profile.edad}
                            onChange={handleChange}
                            style={styles.input}
                        />
                    ) : (
                        <div style={styles.value}>{profile.edad}</div>
                    )}
                    {errors.edad && <div style={styles.error}>{errors.edad}</div>}
                </div>

                {/* Rol */}
                <div style={styles.row}>
                    <label style={styles.label}>Rol</label>
                        <div style={styles.value}>{profile.rol}</div>
                    {errors.rol && <div style={styles.error}>{errors.rol}</div>}
                </div>

                {/* Contraseña */}
                <div style={styles.row}>
                    <label style={styles.label}>Contraseña</label>
                    {editing ? (
                        <input
                            name="contraseña"
                            type="password"
                            value={''} 
                            onChange={handleChange}
                            style={styles.input}
                            placeholder="Dejar vacío para no cambiar"
                        />
                    ) : (
                        <div style={styles.value}>••••••••</div>
                    )}
                </div>

                <div style={styles.actions}>
                    {editing ? (
                        <>
                            <button onClick={handleSave} style={styles.btnPrimary}>
                                Guardar
                            </button>
                            <button onClick={handleCancel} style={styles.btnSecondary}>
                                Cancelar
                            </button>
                        </>
                    ) : (
                        <button onClick={() => setEditing(true)} style={styles.btnPrimary}>
                            Editar
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
const styles = {

    container: {
        display: "flex",
        justifyContent: "center",
        padding: 20,

    },

    card: {
        width: 520,
        border: "1px solid #e0e0e0",
        borderRadius: 8,
        padding: 18,
        boxShadow: "0 2px 6px rgba(0,0,0,0.06)",
        background: "#fff",
    },

    title: {
        margin: "0 0 12px 0",
        fontSize: 20,
    },

    row: {

        display: "flex",

        flexDirection: "column",

        marginBottom: 12,

    },

    label: {

        fontSize: 13,

        color: "#444",

        marginBottom: 6,

    },

    value: {

        fontSize: 15,

        padding: "8px 10px",

        background: "#f9f9f9",

        borderRadius: 4,

    },

    input: {

        padding: "8px 10px",

        fontSize: 15,

        borderRadius: 4,

        border: "1px solid #ccc",

    },

    actions: {

        marginTop: 14,

        display: "flex",

        gap: 8,

    },

    btnPrimary: {

        background: "#0b5fff",

        color: "#fff",

        border: "none",

        padding: "8px 14px",

        borderRadius: 6,

        cursor: "pointer",

    },

    btnSecondary: {

        background: "#f3f4f6",

        color: "#111827",

        border: "none",

        padding: "8px 12px",

        borderRadius: 6,

        cursor: "pointer",

    },

    error: {

        color: "#b00020",

        marginTop: 6,

        fontSize: 13,

    },

};
