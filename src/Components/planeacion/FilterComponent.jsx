import React, { useMemo } from 'react';
import './PlaneacionStyles.css';

export default function FilterComponent({ column, table }) {
    const columnFilterValue = column.getFilterValue() ?? '';
    const { filterType } = column.columnDef.meta || {};

    const sortedUniqueValues = useMemo(() => {
        if (filterType !== 'select') return [];
        const uniqueValues = new Set();
        table.getPreFilteredRowModel().rows.forEach((row) => {
            uniqueValues.add(row.getValue(column.id));
        });
        return Array.from(uniqueValues).sort();
    }, [column.id, table.getPreFilteredRowModel().rows, filterType]);

    if (filterType === 'select') {
        return (
            <select
                value={columnFilterValue}
                onChange={e => column.setFilterValue(e.target.value)}
                className="select-filter"
                onClick={e => e.stopPropagation()}
            >
                <option value="">Todos</option>
                {sortedUniqueValues.map(value => (
                    <option key={value} value={value}>{value}</option>
                ))}
            </select>
        );
    }

    if (filterType === 'text') {
        return (
            <input
                type="text"
                value={columnFilterValue}
                onChange={e => column.setFilterValue(e.target.value)}
                placeholder="Buscar..."
                className="input-filter"
                onClick={e => e.stopPropagation()}
            />
        );
    }

    return null;
}