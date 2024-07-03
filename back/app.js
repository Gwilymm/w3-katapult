const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require("./config/database.js");
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

// Middleware pour parser les requêtes POST
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Fonction pour charger dynamiquement les routes
const loadRoutes = (app) => {
	const routesPath = path.join(__dirname, 'routes');
	fs.readdirSync(routesPath).forEach((file) => {
		if (file.endsWith('.js')) {
			const route = require(path.join(routesPath, file));
			const routeName = file.split('.')[ 0 ];
			console.log(`Chargement de la route /api/${routeName}`);
			app.use(`/api/${routeName}`, route);
		}
	});
};

// Charger les routes
loadRoutes(app);

// Démarrage du serveur
sequelize.sync().then(() => {
	app.listen(port, () => {
		console.log(`Serveur démarré sur http://localhost:${port}`);
	});
});
