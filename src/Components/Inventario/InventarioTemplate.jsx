import RenderDatosInventario from './RenderDatosInventario';
import RenderEditDatosInventario from './RenderEditDatosInventario';
import datosEstaticos from '../../assets/datos.json';
import './InventarioList.css';

function InventarioTemplate({handleRemove,handleEnterEditMode, handleCancel,isEditing,data, onGoBack,handleSave,handleUpdate }) {


    return (
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
                />
            )}
        </>
    );
}

export default InventarioTemplate;