export function setupScrollSpy() {
    // Cache de elementos y variables
    const nav = document.querySelector('.sidebar');
    const navLinks = Array.from(document.querySelectorAll('.nav-link'));
    const sections = Array.from(document.querySelectorAll('section'));
    const navMap = new Map(
        navLinks.map(link => [link.getAttribute('data-content'), link])
    );

    // Configuración
    const CONFIG = {
        offsetTrigger: 100,
        activeClass: 'active',
        rootMargin: '-100px 0px -100px 0px',
        threshold: [0, 0.25, 0.5, 0.75, 1]
    };

    // Estado
    let currentActiveSection = null;
    let observer;

    /**
     * Utiliza IntersectionObserver para detectar secciones visibles
     */
    function initializeObserver() {
        observer = new IntersectionObserver(handleIntersection, {
            rootMargin: CONFIG.rootMargin,
            threshold: CONFIG.threshold
        });

        sections.forEach(section => observer.observe(section));
    }

    /**
     * Maneja las intersecciones detectadas
     */
    function handleIntersection(entries) {
        // Encuentra la sección más visible
        const mostVisibleSection = entries.reduce((max, entry) => {
            return (entry.intersectionRatio > (max?.intersectionRatio || 0)) ? entry : max;
        }, null);

        if (mostVisibleSection?.target && mostVisibleSection.intersectionRatio > 0) {
            const newActiveId = mostVisibleSection.target.id;
            updateActiveLink(newActiveId);
        }
    }

    /**
     * Actualiza el estado activo de los enlaces de navegación
     */
    function updateActiveLink(targetId) {
        // Evita actualizaciones innecesarias
        if (currentActiveSection === targetId) return;

        // Elimina la clase activa del enlace anterior
        if (currentActiveSection) {
            const previousLink = navMap.get(currentActiveSection);
            previousLink?.classList.remove(CONFIG.activeClass);
        }

        // Añade la clase activa al nuevo enlace
        const newActiveLink = navMap.get(targetId);
        if (newActiveLink) {
            newActiveLink.classList.add(CONFIG.activeClass);
            currentActiveSection = targetId;

            // Asegura que el enlace activo es visible en la barra lateral
            ensureLinkVisible(newActiveLink);
        }
    }

    /**
     * Asegura que el enlace activo es visible en la barra lateral
     */
    function ensureLinkVisible(link) {
        if (!nav) return;

        const navRect = nav.getBoundingClientRect();
        const linkRect = link.getBoundingClientRect();

        if (linkRect.top < navRect.top || linkRect.bottom > navRect.bottom) {
            link.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    /**
     * Limpia los observadores y eventos
     */
    function cleanup() {
        observer?.disconnect();
        document.removeEventListener('contentLoaded', handleContentLoaded);
    }

    /**
     * Maneja la carga de nuevo contenido
     */
    function handleContentLoaded() {
        cleanup();
        initializeObserver();
    }

    /**
     * Inicializa el scroll spy
     */
    function initialize() {
        // Limpia cualquier instancia previa
        cleanup();

        // Inicializa el observer
        initializeObserver();

        // Añade listener para contenido dinámico
        document.addEventListener('contentLoaded', handleContentLoaded);

        // Realiza la primera actualización
        const visibleSection = sections.find(section => {
            const rect = section.getBoundingClientRect();
            return rect.top <= CONFIG.offsetTrigger && rect.bottom >= CONFIG.offsetTrigger;
        });

        if (visibleSection) {
            updateActiveLink(visibleSection.id);
        }
    }

    // Inicia el scroll spy
    initialize();

    // Retorna función de limpieza
    return cleanup;
}