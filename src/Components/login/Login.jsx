import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'; 
import Logo from '../../assets/Arjus.png'; 

const API_LOGIN_URL = 'http://localhost:8080/api/usuarios/login'; 

function Login({ onLoginSuccess }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    
    const [loginError, setLoginError] = useState(''); 
    const [isLoading, setIsLoading] = useState(false); 

    const navigate = useNavigate();

    const usernameRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex = /^(?=.*[a-z]).{6,}$/;

    const handleSubmit = async (e) => { 
        e.preventDefault();
        setLoginError('');
        let valid = true;

        if (!usernameRegex.test(username)) {
            setUsernameError('El formato del usuario no es correcto.');
            valid = false;
        } else {
            setUsernameError('');
        }

        if (!passwordRegex.test(password)) {
            setPasswordError('El formato de la contraseña no es correcto.');
            valid = false;
        } else {
            setPasswordError('');
        }

        if (!valid) return; 

        setIsLoading(true);
        
        try {
            const credentials = {
                correo: username, 
                contraseña: password,
            };

            const response = await fetch(API_LOGIN_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(credentials), 
            });

            let data = {};
            try {
                data = await response.json(); 
            } catch (jsonError) {
            }

            if (!response.ok) {
                throw new Error('Lo sentimos, no pudimos validar tu acceso. Por favor, verifica tus datos e inténtalo nuevamente.');
            }

            if (data.accessToken) {
                localStorage.setItem('jwtToken', data.accessToken); 
            } else {
                throw new Error('Ocurrió un inconveniente al procesar tu ingreso. Por favor, contacta a soporte.');
            }

            
            const userNameForDisplay = data.userName; 

            localStorage.setItem('isLoggedIn', 'true'); 
            localStorage.setItem('userName', userNameForDisplay);
            localStorage.setItem('idUsuario', data.userId);
            
            onLoginSuccess(userNameForDisplay); 
            navigate('/Home'); 

        } catch (err) {
       
            if (err.message === 'Failed to fetch' || err.message.includes('NetworkError')) {
                setLoginError('Parece que no hay conexión con el servidor. Por favor, revisa tu internet.');
            } else {
                setLoginError(err.message);
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="login-header">
                    <img src={Logo} alt="Logo de la empresa" className="heart-logo" />
                    <h1>Accede a la plataforma</h1>
                </div>
                <form className="login-form" onSubmit={handleSubmit}>
                    
                    <label htmlFor="username">Usuario</label>
                    <input
                        type="text"
                        id="username"
                        placeholder="Ingresa tu correo"
                        value={username}
                        onChange={(e)=> setUsername(e.target.value)}
                        disabled={isLoading}
                    />
                    {usernameError && <p className="error-message">{usernameError}</p>}
                    
                    <label htmlFor="password">Contraseña</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Ingresa tu contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={isLoading}
                    />
                    {passwordError && <p className="error-message">{passwordError}</p>}
                    
                    {loginError && <p className="error-message api-error">{loginError}</p>}

                    <button 
                        type="submit" 
                        className="login-button" 
                        disabled={isLoading}
                    >
                        {isLoading ? 'Verificando...' : 'Entrar'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;


