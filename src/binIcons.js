import L from "leaflet";
import RecyclingIcon from '@mui/icons-material/Recycling';
import GlassIcon from '@mui/icons-material/WineBar';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import BatteryFullIcon from '@mui/icons-material/BatteryFull';
import ReactDOMServer from 'react-dom/server';

// Mismo mapeo que en BinList.js
const typeLabels = {
  papel: { color: "#2196f3", icon: RecyclingIcon },
  carton: { color: "#2196f3", icon: RecyclingIcon }, // Azul igual que papel
  vidrio: { color: "#4caf50", icon: GlassIcon },
  envases: { color: "#ffe082", icon: RecyclingIcon }, // Amarillo suave
  plastico: { color: "#ffe082", icon: RecyclingIcon }, // Amarillo suave
  organico: { color: "#795548", icon: DeleteOutlineIcon }, // Marrón
  pilas: { color: "#f44336", icon: BatteryFullIcon },
  resto: { color: "#888", icon: DeleteOutlineIcon } // Gris
};

export function getBinIcon(type, selected = false) {
  const t = typeLabels[type] ? type : 'resto';
  const IconComp = typeLabels[t].icon;
  const color = typeLabels[t].color;
  // Renderiza el icono como SVG usando ReactDOMServer
  const svgString = ReactDOMServer.renderToStaticMarkup(
    <IconComp sx={{ fontSize: 32, color: color }} />
  );
  const size = selected ? 40 : 32;
  return L.divIcon({
    html: `<div style="
      display:flex;align-items:center;justify-content:center;
      width:${size}px;height:${size}px;
      background:${selected ? '#e3f0fd' : 'none'};
      border:${selected ? '3px solid #1976d2' : 'none'};
      border-radius:50%;
      box-shadow:${selected ? '0 0 8px #1976d2aa' : 'none'};
    ">${svgString}</div>`,
    className: `bin-icon-${t}${selected ? ' selected' : ''}`,
    iconSize: [size, size],
    iconAnchor: [size/2, size],
    popupAnchor: [0, -size]
  });
}
