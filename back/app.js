const express = require('express');
const bodyParser = require('body-parser');
const mutationRoutes = require('./routes/mutation');
const updateRoutes = require('./routes/update');
const app = express();
const port = 3000;

// Middleware pour parser les requêtes POST
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/mutation', mutationRoutes);
app.use('/api/update', updateRoutes);

// Démarrage du serveur
app.listen(port, () => {
	console.log(`Serveur démarré sur http://localhost:${port}`);
});
