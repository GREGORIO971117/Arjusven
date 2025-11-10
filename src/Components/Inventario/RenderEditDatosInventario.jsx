import React, { useState, useEffect } from 'react';
import './InventarioList.css'; 
import { styles } from '../admin/adminTemplate'; 

const formatInitialDate = (dateString) => dateString ? String(dateString).slice(0, 10) : '';

const getInitialState = (data) => {
    if (!data) return {};
    
    return {
        fechaInicioPrevista: formatInitialDate(data.fechaDeInicioPrevista), 
        fechaFinPrevista: formatInitialDate(data.fechaDeFinPrevista), 
        fechaFin: formatInitialDate(data.fechaDeFin), 
        fechaActualizacion: formatInitialDate(data.ultimaActualizacion), 
        tecnicoCampo: data.tecnico ?? "", 
        responsable: data.responsable ?? "",
        codigoEmail: data.codigoEmail ?? "",
        numeroDeSerie: data.numeroDeSerie ?? "", 
        titulo: data.titulo ?? "",
        descripcion: data.descripcion ?? "",
        equipo: data.equipo ?? "",
        numeroDeIncidencia: data.numeroDeIncidencia ?? "",
        estado: data.estado ?? "", 
        cliente: data.cliente ?? "", 
        plaza: data.plaza ?? "", 
        guias: data.guias ?? "",
        idInventario: data.idInventario, 
    };
};

function RenderEditDatosInventario({handleUpdate, onCancelEdit, data,handleRemove, datosEstaticos, isSubmitting = false 
}){
    
    const [formData, setFormData] = useState(getInitialState(data));
    const [error, setError] = useState("");
    
    useEffect(() => {
        setFormData(getInitialState(data));
        setError("");
    }, [data]);
    
    
    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((f) => ({
            ...f,
            [name]: value
        }));
    }

    const validateForm = () => {
        if (!formData.titulo.trim()) return "El Título es requerido.";
        if (!formData.responsable.trim()) return "El Responsable es requerido.";
        if (!formData.numeroDeSerie.trim()) return "El Número de Serie es requerido.";
        if (!formData.equipo.trim()) return "El Equipo es requerido.";
        if (!formData.estado.trim()) return "El Estado es requerido.";
        if (!formData.cliente.trim()) return "El Cliente es requerido.";
        if (!formData.plaza.trim()) return "La Plaza es requerida.";
        return "";
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        const err = validateForm();
        if (err) {
            setError(err);
            return;
        }
        
        // El estado de isSubmitting se maneja en el padre
        setError(""); // Limpiar errores locales

        try {
            const dataToUpdate = { 
                idInventario: data.idInventario,
                titulo: formData.titulo,
                responsable: formData.responsable,
                codigoEmail: formData.codigoEmail,
                numeroDeSerie: formData.numeroDeSerie, 
                descripcion: formData.descripcion,
                equipo: formData.equipo,
                numeroDeIncidencia: formData.numeroDeIncidencia,
                estado: formData.estado, 
                cliente: formData.cliente, 
                plaza: formData.plaza, 
                guias: formData.guias,
                tecnico: formData.tecnicoCampo, // Mapeado de vuelta
                fechaDeInicioPrevista: formData.fechaInicioPrevista || null, 
                fechaDeFinPrevista: formData.fechaFinPrevista || null, 
                fechaDeFin: formData.fechaFin || null, 
            };
            
            const result = await handleUpdate(dataToUpdate); 
            
            if (result && result.success === false) {
                 
                 setError(result.error || "Fallo la actualización en el servidor.");
            }
            
            
        } catch (err) {
            setError("Ocurrió un error inesperado al enviar los datos.");
        } 
    }; 

    
    return (
        <section style={styles.card}>
            <h3>Editar Inventario: {formData.titulo}</h3>
            
            <form onSubmit={handleSubmit} style={styles.form}> 
                
                {error && <div style={styles.error}>{error}</div>} 

                <div style={styles.row}>
                    <label style={styles.label}>Título
                        <input name="titulo" value={formData.titulo} onChange={handleChange} style={styles.input} />
                    </label>
                    <label style={styles.label}>Número de Serie
                        <input 
                        name="numeroDeSerie"
                        value={formData.numeroDeSerie} 
                        style={styles.input}
                        disabled />
                    </label>
                    <label style={styles.label}>Responsable
                        <input name="responsable" value={formData.responsable} onChange={handleChange} style={styles.input} />
                    </label>
                </div>
                
                {/* FILA 2: Código Email, Cliente y Plaza */}
                <div style={styles.row}>
                    <label style={styles.label}>Código Email
                        <input name="codigoEmail" value={formData.codigoEmail} onChange={handleChange} style={styles.input} type="text" />
                    </label>

                    
                    {/* SELECT: Cliente */}
                    <label style={styles.label}>Cliente
                        <select name="cliente" value={formData.cliente} onChange={handleChange} style={styles.input}>
                            <option value="">Seleccione Cliente</option>
                            {datosEstaticos.cliente?.map((opcion) => (
                                <option key={opcion} value={opcion}>{opcion}</option>
                            ))}
                        </select>
                    </label>
                    {/* SELECT: Plaza (Asumiendo que usa estadosMx) */}
                    <label style={styles.label}>Plaza
                        <select name="plaza" value={formData.plaza} onChange={handleChange} style={styles.input}>
                            <option value="">Seleccione Plaza</option>
                            {datosEstaticos.estadosMx?.map((opcion) => (
                                <option key={opcion} value={opcion}>{opcion}</option>
                            ))}
                        </select>
                    </label>
                </div>

                {/* FILA 3: Número Incidencia, Guías y Equipo */}
                <div style={styles.row}>
                    <label style={styles.label}>Número Incidencia
                        <input name="numeroDeIncidencia" value={formData.numeroDeIncidencia} onChange={handleChange} style={styles.input} />
                    </label>
                    <label style={styles.label}>Guías
                        <input name="guias" value={formData.guias} onChange={handleChange} style={styles.input} />
                    </label>
                    {/* SELECT: Equipo */}
                    <label style={styles.label}>Equipo
                        <select name="equipo" value={formData.equipo} onChange={handleChange} style={styles.input}>
                            <option value="">Seleccione Equipo</option>
                            {datosEstaticos.equipos?.map((opcion) => (
                                <option key={opcion} value={opcion}>{opcion}</option>
                            ))}
                        </select>
                    </label>
                </div>
                
                {/* FILA 4: Estado, Técnico Campo y Fecha Inicio Prevista */}
                <div style={styles.row}>
                    {/* SELECT: Estado */}
                    <label style={styles.label}>Estado
                        <select name="estado" value={formData.estado} onChange={handleChange} style={styles.input}>
                            <option value="">Seleccione Estado</option>
                            {datosEstaticos.estado?.map((opcion) => (
                                <option key={opcion} value={opcion}>{opcion}</option>
                            ))}
                        </select>
                    </label>
                    {/* SELECT: Técnico Campo */}
                    <label style={styles.label}>Técnico Campo
                        <select name="tecnicoCampo" value={formData.tecnicoCampo} onChange={handleChange} style={styles.input}>
                            <option value="">Seleccione Técnico</option>
                            {datosEstaticos.tecnicoCampo?.map((opcion) => (
                                <option key={opcion} value={opcion}>{opcion}</option>
                            ))}
                        </select>
                    </label>
                    {/* INPUT DATE: Fecha Inicio Prevista */}
                    <label style={styles.label}>Fecha Inicio Prevista
                        <input 
                            type="date" 
                            name="fechaInicioPrevista" 
                            value={formData.fechaInicioPrevista} 
                            onChange={handleChange} 
                            style={styles.input} 
                        />
                    </label>
                </div>

                {/* FILA 5: Fechas Restantes */}
                <div style={styles.row}>
                    {/* INPUT DATE: Fecha Fin Prevista */}
                    <label style={styles.label}>Fecha Fin Prevista
                        <input 
                            type="date" 
                            name="fechaFinPrevista" 
                            value={formData.fechaFinPrevista} 
                            onChange={handleChange} 
                            style={styles.input} 
                        />
                    </label>
                    {/* INPUT DATE: Fecha Actualización */}
                    <label style={styles.label}>Fecha Actualización
                        <input 
                            type="date" 
                            name="fechaActualizacion" 
                            value={formData.fechaActualizacion} 
                            style={styles.input} 
                            disabled
                        />
                    </label>
                    {/* INPUT DATE: Fecha Fin */}
                    <label style={styles.label}>Fecha Fin
                        <input 
                            type="date" 
                            name="fechaFin" 
                            value={formData.fechaFin} 
                            onChange={handleChange} 
                            style={styles.input} 
                        />
                    </label>
                </div>

                {/* Campo de Descripción (Ocupa todo el ancho) */}
                <div style={{ ...styles.row, flexDirection: 'column', width: '100%' }}> 
                    <label style={{...styles.label, flex: '1 1 100%'}}>Descripción</label>
                    <textarea 
                        name="descripcion" 
                        value={formData.descripcion} 
                        onChange={handleChange} 
                        style={{ ...styles.input, minHeight: '80px', width: '100%', boxSizing: 'border-box' }}
                        rows="3"
                    ></textarea>
                </div> 
                
                {/* BOTONES DE ACCIÓN (Borrar a la izquierda, Navegación a la derecha) */}
                <div style={{ marginTop: 20, display: 'flex', gap: 10, alignItems: 'center' }}>
                    
                    <button 
                        type="button" 
                        onClick={handleRemove}
                        style={styles.buttonDanger}
                        disabled={isSubmitting}
                    >
                        Borrar Inventario
                    </button>
                    
                    <div style={{ marginLeft: 'auto', display: 'flex', gap: 10 }}>
                        <button 
                            type="button" 
                            onClick={onCancelEdit}
                            style={styles.navButton} 
                            disabled={isSubmitting}
                        >
                            Cancelar
                        </button>
                        <button 
                            type="submit" 
                            style={styles.buttonPrimary}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Guardando..." : "Guardar Cambios"}
                        </button>
                    </div>
                </div>
            </form>
        </section>
    )
}

export default RenderEditDatosInventario;