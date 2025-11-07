const express = require('express');
const cors = require('cors');
const app = express();
const wordRoutes = require('./routes/wordRoutes');

app.use(cors());
app.use(express.json());

// Sample route
app.get('/', (req, res) => {
  res.send('API de traductor funcionando... >:)');
});

app.use('/api/words', wordRoutes); //Ahora conectamos todo el multiverso

module.exports = app;