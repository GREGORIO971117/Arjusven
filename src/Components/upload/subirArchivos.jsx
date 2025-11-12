import React,{useState} from 'react';
import datosEstaticos from '../../assets/datos.json';
import RenderInventario from './subirInventarioTemplate';
import RenderTicket from './subirTicketTemplate';
import RenderEstaciones from './subirEstacionesTemplate';
import RenderUsuarios from './SubirUsuarioTemplate';
import { styles } from '../admin/adminTemplate';

export default function subirArchivos() {
    const [activeTab, setActiveTab] = useState('inventario');

    const renderContent=()=>{
        if (activeTab==='inventario') {

            return(
                <RenderInventario
                datosEstaticos={datosEstaticos}
                />
            );
        }if (activeTab==='ticket') {
            return(
                <RenderTicket
                datosEstaticos={datosEstaticos}
                />
            )
        }if (activeTab==='estaciones') {
            return(
                <RenderEstaciones
                />
            )
        }if (activeTab==='usuarios') {
            return(
                <RenderUsuarios
                />
            )
        }
    }

    return(
        <>
        <div className={styles.container}>
            <div style={styles.cardNav}>
                <button
                style={{ 
                     ...styles.navButton, 
                     ...(activeTab === "inventario" ? styles.activeNavButton : {}) 
                     }}
                onClick={() => setActiveTab('inventario')}>
                    Crear Articulo de inventario
                </button>

                <button
                style={{ 
                     ...styles.navButton, 
                     ...(activeTab === "ticket" ? styles.activeNavButton : {}) 
                     }}
                onClick={() => setActiveTab('ticket')}>
                    Crear Ticket
                </button>

                <button
                style={{ 
                     ...styles.navButton, 
                     ...(activeTab === "estaciones" ? styles.activeNavButton : {}) 
                     }}
                onClick={() => setActiveTab('estaciones')}>
                    Crear Estación
                </button>
                 <button
                style={{ 
                     ...styles.navButton, 
                     ...(activeTab === "usuarios" ? styles.activeNavButton : {}) 
                     }}
                onClick={() => setActiveTab('usuarios')}>
                    Crear Usuario
                </button>
            </div>
        </div>

         <div style={{marginTop:20}}>
            {renderContent()}
            </div>
        </>

    )
}