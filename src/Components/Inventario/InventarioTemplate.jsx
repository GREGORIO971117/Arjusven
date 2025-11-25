import RenderDatosInventario from './RenderDatosInventario';
import RenderEditDatosInventario from './RenderEditDatosInventario';
import datosEstaticos from '../../assets/datos.json';
import RenderHistorial from './RenderHistorial';
import './InventarioList.css';
import { useState } from 'react';
import { apiRequest } from '../login/Api';

const API_URL = '/pivote/historial';

function InventarioTemplate({handleRemove,handleEnterEditMode, handleCancel,isEditing,data, onGoBack,handleSave,handleUpdate }) {
    const [dataHistorial,setDataHistorial] = useState([]); 
    const [isLoading, setIsLoading] = useState(false);
    const [historial, setHistorial] = useState(false); 

    const loadHistorial = async () => {

        const idInventario = data.idInventario;

        setHistorial(false); 

        setIsLoading(true);
        try {
            const response = await apiRequest(`${API_URL}/${idInventario}`, {method: "GET"});
            
            if (!response.ok) {
                const errorBody = await response.text(); 
                throw new Error(`Error al cargar los datos del inventario: ${response.status} - ${errorBody}`);
            }
            
            const newData = await response.json();
            setDataHistorial(newData);
            console.log("Datos del historial cargados:", newData); 
            
            setHistorial(true);

        } catch (error) {
            console.error('Error al cargar los datos:', error);
            alert(`Error de carga: ${error.message}`);
            setHistorial(false); 
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {isLoading && <div>Cargando historial...</div>}

            {historial && (
                 <RenderHistorial
                     historial={dataHistorial} 
                     onClose={()=>setHistorial(false)} 
                 />
            )}

            {!historial && (
                <>
                    {isEditing ? (
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