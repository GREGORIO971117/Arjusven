import React, { useState, useEffect } from 'react';
const RenderEditarDatosAdicionales = ({ data, onCancelEdit }) => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (data?.additionalData) {
      setFormData(data.additionalData);
    }
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCancel = () => {
    if (onCancelEdit) onCancelEdit();
  };

  const handleSave = () => {
    // Aquí podrías enviar formData al backend con fetch o axios
    console.log('Datos guardados:', formData);
  };

  const FormField = ({ label, name }) => (
    <div className="formFieldCompact">
      <label htmlFor={name}><strong>{label}:</strong></label>
      <input
        type="text"
        id={name}
        name={name}
        value={formData[name] || ''}
        onChange={handleChange}
        className="form-input"
      />
    </div>
  );

  if (!formData) return <div>Cargando datos...</div>;
  return (
    <div className="formGridContainer">
      <div className="grid3">
        <FormField label="Ciudad" name="ciudad" />
        <FormField label="Plaza" name="plaza" />
        <FormField label="Técnico" name="tecnico" />
        <FormField label="Cerro en Punto Clave" name="cerroPuntoClave" />
        <FormField label="Atención en Punto" name="atencionEnPunto" />
        <FormField label="Firma en Estación" name="firmaEnEstacion" />
        <FormField label="#Tarjeta / TAG" name="tarjetaTag" />
        <FormField label="Cantidad TPV en Base" name="cantidadTPV" />
        <FormField label="Modelo" name="modeloEntra" />
        <FormField label="Marca" name="marcaEntra" />
        <FormField label="Serie Lógica" name="serieLogicaEntra" />
        <FormField label="Serie Física" name="serieFisicaEntra" />
        <FormField label="SIM" name="simEntra" />
        <FormField label="PTID" name="ptidEntra" />
        <FormField label="Eliminador" name="eliminadorEntra" />
      </div>

      {formData.modeloSale !== "NO APLICA" && (
        <div className="grid3">
          <FormField label="Modelo Sale" name="modeloSale" />
          <FormField label="Marca Sale" name="marcaSale" />
          <FormField label="Serie Lógica Sale" name="serieLogicaSale" />
          <FormField label="Serie Física Sale" name="serieFisicaSale" />
          <FormField label="SIM Sale" name="simSale" />
          <FormField label="PTID Sale" name="ptidSale" />
          <FormField label="Eliminador Sale" name="eliminadorSale" />
        </div>
      )}

      <div className="grid3">
        <FormField label="Versión Browser" name="versionBrowser" />
        <FormField label="Versión Browser Sale" name="versionBrowserSale" />
        <FormField label="Tipo de Comunicación" name="tipoComunicacion" />
        <FormField label="Tipo Comunicación Sale" name="tipoComunicacionSale" />
        <FormField label="Estado" name="estado" />
        <FormField label="Orden de Servicio" name="ordenDeServicio" />
        <FormField label="Serie Stock" name="serieStock" />
        <FormField label="SIM Stock" name="simStock" />
        <FormField label="Modelo Stock" name="modeloStock" />
      </div>

      <div className="formActionsCompact">
        <button className="action-button save-button" onClick={handleSave}>Guardar</button>
        <button className="action-button cancel-button" onClick={handleCancel}>Cancelar</button>
      </div>
    </div>
  );
};

export default RenderEditarDatosAdicionales;
