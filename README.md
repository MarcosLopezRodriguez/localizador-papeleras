# Localizador de Papeleras de Reciclaje

Aplicación web interactiva para localizar papeleras y contenedores de reciclaje en Madrid, permitiendo filtrar por distrito, barrio y tipo de residuo.

## Descripción

Este proyecto permite visualizar y localizar fácilmente papeleras de reciclaje sobre un mapa interactivo. Los usuarios pueden buscar contenedores por su ubicación, tipo de residuo que admiten (orgánico, papel/cartón, envases, etc.) y su localización por distrito y barrio.

## Características principales
- **Mapa interactivo** con marcadores personalizados para cada tipo de papelera
- **Lista sincronizada** con el mapa: al seleccionar una papelera en cualquier lugar, se resalta tanto en el mapa como en la lista
- **Filtros dinámicos** por:
  - Tipo de residuo (Orgánico, Papel/Cartón, Envases, Vidrio, Pilas, Resto)
  - Distrito
  - Barrio
- **Diseño responsive** utilizando Material UI
- **Scroll automático** en la lista al seleccionar una papelera en el mapa

## Tipos de Papeleras
- 🟤 **Orgánico**: Residuos orgánicos y restos de comida
- 🔵 **Papel/Cartón**: Papel, periódicos, revistas y cartón
- 🟡 **Envases**: Envases de plástico, latas y briks
- 🟢 **Vidrio**: Botellas y envases de vidrio
- 🔴 **Pilas**: Pilas y baterías
- ⚫ **Resto**: Residuos no reciclables

## Instalación y Ejecución

1. **Requisitos previos**
   - Node.js (versión 14 o superior)
   - npm (incluido con Node.js)

2. **Clonar el repositorio**
   ```bash
   git clone https://github.com/tu-usuario/localizador-papeleras.git
   cd localizador-papeleras
   ```

3. **Instalar dependencias**
   ```bash
   npm install
   ```

4. **Iniciar la aplicación**
   ```bash
   npm start
   ```
   La aplicación se abrirá automáticamente en tu navegador en [http://localhost:3000](http://localhost:3000)

## Tecnologías utilizadas
- React 18
- Material UI (MUI)
- React Leaflet para el mapa interactivo
- React Icons para los iconos de tipos de papeleras

## Estructura del proyecto
```
src/
  ├── App.js              # Componente principal y lógica de la aplicación
  ├── binIcons.js         # Configuración de iconos y tipos de papeleras
  ├── BinList.js          # Componente de lista de papeleras
  └── components/         # Componentes adicionales
public/
  └── data/
      └── contenedores.json  # Datos de las papeleras
```

## Contribuir
Si deseas contribuir al proyecto, puedes:
1. Hacer fork del repositorio
2. Crear una rama para tu funcionalidad (`git checkout -b feature/nueva-funcionalidad`)
3. Hacer commit de tus cambios (`git commit -am 'Añade nueva funcionalidad'`)
4. Hacer push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Crear un Pull Request
