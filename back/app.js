const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const sequelize = require("./config/database");
const app = express();
const port = 3001;

// Middleware pour parser les requêtes POST
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware pour activer CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // Autoriser l'accès depuis n'importe quelle origine
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE"); // Méthodes HTTP autorisées
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization"); // En-têtes autorisés
  next();
});

// Pour servir les fichiers statiques
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Fonction pour charger dynamiquement les routes
const loadRoutes = (app) => {
<<<<<<< Updated upstream
	const routesPath = path.join(__dirname, 'routes');
	fs.readdirSync(routesPath).forEach((file) => {
		if (file.endsWith('.js')) {
			const route = require(path.join(routesPath, file));
			const routeName = file.split('.')[0];
			console.log(`Chargement de la route /api/${routeName}`);
			app.use(`/api/${routeName}`, route);
		}
	});
=======
  const routesPath = path.join(__dirname, "routes");
  fs.readdirSync(routesPath).forEach((file) => {
    if (file.endsWith(".js")) {
      const route = require(path.join(routesPath, file));
      const routeName = file.split(".")[0];
      console.log(`Chargement de la route /api/${routeName}`);
      app.use(`/api/${routeName}`, route);
    }
  });
>>>>>>> Stashed changes
};

// Charger les routes
loadRoutes(app);

// Démarrage du serveur
sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Serveur en cours sur http://localhost:${port}`);
  });
<<<<<<< Updated upstream
});
=======
});
>>>>>>> Stashed changes
