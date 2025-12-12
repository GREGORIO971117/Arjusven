import React, { useState, useEffect, useCallback } from 'react';
import Typography from '@mui/material/Typography';
import { Box, Grid, Card, CardContent, FormControl, InputLabel, Select, MenuItem, TextField } from '@mui/material';
// Iconos
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import DashboardIcon from '@mui/icons-material/Dashboard';
import EventBusyIcon from '@mui/icons-material/EventBusy'; 
// Gráficos
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
// Fechas
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { format } from 'date-fns';
// API y Datos
import { apiRequest } from '../login/Api';
import datos from '../../assets/datos.json';

const API_BASE_URL = '/tickets/dashboard';

function TablaTemplate() { 
    // 1. Estados para los datos
    const [ticketsData, setTicketsData] = useState([]); // Lista de tickets (para tablas futuras)
    const [stats, setStats] = useState({                // Estadísticas calculadas por el Backend
        total: 0,
        open: 0,
        closed: 0,
        canceled: 0
    });

    // 2. Estados de UI
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    
    // 3. Estados de Filtros
    const nameSup = datos.supervisores || []; 
    const today = new Date();
    const startOfToday = new Date(today.setHours(0, 0, 0, 0)); 
    
    const [selectedSupervisor, setSelectedSupervisor] = useState(nameSup.length > 0 ? nameSup[0] : '');
    const [startDate, setStartDate] = useState(startOfToday); 
    const [endDate, setEndDate] = useState(startOfToday); 

    // 4. Lógica de Petición al Backend
    const fetchTickets = useCallback(async () => {
        if (!selectedSupervisor) return;

        setIsLoading(true);
        setError("");

        // Formatear fechas para Spring Boot (yyyy-MM-dd)
        const startParam = startDate ? format(startDate, 'yyyy-MM-dd') : null;
        const endParam = endDate ? format(endDate, 'yyyy-MM-dd') : null;
        
        const queryParams = new URLSearchParams();
        if (startParam) queryParams.append('startDate', startParam); 
        if (endParam) queryParams.append('endDate', endParam);
        if (selectedSupervisor) queryParams.append('supervisor', selectedSupervisor);

        const finalURL = `${API_BASE_URL}?${queryParams.toString()}`;

        try {
            const response = await apiRequest(finalURL, { method: 'GET' }); 
            
            // Si es 204 No Content, limpiamos todo
            if (response.status === 204) {
                 setTicketsData([]); 
                 setStats({ total: 0, open: 0, closed: 0, canceled: 0 });
                 return;
            }

            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}.`);
            }
            
            // Recibimos el DTO { tickets: [], totalTickets: X, ... }
            const data = await response.json();
            
            // Guardamos la lista de tickets
            setTicketsData(data.tickets || []);

            // Guardamos las estadísticas que vienen del backend
            setStats({
                total: data.totalTickets || 0,
                open: data.ticketsAbiertos || 0,
                closed: data.ticketsCerrados || 0,
                canceled: data.ticketsCancelados || 0
            });
            
        } catch (err) {
            console.error('Error al cargar dashboard:', err);
            setError(err.message || "No se pudo conectar al servidor.");
            setTicketsData([]);
            setStats({ total: 0, open: 0, closed: 0, canceled: 0 });
        } finally {
            setIsLoading(false);
        }
    }, [startDate, endDate, selectedSupervisor]);

    // Disparar la búsqueda cuando cambian los filtros
    useEffect(() => {
        fetchTickets();
    }, [fetchTickets]); 

    const handleSupervisorChange = (event) => {
        setSelectedSupervisor(event.target.value);
    };

    // 5. Configuración de la Gráfica usando el estado 'stats'
    const chartData = [
        { name: 'Abiertos', value: stats.open, color: '#FF9800' },
        { name: 'Cerrados', value: stats.closed, color: '#4CAF50' },
        { name: 'Cancelados', value: stats.canceled, color: '#F44336' },
    ];
    
    // Estilos
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
            return startString === endString 
                ? `Dashboard del ${startString}` 
                : `Dashboard del ${startString} al ${endString}`;
        }
        return 'Dashboard de Tickets';
    };

    // Verificación de datos basada en el total recibido del back
    const hasData = stats.total > 0;

    if (error) return <Typography color="error" sx={{ p: 4 }}>Error al cargar: {error}</Typography>;

    return (
        <Box sx={{ p: 4 }}>
            {/* --- SECCIÓN DE FILTROS --- */}
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', mb: 4 }}>
                <Typography variant="h4" sx={{ mb: 2, textAlign: 'center', color: '#333' }}>
                    {getTitle()}
                </Typography>
                
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
                    
            {/* --- CONTENIDO --- */}
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
                        No hay actividad registrada para {selectedSupervisor} en este rango.
                    </Typography>
                </Box>
            ) : (
                <>
                    {/* TARJETAS KPI (Usando stats del Backend) */}
                    <Grid container spacing={3} justifyContent="center">
                        <Grid item xs={12} sm={6} md={3}>
                            <Card sx={{ ...cardStyle, borderColor: '#1976D2' }}>
                                <DashboardIcon sx={{ ...iconStyle, color: '#1976D2' }} />
                                <CardContent>
                                    <Typography variant="h6">Totales</Typography>
                                    <Typography variant="h4">{stats.total}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Card sx={{ ...cardStyle, borderColor: '#FF9800' }}>
                                <AccessTimeIcon sx={{ ...iconStyle, color: '#FF9800' }} />
                                <CardContent>
                                    <Typography variant="h6">Abiertos</Typography>
                                    <Typography variant="h4">{stats.open}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Card sx={{ ...cardStyle, borderColor: '#4CAF50' }}>
                                <CheckCircleOutlineIcon sx={{ ...iconStyle, color: '#4CAF50' }} />
                                <CardContent>
                                    <Typography variant="h6">Cerrados</Typography>
                                    <Typography variant="h4">{stats.closed}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Card sx={{ ...cardStyle, borderColor: '#F44336' }}>
                                <CancelOutlinedIcon sx={{ ...iconStyle, color: '#F44336' }} />
                                <CardContent>
                                    <Typography variant="h6">Cancelados</Typography>
                                    <Typography variant="h4">{stats.canceled}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>

                    {/* GRÁFICA */}
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