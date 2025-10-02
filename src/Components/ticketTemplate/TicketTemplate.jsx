import React, { useState } from 'react';
import '../Inventario/InventarioList.css';
import RenderDatosServicio from './RenderDataServicios.jsx'
import EditDataServicio from './EditDataServicios.jsx'
import datosEstaticos from '../../assets/datos.json';

function TicketTemplate({data,onGoBack}){

  const [isEdit, setIsEdit] = useState(false);

  return (


    
    <>
      {isEdit ? (
        <EditDataServicio
          onGoBack={onGoBack}
          data={data}
          datosEstaticos={datosEstaticos}
          onCancelEdit={()=>setIsEdit(false)}
        />

      ):(
      <RenderDatosServicio
        data = {data}
        onEdit={()=>setIsEdit(true)}
      />  
    )}

  </>
  );
}

export default TicketTemplate;
