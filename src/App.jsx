import './App.css';
import Home from './Components/home/Home';
import Login from './Components/login/Login';
import NavBar from './Components/navBar/NavBar';
import Inventario from './Components/inventario/Inventario';
import TicketPage from './Components/ticketTemplate/TicketPage'; 

import { Routes, Route } from 'react-router-dom';

function App() {
  const links = [
    {id: 1, text: "Home", url: "/Home"},
    {id: 2, text: "Ticket", url: "/Ticket"},
    {id: 3, text: "TPV Inventario", url: "/Inventario"}
  ];

  return (
    <>
      <NavBar links={links}/>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Ticket" element={<TicketPage />} />
        <Route path="/Inventario" element={<Inventario />} />
        <Route path="*" element={<h1>404: Página no encontrada</h1>} />
      </Routes>
    </>
  );
}

export default App;