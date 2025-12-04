import React, { useState, useMemo, useEffect } from 'react'; // 1. Agregamos useEffect
import {apiRequest} from '../login/Api'

import {
    useReactTable,
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    getPaginationRowModel,
} from '@tanstack/react-table';

// import { mockData } from '../../assets/mockData'; // 2. Ya no usamos mockData
import { ColumnConfig } from '../../assets/servicios';
import PlaneacionTemplate from './planeacionTemplate';

// Ajusta esta URL a tu puerto real
const API_URL = '/tickets/planeacion'; 

export default function PlaneacionPage() {
    
    // 3. Inicializamos data como array vacío [] en lugar de mockData
    const [data, setData] = useState([]);
    
    // 4. Estados para manejar la experiencia de usuario (Carga y Errores)
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const [columnFilters, setColumnFilters] = useState([]);
    const [sorting, setSorting] = useState([]);
    const [columnVisibility, setColumnVisibility] = useState({});

    // 5. EFECTO: Cargar datos al montar el componente
    useEffect(() => {
        fetchPlaneacionData();
    }, []);

    const fetchPlaneacionData = async () => {
        setIsLoading(true);
        setError(null);
        try {
            
            const response = await apiRequest(API_URL, {method: "GET"});

            if (!response.ok) {
                if(response.status === 204) {
                     setData([]); // No hay contenido, dejamos tabla vacía
                     return;
                }
                throw new Error('Error al obtener datos del servidor.');
            }

            const result = await response.json();
            setData(result); // Guardamos los datos planos (DTOs) en el estado

        } catch (err) {
            console.error("Error fetch:", err);
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    // 6. Definición de Columnas (Se mantiene igual, solo asegura que ColumnConfig coincida con los nombres del DTO)
    const columns = useMemo(() => {
        return ColumnConfig.map(cfg => ({
            accessorKey: cfg.accessorKey, // DEBE COINCIDIR con los nombres en PlaneacionDTO.java
            header: cfg.header,
            size: cfg.size,
            meta: {
                filterType: cfg.filterType 
            },
            cell: (props) => props.getValue(), 
        }));
    }, []);

    // 7. Función de Guardado (Optimista) - Se mantiene igual
    const updateData = (rowIndex, columnId, value) => {
        setData(old =>
            old.map((row, index) => {
                if (index === rowIndex) {
                    return { ...old[rowIndex], [columnId]: value };
                }
                return row;
            })
        );
        console.log(`Guardado local: Fila ${rowIndex}, Col ${columnId} -> ${value}`);
        // TODO: Aquí podrías agregar una llamada a la API para guardar el cambio real en BD
    };

    // 8. Inicialización de TanStack Table
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
        
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),

        meta: {
            updateData,
        },
        
        initialState: {
            pagination: { pageSize: 500 },
        }
    });

    // 9. Renderizado condicional para carga y errores
    if (isLoading) {
        return <div style={{ padding: '20px', textAlign: 'center' }}>Cargando datos de planeación...</div>;
    }

    if (error) {
        return <div style={{ padding: '20px', color: 'red', textAlign: 'center' }}>Error: {error}</div>;
    }

    return <PlaneacionTemplate table={table} />;
}