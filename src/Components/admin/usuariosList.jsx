import React from 'react';
// Importa los estilos exportados desde AdminTemplate.js (asegúrate de que exportas 'styles')
import { styles } from './adminTemplate'; 

export default function UsuariosList({ users, isLoading, removeUser,currentPage,totalPages,onNextPage,onPrevPage,onEdit }) { 

    const paginationContainerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '15px',
        marginTop: '20px',
    };
    
    // Estilo base para los botones de paginación
    const paginationButtonStyle = {
        ...styles.buttonPrimary, // Reutiliza el estilo primario
        padding: '8px 16px',
        minWidth: '100px',
    };

    const buttonEditStyle = {
        ...styles.buttonPrimary, // O un color diferente
        background: '#6394a3ff', // Color informativo/azul claro
        marginLeft: '8px', 
        padding: '6px 10px',
    };

    return(
        <>
                {isLoading ? (
                    <div>Cargando usuarios...</div>
                ) : (users && users.length === 0 && currentPage === 1) ? ( 
                    // Muestra esto solo si no hay usuarios en la primera carga
                    <div>No hay usuarios registrados.</div>
                ) : (
                    // ... (La tabla de usuarios permanece igual)
                    <div style={{ overflowX: "auto" }}>
                        <table style={styles.table}>
                            <thead>
                                <tr>
                                    <th style={styles.th}>Nombre</th> 
                                    <th style={styles.th}>Correo</th> 
                                    <th style={styles.th}>Residencia</th> 
                                    <th style={styles.th}>Edad</th> 
                                    <th style={styles.th}>Rol</th> 
                                    <th style={styles.th}>Acciones</th> 
                                </tr>
                            </thead>
                            <tbody>
                                {users && users.map((u) => ( 
                                    <tr key={u.idUsuarios} style={styles.tr}> 
                                        <td style={styles.td}>{u.nombre}</td>
                                        <td style={styles.td}>{u.correo}</td>
                                        <td style={styles.td}>{u.estadoDeResidencia}</td>
                                        <td style={styles.td}>{u.edad}</td>
                                        <td style={styles.td}>{u.rol}</td>
                                        <td style={styles.td}>
                                            <button 
                                                onClick={() => removeUser(u.idUsuarios)} 
                                                style={styles.buttonDanger}
                                            >
                                                Borrar
                                            </button>
                                            <button 
                                        onClick={() => onEdit(u)} // Llama a la función del padre y le pasa el usuario (u)
                                        style={buttonEditStyle}
                                    >
                                        Editar
                                        </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Solo muestra los controles si hay más de una página y no está cargando */}
                {!isLoading && totalPages > 1 && (
                    <div style={paginationContainerStyle}>
                        <button 
                            onClick={onPrevPage} 
                            disabled={currentPage === 1}
                            style={paginationButtonStyle}
                        >
                            &larr; Anterior
                        </button>
                        
                        <span>Página {currentPage} de {totalPages}</span>

                        <button 
                            onClick={onNextPage} 
                            disabled={currentPage === totalPages}
                            style={paginationButtonStyle}
                        >
                            Siguiente &rarr;
                        </button>

                        
                    </div>
                )}
           
        
        </>
    )
}

