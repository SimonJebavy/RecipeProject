# Recipe Book Frontend

React frontend for the Recipe Book application. The app lets users manage ingredients, create recipes from existing ingredients, filter recipes by included/excluded ingredients, and open recipe details in a modal.

## Requirements

- Node.js
- npm
- Backend running on `http://localhost:8888`

## Setup

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm start
```

The frontend runs on:

```bash
http://localhost:3000
```

API calls are proxied to the backend through the `proxy` setting in `package.json`.

## Available Pages

- `/` - recipes page
- `/ingredients` - ingredients page

## Main Features

- List recipes
- Open recipe detail in a popup
- Create recipe
- Delete recipe
- Filter recipes by ingredients that must be included
- Filter recipes by ingredients that must not be included
- List ingredients
- Create ingredient
- Delete ingredient

## Scripts

```bash
npm start
```

Runs the app in development mode.

```bash
npm run build
```

Builds the app for production.

```bash
npm test
```

Runs the test runner.
