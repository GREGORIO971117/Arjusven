import './App.css';
import Home from './Components/home/Home';
import Login from './Components/login/Login';
import NavBar from './Components/navBar/NavBar';
import Inventario from './Components/inventario/InventarioPage';
import TicketPage from './Components/ticketTemplate/TicketPage'; 
import Upload from './Components/upload/subirArchivos';
import Admin from './Components/admin/adminPage';

import { Routes, Route } from 'react-router-dom';

function App() {
  const links = [
    {id: 1, text: "Home", url: "/Home"},
    {id: 2, text: "Ticket", url: "/Ticket"},
    {id: 3, text: "Inventario", url: "/Inventario"},
    {id: 4, text: "Subir", url: "/SubirIncidencias" },
    {id: 5, text: "Administrar", url: "/Admin"},
  ];

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
      <NavBar links={links}/>
      <Routes>
        <Route path="/Home" element={<Home />} />
        <Route path="/Ticket" element={<TicketPage/>} />
        <Route path="/Inventario" element={<Inventario />} />
        <Route path="/SubirIncidencias" element={<Upload/>} />
        <Route path="/Admin" element={<Admin/>}/>
        <Route path="*" element={<h1>404: Página no encontrada</h1>} />
      </Routes>
    </>
  );
}

export default App;


