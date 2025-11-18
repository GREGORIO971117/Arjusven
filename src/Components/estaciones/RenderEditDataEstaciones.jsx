import React, { useState, useEffect } from 'react';
import '../Inventario/InventarioList.css'; // Mantiene el CSS para clases generales
import { styles } from '../admin/adminTemplate'; // Importa los estilos en línea

const formatInitialValue = (value) => value === null || value === undefined ? '' : String(value);

const getInitialState = (data) => {
    if (!data) return {};
    return {
        idMerchant: formatInitialValue(data.idMerchant), // Solo lectura
        afiliadoAS400: formatInitialValue(data.afiliadoAS400),
        afiliadoATPV: formatInitialValue(data.afiliadoATPV),
        controladorVolumetrico: formatInitialValue(data.controladorVolumetrico),
        rankingEdenred: formatInitialValue(data.rankingEdenred),
        modelo: formatInitialValue(data.modelo),
        tipoDeConexion: formatInitialValue(data.tipoDeConexion),
        tipoSIM: formatInitialValue(data.tipoSIM), 
        carrier: formatInitialValue(data.carrier),
        cantPOSActivas: data.cantPOSActivas ?? 0,
        nombreComercial: formatInitialValue(data.nombreComercial),
        codigoPEMEX: formatInitialValue(data.codigoPEMEX),
        tipoPEMEX: formatInitialValue(data.tipoPEMEX),
        direccion: formatInitialValue(data.direccion),
        coloniaAsentamiento: formatInitialValue(data.coloniaAsentamiento),
        cp: formatInitialValue(data.cp),
        municipio: formatInitialValue(data.municipio),
        estado: formatInitialValue(data.estado),
        telefono1: formatInitialValue(data.telefono1),
        telefono2: formatInitialValue(data.telefono2),
        soporteNoviembre2022: formatInitialValue(data.soporteNoviembre2022),
        km: data.km ?? 0.0,
        cobertura: formatInitialValue(data.cobertura),
        plazaDeAtencion: formatInitialValue(data.plazaDeAtencion),
        as400: formatInitialValue(data.as400),
        bo: formatInitialValue(data.bo),
        grupo: formatInitialValue(data.grupo),
        prioridad: formatInitialValue(data.prioridad),
        referencias: formatInitialValue(data.referencias),
        supervisorArjus: formatInitialValue(data.supervisorArjus),
        rollos: data.rollos ?? 0,
        transporte: data.transporte ?? 0, 
        tecnicoAsignado: formatInitialValue(data.tecnicoAsignado),
    };
};

export default function RenderEditDatosEstacion({ 
    handleUpdate, 
    onCancelEdit, 
    data, 
    handleRemove, 
    isSubmitting = false,
    datosEstaticos 
}) {
    
    const { card, form, row, label, input, buttonDanger, buttonPrimary, navButton, error } = styles;
    
    const [formData, setFormData] = useState(getInitialState(data));
    const [localError, setLocalError] = useState("");
    
    useEffect(() => {
        setFormData(getInitialState(data));
        setLocalError("");
    }, [data]);
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        let finalValue = value;

        if (['cantPOSActivas', 'rollos', 'transporte'].includes(name)) {
            finalValue = value === '' ? 0 : parseInt(value, 10) || 0;
        } else if (['km', 'latitud', 'longitud'].includes(name)) {
            finalValue = value === '' ? 0.0 : parseFloat(value) || 0.0;
        }
        
        setFormData((f) => ({
            ...f,
            [name]: finalValue
        }));
    };

    const validateForm = () => {
        if (!formData.nombreComercial.trim()) return "El Nombre Comercial es requerido.";
        if (!formData.idMerchant) return "El ID Merchant es requerido.";
        return "";
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const err = validateForm();
        if (err) {
            setLocalError(err);
            return;
        }
        
        setLocalError(""); 
        
        const result = await handleUpdate(formData); 
        
        if (result && result.success === false) {
             setLocalError(result.error || "Fallo la actualización en el servidor.");
        }
    }; 
    
    return (
        <section style={card}>
            <h3>Editar Estación: {formData.nombreComercial}</h3>
            
            <form onSubmit={handleSubmit} style={form}> 
                
                {localError && <div style={error}>{localError}</div>} 

                {/* FILA 1: Identificación Principal (3 columnas) */}
                <div style={row}>
                    <label style={label}>ID Merchant
                        <input name="idMerchant" value={formData.idMerchant} style={input} disabled readOnly /> 
                    </label>
                    <label style={label}>Nombre Comercial
                        <input name="nombreComercial" value={formData.nombreComercial} onChange={handleChange} style={input} />
                    </label>
                    <label style={label}>Código PEMEX
                        <input name="codigoPEMEX" value={formData.codigoPEMEX} onChange={handleChange} style={input} />
                    </label>
                </div>

                {/* FILA 2: Ubicación (3 columnas) */}
                <div style={row}>
                    <label style={label}>Estado (Ubicación)
                        {/* SELECT: Estado (asume datosEstaticos.estadosMx) */}
                        <select name="estado" value={formData.estado} onChange={handleChange} style={input}>
                             <option value="">Seleccione Estado</option>
                            {datosEstaticos?.estadosMx?.map((opcion) => (
                                <option key={opcion} value={opcion}>{opcion}</option>
                            ))}
                        </select>
                    </label>
                    <label style={label}>Municipio
                        <input name="municipio" value={formData.municipio} onChange={handleChange} style={input} />
                    </label>
                    <label style={label}>CP
                        <input name="cp" value={formData.cp} onChange={handleChange} style={input} />
                    </label>
                </div>
                
                {/* FILA 3: Dirección y Referencias (2 columnas + textarea) */}
                <div style={{ ...row, flexDirection: 'column', width: '100%' }}>
                    <label style={{...label, flex: '1 1 100%'}}>Dirección Completa</label>
                    <input name="direccion" value={formData.direccion} onChange={handleChange} style={input} />
                </div>
                <div style={row}>
                    <label style={label}>Colonia/Asentamiento
                        <input name="coloniaAsentamiento" value={formData.coloniaAsentamiento} onChange={handleChange} style={input} />
                    </label>
                    <label style={label}>Referencias
                        <input name="referencias" value={formData.referencias} onChange={handleChange} style={input} />
                    </label>
                </div>

                {/* FILA 4: Afiliados y Datos Operacionales (3 columnas) */}
                <div style={row}>
                    <label style={label}>Afiliado AS 400
                        <input name="afiliadoAS400" value={formData.afiliadoAS400} onChange={handleChange} style={input} />
                    </label>
                    <label style={label}>Afiliado ATPV
                        <input name="afiliadoATPV" value={formData.afiliadoATPV} onChange={handleChange} style={input} />
                    </label>
                    <label style={label}>Tipo PEMEX
                        <input name="tipoPEMEX" value={formData.tipoPEMEX} onChange={handleChange} style={input} />
                    </label>
                </div>
                
                {/* FILA 5: Conectividad y POS (3 columnas) */}
                <div style={row}>
                    <label style={label}>Controlador Volumétrico
                        <input name="controladorVolumetrico" value={formData.controladorVolumetrico} onChange={handleChange} style={input} />
                    </label>
                    <label style={label}>Modelo (Término)
                        <input name="modelo" value={formData.modelo} onChange={handleChange} style={input} />
                    </label>
                    <label style={label}>Cant. POS Activas
                        <input name="cantPOSActivas" type="number" value={formData.cantPOSActivas} onChange={handleChange} style={input} />
                    </label>
                </div>
                
                {/* FILA 6: Redes y Tipo SIM (3 columnas) */}
                <div style={row}>
                    <label style={label}>Tipo de Conexión
                        <input name="tipoDeConexion" value={formData.tipoDeConexion} onChange={handleChange} style={input} />
                    </label>
                    <label style={label}>Tipo SIM
                        <input name="tipoSIM" value={formData.tipoSIM} onChange={handleChange} style={input} />
                    </label>
                    <label style={label}>Carrier
                        <input name="carrier" value={formData.carrier} onChange={handleChange} style={input} />
                    </label>
                </div>

                {/* FILA 7: Gestión y Logística (3 columnas) */}
                <div style={row}>
                    <label style={label}>Plaza de Atención
                        <input name="plazaDeAtencion" value={formData.plazaDeAtencion} onChange={handleChange} style={input} />
                    </label>
                    <label style={label}>Cobertura
                        <input name="cobertura" value={formData.cobertura} onChange={handleChange} style={input} />
                    </label>
                    <label style={label}>Prioridad
                        <input name="prioridad" value={formData.prioridad} onChange={handleChange} style={input} />
                    </label>
                </div>

                {/* FILA 8: Gestión Interna (3 columnas) */}
                <div style={row}>
                    <label style={label}>Grupo
                        <input name="grupo" value={formData.grupo} onChange={handleChange} style={input} />
                    </label>
                    <label style={label}>AS 400 (Gestión)
                        <input name="as400" value={formData.as400} onChange={handleChange} style={input} />
                    </label>
                    <label style={label}>BO (Gestión)
                        <input name="bo" value={formData.bo} onChange={handleChange} style={input} />
                    </label>
                </div>

                {/* FILA 9: Contacto y Soporte (3 columnas) */}
                <div style={row}>
                    <label style={label}>Teléfono 1
                        <input name="telefono1" value={formData.telefono1} onChange={handleChange} style={input} />
                    </label>
                    <label style={label}>Teléfono 2
                        <input name="telefono2" value={formData.telefono2} onChange={handleChange} style={input} />
                    </label>
                    <label style={label}>Soporte Nov 2022
                        <input name="soporteNoviembre2022" value={formData.soporteNoviembre2022} onChange={handleChange} style={input} />
                    </label>
                </div>

                {/* FILA 10: Asignación Técnica y Logística (3 columnas) */}
                <div style={row}>
                    <label style={label}>Supervisor ARJUS
                        <input name="supervisorArjus" value={formData.supervisorArjus} onChange={handleChange} style={input} />
                    </label>
                    <label style={label}>Técnico Asignado
                        <input name="tecnicoAsignado" value={formData.tecnicoAsignado} onChange={handleChange} style={input} />
                    </label>
                    <label style={label}>Transporte (ID/Ref)
                        <input name="transporte" type="number" value={formData.transporte} onChange={handleChange} style={input} />
                    </label>
                </div>

                {/* FILA 11: Datos Logísticos y Geográficos (3 columnas) */}
                <div style={row}>
                    <label style={label}>Rollos (Cant.)
                        <input name="rollos" type="number" value={formData.rollos} onChange={handleChange} style={input} />
                    </label>
                    <label style={label}>KM (Distancia)
                        <input name="km" type="number" step="any" value={formData.km} onChange={handleChange} style={input} />
                    </label>
                   
                </div>


                {/* BOTONES DE ACCIÓN (Borrar a la izquierda, Navegación a la derecha) */}
                <div style={{ marginTop: 20, display: 'flex', gap: 10, alignItems: 'center', width: '100%' }}>
                    
                    <button 
                        type="button" 
                        onClick={handleRemove}
                        style={buttonDanger}
                        disabled={isSubmitting}
                    >
                        Borrar Estación
                    </button>
                    
                    <div style={{ marginLeft: 'auto', display: 'flex', gap: 10 }}>
                        <button 
                            type="button" 
                            onClick={onCancelEdit}
                            style={navButton} 
                            disabled={isSubmitting}
                        >
                            Cancelar
                        </button>
                        <button 
                            type="submit" 
                            style={buttonPrimary}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Guardando..." : "Guardar Cambios"}
                        </button>
                    </div>
                </div>
            </form>
        </section>
    );
}