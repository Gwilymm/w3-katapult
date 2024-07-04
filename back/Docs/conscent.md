
## Base URL

<http://localhost:3000/api/conscent>

## Conscent

## Endpoints

### Create a new Conscent

**URL:** `/`

**Method:** `POST`

**Description:** Crée un nouveau conscent.

**Request Body:**

```json
{
  "applicationId": 1,
  "move": true,
  "communicate": true,
  "engagement": true
}
```

Response:

201 Created : Conscent créé avec succès.
500 Internal Server Error : Erreur lors de la création du conscent.

[Retour au sommaire](../BACK_README.md#conscent)

### Get all Conscent

**URL: /**

**Method: GET**

**Description: Récupère tous les conscent.**

Response:

200 OK : Retourne une liste de tous les conscent.
500 Internal Server Error : Erreur lors de la récupération des conscent.

[Retour au sommaire](../BACK_README.md#conscent)

### Get a Conscent by ID

**URL: /:id**

**Method: GET**

**Description: Récupère un conscent par son ID.**

Response:

200 OK : Retourne le conscent trouvé.
404 Not Found : Conscent non trouvé.
500 Internal Server Error : Erreur lors de la récupération du conscent.

[Retour au sommaire](../BACK_README.md#conscent)

### Update a Conscent by ID

**URL: /:id**

**Method: PUT**

**Description: Met à jour un conscent par son ID.**

Request Body:

```json
Copier le code
{
  "applicationId": 1,
  "move": true,
  "communicate": true,
  "engagement": true
}
```

Response:

200 OK : Conscent mis à jour avec succès.
404 Not Found : Conscent non trouvé.
500 Internal Server Error : Erreur lors de la mise à jour du conscent.

[Retour au sommaire](../BACK_README.md#conscent)

### Delete a Conscent by ID

**URL: /:id**

**Method: DELETE**

**Description: Supprime un conscent par son ID.**

Response:

204 No Content : Conscent supprimé avec succès.
404 Not Found : Conscent non trouvé.
500 Internal Server Error : Erreur lors de la suppression du conscent.

[Retour au sommaire](../BACK_README.md#conscent)

## Examples

### Create a new Conscent

Request:

```
curl -X POST http://localhost:3000/api/conscent \
  -H "Content-Type: application/json" \
  -d '{
        "applicationId": 1,
        "move": true,
        "communicate": true,
        "engagement": true
      }'
```

Response:

```json
Copier le code
{
  "id": 1,
  "applicationId": 1,
  "move": true,
  "communicate": true,
  "engagement": true,
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```
[Retour au sommaire](../BACK_README.md#conscent)

### Get all Conscent

Request:

```
curl -X GET <http://localhost:3000/api/conscent>
```

Response:

```json
[
  {
    "id": 1,
    "applicationId": 1,
    "move": true,
    "communicate": true,
    "engagement": true,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
]
```
[Retour au sommaire](../BACK_README.md#conscent)

### Get a Conscent by ID

Request:

```
curl -X GET <http://localhost:3000/api/conscent/1>
```

Response:

```json
Copier le code
{
  "id": 1,
  "applicationId": 1,
  "move": true,
  "communicate": true,
  "engagement": true,
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```
[Retour au sommaire](../BACK_README.md#conscent)

### Update a Conscent by ID

Request:

```
curl -X PUT <http://localhost:3000/api/conscent/1> \
  -H "Content-Type: application/json" \
  -d '{
        "applicationId": 1,
        "move": false,
        "communicate": true,
        "engagement": false
      }'
```

Response:

```json
{
  "id": 1,
  "applicationId": 1,
  "move": false,
  "communicate": true,
  "engagement": false,
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-02T00:00:00.000Z"
}
```
[Retour au sommaire](../BACK_README.md#conscent)

### Delete a Conscent by ID

Request:

```
curl -X DELETE <http://localhost:3000/api/conscent/1>
```

Response:

```json
{
  "message": "Conscent supprimé"
}
```
[Retour au sommaire](../BACK_README.md#conscent)
