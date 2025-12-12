import React, { useState, useEffect, useCallback } from 'react';
import Typography from '@mui/material/Typography';
import { Box, Grid, Card, CardContent, FormControl, InputLabel, Select, MenuItem, TextField } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import DashboardIcon from '@mui/icons-material/Dashboard';
import EventBusyIcon from '@mui/icons-material/EventBusy'; 
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { apiRequest } from '../login/Api';
import datos from '../../assets/datos.json';
import { format } from 'date-fns';

const API_BASE_URL = '/tickets/dashboard'; // Sugerencia: Usa un endpoint específico si puedes

function TablaTemplate() { 
    // MODIFICACIÓN 1: Ya no necesitamos dos estados separados para tickets.
    // 'ticketsData' contendrá directamente los tickets filtrados del supervisor.
    const [ticketsData, setTicketsData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    
    const nameSup = datos.supervisores || []; 
    const today = new Date();
    const startOfToday = new Date(today.setHours(0, 0, 0, 0)); 
    
    const [selectedSupervisor, setSelectedSupervisor] = useState(nameSup.length > 0 ? nameSup[0] : '');
    const [startDate, setStartDate] = useState(startOfToday); 
    const [endDate, setEndDate] = useState(startOfToday); 

    // MODIFICACIÓN 2: fetchTickets ahora incluye 'selectedSupervisor' en la query
    const fetchTickets = useCallback(async () => {
        // Si no hay supervisor seleccionado, no hacemos la petición (opcional)
        if (!selectedSupervisor) return;

        setIsLoading(true);
        setError("");

        const startParam = startDate ? format(startDate, 'yyyy-MM-dd') : null;
        const endParam = endDate ? format(endDate, 'yyyy-MM-dd') : null;
        
        const queryParams = new URLSearchParams();
        if (startParam) queryParams.append('startDate', startParam); 
        if (endParam) queryParams.append('endDate', endParam);
        
        // AQUI AGREGAMOS EL SUPERVISOR A LA URL
        if (selectedSupervisor) queryParams.append('supervisor', selectedSupervisor);

        const queryString = queryParams.toString();
        const finalURL = queryString ? `${API_BASE_URL}?${queryString}` : API_BASE_URL;

        try {
            const response = await apiRequest(finalURL, { 
                method: 'GET'
            }); 
            
            if (response.status === 204) {
                 setTicketsData([]); 
                 return;
            }

            if (!response.ok) {
                const errorBody = await response.text(); 
                throw new Error(`Error ${response.status}: ${response.statusText}.`);
            }
            
            const data = await response.json();
            setTicketsData(Array.isArray(data) ? data : []); 
            
        } catch (err) {
            console.error('Error al cargar los tickets:', err);
            setError(err.message || "No se pudo conectar al servidor.");
            setTicketsData([]);
        } finally {
            setIsLoading(false);
        }
    }, [startDate, endDate, selectedSupervisor]); // Agregamos selectedSupervisor a dependencias

    useEffect(() => {
        fetchTickets();
    }, [fetchTickets]); 

    // MODIFICACIÓN 3: Eliminamos el useEffect que hacía el filtrado local.
    // Ya no necesitamos 'supervisorTickets' ni 'handleSupervisorChange' complejo.

    const handleSupervisorChange = (event) => {
        setSelectedSupervisor(event.target.value);
        // Al cambiar el estado, el useEffect de arriba detectará el cambio y disparará fetchTickets
    };

    // Cálculos (Usamos ticketsData directamente porque ya viene filtrado del back)
    const totalTickets = ticketsData.length;
    const openTickets = ticketsData.filter(t => t.servicios.situacionActual === 'Abierta').length;
    const closedTickets = ticketsData.filter(t => t.servicios.situacionActual === 'Cerrado').length;
    const cancelTickets = ticketsData.filter(t => t.servicios.situacionActual === 'Cancelada por PC').length;

    const chartData = [
        { name: 'Abiertos', value: openTickets, color: '#FF9800' },
        { name: 'Cerrados', value: closedTickets, color: '#4CAF50' },
        { name: 'Cancelados', value: cancelTickets, color: '#F44336' },
    ];
    
    // Estilos...
    const cardStyle = {
        backgroundColor: '#f5f5f5',
        borderLeft: '5px solid',
        borderColor: '#4CAF50',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        padding: '16px',
    };

    const iconStyle = {
        fontSize: 48,
        marginRight: '16px',
        color: '#4CAF50'
    };

    const getTitle = () => {
        if (startDate && endDate) {
            const startString = startDate.toLocaleDateString();
            const endString = endDate.toLocaleDateString();
            if (startString === endString) {
                return `Dashboard de Tickets del ${startString}`;
            }
            return `Dashboard de Tickets del ${startString} al ${endString}`;
        }
        return 'Dashboard de Tickets';
    };

    const hasData = ticketsData.length > 0;

    if (error) return <Typography color="error" sx={{ p: 4 }}>Error al cargar: {error}</Typography>;

    return (
        <Box sx={{ p: 4 }}>
            {/* SECCIÓN DE FILTROS */}
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', mb: 4 }}>
                <Typography variant="h4" sx={{ mb: 2, textAlign: 'center', color: '#333' }}>
                    {getTitle()}
                </Typography>
                
                {/* Contenedor de filtros: Fechas y Supervisor juntos */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            label="Fecha de inicio"
                            value={startDate}
                            onChange={(newValue) => setStartDate(newValue)}
                            renderInput={(params) => <TextField {...params} size="small" />}
                        />
                        <Typography variant="body1">al</Typography>
                        <DatePicker
                            label="Fecha de fin"
                            value={endDate}
                            onChange={(newValue) => setEndDate(newValue)}
                            renderInput={(params) => <TextField {...params} size="small" />}
                        />
                    </LocalizationProvider>

                    {/* MOVI EL SELECTOR DE SUPERVISOR AQUI ARRIBA PARA QUE SEA PARTE DEL FILTRO GENERAL */}
                    <FormControl variant="outlined" sx={{ minWidth: 200 }} size="small">
                        <InputLabel>Supervisor</InputLabel>
                        <Select
                            value={selectedSupervisor}
                            onChange={handleSupervisorChange}
                            label="Supervisor"
                        >
                            {nameSup.map((name) => (
                                <MenuItem key={name} value={name}>{name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
            </Box>
                    
            {isLoading ? (
                <Typography sx={{ textAlign: 'center', mt: 4, color: '#666' }}>
                    Cargando información...
                </Typography>
            ) : !hasData ? (
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', mt: 8, opacity: 0.7 }}>
                    <EventBusyIcon sx={{ fontSize: 80, color: '#9e9e9e', mb: 2 }} />
                    <Typography variant="h5" color="textSecondary" gutterBottom>
                        No se encontraron tickets
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                        No hay tickets para {selectedSupervisor} en este rango de fechas.
                    </Typography>
                </Box>
            ) : (
                <>
                    {/* TARJETAS KPI */}
                    <Grid container spacing={3} justifyContent="center">
                        <Grid item xs={12} sm={6} md={3}>
                            <Card sx={{ ...cardStyle, borderColor: '#1976D2' }}>
                                <DashboardIcon sx={{ ...iconStyle, color: '#1976D2' }} />
                                <CardContent>
                                    <Typography variant="h6">Totales</Typography>
                                    <Typography variant="h4">{totalTickets}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Card sx={{ ...cardStyle, borderColor: '#FF9800' }}>
                                <AccessTimeIcon sx={{ ...iconStyle, color: '#FF9800' }} />
                                <CardContent>
                                    <Typography variant="h6">Abiertos</Typography>
                                    <Typography variant="h4">{openTickets}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Card sx={{ ...cardStyle, borderColor: '#4CAF50' }}>
                                <CheckCircleOutlineIcon sx={{ ...iconStyle, color: '#4CAF50' }} />
                                <CardContent>
                                    <Typography variant="h6">Cerrados</Typography>
                                    <Typography variant="h4">{closedTickets}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Card sx={{ ...cardStyle, borderColor: '#F44336' }}>
                                <CancelOutlinedIcon sx={{ ...iconStyle, color: '#F44336' }} />
                                <CardContent>
                                    <Typography variant="h6">Cancelados</Typography>
                                    <Typography variant="h4">{cancelTickets}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>

                    {/* GRAFICA */}
                    <Box sx={{ mt: 5, p: 3, backgroundColor: '#f9f9f9', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
                        <Typography variant="h6" component="h2" sx={{ mb: 2, textAlign: 'center' }}>
                             Incidencias: {selectedSupervisor}
                        </Typography>
                        
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="value">
                                    {chartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </Box>
                </>
            )}
        </Box>
    );
}

export default TablaTemplate;