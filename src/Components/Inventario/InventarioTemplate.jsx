// InventarioTemplate.jsx

import RenderDatosInventario from './RenderDatosInventario';
import RenderEditDatosInventario from './RenderEditDatosInventario';
import datosEstaticos from '../../assets/datos.json';
import RenderHistorial from './RenderHistorial';
import './InventarioList.css';
import { useState } from 'react';
import { apiRequest } from '../login/Api';

const API_URL = '/pivote/historial';

function InventarioTemplate({handleRemove,handleEnterEditMode, handleCancel,isEditing,data, onGoBack,handleSave,handleUpdate, ModalTemplate,showModal, closeModal,modalConfig}) {
    
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
                throw new Error(`Error al cargar los datos del historial: ${response.status} - ${errorBody}`);
            }
            
            const newData = await response.json();
            
            if (!newData || newData.length === 0) {
                showModal({
                    title: "Historial Vacío",
                    message: `No se encontraron registros de historial para el equipo con N/S ${data.numeroDeSerie}.`,
                    type: "info",
                });
                setDataHistorial([]);
                return; 
            }
            
            setDataHistorial(newData);
            console.log("Datos del historial cargados:", newData); 
            
            setHistorial(true);

        } catch (error) {
            console.error('Error al cargar los datos:', error);
            showModal({
                title: "Error de Carga",
                message: error.message || "Fallo la conexión al intentar cargar el historial.",
                type: "error",
            });
            setHistorial(false); 
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>

            <ModalTemplate
                isOpen={modalConfig.isOpen}
                onClose={closeModal}
                title={modalConfig.title}
                message={modalConfig.message}
                type={modalConfig.type}
                />

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
                        <RenderDatosInventario
                            data={data}
                            onGoBack={onGoBack}
                            onEdit={handleEnterEditMode} 
                            loadHistorial={loadHistorial}
                            showModal={showModal} 
                        />
                    )}
                </>
            )}
        </>
    );
}

export default InventarioTemplate;