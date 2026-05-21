const recipeDao = require('../../dao/recipe-dao');
const ingredientDao = require('../../dao/ingredient-dao');

function ListAbl(req, res) {
    try {
        const ingredientIds = req.query.ingredientIds
            ? req.query.ingredientIds.split(',')
            : [];

        const recipeList = ingredientIds.length
            ? recipeDao.listByIngredientId(ingredientIds)
            : recipeDao.list();

        const result = recipeList.map((recipe) => ({
            ...recipe,
            ingredients: recipe.ingredientIds.map((id) => ingredientDao.get(id)),
        }));

        res.json({ itemList: result });
    } catch (error) {
        res.status(500).json({
            code: 'failedToListRecipes',
            message: error.message,
        });
    }
}

module.exports = ListAbl;
