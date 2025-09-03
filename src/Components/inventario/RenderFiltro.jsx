import React, { useState } from 'react';
import '../ticketTemplate/TicketList.css';

const RenderFiltro = ({ filterStatus, setShowFilterPanel, onApplyFilters }) => {
    // Estados locales para los nuevos filtros
    const [dateRange, setDateRange] = useState({ start: '', end: '' });
    const [estadoMexico, setEstadoMexico] = useState('');
    const [tecnico, setTecnico] = useState('');
    const [cliente, setCliente] = useState('');
    const [plaza, setPlaza] = useState('');

    const handleApplyFilters = () => {
        // Llama a la función del componente padre con los nuevos valores
        onApplyFilters({ dateRange, estadoMexico, tecnico, supervisor, idMerchant, filterStatus });
        setShowFilterPanel(false); // Cierra el panel de filtro
    };

    return (
        <div className="filter-panel-overlay">
            <div className="filter-panel">
                <h2>Opciones de Filtro</h2>

                {/* Sección de filtros por fecha, estado, etc. */}
                <div className="filter-group">
                    <label htmlFor="date-start">Fecha de Asignación (Inicio):</label>
                    <input 
                        type="date" 
                        id="date-start" 
                        value={dateRange.start} 
                        onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })} 
                    />
                    <label htmlFor="date-end">Fecha de Asignación (Fin):</label>
                    <input 
                        type="date" 
                        id="date-end" 
                        value={dateRange.end} 
                        onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })} 
                    />
                </div>

                <div className="filter-group">
                    <label htmlFor="estado-mexico">Estado de México:</label>
                    <input 
                        type="text" 
                        id="estado-mexico" 
                        placeholder="Ej. Puebla" 
                        value={estadoMexico} 
                        onChange={(e) => setEstadoMexico(e.target.value)} 
                    />
                </div>

                <div className="filter-group">
                    <label htmlFor="tecnico">Técnico:</label>
                    <input 
                        type="text" 
                        id="tecnico" 
                        placeholder="Nombre del técnico" 
                        value={tecnico} 
                        onChange={(e) => setTecnico(e.target.value)} 
                    />
                </div>

                <div className="filter-group">
                    <label htmlFor="cliente">Cliente:</label>
                    <input 
                        type="text" 
                        id="cliente" 
                        placeholder="Nombre del cliente" 
                        value={cliente} 
                        onChange={(e) => setCliente(e.target.value)} 
                    />
                </div>
                
                <div className="filter-group">
                    <label htmlFor="plaza">Plaza:</label>
                    <input 
                        type="text" 
                        id="plaza" 
                        placeholder="Plaza" 
                        value={plaza} 
                        onChange={(e) => setPlaza(e.target.value)} 
                    />
                </div>

                <div className='filter-group'>
                    <label htmlFor="estado">Estado:</label>
                <select name="estado">
                        <option value="dañado">Dañado</option>
                        <option value="instalado">Instalado</option>
                        <option value="stock">Stock</option>
                        <option value="devuelto a PC">Devuelto a PC</option>
                        <option value="robado">Robado</option>
                        <option value="para instalar">Para instalar</option>
                        <option value="almacen tijuana">Almacen tijuana</option>
                    </select>
                    </div>

                {/* Botones de acción */}
                <div className="action-buttons">
                    <button className="apply-filter-button" onClick={handleApplyFilters}>
                        Aplicar Filtros
                    </button>
                    <button className="close-filter-button" onClick={() => setShowFilterPanel(false)}>
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RenderFiltro;