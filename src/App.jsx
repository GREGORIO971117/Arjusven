import './App.css';

// Importaciones de todos los componentes de tus rutas
import Home from './Components/home/Home';
import Login from './Components/login/Login';
import NavBar from './Components/navBar/NavBar';
import Inventario from './Components/inventario/Inventario';
import TicketPage from './Components/ticketTemplate/TicketPage'; 
import ServiceRequestForm from './Components/Service/ServiceRequestForm';

// Importa los componentes de enrutamiento de React Router
import { Routes, Route } from 'react-router-dom'; 

function App() {
  const links = [
    {id: 1, text: "Home", url: "/Home"},
    {id: 2, text: "Ticket", url: "/Ticket"},
    {id: 3, text: "TPV Inventario", url: "/Inventario"}
  ];

  return (
    <>

    <Routes>
              <Route path="/" element={<Login />} />
    </Routes>
      <NavBar links={links}/>
      <Routes>

        <Route path="/Home" element={<Home/>} />
        <Route path="/Ticket" element={<TicketPage/>} />
        <Route path="/Inventario" element={<Inventario/>} />
        <Route path="/tickets/add" element={<ServiceRequestForm/>}></Route>
        <Route path="*" element={<h1>404: Página no encontrada</h1>} />
      </Routes>
    </>
  );
}

export default App;