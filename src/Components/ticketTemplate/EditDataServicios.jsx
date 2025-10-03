import React, { useState, useEffect } from 'react';

function RenderEditDatosInventario({ data, onSave, onCancelEdit, datosEstaticos }) {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (data) {
      setFormData(data);
    }
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (onSave) onSave(formData);
  };

  const handleCancel = () => {
    if (onCancelEdit) onCancelEdit();
  };

  const FormField = ({ label, name, type = 'text', options }) => (
    <div className="formFieldCompact">
      <label htmlFor={name}><strong>{label}:</strong></label>
      {type === 'select' ? (
        <select
          id={name}
          name={name}
          value={formData[name] || ''}
          onChange={handleChange}
          className="form-input"
        >
          <option value="">Selecciona una opción</option>
          {options.map(opt => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          id={name}
          name={name}
          value={formData[name] || ''}
          onChange={handleChange}
          className="form-input"
        />
      )}
    </div>
  );

  if (!formData.ticketNumber) return <div>Cargando datos...</div>;

  return (
    <div className="formGridContainer">

      <div className="grid3">
        <FormField label="Título" name="ticketNumber" />
        <FormField label="Número de Serie" name="numeroSerie" />
        <FormField label="Estado" name="estado" type="select" options={datosEstaticos.estado} />
        <FormField label="Equipo" name="equipo" type="select" options={datosEstaticos.equipos} />
        <FormField label="Responsable" name="responsable" />
        <FormField label="Cliente" name="cliente" />
        <FormField label="Plaza" name="plaza" />
        <FormField label="Técnico de Campo" name="tecnicoCampo" type="select" options={datosEstaticos.tecnicos} />
        <FormField label="Número de Incidencia" name="numeroIncidencia" />
        <FormField label="Código de Email" name="codigoEmail" />
        <FormField label="Guías" name="guias" />
        <FormField label="Fecha de Inicio Prevista" name="fechaInicioPrevista" type="date" />
        <FormField label="Fecha de Fin Prevista" name="fechaFinPrevista" type="date" />
        <FormField label="Fecha de Fin" name="fechaFin" type="date" />
        <FormField label="Última Actualización" name="fechaActualizacion" type="date" />
      </div>

      <div className="fullWidthSection">
        <div className="formFieldCompact">
          <label htmlFor="descripcion"><strong>Descripción:</strong></label>
          <textarea
            id="descripcion"
            name="descripcion"
            value={formData.descripcion || ''}
            onChange={handleChange}
            rows="4"
            className="form-input"
          />
        </div>
      </div>

      <div className="formActionsCompact">
        <button className="action-button save-button" onClick={handleSave}>Guardar Cambios</button>
        <button className="action-button cancel-button" onClick={handleCancel}>Cancelar</button>
      </div>
    </div>
  );
}

export default RenderEditDatosInventario;
