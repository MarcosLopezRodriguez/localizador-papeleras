import React, { useState } from "react";

import { typeLabels } from "./binIcons";
const BIN_TYPES = [
  { key: "papel", label: typeLabels.papel.label || "Papel/Cartón" },
  { key: "vidrio", label: typeLabels.vidrio.label || "Vidrio" },
  { key: "envases", label: typeLabels.envases.label || "Envases/Plástico" },
  { key: "organico", label: typeLabels.organico.label || "Orgánico" },
  { key: "pilas", label: typeLabels.pilas?.label || "Pilas" }
];

export default function ShoppingListSelector({ selectedTypes, onChange }) {
  return (
    <div style={{ margin: "1rem 0" }}>
      <h3>¿Qué quieres reciclar hoy?</h3>
      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        {BIN_TYPES.map((type) => (
          <label key={type.key} style={{ display: "flex", alignItems: "center", gap: ".5rem" }}>
            <input
              type="checkbox"
              checked={selectedTypes.includes(type.key)}
              onChange={() => {
                if (selectedTypes.includes(type.key)) {
                  onChange(selectedTypes.filter((t) => t !== type.key));
                } else {
                  onChange([...selectedTypes, type.key]);
                }
              }}
            />
            <span style={{
              background: typeLabels[type.key]?.color || '#2196f3',
              padding: "0.2em 0.6em",
              borderRadius: "999px",
              color: (type.key === 'envases' || type.key === 'plastico') ? '#222' : '#fff',
              display: 'flex', alignItems: 'center', gap: 6,
              fontWeight: 700
            }}>
              {typeLabels[type.key]?.icon &&
                React.createElement(typeLabels[type.key].icon, {
                  style: { fontSize: 19, marginRight: 4, verticalAlign: 'middle' }
                })}
              <span>{type.label}</span>
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}
