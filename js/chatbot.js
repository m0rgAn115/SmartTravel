const BASE_URL = "http://localhost:9999";

let messages = []

function renderMessages() {
  const chatBox = document.getElementById('chat-box');
  chatBox.innerHTML = ''; // Limpiar el chat antes de agregar los nuevos mensajes

  // Recorrer el array de mensajes
  messages.forEach(message => {
    addMessageToChat(message.text, message.sender);
  });

  // Desplazar hacia el último mensaje
  chatBox.scrollTop = chatBox.scrollHeight;
}

// Función para agregar un mensaje al chat
function formatMessage(content) {
  return content
    .replace(/\*\*(.*?)\*\*/g, "<b>$1</b>") // Convierte **texto** a negritas
    .replace(/\n/g, "<br>"); // Convierte saltos de línea a <br>
}

function addMessageToChat(message, sender) {
  const chatBox = document.getElementById('chat-box');
  const messageElement = document.createElement('div');
  
  // Establecer clase según el sender (usuario o bot)
  messageElement.classList.add(sender);

  // Usar la función formatMessage para procesar el contenido
  messageElement.innerHTML = formatMessage(message);

  chatBox.appendChild(messageElement);
}


// Llamar a renderMessages para mostrar los mensajes al cargar la página
renderMessages();

// Evento para enviar un nuevo mensaje
document.querySelector('.send-button').addEventListener('click', async function() {
  const userInput = document.getElementById('user-input').value;
  console.log("Entro", userInput);

  if (userInput.trim() !== "") {
    // Agregar el mensaje del usuario al array y al chat
    messages.push({ sender: 'user', text: userInput });
    addMessageToChat(userInput, 'user');

    // Limpiar el campo de texto
    document.getElementById('user-input').value = "";

    // Respuesta del bot
    const botResponse = await getBotResponse(userInput);
    messages.push({ sender: 'bot', text: botResponse });
    addMessageToChat(botResponse, 'bot');
  }
});

async function getBotResponse(userMessage) {
  try {
    const response = await fetch(BASE_URL + "/chatbot/send-message", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMessage, id_usuario: 1 })
    });

    

    if (!response.ok) {
        throw new Error("Error al enviar el mensaje");
    }

    const data = await response.json();

    console.log("respuesta: ", data.chat_message);

    return data.chat_message
} catch (error) {
    console.error(error);
}
}
