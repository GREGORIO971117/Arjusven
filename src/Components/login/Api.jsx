const BASE_URL = 'http://localhost:8080/api';

/**
 * Función centralizada para hacer peticiones al backend, añadiendo automáticamente el token JWT.
 * @param {string} endpoint - El endpoint específico (ej: '/usuarios' o '/inventario').
 * @param {object} options - Opciones estándar de fetch (method, body, etc.).
 */

export const apiRequest = async (endpoint, options = {}) => {
    // 1. Obtener el token (el "pasaporte")
    const token = localStorage.getItem('jwtToken');
    
    // 2. Definir los encabezados
    const headers = {
        'Content-Type': 'application/json',
        ...options.headers, 
    };

    // 3. Si hay token, adjuntarlo

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const config = {
        ...options,
        headers,
    };

    // 4. Realizar la petición
    return fetch(`${BASE_URL}${endpoint}`, config);
};