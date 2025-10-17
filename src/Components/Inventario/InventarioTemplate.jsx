import React, { useState } from 'react';
import RenderDatosInventario from './RenderDatosInventario';
import RenderEditDatosInventario from './RenderEditDatosInventario';
import datosEstaticos from '../../assets/datos.json';
import './InventarioList.css';

function InventarioTemplate({ data, onGoBack, onPatch, onDelete }) {

    // Estado para controlar si estamos en modo de edición o no.
    const [isEdit, setIsEdit] = useState(false);

    // Función de callback para guardar. 
    // Después de un PATCH exitoso en RenderEditDatosInventario, se llama a esta función.
    const handlePatchComplete = (updatedData) => {
        // 1. Actualiza los datos en el componente padre (InventarioPage)
        onPatch(updatedData); 
        // 2. Sale del modo de edición
        setIsEdit(false); 
    };
    
    // Función de callback para eliminar.
    const handleDeleteComplete = (idInventario) => {
        // 1. Ejecuta la eliminación en el componente padre (InventarioPage)
        onDelete(idInventario); 
        // 2. No necesitamos cambiar el estado isEdit, ya que InventarioPage establecerá selectedInventario en null, recargando el panel.
    }

    return (
        <>
            {isEdit ? (
                // MODO DE EDICIÓN
                <RenderEditDatosInventario
                    data={data}
                    // onGoBack={onGoBack} // onGoBack no es necesario aquí, usamos onCancelEdit
                    datosEstaticos={datosEstaticos}
                    // Lógica al CANCELAR: simplemente vuelve a la vista de lectura
                    onCancelEdit={() => setIsEdit(false)}
                    // Lógica al GUARDAR: actualiza el padre y vuelve a la vista de lectura
                    onPatch={handlePatchComplete} 
                    // Lógica al ELIMINAR: ejecuta la eliminación en el padre
                    onDelete={handleDeleteComplete} 
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