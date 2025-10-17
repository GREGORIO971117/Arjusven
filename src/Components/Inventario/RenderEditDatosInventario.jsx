import React, { useState, useEffect } from 'react';
import './InventarioList.css'; 
// Asegúrate de que 'datos.json' tenga las propiedades 'estado', 'equipos', 'tecnicos', etc.

const API_BASE_URL = 'http://localhost:8080/api/inventario';

// Función para convertir una fecha a formato YYYY-MM-DD
const formatDate = (dateString) => {
    if (!dateString) return "";
    
    // Si ya está en YYYY-MM-DD, lo devuelve. Útil si la API ya formatea bien.
    if (dateString.length === 10 && dateString.match(/^\d{4}-\d{2}-\d{2}$/)) {
        return dateString;
    }

    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
        return "";
    }
    
    // Formatea la fecha en la zona horaria UTC para evitar desajustes de día.
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;
};


function RenderEditDatosInventario({ data, onPatch, onCancelEdit, onDelete, datosEstaticos }) {
    
    // Función de utilidad para asegurar que el valor sea una cadena o una cadena vacía
    const sanitizeValue = (value) => {
        return value === null || value === undefined ? "" : String(value); 
    };

    const [formData, setFormData] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // Sincronizar 'data' con el estado local
    useEffect(() => {
        if (data) {
            const sanitizedData = Object.fromEntries(
                Object.entries(data).map(([key, value]) => [key, sanitizeValue(value)])
            );
            
            // 💡 CLAVE: Formatear las fechas para el input[type=date]
            const formattedData = {
                ...sanitizedData,
                fechaDeInicioPrevista: formatDate(sanitizedData.fechaDeInicioPrevista),
                fechaDeFinPrevista: formatDate(sanitizedData.fechaDeFinPrevista),
                fechaDeFin: formatDate(sanitizedData.fechaDeFin),
                ultimaActualizacion: formatDate(sanitizedData.ultimaActualizacion),
            };

            setFormData(formattedData);
            setError(null);
        }
    }, [data]);

    // Maneja los cambios en los inputs, actualizando el estado local.
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
        if(error) setError(null);
    };

    // --- Lógica de Manejo de PATCH (Guardar) con limpieza de datos ---
    const handleSave = async (e) => {
        e.preventDefault(); 

        if (isLoading) return;

        // Validaciones
        if (!formData.titulo || !formData.numeroDeSerie) {
            setError("El título y el número de serie son obligatorios.");
            return;
        }
        if (!formData.idInventario) {
            setError("Error: ID de inventario no encontrado. No se puede guardar.");
            return;
        }

        setIsLoading(true);
        setError(null);

        // Crear el objeto a enviar, excluyendo el ID y campos que son cadenas vacías ("")
        const dataToSend = {};
        
        // 💡 Importante: El backend (Java) debe poder parsear las fechas enviadas. 
        // Como 'type="date"' solo envía YYYY-MM-DD, no debería haber problema.
        for (const key in formData) {
            const value = formData[key];
            
            if (key !== 'idInventario' && value !== "") {
                dataToSend[key] = value;
            }
        }
        
        if (Object.keys(dataToSend).length === 0) {
            setError("No hay datos nuevos para actualizar.");
            setIsLoading(false);
            return;
        }
        
        try {
            const response = await fetch(`${API_BASE_URL}/${formData.idInventario}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dataToSend), 
            });

            if (!response.ok) {
                let errorMsg = `Error al actualizar el inventario. Estado: ${response.status}`;
                try {
                    const errorData = await response.json();
                    errorMsg = errorData.message || errorData.error || errorMsg; 
                } catch {}
                throw new Error(errorMsg);
            }

            const updatedData = await response.json();
            
            if (onPatch) {
                onPatch(updatedData); 
            }
        } catch (err) {
            console.error("Error al aplicar PATCH:", err);
            setError(err.message || "Fallo la conexión con la API de inventario.");
        } finally {
            setIsLoading(false);
        }
    };

    // --- Lógica de Manejo de DELETE (Eliminar) ---
    const handleDelete = () => {
        if (isLoading || !formData.idInventario) return;
        
        if (window.confirm(`¿Estás seguro de que deseas eliminar el artículo "${formData.titulo}" (ID: ${formData.idInventario})? Esta acción es irreversible.`)) {
            if (onDelete) {
                onDelete(formData.idInventario); 
            }
        }
    };

    // 💡 Corrección del error de renderizado inicial (usando idInventario)
    if (!data || !formData.idInventario) {
        return <div>Cargando datos...</div>; 
    }

    return (
        <form onSubmit={handleSave}>
            <h2>{formData.titulo}</h2>
            <div className="metadata-section">
                ID de Inventario: <strong>{formData.idInventario}</strong>
            </div>

            {error && <div className="error-message">{error}</div>}
            
            <div className="formGrid">
                
                {/* Campos principales */}
                <div className="formItem">
                    <label htmlFor="titulo"><strong>Título:</strong></label>
                    <input type="text" id="titulo" name="titulo" value={formData.titulo} onChange={handleChange} className="form-input" required disabled={isLoading} />
                </div>
                
                <div className="formItem">
                    <label htmlFor="numeroDeSerie"><strong>Número de Serie:</strong></label>
                    <input type="text" id="numeroDeSerie" name="numeroDeSerie" value={formData.numeroDeSerie} onChange={handleChange} className="form-input" required disabled={isLoading} />
                </div>
                
                {/* Selectores */}
                <div className="formItem">
                    <label htmlFor="estado"><strong>Estado:</strong></label>
                    <select id="estado" name="estado" value={formData.estado} onChange={handleChange} className="form-input" disabled={isLoading}>
                        <option value="" disabled hidden>Selecciona una opción</option>
                        {datosEstaticos?.estado?.map(opt => (
                            <option key={opt} value={opt}>{opt}</option>
                        ))}
                    </select>
                </div>
                
                <div className="formItem">
                    <label htmlFor="equipo"><strong>Equipo:</strong></label>
                    <select id="equipo" name="equipo" value={formData.equipo} onChange={handleChange} className="form-input" disabled={isLoading}>
                        <option value="" disabled hidden>Selecciona una opción</option>
                        {datosEstaticos?.equipos?.map(opt => (
                            <option key={opt} value={opt}>{opt}</option>
                        ))}
                    </select>
                </div>

                {/* Campos de texto varios */}
                <div className="formItem"><label htmlFor="responsable"><strong>Responsable:</strong></label><input type="text" id="responsable" name="responsable" value={formData.responsable} onChange={handleChange} className="form-input" disabled={isLoading} /></div>
                <div className="formItem"><label htmlFor="cliente"><strong>Cliente:</strong></label><input type="text" id="cliente" name="cliente" value={formData.cliente} onChange={handleChange} className="form-input" disabled={isLoading} /></div>
                <div className="formItem"><label htmlFor="plaza"><strong>Plaza:</strong></label><input type="text" id="plaza" name="plaza" value={formData.plaza} onChange={handleChange} className="form-input" disabled={isLoading} /></div>
                
                <div className="formItem">
                    <label htmlFor="tecnico"><strong>Técnico de Campo:</strong></label>
                    <select id="tecnico" name="tecnico" value={formData.tecnico} onChange={handleChange} className="form-input" disabled={isLoading}>
                        <option value="" disabled hidden>Selecciona una opción</option>
                        {datosEstaticos?.tecnicos?.map(opt => (
                            <option key={opt} value={opt}>{opt}</option>
                        ))}
                    </select>
                </div>

                <div className="formItem"><label htmlFor="numeroDeIncidencia"><strong>Número de Incidencia:</strong></label><input type="text" id="numeroDeIncidencia" name="numeroDeIncidencia" value={formData.numeroDeIncidencia} onChange={handleChange} className="form-input" disabled={isLoading} /></div>
                <div className="formItem"><label htmlFor="codigoEmail"><strong>Código de Email:</strong></label><input type="text" id="codigoEmail" name="codigoEmail" value={formData.codigoEmail} onChange={handleChange} className="form-input" disabled={isLoading} /></div>
                <div className="formItem"><label htmlFor="guias"><strong>Guías:</strong></label><input type="text" id="guias" name="guias" value={formData.guias} onChange={handleChange} className="form-input" disabled={isLoading} /></div>

                {/* Campos de fecha - Ahora formateados correctamente */}
                <div className="formItem"><label htmlFor="fechaDeInicioPrevista"><strong>Fecha de Inicio Prevista:</strong></label><input type="date" id="fechaDeInicioPrevista" name="fechaDeInicioPrevista" value={formData.fechaDeInicioPrevista} onChange={handleChange} className="form-input" disabled={isLoading} /></div>
                <div className="formItem"><label htmlFor="fechaDeFinPrevista"><strong>Fecha de Fin Prevista:</strong></label><input type="date" id="fechaDeFinPrevista" name="fechaDeFinPrevista" value={formData.fechaDeFinPrevista} onChange={handleChange} className="form-input" disabled={isLoading} /></div>
                <div className="formItem"><label htmlFor="fechaDeFin"><strong>Fecha de Fin:</strong></label><input type="date" id="fechaDeFin" name="fechaDeFin" value={formData.fechaDeFin} onChange={handleChange} className="form-input" disabled={isLoading} /></div>
                <div className="formItem"><label htmlFor="ultimaActualizacion"><strong>Última Actualización:</strong></label><input type="date" id="ultimaActualizacion" name="ultimaActualizacion" value={formData.ultimaActualizacion} onChange={handleChange} className="form-input" disabled={isLoading} /></div>
            </div>

            {/* Descripción (Textarea) */}
            <div className="fullWidthSection">
                <div className="formItem">
                    <label htmlFor="descripcion"><strong>Descripción:</strong></label>
                    <textarea id="descripcion" name="descripcion" value={formData.descripcion} onChange={handleChange} rows="4" className="form-input" disabled={isLoading} />
                </div>
            </div>

            {/* Botones de Acción */}
            <div className="formActionsCompact">
                <button 
                    type="submit" 
                    className="action-button save-button" 
                    disabled={isLoading}
                >
                    {isLoading ? 'Guardando...' : 'Guardar cambios'}
                </button>
                
                <button
                    type="button" 
                    className="action-button cancel-button" 
                    onClick={onCancelEdit} 
                    disabled={isLoading}
                >
                    Cancelar
                </button>

                <button 
                    type="button" 
                    className="action-button delete-button" 
                    onClick={handleDelete}
                    disabled={isLoading}
                >
                    Eliminar Artículo
                </button>
            </div>
        </form>
    );
}

export default RenderEditDatosInventario;