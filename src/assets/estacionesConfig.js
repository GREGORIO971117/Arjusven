
export const estacionesConfig = [
    // --- Sección 1: Identificación y Ubicación (grid: 1) ---
    { key: 'idMerchant', label: 'ID Merchant', type: 'text', grid: 1, required: true, readOnly: true },
    { key: 'nombreComercial', label: 'Nombre Comercial', type: 'text', grid: 1, required: true },
    { key: 'codigoPEMEX', label: 'Código PEMEX', type: 'text', grid: 1 },
    { key: 'tipoPEMEX', label: 'Tipo PEMEX', type: 'text', grid: 1 },
    { key: 'coloniaAsentamiento', label: 'Colonia/Asentamiento', type: 'text', grid: 1 },
    { key: 'cp', label: 'CP', type: 'number', grid: 1 },
    { key: 'municipio', label: 'Municipio', type: 'text', grid: 1 },
    { key: 'estado', label: 'Estado', type: 'select', optionsKey: 'estadosMx', grid: 1 }, // Cambiado a select
    { key: 'plazaDeAtencion', label: 'Plaza de Atención', type: 'select', optionsKey: 'plazaDeAtencion', grid: 1 }, // Cambiado a select
    { key: 'cobertura', label: 'Cobertura', type: 'select', optionsKey: 'sla', grid: 1 }, // Cambiado a select
    
    // --- Sección 1: Conexión y Equipos (grid: 1) ---
    { key: 'afiliadoAS400', label: 'Afiliado AS 400', type: 'text', grid: 1 },
    { key: 'afiliadoATPV', label: 'Afiliado ATPV', type: 'text', grid: 1 },
    { key: 'controladorVolumetrico', label: 'Controlador Volumétrico', type: 'text', grid: 1 },
    { key: 'modelo', label: 'Modelo', type: 'text', grid: 1 },
    { key: 'tipoDeConexion', label: 'Tipo de Conexión', type: 'text', grid: 1 },
    { key: 'tipoSIM', label: 'Tipo SIM', type: 'text', grid: 1 },
    { key: 'carrier', label: 'Carrier', type: 'text', grid: 1 },
    { key: 'cantPOSActivas', label: 'Cant. POS Activas', type: 'number', grid: 1 },
    { key: 'as400', label: 'AS 400', type: 'text', grid: 1 },
    { key: 'bo', label: 'BO', type: 'text', grid: 1 },

    // --- Sección 1: Logística y Contacto (grid: 1) ---
    { key: 'grupo', label: 'Grupo', type: 'text', grid: 1 },
    { key: 'prioridad', label: 'Prioridad', type: 'text', grid: 1 },
    { key: 'rankingEdenred', label: 'Ranking Edenred', type: 'text', grid: 1 },
    { key: 'supervisorArjus', label: 'Supervisor ARJUS', type: 'text', grid: 1 },
    { key: 'tecnicoAsignado', label: 'Técnico Asignado', type: 'text', grid: 1 },
    { key: 'transporte', label: 'Transporte ($$)', type: 'number', grid: 1 },
    { key: 'rollos', label: 'Rollos', type: 'number', grid: 1 },
    { key: 'km', label: 'KM', type: 'number', grid: 1 },
    { key: 'telefono1', label: 'Teléfono 1', type: 'text', grid: 1 },
    { key: 'telefono2', label: 'Teléfono 1', type: 'text', grid: 1 },
    { key: 'soporteNoviembre2022', label: 'Soporte (Nov 2022)', type: 'text', grid: 1 },
    
    // --- Sección 4: Textos Largos (grid: 4) ---
    { key: 'direccion', label: 'Dirección', type: 'text', grid: 1 },
    { key: 'referencias', label: 'Referencias', type: 'text', grid: 1 },
];