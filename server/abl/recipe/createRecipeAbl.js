const Ajv = require("ajv");
const addFormats = require("ajv-formats").default;
const ajv = new Ajv();
addFormats(ajv);

const recipeDao = require("../../dao/recipe-dao.js");
const ingredientDao = require("../../dao/ingredient-dao.js");

const schema = {
    type: "object",

    properties: {
        id: { type: "string" },
        title: { type: "string", maxLength: 50 },        
        instructions: { type: "string", maxLength: 1000 },
        ingredientIds: {
            type: "array",
            items: { type: "string" },
            minItems: 1,
            maxItems: 20,
        },
    },
    required: ["title", "instructions", "ingredientIds"],
    additionalProperties: false,
};

async function CreateAbl(req, res) {
    try {
        let recipe = req.body;

        // validate input
        const valid = ajv.validate(schema, recipe);

        if (!valid) {
            res.status(400).json({
                code: "dtoInIsNotValid",
                message: "dtoIn is not valid",
                validationError: ajv.errors,
            });

            return;
        }

        // check if all ingredientIds exist
        const missingIngredientIds = [];

        for (const ingredientId of recipe.ingredientIds) {
            const ingredient = ingredientDao.get(ingredientId);

            if (!ingredient) {
                missingIngredientIds.push(ingredientId);
            }
        }

        if (missingIngredientIds.length > 0) {
            res.status(400).json({
                code: "ingredientDoesNotExist",
                message: `These ingredient ids do not exist: ${missingIngredientIds.join(", ")}`,
            });

            return;
        }

        // store recipe
        recipe = recipeDao.create(recipe);

        // attach ingredient objects
        recipe.ingredients = recipe.ingredientIds.map((id) =>
            ingredientDao.get(id),
        );

        // return dtoOut
        res.json(recipe);
    } catch (e) {
        console.error(e);

        res.status(500).json({
            message: e.message,
        });
    }
}

module.exports = CreateAbl;
