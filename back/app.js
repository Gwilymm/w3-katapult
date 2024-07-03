const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./models');
const cors = require('cors'); // Assurez-vous d'importer CORS si nécessaire

const app = express();
const port = 3000;

// Middleware pour parser les requêtes POST
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware CORS
app.use(cors());

// Servir les fichiers statiques de Vue.js
app.use(express.static(path.join(__dirname, 'path/to/vue-project/dist')));

// Fonction pour charger dynamiquement les routes
const loadRoutes = (app) => {
	const routesPath = path.join(__dirname, 'routes');
	fs.readdirSync(routesPath).forEach((file) => {
		if (file.endsWith('.js')) {
			const route = require(path.join(routesPath, file));
			const routeName = file.split('.')[ 0 ];
			app.use(`/api/${routeName}`, route);
		}
	});
};

// Charger les routes
loadRoutes(app);

// Synchronisation des modèles avec la base de données
db.sequelize.sync({ alter: true }).then(() => {
	console.log('Database & tables created/updated!');
});

// Gérer les routes non-API en renvoyant `index.html`
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, 'path/to/vue-project/dist/index.html'));
});

// Démarrage du serveur
app.listen(port, () => {
	console.log(`Serveur démarré sur http://localhost:${port}`);
});
