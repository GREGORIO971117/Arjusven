import React, { useState } from 'react';
import FilterComponent from './FilterComponent';
import EditableCell from './editableCell';
import './PlaneacionStyles.css'; 

export default function PlaneacionTabla({ table }) {
    if (!table) return <div className="no-data">Cargando tabla...</div>;

    const [isMassEditing, setIsMassEditing] = useState(null); 
    const [massEditValue, setMassEditValue] = useState("");

    const handleMassEditStart = (columnId) => {
        if (columnId === 'incidencia' || columnId === 'id') return; 

        setIsMassEditing(columnId);
        setMassEditValue(""); 
    };

    const handleMassEditSubmit = () => {
        if (!isMassEditing || massEditValue === "") {
            setIsMassEditing(null);
            return;
        }

        table.options.meta?.updateColumnData(isMassEditing, massEditValue);
        setIsMassEditing(null);
        setMassEditValue("");
    };

    const rowsToUpdateCount = table.getFilteredRowModel().rows.length;

    return (
        <div className="planeacion-table-wrapper">
            
            {/* Barra de Edición Masiva - Estilo Flotante */}
            {isMassEditing && (
                <div className="mass-edit-bar">
                    <span style={{opacity: 0.8}}>Editar Columna:</span>
                    <strong>{table.getColumn(isMassEditing)?.columnDef.header}</strong>
                    
                    <input
                        type="text"
                        value={massEditValue}
                        onChange={e => setMassEditValue(e.target.value)}
                        onKeyDown={e => { if (e.key === 'Enter') handleMassEditSubmit(); }}
                        placeholder={`Valor para ${rowsToUpdateCount} filas...`}
                        className="input-mass-edit"
                        autoFocus
                    />
                    <button 
                        onClick={handleMassEditSubmit} 
                        className="btn-apply"
                        disabled={massEditValue === ""}
                    >
                        Aplicar
                    </button>
                    <button onClick={() => setIsMassEditing(null)} className="btn-cancel">
                        ✕
                    </button>
                </div>
            )}
            
            <table className="data-table">
                <thead>
                    {table.getHeaderGroups().map(headerGroup => (
                        <React.Fragment key={headerGroup.id}>
                            {/* Fila 1: Títulos */}
                            <tr>
                                {headerGroup.headers.map(header => (
                                    <th
                                        key={header.id}
                                        style={{ width: header.column.columnDef.size }}
                                        className="th-header"
                                        onDoubleClick={() => handleMassEditStart(header.column.id)} 
                                    >
                                        <div 
                                            className="header-content"
                                            onClick={header.column.getToggleSortingHandler()}
                                        >
                                            {header.isPlaceholder ? null : header.column.columnDef.header}
                                            
                                            <div style={{display: 'flex', alignItems: 'center'}}>
                                                {/* Indicador de Edición Activa */}
                                                {isMassEditing === header.column.id && (
                                                    <span className="mass-edit-indicator" title="Edición masiva activa">✎</span>
                                                )}
                                                
                                                {/* Indicador de Sort */}
                                                <span style={{marginLeft: '4px', fontSize: '10px', opacity: 0.6}}>
                                                    {{
                                                        asc: '▲',
                                                        desc: '▼',
                                                    }[header.column.getIsSorted()] ?? ''}
                                                </span>
                                            </div>
                                        </div>
                                    </th>
                                ))}
                            </tr>
                            
                            {/* Fila 2: Filtros - Ahora integrados visualmente */}
                            <tr>
                                {headerGroup.headers.map(header => (
                                    <th key={`${header.id}-filter`} className="th-filter">
                                        {header.isPlaceholder ? null : (
                                            <FilterComponent column={header.column} table={table} />
                                        )}
                                    </th>
                                ))}
                            </tr>
                        </React.Fragment>
                    ))}
                </thead>

                <tbody>
                    {table.getRowModel().rows.map(row => (
                        <tr key={row.id} className="tr-row">
                            {row.getVisibleCells().map(cell => (
                                <td 
                                    key={cell.id} 
                                    className={`td-cell ${isMassEditing === cell.column.id ? 'highlight-mass-edit' : ''}`}
                                >
                                    <EditableCell
                                        getValue={cell.getValue}
                                        row={row}
                                        column={cell.column}
                                        table={table}
                                    />
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            
            {rowsToUpdateCount === 0 && (
                <div className="no-data">
                    <span style={{fontSize: '2rem', marginBottom: '10px'}}>📭</span>
                    <span>No se encontraron registros.</span>
                </div>
            )}
        </div>
    );
}