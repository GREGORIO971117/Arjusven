import React from 'react';
import PlaneacionEncabezado from './planeacionencabezado';
import PlaneacionTabla from './planeacionTabla';
import './PlaneacionStyles.css';

export default function PlaneacionTemplate({ table }) {
    return (
        <div className="planeacion-container">
            <PlaneacionEncabezado table={table} />
            <PlaneacionTabla table={table} />
        </div>
    );
}