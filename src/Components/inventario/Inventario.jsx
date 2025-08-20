import React, { useState, useEffect } from 'react';
import InventoryTemplate from './InventoryTemplate';
import inventoryData from '../../assets/inventoryData.json';

function Inventario() {
  const [inventarioData, setInventarioData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setInventarioData(inventoryData); 
      setLoading(false);
    }, 1500);
  }, []);

  if (loading) {
    return <div>Cargando datos de inventario...</div>;
 }

  return <InventoryTemplate data={inventarioData} />;
}

export default Inventario;