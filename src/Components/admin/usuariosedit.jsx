import React, { useState, useEffect } from 'react';
import { styles } from './adminTemplate'; // Importamos los estilos compartidos
import { apiRequest } from '../login/Api';
import datos from '../../assets/datos.json';

const API_BASE_URL = '/usuarios';

// 1. Recibimos 'validateForm' como prop
export default function UsuariosEdit({ user, onSave, onCancel, validateForm}) {

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


    // Manejo del envío del formulario (PUT)
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const err = validateForm(formData, false); 
        if (err) {
            setError(err);
            return;
        }

        setIsSubmitting(true);
        setError("");

        try {
            const dataToUpdate = { 
                ...formData, 
                idUsuarios: user.idUsuarios, 
                edad: Number(formData.edad) 
            };
            
            if (!formData.contraseña) {
                delete dataToUpdate.contraseña;
            }

            const response = await apiRequest(`${API_BASE_URL}/${user.idUsuarios}`, {
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

            onSave(); 
            
        } catch (err) {
            setError(err.message || "Fallo la conexión con el servidor.");
        } finally {
            setIsSubmitting(false);
        }
    };


    return (
        <section style={styles.card}>
            
            <form onSubmit={handleSubmit} style={styles.form}>


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
                        <input name="estadoDeResidencia" value={formData.estadoDeResidencia} onChange={handleChange} style={styles.input} />
                    </label>
                    <label style={styles.label}>Edad
                        <input name="edad" value={formData.edad} onChange={handleChange} style={styles.input} inputMode="numeric" />
                    </label>
                </div>
                
                <div style={styles.row}>
                    <label style={styles.label}>Rol
                        <select name="rol" value={formData.rol} onChange={handleChange} style={styles.input} >
                           <option value="">Seleccione...</option>
                            {datos.roles.map(opt => <option key={opt} value={opt}>{opt}</option>)}
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