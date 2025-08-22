const renderDatosAdicionales = ({editableData}) => (
    <>
      <div className="info-section">
        <div className="info-column">
          <p><strong>Ciudad</strong></p>
          <p>{editableData.additionalData.ciudad}</p>
        </div>
        <div className="info-column">
          <p><strong>Cantidad TPV en Base</strong></p>
          <p>{editableData.additionalData.cantidadTPV}</p>
        </div>
        <div className="info-column">
          <p><strong>Modelo entra</strong></p>
          <p>{editableData.additionalData.modeloEntra}</p>
        </div>
        <div className="info-column">
          <p><strong>Marca Entra</strong></p>
          <p>{editableData.additionalData.marcaEntra}</p>
        </div>
        <div className="info-column">
          <p><strong>Serie Lógica entra</strong></p>
          <p>{editableData.additionalData.serieLogicaEntra}</p>
        </div>
        <div className="info-column">
          <p><strong>Serie Física entra</strong></p>
          <p>{editableData.additionalData.serieFisicaEntra}</p>
        </div>
        <div className="info-column">
          <p><strong>Versión Browser</strong></p>
          <p>{editableData.additionalData.versionBrowser}</p>
        </div>
        <div className="info-column">
          <p><strong>Tipo de Comunicación</strong></p>
          <p>{editableData.additionalData.tipoComunicacion}</p>
        </div>
        <div className="info-column">
          <p><strong>SIM entra</strong></p>
          <p>{editableData.additionalData.simEntra}</p>
        </div>
        <div className="info-column">
          <p><strong>PTID entra</strong></p>
          <p>{editableData.additionalData.ptidEntra}</p>
        </div>
        <div className="info-column">
          <p><strong>Eliminador Entra</strong></p>
          <p>{editableData.additionalData.eliminadorEntra}</p>
        </div>
        <div className="info-column">
          <p><strong>Eliminador Sale</strong></p>
          <p>{editableData.additionalData.eliminadorSale}</p>
        </div>
      </div>
      <div className="info-section">
        <div className="info-column">
          <p><strong>Estado</strong></p>
          <p>{editableData.additionalData.estado}</p>
        </div>
        <div className="info-column">
          <p><strong>Orden de Servicio</strong></p>
          <p>{editableData.additionalData.ordenDeServicio}</p>
        </div>
        <div className="info-column">
          <p><strong>Modelo Sale</strong></p>
          <p>{editableData.additionalData.modeloSale}</p>
        </div>
        <div className="info-column">
          <p><strong>Marca Sale</strong></p>
          <p>{editableData.additionalData.marcaSale}</p>
        </div>
        <div className="info-column">
          <p><strong>Serie Lógica sale</strong></p>
          <p>{editableData.additionalData.serieLogicaSale}</p>
        </div>
        <div className="info-column">
          <p><strong>Serie Física sale</strong></p>
          <p>{editableData.additionalData.serieFisicaSale}</p>
        </div>
        <div className="info-column">
          <p><strong>Versión Browser</strong></p>
          <p>{editableData.additionalData.versionBrowserSale}</p>
        </div>
        <div className="info-column">
          <p><strong>Tipo de Comunicación</strong></p>
          <p>{editableData.additionalData.tipoComunicacionSale}</p>
        </div>
        <div className="info-column">
          <p><strong>SIM Sale</strong></p>
          <p>{editableData.additionalData.simSale}</p>
        </div>
        <div className="info-column">
          <p><strong>PTID Sale</strong></p>
          <p>{editableData.additionalData.ptidSale}</p>
        </div>
        <div className="info-column">
          <p><strong>Plaza</strong></p>
          <p>{editableData.additionalData.plaza}</p>
        </div>
        <div className="info-column">
          <p><strong>Técnico</strong></p>
          <p>{editableData.additionalData.tecnico}</p>
        </div>
        <div className="info-column">
          <p><strong>Cerro en Punto Clave</strong></p>
          <p>{editableData.additionalData.cerroPuntoClave}</p>
        </div>
        <div className="info-column">
          <p><strong>Atención en Punto</strong></p>
          <p>{editableData.additionalData.atencionEnPunto}</p>
        </div>
        <div className="info-column">
          <p><strong>Firma en Estación</strong></p>
          <p>{editableData.additionalData.firmaEnEstacion}</p>
        </div>
        <div className="info-column">
          <p><strong>#Tarjeta / TAG</strong></p>
          <p>{editableData.additionalData.tarjetaTag}</p>
        </div>
      </div>
      <div className="full-width-section">
        <p><strong>INVENTARIO</strong></p>
        <p><strong>Serie que queda de stock</strong></p>
        <p>{editableData.additionalData.serieStock}</p>
        <p><strong>SIM que queda de stock</strong></p>
        <p>{editableData.additionalData.simStock}</p>
        <p><strong>Modelo de Stock</strong></p>
        <p>{editableData.additionalData.modeloStock}</p>
      </div>
      <div className="button-container">
        <button className="edit-button" onClick={() => handleTabChange('editar')}>
          Editar datos
        </button>
      </div>
    </>
  );

  export default renderDatosAdicionales;