export function setupFooter() {
    const existingFooter = document.querySelector('.footer');
    if (existingFooter) {
        existingFooter.remove();
    }

    const footer = createFooter();
    document.body.appendChild(footer);
}

function createFooter() {
    const footer = document.createElement('footer');
    footer.className = 'footer mt-auto py-5';

    footer.innerHTML = `
        <div class="container">
    <div class="row g-4 mb-5 d-flex justify-content-between">
        <!-- Título -->
        <div class="col-lg-4 col-md-6">
            <h5 class="footer-title mb-4">
                <i class="bi bi-bootstrap-fill me-2"></i>
                Bootstrap 5 Docs
            </h5>
            <p class="text-muted">
                Una guía completa y práctica para aprender Bootstrap 5, el framework front-end más popular para crear sitios web modernos y responsivos.
            </p>
        </div>

        <!-- Enlaces útiles -->
        <div class="col-lg-4 col-md-6">
            <h5 class="footer-title mb-4">Enlaces Útiles</h5>
            <ul class="footer-links list-unstyled">
                <li>
                    <i class="bi bi-book me-2"></i>
                    <a href="https://getbootstrap.com/" class="footer-link">Documentación Oficial</a>
                </li>
                <li>
                    <i class="bi bi-github me-2"></i>
                    <a href="https://github.com/twbs/bootstrap" class="footer-link">GitHub Repository</a>
                </li>
                <li>
                    <i class="bi bi-newspaper me-2"></i>
                    <a href="https://blog.getbootstrap.com/" class="footer-link">Blog Oficial</a>
                </li>
            </ul>
        </div>

        <!-- Licencia -->
        <div class="col-lg-4 col-md-6">
            <h5 class="footer-title mb-4">Licencia</h5>
            <div class="footer-license">
                <i class="bi bi-shield-check me-2"></i>
                <p class="text-muted small mb-2">
                    Código liberado bajo la 
                    <a href="https://github.com/twbs/bootstrap/blob/main/LICENSE" class="footer-link">Licencia MIT</a>
                </p>
            </div>
            <p class="text-muted small copyright">
                <i class="bi bi-c-circle me-2"></i>
                Copyright ${new Date().getFullYear()}. Todos los derechos reservados.
            </p>
        </div>
    </div>

    <hr class="footer-divider">

    <div class="row align-items-center py-3">
        <!-- Hecho con Bootstrap -->
        <div class="col-md-6 text-center text-md-start">
            <p class="text-muted mb-0 made-with">
                Hecho con <i class="bi bi-heart-fill text-danger mx-1"></i> usando Bootstrap 5
            </p>
        </div>
        <!-- Enlaces Sociales -->
        <div class="col-md-6 text-center text-md-end mt-3 mt-md-0">
            <div class="social-links">
                <a href="https://github.com/SMG-web-dev" class="social-link" aria-label="GitHub" title="GitHub">
                    <i class="bi bi-github"></i>
                </a>
                <a href="https://www.linkedin.com/in/smg-web-dev/" class="social-link" aria-label="LinkedIn" title="LinkedIn">
                    <i class="bi bi-linkedin"></i>
                </a>
            </div>
        </div>
    </div>
</div>
    `;

    return footer;
} 