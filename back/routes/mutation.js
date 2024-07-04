const express = require('express');
const axios = require('axios');
const router = express.Router();

const MONDAY_API_URL = 'https://api.monday.com/v2';
const MONDAY_API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjM3OTMzNzQ1NCwiYWFpIjoxMSwidWlkIjo2MjkyMjE1NCwiaWFkIjoiMjAyNC0wNy0wMlQwODo1OTozNC41NjNaIiwicGVyIjoibWU6d3JpdGUiLCJhY3RpZCI6MjQyMjk0NzYsInJnbiI6ImV1YzEifQ.kdG6KdOjz9XhO3J4aOz89m1wMd_rAND25BwkM0vTiHY';  // Remplacez par votre clé API
// Fonction pour obtenir le dernier ID d'item sur le board
const getLastItemId = async (boardId) => {
	const query = `
	  query ($boardId: [ID!]) {
	    boards(ids: $boardId) {
		 items_page(limit: 100) {
		   items {
			id
			name
		   }
		 }
	    }
	  }
	`;
	const variables = {
		boardId: boardId,
	};

	try {
		const response = await axios.post(MONDAY_API_URL, {
			query: query,
			variables: variables
		}, {
			headers: {
				'Content-Type': 'application/json',
				'Authorization': MONDAY_API_KEY,
			},
		});

		if (response.data.errors) {
			console.error('Erreur lors de la récupération des items : ', response.data.errors);
			throw new Error('Erreur lors de la récupération des items.');
		}

		const boards = response.data.data.boards;
		if (boards.length > 0) {
			const items = boards[ 0 ].items_page.items;
			if (items.length > 0) {
				const lastItem = items.reduce((prev, current) => (parseInt(prev.id) > parseInt(current.id)) ? prev : current);
				const lastItemId = parseInt(lastItem.name.replace('Nouveau Client ', ''));
				return isNaN(lastItemId) ? 0 : lastItemId;
			} else {
				return 0;
			}
		} else {
			return 0;
		}
	} catch (error) {
		console.error('Erreur lors de la récupération des items : ', error.message);
		throw error;
	}
};

// Route pour gérer la mutation create_item
router.post('/create_item', async (req, res) => {
	try {
		const { board_id, column_values } = req.body;

		// Vérification que column_values est défini et est une chaîne de caractères
		if (!column_values || typeof column_values !== 'string') {
			return res.status(400).send('column_values est requis et doit être une chaîne de caractères.');
		}

		// Obtenir le dernier ID d'item et générer le nouvel ID
		const lastItemId = await getLastItemId(board_id);
		const newItemId = lastItemId + 1;
		const item_name = `${newItemId}`;

		const query = `
	    mutation ($boardId: ID!, $itemName: String!, $columnValues: JSON!) {
		 create_item (
		   board_id: $boardId,
		   item_name: $itemName,
		   column_values: $columnValues
		 ) {
		   id
		   name
		 }
	    }
	  `;

		const variables = {
			boardId: board_id,
			itemName: item_name,
			columnValues: column_values
		};

		const response = await axios.post(MONDAY_API_URL, {
			query: query,
			variables: variables
		}, {
			headers: {
				'Content-Type': 'application/json',
				'Authorization': MONDAY_API_KEY,
			},
		});

		res.status(201).json(response.data);
	} catch (error) {
		console.error('Erreur lors de la création de l\'item : ', error.message);
		res.status(500).send('Erreur lors de la création de l\'item : ' + error.message);
	}
});

module.exports = router;