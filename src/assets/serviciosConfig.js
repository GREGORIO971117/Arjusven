
export const serviciosConfig = [
    // La configuración se mantiene para la edición y para la referencia
    { key: 'nombreDeEss', label: 'Nombre de ESS', type: 'text', grid: 1, required: true },
    { key: 'incidencia', label: 'Número de Incidencia', type: 'text', grid: 1, required: true },
    { key: 'resolucion', label: 'Resolución', type: 'date', grid: 1 },
    { key: 'situacionActual', label: 'Situación Actual', type: 'select', optionsKey: 'situacion', grid: 1 },
    { key: 'supervisor', label: 'Supervisor', type: 'text', grid: 1 },
    { key: 'idMerchant', label: 'ID Merchant', type: 'text', grid: 1 },
    { key: 'tipoDeServicio', label: 'Tipo de Servicio', type: 'select', optionsKey: 'servicio', grid: 1 },
    { key: 'fechaDeEnvio', label: 'Fecha de envío de guía', type: 'date', grid: 1 },
    { key: 'direccion', label: 'Dirección', type: 'text', grid: 1 },
    { key: 'tecnico', label: 'Técnico de Campo', type: 'text', grid: 1 },
    { key: 'sla', label: 'SLA', type: 'select', optionsKey: 'sla', grid: 1 },
    { key: 'fechaDeAsignacion', label: 'Fecha de Asignación', type: 'date', grid: 1 },
    { key: 'guiaDeEncomienda', label: 'Guía de Encomienda', type: 'text', grid: 1 },
    { key: 'motivoDeServicio', label: 'Motivo del Servicio', type: 'text', grid: 1 },
    { key: 'motivoReal', label: 'Motivo real en sitio', type: 'textarea', grid: 2 },
    { key: 'observaciones', label: 'Observaciones ARJUSVEN', type: 'textarea', grid: 2 },
];