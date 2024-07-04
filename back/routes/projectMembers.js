const express = require('express');
const router = express.Router();
const db = require('../models');

// Créer un nouveau membre de projet
router.post('/', async (req, res) => {
	try {
		const projectMember = await db.ProjectMembers.create(req.body);
		res.status(201).json(projectMember);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

router.get('/application/:applicationId', async (req, res) => {
	const { applicationId } = req.params;

	try {
		const projectMember = await projectMember.findAll({
			where: { applicationId: applicationId }
		});

		if (projectMember.length > 0) {
			res.status(200).json(projectMember);
		} else {
			res.status(404).json({ message: 'Aucun détail de projet trouvé pour cette application.' });
		}
	} catch (error) {
		res.status(500).json({ message: 'Erreur lors de la récupération des détails du projet', error: error.message });
	}
});

// Récupérer tous les membres de projet
router.get('/', async (req, res) => {
	try {
		const projectMembers = await db.ProjectMembers.findAll();
		res.status(200).json(projectMembers);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

// Récupérer un membre de projet par ID
router.get('/:id', async (req, res) => {
	try {
		const projectMember = await db.ProjectMembers.findByPk(req.params.id);
		if (!projectMember) {
			return res.status(404).json({ error: 'Membre de projet non trouvé' });
		}
		res.status(200).json(projectMember);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

// Mettre à jour un membre de projet
router.put('/:id', async (req, res) => {
	try {
		const projectMember = await db.ProjectMembers.findByPk(req.params.id);
		if (!projectMember) {
			return res.status(404).json({ error: 'Membre de projet non trouvé' });
		}
		await projectMember.update(req.body);
		res.status(200).json(projectMember);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

// Supprimer un membre de projet
router.delete('/:id', async (req, res) => {
	try {
		const projectMember = await db.ProjectMembers.findByPk(req.params.id);
		if (!projectMember) {
			return res.status(404).json({ error: 'Membre de projet non trouvé' });
		}
		await projectMember.destroy();
		res.status(204).send();
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

module.exports = router;
