const express = require('express');
const { Conscent } = require('../models'); // Assurez-vous d'importer le modèle Conscent correctement
const router = express.Router();

// Create a new conscent
router.post('/', async (req, res) => {
	const { applicationId, move, communicate, engagement } = req.body;

	try {
		const conscent = await Conscent.create({ applicationId, move, communicate, engagement });
		res.status(201).json(conscent);
	} catch (error) {
		res.status(500).json({ message: 'Erreur lors de la création du conscent', error: error.message });
	}
});

// Get all conscent
router.get('/', async (req, res) => {
	try {
		const conscent = await Conscent.findAll();
		res.status(200).json(conscent);
	} catch (error) {
		res.status(500).json({ message: 'Erreur lors de la récupération des conscent', error: error.message });
	}
});
router.get('/application/:applicationId', async (req, res) => {
	const { applicationId } = req.params;

	try {
		const conscent = await conscent.findAll({
			where: { applicationId: applicationId }
		});

		if (conscent.length > 0) {
			res.status(200).json(conscent);
		} else {
			res.status(404).json({ message: 'Aucun détail de projet trouvé pour cette application.' });
		}
	} catch (error) {
		res.status(500).json({ message: 'Erreur lors de la récupération des détails du projet', error: error.message });
	}
});
// Get a conscent by id
router.get('/:id', async (req, res) => {
	const { id } = req.params;

	try {
		const conscent = await Conscent.findByPk(id);
		if (conscent) {
			res.status(200).json(conscent);
		} else {
			res.status(404).json({ message: 'Conscent non trouvé' });
		}
	} catch (error) {
		res.status(500).json({ message: 'Erreur lors de la récupération du conscent', error: error.message });
	}
});

// Update a conscent by id
router.put('/:id', async (req, res) => {
	const { id } = req.params;
	const { applicationId, move, communicate, engagement } = req.body;

	try {
		const conscent = await Conscent.findByPk(id);
		if (conscent) {
			conscent.applicationId = applicationId;
			conscent.move = move;
			conscent.communicate = communicate;
			conscent.engagement = engagement;
			await conscent.save();
			res.status(200).json(conscent);
		} else {
			res.status(404).json({ message: 'Conscent non trouvé' });
		}
	} catch (error) {
		res.status(500).json({ message: 'Erreur lors de la mise à jour du conscent', error: error.message });
	}
});

// Delete a conscent by id
router.delete('/:id', async (req, res) => {
	const { id } = req.params;

	try {
		const conscent = await Conscent.findByPk(id);
		if (conscent) {
			await conscent.destroy();
			res.status(204).json({ message: 'Conscent supprimé' });
		} else {
			res.status(404).json({ message: 'Conscent non trouvé' });
		}
	} catch (error) {
		res.status(500).json({ message: 'Erreur lors de la suppression du conscent', error: error.message });
	}
});

module.exports = router;
