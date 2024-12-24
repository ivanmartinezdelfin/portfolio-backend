// Función para envolver cada letra en un span
function wrapLetters(element) {
    const text = element.textContent;
    const wrappedText = text.split('').map(char => {
        // Mantener los espacios sin envolver
        if (char === ' ') {
            return char;
        }
        return `<span>${char}</span>`;
    }).join('');
    element.innerHTML = wrappedText;
}

// Seleccionar todos los elementos con la clase 'interactive-text'
const interactiveTexts = document.querySelectorAll('.interactive-text');

// Aplicar la función wrapLetters a cada elemento
interactiveTexts.forEach(textElement => {
    wrapLetters(textElement);
});

// Añadir evento de movimiento del ratón a cada elemento interactivo
interactiveTexts.forEach(textElement => {
    textElement.addEventListener('mousemove', (e) => {
        const { left, top } = textElement.getBoundingClientRect();
        const x = e.clientX - left;
        const y = e.clientY - top;

        const spans = textElement.querySelectorAll('span');
        spans.forEach(span => {
            const spanRect = span.getBoundingClientRect();
            const spanX = spanRect.left - left + spanRect.width / 2;
            const spanY = spanRect.top - top + spanRect.height / 2;
            const deltaX = x - spanX;
            const deltaY = y - spanY;
            const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

            // Radio de efecto
            const radius = 80;

            if (distance < radius) {
                // Determinar la dirección del cursor respecto a la letra
                const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);

                let scaleX = 1;
                let scaleY = 1;

                if (angle >= -45 && angle <= 45) {
                    scaleX = 1.2;
                } else if (angle > 45 && angle < 135) {
                    scaleY = 1.2;
                } else if (angle >= 135 || angle <= -135) {
                    scaleX = 1.2;
                } else if (angle < -45 && angle > -135) {
                    scaleY = 1.2;
                }

                // Aplicar escala
                span.style.transform = `scale(${scaleX}, ${scaleY})`;

                // Cambiar color basado en la distancia
                const distanceRatio = distance / radius;
                if (distanceRatio < 0.33) {
                    span.style.color = 'hsl(220, 100%, 50%)';
                } else if (distanceRatio < 0.66) {
                    span.style.color = 'hsl(30, 100%, 50%)';
                } else {
                    span.style.color = 'hsl(135, 100%, 60%)';
                }
            } else {
                span.style.transform = 'scale(1,1)';
                span.style.color = '#000';
            }
        });
    });

    // Resetear efectos al salir del elemento interactivo
    textElement.addEventListener('mouseleave', () => {
        const spans = textElement.querySelectorAll('span');
        spans.forEach(span => {
            span.style.transform = 'scale(1,1)';
            span.style.color = '#000';
        });
    });
});