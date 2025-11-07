import React, { useState, useEffect } from 'react';
import { styles } from '../admin/adminTemplate'; 

const RenderEditarDatosAdicionales = ({ data, onCancelEdit, onSaveEdit,onDeleteEdit}) => {

  
const [formData, setFormData] = useState({});
const [localError, setLocalError] = useState(null);
const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (data) {
      setFormData(data);
    }
  }, [data]);

   const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setLocalError(null);
    };
  const handleCancel = () => {
    if (onCancelEdit) onCancelEdit();
  };

 const handleSave = async () => {
        setLocalError(null);
        setIsSubmitting(true);
        
        try {
            
            const result = await onSaveEdit(formData); 
            
            if (result && result.success) {
                if (onCancelEdit) onCancelEdit(); 
            } else {
                throw new Error(result?.error || "Error desconocido al guardar. Verifica el ID del servicio.");
            }
        } catch (err) {
            console.error("Fallo al ejecutar onSaveEdit:", err);
            setLocalError(err.message || "Fallo la operación de guardado.");
        } finally {
            setIsSubmitting(false);
        }
    };


 if (!formData || Object.keys(formData).length === 0) {
        return <div>Cargando datos de Servicio...</div>;
    }

    return(

<div style={{...styles.card}}>
    <div style={styles.row}>
        
        {/* Ciudad */}
        <label style={styles.label}>
            <strong>Ciudad:</strong>
            <input type="text" id="ciudad" name="ciudad"
                value={formData.ciudad || ''} onChange={handleChange} style={styles.input} />
        </label>
    
        {/* Plaza */}
        <label style={styles.label}>
            <strong>Plaza:</strong>
            <input type="text" id="plaza" name="plaza"
                value={formData.plaza || ''} onChange={handleChange} style={styles.input} />
        </label>
        
        {/* Técnico */}
        <label style={styles.label}>
            <strong>Técnico:</strong>
            <input type="text" id="tecnico" name="tecnico"
                value={formData.tecnico || ''} onChange={handleChange} style={styles.input} />
        </label>
        
        {/* Cerro en Punto Clave */}
        <label style={styles.label}>
            <strong>Cerro en Punto Clave:</strong>
            <input type="text" id="cerroEnPuntoClave" name="cerroEnPuntoClave"
                value={formData.cerroEnPuntoClave || ''} onChange={handleChange} style={styles.input} />
        </label>
        
        {/* Atención en Punto */}
        <label style={styles.label}>
            <strong>Atención en Punto:</strong>
            <input type="text" id="atencionEnPunto" name="atencionEnPunto"
                value={formData.atencionEnPunto || ''} onChange={handleChange} style={styles.input} />
        </label>
        
        {/* Firma en Estación */}
        <label style={styles.label}>
            <strong>Firma en Estación:</strong>
            <input type="text" id="firmaEnEstacion" name="firmaEnEstacion"
                value={formData.firmaEnEstacion || ''} onChange={handleChange} style={styles.input} />
        </label>
        
        {/* #Tarjeta / TAG */}
        <label style={styles.label}>
            <strong>#Tarjeta / TAG:</strong>
            <input type="text" id="tarjeta" name="tarjeta"
                value={formData.tarjeta || ''} onChange={handleChange} style={styles.input} />
        </label>
        
        {/* Cantidad TPV en Base */}
        <label style={styles.label}>
            <strong>Cantidad TPV en Base:</strong>
            <input type="number" id="cantidadTpv" name="cantidadTpv"
                value={formData.cantidadTpv || ''} onChange={handleChange} style={styles.input} />
        </label>
         <label style={styles.label}>
            <strong>Modelo:</strong>
            <input type="text" id="modeloEntra" name="modeloEntra"
                value={formData.modeloEntra || ''} onChange={handleChange} style={styles.input} />
        </label>
         <label style={styles.label}>
            <strong>Marca:</strong>
            <input type="text" id="marcaEntra" name="marcaEntra"
                value={formData.marcaEntra || ''} onChange={handleChange} style={styles.input} />
        </label>

        <label style={styles.label}>
            <strong>Serie Lógica:</strong>
            <input type="text" id="serieLogicaEntra" name="serieLogicaEntra"
                value={formData.serieLogicaEntra || ''} onChange={handleChange} style={styles.input} />
        </label>
        
        {/* Serie Física Entra */}
        <label style={styles.label}>
            <strong>Serie Física:</strong>
            <input type="text" id="serieFisicaEntra" name="serieFisicaEntra"
                value={formData.serieFisicaEntra || ''} onChange={handleChange} style={styles.input} />
        </label>
        
        {/* SIM Entra */}
        <label style={styles.label}>
            <strong>SIM entra:</strong>
            <input type="text" id="sim" name="sim"
                value={formData.sim || ''} onChange={handleChange} style={styles.input} />
        </label>
        
        {/* PTID Entra */}
        <label style={styles.label}>
            <strong>PTID:</strong>
            <input type="text" id="ptidEntra" name="ptidEntra"
                value={formData.ptidEntra || ''} onChange={handleChange} style={styles.input} />
        </label>
        
        {/* Eliminador Entra */}
        <label style={styles.label}>
            <strong>Eliminador:</strong>
            <input type="text" id="eliminadorEntra" name="eliminadorEntra"
                value={formData.eliminadorEntra || ''} onChange={handleChange} style={styles.input} />
        </label>

        <label style={styles.label}>
            <strong>Modelo Sale:</strong>
            <input type="text" id="modeloSale" name="modeloSale"
                value={formData.modeloSale || ''} onChange={handleChange} style={styles.input} />
        </label>
        
        {/* Marca Sale */}
        <label style={styles.label}>
            <strong>Marca Sale:</strong>
            <input type="text" id="marcaSale" name="marcaSale"
                value={formData.marcaSale || ''} onChange={handleChange} style={styles.input} />
        </label>
        
        {/* Serie Lógica Sale */}
        <label style={styles.label}>
            <strong>Serie Lógica Sale:</strong>
            <input type="text" id="serieLogicaSale" name="serieLogicaSale"
                value={formData.serieLogicaSale || ''} onChange={handleChange} style={styles.input} />
        </label>
        
        {/* Serie Física Sale */}
        <label style={styles.label}>
            <strong>Serie Física Sale:</strong>
            <input type="text" id="serieFisicaSale" name="serieFisicaSale"
                value={formData.serieFisicaSale || ''} onChange={handleChange} style={styles.input} />
        </label>
        
        {/* SIM Sale */}
        <label style={styles.label}>
            <strong>SIM Sale:</strong>
            <input type="text" id="simSale" name="simSale"
                value={formData.simSale || ''} onChange={handleChange} style={styles.input} />
        </label>
        
        {/* PTID Sale */}
        <label style={styles.label}>
            <strong>PTID Sale:</strong>
            <input type="text" id="ptidSale" name="ptidSale"
                value={formData.ptidSale || ''} onChange={handleChange} style={styles.input} />
        </label>
        
        {/* Eliminador Sale */}
        <label style={styles.label}>
            <strong>Eliminador Sale:</strong>
            <input type="text" id="eliminadorSale" name="eliminadorSale"
                value={formData.eliminadorSale || ''} onChange={handleChange} style={styles.input} />
        </label>
        
        {/* Versión Browser Sale */}
        <label style={styles.label}>
            <strong>Versión Browser Entra:</strong>
            <input type="text" id="versionDeBrowserEntra" name="versionDeBrowserEntra"
                value={formData.versionDeBrowserEntra || ''} onChange={handleChange} style={styles.input} />
        </label>


        <label style={styles.label}>
            <strong>Versión Browser Sale:</strong>
            <input type="text" id="versionDeBrowserSale" name="versionDeBrowserSale"
                value={formData.versionDeBrowserSale || ''} onChange={handleChange} style={styles.input} />
        </label>
        {/* Tipo de Comunicación */}
        <label style={styles.label}>
            <strong>Tipo de Comunicación Entra:</strong>
            <input type="text" id="tipoDeComunicacion" name="tipoDeComunicacion"
                value={formData.tipoDeComunicacion || ''} onChange={handleChange} style={styles.input} />
        </label>
        
        {/* Tipo Comunicación Sale */}
        <label style={styles.label}>
            <strong>Tipo Comunicación Sale:</strong>
            <input type="text" id="tipoDeComunicacionSale" name="tipoDeComunicacionSale"
                value={formData.tipoDeComunicacionSale || ''} onChange={handleChange} style={styles.input} />
        </label>
        
        {/* Estado */}
        <label style={styles.label}>
            <strong>Estado:</strong>
            <input type="text" id="estado" name="estado"
                value={formData.estado || ''} onChange={handleChange} style={styles.input} />
        </label>
        
        {/* Orden de Servicio */}
        <label style={styles.label}>
            <strong>Orden de Servicio:</strong>
            <input type="text" id="ordenDeServicio" name="ordenDeServicio"
                value={formData.ordenDeServicio || ''} onChange={handleChange} style={styles.input} />
        </label>
        
        <label style={styles.label}>
            <strong>Serie Stock:</strong>
            <input type="text" id="serieQueQuedaDeStock" name="serieQueQuedaDeStock"
                value={formData.serieQueQuedaDeStock || ''} onChange={handleChange} style={styles.input} />
        </label>
        
        <label style={styles.label}>
            <strong>SIM Stock:</strong>
            <input type="text" id="simQueQuedaDeStock" name="simQueQuedaDeStock"
                value={formData.simQueQuedaDeStock || ''} onChange={handleChange} style={styles.input} />
        </label>
        
        <label style={styles.label}>
            <strong>Modelo Stock:</strong>
            <input type="text" id="modeloDeStock" name="modeloDeStock"
                value={formData.modeloDeStock || ''} onChange={handleChange} style={styles.input} />
        </label>

        <input type="hidden" name="idServicios" value={formData.idServicios || ''} />

    </div>



    {localError && <div style={styles.error}>{localError}</div>}

    {/* Botones de Acción */}
    <div style={{ marginTop: 20, display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
        <button 
            type="button" 
            onClick={onDeleteEdit}
            style={styles.buttonDanger}
            disabled={isSubmitting}
        >
            Borrar Inventario
        </button>
        <button 
            type="button" 
            onClick={handleCancel}
            style={styles.navButton} 
            disabled={isSubmitting}
        >
            Cancelar
        </button>
        <button 
            type="button" 
            onClick={handleSave}
            style={styles.buttonPrimary} 
            disabled={isSubmitting} 
        >
            {isSubmitting ? "Guardando..." : "Guardar Cambios"}
        </button>
    </div>
</div>

          )
};

export default RenderEditarDatosAdicionales;
