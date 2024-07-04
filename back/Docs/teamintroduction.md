+++
## Base URL

<http://localhost:3000/api/teamintroduction>

## TeamIntroduction

## Endpoints

### Create a new TeamIntroduction

**URL:** `/`

**Method:** `POST`

**Description:** Crée une nouvelle introduction de l'équipe.

**Request Body:**

```json
{
  "applicationId": 1,
  "teamIntroduction": "Présentation de l'équipe",
  "entrepreneurialExperience": "Expérience entrepreneuriale",
  "inspirationalEntrepreneur": "Entrepreneur inspirant",
  "missingSkills": "Compétences manquantes",
  "incubationParticipation": "Participation à une incubation",
  "professionalSituation": "Situation professionnelle",
  "incubationSchedule": "Calendrier de l'incubation"
}
```

**Response:**

- `201 Created`: Introduction de l'équipe créée avec succès.
- `500 Internal Server Error`: Erreur lors de la création de l'introduction de l'équipe.

[Retour au sommaire](../BACK_README.md#teamintroduction)

### Get all TeamIntroductions

**URL:** `/`

**Method:** `GET`

**Description:** Récupère toutes les introductions de l'équipe.

**Response:**

- `200 OK`: Retourne une liste de toutes les introductions de l'équipe.
- `500 Internal Server Error`: Erreur lors de la récupération des introductions de l'équipe.

[Retour au sommaire](../BACK_README.md#teamintroduction)

### Get TeamIntroduction by ID

**URL:** `/:id`

**Method:** `GET`

**Description:** Récupère une introduction de l'équipe par son ID.

**Response:**

- `200 OK`: Retourne l'introduction de l'équipe trouvée.
- `404 Not Found`: Introduction de l'équipe non trouvée.
- `500 Internal Server Error`: Erreur lors de la récupération de l'introduction de l'équipe.

[Retour au sommaire](../BACK_README.md#teamintroduction)

### Update TeamIntroduction by ID

**URL:** `/:id`

**Method:** `PUT`

**Description:** Met à jour une introduction de l'équipe par son ID.

**Request Body:**

```json
{
  "applicationId": 1,
  "teamIntroduction": "Présentation de l'équipe mise à jour",
  "entrepreneurialExperience": "Expérience entrepreneuriale mise à jour",
  "inspirationalEntrepreneur": "Entrepreneur inspirant mis à jour",
  "missingSkills": "Compétences manquantes mises à jour",
  "incubationParticipation": "Participation à une incubation mise à jour",
  "professionalSituation": "Situation professionnelle mise à jour",
  "incubationSchedule": "Calendrier de l'incubation mis à jour"
}
```

**Response:**

- `200 OK`: Introduction de l'équipe mise à jour avec succès.
- `404 Not Found`: Introduction de l'équipe non trouvée.
- `500 Internal Server Error`: Erreur lors de la mise à jour de l'introduction de l'équipe.

[Retour au sommaire](../BACK_README.md#teamintroduction)

### Delete TeamIntroduction by ID

**URL:** `/:id`

**Method:** `DELETE`

**Description:** Supprime une introduction de l'équipe par son ID.

**Response:**

- `204 No Content`: Introduction de l'équipe supprimée avec succès.
- `404 Not Found`: Introduction de l'équipe non trouvée.
- `500 Internal Server Error`: Erreur lors de la suppression de l'introduction de l'équipe.

[Retour au sommaire](../BACK_README.md#teamintroduction)

## Examples

### Create a new TeamIntroduction

**Request:**

```
curl -X POST http://localhost:3000/api/teamintroduction \
  -H "Content-Type: application/json" \
  -d '{
        "applicationId": 1,
        "teamIntroduction": "Présentation de l'équipe",
        "entrepreneurialExperience": "Expérience entrepreneuriale",
        "inspirationalEntrepreneur": "Entrepreneur inspirant",
        "missingSkills": "Compétences manquantes",
        "incubationParticipation": "Participation à une incubation",
        "professionalSituation": "Situation professionnelle",
        "incubationSchedule": "Calendrier de l'incubation"
      }'
```

**Response:**

```json
{
  "id": 1,
  "applicationId": 1,
  "teamIntroduction": "Présentation de l'équipe",
  "entrepreneurialExperience": "Expérience entrepreneuriale",
  "inspirationalEntrepreneur": "Entrepreneur inspirant",
  "missingSkills": "Compétences manquantes",
  "incubationParticipation": "Participation à une incubation",
  "professionalSituation": "Situation professionnelle",
  "incubationSchedule": "Calendrier de l'incubation",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

[Retour au sommaire](../BACK_README.md#teamintroduction)

### Get all TeamIntroductions

**Request:**

```
curl -X GET http://localhost:3000/api/teamintroduction
```

**Response:**

```json
[
  {
    "id": 1,
    "applicationId": 1,
    "teamIntroduction": "Présentation de l'équipe",
    "entrepreneurialExperience": "Expérience entrepreneuriale",
    "inspirationalEntrepreneur": "Entrepreneur inspirant",
    "missingSkills": "Compétences manquantes",
    "incubationParticipation": "Participation à une incubation",
    "professionalSituation": "Situation professionnelle",
    "incubationSchedule": "Calendrier de l'incubation",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
]
```

[Retour au sommaire](../BACK_README.md#teamintroduction)

### Get TeamIntroduction by ID

**Request:**

```
curl -X GET http://localhost:3000/api/teamintroduction/1
```

**Response:**

```json
{
  "id": 1,
  "applicationId": 1,
  "teamIntroduction": "Présentation de l'équipe",
  "entrepreneurialExperience": "Expérience entrepreneuriale",
  "inspirationalEntrepreneur": "Entrepreneur inspirant",
  "missingSkills": "Compétences manquantes",
  "incubationParticipation": "Participation à une incubation",
  "professionalSituation": "Situation professionnelle",
  "incubationSchedule": "Calendrier de l'incubation",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

[Retour au sommaire](../BACK_README.md#teamintroduction)

### Update TeamIntroduction by ID

**Request:**

```
curl -X PUT http://localhost:3000/api/teamintroduction/1 \
  -H "Content-Type: application/json" \
  -d '{
        "applicationId": 1,
        "teamIntroduction": "Présentation de l'équipe mise à jour",
        "entrepreneurialExperience": "Expérience entrepreneuriale mise à jour",
        "inspirationalEntrepreneur": "Entrepreneur inspirant mis à jour",
        "missingSkills": "Compétences manquantes mises à jour",
        "incubationParticipation": "Participation à une incubation mise à jour",
        "professionalSituation": "Situation professionnelle mise à jour",
        "incubationSchedule": "Calendrier de l'incubation mis à jour"
      }'
```

**Response:**

```json
{
  "id": 1,
  "applicationId": 1,
  "teamIntroduction": "Présentation de l'équipe mise à jour",
  "entrepreneurialExperience": "Expérience entrepreneuriale mise à jour",
  "inspirationalEntrepreneur": "Entrepreneur inspirant mis à jour",
  "missingSkills": "Compétences manquantes mises à jour",
  "incubationParticipation": "Participation à une incubation mise à jour",
  "professionalSituation": "Situation professionnelle mise à jour",
  "incubationSchedule": "Calendrier de l'incubation mis à jour",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-02T00:00:00.000Z"
}
```

[Retour au sommaire](../BACK_README.md#teamintroduction)

### Delete TeamIntroduction by ID

**Request:**

```
curl -X DELETE http://localhost:3000/api/teamintroduction/1
```

**Response:**

```json
{
  "message": "Introduction de l'équipe supprimée"
}
```

[Retour au sommaire](../BACK_README.md#teamintroduction)
+++