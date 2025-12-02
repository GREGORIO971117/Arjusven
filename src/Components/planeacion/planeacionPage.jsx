import React, { useState, useMemo } from 'react';
import {
    useReactTable,
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    getPaginationRowModel,
} from '@tanstack/react-table';

// Importaciones locales
import { mockData } from '../../assets/mockData';
import { ColumnConfig } from '../../assets/servicios';
import PlaneacionTemplate from './planeacionTemplate';

export default function PlaneacionPage() {
    // 1. Estado de los Datos
    const [data, setData] = useState(mockData);
    
    // 2. Estados de la Tabla
    const [columnFilters, setColumnFilters] = useState([]);
    const [sorting, setSorting] = useState([]);
    const [columnVisibility, setColumnVisibility] = useState({});

    // 3. Definición de Columnas
    const columns = useMemo(() => {
        return ColumnConfig.map(cfg => ({
            accessorKey: cfg.accessorKey,
            header: cfg.header,
            size: cfg.size,
            // Guardamos metadatos extra para usarlos en el componente de Filtro
            meta: {
                filterType: cfg.filterType 
            },
            // Todas usan EditableCell por defecto
            cell: (props) => props.getValue(), 
        }));
    }, []);

    // 4. Función de Guardado (Optimista)
    const updateData = (rowIndex, columnId, value) => {
        setData(old =>
            old.map((row, index) => {
                if (index === rowIndex) {
                    return { ...old[rowIndex], [columnId]: value };
                }
                return row;
            })
        );
        console.log(`Guardado: Fila ${rowIndex}, Col ${columnId} -> ${value}`);
    };

    // 5. Inicialización de TanStack Table
    const table = useReactTable({
        data,
        columns,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
        },
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onColumnVisibilityChange: setColumnVisibility,
        
        // Modelos requeridos
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(), // ¡IMPORTANTE para que funcionen los filtros!
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),

        // Meta data personalizada para pasar funciones a las celdas
        meta: {
            updateData,
        },
        
        // Opciones de Paginación (Mostrar todo en scroll infinito virtual si se quisiera, aqui ponemos 500 para ver todo)
        initialState: {
            pagination: { pageSize: 500 },
        }
    });

    // 6. Renderizado
    return <PlaneacionTemplate table={table} />;
}