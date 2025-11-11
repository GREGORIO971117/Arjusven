import React from 'react';

const styles = {
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        marginTop: '20px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        borderRadius: '8px',
        overflow: 'hidden',
    },
    th: {
        backgroundColor: '#4a698a', // Azul oscuro para el encabezado
        color: 'white',
        padding: '12px 15px',
        textAlign: 'left',
        borderBottom: '2px solid #3c526a',
    },
    td: {
        padding: '10px 15px',
        borderBottom: '1px solid #ddd',
        backgroundColor: 'white',
        verticalAlign: 'top',
    },
    tr: {
        ':hover': {
            backgroundColor: '#f5f5f5',
        }
    },
    buttonClose: {
        padding: '10px 20px',
        backgroundColor: '#e74c3c', // Rojo para cerrar
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontWeight: 'bold',
        transition: 'background-color 0.3s ease',
        float: 'right', // Mover a la derecha
        marginBottom: '15px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
    },
    container: {
        margin: '20px',
        padding: '20px',
        backgroundColor: '#f9f9f9',
        borderRadius: '10px',
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.15)',
    },
    title: {
        color: '#4a698a',
        borderBottom: '2px solid #4a698a',
        paddingBottom: '10px',
        marginBottom: '20px',
        fontSize: '1.5rem',
    }
};

/**
 * Componente que renderiza el historial de un inventario en formato de tabla.
 * @param {Array<Object>} historial - El array de objetos del pivote (Historial).
 * @param {Function} onClose - Función para cerrar la vista del historial.
 */

export default function RenderHistorial({ historial, onClose }) {

    return (
        <div style={styles.container}>
            <button onClick={onClose} style={styles.buttonClose}>Cerrar X</button>
            <h2 style={styles.title}>Historial de Asignaciones (Total: {historial.length})</h2>

            <div style={{ overflowX: "auto" }}>
                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th style={styles.th}>Fecha Asignación</th>
                            <th style={styles.th}>Incidencia</th>
                            <th style={styles.th}>Plaza</th>
                            <th style={styles.th}>Nombre ESS</th>
                            <th style={styles.th}>Técnico</th>
                        </tr>
                    </thead>
                    <tbody>
                        {historial.map((item, index) => (
                            <tr key={index} style={styles.tr}> 
                                {/* Fecha de Asignación del pivote */}
                                <td style={styles.td}>{item.fechaAsignacion || 'N/A'}</td>

                                {/* Número de Incidencia del Inventario (el campo numeroDeIncidencia) */}
                                <td style={styles.td}>{item.ticket?.servicios?.incidencia || 'N/A'}</td>
                                
                                {/* Plaza del Inventario (el campo plaza) */}
                                <td style={styles.td}>{item.inventario?.plaza || 'N/A'}</td>

                                {/* Nombre ESS del Ticket (a través de la relación ticket.servicios.nombreDeEss) */}
                                <td style={styles.td}>{item.ticket?.servicios?.nombreDeEss || 'N/A'}</td>

                                {/* Nombre del Técnico (a través de la relación ticket.servicios.tecnico) */}
                                <td style={styles.td}>{item.ticket?.servicios?.tecnico || 'N/A'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}