import React, { useState } from 'react';
import FilterComponent from './FilterComponent';
import EditableCell from './editableCell';
import './PlaneacionStyles.css'; // Asegúrate de tener los estilos para .mass-edit-bar

export default function PlaneacionTabla({ table }) {
    if (!table) return <div>Cargando tabla...</div>;

    // Estados para la edición masiva
    const [isMassEditing, setIsMassEditing] = useState(null); // Contiene el ID de la columna
    const [massEditValue, setMassEditValue] = useState("");

    const handleMassEditStart = (columnId) => {
        // No permitir edición masiva en columnas que no son editables (ej. 'incidencia' o IDs)
        // Puedes refinar esto agregando una propiedad 'massEditable: true' en ColumnConfig
        if (columnId === 'incidencia' || columnId === 'id') return; 

        setIsMassEditing(columnId);
        setMassEditValue(""); // Limpiar el valor anterior
    };

    const handleMassEditSubmit = () => {
        if (!isMassEditing || massEditValue === "") {
            setIsMassEditing(null);
            return;
        }

        // 💡 Llama a la nueva función updateColumnData que se pasa por 'meta'
        table.options.meta?.updateColumnData(isMassEditing, massEditValue);
        
        // Finalizar edición masiva (ocultar la UI)
        setIsMassEditing(null);
        setMassEditValue("");
    };

    // Usamos `getFilteredRowModel().rows.length` para saber cuántas filas están visibles
    const rowsToUpdateCount = table.getFilteredRowModel().rows.length;

    return (
        <div className="planeacion-table-wrapper">
            
            {/* 💡 UI de Edición Masiva (Flotante o Fija encima de la tabla) */}
            {isMassEditing && (
                <div className="mass-edit-bar">
                    <span>
                        Editando columna **{isMassEditing}**. Aplicar valor:
                    </span>
                    <input
                        type="text"
                        value={massEditValue}
                        onChange={e => setMassEditValue(e.target.value)}
                        onKeyDown={e => { if (e.key === 'Enter') handleMassEditSubmit(); }}
                        placeholder={`Nuevo valor para ${rowsToUpdateCount} filas...`}
                        className="input-mass-edit"
                        autoFocus
                    />
                    <button 
                        onClick={handleMassEditSubmit} 
                        className="btn-apply"
                        disabled={massEditValue === ""}
                    >
                        Aplicar a {rowsToUpdateCount} filas
                    </button>
                    <button onClick={() => setIsMassEditing(null)} className="btn-cancel">
                        Cancelar
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
                                        // ✅ SOLUCIÓN AL CONFLICTO: onDoubleClick aquí
                                        onDoubleClick={() => handleMassEditStart(header.column.id)} 
                                    >
                                        <div 
                                            className="header-content"
                                            // 💡 onClick para el ordenamiento
                                            onClick={header.column.getToggleSortingHandler()}
                                        >
                                            {header.isPlaceholder ? null : header.column.columnDef.header}
                                            <span>
                                                {{
                                                    asc: ' 🔼',
                                                    desc: ' 🔽',
                                                }[header.column.getIsSorted()] ?? null}
                                            </span>
                                            {/* 💡 Indicador de Edición Masiva */}
                                            {isMassEditing === header.column.id && (
                                                <span className="mass-edit-indicator">✎</span>
                                            )}
                                        </div>
                                    </th>
                                ))}
                            </tr>
                            
                            {/* Fila 2: Filtros */}
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
                    No se encontraron registros.
                </div>
            )}
        </div>
    );
}