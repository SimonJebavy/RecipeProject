const express = require('express');

const ingredientController = require('./controller/ingredient');
const recipeController = require('./controller/recipe');

const app = express();
const port = 8888;

app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        name: 'Recipe backend API',
        functionalities: [
            'create ingredient',
            'create recipe',
            'list recipes by ingredients',
            'recipe detail',
            'delete recipe',
        ],
    });
});

app.use('/ingredient', ingredientController);
app.use('/recipe', recipeController);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
