// subirUsuarioTemplate.jsx

import React, { useState } from 'react';
import { apiRequest } from '../login/Api'; 
import { styles } from '../admin/adminTemplate';
import datosEstaticos from '../../assets/datos.json';

const API_BASE_URL = '/usuarios';

// NOTA: Esta función de validación se mantiene igual, solo que su uso cambia
// al momento de llamar a showModal en addUser.
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

export default function SubirUsuarioTemplate({ onUserAdded,showModal , closeModal,ModalTemplate,modalConfig }) {
    const [isSubmitting, setIsSubmitting] = useState(false); 
    const [form, setForm] = useState({
        nombre: "",
        correo: "",
        estadoDeResidencia: "",
        edad: "",
        rol: "",
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
            showModal({
                title: "Error de Validación",
                message: err,
                type: "warning",
            });
            return;
        }

        setIsSubmitting(true);

        try {
            const userData = { ...form, edad: Number(form.edad) };
            
            const response = await apiRequest(API_BASE_URL, {
                method: 'POST',
                body: JSON.stringify(userData),
            });
            
            if (!response.ok) {
                let errorMsg = "Error al crear el usuario. El correo podría estar ya en uso o el servidor falló.";
                try {
                    const errorData = await response.json();
                    errorMsg = errorData.message || errorMsg;
                } catch(e) { /* ignorar */ }

                throw new Error(errorMsg);
            }

            const newUser = await response.json();
            
            if(onUserAdded) {
                onUserAdded(newUser);
            }
            
            showModal({
                title: "Usuario Creado",
                message: `El usuario '${newUser.nombre}' con el rol '${newUser.rol}' ha sido agregado.`,
                type: "success",
            });

            setForm({ nombre: "", correo: "", estadoDeResidencia: "", edad: "", rol: "", "contraseña": "" });
            
        } catch (err) {
            showModal({
                title: "Error al Crear Usuario",
                message: err.message || "Fallo la conexión con el servidor.",
                type: "error",
            });
        } finally {
            setIsSubmitting(false);
        }
    }
    
    return (
        <div style={styles.container}>

            <form onSubmit={addUser} style={styles.form}>
                
                <div style={styles.row}>
                    <label style={styles.label}>Nombre completo
                        <input name="nombre" value={form.nombre} onChange={handleChange} style={styles.input} required />
                    </label>
                    <label style={styles.label}>Correo
                        <input name="correo" type="email" value={form.correo} onChange={handleChange} style={styles.input} required />
                    </label>
                </div>

                <div style={styles.row}>
                    <label style={styles.label}>Estado de residencia
                        <select name="estadoDeResidencia" value={form.estadoDeResidencia} onChange={handleChange} style={styles.input}>
                                <option value="">Seleccione estado de residencia</option>
                                {datosEstaticos.estadosMx?.map((opcion) => (
                                <option key={opcion} value={opcion}>{opcion}</option>
                                ))}
                        </select>

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
                        <select name="rol" value={form.rol} onChange={handleChange} style={styles.input}>
                                <option value="">Seleccione rol</option>
                                {datosEstaticos.roles?.map((opcion) => (
                                <option key={opcion} value={opcion}>{opcion}</option>
                                ))}
                        </select>
                    </label>
                    <label style={styles.label}>Contraseña
                        <input name="contraseña" type="password" value={form["contraseña"]} onChange={handleChange} style={styles.input} />
                    </label>
                </div> 
                <div style={{ marginTop: 16 }}>
                    <button type="submit" style={styles.buttonPrimary} disabled={isSubmitting}>
                        {isSubmitting ? "Agregando..." : "Agregar usuario"}
                    </button>
                </div>
            </form>
                <ModalTemplate
                isOpen={modalConfig.isOpen}
                onClose={closeModal}
                title={modalConfig.title}
                message={modalConfig.message}
                type={modalConfig.type}
            />
        </div>
    );
}