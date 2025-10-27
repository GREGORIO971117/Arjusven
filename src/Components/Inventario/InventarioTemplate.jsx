import React, { useState, useEffect } from 'react';
import RenderDatosInventario from './RenderDatosInventario';
import RenderEditDatosInventario from './RenderEditDatosInventario';
import datosEstaticos from '../../assets/datos.json';
import './InventarioList.css';

const API_BASE_URL = 'http://localhost:8080/api/inventario';

function InventarioTemplate({ data, onGoBack }) {

    const [isEditing, setIsEditing] = useState(false); 
    const [isLoading, setIsLoading] = useState(true); 
    const [inventario, setInventario] = useState([]); 
    const [error, setError] = useState("");
    
    const fetchInventario = async () => { 
        setIsLoading(true);
        try {
            const response = await fetch(API_BASE_URL);
            if (!response.ok) throw new Error("Error al cargar inventario.");
            
            const data = await response.json();
            setInventario(Array.isArray(data) ? data : []); 
        } catch (err) {
            setError(err.message || "No se pudo conectar al servidor.");
            setInventario([]);
            throw err; 
        } finally {
            setIsLoading(false);
        }
    };

    // Carga inicial de inventario
    useEffect(() => {
        fetchInventario();
    }, []); 
    
    const handleCancel = () => {
        setIsEditing(false);
    };
    
    const handleSave = async () => {
        try {
            // ESPERA a que la lista se recargue con los nuevos datos
            await fetchInventario(); 
            
            // Solo después de la recarga exitosa, sale del modo de edición.
            setIsEditing(false);

        } catch (err) {
            console.error("Fallo la recarga de inventario después de guardar.", err);
            // El usuario permanece en la pantalla de edición si la recarga falló.
        }
    };

    // 3. Entra en modo de edición.
    const handleEnterEditMode = () => {
        setIsEditing(true);
    };


    return (
        <>
            {isEditing ? (
                // MODO DE EDICIÓN
                <RenderEditDatosInventario
                    data={data}
                    datosEstaticos={datosEstaticos}
                    onSave={handleSave}           // Función de post-guardado (recarga + salir)
                    onCancelEdit={handleCancel}   // Función de solo salir
                />
            ) : (
                // MODO DE VISUALIZACIÓN
                <RenderDatosInventario
                    data={data}
                    onGoBack={onGoBack}
                    onEdit={handleEnterEditMode} 
                />
            )}
        </>
    );
}

export default InventarioTemplate;