const BASE_URL = "http://localhost:9999";
const endpoint = "/paquete/detail";

document.addEventListener('click', async (event) => {
    const button = event.target.closest('.detalles-btn-Nacional');
    if (!button) return;

    event.preventDefault();

    const id = button.getAttribute('data-id');
    const detalleSection = document.getElementById('detalles-dinamico-nacional');

    try {
        const response = await fetch(`${BASE_URL}${endpoint}?id=${id}`);

        if (!response.ok) {
            throw new Error(`Error al obtener los detaller: ${response.status}`);
        }

        const detalles = await response.json();

        const opcionesFecha = { timeZone: 'UTC', day: 'numeric', month: 'long', year: 'numeric' };
        const opcionesHora = { timeZone: 'UTC', hour: '2-digit', minute: '2-digit' };

        const fechaSalida = new Date(detalles.fechaSalida);
        const fechaRegreso = new Date(detalles.fechaRegreso);
        
        // Fechas formateadas
        const fechaSalidaFormateada = fechaSalida.toLocaleDateString('es-Es', opcionesFecha);
        const fechaRegresoFormateada = fechaRegreso.toLocaleDateString('es-Es', opcionesFecha);

        // Horas formateadas
        const horaSalidaFormateada = fechaSalida.toLocaleTimeString('es-Es', opcionesHora);
        const horaRegresoFormateada = fechaRegreso.toLocaleTimeString('es-Es', opcionesHora);

        // Renderizar los detaller en la seccion
        detalleSection.innerHTML = `
            <div class="details__container">
                <div class="details__container--text">
                    <h3>Detalles del viaje a ${detalles.nombre}</h3>
                    <p><strong>Costo:</strong> $${detalles.precio} USD</p>
                    <p><strong>Hospedaje:</strong> ${detalles.hospedaje}</p>
                    <p><strong>Lugares a recorrer:</strong> ${detalles.lugares}</p>
                    <p><strong>Fecha de salida:</strong> ${fechaSalidaFormateada}, a las ${horaSalidaFormateada} hrs</p>
                    <p><strong>Fecha de regreso:</strong> ${fechaRegresoFormateada}, a las ${horaRegresoFormateada} hrs</p>
                </div>
                <img class="details__container--image" src="${BASE_URL}${detalles.imagenDetalles}" alt="${detalles.nombre}">
            </div>
            <div class="comprar__boton">
                <a href="/pages/pago.html?id=${detalles.id}" class="comprar__boton--texto">Comprar ahora</a>
            </div>
        `;
        detalleSection.style.display = 'block';

    } catch (error) {
        console.error(error);
        detalleSection.innerHTML = '<p>Error al cargar los detalles del destino.</p>'
    }
});