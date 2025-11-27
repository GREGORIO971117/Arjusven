import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'; 
import Logo from '../../assets/Arjus.png'; 

const API_LOGIN_URL = 'http://localhost:8080/api/usuarios/login'; 

function Login({ onLoginSuccess }) {
    // Estados para los campos de formulario
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [loginError, setLoginError] = useState(''); // Para errores de la API
    const [isLoading, setIsLoading] = useState(false); // Para el estado del botón

    const navigate = useNavigate();

    const usernameRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex = /^(?=.*[a-z]).{6,}$/;

    const handleSubmit = async (e) => { 
        e.preventDefault();
        setLoginError('');
        let valid = true;

        // --- 1. Validación del Front-end ---
        
        // Validación del usuario
        if (!usernameRegex.test(username)) {
            setUsernameError('El usuario no es válido.');
            valid = false;
        } else {
            setUsernameError('');
        }

        // Validación de la contraseña
        if (!passwordRegex.test(password)) {
            setPasswordError('La contraseña no es válida.');
            valid = false;
        } else {
            setPasswordError('');
        }

        if (!valid) return; // Detener si la validación falla

        // --- 2. Llamada a la API para Autenticación ---
        setIsLoading(true);
        
        try {
            // Objeto de credenciales con las claves que espera el backend
            const credentials = {
                correo: username, 
                contraseña: password,
            };

            const response = await fetch(API_LOGIN_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(credentials), 
            });

            const data = await response.json(); 

            if (!response.ok) {
                const errorMessage = data.message || 'Credenciales incorrectas. Inténtelo de nuevo.';
                throw new Error(errorMessage);
            }

            // --- 3. Autenticación Exitosa --

            if (data.accessToken) {
                localStorage.setItem('jwtToken', data.accessToken); 
            } else {
                throw new Error('Login exitoso, pero el servidor no envió el token JWT.');
            }

            // Usamos el nombre del usuario si el backend lo devuelve, si no, el correo.
            const userNameForDisplay = data.userName; 
            
            localStorage.setItem('isLoggedIn', 'true'); 
            localStorage.setItem('userName', userNameForDisplay);
            localStorage.setItem('idUsuario',data.userId);
            
            // Notificar al componente App.js
            onLoginSuccess(userNameForDisplay); 
            navigate('/Home'); 

        } catch (err) {
            // Manejar errores de red o errores lanzados
            setLoginError(err.message || 'Error de conexión con el servidor. Verifique que la API esté activa.');
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
                        placeholder="Usuario"
                        value={username}
                        onChange={(e)=> setUsername(e.target.value)}
                        disabled={isLoading}
                    />
                    {usernameError && <p className="error-message">{usernameError}</p>}
                    
                    <label htmlFor="password">Contraseña</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Contraseña"
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
                        {isLoading ? 'Verificando credenciales...' : 'Entrar'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;
