import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import './Form.css';

function ServiceRequestForm() {
  const [file, setFile] = useState(null);
  const [jsonData, setJsonData] = useState([]);
  const [showModal, setShowModal] = useState(false); 
  const Fecha = new Date().toLocaleDateString();
  const Super=["Sin asignar","David","Eduardo"];
  
  useEffect(() => {
    if (jsonData.length > 0) {
      cambiarEncabezados();
    }
  }, [jsonData]);

  const cambiarEncabezados = () => {
    const JsonDataNew = jsonData.map(item => ({
      "Incidencia": item.__EMPTY_2,
      "Aplicación , Prioridad ": item.__EMPTY_3,
      "Modelo Reportado": item.__EMPTY_4,
      "Teléfono": item.__EMPTY_5,
      "Insumo a enviar": item.__EMPTY_6,
      "Serie reportada": item.__EMPTY_7,
      "Afiliado": item.__EMPTY_8,
      "Afiliado ATPV": item.__EMPTY_9,
      "ID Merchant": item.__EMPTY_10,
      "ID ATPV ": item.__EMPTY_11,
      "Nombre Afiliado": item.__EMPTY_12,
      "Detalle": item.__EMPTY_13,
      "Observaciones": item.__EMPTY_14,
      "currentStatus": "Abierto",
      "currentDate":Fecha,
      "supervisor":Super[0],
    }));
    
    // Guardamos los datos con los nuevos encabezados en localStorage.
    try {
      JsonDataNew.splice(0,0);
      JsonDataNew.splice(0,1);
      JsonDataNew.splice(0,2);
      localStorage.setItem('excelData', JSON.stringify(JsonDataNew));
      console.log('Datos con nuevos encabezados guardados en localStorage:', JsonDataNew);
      setShowModal(true); // Mostrar el modal al tener éxito
      setTimeout(() => {
        setShowModal(false); // Ocultar el modal automáticamente después de 3 segundos
      }, 3000);
    } catch (error) {
      console.error('Error al guardar en localStorage:', error);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      convertExcelToJson(selectedFile);
    }
  };

  const convertExcelToJson = (excelFile) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const fileContent = event.target.result;
      const workbook = XLSX.read(fileContent, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonOutput = XLSX.utils.sheet_to_json(worksheet, { header: 7 }); 
      setJsonData(jsonOutput);
    };
    reader.readAsBinaryString(excelFile);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <label htmlFor="file-upload" className="custom-file-upload">
        Seleccionar Archivo de Excel
      </label>
      <input id="file-upload" type="file" accept=".xlsx, .xls" onChange={handleFileChange} />
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <span className="close-button" onClick={handleCloseModal}>&times;</span>
            <div className="modal-icon">✅</div>
            <h2>¡Archivo cargado con éxito!</h2>
            <p>Los datos han sido procesados y guardados correctamente.</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default ServiceRequestForm;