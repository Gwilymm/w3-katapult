const express = require('express');
const router = express.Router();
const { ProjectIdentity } = require('../models');

// Créer une nouvelle identité de projet
router.post('/', async (req, res) => {
	try {
		const projectIdentity = await ProjectIdentity.create(req.body);
		res.status(201).json(projectIdentity);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

// Récupérer toutes les identités de projet
router.get('/', async (req, res) => {
	try {
		const projectIdentities = await ProjectIdentity.findAll();
		res.status(200).json(projectIdentities);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});
router.get('/application/:applicationId', async (req, res) => {
	const { applicationId } = req.params;

	try {
		const projectIdentities = await ProjectIdentity.findAll({
			where: { applicationId: applicationId }
		});

		if (projectIdentities.length > 0) {
			res.status(200).json(projectIdentities);
		} else {
			res.status(404).json({ message: 'Aucun détail de projet trouvé pour cette application.' });
		}
	} catch (error) {
		res.status(500).json({ message: 'Erreur lors de la récupération des détails du projet', error: error.message });
	}
});
// Récupérer une identité de projet par ID
router.get('/:id', async (req, res) => {
	try {
		const projectIdentity = await ProjectIdentity.findByPk(req.params.id);
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
		const projectIdentity = await ProjectIdentity.findByPk(req.params.id);
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
		const projectIdentity = await ProjectIdentity.findByPk(req.params.id);
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
