const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require("./config/database.js");
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3001;
const { ApolloServer, gql } = require("apollo-server-express");
const sequelize = require("./config/database");
const User = require("./models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secretKey = "katapult_secret_key";
const multer = require("multer");
const path = require("path");
const { GraphQLUpload } = require("graphql-upload");

// Configuration de multer pour les uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Ajouter une timestamp pour éviter les conflits de noms
  },
});

const upload = multer({ storage: storage });

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
