import './Navbar.css';
import logo from '../../assets/Arjus.png';
import { Link } from 'react-router-dom';
function NavBar(props) {
    const links = props.links;

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