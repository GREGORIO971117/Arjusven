// subirUsuarioTemplate.jsx

import React, { useState } from 'react';
import { apiRequest } from '../login/Api'; 
import { styles } from '../admin/adminTemplate';

const API_BASE_URL = '/usuarios';

export const validateForm = (formData, isPasswordRequired = true) => {

    if (!formData.nombre.trim()) return "El nombre es requerido.";
    if (!formData.correo.trim()) return "El correo es requerido.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.correo)) return "Correo inválido.";
    if (!formData.estadoDeResidencia.trim()) return "El estado de residencia es requerido.";
    const edadNum = Number(formData.edad);
    if (isNaN(edadNum) || edadNum <= 0) return "Edad inválida.";
    if (!formData.rol.trim()) return "El rol es requerido.";
        
    const password = formData["contraseña"]; // Accedemos con la clave string
    if (isPasswordRequired && !password) return "La contraseña es requerida.";
        
    if (password) {
        if (password.length < 8) return "La contraseña debe tener al menos 8 caracteres.";
        if (!/[A-Z]/.test(password)) return "La contraseña debe contener al menos 1 letra mayúscula.";
        if (!/[a-z]/.test(password)) return "La contraseña debe contener al menos 1 letra minúscula.";
        if (!/[\W_]/.test(password)) return "La contraseña debe contener al menos 1 carácter especial (ej: !@#$%^&*).";
    }

    return "";
};

export default function SubirUsuarioTemplate({ onUserAdded }) {
    
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false); 
    const [form, setForm] = useState({
        nombre: "",
        correo: "",
        estadoDeResidencia: "",
        edad: "",
        rol: "USUARIO",
        "contraseña": "", 
    });

    function handleChange(e) {
        const { name, value } = e.target;
        
        setForm((f) => ({ 
            ...f, 
            [name]: name === "edad" ? value.replace(/\D/g, "") : value 
        }));
    }
    
    async function addUser(e) {
        e.preventDefault();
        
        const err = validateForm(form, true); 
        if (err) {
            setError(err);
            return;
        }

        setIsSubmitting(true);
        setError("");

        try {
            const userData = { ...form, edad: Number(form.edad) };
            
            const response = await apiRequest(API_BASE_URL, {
                method: 'POST',
                body: JSON.stringify(userData),
            });
            
            if (!response.ok) {
                throw new Error("Error al crear el usuario. El correo podría estar ya en uso o el servidor falló.");
            }

            const newUser = await response.json();
            
            // ⭐️ LLAMADA AL CALLBACK: Notificamos al componente padre (AdminTemplate)
            if(onUserAdded) {
                onUserAdded(newUser);
            }
            
            // Limpiar el formulario
            setForm({ nombre: "", correo: "", estadoDeResidencia: "", edad: "", rol: "USUARIO", "contraseña": "" });
            
        } catch (err) {
            setError(err.message || "Fallo la conexión con el servidor.");
        } finally {
            setIsSubmitting(false);
        }
    }
    
    return (
        <div style={styles.container}>

            <form onSubmit={addUser} style={styles.form}>
                
                <div style={styles.row}>
                    <label style={styles.label}>Nombre
                        <input name="nombre" value={form.nombre} onChange={handleChange} style={styles.input} required />
                    </label>
                    <label style={styles.label}>Correo
                        <input name="correo" type="email" value={form.correo} onChange={handleChange} style={styles.input} required />
                    </label>
                </div>
                <div style={styles.row}>
                    <label style={styles.label}>Estado de residencia
                        <input name="estadoDeResidencia" value={form.estadoDeResidencia} onChange={handleChange} style={styles.input} required />
                    </label>
                    <label style={styles.label}>Edad
                        <input 
                            name="edad" 
                            value={form.edad} 
                            onChange={handleChange} 
                            style={styles.input} 
                            type="number"
                            inputMode="numeric" 
                            min="1"
                            required 
                        />
                    </label>
                </div>
                <div style={styles.row}>
                    <label style={styles.label}>Rol
                        <select name="rol" value={form.rol} onChange={handleChange} style={styles.input} required>
                            <option value="ADMINISTRADOR">ADMINISTRADOR</option>
                            <option value="TECNICO">TECNICO</option>
                            <option value="SUPERVISOR">SUPERVISOR</option>
                            <option value="USUARIO">USUARIO</option>
                        </select>
                    </label>
                    <label style={styles.label}>Contraseña
                        <input name="contraseña" type="password" value={form["contraseña"]} onChange={handleChange} style={styles.input} required />
                    </label>
                </div> 
                
                {error && <div style={styles.error}>{error}</div>}

                <div style={{ marginTop: 16 }}>
                    <button type="submit" style={styles.buttonPrimary} disabled={isSubmitting}>
                        {isSubmitting ? "Agregando..." : "Agregar usuario"}
                    </button>
                </div>
            </form>
        </div>
    );
}