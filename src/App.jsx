import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import NavBar from './components/navBar/NavBar';
import Login from './Components/login/Login';
import ProtectedRoute from './ProtectedRoute'; 
import Home from './components/home/Home'; 
import Inventario from './components/inventario/InventarioPage';
import TicketPage from './components/ticketTemplate/TicketPage'; 
import Upload from './components/upload/subirArchivos';
import Admin from './components/admin/adminPage';
import Perfil from './components/perfil/perfilPage';
import './App.css'; 


function App() {
    // Estado de la sesión: inicializado como 'false'
    const [isLoggedIn, setIsLoggedIn] = useState(false); 
    const [userName, setUserName] = useState('');
    
    // --- 1. LÓGICA DE PERSISTENCIA (Al cargar la app) ---
    // Revisa si hay una sesión guardada en localStorage
    useEffect(() => {
        // En este esquema simple, usamos 'isLoggedIn' en localStorage como bandera
        const storedLogin = localStorage.getItem('isLoggedIn');
        const storedUserName = localStorage.getItem('userName');
        
        if (storedLogin === 'true' && storedUserName) {
            // Si encontramos la bandera y el nombre, asumimos sesión válida
            setIsLoggedIn(true);
            setUserName(storedUserName);
        }
    }, []); 

    // --- 2. MANEJADORES DE SESIÓN ---

    // Función llamada desde Login.jsx cuando la autenticación es exitosa
    const handleLoginSuccess = (name) => {
        setIsLoggedIn(true);
        setUserName(name);
        // localStorage.setItem('isLoggedIn', 'true') y 'userName' ya se hicieron en Login.jsx
    };
    
    // Función llamada desde NavBar.jsx para cerrar la sesión
    const handleLogout = () => {
        setIsLoggedIn(false);
        setUserName('');
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userName');
    };

    // --- 3. CONFIGURACIÓN DE NAVEGACIÓN Y NAVBAR ---
    
    // Hook para obtener la ubicación actual (ruta)
    const location = useLocation();
    const noNavbarPaths = ['/']; 
    
    // Determina si el NavBar debe mostrarse: NO está en la ruta raíz Y SÍ está logueado
    const showNavbar = !noNavbarPaths.includes(location.pathname) && isLoggedIn;

    // Links para el NavBar
    const links = [
        {id: 1, text: "Home", url: "/Home"},
        {id: 2, text: "Ticket", url: "/Ticket"},
        {id: 3, text: "Inventario", url: "/Inventario"},
        {id: 4, text: "Subir", url: "/SubirIncidencias" },
        {id: 5, text: "Administrar", url: "/Admin"},
        {id: 6, text: "Perfil", url: "/Perfil"},
    ];

    return (
        <>
            {/* Renderizar NavBar condicionalmente */}
            {showNavbar && (
                <NavBar 
                    links={links} 
                    userName={userName} 
                    onLogout={handleLogout} 
                />
            )} 
            
            <Routes>
                <Route 
                    path="/" 
                    element={isLoggedIn ? <Navigate to="/Home" replace /> : <Login onLoginSuccess={handleLoginSuccess} />} 
                />
                
                {/* Agrupamos todas las demás rutas dentro del guardia de autenticación */}
                <Route element={<ProtectedRoute isLoggedIn={isLoggedIn} />}>
                    <Route path="/Home" element={<Home />} />
                    <Route path="/Ticket" element={<TicketPage/>} />
                    <Route path="/Inventario" element={<Inventario />} />
                    <Route path="/SubirIncidencias" element={<Upload/>} />
                    <Route path="/Admin" element={<Admin/>}/>
                    <Route path="/Perfil" element={<Perfil/>}/>
                </Route>
                
                {/* Ruta para cualquier otra URL (404) */}
                <Route path="*" element={<h1>404: Página no encontrada</h1>} />
            </Routes>
        </>
    );
}

export default App;
