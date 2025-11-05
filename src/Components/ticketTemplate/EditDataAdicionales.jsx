import React, { useState, useEffect } from 'react';
const RenderEditarDatosAdicionales = ({ data, onCancelEdit,onSaveEdit }) => {
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

  <div className="formGridContainer">

            <div className="grid3">
                <div className="formFieldCompact">
                    <label htmlFor="ciudad"><strong>Ciudad:</strong></label>
                    <input type="text" id="ciudad" name="ciudad"
                           value={formData.ciudad || ''} onChange={handleChange} className="form-input" />
                </div>
           
                <div className="formFieldCompact">
                    <label htmlFor="plaza"><strong>Plaza:</strong></label>
                    <input type="text" id="plaza" name="plaza"
                           value={formData.plaza || ''} onChange={handleChange} className="form-input" />
                </div>
                <div className="formFieldCompact">
                    <label htmlFor="tecnico"><strong>Técnico:</strong></label>
                    <input type="text" id="tecnico" name="tecnico"
                           value={formData.tecnico || ''} onChange={handleChange} className="form-input" />
                </div>
                <div className="formFieldCompact">
                    <label htmlFor="cerroPuntoClave"><strong>Cerro en Punto Clave:</strong></label>
                    <input type="text" id="cerroPuntoClave" name="cerroPuntoClave"
                           value={formData.cerroPuntoClave || ''} onChange={handleChange} className="form-input" />
                </div>
                <div className="formFieldCompact">
                    <label htmlFor="atencionEnPunto"><strong>Atención en Punto:</strong></label>
                    <input type="text" id="atencionEnPunto" name="atencionEnPunto"
                           value={formData.atencionEnPunto || ''} onChange={handleChange} className="form-input" />
                </div>
                <div className="formFieldCompact">
                    <label htmlFor="firmaEnEstacion"><strong>Firma en Estación:</strong></label>
                    <input type="text" id="firmaEnEstacion" name="firmaEnEstacion"
                           value={formData.firmaEnEstacion || ''} onChange={handleChange} className="form-input" />
                </div>
                <div className="formFieldCompact">
                    <label htmlFor="tarjetaTag"><strong>#Tarjeta / TAG:</strong></label>
                    <input type="text" id="tarjetaTag" name="tarjetaTag"
                           value={formData.tarjetaTag || ''} onChange={handleChange} className="form-input" />
                </div>
                <div className="formFieldCompact">
                    <label htmlFor="cantidadTPV"><strong>Cantidad TPV en Base:</strong></label>
                    <input type="number" id="cantidadTPV" name="cantidadTPV"
                           value={formData.cantidadTPV || ''} onChange={handleChange} className="form-input" />
                </div>
                <div className="formFieldCompact">
                    <label htmlFor="modeloEntra"><strong>Modelo:</strong></label>
                    <input type="text" id="modeloEntra" name="modeloEntra"
                           value={formData.modeloEntra || ''} onChange={handleChange} className="form-input" />
                </div>
                <div className="formFieldCompact">
                    <label htmlFor="marcaEntra"><strong>Marca:</strong></label>
                    <input type="text" id="marcaEntra" name="marcaEntra"
                           value={formData.marcaEntra || ''} onChange={handleChange} className="form-input" />
                </div>
                <div className="formFieldCompact">
                    <label htmlFor="serieLogicaEntra"><strong>Serie Lógica:</strong></label>
                    <input type="text" id="serieLogicaEntra" name="serieLogicaEntra"
                           value={formData.serieLogicaEntra || ''} onChange={handleChange} className="form-input" />
                </div>
                <div className="formFieldCompact">
                    <label htmlFor="serieFisicaEntra"><strong>Serie Física:</strong></label>
                    <input type="text" id="serieFisicaEntra" name="serieFisicaEntra"
                           value={formData.serieFisicaEntra || ''} onChange={handleChange} className="form-input" />
                </div>
                <div className="formFieldCompact">
                    <label htmlFor="simEntra"><strong>SIM:</strong></label>
                    <input type="text" id="simEntra" name="simEntra"
                           value={formData.simEntra || ''} onChange={handleChange} className="form-input" />
                </div>
                <div className="formFieldCompact">
                    <label htmlFor="ptidEntra"><strong>PTID:</strong></label>
                    <input type="text" id="ptidEntra" name="ptidEntra"
                           value={formData.ptidEntra || ''} onChange={handleChange} className="form-input" />
                </div>
                <div className="formFieldCompact">
                    <label htmlFor="eliminadorEntra"><strong>Eliminador:</strong></label>
                    <input type="text" id="eliminadorEntra" name="eliminadorEntra"
                           value={formData.eliminadorEntra || ''} onChange={handleChange} className="form-input" />
                </div>
            </div>

          
                <div className="grid3">
                    <div className="formFieldCompact">
                        <label htmlFor="modeloSale"><strong>Modelo Sale:</strong></label>
                        <input type="text" id="modeloSale" name="modeloSale"
                               value={formData.modeloSale || ''} onChange={handleChange} className="form-input" />
                    </div>
                    <div className="formFieldCompact">
                        <label htmlFor="marcaSale"><strong>Marca Sale:</strong></label>
                        <input type="text" id="marcaSale" name="marcaSale"
                               value={formData.marcaSale || ''} onChange={handleChange} className="form-input" />
                    </div>
                    <div className="formFieldCompact">
                        <label htmlFor="serieLogicaSale"><strong>Serie Lógica Sale:</strong></label>
                        <input type="text" id="serieLogicaSale" name="serieLogicaSale"
                               value={formData.serieLogicaSale || ''} onChange={handleChange} className="form-input" />
                    </div>
                    <div className="formFieldCompact">
                        <label htmlFor="serieFisicaSale"><strong>Serie Física Sale:</strong></label>
                        <input type="text" id="serieFisicaSale" name="serieFisicaSale"
                               value={formData.serieFisicaSale || ''} onChange={handleChange} className="form-input" />
                    </div>
                    <div className="formFieldCompact">
                        <label htmlFor="simSale"><strong>SIM Sale:</strong></label>
                        <input type="text" id="simSale" name="simSale"
                               value={formData.simSale || ''} onChange={handleChange} className="form-input" />
                    </div>
                    <div className="formFieldCompact">
                        <label htmlFor="ptidSale"><strong>PTID Sale:</strong></label>
                        <input type="text" id="ptidSale" name="ptidSale"
                               value={formData.ptidSale || ''} onChange={handleChange} className="form-input" />
                    </div>
                    <div className="formFieldCompact">
                        <label htmlFor="eliminadorSale"><strong>Eliminador Sale:</strong></label>
                        <input type="text" id="eliminadorSale" name="eliminadorSale"
                               value={formData.eliminadorSale || ''} onChange={handleChange} className="form-input" />
                    </div>
                </div>
         

            <div className="grid3">
                <div className="formFieldCompact">
                    <label htmlFor="versionBrowser"><strong>Versión Browser:</strong></label>
                    <input type="text" id="versionBrowser" name="versionBrowser"
                           value={formData.versionBrowser || ''} onChange={handleChange} className="form-input" />
                </div>
                <div className="formFieldCompact">
                    <label htmlFor="versionBrowserSale"><strong>Versión Browser Sale:</strong></label>
                    <input type="text" id="versionBrowserSale" name="versionBrowserSale"
                           value={formData.versionBrowserSale || ''} onChange={handleChange} className="form-input" />
                </div>
                <div className="formFieldCompact">
                    <label htmlFor="tipoComunicacion"><strong>Tipo de Comunicación:</strong></label>
                    <input type="text" id="tipoComunicacion" name="tipoComunicacion"
                           value={formData.tipoComunicacion || ''} onChange={handleChange} className="form-input" />
                </div>
                <div className="formFieldCompact">
                    <label htmlFor="tipoComunicacionSale"><strong>Tipo Comunicación Sale:</strong></label>
                    <input type="text" id="tipoComunicacionSale" name="tipoComunicacionSale"
                           value={formData.tipoComunicacionSale || ''} onChange={handleChange} className="form-input" />
                </div>
                <div className="formFieldCompact">
                    <label htmlFor="estado"><strong>Estado:</strong></label>
                    <input type="text" id="estado" name="estado"
                           value={formData.estado || ''} onChange={handleChange} className="form-input" />
                </div>
                <div className="formFieldCompact">
                    <label htmlFor="ordenDeServicio"><strong>Orden de Servicio:</strong></label>
                    <input type="text" id="ordenDeServicio" name="ordenDeServicio"
                           value={formData.ordenDeServicio || ''} onChange={handleChange} className="form-input" />
                </div>
                <div className="formFieldCompact">
                    <label htmlFor="serieStock"><strong>Serie Stock:</strong></label>
                    <input type="text" id="serieStock" name="serieStock"
                           value={formData.serieStock || ''} onChange={handleChange} className="form-input" />
                </div>
                <div className="formFieldCompact">
                    <label htmlFor="simStock"><strong>SIM Stock:</strong></label>
                    <input type="text" id="simStock" name="simStock"
                           value={formData.simStock || ''} onChange={handleChange} className="form-input" />
                </div>
                <div className="formFieldCompact">
                    <label htmlFor="modeloStock"><strong>Modelo Stock:</strong></label>
                    <input type="text" id="modeloStock" name="modeloStock"
                           value={formData.modeloStock || ''} onChange={handleChange} className="form-input" />
                </div>

                <input type="hidden" name="idServicios" value={formData.idServicios || ''} />
            </div>

            {localError && <div className="error-message" style={{ color: 'red' }}>{localError}</div>}

            <div className="formActionsCompact">
                <button 
                    className="action-button save-button" 
                    onClick={handleSave}
                                  >
                    {isSubmitting ? "Guardando..." : "Guardar Cambios"}
                </button>
                <button 
                    className="action-button cancel-button" 
                    onClick={handleCancel}
                                  >
                    Cancelar
                </button>
            </div>
  </div>

          )
};

export default RenderEditarDatosAdicionales;
