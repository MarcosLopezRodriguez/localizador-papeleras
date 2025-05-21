import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './App.css';
import BinList from './BinList';
import { getBinIcon, typeLabels } from './binIcons';
import { Button, Chip, Select, MenuItem, InputLabel, FormControl, Box, TextField } from '@mui/material';
import { Nature, Description, LocalDrink, Delete, Recycling } from '@mui/icons-material';

const DEFAULT_CENTER = [40.416775, -3.70379];

export default function App() {
  const [bins, setBins] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [barrios, setBarrios] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedBarrio, setSelectedBarrio] = useState('');
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedBinId, setSelectedBinId] = useState(null);
  const [mapCenter, setMapCenter] = useState(DEFAULT_CENTER);
  const [mapZoom, setMapZoom] = useState(14);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetch(process.env.PUBLIC_URL + '/data/contenedores.json')
      .then(res => res.json())
      .then(data => {
        const normalizedBins = data.map((bin, idx) => {
          const districtNorm = (bin.distrito || '').trim();
          const barrioNorm = (bin.barrio || '').trim().toUpperCase();
          const lat = parseFloat(bin.lat);
          const lng = parseFloat(bin.lon);
          return {
            ...bin,
            distrito: districtNorm,
            barrioNorm,
            id: bin.id || `${districtNorm}-${barrioNorm}-${idx}`,
            lat: isNaN(lat) ? undefined : lat,
            lng: isNaN(lng) ? undefined : lng,
          };
        });

        setDistricts([...new Set(normalizedBins.map(bin => bin.distrito))]);
      });
  }, []);

  // Ajuste para manejar correctamente el campo tipo y clasificar las papeleras
  useEffect(() => {
    if (!selectedDistrict) {
      setBins([]);
      setBarrios([]);
      return;
    }

    const fetchBins = async () => {
      try {
        const response = await fetch(`${process.env.PUBLIC_URL}/data/contenedores.json`);
        const data = await response.json();

        const normalizedBins = data.map((bin, idx) => {
          const districtNorm = (bin.distrito || '').trim();
          const barrioNorm = (bin.barrio || '').trim().toUpperCase();
          const lat = parseFloat(bin.lat);
          const lng = parseFloat(bin.lon);
          const tipoArray = Array.isArray(bin.tipo) ? bin.tipo : [bin.tipo]; // Asegurar que tipo sea un array
          return {
            ...bin,
            distrito: districtNorm,
            barrioNorm,
            tipo: tipoArray.map(t => t.toLowerCase()), // Normalizar tipos a minúsculas
            id: bin.id || `${districtNorm}-${barrioNorm}-${idx}`,
            lat: isNaN(lat) ? undefined : lat,
            lng: isNaN(lng) ? undefined : lng,
          };
        });

        const filteredBins = normalizedBins.filter(bin => bin.distrito === selectedDistrict);
        setBins(filteredBins);

        const barriosUnicos = [...new Set(filteredBins.map(bin => bin.barrioNorm))];
        setBarrios(barriosUnicos);
      } catch (error) {
        console.error('Error al cargar los contenedores:', error);
      }
    };

    fetchBins();
  }, [selectedDistrict]);

  // Añadir desplazamiento automático en la lista hacia la papelera seleccionada
  useEffect(() => {
    if (selectedBinId) {
      const selectedElement = document.querySelector(`.bin-item.selected`);
      if (selectedElement) {
        selectedElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [selectedBinId]);

  const filteredBins = bins.filter(bin => {
    const query = searchQuery.toLowerCase();
    const matchesSearchQuery = !query ||
      (bin.direccion && bin.direccion.toLowerCase().includes(query)) ||
      (bin.distrito && bin.distrito.toLowerCase().includes(query)) ||
      (bin.barrioNorm && bin.barrioNorm.toLowerCase().includes(query));

    return (
      matchesSearchQuery &&
      (!selectedDistrict || bin.distrito === selectedDistrict) &&
      (!selectedBarrio || bin.barrioNorm === selectedBarrio) &&
      (selectedTypes.length === 0 || (Array.isArray(bin.tipo) && bin.tipo.some(type => selectedTypes.includes(type))))
    );
  });

  const getBinIconForList = (tipo) => {
    switch (tipo) {
      case 'organica':
        return { icon: <Nature />, color: '#8BC34A' };
      case 'papel':
        return { icon: <Description />, color: '#2196F3' };
      case 'plastico':
        return { icon: <Recycling />, color: '#FFC107' };
      case 'resto':
        return { icon: <Delete />, color: '#9E9E9E' };
      case 'vidrio':
        return { icon: <LocalDrink />, color: '#4CAF50' };
      default:
        return { icon: <Delete />, color: '#607D8B' };
    }
  };

  const enhancedBins = filteredBins.map(bin => {
    const { icon, color } = getBinIconForList(bin.tipo[0]);
    return {
      ...bin,
      icon,
      color,
    };
  });

  const handleDistrictChange = e => setSelectedDistrict(e.target.value);
  const handleBarrioChange = e => setSelectedBarrio(e.target.value);
  const handleSearchChange = e => setSearchQuery(e.target.value);

  const handleAddressSearch = async (event) => {
    if (event.key === 'Enter' && searchQuery.trim() !== '') {
      const encodedQuery = encodeURIComponent(searchQuery);
      // Restrict search to Madrid area (Spain) for better relevance
      const apiUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodedQuery}&viewbox=-4.5,40.0,-3.0,40.8&bounded=1`;
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`Nominatim request failed: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        if (data && data.length > 0) {
          const { lat, lon } = data[0];
          console.log('Nominatim result:', data[0]);
          setMapCenter([parseFloat(lat), parseFloat(lon)]);
          setMapZoom(16); // Zoom in to the geocoded address
          setSelectedDistrict(''); // Clear district filter
          setSelectedBarrio(''); // Clear barrio filter
        } else {
          alert('No se encontraron resultados para la dirección ingresada.');
        }
      } catch (error) {
        console.error('Error fetching from Nominatim:', error);
      }
    }
  };

  const handleTypeToggle = type => {
    setSelectedTypes(prev => prev.includes(type)
      ? prev.filter(t => t !== type)
      : [...prev, type]
    );
  };

  // Mejorar la interacción entre la lista y el mapa
  const handleBinClick = bin => {
    setSelectedBinId(bin.id);
    setMapCenter([bin.lat, bin.lng]);
    setMapZoom(18); // Aumentar el zoom al hacer clic en una papelera
  };

  const handleMapMarkerClick = bin => {
    setSelectedBinId(bin.id);
    setMapCenter([bin.lat, bin.lng]);
    setMapZoom(18); // Aumentar el zoom al hacer clic en un marcador
  };

  return (
    <div>
      <div className="header-gradient">
        <h1>Localizador de Papeleras</h1>
      </div>
      <div className="controls-bar">
        <TextField
          label="Buscar Dirección o Zona"
          variant="outlined"
          size="small"
          value={searchQuery}
          onChange={handleSearchChange}
          onKeyPress={handleAddressSearch}
          sx={{ minWidth: 200, marginRight: 2 }}
        />
        <FormControl size="small" sx={{ minWidth: 160 }}>
          <InputLabel>Distrito</InputLabel>
          <Select value={selectedDistrict} onChange={handleDistrictChange}>
            <MenuItem value=""><em>Todos</em></MenuItem>
            {districts.map(d => <MenuItem key={d} value={d}>{d}</MenuItem>)}
          </Select>
        </FormControl>
        <FormControl size="small" sx={{ minWidth: 160 }} disabled={!selectedDistrict}>
          <InputLabel>Barrio</InputLabel>
          <Select value={selectedBarrio} onChange={handleBarrioChange}>
            <MenuItem value=""><em>Todos</em></MenuItem>
            {barrios.map(b => <MenuItem key={b} value={b}>{b}</MenuItem>)}
          </Select>
        </FormControl>
        <Box className="filters-bar">
          {Object.keys(typeLabels).map(type => (
            <Chip
              key={type}
              label={typeLabels[type]?.label?.toUpperCase() || type.toUpperCase()}
              color={selectedTypes.includes(type) ? 'primary' : 'default'}
              onClick={() => handleTypeToggle(type)}
            />
          ))}
        </Box>
      </div>
      <div className="main-layout">
        <div className="list-panel">
          {enhancedBins.map(bin => (
            <div
              key={bin.id}
              className={`bin-item ${selectedBinId === bin.id ? 'selected' : ''}`}
              style={{
                borderLeft: `4px solid ${bin.color}`,
                display: 'flex',
                alignItems: 'center',
                padding: '10px',
                marginBottom: '10px',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                cursor: 'pointer',
                backgroundColor: selectedBinId === bin.id ? '#f0f8ff' : 
                                 (searchQuery && (
                                   (bin.direccion && bin.direccion.toLowerCase().includes(searchQuery.toLowerCase())) ||
                                   (bin.distrito && bin.distrito.toLowerCase().includes(searchQuery.toLowerCase())) ||
                                   (bin.barrioNorm && bin.barrioNorm.toLowerCase().includes(searchQuery.toLowerCase()))
                                 )) ? 'lightyellow' : 'white',
              }}
              onClick={() => handleBinClick(bin)}
            >
              <div className="bin-icon" style={{ color: bin.color, fontSize: '24px', marginRight: '10px' }}>{bin.icon}</div>
              <div className="bin-details" style={{ flex: 1 }}>
                <h3 style={{ margin: '0 0 5px', fontSize: '16px', fontWeight: 'bold', color: '#333' }}>{bin.direccion}</h3>
                <p style={{ margin: '0', fontSize: '14px', color: '#666' }}>Distrito: {bin.distrito} | Barrio: {bin.barrioNorm}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="map-panel">
          <MapContainer center={mapCenter} zoom={mapZoom} style={{ height: '100%', width: '100%' }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; OpenStreetMap contributors"
            />
            {filteredBins.map(bin => (
              <Marker
                key={bin.id}
                position={[bin.lat, bin.lng]}
                icon={getBinIcon(bin.tipo[0], selectedBinId === bin.id)}
                eventHandlers={{ click: () => handleMapMarkerClick(bin) }}
              >
                <Popup>
                  <b>{bin.direccion}</b><br />
                  {bin.barrioNorm}<br />
                  {bin.distrito}
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </div>
  );
}
