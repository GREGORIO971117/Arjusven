import React from 'react';
import RenderEditDataInventory from './RenderEditDataInventory';
import RenderDataInventory from './RenderDataInventory';
import './InventoryTemplate.css';

function InventoryTemplate({ data, isEditing, onEdit, onSave, onCancel }) {

  if (!data) {
    return (
      <div className="no-data-message">
        No se ha proporcionado información de inventario.
      </div>
    );
  }

  // Nuevo método para renderizar condicionalmente el contenido
  const renderContent = () => {
    if (isEditing) {
      // Si estamos editando, mostramos el componente de edición
      return (
        <RenderEditDataInventory
          data={data}
          onSave={onSave}
          onCancel={onCancel}
        />
      );
    } else {
      // Si no estamos editando, mostramos la vista de solo lectura
      return (
        <RenderDataInventory
          data={data}
          isEditing={isEditing}
          onEdit={onEdit}
        />
      );
    }
  };

  return (
    <div className="inventory-template-container">

      <div className="ticket-content">
        
        {renderContent()}

      </div>
    </div>
  );
}

export default InventoryTemplate;