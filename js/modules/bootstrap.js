export function setupBootstrapComponents() {
    // Inicializar tooltips
    function initTooltips() {
        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });
    }

    // Inicializar popovers
    function initPopovers() {
        const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
        popoverTriggerList.map(function (popoverTriggerEl) {
            return new bootstrap.Popover(popoverTriggerEl);
        });
    }

    // Inicializar toasts
    function initToasts() {
        const toastElList = [].slice.call(document.querySelectorAll('.toast'));
        toastElList.map(function (toastEl) {
            return new bootstrap.Toast(toastEl);
        });
    }

    // Inicializar todos los componentes
    initTooltips();
    initPopovers();
    initToasts();

    // Reinicializar cuando se cargue nuevo contenido
    document.addEventListener('contentLoaded', () => {
        initTooltips();
        initPopovers();
        initToasts();
    });
}