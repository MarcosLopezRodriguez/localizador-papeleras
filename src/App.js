import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet'; // Importar L de leaflet
import 'leaflet/dist/leaflet.css';
import PapeleraMarker from './components/PapeleraMarker'; // Si tienes un componente separado para los marcadores
import PapeleraService from './services/PapeleraService';

// Crear el icono de la papelera
const papeleraIcon = L.icon({
  iconUrl: '/images/icons/icon.png', // Usa la ruta desde la carpeta public
  iconSize: [35, 35],
  iconAnchor: [17, 35],
  popupAnchor: [1, -34],
});

function App() {
  const [papeleras, setPapeleras] = useState([]);
  const papeleraService = new PapeleraService();

  useEffect(() => {
    papeleraService.obtenerPapeleras()
      .then(datos => setPapeleras(datos))
      .catch(error => console.error(error));
  }, []);

  return (
    <div className="App">
      <MapContainer center={[40.416775, -3.703790]} zoom={17} style={{ height: "100vh", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {papeleras.map(papelera => (
          <Marker 
            key={papelera.id} 
            position={[papelera.latitud, papelera.longitud]} 
            icon={papeleraIcon} // Usar el icono personalizado para cada papelera
          >
            <Popup>
              Una papelera de {papelera.tipo} aquí.
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default App;
