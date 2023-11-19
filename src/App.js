import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet'; // Importar L de leaflet
import 'leaflet/dist/leaflet.css';
import './App.css'; // Incluye tu archivo CSS aquí
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
  const [tiposSeleccionados, setTiposSeleccionados] = useState({
    Papel: false,
    Plástico: false,
    Vidrio: false,
    Pilas: false,
    Orgánico: false,
    // ... otros tipos si es necesario
  });
  const [papelerasFiltradas, setPapelerasFiltradas] = useState([]); // Estado para las papeleras filtradas
  const [papeleras, setPapeleras] = useState([]);
  const papeleraService = new PapeleraService();

  useEffect(() => {
    papeleraService.obtenerPapeleras()
      .then(datos => {
        setPapeleras(datos);
        //setPapelerasFiltradas(datos); // Inicialmente, mostrar todas las papeleras
      })
      .catch(error => console.error(error));
  }, []);

  const handleCheckboxChange = (tipo) => {
    // Actualizar el estado con el valor de checked para cada tipo
    setTiposSeleccionados(prevTipos => {
      const updatedTipos = {
        ...prevTipos,
        [tipo]: !prevTipos[tipo]
      };

      // Filtrar las papeleras basado en los tipos seleccionados
      const tiposFiltrados = Object.entries(updatedTipos)
        .filter(([key, value]) => value)
        .map(([key]) => key);

      if (tiposFiltrados.length > 0) {
        setPapelerasFiltradas(papeleras.filter(p => tiposFiltrados.includes(p.tipo)));
      } else {
        setPapelerasFiltradas([]); // Si no hay ningún tipo seleccionado, no se muestra ninguna papelera
      }

      return updatedTipos;
    });
  };

  // Opciones de papeleras que quieres que el usuario pueda seleccionar
  const opcionesDePapeleras = ["Papel", "Plástico", "Vidrio", "Pilas", "Orgánico"];
  const [menuVisible, setMenuVisible] = useState(true);

  return (
    <div className="App">
      <nav className="navbar">
        <h1>Localizador de Papeleras</h1>
        {/* Puedes añadir más enlaces o botones aquí */}
      </nav>
      <MapContainer center={[40.416775, -3.703790]} zoom={17} style={{ height: "calc(70vh - 50px)", width: "50%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {papelerasFiltradas.map(papelera => (
          <Marker
            key={papelera.id}
            position={[papelera.latitud, papelera.longitud]}
            icon={papeleraIcon}
          >
            <Popup>
              Una papelera de {papelera.tipo} aquí.
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      <div className="filter-controls">
        <div className="dropdown">
          {(
            <ul className="dropdown-menu">
              {opcionesDePapeleras.map(tipo => (
                <li key={tipo}>
                  <label>
                    <input
                      type="checkbox"
                      checked={tiposSeleccionados[tipo] || false}
                      onChange={() => handleCheckboxChange(tipo)}
                    />
                    {tipo}
                  </label>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div >
  );
}

export default App;
