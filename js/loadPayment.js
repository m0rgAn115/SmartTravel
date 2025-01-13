const BASE_URL = "http://localhost:9999";
const endpoint = "/reservacion";
const idPaquete = new URLSearchParams(window.location.search).get('id');

document.querySelector(".pago-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const correo = document.getElementById("email").value;

    try {
        const response = await fetch(BASE_URL + endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ correo, idPaquete })
        });

        if (!response.ok) {
            throw new Error("Error al procesar el pago");
        }

        const data = await response.json();
        alert("Reservacion creada con éxito!");
    } catch (error) {
        console.error(error);
    }
});