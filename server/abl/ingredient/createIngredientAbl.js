const Ajv = require("ajv");
const ajv = new Ajv();

const ingredientDao = require("../../dao/ingredient-dao");

const schema = {
    type: "object",
    properties: {
        name: { type: "string", maxLength: 50 }        
    },
    required: ["name"],
    additionalProperties: false,
};

const validate = ajv.compile(schema);

function CreateAbl(req, res) {
    try {
        const ingredient = req.body;

        // validate input
        const valid = validate(ingredient);

        if (!valid) {
            return res.status(400).json({
                code: "dtoInIsNotValid",
                message: "dtoIn is not valid",
                validationError: validate.errors,
            });
        }

        // trim name
        ingredient.name = ingredient.name.trim();

        // create ingredient
        const createdIngredient = ingredientDao.create(ingredient);

        // return dtoOut
        res.json(createdIngredient);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: error.message,
        });
    }
}

module.exports = CreateAbl;
