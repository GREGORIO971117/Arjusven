import React, { useState, useEffect } from 'react';
import './InventarioList.css'; 
import {styles} from '../admin/adminTemplate'; 

const API_BASE_URL = 'http://localhost:8080/api/inventario';

// Función auxiliar para formatear la fecha a YYYY-MM-DD
const formatInitialDate = (dateString) => dateString ? String(dateString).slice(0, 10) : '';

// 🔴 Función para TRADUCIR y FORMATEAR la data de la API (Backend)
const getInitialState = (data) => {
    if (!data) return {};
    
    return {
        // 1. FECHAS: Mapear del nombre de la API (ej: fechaDeInicioPrevista) al nombre del formulario (ej: fechaInicioPrevista)
        fechaInicioPrevista: formatInitialDate(data.fechaDeInicioPrevista), 
        fechaFinPrevista: formatInitialDate(data.fechaDeFinPrevista), 
        fechaFin: formatInitialDate(data.fechaDeFin), 
        fechaActualizacion: formatInitialDate(data.ultimaActualizacion), 

        // 2. TÉCNICO: Mapear del nombre de la API (tecnico) al nombre del formulario (tecnicoCampo)
        tecnicoCampo: data.tecnico ?? "", 

        // 3. RESTO: Mapeo directo (asumiendo que los nombres coinciden o son cercanos)
        responsable: data.responsable ?? "",
        codigoEmail: data.codigoEmail ?? "",
        numeroDeSerie: data.numeroDeSerie ?? "", 
        titulo: data.titulo ?? "",
        descripcion: data.descripcion ?? "",
        equipo: data.equipo ?? "",
        numeroIncidencia: data.numeroIncidencia ?? "",
        estado: data.estado ?? "", 
        cliente: data.cliente ?? "", 
        plaza: data.plaza ?? "", 
        guias: data.guias ?? "",
    };
};


function RenderEditDatosInventario({onSave, onCancelEdit, data, datosEstaticos}){

    
    const [formData, setFormData] = useState(getInitialState(data));
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    
    useEffect(() => {
        setFormData(getInitialState(data));
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

        setIsSubmitting(true);
        setError("");

        try {
            const dataToUpdate = { 
               idInventario: data.idInventario,
                titulo: formData.titulo,
                responsable: formData.responsable,
                codigoEmail: formData.codigoEmail,
                numeroDeSerie: formData.numeroDeSerie, 
                descripcion: formData.descripcion,
                equipo: formData.equipo,
                numeroIncidencia: formData.numeroIncidencia,
                estado: formData.estado, 
                cliente: formData.cliente, 
                plaza: formData.plaza, 
                guias: formData.guias,
                tecnico: formData.tecnicoCampo, 
                fechaDeInicioPrevista: formData.fechaInicioPrevista || null, 
                fechaDeFinPrevista: formData.fechaFinPrevista || null, 
                fechaDeFin: formData.fechaFin || null, 
                ultimaActualizacion: formData.fechaActualizacion || null, 
            };
            
            const response = await fetch(`${API_BASE_URL}/${data.idInventario}`, {
                method: 'PATCH', 
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dataToUpdate),
            });
            
            if (!response.ok) {
                 let errorMsg = `Error al actualizar el inventario. Estado: ${response.status}`;
                 try {
                     const errorData = await response.json();
                     errorMsg = errorData.message || errorData.error || errorMsg;
                 } catch {}
                 throw new Error(errorMsg);
            }

            await onSave(); 
            
        } catch (err) {
            setError(err.message || "Fallo la conexión con el servidor.");
        } finally {
            setIsSubmitting(false);
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
                        <input name="numeroDeSerie" value={formData.numeroDeSerie} onChange={handleChange} style={styles.input} />
                    </label>
                    <label style={styles.label}>Responsable
                        <input name="responsable" value={formData.responsable} onChange={handleChange} style={styles.input} />
                    </label>
                </div>
                
                {/* FILA 2: Código Email, Cliente y Plaza */}
                <div style={styles.row}>
                    <label style={styles.label}>Código Email
                        <input name="codigoEmail" value={formData.codigoEmail} onChange={handleChange} style={styles.input} type="email" />
                    </label>
                    {/* SELECT: Cliente */}
                    <label style={styles.label}>Cliente
                        <select name="cliente" value={formData.cliente} onChange={handleChange} style={styles.input}>
                            <option value="">Seleccione Cliente</option>
                            {datosEstaticos.cliente.map((opcion) => (
                                <option key={opcion} value={opcion}>{opcion}</option>
                            ))}
                        </select>
                    </label>
                    {/* SELECT: Plaza (Asumiendo que usa estadosMx) */}
                    <label style={styles.label}>Plaza
                        <select name="plaza" value={formData.plaza} onChange={handleChange} style={styles.input}>
                            <option value="">Seleccione Plaza</option>
                            {datosEstaticos.estadosMx.map((opcion) => (
                                <option key={opcion} value={opcion}>{opcion}</option>
                            ))}
                        </select>
                    </label>
                </div>

                {/* FILA 3: Número Incidencia, Guías y Equipo */}
                <div style={styles.row}>
                    <label style={styles.label}>Número Incidencia
                        <input name="numeroIncidencia" value={formData.numeroIncidencia} onChange={handleChange} style={styles.input} />
                    </label>
                    <label style={styles.label}>Guías
                        <input name="guias" value={formData.guias} onChange={handleChange} style={styles.input} />
                    </label>
                    {/* SELECT: Equipo */}
                    <label style={styles.label}>Equipo
                        <select name="equipo" value={formData.equipo} onChange={handleChange} style={styles.input}>
                            <option value="">Seleccione Equipo</option>
                            {datosEstaticos.equipos.map((opcion) => (
                                <option key={opcion} value={opcion}>{opcion}</option>
                            ))}
                        </select>
                    </label>
                </div>
                
                <div style={styles.row}>
                    {/* SELECT: Estado */}
                    <label style={styles.label}>Estado
                        <select name="estado" value={formData.estado} onChange={handleChange} style={styles.input}>
                            <option value="">Seleccione Estado</option>
                            {datosEstaticos.estado.map((opcion) => (
                                <option key={opcion} value={opcion}>{opcion}</option>
                            ))}
                        </select>
                    </label>
                    <label style={styles.label}>Técnico Campo
                        <select name="tecnicoCampo" value={formData.tecnicoCampo} onChange={handleChange} style={styles.input}>
                            <option value="">Seleccione Técnico</option>
                            {datosEstaticos.tecnicoCampo.map((opcion) => (
                                <option key={opcion} value={opcion}>{opcion}</option>
                            ))}
                        </select>
                    </label>
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

                <div style={styles.row}>
                    <label style={styles.label}>Fecha Fin Prevista
                        <input 
                            type="date" 
                            name="fechaFinPrevista" 
                            value={formData.fechaFinPrevista} 
                            onChange={handleChange} 
                            style={styles.input} 
                        />
                    </label>
                    <label style={styles.label}>Fecha Actualización
                        <input 
                            type="date" 
                            name="fechaActualizacion" 
                            value={formData.fechaActualizacion} 
                            onChange={handleChange} 
                            style={styles.input} 
                        />
                    </label>
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

                <div style={{ ...styles.row, flexDirection: 'column', width: '100%' }}> 
                    <label style={styles.label}>Descripción</label>
                    <textarea 
                        name="descripcion" 
                        value={formData.descripcion} 
                        onChange={handleChange} 
                        style={{ ...styles.input, minHeight: '80px', width: '100%', boxSizing: 'border-box' }}
                        rows="3"
                    ></textarea>
                </div> 
                
                <div style={{ marginTop: 20, display: 'flex', gap: 10 }}>
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
            </form>
        </section>
    )
}

export default RenderEditDatosInventario;