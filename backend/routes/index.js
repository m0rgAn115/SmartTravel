const express = require('express');
const router = express.Router();
const groqRoutes = require('./chatbot');

// Asocia la ruta de Groq
router.use('/chatbot', groqRoutes);

module.exports = router;
