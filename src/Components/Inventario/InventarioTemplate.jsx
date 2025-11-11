import RenderDatosInventario from './RenderDatosInventario';
import RenderEditDatosInventario from './RenderEditDatosInventario';
import datosEstaticos from '../../assets/datos.json';
import RenderHistorial from './RenderHistorial';
import './InventarioList.css';
import { useState } from 'react';
import { apiRequest } from '../login/Api';

const API_URL = '/pivote';

function InventarioTemplate({handleRemove,handleEnterEditMode, handleCancel,isEditing,data, onGoBack,handleSave,handleUpdate }) {

    // Inicializa dataHistorial como un array vacío, ya que esperas una lista del backend
    const [dataHistorial,setDataHistorial] = useState([]); 
    const [isLoading, setIsLoading] = useState(false);
    const [historial, setHistorial] = useState(false); // Controla la visibilidad del componente

    const loadHistorial = async () => {

        const idInventario = data.idInventario;
        setHistorial(false); 

        setIsLoading(true);
        try {
            const response = await apiRequest(`${API_URL}/${idInventario}`, {method: "GET"});
            if (!response.ok) {
                // Captura el mensaje de error del backend si es posible
                const errorBody = await response.text(); 
                throw new Error(`Error al cargar los datos del inventario: ${response.status} - ${errorBody}`);
            }
            
            const newData = await response.json();
            setDataHistorial(newData);
            // El console.log debe usar la variable 'newData' para ver el valor actualizado
            console.log("Datos del historial cargados:", newData); 
            
            // 2. Mostramos el historial solo si la carga fue exitosa
            setHistorial(true);

        } catch (error) {
            console.error('Error al cargar los datos:', error);
            alert(`Error de carga: ${error.message}`);
            // Aseguramos que se mantenga oculto si hay error
            setHistorial(false); 
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {isLoading && <div>Cargando historial...</div>}

            {historial && (
                 // Muestra RenderHistorial
                 <RenderHistorial
                     historial={dataHistorial} 
                     onClose={()=>setHistorial(false)} 
                 />
            )}

            {!historial && (
                <>
                    {isEditing ? (
                        // MODO DE EDICIÓN
                        <RenderEditDatosInventario
                            data={data}
                            datosEstaticos={datosEstaticos}
                            onSave={handleSave}          
                            onCancelEdit={handleCancel} 
                            handleRemove ={handleRemove} 
                            handleUpdate={handleUpdate}
                        />
                    ) : (
                        // MODO DE VISUALIZACIÓN
                        <RenderDatosInventario
                            data={data}
                            onGoBack={onGoBack}
                            onEdit={handleEnterEditMode} 
                            loadHistorial={loadHistorial}
                        />
                    )}
                </>
            )}
        </>
    );
}

export default InventarioTemplate;