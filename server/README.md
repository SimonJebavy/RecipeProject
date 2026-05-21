# Recipe Book Backend

Express backend for the Recipe Book application. Data is stored as JSON files under `dao/storage`.

## Requirements

- Node.js
- npm

## Setup

Install dependencies:

```bash
npm install
```

Start the backend:

```bash
npm start
```

The backend runs on:

```bash
http://localhost:8888
```

## Data Storage

Ingredients are stored in:

```text
dao/storage/ingredientList
```

Recipes are stored in:

```text
dao/storage/recipeList
```

Recipes reference ingredients by `ingredientIds`.

## Ingredient API

### List Ingredients

```http
GET /ingredient/list
```

Response:

```json
{
  "itemList": [
    {
      "id": "ingredient-id",
      "name": "Tomato"
    }
  ]
}
```

### Create Ingredient

```http
POST /ingredient/create
```

Request:

```json
{
  "name": "Tomato"
}
```

### Delete Ingredient

```http
POST /ingredient/delete
```

Request:

```json
{
  "id": "ingredient-id"
}
```

An ingredient cannot be deleted while it is used by a recipe.

## Recipe API

### List Recipes

```http
GET /recipe/list
```

Optional ingredient filter:

```http
GET /recipe/list?ingredientIds=id1,id2
```

### Get Recipe Detail

```http
GET /recipe/get?id=recipe-id
```

### Create Recipe

```http
POST /recipe/create
```

Request:

```json
{
  "title": "Tomato pasta",
  "instructions": "Cook pasta. Prepare tomato sauce. Mix together.",
  "ingredientIds": ["ingredient-id"]
}
```

### Delete Recipe

```http
POST /recipe/delete
```

Request:

```json
{
  "id": "recipe-id"
}
```
