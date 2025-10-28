import './Navbar.css';
import logo from '../../assets/Arjus.png';
import { Link } from 'react-router-dom';

function NavBar({ links, userName, onLogout }) {

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
            
            <div className="user-section">
                <span className="user-name">Hola, {userName}</span> 
                <button 
                    onClick={onLogout} 
                    className="logout-button">
                    Cerrar Sesión
                </button>
            </div>
        </nav>
    );
}

export default NavBar;