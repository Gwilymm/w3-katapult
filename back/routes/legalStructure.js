const express = require('express');
const router = express.Router();
const db = require('../models');

// Créer une nouvelle structure juridique
router.post('/', async (req, res) => {
	try {
		const legalStructure = await db.LegalStructure.create(req.body);
		res.status(201).json(legalStructure);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

// Récupérer toutes les structures juridiques
router.get('/', async (req, res) => {
	try {
		const legalStructures = await db.LegalStructure.findAll();
		res.status(200).json(legalStructures);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

// Récupérer une structure juridique par ID
router.get('/:id', async (req, res) => {
	try {
		const legalStructure = await db.LegalStructure.findByPk(req.params.id);
		if (!legalStructure) {
			return res.status(404).json({ error: 'Structure juridique non trouvée' });
		}
		res.status(200).json(legalStructure);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

// Mettre à jour une structure juridique
router.put('/:id', async (req, res) => {
	try {
		const legalStructure = await db.LegalStructure.findByPk(req.params.id);
		if (!legalStructure) {
			return res.status(404).json({ error: 'Structure juridique non trouvée' });
		}
		await legalStructure.update(req.body);
		res.status(200).json(legalStructure);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

// Supprimer une structure juridique
router.delete('/:id', async (req, res) => {
	try {
		const legalStructure = await db.LegalStructure.findByPk(req.params.id);
		if (!legalStructure) {
			return res.status(404).json({ error: 'Structure juridique non trouvée' });
		}
		await legalStructure.destroy();
		res.status(204).send();
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

module.exports = router;
