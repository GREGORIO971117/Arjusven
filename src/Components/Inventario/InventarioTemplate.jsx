import React, { useState,useEffect } from 'react';
import RenderDatosInventario from './RenderDatosInventario';
import RenderEditDatosInventario from './RenderEditDatosInventario';
import datosEstaticos from '../../assets/datos.json';
import './InventarioList.css';

function InventarioTemplate({ data, onGoBack }) {

    // Estado para controlar si estamos en modo de edición o no.
    const [isEdit, setIsEdit] = useState(false);
    const [isLoading, setIsLoading] = useState(true); 
    const [users, setUsers] = useState([]);
    const [error, setError] = useState("");
    

    const fetchUsers = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(API_BASE_URL);
            if (!response.ok) throw new Error("Error al cargar usuarios.");
            
            const data = await response.json();
            setUsers(Array.isArray(data) ? data : []); 
        } catch (err) {
            setError(err.message || "No se pudo conectar al servidor.");
            setUsers([]);
        } finally {
            setIsLoading(false);
        }
    };

    // Carga inicial de usuarios al montar el componente
        useEffect(() => {
            fetchUsers();
        }, []); 


    return (
        <>
            {isEdit ? (
                // MODO DE EDICIÓN
                <RenderEditDatosInventario
                    data={data}
                    datosEstaticos={datosEstaticos}
                    onCancelEdit={() => setIsEdit(false)}
                    onSave={() => setIsEdit(false)}
                />
            ) : (
                // MODO DE VISUALIZACIÓN
                <RenderDatosInventario
                    data={data}
                    onGoBack={onGoBack}
                    onEdit={() => setIsEdit(true)} // Inicia la edición
                />
            )}
        </>
    );
}

export default InventarioTemplate;