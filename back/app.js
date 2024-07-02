const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Middleware pour parser les requêtes POST
app.use(bodyParser.urlencoded({ extended: true }));

// Route pour afficher le formulaire
app.get('../front', (req, res) => {
	res.render('index');
});

// Route pour gérer la soumission du formulaire
app.post('/submit', (req, res) => {
	const { name, email, message } = req.body;
	res.send(`Formulaire soumis avec succès !<br>Nom: ${name}<br>Email: ${email}<br>Message: ${message}`);
});

// Démarrage du serveur
app.listen(port, () => {
	console.log(`Serveur démarré sur http://localhost:${port}`);
});
