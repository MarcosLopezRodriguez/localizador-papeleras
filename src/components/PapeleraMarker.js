import React from 'react';
import { Marker, Popup } from 'react-leaflet';

const PapeleraMarker = ({ papelera }) => {
  return (
    <Marker position={[papelera.latitud, papelera.longitud]}>
      <Popup>
        <div>
          <h2>Papelera de {papelera.tipo}</h2>
          <p>{papelera.descripcion}</p>
        </div>
      </Popup>
    </Marker>
  );
};

export default PapeleraMarker;
