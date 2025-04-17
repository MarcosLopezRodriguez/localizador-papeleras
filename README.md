# Localizador de Papeleras de Reciclaje

Aplicación web interactiva para localizar papeleras y contenedores de reciclaje en tu ciudad.

## Descripción

Este proyecto permite visualizar, buscar y filtrar papeleras de reciclaje sobre un mapa interactivo. Incluye selección visual de papeleras, filtrado por tipo de residuo, distrito y barrio, así como geolocalización automática para centrar el mapa y mostrar los contenedores más cercanos.

## Características principales
- **Mapa interactivo** con marcadores personalizados para cada tipo de papelera.
- **Lista de papeleras** sincronizada con el mapa: al seleccionar en el mapa, se resalta la tarjeta correspondiente y viceversa.
- **Filtros dinámicos** por tipo de residuo, distrito y barrio.
- **Geolocalización**: detecta tu ubicación, centra el mapa y filtra automáticamente por barrio y distrito.
- **Diseño responsive** y moderno con Material UI.

## Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/tuusuario/localizador-papeleras.git
   cd localizador-papeleras
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Inicia la aplicación en modo desarrollo:
   ```bash
   npm start
   ```
   Accede a [http://localhost:3000](http://localhost:3000)

## Dependencias principales
- [React](https://reactjs.org/)
- [React Leaflet](https://react-leaflet.js.org/)
- [Material UI](https://mui.com/)

## Estructura del proyecto
- `src/App.js`: Componente principal, lógica de mapa, filtros y geolocalización.
- `src/BinList.js`: Renderizado y scroll automático de la lista de papeleras.
- `src/binIcons.js`: Iconos personalizados para cada tipo de papelera.
- `public/data/contenedores.json`: Datos de ubicación de papeleras.

## Personalización
Puedes adaptar los datos de `contenedores.json` para tu ciudad, añadiendo o modificando tipos, distritos y barrios.

## Licencia
MIT

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
