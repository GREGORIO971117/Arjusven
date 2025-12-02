import React, { useState } from 'react';
import './PlaneacionStyles.css';

export default function PlaneacionEncabezado({ table }) {
    const [showMenu, setShowMenu] = useState(false);

    if (!table) return null;

    return (
        <div className="planeacion-header-area">
            <div>
                <h2 style={{ margin: 0, color: '#111827' }}>Planeación Operativa</h2>
                <small style={{ color: '#6b7280' }}>
                    Mostrando {table.getRowModel().rows.length} registros
                </small>
            </div>

            <div style={{ position: 'relative' }}>
                <button 
                    className="btn-config"
                    onClick={() => setShowMenu(!showMenu)}
                >
                    Configurar Columnas ▾
                </button>
                
                {showMenu && (
                    <div className="dropdown-menu">
                        <div style={{ fontWeight: 'bold', marginBottom: '8px', color: '#9ca3af', fontSize: '11px' }}>
                            MOSTRAR / OCULTAR
                        </div>
                        {table.getAllLeafColumns().map(column => (
                            <div key={column.id} className="dropdown-item">
                                <label style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', width: '100%' }}>
                                    <input
                                        type="checkbox"
                                        checked={column.getIsVisible()}
                                        onChange={column.getToggleVisibilityHandler()}
                                    />
                                    {column.columnDef.header}
                                </label>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}