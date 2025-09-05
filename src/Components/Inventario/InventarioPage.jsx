import React, { useState, useEffect } from 'react';
import InventarioList from './InventarioList';
import InventarioTemplate from './InventarioTemplate';
import './InventarioList.css';

function InventarioPage() {
  const [inventarioData, setInventarioData] = useState([]);
  const [selectedInventario, setSelectedInventario] = useState(null);

  const API_URL = '/assets/inventoryData.json'; 

  useEffect(() => {
    const loadInventario = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error('Error al cargar los datos del inventario');
        }
        const data = await response.json();
        setInventarioData(data);
      } catch (error) {
        console.error('Error al cargar los datos:', error);
      }
    };

    loadInventario();
  }, []);

  return (
    <div className="ticket-page-container">
      <div className="ticket-content-flex">
        <div className="ticket-list-column">
          <InventarioList
            Inventario={inventarioData}
            onSelectTicket={setSelectedInventario}
          />
        </div>

        <div className="ticket-template-column">
          {selectedInventario ? (
            <InventarioTemplate
              data={selectedInventario}
              onGoBack={() => setSelectedInventario(null)}
            />
          ) : (
            <div className="no-selection-message">
              Selecciona Inventario para ver sus detalles.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default InventarioPage;
