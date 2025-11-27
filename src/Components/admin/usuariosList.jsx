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
    
    const paginationButtonStyle = {
        ...styles.buttonPrimary, 
        padding: '8px 16px',
        minWidth: '100px',
    };

    return(
        <>
                {isLoading ? (
                    <div>Cargando usuarios...</div>
                ) : (users && users.length === 0 && currentPage === 1) ? ( 
                    <div>No hay usuarios registrados.</div>
                ) : (
                    <div>
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
                                        onClick={() => onEdit(u)} 
                                        style={styles.navButton}
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

