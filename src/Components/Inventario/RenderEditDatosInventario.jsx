import React, { useState, useEffect } from 'react';
import './InventarioList.css';

function RenderEditDatosInventario({ data, onSave, onCancelEdit, datosEstaticos }) {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (data) {
      setFormData(data);
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
      onSave(formData);
    }
  };

  const handleCancel = () => {
    if (onCancelEdit) {
      onCancelEdit();
    }
  };

  if (!formData.titulo) {
    return <div>Cargando datos...</div>;
  }

  function FormItem({ label, name, value, onChange, type = 'text', options }) {
  return (
    <div className="formItem">
      <label htmlFor={name}><strong>{label}:</strong></label>
      {type === 'select' ? (
        <select
          id={name}
          name={name}
          value={value || ''}
          onChange={onChange}
          className="form-input"
        >
          <option value="">Selecciona una opción</option>
          {options.map(opt => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      ) : type === 'textarea' ? (
        <textarea
          id={name}
          name={name}
          value={value || ''}
          onChange={onChange}
          rows="4"
          className="form-input"
        />
      ) : (
        <input
          type={type}
          id={name}
          name={name}
          value={value || ''}
          onChange={onChange}
          className="form-input"
        />
      )}
    </div>
  );
}
  return (
    <>
    <h2>{formData.titulo}</h2>
    <div className="formGrid">
      <FormItem label="Título" name="titulo" value={formData.titulo} onChange={handleChange} />
      <FormItem label="Número de Serie" name="numeroSerie" value={formData.numeroSerie} onChange={handleChange} />
      <FormItem label="Estado" name="estado" value={formData.estado} onChange={handleChange} type="select" options={datosEstaticos.estado} />
      <FormItem label="Equipo" name="equipo" value={formData.equipo} onChange={handleChange} type="select" options={datosEstaticos.equipos} />
      <FormItem label="Responsable" name="responsable" value={formData.responsable} onChange={handleChange} />
      <FormItem label="Cliente" name="cliente" value={formData.cliente} onChange={handleChange} />
      <FormItem label="Plaza" name="plaza" value={formData.plaza} onChange={handleChange} />
      <FormItem label="Técnico de Campo" name="tecnicoCampo" value={formData.tecnicoCampo} onChange={handleChange} type="select" options={datosEstaticos.tecnicos} />
      <FormItem label="Número de Incidencia" name="numeroIncidencia" value={formData.numeroIncidencia} onChange={handleChange} />
      <FormItem label="Código de Email" name="codigoEmail" value={formData.codigoEmail} onChange={handleChange} />
      <FormItem label="Guías" name="guias" value={formData.guias} onChange={handleChange} />
      <FormItem label="Fecha de Inicio Prevista" name="fechaInicioPrevista" value={formData.fechaInicioPrevista} onChange={handleChange} type="date" />
      <FormItem label="Fecha de Fin Prevista" name="fechaFinPrevista" value={formData.fechaFinPrevista} onChange={handleChange} type="date" />
      <FormItem label="Fecha de Fin" name="fechaFin" value={formData.fechaFin} onChange={handleChange} type="date" />
      <FormItem label="Última Actualización" name="fechaActualizacion" value={formData.fechaActualizacion} onChange={handleChange} type="date" />
    </div>

    <div className="fullWidthSection">
      <FormItem label="Descripción" name="descripcion" value={formData.descripcion} onChange={handleChange} type="textarea" />
    </div>

    <div className="formActionsCompact">
        <button className="action-button save-button">Guardar cambios</button>
        <button className="action-button cancel-button" onClick={handleCancel}>Cancelar</button>
      </div>
</>
  );
}

export default RenderEditDatosInventario;