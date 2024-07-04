const express = require('express');
const { EconomicModel } = require('../models');
const router = express.Router();

// Create a new EconomicModel
router.post('/', async (req, res) => {
	const {
		applicationId,
		revenueSources,
		jobCreation,
		economicViability,
		diversificationProjects,
		partnerships,
		partnershipsResearch,
		stakeholderRoles
	} = req.body;

	try {
		const economic = await EconomicModel.create({
			applicationId,
			revenueSources,
			jobCreation,
			economicViability,
			diversificationProjects,
			partnerships,
			partnershipsResearch,
			stakeholderRoles
		});
		res.status(201).json(economic);
	} catch (error) {
		res.status(500).json({ message: 'Erreur lors de la création du modèle économique', error: error.message });
	}
});

// Get all EconomicModels
router.get('/', async (req, res) => {
	try {
		const economics = await EconomicModel.findAll();
		res.status(200).json(economics);
	} catch (error) {
		res.status(500).json({ message: 'Erreur lors de la récupération des modèles économiques', error: error.message });
	}
});

// Get an EconomicModel by ID
router.get('/:id', async (req, res) => {
	const { id } = req.params;

	try {
		const economic = await EconomicModel.findByPk(id);
		if (economic) {
			res.status(200).json(economic);
		} else {
			res.status(404).json({ message: 'Modèle économique non trouvé' });
		}
	} catch (error) {
		res.status(500).json({ message: 'Erreur lors de la récupération du modèle économique', error: error.message });
	}
});

// Update an EconomicModel by ID
router.put('/:id', async (req, res) => {
	const { id } = req.params;
	const {
		applicationId,
		revenueSources,
		jobCreation,
		economicViability,
		diversificationProjects,
		partnerships,
		partnershipsResearch,
		stakeholderRoles
	} = req.body;

	try {
		const economic = await EconomicModel.findByPk(id);
		if (economic) {
			economic.applicationId = applicationId;
			economic.revenueSources = revenueSources;
			economic.jobCreation = jobCreation;
			economic.economicViability = economicViability;
			economic.diversificationProjects = diversificationProjects;
			economic.partnerships = partnerships;
			economic.partnershipsResearch = partnershipsResearch;
			economic.stakeholderRoles = stakeholderRoles;
			await economic.save();
			res.status(200).json(economic);
		} else {
			res.status(404).json({ message: 'Modèle économique non trouvé' });
		}
	} catch (error) {
		res.status(500).json({ message: 'Erreur lors de la mise à jour du modèle économique', error: error.message });
	}
});

// Delete an EconomicModel by ID
router.delete('/:id', async (req, res) => {
	const { id } = req.params;

	try {
		const economic = await EconomicModel.findByPk(id);
		if (economic) {
			await economic.destroy();
			res.status(204).json({ message: 'Modèle économique supprimé' });
		} else {
			res.status(404).json({ message: 'Modèle économique non trouvé' });
		}
	} catch (error) {
		res.status(500).json({ message: 'Erreur lors de la suppression du modèle économique', error: error.message });
	}
});

module.exports = router;
