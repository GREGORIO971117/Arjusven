import './App.css';
import { useState } from 'react'; // 🆕 Importar useState
import Home from './Components/home/Home';
import Login from './Components/login/Login';
import NavBar from './Components/navBar/NavBar';
import Inventario from './Components/inventario/InventarioPage';
import TicketPage from './Components/ticketTemplate/TicketPage'; 
import Upload from './Components/upload/subirArchivos';
import Admin from './Components/admin/adminPage';
import Perfil from './Components/perfil/perfilPage';
import ProtectedRoute from './ProtectedRoute'; 
import { Routes, Route, useLocation } from 'react-router-dom';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [userName, setUserName] = useState('Gregorio');
  
  const handleLoginSuccess = async (name) => {
    setIsLoggedIn(true);
    setUserName(name);
  };
  
  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const location = useLocation();
  
  const noNavbarPaths = ['/']; 
  const showNavbar = !noNavbarPaths.includes(location.pathname) && isLoggedIn; // 💡 Solo mostrar si está logueado Y no es la ruta de Login

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
      {showNavbar && <NavBar links={links} userName={userName} onLogout={handleLogout} />} 
      
      <Routes>
        <Route path="/" element={<Login onLogin={handleLoginSuccess} />} />

        <Route element={<ProtectedRoute isLoggedIn={isLoggedIn} />}>
          <Route path="/Home" element={<Home />} />
          <Route path="/Ticket" element={<TicketPage/>} />
          <Route path="/Inventario" element={<Inventario />} />
          <Route path="/SubirIncidencias" element={<Upload/>} />
          <Route path="/Admin" element={<Admin/>}/>
          <Route path="/Perfil" element={<Perfil/>}/>
        </Route>
        
        <Route path="*" element={<h1>404: Página no encontrada</h1>} />
      </Routes>
    </>
  );
}

export default App;