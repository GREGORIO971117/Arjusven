import React, { useState, useEffect } from 'react';
import './ticketList.css';

const RenderEditarDatosAdicionales = ({ data, onSave, onCancelEdit, datosEstaticos }) => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (data && data.additionalData) {
      setFormData(data.additionalData);
    }
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSave = () => {
    if (onSave) {
      onSave({ ...data, additionalData: formData });
    }
  };

  const handleCancel = () => {
    if (onCancelEdit) {
      onCancelEdit();
    }
  };

  if (!formData) {
    return <div>Cargando datos...</div>;
  }

  return (
    <div className="inventario-template-container">
      <div className="inventario-details-card">
        <h2 className="title">Editar Datos Adicionales</h2>

        {/* Sección de campos de edición en dos columnas */}
        <div className="infoSection">
          <div className="infoColumn">
            {/* Campo de Ciudad */}
            <div className="infoItem">
              <label htmlFor="ciudad"><strong>Ciudad:</strong></label>
              <input
                type="text"
                id="ciudad"
                name="ciudad"
                value={formData.ciudad || ''}
                onChange={handleChange}
                className="form-input"
              />
            </div>
            {/* Campo de Cantidad TPV en Base */}
            <div className="infoItem">
              <label htmlFor="cantidadTPV"><strong>Cantidad TPV en Base:</strong></label>
              <input
                type="text"
                id="cantidadTPV"
                name="cantidadTPV"
                value={formData.cantidadTPV || ''}
                onChange={handleChange}
                className="form-input"
              />
            </div>
            {/* Campo de Modelo entra */}
            <div className="infoItem">
              <label htmlFor="modeloEntra"><strong>Modelo entra:</strong></label>
              <input
                type="text"
                id="modeloEntra"
                name="modeloEntra"
                value={formData.modeloEntra || ''}
                onChange={handleChange}
                className="form-input"
              />
            </div>
            {/* Campo de Marca Entra */}
            <div className="infoItem">
              <label htmlFor="marcaEntra"><strong>Marca Entra:</strong></label>
              <input
                type="text"
                id="marcaEntra"
                name="marcaEntra"
                value={formData.marcaEntra || ''}
                onChange={handleChange}
                className="form-input"
              />
            </div>
            {/* Campo de Serie Lógica entra */}
            <div className="infoItem">
              <label htmlFor="serieLogicaEntra"><strong>Serie Lógica entra:</strong></label>
              <input
                type="text"
                id="serieLogicaEntra"
                name="serieLogicaEntra"
                value={formData.serieLogicaEntra || ''}
                onChange={handleChange}
                className="form-input"
              />
            </div>
            {/* Campo de Serie Física entra */}
            <div className="infoItem">
              <label htmlFor="serieFisicaEntra"><strong>Serie Física entra:</strong></label>
              <input
                type="text"
                id="serieFisicaEntra"
                name="serieFisicaEntra"
                value={formData.serieFisicaEntra || ''}
                onChange={handleChange}
                className="form-input"
              />
            </div>
            {/* Campo de Versión Browser */}
            <div className="infoItem">
              <label htmlFor="versionBrowser"><strong>Versión Browser:</strong></label>
              <input
                type="text"
                id="versionBrowser"
                name="versionBrowser"
                value={formData.versionBrowser || ''}
                onChange={handleChange}
                className="form-input"
              />
            </div>
            {/* Campo de Tipo de Comunicación */}
            <div className="infoItem">
              <label htmlFor="tipoComunicacion"><strong>Tipo de Comunicación:</strong></label>
              <input
                type="text"
                id="tipoComunicacion"
                name="tipoComunicacion"
                value={formData.tipoComunicacion || ''}
                onChange={handleChange}
                className="form-input"
              />
            </div>
            {/* Campo de SIM entra */}
            <div className="infoItem">
              <label htmlFor="simEntra"><strong>SIM entra:</strong></label>
              <input
                type="text"
                id="simEntra"
                name="simEntra"
                value={formData.simEntra || ''}
                onChange={handleChange}
                className="form-input"
              />
            </div>
            {/* Campo de PTID entra */}
            <div className="infoItem">
              <label htmlFor="ptidEntra"><strong>PTID entra:</strong></label>
              <input
                type="text"
                id="ptidEntra"
                name="ptidEntra"
                value={formData.ptidEntra || ''}
                onChange={handleChange}
                className="form-input"
              />
            </div>
            {/* Campo de Eliminador Entra */}
            <div className="infoItem">
              <label htmlFor="eliminadorEntra"><strong>Eliminador Entra:</strong></label>
              <input
                type="text"
                id="eliminadorEntra"
                name="eliminadorEntra"
                value={formData.eliminadorEntra || ''}
                onChange={handleChange}
                className="form-input"
              />
            </div>
            {/* Campo de Eliminador Sale */}
            <div className="infoItem">
              <label htmlFor="eliminadorSale"><strong>Eliminador Sale:</strong></label>
              <input
                type="text"
                id="eliminadorSale"
                name="eliminadorSale"
                value={formData.eliminadorSale || ''}
                onChange={handleChange}
                className="form-input"
              />
            </div>
            {/* Campo de Estado */}
            <div className="infoItem">
              <label htmlFor="estado"><strong>Estado:</strong></label>
              <input
                type="text"
                id="estado"
                name="estado"
                value={formData.estado || ''}
                onChange={handleChange}
                className="form-input"
              />
            </div>
            {/* Campo de Orden de Servicio */}
            <div className="infoItem">
              <label htmlFor="ordenDeServicio"><strong>Orden de Servicio:</strong></label>
              <input
                type="text"
                id="ordenDeServicio"
                name="ordenDeServicio"
                value={formData.ordenDeServicio || ''}
                onChange={handleChange}
                className="form-input"
              />
            </div>
          </div>
          
          <div className="infoColumn">
            {/* Campo de Modelo Sale */}
            <div className="infoItem">
              <label htmlFor="modeloSale"><strong>Modelo Sale:</strong></label>
              <input
                type="text"
                id="modeloSale"
                name="modeloSale"
                value={formData.modeloSale || ''}
                onChange={handleChange}
                className="form-input"
              />
            </div>
            {/* Campo de Marca Sale */}
            <div className="infoItem">
              <label htmlFor="marcaSale"><strong>Marca Sale:</strong></label>
              <input
                type="text"
                id="marcaSale"
                name="marcaSale"
                value={formData.marcaSale || ''}
                onChange={handleChange}
                className="form-input"
              />
            </div>
            {/* Campo de Serie Lógica sale */}
            <div className="infoItem">
              <label htmlFor="serieLogicaSale"><strong>Serie Lógica sale:</strong></label>
              <input
                type="text"
                id="serieLogicaSale"
                name="serieLogicaSale"
                value={formData.serieLogicaSale || ''}
                onChange={handleChange}
                className="form-input"
              />
            </div>
            {/* Campo de Serie Física sale */}
            <div className="infoItem">
              <label htmlFor="serieFisicaSale"><strong>Serie Física sale:</strong></label>
              <input
                type="text"
                id="serieFisicaSale"
                name="serieFisicaSale"
                value={formData.serieFisicaSale || ''}
                onChange={handleChange}
                className="form-input"
              />
            </div>
            {/* Campo de Versión Browser Sale */}
            <div className="infoItem">
              <label htmlFor="versionBrowserSale"><strong>Versión Browser Sale:</strong></label>
              <input
                type="text"
                id="versionBrowserSale"
                name="versionBrowserSale"
                value={formData.versionBrowserSale || ''}
                onChange={handleChange}
                className="form-input"
              />
            </div>
            {/* Campo de Tipo de Comunicación Sale */}
            <div className="infoItem">
              <label htmlFor="tipoComunicacionSale"><strong>Tipo de Comunicación Sale:</strong></label>
              <input
                type="text"
                id="tipoComunicacionSale"
                name="tipoComunicacionSale"
                value={formData.tipoComunicacionSale || ''}
                onChange={handleChange}
                className="form-input"
              />
            </div>
            {/* Campo de SIM Sale */}
            <div className="infoItem">
              <label htmlFor="simSale"><strong>SIM Sale:</strong></label>
              <input
                type="text"
                id="simSale"
                name="simSale"
                value={formData.simSale || ''}
                onChange={handleChange}
                className="form-input"
              />
            </div>
            {/* Campo de PTID Sale */}
            <div className="infoItem">
              <label htmlFor="ptidSale"><strong>PTID Sale:</strong></label>
              <input
                type="text"
                id="ptidSale"
                name="ptidSale"
                value={formData.ptidSale || ''}
                onChange={handleChange}
                className="form-input"
              />
            </div>
            {/* Campo de Plaza */}
            <div className="infoItem">
              <label htmlFor="plaza"><strong>Plaza:</strong></label>
              <input
                type="text"
                id="plaza"
                name="plaza"
                value={formData.plaza || ''}
                onChange={handleChange}
                className="form-input"
              />
            </div>
            {/* Campo de Técnico */}
            <div className="infoItem">
              <label htmlFor="tecnico"><strong>Técnico:</strong></label>
              <input
                type="text"
                id="tecnico"
                name="tecnico"
                value={formData.tecnico || ''}
                onChange={handleChange}
                className="form-input"
              />
            </div>
            {/* Campo de Cerro en Punto Clave */}
            <div className="infoItem">
              <label htmlFor="cerroPuntoClave"><strong>Cerro en Punto Clave:</strong></label>
              <input
                type="text"
                id="cerroPuntoClave"
                name="cerroPuntoClave"
                value={formData.cerroPuntoClave || ''}
                onChange={handleChange}
                className="form-input"
              />
            </div>
            {/* Campo de Atención en Punto */}
            <div className="infoItem">
              <label htmlFor="atencionEnPunto"><strong>Atención en Punto:</strong></label>
              <input
                type="text"
                id="atencionEnPunto"
                name="atencionEnPunto"
                value={formData.atencionEnPunto || ''}
                onChange={handleChange}
                className="form-input"
              />
            </div>
            {/* Campo de Firma en Estación */}
            <div className="infoItem">
              <label htmlFor="firmaEnEstacion"><strong>Firma en Estación:</strong></label>
              <input
                type="text"
                id="firmaEnEstacion"
                name="firmaEnEstacion"
                value={formData.firmaEnEstacion || ''}
                onChange={handleChange}
                className="form-input"
              />
            </div>
            {/* Campo de #Tarjeta / TAG */}
            <div className="infoItem">
              <label htmlFor="tarjetaTag"><strong>#Tarjeta / TAG:</strong></label>
              <input
                type="text"
                id="tarjetaTag"
                name="tarjetaTag"
                value={formData.tarjetaTag || ''}
                onChange={handleChange}
                className="form-input"
              />
            </div>
          </div>
        </div>

        {/* Sección de INVENTARIO de ancho completo */}
        <div className="fullWidthSection">
          <h3>INVENTARIO</h3>
          <div className="infoItem">
            <label htmlFor="serieStock"><strong>Serie que queda de stock:</strong></label>
            <input
              type="text"
              id="serieStock"
              name="serieStock"
              value={formData.serieStock || ''}
              onChange={handleChange}
              className="form-input"
            />
          </div>
          <div className="infoItem">
            <label htmlFor="simStock"><strong>SIM que queda de stock:</strong></label>
            <input
              type="text"
              id="simStock"
              name="simStock"
              value={formData.simStock || ''}
              onChange={handleChange}
              className="form-input"
            />
          </div>
          <div className="infoItem">
            <label htmlFor="modeloStock"><strong>Modelo de Stock:</strong></label>
            <input
              type="text"
              id="modeloStock"
              name="modeloStock"
              value={formData.modeloStock || ''}
              onChange={handleChange}
              className="form-input"
            />
          </div>
        </div>

        <div className="button-container">
          <button onClick={handleSave} className="action-button save-button">
            Guardar Cambios
          </button>
          <button className="cancel-button" onClick={handleCancel}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default RenderEditarDatosAdicionales;