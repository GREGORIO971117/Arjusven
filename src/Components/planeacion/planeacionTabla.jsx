import React from 'react';
import FilterComponent from './FilterComponent';
import EditableCell from './editableCell';
import './PlaneacionStyles.css';

export default function PlaneacionTabla({ table }) {
    if (!table) return <div>Cargando tabla...</div>;

    return (
        <div className="planeacion-table-wrapper">
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
                                    >
                                        <div 
                                            className="header-content"
                                            onClick={header.column.getToggleSortingHandler()}
                                        >
                                            {header.isPlaceholder ? null : header.column.columnDef.header}
                                            <span>
                                                {{
                                                    asc: ' 🔼',
                                                    desc: ' 🔽',
                                                }[header.column.getIsSorted()] ?? null}
                                            </span>
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
                                <td key={cell.id} className="td-cell">
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
            
            {table.getRowModel().rows.length === 0 && (
                <div className="no-data">
                    No se encontraron registros.
                </div>
            )}
        </div>
    );
}