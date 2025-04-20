import L from "leaflet";
import RecyclingIcon from '@mui/icons-material/Recycling';
import GlassIcon from '@mui/icons-material/WineBar';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import BatteryFullIcon from '@mui/icons-material/BatteryFull';
import ReactDOMServer from 'react-dom/server';

// Corrección del tipo "ENVASES/PLÁSTICO" a solo "ENVASES"
export const typeLabels = {
  papel: { label: "Papel/Cartón", color: "#1E88E5", icon: RecyclingIcon },
  vidrio: { label: "Vidrio", color: "#43A047", icon: GlassIcon },
  envases: { label: "Envases", color: "#FFB300", icon: RecyclingIcon },
  organico: { label: "Orgánico", color: "#6D4C41", icon: DeleteOutlineIcon },
  pilas: { label: "Pilas", color: "#E53935", icon: BatteryFullIcon },
  resto: { label: "Resto", color: "#757575", icon: DeleteOutlineIcon }
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
    iconAnchor: [size / 2, size],
    popupAnchor: [0, -size]
  });
}
