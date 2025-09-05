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

  return (
    <div className="inventario-template-container">
      <div className="inventario-details-card">
        <h2 className="title">Editar Artículo de Inventario</h2>
        
        {/* Sección de campos de edición en dos columnas */}
        <div className="infoSection">
          <div className="infoColumn">
            {/* Campo de Título */}
            <div className="infoItem">
              <label htmlFor="titulo"><strong>Título:</strong></label>
              <input
                type="text"
                id="titulo"
                name="titulo"
                value={formData.titulo || ''}
                onChange={handleChange}
                className="form-input"
              />
            </div>
            {/* Campo de Número de Serie */}
            <div className="infoItem">
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
            {/* Campo de Estado */}
            <div className="infoItem">
              <label htmlFor="estado"><strong>Estado:</strong></label>
              <select
                id="estado"
                name="estado"
                value={formData.estado || ''}
                onChange={handleChange}
                className="form-input"
              >
                <option value="">Selecciona un estado</option>
                {datosEstaticos.estado.map(estado => (
                  <option key={estado} value={estado}>{estado}</option>
                ))}
              </select>
            </div>
            {/* Campo de Equipo */}
            <div className="infoItem">
              <label htmlFor="equipo"><strong>Equipo:</strong></label>
              <select
                id="equipo"
                name="equipo"
                value={formData.equipo || ''}
                onChange={handleChange}
                className="form-input"
              >
                <option value="">Selecciona un equipo</option>
                {datosEstaticos.equipos.map(equipo => (
                  <option key={equipo} value={equipo}>{equipo}</option>
                ))}
              </select>
            </div>
            {/* Campo de Responsable */}
            <div className="infoItem">
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
            {/* Campo de Cliente */}
            <div className="infoItem">
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
          </div>
          
          <div className="infoColumn">
            {/* Campo de Técnico de Campo */}
            <div className="infoItem">
              <label htmlFor="tecnicoCampo"><strong>Técnico de Campo:</strong></label>
              <select
                id="tecnicoCampo"
                name="tecnicoCampo"
                value={formData.tecnicoCampo || ''}
                onChange={handleChange}
                className="form-input"
              >
                <option value="">Selecciona el tecnico</option>
                {datosEstaticos.tecnicos.map(tecnico => (
                  <option key={tecnico} value={tecnico}>{tecnico}</option>
                ))}
              </select>
            </div>
            {/* Campo de Número de Incidencia */}
            <div className="infoItem">
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
            {/* Campo de Código de Email */}
            <div className="infoItem">
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
            {/* Campo de Guías */}
            <div className="infoItem">
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
            {/* Campo de Fecha de Inicio Prevista */}
            <div className="infoItem">
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
            {/* Campo de Fecha de Fin Prevista */}
            <div className="infoItem">
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
            {/* Campo de Fecha de Fin */}
            <div className="infoItem">
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
            {/* Campo de Última Actualización */}
            <div className="infoItem">
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
        </div>
        
        {/* Sección de descripción de ancho completo */}
        <div className="fullWidthSection">
          <div className="infoItem">
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

        <div className="button-container">
          <button onClick={handleSave} className="action-button save-button">
            Guardar Cambios
          </button>
          <button onClick={handleCancel} className="action-button cancel-button">
            Cancelar 
          </button>
        </div>
      </div>
    </div>
  );
}

export default RenderEditDatosInventario;