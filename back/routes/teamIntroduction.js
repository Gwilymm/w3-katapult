const express = require('express');
const { TeamIntroduction } = require('../models');
const router = express.Router();

// Create a new TeamIntroduction
router.post('/', async (req, res) => {
	const {
		applicationId,
		teamIntroduction,
		entrepreneurialExperience,
		inspirationalEntrepreneur,
		missingSkills,
		incubationParticipation,
		professionalSituation,
		incubationSchedule
	} = req.body;

	try {
		const teamIntro = await TeamIntroduction.create({
			applicationId,
			teamIntroduction,
			entrepreneurialExperience,
			inspirationalEntrepreneur,
			missingSkills,
			incubationParticipation,
			professionalSituation,
			incubationSchedule
		});
		res.status(201).json(teamIntro);
	} catch (error) {
		res.status(500).json({ message: 'Erreur lors de la création de l\'introduction de l\'équipe', error: error.message });
	}
});

// Get all TeamIntroductions
router.get('/', async (req, res) => {
	try {
		const teamIntros = await TeamIntroduction.findAll();
		res.status(200).json(teamIntros);
	} catch (error) {
		res.status(500).json({ message: 'Erreur lors de la récupération des introductions de l\'équipe', error: error.message });
	}
});

// Get TeamIntroduction by ID
router.get('/:id', async (req, res) => {
	const { id } = req.params;

	try {
		const teamIntro = await TeamIntroduction.findByPk(id);
		if (teamIntro) {
			res.status(200).json(teamIntro);
		} else {
			res.status(404).json({ message: 'Introduction de l\'équipe non trouvée' });
		}
	} catch (error) {
		res.status(500).json({ message: 'Erreur lors de la récupération de l\'introduction de l\'équipe', error: error.message });
	}
});

// Update TeamIntroduction by ID
router.put('/:id', async (req, res) => {
	const { id } = req.params;
	const {
		applicationId,
		teamIntroduction,
		entrepreneurialExperience,
		inspirationalEntrepreneur,
		missingSkills,
		incubationParticipation,
		professionalSituation,
		incubationSchedule
	} = req.body;

	try {
		const teamIntro = await TeamIntroduction.findByPk(id);
		if (teamIntro) {
			teamIntro.applicationId = applicationId;
			teamIntro.teamIntroduction = teamIntroduction;
			teamIntro.entrepreneurialExperience = entrepreneurialExperience;
			teamIntro.inspirationalEntrepreneur = inspirationalEntrepreneur;
			teamIntro.missingSkills = missingSkills;
			teamIntro.incubationParticipation = incubationParticipation;
			teamIntro.professionalSituation = professionalSituation;
			teamIntro.incubationSchedule = incubationSchedule;
			await teamIntro.save();
			res.status(200).json(teamIntro);
		} else {
			res.status(404).json({ message: 'Introduction de l\'équipe non trouvée' });
		}
	} catch (error) {
		res.status(500).json({ message: 'Erreur lors de la mise à jour de l\'introduction de l\'équipe', error: error.message });
	}
});

// Delete TeamIntroduction by ID
router.delete('/:id', async (req, res) => {
	const { id } = req.params;

	try {
		const teamIntro = await TeamIntroduction.findByPk(id);
		if (teamIntro) {
			await teamIntro.destroy();
			res.status(204).json({ message: 'Introduction de l\'équipe supprimée' });
		} else {
			res.status(404).json({ message: 'Introduction de l\'équipe non trouvée' });
		}
	} catch (error) {
		res.status(500).json({ message: 'Erreur lors de la suppression de l\'introduction de l\'équipe', error: error.message });
	}
});

module.exports = router;
