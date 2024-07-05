## Base URL

<http://localhost:3000/api/economicmodel>

## EconomicModel

## Endpoints

### Create a new EconomicModel

**URL:** `/`

**Method:** `POST`

**Description:** Crée un nouveau modèle économique.

**Request Body:**

```json
{
  "applicationId": 1,
  "revenueSources": "multiple sources",
  "jobCreation": 50,
  "economicViability": true,
  "diversificationProjects": "several projects",
  "partnerships": "various partnerships",
  "partnershipsResearch": "ongoing research",
  "stakeholderRoles": "defined roles"
}
```

**Response:**

- `201 Created`: Modèle économique créé avec succès.
- `500 Internal Server Error`: Erreur lors de la création du modèle économique.

[Back to summary](../BACK_README.md#economicModel)

### Get all EconomicModels

**URL:** `/`

**Method:** `GET`

**Description:** Récupère tous les modèles économiques.

**Response:**

- `200 OK`: Retourne une liste de tous les modèles économiques.
- `500 Internal Server Error`: Erreur lors de la récupération des modèles économiques.

[Back to summary](../BACK_README.md#economicModel)

### Get an EconomicModel by ID

**URL:** `/:id`

**Method:** `GET`

**Description:** Récupère un modèle économique par son ID.

**Response:**

- `200 OK`: Retourne le modèle économique trouvé.
- `404 Not Found`: Modèle économique non trouvé.
- `500 Internal Server Error`: Erreur lors de la récupération du modèle économique.

[Back to summary](../BACK_README.md#economicModel)

### Update an EconomicModel by ID

**URL:** `/:id`

**Method:** `PUT`

**Description:** Met à jour un modèle économique par son ID.

**Request Body:**

```json
{
  "applicationId": 1,
  "revenueSources": "updated sources",
  "jobCreation": 60,
  "economicViability": false,
  "diversificationProjects": "new projects",
  "partnerships": "updated partnerships",
  "partnershipsResearch": "new research",
  "stakeholderRoles": "new roles"
}
```

**Response:**

- `200 OK`: Modèle économique mis à jour avec succès.
- `404 Not Found`: Modèle économique non trouvé.
- `500 Internal Server Error`: Erreur lors de la mise à jour du modèle économique.

[Back to summary](../BACK_README.md#economicModel)

### Delete an EconomicModel by ID

**URL:** `/:id`

**Method:** `DELETE`

**Description:** Supprime un modèle économique par son ID.

**Response:**

- `204 No Content`: Modèle économique supprimé avec succès.
- `404 Not Found`: Modèle économique non trouvé.
- `500 Internal Server Error`: Erreur lors de la suppression du modèle économique.

[Back to summary](../BACK_README.md#economicModel)

## Examples

### Create a new EconomicModel

**Request:**

```
curl -X POST http://localhost:3000/api/economic \
  -H "Content-Type: application/json" \
  -d '{
        "applicationId": 1,
        "revenueSources": "multiple sources",
        "jobCreation": 50,
        "economicViability": true,
        "diversificationProjects": "several projects",
        "partnerships": "various partnerships",
        "partnershipsResearch": "ongoing research",
        "stakeholderRoles": "defined roles"
      }'
```

**Response:**

```json
{
  "id": 1,
  "applicationId": 1,
  "revenueSources": "multiple sources",
  "jobCreation": 50,
  "economicViability": true,
  "diversificationProjects": "several projects",
  "partnerships": "various partnerships",
  "partnershipsResearch": "ongoing research",
  "stakeholderRoles": "defined roles",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```
[Back to summary](../BACK_README.md#economicModel)

### Get all EconomicModels

**Request:**

```
curl -X GET http://localhost:3000/api/economic
```

**Response:**

```json
[
  {
    "id": 1,
    "applicationId": 1,
    "revenueSources": "multiple sources",
    "jobCreation": 50,
    "economicViability": true,
    "diversificationProjects": "several projects",
    "partnerships": "various partnerships",
    "partnershipsResearch": "ongoing research",
    "stakeholderRoles": "defined roles",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
]
```
[Back to summary](../BACK_README.md#economicModel)

### Get an EconomicModel by ID

**Request:**

```
curl -X GET http://localhost:3000/api/economic/1
```

**Response:**

```json
{
  "id": 1,
  "applicationId": 1,
  "revenueSources": "multiple sources",
  "jobCreation": 50,
  "economicViability": true,
  "diversificationProjects": "several projects",
  "partnerships": "various partnerships",
  "partnershipsResearch": "ongoing research",
  "stakeholderRoles": "defined roles",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```
[Back to summary](../BACK_README.md#economicModel)

### Update an EconomicModel by ID

**Request:**

```
curl -X PUT http://localhost:3000/api/economic/1 \
  -H "Content-Type: application/json" \
  -d '{
        "applicationId": 1,
        "revenueSources": "updated sources",
        "jobCreation": 60,
        "economicViability": false,
        "diversificationProjects": "new projects",
        "partnerships": "updated partnerships",
        "partnershipsResearch": "new research",
        "stakeholderRoles": "new roles"
      }'
```

**Response:**

```json
{
  "id": 1,
  "applicationId": 1,
  "revenueSources": "updated sources",
  "jobCreation": 60,
  "economicViability": false,
  "diversificationProjects": "new projects",
  "partnerships": "updated partnerships",
  "partnershipsResearch": "new research",
  "stakeholderRoles": "new roles",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-02T00:00:00.000Z"
}
```
[Back to summary](../BACK_README.md#economicModel)

### Delete an EconomicModel by ID

**Request:**

```
curl -X DELETE http://localhost:3000/api/economic/1
```

**Response:**

```json
{
  "message": "Modèle économique supprimé"
}
```

[Back to summary](../BACK_README.md#economicModel)