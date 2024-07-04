const express = require('express');
const router = express.Router();
const db = require('../models');

// Créer une nouvelle identité de projet
router.post('/', async (req, res) => {
	try {
		const projectIdentity = await db.ProjectIdentity.create(req.body);
		res.status(201).json(projectIdentity);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

// Récupérer toutes les identités de projet
router.get('/', async (req, res) => {
	try {
		const projectIdentities = await db.ProjectIdentity.findAll();
		res.status(200).json(projectIdentities);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

// Récupérer une identité de projet par ID
router.get('/:id', async (req, res) => {
	try {
		const projectIdentity = await db.ProjectIdentity.findByPk(req.params.id);
		if (!projectIdentity) {
			return res.status(404).json({ error: 'Identité de projet non trouvée' });
		}
		res.status(200).json(projectIdentity);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

// Mettre à jour une identité de projet
router.put('/:id', async (req, res) => {
	try {
		const projectIdentity = await db.ProjectIdentity.findByPk(req.params.id);
		if (!projectIdentity) {
			return res.status(404).json({ error: 'Identité de projet non trouvée' });
		}
		await projectIdentity.update(req.body);
		res.status(200).json(projectIdentity);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

// Supprimer une identité de projet
router.delete('/:id', async (req, res) => {
	try {
		const projectIdentity = await db.ProjectIdentity.findByPk(req.params.id);
		if (!projectIdentity) {
			return res.status(404).json({ error: 'Identité de projet non trouvée' });
		}
		await projectIdentity.destroy();
		res.status(204).send();
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

module.exports = router;
