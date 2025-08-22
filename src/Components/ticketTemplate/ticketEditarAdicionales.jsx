import React from 'react';

const RenderEditarDatosAdicionales = ({ editableData, handleInputChange, handleSave, handleCancel }) => {

  return (
    <>

    
      <div className="form-section">
        <h3>Datos Adicionales</h3>
        <div className="input-group">
          <label>Ciudad</label>
          <input
            type="text"
            value={editableData.additionalData.ciudad}
            onChange={(e) => handleInputChange('additionalData', 'ciudad', e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>Cantidad TPV en Base</label>
          <input
            type="text"
            value={editableData.additionalData.cantidadTPV}
            onChange={(e) => handleInputChange('additionalData', 'cantidadTPV', e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>Modelo entra</label>
          <input
            type="text"
            value={editableData.additionalData.modeloEntra}
            onChange={(e) => handleInputChange('additionalData', 'modeloEntra', e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>Marca Entra</label>
          <input
            type="text"
            value={editableData.additionalData.marcaEntra}
            onChange={(e) => handleInputChange('additionalData', 'marcaEntra', e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>Serie Lógica entra</label>
          <input
            type="text"
            value={editableData.additionalData.serieLogicaEntra}
            onChange={(e) => handleInputChange('additionalData', 'serieLogicaEntra', e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>Serie Física entra</label>
          <input
            type="text"
            value={editableData.additionalData.serieFisicaEntra}
            onChange={(e) => handleInputChange('additionalData', 'serieFisicaEntra', e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>Versión Browser</label>
          <input
            type="text"
            value={editableData.additionalData.versionBrowser}
            onChange={(e) => handleInputChange('additionalData', 'versionBrowser', e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>Tipo de Comunicación</label>
          <input
            type="text"
            value={editableData.additionalData.tipoComunicacion}
            onChange={(e) => handleInputChange('additionalData', 'tipoComunicacion', e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>SIM entra</label>
          <input
            type="text"
            value={editableData.additionalData.simEntra}
            onChange={(e) => handleInputChange('additionalData', 'simEntra', e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>PTID entra</label>
          <input
            type="text"
            value={editableData.additionalData.ptidEntra}
            onChange={(e) => handleInputChange('additionalData', 'ptidEntra', e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>Eliminador Entra</label>
          <input
            type="text"
            value={editableData.additionalData.eliminadorEntra}
            onChange={(e) => handleInputChange('additionalData', 'eliminadorEntra', e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>Eliminador Sale</label>
          <input
            type="text"
            value={editableData.additionalData.eliminadorSale}
            onChange={(e) => handleInputChange('additionalData', 'eliminadorSale', e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>Estado</label>
          <input
            type="text"
            value={editableData.additionalData.estado}
            onChange={(e) => handleInputChange('additionalData', 'estado', e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>Orden de Servicio</label>
          <input
            type="text"
            value={editableData.additionalData.ordenDeServicio}
            onChange={(e) => handleInputChange('additionalData', 'ordenDeServicio', e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>Modelo Sale</label>
          <input
            type="text"
            value={editableData.additionalData.modeloSale}
            onChange={(e) => handleInputChange('additionalData', 'modeloSale', e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>Marca Sale</label>
          <input
            type="text"
            value={editableData.additionalData.marcaSale}
            onChange={(e) => handleInputChange('additionalData', 'marcaSale', e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>Serie Lógica sale</label>
          <input
            type="text"
            value={editableData.additionalData.serieLogicaSale}
            onChange={(e) => handleInputChange('additionalData', 'serieLogicaSale', e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>Serie Física sale</label>
          <input
            type="text"
            value={editableData.additionalData.serieFisicaSale}
            onChange={(e) => handleInputChange('additionalData', 'serieFisicaSale', e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>Versión Browser</label>
          <input
            type="text"
            value={editableData.additionalData.versionBrowserSale}
            onChange={(e) => handleInputChange('additionalData', 'versionBrowserSale', e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>Tipo de Comunicación</label>
          <input
            type="text"
            value={editableData.additionalData.tipoComunicacionSale}
            onChange={(e) => handleInputChange('additionalData', 'tipoComunicacionSale', e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>SIM Sale</label>
          <input
            type="text"
            value={editableData.additionalData.simSale}
            onChange={(e) => handleInputChange('additionalData', 'simSale', e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>PTID Sale</label>
          <input
            type="text"
            value={editableData.additionalData.ptidSale}
            onChange={(e) => handleInputChange('additionalData', 'ptidSale', e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>Plaza</label>
          <input
            type="text"
            value={editableData.additionalData.plaza}
            onChange={(e) => handleInputChange('additionalData', 'plaza', e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>Técnico</label>
          <input
            type="text"
            value={editableData.additionalData.tecnico}
            onChange={(e) => handleInputChange('additionalData', 'tecnico', e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>Cerro en Punto Clave</label>
          <input
            type="text"
            value={editableData.additionalData.cerroPuntoClave}
            onChange={(e) => handleInputChange('additionalData', 'cerroPuntoClave', e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>Atención en Punto</label>
          <input
            type="text"
            value={editableData.additionalData.atencionEnPunto}
            onChange={(e) => handleInputChange('additionalData', 'atencionEnPunto', e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>Firma en Estación</label>
          <input
            type="text"
            value={editableData.additionalData.firmaEnEstacion}
            onChange={(e) => handleInputChange('additionalData', 'firmaEnEstacion', e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>#Tarjeta / TAG</label>
          <input
            type="text"
            value={editableData.additionalData.tarjetaTag}
            onChange={(e) => handleInputChange('additionalData', 'tarjetaTag', e.target.value)}
          />
        </div>
      </div>
      <div className="form-section">
        <h3>Inventario</h3>
        <div className="input-group">
          <label>Serie que queda de stock</label>
          <input
            type="text"
            value={editableData.additionalData.serieStock}
            onChange={(e) => handleInputChange('additionalData', 'serieStock', e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>SIM que queda de stock</label>
          <input
            type="text"
            value={editableData.additionalData.simStock}
            onChange={(e) => handleInputChange('additionalData', 'simStock', e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>Modelo de Stock</label>
          <input
            type="text"
            value={editableData.additionalData.modeloStock}
            onChange={(e) => handleInputChange('additionalData', 'modeloStock', e.target.value)}
          />
        </div>
      </div>
      <div className="button-container">
        <button className="save-button" onClick={handleSave}>Guardar Cambios</button>
        <button className="cancel-button" onClick={handleCancel}>Cancelar</button>
      </div>
    </>
  );
};

export default RenderEditarDatosAdicionales;