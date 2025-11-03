import React, { useState, useEffect } from 'react';

function RenderEditDatosInventario({ data, onCancelEdit, datosEstaticos }) {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (data?.servicio) {
      setFormData(data?.servicio);
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
    console.log('Datos guardados:', formData);
  };

if (!formData) {
  return <div>Cargando datos...</div>;
}

return (

  
  <div className="formGridContainer">

    <div className="grid3">
      {/* Título */}
      <div className="formFieldCompact">
        <label htmlFor="title"><strong>Título:</strong></label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title || ''}
          onChange={handleChange}
          className="form-input"
        />
      </div>

      {/* Número de Serie */}
      <div className="formFieldCompact">
        <label htmlFor="numeroSerie"><strong>Número de Serie:</strong></label>
        <input
          type="text"
          id="numeroSerie"
          name="numeroSerie"
          value={formData.numeroSerie || ''}
          onChange={handleChange}
          className="form-input"
        />
      </div>

      {/* Estado (Select) */}
      <div className="formFieldCompact">
        <label htmlFor="estado"><strong>Estado:</strong></label>
        <select
          id="estado"
          name="estado"
          value={formData.estado || ''}
          onChange={handleChange}
          className="form-input"
        >
          <option value="">Selecciona una opción</option>
          {datosEstaticos.estado && datosEstaticos.estado.map(opt => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </div>

      {/* Equipo (Select) */}
      <div className="formFieldCompact">
        <label htmlFor="equipo"><strong>Equipo:</strong></label>
        <select
          id="equipo"
          name="equipo"
          value={formData.equipo || ''}
          onChange={handleChange}
          className="form-input"
        >
          <option value="">Selecciona una opción</option>
          {datosEstaticos.equipos && datosEstaticos.equipos.map(opt => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </div>

      {/* Responsable */}
      <div className="formFieldCompact">
        <label htmlFor="responsable"><strong>Responsable:</strong></label>
        <input
          type="text"
          id="responsable"
          name="responsable"
          value={formData.responsable || ''}
          onChange={handleChange}
          className="form-input"
        />
      </div>

      {/* Cliente */}
      <div className="formFieldCompact">
        <label htmlFor="cliente"><strong>Cliente:</strong></label>
        <input
          type="text"
          id="cliente"
          name="cliente"
          value={formData.cliente || ''}
          onChange={handleChange}
          className="form-input"
        />
      </div>

      {/* Plaza */}
      <div className="formFieldCompact">
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

      {/* Técnico de Campo (Select) */}
      <div className="formFieldCompact">
        <label htmlFor="tecnicoCampo"><strong>Técnico de Campo:</strong></label>
        <select
          id="tecnicoCampo"
          name="tecnicoCampo"
          value={formData.tecnicoCampo || ''}
          onChange={handleChange}
          className="form-input"
        >
          <option value="">Selecciona una opción</option>
          {datosEstaticos.tecnicos && datosEstaticos.tecnicos.map(opt => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </div>

      {/* Número de Incidencia */}
      <div className="formFieldCompact">
        <label htmlFor="numeroIncidencia"><strong>Número de Incidencia:</strong></label>
        <input
          type="text"
          id="numeroIncidencia"
          name="numeroIncidencia"
          value={formData.numeroIncidencia || ''}
          onChange={handleChange}
          className="form-input"
        />
      </div>

      {/* Código de Email */}
      <div className="formFieldCompact">
        <label htmlFor="codigoEmail"><strong>Código de Email:</strong></label>
        <input
          type="text"
          id="codigoEmail"
          name="codigoEmail"
          value={formData.codigoEmail || ''}
          onChange={handleChange}
          className="form-input"
        />
      </div>

      {/* Guías */}
      <div className="formFieldCompact">
        <label htmlFor="guias"><strong>Guías:</strong></label>
        <input
          type="text"
          id="guias"
          name="guias"
          value={formData.guias || ''}
          onChange={handleChange}
          className="form-input"
        />
      </div>

      {/* Fecha de Inicio Prevista */}
      <div className="formFieldCompact">
        <label htmlFor="fechaInicioPrevista"><strong>Fecha de Inicio Prevista:</strong></label>
        <input
          type="date"
          id="fechaInicioPrevista"
          name="fechaInicioPrevista"
          value={formData.fechaInicioPrevista || ''}
          onChange={handleChange}
          className="form-input"
        />
      </div>

      {/* Fecha de Fin Prevista */}
      <div className="formFieldCompact">
        <label htmlFor="fechaFinPrevista"><strong>Fecha de Fin Prevista:</strong></label>
        <input
          type="date"
          id="fechaFinPrevista"
          name="fechaFinPrevista"
          value={formData.fechaFinPrevista || ''}
          onChange={handleChange}
          className="form-input"
        />
      </div>

      {/* Fecha de Fin */}
      <div className="formFieldCompact">
        <label htmlFor="fechaFin"><strong>Fecha de Fin:</strong></label>
        <input
          type="date"
          id="fechaFin"
          name="fechaFin"
          value={formData.fechaFin || ''}
          onChange={handleChange}
          className="form-input"
        />
      </div>

      {/* Última Actualización */}
      <div className="formFieldCompact">
        <label htmlFor="fechaActualizacion"><strong>Última Actualización:</strong></label>
        <input
          type="date"
          id="fechaActualizacion"
          name="fechaActualizacion"
          value={formData.fechaActualizacion || ''}
          onChange={handleChange}
          className="form-input"
        />
      </div>
    </div>

    {/* Descripción (Textarea) */}
    <div className="fullWidthSection">
      <div className="formFieldCompact">
        <label htmlFor="descripcion"><strong>Descripción:</strong></label>
        <textarea
          id="descripcion"
          name="descripcion"
          value={formData.descripcion || ''}
          onChange={handleChange}
          rows="2"
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


