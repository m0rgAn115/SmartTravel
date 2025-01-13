document.addEventListener("DOMContentLoaded", () => {
    const newsletterForm = document.querySelector(".newsletter-form");

    newsletterForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const emailInput = newsletterForm.querySelector("input[type='email']");
        const correo = emailInput.value.trim();

        if (!correo) {
            alert("Por favor, ingresa un correo válido.");
            return;
        }

        try {
            const response = await fetch("http://localhost:9999/usuario", {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify({ correo }),
            });

            if (response.ok) {
                alert("¡Gracias por suscribirte!");
                emailInput.value = ""; // Limpia el campo del correo
            } else {
                const errorData = await response.json();
                console.error("Error al suscribirse:", errorData.message);
                alert("Hubo un problema al suscribirte. Intenta nuevamente.");
            }
        } catch (error) {
            console.error("Error en la petición:", error);
            alert("No se pudo conectar con el servidor. Intenta más tarde.");
        }
    });
});
