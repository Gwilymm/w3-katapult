const express = require('express');
const axios = require('axios');
const router = express.Router();

const MONDAY_API_URL = 'https://api.monday.com/v2';
const MONDAY_API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjM4MDc4NTg5NywiYWFpIjoxMSwidWlkIjo2MjkyMjE1NCwiaWFkIjoiMjAyNC0wNy0wNVQxMDo0NTozNi41MTdaIiwicGVyIjoibWU6d3JpdGUiLCJhY3RpZCI6MjQyMjk0NzYsInJnbiI6ImV1YzEifQ.kv6PYomiVBxhPyhDvWQciwxTRmeT1dskd3muRvBtMKE';  // Remplacez par votre clé API

// Fonction pour obtenir l'ID de l'item basé sur le nom de l'item
const getItemId = async (boardId, itemName) => {
	const query = `
        query ($boardId: [ID!]) {
            boards(ids: $boardId) {
                items_page(limit: 100) {
                    items {
                        id
                        name
				    column_values {
          				id
          				text
        				}
                    }
                }
            }
        }
    `;
	const variables = { boardId: [ boardId ] };

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
			// get item by mail and return id
			console.log('items', items);
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
		const { board_id, item_id, column_values } = req.body;
		console.log('req.body', req.body);

		const columnValuesString = JSON.stringify(column_values);
		console.log("mes couilles");
		const query = `
	    mutation ($boardId: ID!, $itemId: ID!, $columnValues: JSON!) {
		 change_multiple_column_values (
		   board_id: $boardId,
		   item_id: $itemId,
		   column_values: $columnValues
		 ) {
		   id
		   name
		 }
	    }
	  `;
		const variables = {
			boardId: board_id,
			itemId: item_id,
			columnValues: columnValuesString  // Convert to JSON string without double quotes
		};

		console.log('variables', variables);


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