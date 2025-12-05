import React, { useState, useMemo, useEffect } from 'react';
import { apiRequest } from '../login/Api';

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
            const response = await apiRequest(API_URL, { method: "GET" });

            if (!response.ok) {
                if (response.status === 204) {
                    setData([]);
                    return;
                }
                throw new Error("Error al obtener datos del servidor");
            }

            const result = await response.json();
            setData(result);

        } catch (err) {
            console.error("Error fetch:", err);
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const columns = useMemo(() => {
        return ColumnConfig.map(cfg => ({
            id: cfg.accessorKey,
            accessorKey: cfg.accessorKey,
            header: cfg.header,
            size: cfg.size,
            meta: { filterType: cfg.filterType },
            cell: (props) => props.getValue(),
        }));
    }, []);

   const updateData = async (rowIndex, columnId, value) => {

    setData(old =>
        old.map((row, index) => {
            if (index === rowIndex) {
                return { ...row, [columnId]: value };
            }
            return row;
        })
    );

    const updatedRow = data[rowIndex];

    if (!updatedRow) {
        console.error("Fila no encontrada");
        return;
    }

    const idTicket = updatedRow.incidencia;

    if (!idTicket) {
        console.error("idTicket NO EXISTE en el DTO");
        return;
    }

    try {
        const response = await fetch(`/api/planeacion/${idTicket}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ [columnId]: value })
        });

        if (!response.ok) {
            let message = "Error al guardar en el servidor.";

            try {
                const json = await response.json();
                message = json.message || message;
            } catch (e) {
                // No viene JSON en la respuesta → ignorar
            }

            throw new Error(message);
        }

    } catch (error) {
        console.error("Error al guardar en el servidor:", error);
    }
};


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

    if (isLoading) {
        return <div style={{ padding: '20px', textAlign: 'center' }}>Cargando datos...</div>;
    }

    if (error) {
        return <div style={{ padding: '20px', color: 'red', textAlign: 'center' }}>Error: {error}</div>;
    }

    return <PlaneacionTemplate table={table} />;
}
