import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import { Box, Grid, Card, CardContent } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

function Home() {
    const [ticketsData, setTicketsData] = useState([]);

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

    const totalTickets = ticketsData.length;
    const openTickets = ticketsData.filter(t => t.currentStatus === 'Abierto').length;
    const closedTickets = ticketsData.filter(t => t.currentStatus === 'Cerrado').length;

    // Datos para el gráfico
    const chartData = [
        { name: 'Abiertos', value: openTickets },
        { name: 'Cerrados', value: closedTickets },
    ];

    const cardStyle = {
        backgroundColor: '#f5f5f5',
        borderLeft: '5px solid',
        borderColor: '#4CAF50', // Verde de ejemplo
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

    return (
        <Box sx={{ p: 4 }}>
            <Typography variant="h4" sx={{ mb: 4, textAlign: 'center', color: '#333' }}>
                Dashboard de Tickets de Servicio del dia de hoy
            </Typography>
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
                <Typography variant="h6" sx={{ mb: 2, textAlign: 'center' }}>
                    Tickets por supervisor
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="value" fill="#8884d8" />

                                                <Bar dataKey="value" fill="#8884d8" />
                        <Bar dataKey="value" fill="#8884d8" />
<Bar dataKey="value" fill="#8884d8" />

                    </BarChart>
                </ResponsiveContainer>
            </Box>
        </Box>
    );
}



export default Home;
