import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/Arjus.png';
import './Navbar.css';

function NavBar({ links, onLogout }) {
    const [isOpen, setIsOpen] = useState(false);
    const userName = localStorage.getItem('userName') || 'Usuario';

    const closeMenu = () => setIsOpen(false);

    return (
        <header className="navbar">
            <nav className="navbar-container">
                <Link to="/" className="navbar-logo" onClick={closeMenu}>
                    <img src={logo} alt="Arjus Logo" />
                </Link>

                <div className={`menu-icon ${isOpen ? 'open' : ''}`} onClick={() => setIsOpen(!isOpen)}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>

                <div className={`navbar-menu ${isOpen ? 'active' : ''}`}>
                    <ul className="nav-links">
                        {links.map((link) => (
                            <li key={link.id} className="nav-item">
                                <Link 
                                    to={link.url} 
                                    className="nav-link" 
                                    onClick={closeMenu}
                                >
                                    {link.text}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    <div className="user-section">
                        <span className="user-greeting">
                            Hola, <strong>{userName}</strong>
                        </span>
                        <button onClick={onLogout} className="logout-button">
                            Cerrar Sesión
                        </button>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default NavBar;