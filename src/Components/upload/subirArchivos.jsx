import React,{useState} from 'react';

import RenderInventario from './subirInventarioTemplate';
import RenderTicket from './subirTicketTemplate';
import { styles } from '../admin/adminTemplate';

export default function subirArchivos() {
    const [activeTab, setActiveTab] = useState('inventario');

    const renderContent=()=>{
        if (activeTab==='inventario') {

            return(
                <RenderInventario/>
            );
        }if (activeTab==='ticket') {
            return(
                <RenderTicket/>
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
            </div>
        </div>

         <div style={{marginTop:20}}>
            {renderContent()}
            </div>
        </>

    )
}