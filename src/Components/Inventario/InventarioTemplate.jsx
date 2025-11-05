import React, { useState, useEffect } from 'react';
import RenderDatosInventario from './RenderDatosInventario';
import RenderEditDatosInventario from './RenderEditDatosInventario';
import datosEstaticos from '../../assets/datos.json';
import './InventarioList.css';

function InventarioTemplate({ data, onGoBack,loadInventario }) {

    const [isEditing, setIsEditing] = useState(false); 
    
    const handleCancel = () => {
        setIsEditing(false);
    };
    
    const handleSave = async () => {
        try {
            // ESPERA a que la lista se recargue con los nuevos datos
            await loadInventario(); 
            // Solo después de la recarga exitosa, sale del modo de edición.
            setIsEditing(false);
        } catch (err) {
            console.error("Fallo la recarga de inventario después de guardar.", err);
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