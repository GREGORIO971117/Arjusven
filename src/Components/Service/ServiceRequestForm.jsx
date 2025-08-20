import React, { useState } from 'react';
import './Form.css'; 

function ServiceRequestForm() {
  const [formData, setFormData] = useState({
    assignmentDate: '',
    resolution: '',
    currentStatus: '',
    essName: '',
    caseNumber: '',
    affiliateCode: '',
    affiliation: '',
    atpvAffiliate: '',
    atpvID: '',
    serviceReason: '',

    relatedContract: '',
    client: '',
    contactPersonCreator: '',
    contactPersonSupervisor: '',
    serviceType: '',
    fieldTechnician: '',
    sla: '',
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

    console.log('Datos de Solicitud de Servicio a enviar:', formData);
    alert('Formulario de Solicitud de Servicio enviado');
  };

  return (
    <div className="form-container">
      <h2>Agregar Datos de Solicitud de Servicio</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-section">
          <h3>Detalles de la Solicitud</h3>
          <div className="form-group">
            <label>Fecha de Asignación</label>
            <input type="text" name="assignmentDate" value={formData.assignmentDate} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Resolución</label>
            <input type="text" name="resolution" value={formData.resolution} onChange={handleChange} />
          </div>
          {/* Añade el resto de los campos de la sección de Solicitud */}
          {/* ... */}
        </div>
        
        <div className="form-section">
          <h3>Información de Contacto y Contrato</h3>
          <div className="form-group">
            <label>Contrato relacionado</label>
            <input type="text" name="relatedContract" value={formData.relatedContract} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Cliente</label>
            <input type="text" name="client" value={formData.client} onChange={handleChange} />
          </div>
          {/* Añade el resto de los campos de la sección de Contacto */}
          {/* ... */}
        </div>

        <button type="submit" className="submit-button">Guardar Solicitud</button>
      </form>
    </div>
  );
}

export default ServiceRequestForm;