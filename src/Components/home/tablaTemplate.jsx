import React, { useState, useEffect, useCallback } from 'react';
import Typography from '@mui/material/Typography';
import { Box, Grid, Card, CardContent, FormControl, InputLabel, Select, MenuItem, TextField } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { apiRequest } from '../login/Api';
import datos from '../../assets/datos.json';
import { format } from 'date-fns';

const API_BASE_URL = '/tickets';

function tablaTemplate() {
    const [ticketsData, setTicketsData] = useState([]);
    const [supervisorTickets, setSupervisorTickets] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    
    // Obtener la lista de supervisores
    const nameSup = datos.supervisores || []; 

    // 🎯 AJUSTE 1: Inicialización de Fechas al inicio del día de hoy
    const today = new Date();
    // Clona y resetea la hora para evitar problemas de zona horaria al formatear
    const startOfToday = new Date(today.setHours(0, 0, 0, 0)); 
    
    const [selectedSupervisor, setSelectedSupervisor] = useState(nameSup.length > 0 ? nameSup[0] : '');
    const [startDate, setStartDate] = useState(startOfToday); 
    const [endDate, setEndDate] = useState(startOfToday); 


    // 🎯 fetchTickets: Correcto uso de useCallback y URLSearchParams
    const fetchTickets = useCallback(async () => {
        setIsLoading(true);
        setError("");

        // 1. Formatear las fechas a 'YYYY-MM-DD'
        // NOTA: Si startDate o endDate son null, format() lanzará un error. 
        // Ya que el estado se inicializa a startOfToday, esto no debería pasar.
        const startParam = startDate ? format(startDate, 'yyyy-MM-dd') : null;
        const endParam = endDate ? format(endDate, 'yyyy-MM-dd') : null;

        // 2. Construir el objeto URLSearchParams para manejar los parámetros de consulta
        const queryParams = new URLSearchParams();

        if (startParam) {
            // Se usa 'startDate' y 'endDate' para coincidir con el backend
            queryParams.append('startDate', startParam); 
        }
        if (endParam) {
            queryParams.append('endDate', endParam);
        }

        // 3. Construir la URL final con los parámetros de consulta
        const queryString = queryParams.toString();
        // Si hay query string, se agrega con ?, si no, se usa solo la base URL.
        const finalURL = queryString ? `${API_BASE_URL}?${queryString}` : API_BASE_URL;

        try {
            const response = await apiRequest(finalURL, { 
                method: 'GET'
            }); 
            
            if (!response.ok) {
                // Intenta leer el cuerpo de la respuesta en caso de un error HTTP
                const errorBody = await response.text(); 
                throw new Error(`Error ${response.status}: ${response.statusText}. Respuesta del servidor: ${errorBody}`);
            }
            const data = await response.json();
            // Asegurarse de que data sea un array, si no, usar un array vacío.
            setTicketsData(Array.isArray(data) ? data : []); 
            
        } catch (err) {
            console.error('Error al cargar los tickets:', err);
            // Mostrar un mensaje de error más específico
            setError(err.message || "No se pudo conectar al servidor de tickets o la respuesta no es válida.");
            setTicketsData([]);
        } finally {
            setIsLoading(false);
        }
    }, [startDate, endDate]); // Dependencia: El fetch se ejecuta cuando las fechas cambian

    // 🎯 useEffect para disparar fetchTickets
    useEffect(() => {
        fetchTickets();
    }, [fetchTickets]); // Se dispara al montar y cuando fetchTickets cambie (es decir, cuando cambien startDate/endDate)

    // 🎯 Filtro local: Filtramos por supervisor sobre los datos ya filtrados por fecha del backend
    useEffect(() => {
        const finalFilteredTickets = ticketsData.filter(t => t.servicios.supervisor === selectedSupervisor);
        setSupervisorTickets(finalFilteredTickets);

    }, [selectedSupervisor, ticketsData]); 

    const handleSupervisorChange = (event) => {
        setSelectedSupervisor(event.target.value);
    };

    // Cálculos de métricas (mantener como está)
    const totalTickets = supervisorTickets.length;
    const openTickets = supervisorTickets.filter(t => t.servicios.situacionActual === 'Abierta').length;
    const closedTickets = supervisorTickets.filter(t => t.servicios.situacionActual === 'Cerrado').length;
    
    // Datos para el gráfico (mantener como está)
    const chartData = [
        { name: 'Abiertos', value: openTickets, color: '#FF9800' },
        { name: 'Cerrados', value: closedTickets, color: '#4CAF50' },
    ];
    
    // ... (Estilos y getTitle se mantienen) ...
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
            // Mostrar solo una fecha si es el mismo día
            if (startString === endString) {
                return `Dashboard de Tickets del ${startString}`;
            }
            return `Dashboard de Tickets del ${startString} al ${endString}`;
        }
        return 'Dashboard de Tickets';
    };

    if (isLoading) return <Typography sx={{ p: 4 }}>Cargando datos del servidor...</Typography>;
    if (error) return <Typography color="error" sx={{ p: 4 }}>Error al cargar: {error}</Typography>;

    return (
        <Box sx={{ p: 4 }}>
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
            
            {/* ... Cards de métricas ... */}
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
            </Grid>

            {/* ... Sección de gráfico ... */}
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
        </Box>
    );
}

export default tablaTemplate;