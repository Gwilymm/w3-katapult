## Base URL

<http://localhost:3000/api/projectmembers>

## ProjectMembers

## Endpoints

### Create a new ProjectMember

**URL:** `/`

**Method:** `POST`

**Description:** Crée un nouveau membre de projet.

**Request Body:**

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "phoneNumber": "1234567890",
  "projectId": 1
}
```

**Response:**

- `201 Created`: Membre de projet créé avec succès.
- `400 Bad Request`: Erreur lors de la création du membre de projet.

[Retour au sommaire](../BACK_README.md#projectmembers)

### Get all ProjectMembers

**URL:** `/`

**Method:** `GET`

**Description:** Récupère tous les membres de projet.

**Response:**

- `200 OK`: Retourne une liste de tous les membres de projet.
- `400 Bad Request`: Erreur lors de la récupération des membres de projet.

[Retour au sommaire](../BACK_README.md#projectmembers)

### Get a ProjectMember by ID

**URL:** `/:id`

**Method:** `GET`

**Description:** Récupère un membre de projet par son ID.

**Response:**

- `200 OK`: Membre de projet retourné avec succès.
- `404 Not Found`: Membre de projet non trouvé.
- `400 Bad Request`: Erreur lors de la récupération du membre de projet.

[Retour au sommaire](../BACK_README.md#projectmembers)

### Update a ProjectMember

**URL:** `/:id`

**Method:** `PUT`

**Description:** Met à jour un membre de projet par son ID.

**Request Body:**

```json
{
  "firstName": "Jane",
  "lastName": "Smith",
  "email": "jane.smith@example.com",
  "phoneNumber": "0987654321",
  "projectId": 1
}
```

**Response:**

- `200 OK`: Membre de projet mis à jour avec succès.
- `404 Not Found`: Membre de projet non trouvé.
- `400 Bad Request`: Erreur lors de la mise à jour du membre de projet.

[Retour au sommaire](../BACK_README.md#projectmembers)

### Delete a ProjectMember

**URL:** `/:id`

**Method:** `DELETE`

**Description:** Supprime un membre de projet par son ID.

**Response:**

- `204 No Content`: Membre de projet supprimé avec succès.
- `404 Not Found`: Membre de projet non trouvé.
- `400 Bad Request`: Erreur lors de la suppression du membre de projet.

[Retour au sommaire](../BACK_README.md#projectmembers)
