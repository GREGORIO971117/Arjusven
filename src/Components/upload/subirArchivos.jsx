import React,{useState} from 'react';

import RenderInventario from './subirInventarioTemplate';
import RenderTicket from './subirTicketTemplate';

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
        <div className="ticket-tabs">
            <button
            className={`tab-button ${activeTab === 'inventario' ? 'active' : ''}`}
            onClick={() => setActiveTab('inventario')}
            >
                Crear Articulo de inventario
            </button>

            <button
            className={`tab-button ${activeTab === 'ticket' ? 'active' : ''}`}
            onClick={() => setActiveTab('ticket')}
            >
                Crear Ticket
            </button>

           
        </div>

         <div className='ticket-content'>{renderContent()}</div>
        </>

    )
}