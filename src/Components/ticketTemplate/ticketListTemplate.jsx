import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, Typography, Box, useTheme } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LabelImportantIcon from '@mui/icons-material/LabelImportant';

function CustomTicketCard({ ticketData }) {
  const theme = useTheme();
  const ticketRoute = `/ticket/${ticketData.index}`;

  const statusColors = {
    Abierto: theme.palette.warning.main,
    Cerrado: theme.palette.success.main,
  };

  const statusIcons = {
    Abierto: <AccessTimeIcon sx={{ color: statusColors.Abierto, mr: 1 }} />,
    Cerrado: <CheckCircleOutlineIcon sx={{ color: statusColors.Cerrado, mr: 1 }} />,
  };
  
  const ticketStatus = ticketData.Estado || 'Abierto';

  return (
    <Card
      component={Link}
      to={ticketRoute}
      sx={{
        m: 1,
        textDecoration: 'none',
        color: 'inherit',
        borderRadius: '12px',
        boxShadow: theme.shadows[3], // Sombra más visible en estado normal
        transition: 'transform 0.3s, box-shadow 0.3s',
        '&:hover': {
          boxShadow: theme.shadows[8], // Sombra aún más pronunciada al pasar el mouse
          transform: 'translateY(-3px)',
        },
      }}
    >
      <Box 
        sx={{ 
          p: 2, 
          display: 'flex',
          alignItems: 'center',
          backgroundColor: '#f5f5f5',
          borderLeft: `5px solid ${statusColors[ticketStatus]}`,
        }}
      >
        {statusIcons[ticketStatus]}
        <Typography 
          variant="h6" 
          sx={{ fontWeight: 600, color: theme.palette.text.primary, fontSize: '1.1rem' }}
        >
          {ticketData.Incidencia}
        </Typography>
      </Box>

      <CardContent>
        <Typography 
          variant="body2" 
          sx={{ color: theme.palette.text.secondary, mb: 1, display: 'flex', alignItems: 'center' }}
        >
          <LabelImportantIcon sx={{ color: '#ccc', mr: 1, fontSize: '1rem' }}/>
          <Box component="span" sx={{ fontWeight: 'bold' }}>ID de Afiliado:</Box> {ticketData.Afiliado}
        </Typography>
        <Typography 
          variant="body2" 
          sx={{ color: theme.palette.text.secondary, display: 'flex', alignItems: 'center' }}
        >
          <LabelImportantIcon sx={{ color: '#ccc', mr: 1, fontSize: '1rem' }}/>
          <Box component="span" sx={{ fontWeight: 'bold' }}>Motivo del Servicio:</Box> {ticketData.Detalle}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default CustomTicketCard;