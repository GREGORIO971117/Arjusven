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
    

    useEffect(() => {
        const storedLogin = localStorage.getItem('isLoggedIn');        
        if (storedLogin === 'true') {
            setIsLoggedIn(true);
                }
    }, []); 

    const handleLoginSuccess = () => {
        setIsLoggedIn(true);
    };
    
    const handleLogout = () => {
        setIsLoggedIn(false);
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('userName');
        localStorage.removeItem('idUsuario');
    };

    const location = useLocation();
    const noNavbarPaths = ['/']; 
    
    const showNavbar = !noNavbarPaths.includes(location.pathname) && isLoggedIn;

    const links = [
        {id: 1, text: "Home", url: "/Home"},
        {id: 2, text: "Ticket", url: "/Ticket"},
        {id: 3, text: "Inventario", url: "/Inventario"},
        {id: 4, text: "Estaciones", url: "/Estaciones"},
        {id: 5, text: "Usuarios", url: "/Usuarios"},
        {id: 6, text: "Perfil", url: "/Perfil"},
        {id: 7, text: "Subir", url: "/SubirIncidencias" },

        
    ];

    return (
        <>
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
                
                <Route element={<ProtectedRoute isLoggedIn={isLoggedIn} />}>
                    <Route path="/Home" element={<Home />} />
                    <Route path="/Ticket" element={<TicketPage/>} />
                    <Route path="/Inventario" element={<Inventario />} />
                    <Route path="/Estaciones" element={<Estaciones/>} />
                    <Route path="/Usuarios" element={<Admin/>}/>
                    <Route path="/Perfil" element={<Perfil/>}/>
                    <Route path="/SubirIncidencias" element={<Upload/>} />
                </Route>
                
                <Route path="*" element={<h1>404: Página no encontrada</h1>} />
            </Routes>
        </>
    );
}

export default App;
