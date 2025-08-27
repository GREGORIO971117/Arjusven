import React from 'react';
import './TicketTemplate.css';

const RenderEditarDatosAdicionales = ({ editableData, handleInputChange, handleSave, handleCancel }) => {
  return (
    <div className="edit-form-container">
      <div className="info-section">
        <div className="info-column">
          <label>
            <strong>Ciudad</strong>
            <input
              type="text"
              value={editableData.additionalData?.ciudad || ''}
              onChange={(e) => handleInputChange('additionalData', 'ciudad', e.target.value)}
            />
          </label>
          <label>
            <strong>Cantidad TPV en Base</strong>
            <input
              type="text"
              value={editableData.additionalData?.cantidadTPV || ''}
              onChange={(e) => handleInputChange('additionalData', 'cantidadTPV', e.target.value)}
            />
          </label>
          <label>
            <strong>Modelo entra</strong>
            <input
              type="text"
              value={editableData.additionalData?.modeloEntra || ''}
              onChange={(e) => handleInputChange('additionalData', 'modeloEntra', e.target.value)}
            />
          </label>
          <label>
            <strong>Marca Entra</strong>
            <input
              type="text"
              value={editableData.additionalData?.marcaEntra || ''}
              onChange={(e) => handleInputChange('additionalData', 'marcaEntra', e.target.value)}
            />
          </label>
          <label>
            <strong>Serie Lógica entra</strong>
            <input
              type="text"
              value={editableData.additionalData?.serieLogicaEntra || ''}
              onChange={(e) => handleInputChange('additionalData', 'serieLogicaEntra', e.target.value)}
            />
          </label>
          <label>
            <strong>Serie Física entra</strong>
            <input
              type="text"
              value={editableData.additionalData?.serieFisicaEntra || ''}
              onChange={(e) => handleInputChange('additionalData', 'serieFisicaEntra', e.target.value)}
            />
          </label>
          <label>
            <strong>Versión Browser</strong>
            <input
              type="text"
              value={editableData.additionalData?.versionBrowser || ''}
              onChange={(e) => handleInputChange('additionalData', 'versionBrowser', e.target.value)}
            />
          </label>
          <label>
            <strong>Tipo de Comunicación</strong>
            <input
              type="text"
              value={editableData.additionalData?.tipoComunicacion || ''}
              onChange={(e) => handleInputChange('additionalData', 'tipoComunicacion', e.target.value)}
            />
          </label>
          <label>
            <strong>SIM entra</strong>
            <input
              type="text"
              value={editableData.additionalData?.simEntra || ''}
              onChange={(e) => handleInputChange('additionalData', 'simEntra', e.target.value)}
            />
          </label>
          <label>
            <strong>PTID entra</strong>
            <input
              type="text"
              value={editableData.additionalData?.ptidEntra || ''}
              onChange={(e) => handleInputChange('additionalData', 'ptidEntra', e.target.value)}
            />
          </label>
          <label>
            <strong>Eliminador Entra</strong>
            <input
              type="text"
              value={editableData.additionalData?.eliminadorEntra || ''}
              onChange={(e) => handleInputChange('additionalData', 'eliminadorEntra', e.target.value)}
            />
          </label>
          <label>
            <strong>Eliminador Sale</strong>
            <input
              type="text"
              value={editableData.additionalData?.eliminadorSale || ''}
              onChange={(e) => handleInputChange('additionalData', 'eliminadorSale', e.target.value)}
            />
          </label>
        </div>
        <div className="info-column">
          <label>
            <strong>Estado</strong>
            <input
              type="text"
              value={editableData.additionalData?.estado || ''}
              onChange={(e) => handleInputChange('additionalData', 'estado', e.target.value)}
            />
          </label>
          <label>
            <strong>Orden de Servicio</strong>
            <input
              type="text"
              value={editableData.additionalData?.ordenDeServicio || ''}
              onChange={(e) => handleInputChange('additionalData', 'ordenDeServicio', e.target.value)}
            />
          </label>
          <label>
            <strong>Modelo Sale</strong>
            <input
              type="text"
              value={editableData.additionalData?.modeloSale || ''}
              onChange={(e) => handleInputChange('additionalData', 'modeloSale', e.target.value)}
            />
          </label>
          <label>
            <strong>Marca Sale</strong>
            <input
              type="text"
              value={editableData.additionalData?.marcaSale || ''}
              onChange={(e) => handleInputChange('additionalData', 'marcaSale', e.target.value)}
            />
          </label>
          <label>
            <strong>Serie Lógica sale</strong>
            <input
              type="text"
              value={editableData.additionalData?.serieLogicaSale || ''}
              onChange={(e) => handleInputChange('additionalData', 'serieLogicaSale', e.target.value)}
            />
          </label>
          <label>
            <strong>Serie Física sale</strong>
            <input
              type="text"
              value={editableData.additionalData?.serieFisicaSale || ''}
              onChange={(e) => handleInputChange('additionalData', 'serieFisicaSale', e.target.value)}
            />
          </label>
          <label>
            <strong>Versión Browser</strong>
            <input
              type="text"
              value={editableData.additionalData?.versionBrowserSale || ''}
              onChange={(e) => handleInputChange('additionalData', 'versionBrowserSale', e.target.value)}
            />
          </label>
          <label>
            <strong>Tipo de Comunicación</strong>
            <input
              type="text"
              value={editableData.additionalData?.tipoComunicacionSale || ''}
              onChange={(e) => handleInputChange('additionalData', 'tipoComunicacionSale', e.target.value)}
            />
          </label>
          <label>
            <strong>SIM Sale</strong>
            <input
              type="text"
              value={editableData.additionalData?.simSale || ''}
              onChange={(e) => handleInputChange('additionalData', 'simSale', e.target.value)}
            />
          </label>
          <label>
            <strong>PTID Sale</strong>
            <input
              type="text"
              value={editableData.additionalData?.ptidSale || ''}
              onChange={(e) => handleInputChange('additionalData', 'ptidSale', e.target.value)}
            />
          </label>
          <label>
            <strong>Plaza</strong>
            <input
              type="text"
              value={editableData.additionalData?.plaza || ''}
              onChange={(e) => handleInputChange('additionalData', 'plaza', e.target.value)}
            />
          </label>
          <label>
            <strong>Técnico</strong>
            <input
              type="text"
              value={editableData.additionalData?.tecnico || ''}
              onChange={(e) => handleInputChange('additionalData', 'tecnico', e.target.value)}
            />
          </label>
          <label>
            <strong>Cerro en Punto Clave</strong>
            <input
              type="text"
              value={editableData.additionalData?.cerroPuntoClave || ''}
              onChange={(e) => handleInputChange('additionalData', 'cerroPuntoClave', e.target.value)}
            />
          </label>
          <label>
            <strong>Atención en Punto</strong>
            <input
              type="text"
              value={editableData.additionalData?.atencionEnPunto || ''}
              onChange={(e) => handleInputChange('additionalData', 'atencionEnPunto', e.target.value)}
            />
          </label>
          <label>
            <strong>Firma en Estación</strong>
            <input
              type="text"
              value={editableData.additionalData?.firmaEnEstacion || ''}
              onChange={(e) => handleInputChange('additionalData', 'firmaEnEstacion', e.target.value)}
            />
          </label>
          <label>
            <strong>#Tarjeta / TAG</strong>
            <input
              type="text"
              value={editableData.additionalData?.tarjetaTag || ''}
              onChange={(e) => handleInputChange('additionalData', 'tarjetaTag', e.target.value)}
            />
          </label>
        </div>
      </div>
      <div className="full-width-section">
        <h3>INVENTARIO</h3>
        <label>
          <strong>Serie que queda de stock</strong>
          <input
            type="text"
            value={editableData.additionalData?.serieStock || ''}
            onChange={(e) => handleInputChange('additionalData', 'serieStock', e.target.value)}
          />
        </label>
        <label>
          <strong>SIM que queda de stock</strong>
          <input
            type="text"
            value={editableData.additionalData?.simStock || ''}
            onChange={(e) => handleInputChange('additionalData', 'simStock', e.target.value)}
          />
        </label>
        <label>
          <strong>Modelo de Stock</strong>
          <input
            type="text"
            value={editableData.additionalData?.modeloStock || ''}
            onChange={(e) => handleInputChange('additionalData', 'modeloStock', e.target.value)}
          />
        </label>
      </div>
      <div className="button-container">
        <button className="save-button" onClick={handleSave}>Guardar</button>
        <button className="cancel-button" onClick={handleCancel}>Cancelar</button>
      </div>
    </div>
  );
};

export default RenderEditarDatosAdicionales;