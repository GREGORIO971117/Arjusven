import React, { useState, useMemo, useEffect } from 'react';
import { apiRequest } from '../login/Api'; 
import EditableCell from './EditableCell'; // Asegúrate de que la ruta sea correcta

import {
    useReactTable,
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    getPaginationRowModel,
} from '@tanstack/react-table';

import { ColumnConfig } from '../../assets/servicios';
import PlaneacionTemplate from './planeacionTemplate';

const API_URL = '/planeacion';

export default function PlaneacionPage() {

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Estados de tabla
    const [columnFilters, setColumnFilters] = useState([]);
    const [sorting, setSorting] = useState([]);
    const [columnVisibility, setColumnVisibility] = useState({});

    useEffect(() => {
        fetchPlaneacionData();
    }, []);

    const fetchPlaneacionData = async () => {
        setIsLoading(true);
        setError(null);
        try {
            // Asumo que apiRequest devuelve el objeto response nativo
            const response = await apiRequest(API_URL, { method: "GET" });
            
            if (!response.ok) {
                 if (response.status === 204) { setData([]); return; }
                 throw new Error("Error al obtener datos");
            }
            
            const result = await response.json();
            setData(result);
        } catch (err) {
            console.error(err);
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const updateColumnData = async (columnId, newValue) => {
    // 1. **Identificar los ítems a actualizar**
    // Usaremos los datos filtrados/ordenados si la tabla los tiene aplicados.
    // table.getRowModel().rows solo tiene las filas visibles, lo cual es ideal.
    const rowsToUpdate = table.getRowModel().rows.map(row => ({
        idTicket: row.original.incidencia, // Asumiendo que 'incidencia' es tu ID
        currentValue: row.original[columnId],
        newValue: newValue,
    })).filter(item => item.currentValue !== newValue); // Solo actualizar si el valor ha cambiado.

    if (rowsToUpdate.length === 0) {
        alert("El nuevo valor es igual al actual para todas las celdas visibles o no hay filas.");
        return;
    }

    if (!window.confirm(`¿Estás seguro de que quieres actualizar ${rowsToUpdate.length} elementos de la columna "${columnId}" con el valor "${newValue}"?`)) {
        return;
    }

    console.log(`Iniciando actualización masiva de ${rowsToUpdate.length} elementos en columna ${columnId}.`);
    
    // 2. **Actualización Optimista (UI instantánea)**
    setData(old =>
        old.map(row => {
            // Encuentra si la fila actual está en las filas visibles a actualizar
            const item = rowsToUpdate.find(r => r.idTicket === row.incidencia);
            if (item) {
                return { ...row, [columnId]: newValue };
            }
            return row;
        })
    );

    // 3. **Llamadas Concurrentes al Backend**
    // Creamos un array de promesas de las llamadas PATCH individuales
    const updatePromises = rowsToUpdate.map(async (item) => {
        const encodedId = encodeURIComponent(item.idTicket);
        try {
            const response = await apiRequest(`${API_URL}/${encodedId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ [columnId]: newValue })
            });
            if (!response.ok) {
                throw new Error(`Error al guardar incidencia ${item.idTicket}`);
            }
            return { id: item.idTicket, status: 'success' };
        } catch (error) {
            console.error(error.message);
            // Devolver un error para un manejo posterior, pero no detener Promise.all
            return { id: item.idTicket, status: 'error', message: error.message };
        }
    });

    try {
        const results = await Promise.all(updatePromises);
        const errors = results.filter(r => r.status === 'error');
        
        if (errors.length > 0) {
            alert(`Actualización masiva finalizada con ${errors.length} errores. Consulta la consola para detalles.`);
        } else {
            alert("Actualización masiva exitosa.");
        }
    } catch (error) {
        console.error("Error grave en Promise.all:", error);
        alert("Ocurrió un error inesperado durante la actualización masiva.");
    } finally {
        fetchPlaneacionData(); 
    }
};



    // 🔹 FUNCIÓN UPDATE DATA (Conectada a tu EditableCell)
    const updateData = async (rowIndex, columnId, value) => {
        
        const rowData = data[rowIndex];
        
        if (!rowData) return;
        if (rowData[columnId] === value) return;

        // 2. Actualización Optimista (UI instantánea)
        setData(old =>
            old.map((row, index) => {
                if (index === rowIndex) {
                    return { ...row, [columnId]: value };
                }
                return row;
            })
        );

        const idTicket = rowData.incidencia; 

        try {
            // Encodeamos por si la incidencia tiene caracteres como '/'
            const encodedId = encodeURIComponent(idTicket);

            const response = await apiRequest(`${API_URL}/${encodedId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ [columnId]: value })
            });

            if (!response.ok) {
                const errorJson = await response.json().catch(() => ({}));
                throw new Error(errorJson.message || "Error al guardar en BD");
            }
            
            console.log("Guardado exitoso:", columnId, value);

        } catch (error) {
            console.error("Error al guardar:", error);
            // Opcional: Revertir el cambio en la UI o mostrar alerta
            alert(`Error al guardar: ${error.message}`);
            fetchPlaneacionData(); // Podrías recargar la tabla para asegurar consistencia
        }
    };

    // 🔹 CONFIGURACIÓN DE COLUMNAS
    const columns = useMemo(() => {
        return ColumnConfig.map(cfg => ({
            id: cfg.accessorKey,
            accessorKey: cfg.accessorKey,
            header: cfg.header,
            size: cfg.size,
            cell: EditableCell,            
            meta: { 
                filterType: cfg.filterType 
            }
        }));
    }, []);

    const table = useReactTable({
        data,
        columns,
        state: { sorting, columnFilters, columnVisibility },
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onColumnVisibilityChange: setColumnVisibility,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        
        // Pasamos updateData a meta para que EditableCell lo consuma
        meta: {
            updateData, 
            updateColumnData,
        },
        initialState: { pagination: { pageSize: 500 } }
    });

    if (isLoading) return <div>Cargando...</div>;
    if (error) return <div style={{color:'red'}}>Error: {error}</div>;

    return <PlaneacionTemplate table={table} />;
}