+++
## Base URL

<http://localhost:3000/api/application>

## Application

## Endpoints

### Create a new Application

**URL:** `/`

**Method:** `POST`

**Description:** Crée une nouvelle application.

**Request Body:**

```json
{
  "userId": 1,
  "applicationYear": 2024
}
```

**Response:**

- `200 OK`: Application créée avec succès.
- `500 Internal Server Error`: Erreur lors de la création de l'application.

[Retour au sommaire](../BACK_README.md#application)

### Get an Application by userId

**URL:** `/:userId`

**Method:** `GET`

**Description:** Récupère une application par userId.

**Response:**

- `200 OK`: Application retournée avec succès.
- `404 Not Found`: Application non trouvée.
- `500 Internal Server Error`: Erreur lors de la récupération de l'application.

[Retour au sommaire](../BACK_README.md#application)
+++