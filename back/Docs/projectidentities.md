## Base URL

<http://localhost:3000/api/projectidentities>

## ProjectIdentities

## Endpoints

### Create a new ProjectIdentity

**URL:** `/`

**Method:** `POST`

**Description:** Crée une nouvelle identité de projet.

**Request Body:**

```json
{
  "name": "Project Name",
  "description": "Project Description",
  "status": "Active"
}
```

**Response:**

- `201 Created`: Identité de projet créée avec succès.
- `400 Bad Request`: Erreur lors de la création de l'identité de projet.

[Retour au sommaire](../BACK_README.md#projectidentities)

### Get all ProjectIdentities

**URL:** `/`

**Method:** `GET`

**Description:** Récupère toutes les identités de projet.

**Response:**

- `200 OK`: Retourne une liste de toutes les identités de projet.
- `400 Bad Request`: Erreur lors de la récupération des identités de projet.

[Retour au sommaire](../BACK_README.md#projectidentities)

### Get a ProjectIdentity by ID

**URL:** `/:id`

**Method:** `GET`

**Description:** Récupère une identité de projet par son ID.

**Response:**

- `200 OK`: Identité de projet retournée avec succès.
- `404 Not Found`: Identité de projet non trouvée.
- `400 Bad Request`: Erreur lors de la récupération de l'identité de projet.

[Retour au sommaire](../BACK_README.md#projectidentities)

### Update a ProjectIdentity

**URL:** `/:id`

**Method:** `PUT`

**Description:** Met à jour une identité de projet par son ID.

**Request Body:**

```json
{
  "name": "Updated Project Name",
  "description": "Updated Project Description",
  "status": "Inactive"
}
```

**Response:**

- `200 OK`: Identité de projet mise à jour avec succès.
- `404 Not Found`: Identité de projet non trouvée.
- `400 Bad Request`: Erreur lors de la mise à jour de l'identité de projet.

[Retour au sommaire](../BACK_README.md#projectidentities)

### Delete a ProjectIdentity

**URL:** `/:id`

**Method:** `DELETE`

**Description:** Supprime une identité de projet par son ID.

**Response:**

- `204 No Content`: Identité de projet supprimée avec succès.
- `404 Not Found`: Identité de projet non trouvée.
- `400 Bad Request`: Erreur lors de la suppression de l'identité de projet.

[Retour au sommaire](../BACK_README.md#projectidentities)