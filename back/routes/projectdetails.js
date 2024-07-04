const express = require('express');
const { ProjectDetails } = require('../models');
const router = express.Router();

// Create a new ProjectDetails
router.post('/', async (req, res) => {
	const {
		applicationId,
		genesis,
		summary,
		problemAddressed,
		beneficiaries,
		offer,
		differentiation,
		socialImpactIndicators
	} = req.body;

	try {
		const projectDetails = await ProjectDetails.create({
			applicationId,
			genesis,
			summary,
			problemAddressed,
			beneficiaries,
			offer,
			differentiation,
			socialImpactIndicators
		});
		res.status(201).json(projectDetails);
	} catch (error) {
		res.status(500).json({ message: 'Erreur lors de la création des détails du projet', error: error.message });
	}
});

// Get all ProjectDetails
router.get('/', async (req, res) => {
	try {
		const projectDetails = await ProjectDetails.findAll();
		res.status(200).json(projectDetails);
	} catch (error) {
		res.status(500).json({ message: 'Erreur lors de la récupération des détails du projet', error: error.message });
	}
});
router.get('/application/:applicationId', async (req, res) => {
	const { applicationId } = req.params;

	try {
		const projectDetails = await ProjectDetails.findAll({
			where: { applicationId: applicationId }
		});

		if (projectDetails.length > 0) {
			res.status(200).json(projectDetails);
		} else {
			res.status(404).json({ message: 'Aucun détail de projet trouvé pour cette application.' });
		}
	} catch (error) {
		res.status(500).json({ message: 'Erreur lors de la récupération des détails du projet', error: error.message });
	}
});

// Get ProjectDetails by ID
router.get('/:id', async (req, res) => {
	const { id } = req.params;

	try {
		const projectDetails = await ProjectDetails.findByPk(id);
		if (projectDetails) {
			res.status(200).json(projectDetails);
		} else {
			res.status(404).json({ message: 'Détails du projet non trouvés' });
		}
	} catch (error) {
		res.status(500).json({ message: 'Erreur lors de la récupération des détails du projet', error: error.message });
	}
});

// Update ProjectDetails by ID
router.put('/:id', async (req, res) => {
	const { id } = req.params;
	const {
		applicationId,
		genesis,
		summary,
		problemAddressed,
		beneficiaries,
		offer,
		differentiation,
		socialImpactIndicators
	} = req.body;

	try {
		const projectDetails = await ProjectDetails.findByPk(id);
		if (projectDetails) {
			projectDetails.applicationId = applicationId;
			projectDetails.genesis = genesis;
			projectDetails.summary = summary;
			projectDetails.problemAddressed = problemAddressed;
			projectDetails.beneficiaries = beneficiaries;
			projectDetails.offer = offer;
			projectDetails.differentiation = differentiation;
			projectDetails.socialImpactIndicators = socialImpactIndicators;
			await projectDetails.save();
			res.status(200).json(projectDetails);
		} else {
			res.status(404).json({ message: 'Détails du projet non trouvés' });
		}
	} catch (error) {
		res.status(500).json({ message: 'Erreur lors de la mise à jour des détails du projet', error: error.message });
	}
});

// Delete ProjectDetails by ID
router.delete('/:id', async (req, res) => {
	const { id } = req.params;

	try {
		const projectDetails = await ProjectDetails.findByPk(id);
		if (projectDetails) {
			await projectDetails.destroy();
			res.status(204).json({ message: 'Détails du projet supprimés' });
		} else {
			res.status(404).json({ message: 'Détails du projet non trouvés' });
		}
	} catch (error) {
		res.status(500).json({ message: 'Erreur lors de la suppression des détails du projet', error: error.message });
	}
});

module.exports = router;
