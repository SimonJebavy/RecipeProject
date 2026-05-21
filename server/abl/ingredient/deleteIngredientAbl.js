const Ajv = require("ajv");
const ajv = new Ajv();

const ingredientDao = require("../../dao/ingredient-dao.js");
const recipeDao = require("../../dao/recipe-dao.js");

const schema = {
    type: "object",

    properties: {
        id: { type: "string" },
    },

    required: ["id"],
    additionalProperties: false,
};

async function DeleteAbl(req, res) {
    try {
        const reqParams = req.body;

        // validate input
        const valid = ajv.validate(schema, reqParams);

        if (!valid) {
            res.status(400).json({
                code: "dtoInIsNotValid",
                message: "dtoIn is not valid",
                validationError: ajv.errors,
            });

            return;
        }

        // check if ingredient exists
        const ingredient = ingredientDao.get(reqParams.id);

        if (!ingredient) {
            res.status(404).json({
                code: "ingredientNotFound",
                message: `Ingredient with id ${reqParams.id} not found`,
            });

            return;
        }

        // check if ingredient is used in any recipe
        const recipeList = recipeDao.list();

        const recipesWithIngredient = recipeList.filter((recipe) =>
            recipe.ingredientIds.includes(reqParams.id),
        );

        if (recipesWithIngredient.length > 0) {
            res.status(400).json({
                code: "ingredientUsedInRecipes",
                message: "Ingredient is used in recipes and cannot be deleted",
            });

            return;
        }

        // remove ingredient from persistent storage
        ingredientDao.remove(reqParams.id);

        // return dtoOut
        res.json({});
    } catch (e) {
        console.error(e);

        res.status(500).json({
            message: e.message,
        });
    }
}

module.exports = DeleteAbl;
