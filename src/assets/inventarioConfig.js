
export const inventarioConfig = [
    // --- Sección 1: Identificación y Estado ---
    { key: 'titulo', label: 'Título', type: 'text', grid: 2},
    { key: 'numeroDeSerie', label: 'Número de Serie', type: 'text', grid: 2, required: true, disabled: true }, // Marcado como disabled
    { key: 'responsable', label: 'Responsable', type: 'text', grid: 2},
    { key: 'codigoEmail', label: 'Código Email', type: 'text', grid: 2 },
    { key: 'cliente', label: 'Cliente', type: 'select', optionsKey: 'cliente', grid: 2},
    { key: 'plaza', label: 'Plaza', type: 'select', optionsKey: 'plazaDeAtencion', grid: 2}, // Asumo que 'plaza' usa 'estadosMx'
    { key: 'numeroDeIncidencia', label: 'Número Incidencia', type: 'text', grid: 2 },
    { key: 'guias', label: 'Guías', type: 'text', grid: 2 },
    { key: 'equipo', label: 'Equipo', type: 'select', optionsKey: 'equipos', grid: 2 },
    { key: 'estado', label: 'Estado', type: 'select', optionsKey: 'estado', grid: 2},
    { key: 'tecnicoCampo', label: 'Técnico Campo', type: 'select', optionsKey: 'tecnicoCampo', grid: 2 }, 
    { key: 'fechaInicioPrevista', label: 'Fecha Inicio Prevista', type: 'date', grid: 2 },
    { key: 'fechaFinPrevista', label: 'Fecha Fin Prevista', type: 'date', grid: 2 },
    { key: 'fechaActualizacion', label: 'Fecha Actualización', type: 'date', grid: 2, disabled: true },
    { key: 'fechaFin', label: 'Fecha Fin', type: 'date', grid: 2 },
    { key: 'descripcion', label: 'Descripción', type: 'textarea', grid: 2, fullWidth: true },
];

