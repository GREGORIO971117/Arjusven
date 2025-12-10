
export const inventarioConfig = [
    // --- Sección 1: Identificación y Estado ---
    { key: 'numeroDeSerie', label: 'Número de Serie', type: 'text', grid: 2, required: true, readOnly: true }, 
    { key: 'numeroDeIncidencia', label: 'Número Incidencia', type: 'text', grid: 2, readOnly: true },
    { key: 'ultimaActualizacion', label: 'Fecha Actualización', type: 'date', grid: 2, readOnly: true },
    //{ key: 'cliente', label: 'Cliente', type: 'select', optionsKey: 'cliente', grid: 2},
    { key: 'plaza', label: 'Plaza', type: 'select', optionsKey: 'plazaDeAtencion', grid: 2}, 
    { key: 'equipo', label: 'Equipo', type: 'select', optionsKey: 'equipos', grid: 2 },
    { key: 'estado', label: 'Estado', type: 'select', optionsKey: 'estado', grid: 2},
    { key: 'tecnico', label: 'Técnico Campo', type: 'select', optionsKey: 'tecnicoCampo', grid: 2 }, 
    { key: 'guias', label: 'Guías', type: 'text', grid: 2, fullWidth: true  },
    { key: 'descripcion', label: 'Descripción', type: 'textarea', grid: 2, fullWidth: true },
];

