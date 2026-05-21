const Ajv = require("ajv");
const ajv = new Ajv();

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
        // get request body
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

        // check if recipe exists
        const recipe = recipeDao.get(reqParams.id);

        if (!recipe) {
            res.status(400).json({
                code: "recipeDoesNotExist",
                message: `Recipe with id ${reqParams.id} does not exist`,
            });

            return;
        }

        // remove recipe from persistent storage
        recipeDao.remove(reqParams.id);

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
