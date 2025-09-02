import './Navbar.css';
import logo from '../../assets/Arjus.png';
import { Link } from 'react-router-dom';
import React, { useState } from 'react'; 
function NavBar(props) {
    const links = props.links;
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (e) => {
        // Lógica para manejar la búsqueda, por ejemplo, redirigir a una página de resultados
        e.preventDefault();
        // Puedes usar useNavigate para redirigir: navigate(`/search?query=${searchTerm}`);
    };

    return (
        <nav>
            <div className="logos">
                <img src={logo} alt="Logo de empresa" />
            </div>
            <div className="navigation">
                {links.map(link => (
                    <div key={link.id}>
                        <Link to={link.url}>{link.text}</Link>
                    </div>
                ))}
            </div>
        </nav>
    );
}

export default NavBar;