+++
## Base URL

<http://localhost:3000/api/projectteam>

## ProjectTeam

## Endpoints

### Create a new ProjectTeam

**URL:** `/`

**Method:** `POST`

**Description:** Crée un nouveau membre de l'équipe de projet.

**Request Body:**

```json
{
  "applicationId": 1,
  "name": "John",
  "surname": "Doe",
  "email": "john.doe@example.com",
  "phone": "1234567890"
}
```

**Response:**

- `201 Created`: Membre de l'équipe de projet créé avec succès.
- `500 Internal Server Error`: Erreur lors de la création du membre de l'équipe de projet.

[Retour au sommaire](../BACK_README.md#projectteam)

### Get all ProjectTeams

**URL:** `/`

**Method:** `GET`

**Description:** Récupère tous les membres de l'équipe de projet.

**Response:**

- `200 OK`: Retourne une liste de tous les membres de l'équipe de projet.
- `500 Internal Server Error`: Erreur lors de la récupération des membres de l'équipe de projet.

[Retour au sommaire](../BACK_README.md#projectteam)

### Get ProjectTeam by ID

**URL:** `/:id`

**Method:** `GET`

**Description:** Récupère un membre de l'équipe de projet par son ID.

**Response:**

- `200 OK`: Retourne le membre de l'équipe de projet trouvé.
- `404 Not Found`: Membre de l'équipe de projet non trouvé.
- `500 Internal Server Error`: Erreur lors de la récupération du membre de l'équipe de projet.

[Retour au sommaire](../BACK_README.md#projectteam)

### Update ProjectTeam by ID

**URL:** `/:id`

**Method:** `PUT`

**Description:** Met à jour un membre de l'équipe de projet par son ID.

**Request Body:**

```json
{
  "applicationId": 1,
  "name": "John",
  "surname": "Doe",
  "email": "john.doe@example.com",
  "phone": "0987654321"
}
```

**Response:**

- `200 OK`: Membre de l'équipe de projet mis à jour avec succès.
- `404 Not Found`: Membre de l'équipe de projet non trouvé.
- `500 Internal Server Error`: Erreur lors de la mise à jour du membre de l'équipe de projet.

[Retour au sommaire](../BACK_README.md#projectteam)

### Delete ProjectTeam by ID

**URL:** `/:id`

**Method:** `DELETE`

**Description:** Supprime un membre de l'équipe de projet par son ID.

**Response:**

- `204 No Content`: Membre de l'équipe de projet supprimé avec succès.
- `404 Not Found`: Membre de l'équipe de projet non trouvé.
- `500 Internal Server Error`: Erreur lors de la suppression du membre de l'équipe de projet.

[Retour au sommaire](../BACK_README.md#projectteam)

## Examples

### Create a new ProjectTeam

**Request:**

```
curl -X POST http://localhost:3000/api/projectteam \
  -H "Content-Type: application/json" \
  -d '{
        "applicationId": 1,
        "name": "John",
        "surname": "Doe",
        "email": "john.doe@example.com",
        "phone": "1234567890"
      }'
```

**Response:**

```json
{
  "id": 1,
  "applicationId": 1,
  "name": "John",
  "surname": "Doe",
  "email": "john.doe@example.com",
  "phone": "1234567890",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

[Retour au sommaire](../BACK_README.md#projectteam)

### Get all ProjectTeams

**Request:**

```
curl -X GET http://localhost:3000/api/projectteam
```

**Response:**

```json
[
  {
    "id": 1,
    "applicationId": 1,
    "name": "John",
    "surname": "Doe",
    "email": "john.doe@example.com",
    "phone": "1234567890",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
]
```

[Retour au sommaire](../BACK_README.md#projectteam)

### Get ProjectTeam by ID

**Request:**

```
curl -X GET http://localhost:3000/api/projectteam/1
```

**Response:**

```json
{
  "id": 1,
  "applicationId": 1,
  "name": "John",
  "surname": "Doe",
  "email": "john.doe@example.com",
  "phone": "1234567890",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

[Retour au sommaire](../BACK_README.md#projectteam)

### Update ProjectTeam by ID

**Request:**

```
curl -X PUT http://localhost:3000/api/projectteam/1 \
  -H "Content-Type: application/json" \
  -d '{
        "applicationId": 1,
        "name": "John",
        "surname": "Doe",
        "email": "john.doe@example.com",
        "phone": "0987654321"
      }'
```

**Response:**

```json
{
  "id": 1,
  "applicationId": 1,
  "name": "John",
  "surname": "Doe",
  "email": "john.doe@example.com",
  "phone": "0987654321",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-02T00:00:00.000Z"
}
```

[Retour au sommaire](../BACK_README.md#projectteam)

### Delete ProjectTeam by ID

**Request:**

```
curl -X DELETE http://localhost:3000/api/projectteam/1
```

**Response:**

```json
{
  "message": "Membre de l'équipe de projet supprimé"
}
```

[Retour au sommaire](../BACK_README.md#projectteam)
