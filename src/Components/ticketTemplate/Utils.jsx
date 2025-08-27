const getFormattedTicketData = (data) => {
  if (!data) return {};

  return {
    serviceRequest: {
      assignmentDate: data['Fecha de Asignación'],
      resolution: data['Resolución'],
      currentStatus: data['Situación Actual'],
      essName: data['Nombre de ESS'],
      caseNumber: data['No de Caso'],
      affiliateCode: data['Código de Afiliado'],
      affiliation: data['Afiliación'],
      atpvAffiliate: data['Afiliado ATPV'],
      atpvID: data['ID ATPV'],
      serviceReason: data['Motivo del Servicio'],
    },
    contactInfo: {
      relatedContract: data['Contrato relacionado'],
      client: data['Cliente'],
      contactPerson: {
        creator: data['Creador'],
        supervisor: data['Supervisor'],
      },
      serviceType: data['TIPO DE SERVICIO'],
      fieldTechnician: data['Técnico de Campo'],
      sla: data['SLA'],
    },
    serviceDetails: {
      onSiteReason: data['Motivo real del Servicio en sitio'],
      observations: data['Observaciones ARJUSVEN'],
      address: data['Dirección'],
    },
    bottomInfo: {
      encomiendaGuide: data['Guía de Encomienda'],
      guideSendDate: data['Fecha de envío de guía'],
    },
    additionalData: {
      ciudad: data['Ciudad'],
      cantidadTPV: data['Cantidad TPV en Base'],
      modeloEntra: data['Modelo entra'],
      marcaEntra: data['Marca Entra'],
      serieLogicaEntra: data['Serie Lógica entra'],
      serieFisicaEntra: data['Serie Física entra'],
      versionBrowser: data['Versión Browser'],
      tipoComunicacion: data['Tipo de Comunicación'],
      simEntra: data['SIM entra'],
      ptidEntra: data['PTID entra'],
      eliminadorEntra: data['Eliminador Entra'],
      eliminadorSale: data['Eliminador Sale'],
      estado: data['Estado'],
      ordenDeServicio: data['Orden de Servicio'],
      modeloSale: data['Modelo Sale'],
      marcaSale: data['Marca Sale'],
      serieLogicaSale: data['Serie Lógica sale'],
      serieFisicaSale: data['Serie Física sale'],
      versionBrowserSale: data['Versión Browser Sale'],
      tipoComunicacionSale: data['Tipo de Comunicación Sale'],
      simSale: data['SIM Sale'],
      ptidSale: data['PTID Sale'],
      plaza: data['Plaza'],
      tecnico: data['Técnico'],
      cerroPuntoClave: data['Cerro en Punto Clave'],
      atencionEnPunto: data['Atención en Punto'],
      firmaEnEstacion: data['Firma en Estación'],
      tarjetaTag: data['#Tarjeta / TAG'],
      serieStock: data['Serie que queda de stock'],
      simStock: data['SIM que queda de stock'],
      modeloStock: data['Modelo de Stock'],
    },
  };
};

export default getFormattedTicketData;