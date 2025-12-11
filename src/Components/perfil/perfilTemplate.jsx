import React, { useState, useEffect } from "react";
import { apiRequest } from '../login/Api'; 
import datosEstaticos from '../../assets/datos.json';
import '../Inventario/InventarioList.css'; 

const DEFAULT_PROFILE = {
    idUsuarios: "",
    nombre: "",
    correo: "",
    estadoDeResidencia: "",
    edad: 0,
    rol: "USUARIO", 
    contraseña: "",
};

export default function PerfilTemplate({ showModal }) {
    
    const [profile, setProfile] = useState(DEFAULT_PROFILE); 
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [editing, setEditing] = useState(false);
    const [errors, setErrors] = useState({});

    const API_BASE_URL = '/usuarios/';
    const idEditUsuario = localStorage.getItem('idUsuario'); 
    const EditUsuarioURL = `${API_BASE_URL}${idEditUsuario}`;

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
        if (!idEditUsuario) {
             setError("ID de usuario no encontrado. Por favor, inicie sesión.");
             setIsLoading(false);
             return;
        }

        setIsLoading(true);
        try {
            const response = await apiRequest(EditUsuarioURL, { method: 'GET' });

            if (!response.ok) {
                throw new Error(`Error ${response.status}: Por favor, inicie sesión de nuevo.`);
            }
            
            const data = await response.json();
            setProfile(data); 

        } catch (err) {
            setError(err.message || "No se pudo conectar al servidor.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

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
        setErrors({});
        setError("");
        
        const updateURL = `${API_BASE_URL}${idEditUsuario}`; 

        try {
            setIsLoading(true);
            const response = await apiRequest(updateURL, {
                method: 'PATCH', 
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedProfile),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ message: 'Error desconocido' }));
                throw new Error(errorData.message || `Error ${response.status}: No se pudo actualizar el perfil.`);
            }
    
            const updatedData = await response.json();
            setProfile(updatedData); 
            setEditing(false); 
            
            if(showModal) {
                showModal({
                    title: "Perfil Actualizado",
                    message: "Tus datos han sido guardados exitosamente.",
                    type: "success"
                });
            }
            
        } catch (err) {
            setError(err.message);
            setEditing(true); 
            if(showModal) {
                showModal({
                    title: "Error al Guardar",
                    message: err.message,
                    type: "error"
                });
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleCancel = () => {
        fetchProfile(); 
        setErrors({});
        setEditing(false);
    };
    
    // Componente auxiliar para visualizar datos (Read-Only)
    const InfoItem = ({ label, value }) => (
        <div className="modern-info-item">
            <span className="info-label">{label}</span>
            <span className="info-value">{value}</span>
        </div>
    );

    // Componente auxiliar para inputs (Editable)
    const InputItem = ({ label, name, type="text", value, options, placeholder, min }) => (
        <div className="modern-info-item">
            <label className="info-label">{label}</label>
            {options ? (
                <select 
                    name={name} 
                    value={value} 
                    onChange={handleChange} 
                    className="form-input modern-input"
                >
                    <option value="">Seleccione...</option>
                    {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
            ) : (
                <input
                    name={name}
                    type={type}
                    value={value}
                    onChange={handleChange}
                    className="form-input modern-input"
                    placeholder={placeholder}
                    min={min}
                />
            )}
            {errors[name] && <span className="error-message-text">{errors[name]}</span>}
        </div>
    );

    if (isLoading && !profile.idUsuarios) return <div className="loading-state">Cargando perfil...</div>;

    return (
        <div className="profile-page-wrapper">
            <div className="modern-service-container profile-card">
                
                {/* Header del Perfil */}
                <header className="service-header">
                    <div className="header-titles">
                        <h1 className="service-title">Mi Perfil</h1>
                        <div className="service-meta">
                            <span className="meta-tag">Rol: <strong>{profile.rol}</strong></span>
                            <span className="meta-tag">ID: <strong>{profile.idUsuarios}</strong></span>
                        </div>
                    </div>
                    
                    <div className="header-actions">
                        {!editing ? (
                            <button onClick={() => setEditing(true)} className="btn-modern btn-primary">
                                ✎ Editar Perfil
                            </button>
                        ) : (
                            <>
                                <button onClick={handleCancel} className="btn-modern btn-secondary">
                                    Cancelar
                                </button>
                                <button onClick={handleSave} className="btn-modern btn-primary" disabled={isLoading}>
                                    {isLoading ? 'Guardando...' : 'Guardar Cambios'}
                                </button>
                            </>
                        )}
                    </div>
                </header>

                {/* Contenido del Perfil */}
                <div className="service-content-area">
                    <div className="info-grid-wrapper animate-fade-in">
                        
                        {/* Mensaje de Error General */}
                        {error && (
                            <div className="alert-box error">
                                {error}
                            </div>
                        )}

                        <section className="data-section">
                            <h3 className="subsection-title">Información Personal</h3>
                            <div className="modern-grid-2">
                                {editing ? (
                                    <>
                                        <InputItem label="Nombre Completo" name="nombre" value={profile.nombre} />
                                        <InputItem label="Correo Electrónico" name="correo" value={profile.correo} />
                                        <InputItem label="Edad" name="edad" type="number" value={profile.edad} min="0" />
                                        <InputItem 
                                            label="Estado de Residencia" 
                                            name="estadoDeResidencia" 
                                            value={profile.estadoDeResidencia} 
                                            options={datosEstaticos.estadosMx}
                                        />
                                    </>
                                ) : (
                                    <>
                                        <InfoItem label="Nombre Completo" value={profile.nombre} />
                                        <InfoItem label="Correo Electrónico" value={profile.correo} />
                                        <InfoItem label="Edad" value={`${profile.edad} años`} />
                                        <InfoItem label="Estado de Residencia" value={profile.estadoDeResidencia} />
                                    </>
                                )}
                            </div>
                        </section>

                        <div className="divider"></div>

                        <section className="data-section">
                            <div className="modern-grid-2">
                                {editing ? (
                                    <div className="modern-info-item span-2">
                                        <label className="info-label">Nueva Contraseña</label>
                                        <input
                                            name="contraseña"
                                            type="password"
                                            value={''}
                                            onChange={handleChange}
                                            className="form-input modern-input"
                                            placeholder="Dejar en blanco para mantener la actual"
                                        />
                                        <small style={{color:'#64748b', marginTop:'4px'}}>
                                            Solo llena este campo si deseas cambiar tu contraseña.
                                        </small>
                                    </div>
                                ) : (null) 
                                }
                            </div>
                        </section>

                    </div>
                </div>
            </div>
        </div>
    );
}