// codeCopy.js
export function setupCodeCopy() {
    function initializeCodeCopy() {
        document.querySelectorAll('.code-example').forEach((block) => {
            const codeElement = block.querySelector('code');
            if (codeElement && !block.querySelector('.copy-button')) {
                addCopyButton(block, codeElement);
            }
        });
    }

    function addCopyButton(block, codeElement) {
        const buttonWrapper = document.createElement('div');
        buttonWrapper.className = 'copy-button-wrapper';

        const button = createCopyButton();
        buttonWrapper.appendChild(button);
        block.appendChild(buttonWrapper);

        button.addEventListener('click', () => handleCopyClick(button, codeElement));

        // Añadir tooltip con el atajo de teclado
        button.setAttribute('title', 'Copiar al portapapeles (Ctrl/Cmd + C)');

        // Añadir efecto de hover
        button.addEventListener('mouseover', () => {
            button.style.transform = 'translateY(-2px)';
        });

        button.addEventListener('mouseout', () => {
            button.style.transform = 'translateY(0)';
        });
    }

    function createCopyButton() {
        const button = document.createElement('button');
        button.className = 'copy-button';
        button.innerHTML = 'Copiar';
        button.setAttribute('aria-label', 'Copiar código');
        return button;
    }

    async function handleCopyClick(button, codeElement) {
        try {
            const codeToCopy = getCleanCode(codeElement);
            await navigator.clipboard.writeText(codeToCopy);
            updateButtonState(button, 'success');

            // Efecto de feedback visual
            button.style.transform = 'scale(0.95)';
            setTimeout(() => {
                button.style.transform = 'scale(1)';
            }, 100);
        } catch (err) {
            console.error('Error al copiar:', err);
            updateButtonState(button, 'error');
        }
    }

    function getCleanCode(codeElement) {
        // Obtener solo el texto del código, excluyendo los botones y otros elementos
        return Array.from(codeElement.childNodes)
            .filter(node => node.nodeType === Node.TEXT_NODE ||
                (node.nodeType === Node.ELEMENT_NODE &&
                    !node.classList?.contains('copy-button-wrapper')))
            .map(node => node.textContent)
            .join('')
            .trim();
    }

    function updateButtonState(button, state) {
        const states = {
            success: { text: '¡Copiado!', class: 'copied' },
            error: { text: 'Error', class: 'error' }
        };

        const { text, class: className } = states[state];
        const originalText = 'Copiar';

        button.textContent = text;
        button.classList.add(className);

        // Restaurar el estado original después de un delay
        setTimeout(() => {
            button.textContent = originalText;
            button.classList.remove(className);
        }, 2000);
    }

    // Inicializar
    initializeCodeCopy();

    // Escuchar cambios en el contenido
    document.addEventListener('contentLoaded', initializeCodeCopy);

    // Añadir soporte para atajos de teclado
    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'c') {
            const activeElement = document.activeElement;
            if (activeElement.closest('.code-example')) {
                const codeBlock = activeElement.closest('.code-example');
                const button = codeBlock.querySelector('.copy-button');
                if (button) {
                    button.click();
                    e.preventDefault();
                }
            }
        }
    });
}