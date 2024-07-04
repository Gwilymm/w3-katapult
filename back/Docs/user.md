## Base URL

<http://localhost:3000/api/user>

## User

## Endpoints

### Register a new User

**URL:** `/register`

**Method:** `POST`

**Description:** Enregistre un nouvel utilisateur.

**Request Body:**

```json
{
  "username": "johndoe",
  "email": "johndoe@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe"
}
```

**Response:**

- `200 OK`: Utilisateur enregistré avec succès et token JWT retourné.
- `500 Internal Server Error`: Erreur lors de l'enregistrement.

[Retour au sommaire](../BACK_README.md#user)

### User Login

**URL:** `/login`

**Method:** `POST`

**Description:** Connexion d'un utilisateur.

**Request Body:**

```json
{
  "username": "johndoe",
  "password": "password123"
}
```

**Response:**

- `200 OK`: Utilisateur connecté avec succès et token JWT retourné.
- `404 Not Found`: Utilisateur non retrouvé.
- `401 Unauthorized`: Mot de passe incorrect.
- `500 Internal Server Error`: Erreur lors de la connexion.

[Retour au sommaire](../BACK_README.md#user)

### Get User Profile

**URL:** `/user/:id`

**Method:** `GET`

**Description:** Récupère le profil d'un utilisateur par son ID.

**Response:**

- `200 OK`: Profil de l'utilisateur retourné.
- `404 Not Found`: Utilisateur non retrouvé.
- `500 Internal Server Error`: Erreur lors de la récupération du profil utilisateur.

[Retour au sommaire](../BACK_README.md#user)

### Update User Profile

**URL:** `/user/:id`

**Method:** `PUT`

**Description:** Met à jour le profil d'un utilisateur par son ID.

**Request Body:**

```json
{
  "profilePicture": "/uploads/profile.jpg",
  "address": "123 Main St",
  "siret": "123456789",
  "birthDate": "1990-01-01",
  "phoneNumber": "1234567890"
}
```

**Response:**

- `200 OK`: Profil de l'utilisateur mis à jour avec succès.
- `404 Not Found`: Utilisateur non retrouvé.
- `500 Internal Server Error`: Erreur lors de la mise à jour du profil utilisateur.

[Retour au sommaire](../BACK_README.md#user)

### Upload User Profile Picture

**URL:** `/user/:id/upload`

**Method:** `POST`

**Description:** Upload une photo de profil pour un utilisateur.

**Request:**

- `multipart/form-data` avec un champ `file` pour le fichier à uploader.

**Response:**

- `200 OK`: Photo de profil uploadée et mise à jour avec succès.
- `404 Not Found`: Utilisateur non retrouvé.
- `500 Internal Server Error`: Erreur lors de l'upload de la photo de profil.

[Retour au sommaire](../BACK_README.md#user)

### Generate User PDF

**URL:** `/user/:id/pdf`

**Method:** `GET`

**Description:** Génère un PDF pour un utilisateur.

**Response:**

- `200 OK`: PDF généré avec succès.
- `404 Not Found`: Utilisateur non retrouvé.
- `500 Internal Server Error`: Erreur lors de la génération du PDF.

[Retour au sommaire](../BACK_README.md#user)
