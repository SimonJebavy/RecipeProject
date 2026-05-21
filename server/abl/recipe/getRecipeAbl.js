const Ajv = require("ajv");
const ajv = new Ajv();

const recipeDao = require("../../dao/recipe-dao.js");
const ingredientDao = require("../../dao/ingredient-dao.js");

const schema = {
    type: "object",

    properties: {
        id: { type: "string" },
    },

    required: ["id"],
    additionalProperties: false,
};

async function GetAbl(req, res) {
    try {
        // get request query or body
        const reqParams = req.query?.id ? req.query : req.body;

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

        // get recipe
        const recipe = recipeDao.get(reqParams.id);

        if (!recipe) {
            res.status(404).json({
                code: "recipeNotFound",
                message: `Recipe with id ${reqParams.id} not found`,
            });

            return;
        }

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

module.exports = GetAbl;
