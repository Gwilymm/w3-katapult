const express = require('express');
const db = require('../models');

const router = express.Router();

// Route to create a new application
router.post('/', async (req, res) => {
	const { userId, applicationYear } = req.body;
	try {
		const application = await db.Application.create({ userId, applicationYear });
		console.log(application);
		res.status(200).json(application);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

// Route to get an application by userId
router.get('/:userId', async (req, res) => {
	const { userId } = req.params;
	try {
		const application = await db.Application.findOne({ where: { userId } });
		if (application) {
			res.status(200).json(application);
		} else {
			res.status(404).json({ message: 'Application not found' });
		}
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

module.exports = router;
