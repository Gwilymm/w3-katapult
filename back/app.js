const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./models');
const cors = require('cors'); // Assurez-vous d'importer CORS si nécessaire
const fs = require('fs');
const sequelize = require("./config/database");
const app = express();
const port = 3000;

// Middleware pour parser les requêtes POST
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware CORS
app.use(cors());

// Servir les fichiers statiques de Vue.js
app.use(express.static(path.join(__dirname, '../front/dist')));


// Fonction pour charger dynamiquement les routes
const loadRoutes = (app) => {
	const routesPath = path.join(__dirname, 'routes');
	fs.readdirSync(routesPath).forEach((file) => {
		const fullPath = path.join(routesPath, file);
		const stat = fs.statSync(fullPath);

		if (stat.isDirectory()) {
			fs.readdirSync(fullPath).forEach((subFile) => {
				if (subFile.endsWith('.js')) {
					const route = require(path.join(fullPath, subFile));
					const routeName = path.basename(fullPath);
					console.log(`Chargement de la sous-route /api/${routeName}`);
					app.use(`/api/${routeName}`, route);
				}
			});
		} else if (file.endsWith('.js')) {
			const route = require(fullPath);
			const routeName = file.split('.')[ 0 ];

			console.log(`Chargement de la route /api/${routeName}`);
			app.use(`/api/${routeName}`, route);
		}
	});
};

// Charger les routes
loadRoutes(app);

// Synchronisation des modèles avec la base de données
db.sequelize.sync().then(() => {
    console.log('Database & tables created/updated!');
});

// Gérer les routes non-API en renvoyant `index.html`
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../front/dist/index.html'));
});



app.listen(port, () => {
    console.log(`Serveur en cours sur http://localhost:${port}`);
});
