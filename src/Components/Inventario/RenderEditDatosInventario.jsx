import React, { useState, useEffect } from 'react';
import './InventarioList.css'; 
// Asegúrate de que 'datos.json' tenga las propiedades 'estado', 'equipos', 'tecnicos', etc.

const API_BASE_URL = 'http://localhost:8080/api/inventario';


function RenderEditDatosInventario({onSave,onCancelEdit,data}){

const [formData, setFormData] = useState({
    fechaInicioPrevista: data?.fechaInicioPrevista ?? "",
    responsable: data?.responsable ?? "",
    codigoEmail: data?.codigoEmail ?? "",
    numeroSerie: data?.numeroSerie ?? "",
    titulo: data?.titulo ?? "",
    descripcion: data?.descripcion ?? "",
    fechaActualizacion: data?.fechaActualizacion ?? "",
    equipo: data?.equipo ?? "",
    numeroIncidencia: data?.numeroIncidencia ?? "",
    estado: data?.estado ?? "",
    cliente: data?.cliente ?? "",
    plaza: data?.plaza ?? "",
    guias: data?.guias ?? "",
    tecnicoCampo: data?.tecnicoCampo ?? "",
    fechaFinPrevista: data?.fechaFinPrevista ?? "",
    fechaFin: data?.fechaFin ?? "",
});

useEffect(() => {
    if (data) {
        setFormData({
            fechaInicioPrevista: data.fechaInicioPrevista ?? "",
            responsable: data.responsable ?? "",
            codigoEmail: data.codigoEmail ?? "",
            numeroSerie: data.numeroSerie ?? "",
            titulo: data.titulo ?? "",
            descripcion: data.descripcion ?? "",
            fechaActualizacion: data.fechaActualizacion ?? "",
            equipo: data.equipo ?? "",
            numeroIncidencia: data.numeroIncidencia ?? "",
            estado: data.estado ?? "",
            cliente: data.cliente ?? "",
            plaza: data.plaza ?? "",
            guias: data.guias ?? "",
            tecnicoCampo: data.tecnicoCampo ?? "",
            fechaFinPrevista: data.fechaFinPrevista ?? "",
            fechaFin: data.fechaFin ?? "",
        });
    }
}, [data]);

    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((f) => ({
            ...f,
            [name]: value
        }));
    }

    const validateForm = () => {
    // Validación de campos obligatorios (cadenas de texto)
    if (!formData.titulo.trim()) return "El Título es requerido.";
    if (!formData.responsable.trim()) return "El Responsable es requerido.";
    if (!formData.numeroSerie.trim()) return "El Número de Serie es requerido.";
    if (!formData.equipo.trim()) return "El Equipo es requerido.";
    if (!formData.estado.trim()) return "El Estado es requerido.";
    if (!formData.cliente.trim()) return "El Cliente es requerido.";
    if (!formData.plaza.trim()) return "La Plaza es requerida.";

    // Si todas las validaciones pasan, regresa una cadena vacía
    return "";
};
const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validateForm();
    if (err) {
        setError(err);
        return;
    }

     setIsSubmitting(true);
    setError("");

    try {
        // 4. Preparar los datos
        // Enviamos todo el estado del formulario, incluyendo idInventario
        const dataToUpdate = { 
            ...formData,
            idInventario: data.idInventario
        };
        
        // 5. Realizar la Petición (PATCH para actualizar)
        const response = await fetch(`${API_BASE_URL}/${data.idInventario}`, {
            method: 'PATCH', 
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dataToUpdate),
        });
        
        // 6. Manejar errores del servidor
        if (!response.ok) {
             let errorMsg = `Error al actualizar el inventario. Estado: ${response.status}`;
             try {
                 const errorData = await response.json();
                 errorMsg = errorData.message || errorData.error || errorMsg;
             } catch {}
             throw new Error(errorMsg);
        }

        onSave();

        
    } catch (err) {
        setError(err.message || "Fallo la conexión con el servidor.");
    } finally {
        setIsSubmitting(false);
    }
};

    
    return (

       <>
       
            <div className="ticket-header">
                <h2 className="ticket-title">{formData.titulo}</h2>
            </div>
            
            {error && <div className="error-message">{error}</div>} 

            <form onSubmit={handleSubmit}>
                {/* Estructura de la grilla de 3 columnas */}
                <div className="formGrid"> 
                    
                    {/* Campos de texto generales */}
                    {['titulo', 'numeroSerie', 'responsable', 'codigoEmail', 'cliente', 'plaza', 'numeroIncidencia', 'guias']
                        .map((name) => (
                            <div key={name} className="formItem">
                                <label>{name.charAt(0).toUpperCase() + name.slice(1).replace(/([A-Z])/g, ' $1')}</label>
                                <input 
                                    type="text" 
                                    name={name} 
                                    value={formData[name]} 
                                    onChange={handleChange} 
                                    className="form-input" 
                                />
                            </div>
                        ))}

                    {/* Campos de fecha (tipo date) */}
                    {['fechaInicioPrevista', 'fechaFinPrevista', 'fechaActualizacion', 'fechaFin']
                        .map((name) => (
                            <div key={name} className="formItem">
                                <label>{name.charAt(0).toUpperCase() + name.slice(1).replace(/([A-Z])/g, ' $1')}</label>
                                <input 
                                    type="date" 
                                    name={name} 
                                    value={formData[name]?.slice(0, 10) || ''} // Formateo a YYYY-MM-DD
                                    onChange={handleChange} 
                                    className="form-input" 
                                />
                            </div>
                        ))}
                    
                    {/* Campos de SELECCIÓN (Equipo y Estado) */}
                    {['equipo', 'estado', 'tecnicoCampo']
                        .map((name) => (
                            <div key={name} className="formItem">
                                <label>{name.charAt(0).toUpperCase() + name.slice(1).replace(/([A-Z])/g, ' $1')}</label>
                                {/* Usamos input simple si no hay datos estáticos */}
                                <input 
                                    type="text" 
                                    name={name} 
                                    value={formData[name]} 
                                    onChange={handleChange} 
                                    className="form-input" 
                                />
                            </div>
                        ))}

                </div>

                {/* Campo de Descripción (ocupa todo el ancho) */}
                <div className="formItem" style={{ gridColumn: '1 / -1' }}> 
                    <label>Descripción</label>
                    <textarea 
                        name="descripcion" 
                        value={formData.descripcion} 
                        onChange={handleChange} 
                        className="form-input" 
                        rows="3"
                    ></textarea>
                </div>

                {/* BOTONES DE ACCIÓN */}
                <div className="button-container"> {/* Usa .button-container para el contenedor de botones */}
                    <button 
                        type="button" 
                        onClick={onCancelEdit} 
                        disabled={isSubmitting}
                        className="action-button cancel-button" // Clases de botones
                    >
                        Cancelar
                    </button>
                    <button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="action-button save-button" // Clases de botones
                    >
                        {isSubmitting ? 'Guardando...' : 'Guardar Cambios'}
                    </button>
                </div>
            </form>
       
       </> 
    )
}

export default RenderEditDatosInventario;