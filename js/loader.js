window.addEventListener('load', function() {
    const loader = document.getElementById('loader');
    const content = document.getElementById('content');
    
    if (loader) {
        setTimeout(function() {
            loader.style.opacity = '0'; // Cambia a opacidad 0 primero
            setTimeout(function() {
                loader.style.display = 'none'; // Luego establece display a none
                if (content) {
                    content.classList.add('visible');
                    setTimeout(function() {
                        content.classList.add('show');
                    }, 50); // Un pequeño retraso para activar la transición de opacidad
                } else {
                    console.error('Content element not found');
                }
            }, 8000); // Ajusta este tiempo para que coincida con la transición de opacidad
        }, 3000); // Retraso de 7.82 segundos
    } else {
        console.error('Loader element not found');
    }
});
