import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import NavBar from './components/navBar/NavBar';
import Login from './Components/login/Login';
import ProtectedRoute from './ProtectedRoute'; 
import Home from './components/home/Home'; 
import Inventario from './components/inventario/InventarioPage';
import TicketPage from './components/ticketTemplate/TicketPage'; 
import Upload from './components/upload/subirArchivos';
import AdminPage from './components/admin/adminPage';
import Perfil from './components/perfil/perfilPage';
import Estaciones from './Components/estaciones/EstacionesPage';
import PlaneacionPage from './Components/planeacion/planeacionPage';
import './App.css'; 

function App() {

    const [isLoggedIn, setIsLoggedIn] = useState(false); 
    const [userRole, setUserRole] = useState(null);

    useEffect(() => {
        const storedLogin = localStorage.getItem('isLoggedIn');        
        const storedRole = localStorage.getItem('userRole'); 
        
        if (storedLogin === 'true') {
            setIsLoggedIn(true);
            setUserRole(storedRole); 
        }
    }, []); 

    const handleLoginSuccess = (userName, role) => {
        setIsLoggedIn(true);
        setUserRole(role); 
    };
    
    const handleLogout = () => {
        setIsLoggedIn(false);
        setUserRole(null);
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('userName');
        localStorage.removeItem('idUsuario');
        localStorage.removeItem('userRole');
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
        {id: 8, text: "Planeación", url: "/Planeacion" }
    ];

    const filteredLinks = links.filter(link => {
        const adminPaths = ["/Planeacion", "/SubirIncidencias", "/Usuarios"]; 
        
        if (userRole === 'ADMINISTRADOR') {
            return true;
        } else {
            return !adminPaths.includes(link.url); 
        }
    });

    return (
        <>
            {showNavbar && (
                <NavBar 
                    links={filteredLinks} 
                    onLogout={handleLogout} 
                />
            )} 
            
            <Routes>
                <Route 
                    path="/" 
                    element={isLoggedIn ? <Navigate to="/Home" replace /> : <Login onLoginSuccess={handleLoginSuccess} />} 
                />
       
                <Route element={<ProtectedRoute isLoggedIn={isLoggedIn} userRole={userRole} />}>
                    <Route path="/Home" element={<Home />} />
                    <Route path="/Ticket" element={<TicketPage/>} />
                    <Route path="/Inventario" element={<Inventario />} />
                    <Route path="/Estaciones" element={<Estaciones/>} />
                    <Route path="/Perfil" element={<Perfil/>}/>
                </Route>
                <Route element={
                    <ProtectedRoute 
                        isLoggedIn={isLoggedIn} 
                        userRole={userRole} 
                        allowedRoles={['ADMINISTRADOR']} 
                    />
                }>
                    <Route path="/Usuarios" element={<AdminPage/>}/>
                    <Route path="/SubirIncidencias" element={<Upload/>} />
                    <Route path="/Planeacion" element={<PlaneacionPage/>}/>
                </Route>
                
                <Route path="*" element={<h1>404: Página no encontrada</h1>} />
            </Routes>
        </>
    );
}

export default App;