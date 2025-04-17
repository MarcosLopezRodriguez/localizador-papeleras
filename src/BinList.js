import React, { useRef, useEffect } from "react";
import { Card, CardContent, Typography, Grid, Chip, CardHeader, Avatar, Tooltip, Box } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import RecyclingIcon from '@mui/icons-material/Recycling';
import BatteryFullIcon from '@mui/icons-material/BatteryFull';
import GlassIcon from '@mui/icons-material/WineBar'; // Usar como icono de vidrio

const typeLabels = {
  papel: { label: "Papel/Cartón", color: "#2196f3", icon: <RecyclingIcon /> },
  carton: { label: "Cartón", color: "#1976d2", icon: <RecyclingIcon /> },
  vidrio: { label: "Vidrio", color: "#4caf50", icon: <GlassIcon /> },
  envases: { label: "Envases/Plástico", color: "#ffeb3b", icon: <RecyclingIcon /> },
  plastico: { label: "Plástico", color: "#ffc107", icon: <RecyclingIcon /> },
  organico: { label: "Orgánico", color: "#795548", icon: <DeleteOutlineIcon /> },
  pilas: { label: "Pilas", color: "#f44336", icon: <BatteryFullIcon /> },
  resto: { label: "Resto", color: "#888", icon: <DeleteOutlineIcon /> }
};

function getAvatar(type) {
  const label = typeLabels[type]?.label || type.charAt(0).toUpperCase();
  const color = typeLabels[type]?.color || '#bbb';
  return (
    <Avatar sx={{ bgcolor: color, width: 40, height: 40 }}>
      {typeLabels[type]?.icon || label[0]}
    </Avatar>
  );
}


export default function BinList({ bins, selectedTypes, onBinClick, selectedId }) {
  const cardRefs = useRef({});

  useEffect(() => {
    if (selectedId && cardRefs.current[selectedId]) {
      cardRefs.current[selectedId].scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [selectedId]);
  const filtered = bins;
  return (
    <div>
      {filtered.length === 0 ? (
        <p style={{ color: '#888', fontStyle: 'italic', textAlign: 'center' }}>
          Selecciona un tipo de papelera para ver resultados.
        </p>
      ) : (
        <Grid container spacing={2} alignItems="center" sx={{ width: '100%', maxWidth: '1400px', margin: '0 auto' }}>
          {filtered.map((bin) => {
            const mainType = (bin.type && bin.type[0]) || 'resto';
            return (
              <Grid item xs={12} key={bin.id} ref={el => cardRefs.current[bin.id] = el} >
                <Card
                  onClick={() => onBinClick && onBinClick(bin)}
                  tabIndex={onBinClick ? 0 : undefined}
                  sx={{
                    cursor: onBinClick ? 'pointer' : 'default',
                    transition: 'box-shadow 0.2s',
                    borderRadius: 2,
                    border: bin.id === selectedId ? '2.5px solid #1976d2' : '1.2px solid #e3e8ee',
                    boxShadow: bin.id === selectedId ? '0 4px 18px #1976d255' : '0 2px 12px rgba(40,44,52,0.07)',
                    background: '#f7fafc',
                    minHeight: 180,
                    maxWidth: 340,
                    mx: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    p: 1.2
                  }}
                >
                  <CardHeader
                    avatar={getAvatar(mainType)}
                    title={<Typography variant="h6" sx={{ fontWeight: 700, color: '#234', textAlign: 'center' }}>{bin.name || bin.direccion}</Typography>}
                    subheader={<Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>{bin.address || bin.direccion}</Typography>}
                    sx={{ pb: 0 }}
                  />
                  <CardContent sx={{ pt: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Tooltip title="Ubicación exacta">
                        <LocationOnIcon fontSize="small" sx={{ color: '#1976d2', mr: .5 }} />
                      </Tooltip>
                      <Typography variant="body2" color="text.secondary">
                        Distrito: <b>{bin.distrito}</b> | Barrio: <b>{bin.barrio}</b>
                      </Typography>
                    </Box>

                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      )}
    </div>
  );
}
