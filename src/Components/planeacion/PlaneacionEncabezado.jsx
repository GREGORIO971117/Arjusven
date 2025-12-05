// PlaneacionEncabezado.jsx

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

            <div style={{ position: 'relative', zIndex: 101 }}>
                <button 
                    className="btn-config"
                    onClick={() => setShowMenu(!showMenu)}
                >
                    Configurar Columnas ▾
                </button>
                
                {showMenu && (
                    <div className="dropdown-menu">

                        {/* 1. Opción para Alternar Todas las Columnas */}
                        <div className="dropdown-item" style={{ borderBottom: '1px solid #e5e7eb', paddingBottom: '8px', marginBottom: '8px' }}>
                            <label style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', width: '100%', fontWeight: 'bold' }}>
                                <input
                                    type="checkbox"
                                    checked={table.getIsAllColumnsVisible()}
                                    onChange={table.getToggleAllColumnsVisibilityHandler()}
                                />
                                Ocultar / Mostrar Todas
                            </label>
                        </div>

                        {/* 2. Lista de Columnas Individuales - Usa getAllColumns y un filtro robusto */}
                        {table.getAllColumns()
                            .filter(column => column.columnDef.header !== undefined && column.columnDef.header !== null && column.id !== 'select')
                            .map(column => (
                                <div key={column.id} className="dropdown-item">
                                    <label style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', width: '100%' }}>
                                        <input
                                            type="checkbox"
                                            checked={column.getIsVisible()}
                                            onChange={column.getToggleVisibilityHandler()}
                                        />
                                        {/* Usamos el header para el nombre de la opción */}
                                        {column.columnDef.header}
                                    </label>
                                </div>
                            ))
                        }
                    </div>
                )}
            </div>
        </div>
    );
}