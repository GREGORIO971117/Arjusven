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

const API_BASE_URL = '/tickets';

function TablaTemplate() { // Capitalicé el nombre del componente (Convención React)
    const [ticketsData, setTicketsData] = useState([]);
    const [supervisorTickets, setSupervisorTickets] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    
    const nameSup = datos.supervisores || []; 
    const today = new Date();
    // Clona y resetea la hora para evitar problemas de zona horaria
    const startOfToday = new Date(today.setHours(0, 0, 0, 0)); 
    
    const [selectedSupervisor, setSelectedSupervisor] = useState(nameSup.length > 0 ? nameSup[0] : '');
    const [startDate, setStartDate] = useState(startOfToday); 
    const [endDate, setEndDate] = useState(startOfToday); 

    const fetchTickets = useCallback(async () => {
        setIsLoading(true);
        setError("");

        // Validación para evitar errores si las fechas son nulas
        const startParam = startDate ? format(startDate, 'yyyy-MM-dd') : null;
        const endParam = endDate ? format(endDate, 'yyyy-MM-dd') : null;
        
        const queryParams = new URLSearchParams();
        if (startParam) queryParams.append('startDate', startParam); 
        if (endParam) queryParams.append('endDate', endParam);

        const queryString = queryParams.toString();
        const finalURL = queryString ? `${API_BASE_URL}?${queryString}` : API_BASE_URL;

        try {
            const response = await apiRequest(finalURL, { 
                method: 'GET'
            }); 
            
            if (response.status === 204) {
                 setTicketsData([]); // 204 significa "No Content", así que limpiamos array
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
    }, [startDate, endDate]);

    useEffect(() => {
        fetchTickets();
    }, [fetchTickets]); 

    useEffect(() => {
        const finalFilteredTickets = ticketsData.filter(t => t.servicios.supervisor === selectedSupervisor);
        setSupervisorTickets(finalFilteredTickets);
    }, [selectedSupervisor, ticketsData]); 

    const handleSupervisorChange = (event) => {
        setSelectedSupervisor(event.target.value);
    };

    // Cálculos
    const totalTickets = supervisorTickets.length;
    const openTickets = supervisorTickets.filter(t => t.servicios.situacionActual === 'Abierta').length;
    const closedTickets = supervisorTickets.filter(t => t.servicios.situacionActual === 'Cerrado').length;
    const cancelTickets = supervisorTickets.filter(t => t.servicios.situacionActual === 'Cancelada por PC').length;

    
    const chartData = [
        { name: 'Abiertos', value: openTickets, color: '#FF9800' },
        { name: 'Cerrados', value: closedTickets, color: '#4CAF50' },
        { name: 'Cancelados', value: cancelTickets, color: '#F44336' },
    ];
    
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

    // 🎯 Lógica para detectar si hay datos
    const hasData = ticketsData.length > 0;

    if (error) return <Typography color="error" sx={{ p: 4 }}>Error al cargar: {error}</Typography>;

    return (
        <Box sx={{ p: 4 }}>
            {/* 1. SECCIÓN DE FILTROS (Siempre visible) */}
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', mb: 4 }}>
                <Typography variant="h4" sx={{ mb: 2, textAlign: 'center', color: '#333' }}>
                    {getTitle()}
                </Typography>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <DatePicker
                            label="Fecha de inicio"
                            value={startDate}
                            onChange={(newValue) => setStartDate(newValue)}
                            renderInput={(params) => <TextField {...params} />}
                        />
                        <Typography variant="body1">al</Typography>
                        <DatePicker
                            label="Fecha de fin"
                            value={endDate}
                            onChange={(newValue) => setEndDate(newValue)}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </Box>
                </LocalizationProvider>
            </Box>
                    
            {isLoading ? (
                <Typography sx={{ textAlign: 'center', mt: 4, color: '#666' }}>
                    Cargando información...
                </Typography>
            ) : !hasData ? (
                <Box sx={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    mt: 8, 
                    opacity: 0.7 
                }}>
                    <EventBusyIcon sx={{ fontSize: 80, color: '#9e9e9e', mb: 2 }} />
                    <Typography variant="h5" color="textSecondary" gutterBottom>
                        No se encontraron tickets
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                        No hay actividad registrada para el rango de fechas seleccionado.
                    </Typography>
                </Box>
            ) : (
                <>
                    <Grid container spacing={3} justifyContent="center">
                        <Grid item xs={12} sm={6} md={4}>
                            <Card sx={{ ...cardStyle, borderColor: '#1976D2' }}>
                                <DashboardIcon sx={{ ...iconStyle, color: '#1976D2' }} />
                                <CardContent>
                                    <Typography variant="h6">Tickets Totales</Typography>
                                    <Typography variant="h4">{totalTickets}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <Card sx={{ ...cardStyle, borderColor: '#FF9800' }}>
                                <AccessTimeIcon sx={{ ...iconStyle, color: '#FF9800' }} />
                                <CardContent>
                                    <Typography variant="h6">Tickets Abiertos</Typography>
                                    <Typography variant="h4">{openTickets}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <Card sx={{ ...cardStyle, borderColor: '#4CAF50' }}>
                                <CheckCircleOutlineIcon sx={{ ...iconStyle, color: '#4CAF50' }} />
                                <CardContent>
                                    <Typography variant="h6">Tickets Cerrados</Typography>
                                    <Typography variant="h4">{closedTickets}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <Card sx={{ ...cardStyle, borderColor: '#F44336' }}>
                                <CancelOutlinedIcon sx={{ ...iconStyle, color: '#F44336' }} />
                                <CardContent>
                                    <Typography variant="h6">Tickets Cancelados</Typography>
                                    <Typography variant="h4">{cancelTickets}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>

                    <Box sx={{ mt: 5, p: 3, backgroundColor: '#f9f9f9', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 2 }}>
                            <Typography variant="h6" component="h2" sx={{ mr: 2 }}>
                                Incidencias por supervisor:
                            </Typography>
                            <FormControl variant="outlined" sx={{ minWidth: 150 }}>
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
                        
                        {/* Verificamos si el supervisor seleccionado tiene datos específicos */}
                        {supervisorTickets.length > 0 ? (
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
                        ) : (
                            <Typography sx={{ textAlign: 'center', py: 5, color: '#666' }}>
                                El supervisor {selectedSupervisor} no tiene tickets en estas fechas.
                            </Typography>
                        )}
                    </Box>
                </>
            )}
        </Box>
    );
}

export default TablaTemplate;