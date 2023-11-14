// PapeleraService.js

import mockPapeleras from './mockPapeleras'; // Asegúrate de que la ruta es correcta

export default class PapeleraService {
  obtenerPapeleras() {
    return new Promise(resolve => {
      setTimeout(() => resolve(mockPapeleras), 1000); // Simula un delay
    });
  }
}
