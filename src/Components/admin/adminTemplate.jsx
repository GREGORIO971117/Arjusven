import React, { useState, useEffect } from 'react';
import {apiRequest} from '../login/Api'; 
import UsuariosList from './usuariosList'; 
import UsuariosEdit from './usuariosedit';

const API_BASE_URL = '/usuarios'; 

const VIEWS = {                 
    LIST: 'listaUsuarios',
    EDIT: 'editarUsuario',
};

export default function AdminTemplate() {
    
    const USERS_PER_PAGE = 10;
    const [currentView, setCurrentView] = useState(VIEWS.LIST); 
    const [currentPage, setCurrentPage] = useState(1);
    const [editingUser, setEditingUser] = useState(null);
    const [users, setUsers] = useState([]);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(true); 

    const totalPages = Math.ceil(users.length / USERS_PER_PAGE);
    const startIndex = (currentPage - 1) * USERS_PER_PAGE;
    const endIndex = startIndex + USERS_PER_PAGE;
    const currentUsers = users.slice(startIndex, endIndex);
    
    const fetchUsers = async () => {
        setIsLoading(true);
        setError("");
        try {
            const response = await apiRequest(API_BASE_URL, { method: 'GET' }); 
            
            if (!response.ok) {
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
    
    const handleEdit = (user) => {
        setEditingUser(user);
        setCurrentView(VIEWS.EDIT);
    };

    const handleCancelEdit = () => {
        setEditingUser(null);
        setCurrentView(VIEWS.LIST);
        fetchUsers();
    };

   const validateForm = (formData, isPasswordRequired = true) => {
        
        if (!formData.nombre.trim()) return "El nombre es requerido.";
        if (!formData.correo.trim()) return "El correo es requerido.";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.correo)) return "Correo inválido.";
        if (!formData.estadoDeResidencia.trim()) return "El estado de residencia es requerido.";
        if (!formData.edad || Number(formData.edad) <= 0) return "Edad inválida.";
        if (!formData.rol.trim()) return "El rol es requerido.";
        
        const password = formData["contraseña"];
        
        // 2. Validación de Obligatoriedad de Contraseña
        if (isPasswordRequired && !password) {
             return "La contraseña es requerida.";
        }
        
        // 3. Validación de Seguridad (Solo si hay contraseña y no está vacía)
        if (password) {
            if (password.length < 8) {
                return "La contraseña debe tener al menos 8 caracteres.";
            }
            if (!/[A-Z]/.test(password)) {
                return "La contraseña debe contener al menos 1 letra mayúscula.";
            }
            if (!/[a-z]/.test(password)) {
                return "La contraseña debe contener al menos 1 letra minúscula.";
            }
            if (!/[\W_]/.test(password)) {
                return "La contraseña debe contener al menos 1 carácter especial (ej: !@#$%).";
            }
        }
        
        return "";
    };

    // 4. Funciones de navegación
    const handleNextPage = () => {
        setCurrentPage(prev => Math.min(prev + 1, totalPages));
    };

    const handlePrevPage = () => {
        setCurrentPage(prev => Math.max(prev - 1, 1));
    };


    async function removeUser(id) {
        if (!window.confirm("¿Borrar este usuario?")) return;
        
        try {
            const response = await apiRequest(`${API_BASE_URL}/${id}`, {
                method: 'DELETE',
            });
            
            if (!response.ok) {
                throw new Error(`Error al borrar: ${response.statusText}`);
            }
            setUsers((prev) => prev.filter((u) => u.idUsuarios !== id));
            
        } catch (err) {
            setError(err.message || "Fallo la conexión con el servidor.");
        }
    }

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
                    validateForm={validateForm}
                />
            );
        }
        
        return null; 
    };


    return (

        <div style={styles.container}>
            <div style={{ marginTop: 20 }}>
                {renderContent()}
            </div>
            
        </div>
    );
}


export const styles = {
    container: { padding: 0, fontFamily: "Segoe UI, Roboto, system-ui, sans-serif", color: "#222" },
    title: { marginBottom: 12 },
    card: {  padding: 16, borderRadius: 6, marginBottom: 16 },
    cardNav: { background: "#fff", padding: 16, borderRadius: 6, boxShadow: "0 0 6px rgba(0,0,0,0.06)", marginBottom: 16, display: 'flex', gap: 10 },
    form: {},
    row: { display: "flex", gap: 12, marginTop: 8, flexWrap: "wrap" },
    label: { display: "flex", flexDirection: "column", flex: "1 1 20px", fontSize: 14 },
    input: { marginTop: 6, padding: "4px 8px", borderRadius: 4, border: "1px solid #ccc", fontSize: 14 },
    buttonPrimary: { padding: "8px 12px", background: "#0078d4", color: "#fff", border: "none", borderRadius: 4, cursor: "pointer" },
    buttonDanger: {
            backgroundColor: '#dc3545', 
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 'bold',
            transition: 'background-color 0.3s',
            marginRight: 'auto', 
        },  
    navButton: { 
        padding: "10px 15px", 
        borderWidth: 1,  
        borderStyle: "solid", 
        borderColor: "#ccc", 
        borderRadius: 4, 
        cursor: "pointer", 
        background: "#f0f0f0"
    },
    activeNavButton: {
        background: "#0078d4",
        color: "#fff",
        borderColor: "#0078d4", 
    },
    
    table: { width: "100%", borderCollapse: "collapse", marginTop: 8 },
    error: { color: "#b00020", marginTop: 8 },
    th: {
        textAlign: 'center',
        padding: '12px',
        borderBottom: '2px solid #ddd',
        backgroundColor: '#f8f8f8',
        fontWeight: '600'
    },
    td: {
        padding: '10px 12px',
        borderBottom: '1px solid #eee',
    }
};