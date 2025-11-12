import RenderDatosEstacion from './RenderDataEstaciones';
import RenderEditDatosEstacion from './RenderEditDataEstaciones'; 
import '../Inventario/InventarioList.css'; 

function EstacionesTemplate({ 
    handleRemove, 
    handleEnterEditMode, 
    handleCancel, 
    isEditing, 
    data, 
    handleUpdate,
    isSubmitting,
    error 
}) {

    return (
        <div className="ticket-template-content">
            {error && <div className="error-message">{error}</div>}
            
            {isSubmitting && <div className="submitting-message">Procesando solicitud...</div>}

            {isEditing ? (
                <RenderEditDatosEstacion
                    data={data}
                    onCancelEdit={handleCancel} 
                    handleUpdate={handleUpdate}
                    isSubmitting={isSubmitting} 
                />
            ) : (
                <RenderDatosEstacion
                    data={data}
                    onEdit={handleEnterEditMode} 
                    handleRemove={handleRemove} 
                />
            )}
        </div>
    );
}

export default EstacionesTemplate;