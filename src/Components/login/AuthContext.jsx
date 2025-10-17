// src/contexts/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

// Hook para acceder fácilmente al contexto
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
    
    // Estado para guardar la información esencial del usuario logueado
    const [user, setUser] = useState(null); 
    const [loading, setLoading] = useState(true);

    // Efecto para verificar la sesión al cargar la aplicación
    useEffect(() => {
        const storedId = localStorage.getItem('userId');
        const storedRole = localStorage.getItem('userRole');
        const storedToken = localStorage.getItem('authToken');

        if (storedId && storedRole && storedToken) {
            // Si hay datos, restaurar la sesión
            setUser({ 
                id: parseInt(storedId), 
                role: storedRole, 
                token: storedToken 
            });
        }
        setLoading(false); // La carga inicial ha terminado
    }, []);

    // Función para iniciar sesión (llamada desde Login.jsx)
    const login = (userData) => {
        // Almacenar datos en localStorage para persistencia
        localStorage.setItem('userId', userData.id.toString());
        localStorage.setItem('userRole', userData.role);
        localStorage.setItem('authToken', userData.token);
        
        // Actualizar el estado
        setUser({ 
            id: userData.id, 
            role: userData.role, 
            token: userData.token 
        });
    };

    // Función para cerrar sesión
    const logout = () => {
        localStorage.clear(); // Limpia todos los datos de la sesión
        setUser(null);
    };

    const value = {
        user,
        userId: user ? user.id : null, // ID que necesitamos para el ticket
        isAuthenticated: !!user,
        loading,
        login,
        logout,
        token: user ? user.token : null,
        isAdmin: user && user.role === 'ADMINISTRADOR'
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

// 💡 Recuerda envolver tu componente raíz (ej. App.js) con <AuthProvider>