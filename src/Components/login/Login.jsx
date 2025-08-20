import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import Logo from '../../assets/Arjus.png';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // Inicializa el hook useNavigate
  const navigate = useNavigate();

  // Regex para validación (se mantiene igual)
  const usernameRegex = /^[a-zA-Z0-9_-]{3,20}$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%:^&*()_+])[A-Za-z\d!@#:$%^&*()_+]{8,15}$/;

  const handleSubmit = (e) => {
    e.preventDefault();
    let valid = true;

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

    if (valid) {
      console.log("Acceso válido. Redirigiendo...");
      navigate('/home'); 
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
            onChange={(e) => setUsername(e.target.value)}
          />
          {usernameError && <p className="error-message">{usernameError}</p>}
          
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {passwordError && <p className="error-message">{passwordError}</p>}
          <button type="submit" className="login-button">Entrar</button>
        </form>
      </div>
    </div>
  );
}

export default Login;