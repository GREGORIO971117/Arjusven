import React, { useState, useEffect } from 'react';
import { styles } from './adminTemplate'; // Importamos los estilos compartidos

const API_BASE_URL = 'http://localhost:8080/api/usuarios';

export default function UsuariosEdit({ user, onSave, onCancel }) {

    // Inicializa el estado del formulario con los datos del usuario recibido
    const [formData, setFormData] = useState({
        nombre: user?.nombre ?? "",
        correo: user?.correo ?? "",
        estadoDeResidencia: user?.estadoDeResidencia ?? "",
        edad: user?.edad ?? "",
        rol: user?.rol ?? "USUARIO",
        contraseña: "", 
    });
    
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (user) {
            setFormData({
                nombre: user.nombre ?? "",
                correo: user.correo ?? "",
                estadoDeResidencia: user.estadoDeResidencia ?? "",
                edad: user.edad ?? "",
                rol: user.rol ?? "USUARIO",
                contraseña: "", 
            });
        }
    }, [user]);

    // Manejo de cambios en el formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((f) => ({ 
            ...f, 
            [name]: name === "edad" ? value.replace(/\D/g, "") : value 
        }));
    };

    // Validación del formulario
    const validateForm = () => {
        if (!formData.nombre.trim()) return "El nombre es requerido.";
        if (!formData.correo.trim()) return "El correo es requerido.";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.correo)) return "Correo inválido.";
        if (!formData.estadoDeResidencia.trim()) return "El estado de residencia es requerido.";
        if (!formData.edad || Number(formData.edad) <= 0) return "Edad inválida.";
        if (!formData.rol.trim()) return "El rol es requerido.";
        // No forzamos la contraseña si no se está modificando.
        
        return "";
    };

    // Manejo del envío del formulario (PUT)
    const handleSubmit = async (e) => {
        e.preventDefault();
        const err = validateForm();
        if (err) {
            setError(err);
            return;
        }

        setIsSubmitting(true);
        setError("");

        try {
            // Prepara los datos a enviar
            const dataToUpdate = { 
                ...formData, 
                idUsuarios: user.idUsuarios, // Necesario para la API
                edad: Number(formData.edad) 
            };
            
            // Si el campo de contraseña está vacío, NO lo enviamos al backend
            if (!formData.contraseña) {
                delete dataToUpdate.contraseña;
            }

            const response = await fetch(`${API_BASE_URL}/${user.idUsuarios}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dataToUpdate),
            });
            
            if (!response.ok) {
                 let errorMsg = `Error al actualizar el usuario. Estado: ${response.status}`;
                 try {
                     const errorData = await response.json();
                     errorMsg = errorData.message || errorData.error || errorMsg;
                 } catch {}
                 throw new Error(errorMsg);
            }

            // Éxito: Llamar a la función onSave (que en AdminTemplate hará el cambio de vista y recargará la lista)
            onSave(); 
            
        } catch (err) {
            setError(err.message || "Fallo la conexión con el servidor.");
        } finally {
            setIsSubmitting(false);
        }
    };


    return (
        <section style={styles.card}>
            <h3>Editar usuario: {user?.nombre}</h3>
            
            <form onSubmit={handleSubmit} style={styles.form}>
                
                <div style={{...styles.row, marginBottom: '16px'}}>
                    <p style={{ margin: 0, padding: 0, color: '#666', fontSize: 14 }}>
                        ID de Usuario: {user?.idUsuarios}
                    </p>
                </div>

                <div style={styles.row}>
                    <label style={styles.label}>Nombre
                        <input name="nombre" value={formData.nombre} onChange={handleChange} style={styles.input} />
                    </label>
                    <label style={styles.label}>Correo
                        <input name="correo" value={formData.correo} onChange={handleChange} style={styles.input} type="email" />
                    </label>
                </div>
                
                <div style={styles.row}>
                    <label style={styles.label}>Estado de residencia
                        <input name="estadoDeResidencia" value={formData.estadoDeResidencia} onChange={handleChange} style={styles.input}  />
                    </label>
                    <label style={styles.label}>Edad
                        <input name="edad" value={formData.edad} onChange={handleChange} style={styles.input} inputMode="numeric"  />
                    </label>
                </div>
                
                <div style={styles.row}>
                    <label style={styles.label}>Rol
                        <select name="rol" value={formData.rol} onChange={handleChange} style={styles.input} >
                            <option value="ADMINISTRADOR">ADMINISTRADOR</option>
                            <option value="USUARIO">USUARIO</option>
                        </select>
                    </label>
                    <label style={styles.label}>Contraseña (Dejar vacío para no cambiar)
                        <input 
                            name="contraseña" 
                            type="password" 
                            value={formData.contraseña} 
                            onChange={handleChange} 
                            style={styles.input} 
                            placeholder="Nueva contraseña" 
                        />
                    </label>
                </div> 
                
                {error && <div style={styles.error}>{error}</div>}

                <div style={{ marginTop: 20, display: 'flex', gap: 10 }}>
                    <button 
                        type="submit" 
                        style={styles.buttonPrimary} 
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Guardando..." : "Guardar cambios"}
                    </button>
                    
                    <button 
                        type="button" 
                        onClick={onCancel} 
                        style={styles.navButton}
                        disabled={isSubmitting}
                    >
                        Cancelar
                    </button>
                </div>
            </form>
        </section>
    );
}