import React, { useState } from 'react';
import './PlaneacionStyles.css';

export default function PlaneacionEncabezado({ table }) {
    const [showMenu, setShowMenu] = useState(false);

    if (!table) return null;

    return (
        <div className="planeacion-header-area">
            <div>
                <h2>Planeación Operativa</h2>
                <small style={{ color: '#64748b', fontSize: '0.8rem' }}>
                    <strong>{table.getRowModel().rows.length}</strong> registros encontrados
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
                    <>
                        {/* Overlay invisible para cerrar al hacer clic fuera */}
                        <div 
                            style={{position: 'fixed', top:0, left:0, right:0, bottom:0, zIndex: 90}} 
                            onClick={() => setShowMenu(false)}
                        />
                        <div className="dropdown-menu">
                            <div className="dropdown-item" style={{ borderBottom: '1px solid #e2e8f0', marginBottom: '4px', fontWeight: 600 }}>
                                <label style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', width: '100%' }}>
                                    <input
                                        type="checkbox"
                                        checked={table.getIsAllColumnsVisible()}
                                        onChange={table.getToggleAllColumnsVisibilityHandler()}
                                        style={{marginRight: '8px'}}
                                    />
                                    Mostrar Todo
                                </label>
                            </div>

                            {table.getAllColumns()
                                .filter(column => column.columnDef.header)
                                .map(column => (
                                    <div key={column.id} className="dropdown-item">
                                        <label style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', width: '100%' }}>
                                            <input
                                                type="checkbox"
                                                checked={column.getIsVisible()}
                                                onChange={column.getToggleVisibilityHandler()}
                                                style={{marginRight: '8px'}}
                                            />
                                            {column.columnDef.header}
                                        </label>
                                    </div>
                                ))
                            }
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}