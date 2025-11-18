
export const estacionesConfig = [
    // --- Sección 1: Identificación y Ubicación (grid: 1) ---
    { key: 'idMerchant', label: 'ID Merchant', type: 'text', grid: 1, required: true },
    { key: 'nombreComercial', label: 'Nombre Comercial', type: 'text', grid: 1, required: true },
    { key: 'codigoPEMEX', label: 'Código PEMEX', type: 'text', grid: 1 },
    { key: 'tipoPEMEX', label: 'Tipo PEMEX', type: 'text', grid: 1 },
    { key: 'coloniaAsentamiento', label: 'Colonia/Asentamiento', type: 'text', grid: 1 },
    { key: 'cp', label: 'CP', type: 'number', grid: 1 },
    { key: 'municipio', label: 'Municipio', type: 'text', grid: 1 },
    { key: 'estado', label: 'Estado', type: 'text', grid: 1 },
    { key: 'plazaDeAtencion', label: 'Plaza de Atención', type: 'text', grid: 1 },
    { key: 'cobertura', label: 'Cobertura', type: 'text', grid: 1 },
    
    // --- Sección 2: Conexión y Equipos (grid: 2) ---
    { key: 'afiliadoAS400', label: 'Afiliado AS 400', type: 'text', grid: 2 },
    { key: 'afiliadoATPV', label: 'Afiliado ATPV', type: 'text', grid: 2 },
    { key: 'controladorVolumetrico', label: 'Controlador Volumétrico', type: 'text', grid: 2 },
    { key: 'modelo', label: 'Modelo', type: 'text', grid: 2 },
    { key: 'tipoDeConexion', label: 'Tipo de Conexión', type: 'select', optionsKey: 'conexion', grid: 2 },
    { key: 'tipoSIN', label: 'Tipo SIM', type: 'text', grid: 2 },
    { key: 'carrier', label: 'Carrier', type: 'text', grid: 2 },
    { key: 'cantPOSActivas', label: 'Cant. POS Activas', type: 'number', grid: 2 },
    { key: 'as400', label: 'AS 400', type: 'text', grid: 2 },
    { key: 'bo', label: 'BO', type: 'text', grid: 2 },

    // --- Sección 3: Logística y Contacto (grid: 3) ---
    { key: 'grupo', label: 'Grupo', type: 'text', grid: 3 },
    { key: 'prioridad', label: 'Prioridad', type: 'text', grid: 3 },
    { key: 'rankingEdenred', label: 'Ranking Edenred', type: 'text', grid: 3 },
    { key: 'supervisorArjus', label: 'Supervisor ARJUS', type: 'text', grid: 3 },
    { key: 'tecnicoAsignado', label: 'Técnico Asignado', type: 'text', grid: 3 },
    { key: 'transporte', label: 'Transporte ($$)', type: 'text', grid: 3 },
    { key: 'rollos', label: 'Rollos (Cantidad)', type: 'number', grid: 3 },
    { key: 'km', label: 'KM', type: 'number', grid: 3 },
    { key: 'telefono1', label: 'Teléfono 1', type: 'text', grid: 3 },
    { key: 'telefono2', label: 'Teléfono 2', type: 'text', grid: 3 },
    { key: 'soporteNoviembre2022', label: 'Soporte (Nov 2022)', type: 'text', grid: 3 },
    
    // --- Sección 4: Textos Largos (grid: 4) ---
    { key: 'direccion', label: 'Dirección Completa', type: 'textarea', grid: 4 },
    { key: 'referencias', label: 'Referencias', type: 'textarea', grid: 4 },
];