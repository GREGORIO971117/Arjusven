
const getFormattedTicketData = (data) => {
  if (!data) return {};

  const storedData = localStorage.getItem('excelData');
  let excelData = [];
  if (storedData) {
    try {
      excelData = JSON.parse(storedData);
    } catch (error) {
      console.error("Error al parsear los datos de localStorage:", error);
    }
  }

  console.log("putos datos",storedData);

  // Buscar el ticket correspondiente en los datos de excelData si es necesario
  const foundTicket = excelData.find(t => t.Incidencia === data.Incidencia);

  // Usar los datos del ticket encontrado o los datos pasados por prop
  const supervisor = (foundTicket && foundTicket.supervisor) || data['Supervisor'];
  const assignmentDate = (foundTicket && foundTicket.currentDate) || new Date().toLocaleDateString();

  return {
    serviceRequest: {
      assignmentDate: assignmentDate,
      resolution: data['Resolución'],
      currentStatus: data['Situación Actual'],
      essName: data['Nombre de ESS'],
      caseNumber: data['Incidencia'],
      affiliateCode: data['Afiliado'],
      affiliation: data['Nombre Afiliado'],
      atpvAffiliate: data['Afiliado ATPV'],
      atpvID: data['ID ATPV'],
      serviceReason: data['Aplicación, Prioridad'],
    },
    contactInfo: {
      relatedContract: data['Contrato relacionado'],
      client: data['Cliente'],
      contactPerson: {
        creator: data['Creador'],
        supervisor: supervisor,
      },
      serviceType: data['TIPO DE SERVICIO'],
      fieldTechnician: data['Técnico de Campo'],
      sla: data['SLA'],
    },
    serviceDetails: {
      onSiteReason: data['Detalle'],
      observations: data['Observaciones'],
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