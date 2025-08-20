import React, { useState } from 'react';
import './Form.css';

function AdditionalDataForm() {
  const [formData, setFormData] = useState({
    ciudad: '',
    cantidadTPV: '',
    modeloEntra: '',
    // Añade el resto de los campos del formulario
    // ...
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para enviar los datos al backend
    console.log('Datos Adicionales a enviar:', formData);
    alert('Formulario de Datos Adicionales enviado');
  };

  return (
    <div className="form-container">
      <h2>Agregar Datos Adicionales</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-section">
          <h3>Detalles de Inventario</h3>
          <div className="form-group">
            <label>Ciudad</label>
            <input type="text" name="ciudad" value={formData.ciudad} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Cantidad TPV en Base</label>
            <input type="number" name="cantidadTPV" value={formData.cantidadTPV} onChange={handleChange} />
          </div>
          {/* Añade el resto de los campos de la sección de Inventario */}
          {/* ... */}
        </div>

        <button type="submit" className="submit-button">Guardar Datos Adicionales</button>
      </form>
    </div>
  );
}

export default AdditionalDataForm;