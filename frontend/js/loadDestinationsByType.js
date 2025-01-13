const BASE_URL = "http://localhost:9999";
const endpoint = "/paquetes/type"
const contenedores = {
    Nacional: 'contenedor-nacionales',
    Internacional: 'contenedor-internacionales',
};
console.log('holaaa')
try {
    const tipos = Object.keys(contenedores);

    for (const tipo of tipos) {
        const response = await fetch(`${BASE_URL}${endpoint}?tipo=${tipo}`);
        if (!response.ok) {
            throw new Error(`Error al obtener los paquetes (${tipo}): ${response.statusText}`);
        }

        const paquetes = await response.json();
        const container = document.getElementById(contenedores[tipo]);

        if (!container) {
            console.error(`No se encontró un contenedor con el ID: ${contenedores[tipo]}`);
            continue;
        }

        container.innerHTML = ''; // Limpiar contenedor

        paquetes.forEach(paquete => {
            const destino = document.createElement('div');
            destino.classList.add('destino');
            destino.innerHTML = `
                <img src="${BASE_URL}${paquete.imagen}" alt="${paquete.nombre}">
                <h3>${paquete.nombre}</h3>
                <p>${paquete.descripcion}</p>
                <a class="btn detalles-btn-${tipo}" data-id="${paquete.id}">Ver detalles</a>
            `;
            container.appendChild(destino);
        });
    }
} catch (error) {
    console.error("Error al cargar los destinos:", error);
}