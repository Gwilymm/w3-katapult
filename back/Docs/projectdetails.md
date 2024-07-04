+++
## Base URL

<http://localhost:3000/api/projectdetails>

## ProjectDetails

## Endpoints

### Create a new ProjectDetails

**URL:** `/`

**Method:** `POST`

**Description:** Crée un nouveau détail de projet.

**Request Body:**

```json
{
  "applicationId": 1,
  "genesis": "Origine du projet",
  "summary": "Résumé du projet",
  "problemAddressed": "Problème adressé",
  "beneficiaries": "Bénéficiaires du projet",
  "offer": "Offre proposée",
  "differentiation": "Différenciation",
  "socialImpactIndicators": "Indicateurs d'impact social"
}
```

**Response:**

- `201 Created`: Détails du projet créés avec succès.
- `500 Internal Server Error`: Erreur lors de la création des détails du projet.

[Retour au sommaire](../BACK_README.md#projectdetail)

### Get all ProjectDetails

**URL:** `/`

**Method:** `GET`

**Description:** Récupère tous les détails du projet.

**Response:**

- `200 OK`: Retourne une liste de tous les détails du projet.
- `500 Internal Server Error`: Erreur lors de la récupération des détails du projet.

[Retour au sommaire](../BACK_README.md#projectdetail)

### Get ProjectDetails by ID

**URL:** `/:id`

**Method:** `GET`

**Description:** Récupère les détails d'un projet par son ID.

**Response:**

- `200 OK`: Retourne les détails du projet trouvé.
- `404 Not Found`: Détails du projet non trouvés.
- `500 Internal Server Error`: Erreur lors de la récupération des détails du projet.

[Retour au sommaire](../BACK_README.md#projectdetail)

### Update ProjectDetails by ID

**URL:** `/:id`

**Method:** `PUT`

**Description:** Met à jour les détails d'un projet par son ID.

**Request Body:**

```json
{
  "applicationId": 1,
  "genesis": "Origine du projet",
  "summary": "Résumé mis à jour du projet",
  "problemAddressed": "Problème adressé mis à jour",
  "beneficiaries": "Bénéficiaires du projet mis à jour",
  "offer": "Offre proposée mise à jour",
  "differentiation": "Différenciation mise à jour",
  "socialImpactIndicators": "Indicateurs d'impact social mis à jour"
}
```

**Response:**

- `200 OK`: Détails du projet mis à jour avec succès.
- `404 Not Found`: Détails du projet non trouvés.
- `500 Internal Server Error`: Erreur lors de la mise à jour des détails du projet.

[Retour au sommaire](../BACK_README.md#projectdetail)

### Delete ProjectDetails by ID

**URL:** `/:id`

**Method:** `DELETE`

**Description:** Supprime les détails d'un projet par son ID.

**Response:**

- `204 No Content`: Détails du projet supprimés avec succès.
- `404 Not Found`: Détails du projet non trouvés.
- `500 Internal Server Error`: Erreur lors de la suppression des détails du projet.

[Retour au sommaire](../BACK_README.md#projectdetail)

## Examples

### Create a new ProjectDetails

**Request:**

```
curl -X POST http://localhost:3000/api/projectdetails \
  -H "Content-Type: application/json" \
  -d '{
        "applicationId": 1,
        "genesis": "Origine du projet",
        "summary": "Résumé du projet",
        "problemAddressed": "Problème adressé",
        "beneficiaries": "Bénéficiaires du projet",
        "offer": "Offre proposée",
        "differentiation": "Différenciation",
        "socialImpactIndicators": "Indicateurs d'impact social"
      }'
```

**Response:**

```json
{
  "id": 1,
  "applicationId": 1,
  "genesis": "Origine du projet",
  "summary": "Résumé du projet",
  "problemAddressed": "Problème adressé",
  "beneficiaries": "Bénéficiaires du projet",
  "offer": "Offre proposée",
  "differentiation": "Différenciation",
  "socialImpactIndicators": "Indicateurs d'impact social",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

[Retour au sommaire](../BACK_README.md#projectdetail)

### Get all ProjectDetails

**Request:**

```
curl -X GET http://localhost:3000/api/projectdetails
```

**Response:**

```json
[
  {
    "id": 1,
    "applicationId": 1,
    "genesis": "Origine du projet",
    "summary": "Résumé du projet",
    "problemAddressed": "Problème adressé",
    "beneficiaries": "Bénéficiaires du projet",
    "offer": "Offre proposée",
    "differentiation": "Différenciation",
    "socialImpactIndicators": "Indicateurs d'impact social",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
]
```

[Retour au sommaire](../BACK_README.md#projectdetail)

### Get ProjectDetails by ID

**Request:**

```
curl -X GET http://localhost:3000/api/projectdetails/1
```

**Response:**

```json
{
  "id": 1,
  "applicationId": 1,
  "genesis": "Origine du projet",
  "summary": "Résumé du projet",
  "problemAddressed": "Problème adressé",
  "beneficiaries": "Bénéficiaires du projet",
  "offer": "Offre proposée",
  "differentiation": "Différenciation",
  "socialImpactIndicators": "Indicateurs d'impact social",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

[Retour au sommaire](../BACK_README.md#projectdetail)

### Update ProjectDetails by ID

**Request:**

```
curl -X PUT http://localhost:3000/api/projectdetails/1 \
  -H "Content-Type: application/json" \
  -d '{
        "applicationId": 1,
        "genesis": "Origine du projet",
        "summary": "Résumé mis à jour du projet",
        "problemAddressed": "Problème adressé mis à jour",
        "beneficiaries": "Bénéficiaires du projet mis à jour",
        "offer": "Offre proposée mise à jour",
        "differentiation": "Différenciation mise à jour",
        "socialImpactIndicators": "Indicateurs d'impact social mis à jour"
      }'
```

**Response:**

```json
{
  "id": 1,
  "applicationId": 1,
  "genesis": "Origine du projet",
  "summary": "Résumé mis à jour du projet",
  "problemAddressed": "Problème adressé mis à jour",
  "beneficiaries": "Bénéficiaires du projet mis à jour",
  "offer": "Offre proposée mise à jour",
  "differentiation": "Différenciation mise à jour",
  "socialImpactIndicators": "Indicateurs d'impact social mis à jour",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-02T00:00:00.000Z"
}
```

[Retour au sommaire](../BACK_README.md#projectdetail)

### Delete ProjectDetails by ID

**Request:**

```
curl -X DELETE http://localhost:3000/api/projectdetails/1
```

**Response:**

```json
{
  "message": "Détails du projet supprimés"
}
```

[Retour au sommaire](../BACK_README.md#projectdetail)
+++