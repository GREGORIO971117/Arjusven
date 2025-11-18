import React from 'react';
// Importa la nueva configuración centralizada
import { estacionesConfig } from '../../assets/estacionesConfig'; // Ajusta la ruta si es necesario

export default function RenderDatosEstacion({ data, onEdit }) {

    if (!data) {
        return null;
    }

    // El componente InfoItem se mantiene igual, ya que es genérico
    const InfoItem = ({ label, value }) => {
        let displayValue = value === null || value === undefined || value === '' ? 'Vacío' : value.toString();
        // Lógica para mostrar '0' si el valor numérico es cero
        if (typeof value === 'number' && value === 0) {
            displayValue = '0';
        }

        return (
            <div className='infoItem'>
                {label}:
                <strong><span>{displayValue}</span></strong> 
            </div>
        );
    };

    // Filtra los campos que NO son de ancho completo (Dirección)
    const grid3Items = estacionesConfig.filter(item => !item.fullWidth);

    // Encuentra el campo de ancho completo (Dirección)
    const fullWidthItem = estacionesConfig.find(item => item.fullWidth);

    return (
        <> 
            <div className="ticket-header">
                <h2 className="ticket-title">
                    {data.idMerchant}  Estación: {data.nombreComercial} 
                    <button onClick={onEdit} className="edit-button">Editar</button>
                </h2>
            </div>

            <div className="detalleGridContainer">
                
                {/* GRID 3: Elementos generados a partir de la configuración */}
                <div className="grid3">
                    {grid3Items.map(item => (
                        <InfoItem 
                            key={item.key} 
                            label={item.label} 
                            // Accede al valor usando la clave del objeto 'data'
                            value={data[item.key]} 
                        />
                    ))}
                </div>

                {/* GRID 1/Full Width: Campo Dirección */}
                {fullWidthItem && (
                    <div className="grid"> {/* Asumiendo que .grid es tu contenedor de ancho completo */}
                        <InfoItem 
                            label={fullWidthItem.label} 
                            value={data[fullWidthItem.key]} 
                        />
                    </div>
                )}
            </div>

        </>
    );
}