import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import { Box, Grid, Card, CardContent, FormControl, InputLabel, Select, MenuItem, TextField } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

function tablaTemplate({loadTickets}) {
    const [ticketsData, setTicketsData] = useState([]);
    const [supervisorTickets, setSupervisorTickets] = useState([]);
    const nameSup = ["Sin asignar", "David", "Eduardo"];
    const [selectedSupervisor, setSelectedSupervisor] = useState(nameSup[0]);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    // Efecto para cargar los datos del localStorage al inicio
    useEffect(() => {
        try {
            const storedData = localStorage.getItem('excelData');
            if (storedData) {
                const parsedData = JSON.parse(storedData);
                setTicketsData(parsedData);
            }
        } catch (error) {
            console.error("Error al cargar los datos de localStorage:", error);
        }
    }, []);

    // Efecto para filtrar los tickets según las selecciones del usuario
    useEffect(() => {
        
        let filteredByDate = ticketsData;
        
        if (startDate && endDate) {
            filteredByDate = ticketsData.filter(t => {

                // Se parsea la fecha de la cadena "DD/MM/YYYY" para crear un objeto Date válido
                const [day, month, year] = t.currentDate.split('/');
                const ticketDate = new Date(`${year}-${month}-${day}`); 
                
                const normalizedStartDate = new Date(startDate);
                normalizedStartDate.setHours(0, 0, 0, 0);
                
                const normalizedEndDate = new Date(endDate);
                normalizedEndDate.setHours(0, 0, 0, 0);
                
                return ticketDate >= normalizedStartDate && ticketDate <= normalizedEndDate;
            });
        }
        
        // Se utiliza la clave "supervisor" para el filtro, que es la correcta
        const finalFilteredTickets = filteredByDate.filter(t => t.supervisor === selectedSupervisor);
        setSupervisorTickets(finalFilteredTickets);
    }, [selectedSupervisor, ticketsData, startDate, endDate]);

    const handleSupervisorChange = (event) => {
        setSelectedSupervisor(event.target.value);
    };

    const totalTickets = supervisorTickets.length;
    const openTickets = supervisorTickets.filter(t => t.currentStatus === 'Abierto').length;
    const closedTickets = supervisorTickets.filter(t => t.currentStatus === 'Cerrado').length;
    
    const chartData = [

        { name: 'Abiertos', value: openTickets, color: '#FF9800' },
        { name: 'Cerrados', value: closedTickets, color: '#4CAF50' },

    ];

    const cardStyle = {
        backgroundColor: '#f5f5f5',
        borderLeft: '5px solid',
        borderColor: '#4CAF50',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
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
            return `Dashboard de Tickets del ${startString} al ${endString}`;
        }
        return 'Dashboard de Tickets';
    };

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
                        <Typography variant="body1"></Typography>
                        <DatePicker
                            label="Fecha de fin"
                            value={endDate}
                            onChange={(newValue) => setEndDate(newValue)}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </Box>
                </LocalizationProvider>
            </Box>
            
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
                        <Bar dataKey="value" fill="#8884d8" />
                    </BarChart>
                </ResponsiveContainer>
            </Box>
        </Box>
    );
}

export default tablaTemplate;