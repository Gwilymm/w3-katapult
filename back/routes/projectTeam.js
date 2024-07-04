const express = require('express');
const { ProjectTeam } = require('../models');
const router = express.Router();

// Create a new ProjectTeam
router.post('/', async (req, res) => {
	const { applicationId, name, surname, email, phone } = req.body;

	try {
		const projectTeam = await ProjectTeam.create({
			applicationId,
			name,
			surname,
			email,
			phone
		});
		res.status(201).json(projectTeam);
	} catch (error) {
		res.status(500).json({ message: 'Erreur lors de la création du membre de l\'équipe de projet', error: error.message });
	}
});

// Get all ProjectTeams
router.get('/', async (req, res) => {
	try {
		const projectTeams = await ProjectTeam.findAll();
		res.status(200).json(projectTeams);
	} catch (error) {
		res.status(500).json({ message: 'Erreur lors de la récupération des membres de l\'équipe de projet', error: error.message });
	}
});
router.get('/application/:applicationId', async (req, res) => {
	const { applicationId } = req.params;

	try {
		const projectTeams = await projectTeams.findAll({
			where: { applicationId: applicationId }
		});

		if (projectTeams.length > 0) {
			res.status(200).json(projectTeams);
		} else {
			res.status(404).json({ message: 'Aucun détail de projet trouvé pour cette application.' });
		}
	} catch (error) {
		res.status(500).json({ message: 'Erreur lors de la récupération des détails du projet', error: error.message });
	}
});
// Get ProjectTeam by ID
router.get('/:id', async (req, res) => {
	const { id } = req.params;

	try {
		const projectTeam = await ProjectTeam.findByPk(id);
		if (projectTeam) {
			res.status(200).json(projectTeam);
		} else {
			res.status(404).json({ message: 'Membre de l\'équipe de projet non trouvé' });
		}
	} catch (error) {
		res.status(500).json({ message: 'Erreur lors de la récupération du membre de l\'équipe de projet', error: error.message });
	}
});

// Update ProjectTeam by ID
router.put('/:id', async (req, res) => {
	const { id } = req.params;
	const { applicationId, name, surname, email, phone } = req.body;

	try {
		const projectTeam = await ProjectTeam.findByPk(id);
		if (projectTeam) {
			projectTeam.applicationId = applicationId;
			projectTeam.name = name;
			projectTeam.surname = surname;
			projectTeam.email = email;
			projectTeam.phone = phone;
			await projectTeam.save();
			res.status(200).json(projectTeam);
		} else {
			res.status(404).json({ message: 'Membre de l\'équipe de projet non trouvé' });
		}
	} catch (error) {
		res.status(500).json({ message: 'Erreur lors de la mise à jour du membre de l\'équipe de projet', error: error.message });
	}
});

// Delete ProjectTeam by ID
router.delete('/:id', async (req, res) => {
	const { id } = req.params;

	try {
		const projectTeam = await ProjectTeam.findByPk(id);
		if (projectTeam) {
			await projectTeam.destroy();
			res.status(204).json({ message: 'Membre de l\'équipe de projet supprimé' });
		} else {
			res.status(404).json({ message: 'Membre de l\'équipe de projet non trouvé' });
		}
	} catch (error) {
		res.status(500).json({ message: 'Erreur lors de la suppression du membre de l\'équipe de projet', error: error.message });
	}
});

module.exports = router;
