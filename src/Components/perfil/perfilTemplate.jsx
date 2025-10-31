import React, { useState, useEffect } from "react";


const DEFAULT_PROFILE = {
    idUsuarios: 1,
    nombre: "Gregorio",
    correo: "gregorio.perez@arjusven.com",
    estadoDeResidencia: "Puebla",
    edad: 35,
    rol: "ADMINISTRADOR",
    contraseña: "contraseña",
};

export default function PerfilTemplate({ initialProfile = DEFAULT_PROFILE, onSave }) {
    const [profile, setProfile] = useState(initialProfile);
    const [editing, setEditing] = useState(false);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        setProfile(initialProfile);
    }, [initialProfile]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile((p) => ({ ...p, [name]: name === "edad" ? Number(value) : value }));
    };

    const validate = () => {
        const err = {};
        if (!profile.nombre || profile.nombre.trim().length < 2) err.nombre = "Nombre inválido.";
        if (!profile.correo || !/^\S+@\S+\.\S+$/.test(profile.correo)) err.correo = "Correo inválido.";
        if (!profile.estadoDeResidencia) err.estadoDeResidencia = "Requerido.";
        if (!Number.isInteger(profile.edad) || profile.edad <= 0) err.edad = "Edad inválida.";
        if (!profile.rol) err.rol = "Requerido.";
        // contraseña puede ser opcionalmente validada
        return err;
    };

    const handleSave = () => {
        const err = validate();
        setErrors(err);
        if (Object.keys(err).length > 0) return;
        setEditing(false);
        if (typeof onSave === "function") onSave(profile);
        else console.log("Perfil guardado:", profile);
    };

    const handleCancel = () => {
        setProfile(initialProfile);
        setErrors({});
        setEditing(false);
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2 style={styles.title}>Perfil de usuario</h2>

                <div style={styles.row}>
                    <label style={styles.label}>ID</label>
                    <div style={styles.value}>{profile.idUsuarios}</div>
                </div>

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

                <div style={styles.row}>
                    <label style={styles.label}>Rol</label>
                    {editing ? (
                        <select name="rol" value={profile.rol} onChange={handleChange} style={styles.input}>
                            <option>ADMINISTRADOR</option>
                            <option>USUARIO</option>
                            <option>INVITADO</option>
                        </select>
                    ) : (
                        <div style={styles.value}>{profile.rol}</div>
                    )}
                    {errors.rol && <div style={styles.error}>{errors.rol}</div>}
                </div>

                <div style={styles.row}>
                    <label style={styles.label}>Contraseña</label>
                    {editing ? (
                        <input
                            name="contraseña"
                            type="password"
                            value={profile.contraseña}
                            onChange={handleChange}
                            style={styles.input}
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