import './App.css';
import Home from './Components/home/Home';
import Login from './Components/login/Login';
import NavBar from './Components/navBar/NavBar';
import Inventario from './Components/inventario/InventarioPage';
import TicketPage from './Components/ticketTemplate/TicketPage'; 
import Upload from './Components/upload/subirArchivos';
import Admin from './Components/admin/adminPage';
import Perfil from './Components/perfil/perfilPage';

import { Routes, Route, useLocation } from 'react-router-dom'; // 1. Importa useLocation

function App() {
 // 2. Llama al hook useLocation para obtener el objeto de ubicación actual
 const location = useLocation();
 
 // 3. Define las rutas donde NO quieres que aparezca el NavBar (solo la ruta raíz '/')
 const noNavbarPaths = ['/']; 
 
 // 4. Comprueba si la ruta actual está en la lista de rutas sin NavBar
 const showNavbar = !noNavbarPaths.includes(location.pathname);


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
  
   {/* 5. Renderizado Condicional: Muestra el NavBar solo si showNavbar es true */}
   {showNavbar && <NavBar links={links}/>}
   
   {/* Es mejor tener un solo <Routes> conteniendo todas tus rutas */}
   <Routes>
    <Route path="/" element={<Login/>} />
    <Route path="/Home" element={<Home />} />
    <Route path="/Ticket" element={<TicketPage/>} />
    <Route path="/Inventario" element={<Inventario />} />
    <Route path="/SubirIncidencias" element={<Upload/>} />
    <Route path="/Admin" element={<Admin/>}/>
    <Route path="/Perfil" element={<Perfil/>}/>
    <Route path="*" element={<h1>404: Página no encontrada</h1>} />
   </Routes>
  </>
 );
}

export default App;