export const ColumnConfig = [
    // Columnas con Filtros (Select o Texto)
    { accessorKey: 'fechaAsignacion', header: 'FECHA ASIGNACION', filterType: 'text', size: 120 },
    { accessorKey: 'incidencia', header: 'INCIDENCIA', filterType: 'text', size: 100 },
    { accessorKey: 'cliente', header: 'CLIENTE', filterType: 'select', size: 150 }, // Select
    { accessorKey: 'estadoGuia', header: 'ESTADO GUIA', filterType: 'select', size: 130 },
    { accessorKey: 'fechaDeEnvio', header: 'FECHA DE ENVIO PAQUETERIA', filterType: 'none', size: 130 },
    { accessorKey: 'fechaLlegada', header: 'FECHA LLEGADA', filterType: 'none', size: 110 },
    { accessorKey: 'merchantId', header: 'MERCHANT ID', filterType: 'text', size: 120 },
    { accessorKey: 'guiaDhl', header: 'GUIA DHL', filterType: 'text', size: 150 },
    { accessorKey: 'direccion', header: 'DIRECCION', filterType: 'none', size: 200 },
    { accessorKey: 'colonia', header: 'COLONIA', filterType: 'none', size: 150 },
    { accessorKey: 'ciudad', header: 'CIUDAD', filterType: 'select', size: 120 }, // Select
    { accessorKey: 'estadoMx', header: 'ESTADO', filterType: 'select', size: 120 }, // Select
    { accessorKey: 'tipoServicio', header: 'TIPO SERVICIO', filterType: 'select', size: 140 }, // Select
    { accessorKey: 'descripcion', header: 'DESCRIPCION', filterType: 'none', size: 250 },
    { accessorKey: 'equipoReportado', header: 'EQ. REPORTADO', filterType: 'select', size: 120 },
    { accessorKey: 'equipoEnviado', header: 'EQ. ENVIADO', filterType: 'select', size: 120 },
    { accessorKey: 'observacionArjus', header: 'OBSERVACION ARJUS', filterType: 'text', size: 500 },
    { accessorKey: 'nombreTecnico', header: 'TECNICO', filterType: 'text', size: 150 },
    { accessorKey: 'fechaAsignacionReporte', header: 'FECHA ASIGNACION REPORTE', filterType: 'none', size: 110 },
    { accessorKey: 'fechaCierre', header: 'FECHA CIERRE', filterType: 'none', size: 110 },
    { accessorKey: 'observacionImportante', header: 'OBSERVACION IMPORTANTE', filterType: 'none', size: 150 },
    { accessorKey: 'supervisor', header: 'SUPERVISOR', filterType: 'select', size: 110 },
    { accessorKey: 'transporteEstimado', header: 'TRANSPORTE ESTIMADO', filterType:'none', size: 150 },
];
