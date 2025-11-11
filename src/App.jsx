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
import Estaciones from './Components/estaciones/EstacionesPage';
import './App.css'; 

function App() {

    const [isLoggedIn, setIsLoggedIn] = useState(false); 
    
    // --- 1. LÓGICA DE PERSISTENCIA (Al cargar la app) ---
    // Revisa si hay una sesión guardada en localStorage
    useEffect(() => {
        // En este esquema simple, usamos 'isLoggedIn' en localStorage como bandera
        const storedLogin = localStorage.getItem('isLoggedIn');        
        if (storedLogin === 'true') {
            // Si encontramos la bandera y el nombre, asumimos sesión válida
            setIsLoggedIn(true);
                }
    }, []); 

    // --- 2. MANEJADORES DE SESIÓN ---
    // Función llamada desde Login.jsx cuando la autenticación es exitosa
    const handleLoginSuccess = () => {
        setIsLoggedIn(true);
    };
    
    // Función llamada desde NavBar.jsx para cerrar la sesión
    const handleLogout = () => {
        setIsLoggedIn(false);
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('userName');
        localStorage.removeItem('idUsuario');
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
        {id: 4, text: "Administrar", url: "/Admin"},
        {id: 5, text: "Perfil", url: "/Perfil"},
        {id: 6, text: "Estaciones", url: "/Estaciones"},
        {id: 7, text: "Subir", url: "/SubirIncidencias" },

        
    ];

    return (
        <>
            {/* Renderizar NavBar condicionalmente */}
            {showNavbar && (
                <NavBar 
                    links={links} 
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
                    <Route path="/Estaciones" element={<Estaciones/>} />
                    <Route path="/Admin" element={<Admin/>}/>
                    <Route path="/Perfil" element={<Perfil/>}/>
                    <Route path="/SubirIncidencias" element={<Upload/>} />
                </Route>
                
                {/* Ruta para cualquier otra URL (404) */}
                <Route path="*" element={<h1>404: Página no encontrada</h1>} />
            </Routes>
        </>
    );
}

export default App;
