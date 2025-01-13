const express = require('express');
const router = express.Router();
const Groq = require('groq-sdk');
const Reservacion = require('../models/Reservacion');
const Paquete = require('../models/Paquete');
const Usuario = require('../models/Usuario');

// Configuración del cliente Groq
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const MODELS = ["llama-3.3-70b-versatile","llama3-70b-8192", "llama3-8b-8192"]

const MODEL = MODELS[1]

let consulta_reciente = []

let conversationHistory = [];

let user_conversation = []

let ultimo_id = undefined

async function sendMessage(message, additionalData = {}) {
  try {
    // if(conversationHistory.length > 5){
    //   conversationHistory.reduce
    // }
    // Agregar el mensaje del usuario al historial
    conversationHistory.push({
      role: "user",
      content: `Este es el mensaje actual del usuario, enfocate en este mensaje para responder: ${message}`,
    });

    user_conversation.push({
      role: "user",
      content: `${message}`,
    });

    // Si tienes datos adicionales (como fecha, reservación, etc.), inclúyelos en el mensaje
    if (additionalData) {
      conversationHistory.push({
        role: "system",  // Puedes usar "system" para incluir datos relevantes en el historial
        content: `Información extra, devuelve la informacion con el id correspondiente de los registros: ${JSON.stringify(additionalData)} `,
      });
    }

    

    // Enviar el historial completo de mensajes al modelo
    const response = await groq.chat.completions.create({
      messages: conversationHistory,
      model: MODEL,
    });

    return response;
  } catch (error) {
    throw new Error(`Error en Groq: ${error.message}`);
  }
}


// Esta funcion analiza el mensaje del usuario con los mensajes anteriores
// para determinar si se sigue hablando del mismo contexto sino eliminar el
// historia de la conversacion
async function get_query_params(message) {
  try {
    // Enviar el mensaje al modelo para obtener una respuesta
    const response = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: `Extrae el nombre de la tabla y fecha del siguiente mensaje: "${message}"; 
          Devuelve la informacion asi: tabla: {nombre de la tabla}, fecha: {fecha}, en caso de no identificar los datos colocalos como {null}.
          El mensaje podria ser asi:
          user: ¿Cuales son mis reservacion?,
          respuesta: tabla: {reservacion}, fecha: {null}

          Otro ejemplo:
          user: ¿Cuales son sus paquetes?
          respuesta: tabla: {paquete}, fecha: {null}

          Otro ejemplo:
          user: ¿Cual es mi reservacion del 15 de noviembre del 2024?
          respuesta: tabla: {paquete}, fecha: {2024/11/15}

          Las tablas no deben ir en plural, si la palabra tiene acentos no debes colocar los acentos. Las fechas deben ir en formato YYYY/MM/DD.
          Tu respuesta unicamente puede ir EN EL SIGUIENTE FORMATO:   tabla: {string}, fecha: {YYYY/MM/DD}
          `,
        },
      ],
      model: MODEL, // Usa el modelo adecuado aquí
    });

    // Extraer la respuesta generada por el modelo
    const responseMessage = response.choices[0]?.message?.content;

    // Si el modelo respondió con los datos clave en un formato esperado, lo extraemos
    const tableMatch = responseMessage.match(/tabla:\s*["']?(\w+)["']?/);  // Maneja las comillas
    const dateMatch = responseMessage.match(/fecha:\s*["']?(\d{4}[\/-]\d{2}[\/-]\d{2})["']?/);  // Considera el formato YYYY/MM/DD o YYYY-MM-DD


    // Preparar los datos extraídos
    const extractedData = {
      tabla: tableMatch ? tableMatch[1] : null,
      fecha: dateMatch ? dateMatch[1] : null,
    };

    return {
      responseMessage,
      tableMatch,
      dateMatch,
      extractedData
    };
  } catch (error) {
    throw new Error(`Error en la extracción de parámetros: ${error.message}`);
  }
}

async function registrar_reservacion(correo) {
  try {
    // Enviar el mensaje al modelo para obtener una respuesta
    const response = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: `
            Analiza el historial de la conversación y la última consulta realizada para determinar los datos necesarios para una reservación.

            Datos requeridos:
            {
              paquete_id: {int},
              fecha: {string | null},
              reservar: {true | false | null}
            }

            Instrucciones:
            1. Revisa el historial de conversación y detecta si el usuario ya expresó la intención de reservar. Si hay una expresión clara de intención como "quiero reservar", "hagamos la reservación", o "resérvalo ya", el campo "reservar" debe ser true.
            2. Si no hay una intención explícita de reservar, pero el usuario está pidiendo información, el campo "reservar" debe ser false.
            3. Si no se puede determinar claramente si el usuario quiere reservar, el campo "reservar" debe ser null.
            4. Extrae el "paquete_id" de la última consulta o del paquete mencionado en el historial. Si no se menciona ningún paquete, retorna "paquete_id" como null.
            5. Extrae la fecha de la conversación o establece "fecha" como null si no se menciona ninguna fecha.

            Historial de la conversación (orden cronológico):
            ${JSON.stringify(conversationHistory.slice(-3))}

            Datos de la última consulta:
            ${JSON.stringify(consulta_reciente)}

            Ejemplo de respuesta en formato JSON:
            {
              "paquete_id": 123,
              "fecha": "2025-02-24T16:00:00.000Z",
              "reservar": true
            }

            Si no puedes determinar los datos claramente, utiliza null donde sea necesario. Responde solo con un JSON en el formato especificado, sin ningún texto adicional fuera de este formato.
          `,
        },
      ],
      model: MODELS[0], // Sustituye con el modelo adecuado,
      response_format: { type: "json_object" }
    });

    // Extraer la respuesta generada por el modelo
    const responseMessage = JSON.parse(response.choices[0]?.message?.content)

    if(responseMessage.paquete_id != null )
      ultimo_id = responseMessage.paquete_id

    if (ultimo_id!= undefined )

      if(responseMessage.reservar != null && responseMessage.reservar != false ){
        console.log("RESERVACION---");

          try {
              // Verificar si el usuario ya existe
              let usuario = await Usuario.findOne({ where: { correo } });

              if (!usuario) {
                  // Crear el usuario si no existe
                  usuario = await Usuario.create({ correo });
              }

              console.log("ultimo id: ", ultimo_id);
              

              // Verificar si el paquete existe
              const paquete = await Paquete.findByPk(ultimo_id);
              if (!paquete) {
                console.log("no encontrado");
                
                return { responseMessage, final_message: "Error al crear la reservacion, intentelo más tarde. 😥" }
                  
              }

              const reservacion = await Reservacion.create({
                idUsuario: usuario.id,
                idPaquete: ultimo_id,
                estadoReservacion: "Pendiente"
            });

             return { responseMessage, final_message: "Reservacion registrada! 🥳" }
          } catch (error) {
              console.error(error);
             return { responseMessage, final_message: "Error al crear la reservacion, intentelo más tarde. 😥" }

          }
        
      }

    return {
      responseMessage,
    };
  } catch (error) {
    throw new Error(`Error en la función registrar_reservacion: ${error.message}`);
  }
}

async function consultar_data(query_data){
  try {
    if(query_data.tabla === "paquete"){
       const paquetes = await Paquete.findAll({
          where: { estado: "Activo" },
      });

      const paquetes_resum = await Paquete.findAll({
        where: { estado: "Activo" },
        attributes: ["id", "nombre"]
    });


    const paquetesSimplificados = paquetes_resum.map(paquete => paquete.dataValues);

    console.log("paquetes resum: ", paquetesSimplificados);


      consulta_reciente = paquetesSimplificados


      return paquetes
    }else if(query_data.tabla === "reservacion"){

       let usuario = await Usuario.findOne({ where: { correo: query_data.correo } });

        const reservaciones = await Reservacion.findAll({
          where: { idUsuario: usuario.id },
          attributes: { exclude: ["id"] },
          include: [ { model: Paquete, attributes: ["nombre", "precio", "fechaSalida", "fechaRegreso"] } ]
      });

      return reservaciones
    }

    return undefined
    
} catch (error) {
    console.error(error);
    return undefined
}
}

router.post('/send-message', async (req, res) => {
  try {
    const { message } = req.body;
    const { id_usuario, correo } = req.body;

    if (!message) {
      return res.status(400).json({ status: "error", message: "No se envio un mensaje." });
    }

    const test = await get_query_params(message)
    const query_parameters = {
      tabla: test.extractedData.tabla,
      fecha: test.extractedData.fecha,
      correo
    }
    
    const query_data = await consultar_data(query_parameters)
    // console.log("Query data: ", query_data);
    

    const chat_response = await sendMessage(message, query_data);
    const chat_message = chat_response.choices[0]?.message?.content || "No content";

    // console.log("mensaje: ",chat_message);
    

    registrar_res = await registrar_reservacion(correo)

    console.log("res: ", registrar_res);


    if(registrar_res.final_message){
    res.status(200).json({ chat_message: registrar_res.final_message });
    } else {
      res.status(200).json({ chat_message });

    }

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
