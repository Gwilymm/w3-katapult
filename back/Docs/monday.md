+++
## Base URL

<http://localhost:3000/api/monday>

## Monday.com Integration

## Endpoints

### Create a new Item

**URL:** `/create_item`

**Method:** `POST`

**Description:** Crée un nouvel item sur un board Monday.com.

**Request Body:**

```json
{
  "board_id": "1234567890",
  "column_values": "{\"status\": {\"label\": \"Done\"}}"
}
```

**Response:**

- `201 Created`: Item créé avec succès sur le board Monday.com.
- `400 Bad Request`: `column_values` est requis et doit être une chaîne de caractères.
- `500 Internal Server Error`: Erreur lors de la création de l'item.

[Retour au sommaire](../BACK_README.md#mondaycom-integration)

### Internal Functions

#### Get Last Item ID

**Function:** `getLastItemId`

**Description:** Obtient le dernier ID d'item sur un board Monday.com.

**Parameters:**

- `boardId`: L'ID du board à interroger.

**Returns:**

- `lastItemId`: Le dernier ID d'item sur le board.

[Retour au sommaire](../BACK_README.md#mondaycom-integration)

### Update an Item

**URL:** `/update_item`

**Method:** `POST`

**Description:** Met à jour un champ d'un item sur un board Monday.com.

**Request Body:**

```json
{
  "board_id": "1234567890",
  "item_name": "Example Item",
  "column_id": "status",
  "value": "{\"label\": \"Done\"}"
}
```

**Response:**

- `200 OK`: Item mis à jour avec succès sur le board Monday.com.
- `400 Bad Request`: `board_id`, `item_name`, `column_id` et `value` sont requis.
- `404 Not Found`: Item non trouvé.
- `500 Internal Server Error`: Erreur lors de la mise à jour de l'item.

[Retour au sommaire](../BACK_README.md#mondaycom-integration)

### Internal Functions

#### Get Item ID

**Function:** `getItemId`

**Description:** Obtient l'ID de l'item basé sur le nom de l'item sur un board Monday.com.

**Parameters:**

- `boardId`: L'ID du board à interroger.
- `itemName`: Le nom de l'item à rechercher.

**Returns:**

- `itemId`: L'ID de l'item correspondant, ou `null` si non trouvé.

[Retour au sommaire](../BACK_README.md#mondaycom-integration)
