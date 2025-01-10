// Función principal para configurar la navegación
export function setupNavigation() {
    const links = document.querySelectorAll('.nav-link');
    const dynamicContent = document.getElementById('dynamic-content');
    const menuToggle = document.getElementById('menu-toggle');
    const navigationMenu = document.getElementById('navigation-menu');
    let isMenuOpen = false;

    // Configuración inicial
    loadContent('html/introduccion.html');
    activateNavLink('html/introduccion.html');

    // Configurar event listeners para los enlaces
    links.forEach((link, index) => {
        link.addEventListener('click', handleNavClick);
        setupKeyboardNavigation(link, index, links);
    });

    // Manejador de clicks en la navegación
    function handleNavClick(e) {
        e.preventDefault();
        const contentUrl = this.getAttribute('data-content');
        loadContent(contentUrl);
        activateNavLink(contentUrl);

        // Cerrar el menú en móviles después de hacer clic
        if (window.innerWidth <= 768 && isMenuOpen) {
            toggleMenu();
        }
    }

    // Función para cargar contenido
    function loadContent(url) {
        fetch(url)
            .then(response => {
                if (!response.ok) throw new Error('Error al cargar el contenido');
                return response.text();
            })
            .then(html => {
                dynamicContent.innerHTML = html;
                reinitializeComponents();
            })
            .catch(error => {
                dynamicContent.innerHTML = `
                    <div class="alert alert-danger" role="alert">
                        Error: ${error.message}
                    </div>
                `;
            });
    }

    // Función para activar el enlace actual
    function activateNavLink(url) {
        links.forEach(link => {
            const isActive = link.getAttribute('data-content') === url;
            link.classList.toggle('active', isActive);
            if (isActive) {
                link.setAttribute('aria-current', 'page');
            } else {
                link.removeAttribute('aria-current');
            }
        });
    }

    // Configuración del menú responsivo
    function toggleMenu() {
        isMenuOpen = !isMenuOpen;
        navigationMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
        menuToggle.setAttribute('aria-expanded', isMenuOpen.toString());
        document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    }

    // Cerrar menú al hacer clic fuera
    function closeMenuOnClickOutside(event) {
        if (isMenuOpen &&
            !navigationMenu.contains(event.target) &&
            !menuToggle.contains(event.target)) {
            toggleMenu();
        }
    }

    // Configurar navegación por teclado
    function setupKeyboardNavigation(link, index, links) {
        link.addEventListener('keydown', (event) => {
            let targetLink;

            switch (event.key) {
                case 'ArrowDown':
                    targetLink = links[index + 1] || links[0];
                    break;
                case 'ArrowUp':
                    targetLink = links[index - 1] || links[links.length - 1];
                    break;
                case 'Home':
                    targetLink = links[0];
                    break;
                case 'End':
                    targetLink = links[links.length - 1];
                    break;
                case 'Escape':
                    if (isMenuOpen) {
                        toggleMenu();
                        menuToggle.focus();
                    }
                    return;
                default:
                    return;
            }

            event.preventDefault();
            targetLink.focus();
        });
    }

    // Reinicializar componentes después de cargar contenido
    function reinitializeComponents() {
        // Reinicializar syntax highlighting
        if (typeof Prism !== 'undefined') {
            Prism.highlightAll();
        }

        // Reinicializar copiado de código
        const event = new CustomEvent('contentLoaded');
        document.dispatchEvent(event);
    }

    // Event listeners para el menú responsivo
    menuToggle.addEventListener('click', toggleMenu);
    document.addEventListener('click', closeMenuOnClickOutside);

    // Manejar cambios en el tamaño de la ventana
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && isMenuOpen) {
            toggleMenu();
        }
    });

    function initializeMenuAnimations() {
        const menuItems = document.querySelectorAll('.nav-item');
        menuItems.forEach((item, index) => {
            item.style.setProperty('--item-index', index);
        });
    }

    initializeMenuAnimations();
}