## Base URL

<http://localhost:3000/api/legalstructures>

## LegalStructures

## Endpoints

### Create a new LegalStructure

**URL:** `/`

**Method:** `POST`

**Description:** Crée une nouvelle structure juridique.

**Request Body:**

```json
{
  "name": "Example Legal Structure",
  "type": "LLC",
  "description": "Description of the legal structure"
}
```

**Response:**

- `201 Created`: Structure juridique créée avec succès.
- `400 Bad Request`: Erreur lors de la création de la structure juridique.

[Retour au sommaire](../BACK_README.md#legalstructures)

### Get all LegalStructures

**URL:** `/`

**Method:** `GET`

**Description:** Récupère toutes les structures juridiques.

**Response:**

- `200 OK`: Retourne une liste de toutes les structures juridiques.
- `400 Bad Request`: Erreur lors de la récupération des structures juridiques.

[Retour au sommaire](../BACK_README.md#legalstructures)

### Get a LegalStructure by ID

**URL:** `/:id`

**Method:** `GET`

**Description:** Récupère une structure juridique par son ID.

**Response:**

- `200 OK`: Structure juridique retournée avec succès.
- `404 Not Found`: Structure juridique non trouvée.
- `400 Bad Request`: Erreur lors de la récupération de la structure juridique.

[Retour au sommaire](../BACK_README.md#legalstructures)

### Update a LegalStructure

**URL:** `/:id`

**Method:** `PUT`

**Description:** Met à jour une structure juridique par son ID.

**Request Body:**

```json
{
  "name": "Updated Legal Structure",
  "type": "Corporation",
  "description": "Updated description of the legal structure"
}
```

**Response:**

- `200 OK`: Structure juridique mise à jour avec succès.
- `404 Not Found`: Structure juridique non trouvée.
- `400 Bad Request`: Erreur lors de la mise à jour de la structure juridique.

[Retour au sommaire](../BACK_README.md#legalstructures)

### Delete a LegalStructure

**URL:** `/:id`

**Method:** `DELETE`

**Description:** Supprime une structure juridique par son ID.

**Response:**

- `204 No Content`: Structure juridique supprimée avec succès.
- `404 Not Found`: Structure juridique non trouvée.
- `400 Bad Request`: Erreur lors de la suppression de la structure juridique.

[Retour au sommaire](../BACK_README.md#legalstructures)
