export const ColumnConfig = [
    // Columnas con Filtros (Select o Texto)
    { accessorKey: 'fechaAsignacion', header: 'FECHA ASIGNACION', filterType: 'text', size: 120 },
    { accessorKey: 'incidencia', header: 'INCIDENCIA', filterType: 'text', size: 100 },
    { accessorKey: 'cliente', header: 'CLIENTE', filterType: 'select', size: 150 }, // Select
    { accessorKey: 'estadoGuia', header: 'ESTADO GUIA', filterType: 'select', size: 130 }, // Select
    { accessorKey: 'ciudad', header: 'CIUDAD', filterType: 'select', size: 120 }, // Select
    { accessorKey: 'estadoMx', header: 'ESTADO', filterType: 'select', size: 120 }, // Select
    { accessorKey: 'tipoServicio', header: 'TIPO SERVICIO', filterType: 'select', size: 140 }, // Select
    { accessorKey: 'nombreTecnico', header: 'TECNICO', filterType: 'text', size: 150 },
    { accessorKey: 'estatusCierre', header: 'ESTATUS CIERRE', filterType: 'select', size: 130 },

    // Columnas solo visuales (sin filtro específico o filtro texto default)
    { accessorKey: 'fechaEnvio', header: 'FECHA ENVIO', filterType: 'none', size: 110 },
    { accessorKey: 'fechaLlegada', header: 'FECHA LLEGADA', filterType: 'none', size: 110 },
    { accessorKey: 'merchantId', header: 'MERCHANT ID', filterType: 'text', size: 120 },
    { accessorKey: 'guiaDhl', header: 'GUIA DHL', filterType: 'text', size: 150 },
    { accessorKey: 'direccion', header: 'DIRECCION', filterType: 'none', size: 200 },
    { accessorKey: 'colonia', header: 'COLONIA', filterType: 'none', size: 150 },
    { accessorKey: 'descripcion', header: 'DESCRIPCION', filterType: 'none', size: 250 },
    { accessorKey: 'equipoReportado', header: 'EQ. REPORTADO', filterType: 'select', size: 120 },
    { accessorKey: 'equipoEnviar', header: 'EQ. ENVIAR', filterType: 'select', size: 120 },
    { accessorKey: 'transporteEstimado', header: 'TRANSPORTE ESTIMADO', filterType:'none', size: 150 },

];
