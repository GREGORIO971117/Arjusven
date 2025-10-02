import React, { useState } from 'react';
import RenderDatosInventario from './RenderDatosInventario';
import RenderEditDatosInventario from './RenderEditDatosInventario';
import datosEstaticos from '../../assets/datos.json';
import './InventarioList.css';

function InventarioTemplate({ data, onGoBack }) {

  // Estado para controlar si estamos en modo de edición o no.
  // Podrías pasar el estado desde el componente padre si es necesario.

  const [isEdit, setIsEdit] = useState(false);

  return (
    <>
      {isEdit ? (
        <RenderEditDatosInventario
          data={data}
          onGoBack={onGoBack}
          datosEstaticos={datosEstaticos}
          // Puedes añadir una función para salir del modo de edición
          onCancelEdit={() => setIsEdit(false)}
        />
      ) : (
        <RenderDatosInventario
          data={data}
          onGoBack={onGoBack}
          // Puedes añadir una función para entrar en modo de edición
          onEdit={() => setIsEdit(true)}
        />
      )}


      
    </>
  );
}

export default InventarioTemplate;