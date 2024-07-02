const express = require('express');
const axios = require('axios');
const router = express.Router();

const MONDAY_API_URL = 'https://api.monday.com/v2';
const MONDAY_API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjM3OTMzNzQ1NCwiYWFpIjoxMSwidWlkIjo2MjkyMjE1NCwiaWFkIjoiMjAyNC0wNy0wMlQwODo1OTozNC41NjNaIiwicGVyIjoibWU6d3JpdGUiLCJhY3RpZCI6MjQyMjk0NzYsInJnbiI6ImV1YzEifQ.kdG6KdOjz9XhO3J4aOz89m1wMd_rAND25BwkM0vTiHY';  // Remplacez par votre clé API
// Fonction pour obtenir l'ID de l'item basé sur le nom de l'item
const getItemId = async (boardId, itemName) => {
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
		boardId: [ boardId ],  // Assurez-vous que boardId est un tableau contenant des chaînes
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
			const item = items.find(i => i.name === itemName);
			return item ? item.id : null;
		} else {
			return null;
		}
	} catch (error) {
		console.error('Erreur lors de la récupération des items : ', error.message);
		throw error;
	}
};

// Route pour mettre à jour un champ d'un item
router.post('/update_item', async (req, res) => {
	try {
		const { board_id, item_name, column_id, value } = req.body;

		// Vérification que tous les paramètres sont définis
		if (!board_id || !item_name || !column_id || !value) {
			return res.status(400).send('board_id, item_name, column_id et value sont requis.');
		}

		// Obtenir l'ID de l'item basé sur le nom de l'item
		const item_id = await getItemId(board_id, item_name);
		if (!item_id) {
			return res.status(404).send('Item non trouvé.');
		}

		const query = `
	    mutation ($boardId: ID!, $itemId: ID!, $columnId: String!, $value: JSON!) {
		 change_column_value (
		   board_id: $boardId,
		   item_id: $itemId,
		   column_id: $columnId,
		   value: $value
		 ) {
		   id
		   name
		 }
	    }
	  `;

		const variables = {
			boardId: board_id,
			itemId: item_id,
			columnId: column_id,
			value: JSON.stringify(value)  // Convert to JSON string
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

		if (response.data.errors) {
			console.error('Erreur lors de la mise à jour de l\'item : ', response.data.errors);
			return res.status(500).send('Erreur lors de la mise à jour de l\'item.');
		}

		res.status(200).json(response.data);
	} catch (error) {
		console.error('Erreur lors de la mise à jour de l\'item : ', error.message);
		res.status(500).send('Erreur lors de la mise à jour de l\'item : ' + error.message);
	}
});

module.exports = router;