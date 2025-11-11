import React, { useState, useEffect } from 'react';
import {apiRequest} from '../login/Api';
import RenderDataEstaciones from './RenderDataEstaciones';

const API_BASE_URL = './estaciones'

export default function EstacionTemplate() {

    const [isLoading, setIsLoading] = useState(true); 
    const [error, setError] = useState("");
    const [Estaciones, setEstaciones] = useState([]);

    const fetchUsers = async () => {
            setIsLoading(true);
            setError("");
            try {
                const response = await apiRequest(API_BASE_URL, { method: 'GET' }); 
                
                if (!response.ok) {
                    throw new Error(`Error al cargar usuarios: ${response.statusText}. Por favor, inicie sesión de nuevo.`);
                }
                
                const data = await response.json();
                setUsers(Array.isArray(data) ? data : []); 
                console.log(Estaciones);
            } catch (err) {
                setError(err.message || "No se pudo conectar al servidor.");
                setEstaciones([]);
            } finally {
                setIsLoading(false);
            }
        };

    return(

        <RenderDataEstaciones
            fetchEstaciones={fetchUsers}
        />
    )
}