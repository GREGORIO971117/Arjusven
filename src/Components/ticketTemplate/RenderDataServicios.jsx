
import { serviciosConfig } from '../../assets/serviciosConfig';

const RenderDatosServicio = ({ data, activeTab, setActiveTab, isEditing, setIsEditing }) => {
    
        

    if (!data) {
        return <div className="no-data-message">No se encontraron datos de Servicio para este ticket.</div>;
    }

    const InfoItem = ({ label, value }) => {
        const displayValue = value === undefined || value === null || value === '' ? '—' : value;
        
        return (
            <div className='infoItem'>
                <strong>{label}:</strong> <span>{displayValue}</span>
            </div>
        );
    }
        
    const grid2Keys = [
        'fechaDeAsignacion',
        'resolucion', 
        'situacionActual', 
        'nombreDeEss', 
        'incidencia', 
        'supervisor', 
        'idMerchant', 
        'tipoDeServicio',
        'fechaDeEnvio', 
        'tecnico', 
        'sla'
    ];
    
    const gridKeys = [
        'direccion', 
        'guiaDeEncomienda',
        'observaciones',
        'motivoDeServicio',
        'motivoReal'];
    
    const getConfig = (key) => serviciosConfig.find(field => field.key === key);

  
    const nombreDeEss = data.nombreDeEss;

    return (
        <>
            <div className="ticket-tabs">
                <div className="tabs-container">
                    <button
                        className={`tab-button ${activeTab === 'servicio' ? 'active' : ''}`}
                        onClick={() => setActiveTab('servicio')}
                    >
                        Datos de Servicio
                    </button>
                    <button
                        className={`tab-button ${activeTab === 'adicionales' ? 'active' : ''}`}
                        onClick={() => setActiveTab('adicionales')}
                    >
                        Datos Adicionales
                    </button>
                </div>
                <h2 className="title">
                    <strong>{nombreDeEss || 'Sin Nombre'}</strong> 
                </h2>

                <div className="ticket-actions">
                    {!isEditing && (
                        <button onClick={() => setIsEditing(true)} className="edit-button">
                            Editar
                        </button>
                    )}

                    <button className="edit-button">
                        Inventario
                    </button> 

                                        
                </div>
            </div>

            {/* --- Renderizado Condicional del Contenido --- */}
            {activeTab === 'servicio' && (
                <div className='detalleGridContainer'>
                    
                    <div className="grid2">
                        {grid2Keys.map(key => {
                            const field = getConfig(key);
                            const label = field ? field.label : key; 
                            return (
                                <InfoItem 
                                    key={key} 
                                    label={label}
                                    value={data[key]} 
                                />
                            );
                        })}
                    </div>
                    
                    <div className="grid">
                        {gridKeys.map(key => {
                            const field = getConfig(key);
                            
                            let label = field ? field.label : key; 
                            if(key === 'motivoReal') label = 'Motivo real del Servicio en sitio';
                            if(key === 'motivoDeServicio') label = 'Motivo del Servicio';
                            if(key === 'observaciones') label = 'Observaciones ARJUSVEN';
                            
                            return (
                                <InfoItem 
                                    key={key} 
                                    label={label} 
                                    value={data[key]} 
                                />
                            );
                        })}
                    </div>
                </div>
            )}
        </>
    );
};

export default RenderDatosServicio;