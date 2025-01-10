// Importar funcionalidades
import { setupNavigation } from './modules/navigation.js';
import { setupCodeCopy } from './modules/codeCopy.js';
import { setupBootstrapComponents } from './modules/bootstrap.js';
import { setupScrollSpy } from './modules/scrollSpy.js';
import { setupFooter } from './modules/footer.js';

// Inicializar toda la funcionalidad cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function () {
    // Configurar la navegación principal
    setupNavigation();

    // Configurar la funcionalidad de copiado de código
    setupCodeCopy();

    // Inicializar componentes de Bootstrap
    setupBootstrapComponents();

    // Configurar el scroll spy para la navegación
    const cleanup = setupScrollSpy();

    // Configurar el footer
    setupFooter();

    // Cuando necesites limpiar (por ejemplo, al cambiar de página o desmontar componentes)
    cleanup();
});