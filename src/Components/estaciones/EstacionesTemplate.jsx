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
    error,
    datosEstaticos
}) {

    return (
        <div className="ticket-template-content">
            {error && <div className="error-message">{error}</div>}
            
            {isSubmitting && <div className="submitting-message">Procesando solicitud...</div>}

            {isEditing ? (
                <RenderEditDatosEstacion
                    data={data}
                    handleRemove={handleRemove}
                    onCancelEdit={handleCancel} 
                    handleUpdate={handleUpdate}
                    isSubmitting={isSubmitting} 
                    datosEstaticos={datosEstaticos}
                />
            ) : (
                <RenderDatosEstacion
                    data={data}
                    onEdit={handleEnterEditMode} 
                  
                />
            )}
        </div>
    );
}

export default EstacionesTemplate;