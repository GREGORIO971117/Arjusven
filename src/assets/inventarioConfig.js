// inventarioConfig.js (Tu archivo original, modificado ligeramente para incluir 'type' y 'optionsKey')

export const inventarioConfig = [
    // --- Sección 1: Identificación y Estado ---
    { key: 'titulo', label: 'Título', type: 'text', grid: 1, required: true },
    { key: 'numeroDeSerie', label: 'Número de Serie', type: 'text', grid: 1, required: true, disabled: true }, // Marcado como disabled
    { key: 'responsable', label: 'Responsable', type: 'text', grid: 1, required: true },
    
    // --- Sección 2: Logística y Personal ---
    { key: 'codigoEmail', label: 'Código Email', type: 'text', grid: 2 },
    { key: 'cliente', label: 'Cliente', type: 'select', optionsKey: 'cliente', grid: 2, required: true },
    { key: 'plaza', label: 'Plaza', type: 'select', optionsKey: 'estadosMx', grid: 2, required: true }, // Asumo que 'plaza' usa 'estadosMx'
    
    // --- Sección 3: Equipo y Estado ---
    { key: 'numeroDeIncidencia', label: 'Número Incidencia', type: 'text', grid: 3 },
    { key: 'guias', label: 'Guías', type: 'text', grid: 3 },
    { key: 'equipo', label: 'Equipo', type: 'select', optionsKey: 'equipos', grid: 3, required: true },

    // --- Sección 4: Técnico y Fechas Previstas ---
    { key: 'estado', label: 'Estado', type: 'select', optionsKey: 'estado', grid: 4, required: true },
    { key: 'tecnicoCampo', label: 'Técnico Campo', type: 'select', optionsKey: 'tecnicoCampo', grid: 4 }, // Nota: Corregido a 'tecnicoCampo' para coincidir con el estado.
    { key: 'fechaInicioPrevista', label: 'Fecha Inicio Prevista', type: 'date', grid: 4 },

    // --- Sección 5: Fechas Finales ---
    { key: 'fechaFinPrevista', label: 'Fecha Fin Prevista', type: 'date', grid: 5 },
    { key: 'fechaActualizacion', label: 'Fecha Actualización', type: 'date', grid: 5, disabled: true },
    { key: 'fechaFin', label: 'Fecha Fin', type: 'date', grid: 5 },

    // --- Sección 6: Descripción (Full Width) ---
    { key: 'descripcion', label: 'Descripción', type: 'textarea', grid: 6, fullWidth: true },
];