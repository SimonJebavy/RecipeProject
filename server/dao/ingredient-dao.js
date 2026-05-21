const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const ingredientFolderPath = path.join(__dirname, "storage", "ingredientList");

// Method to read ingredient from a file
function get(ingredientId) {
    try {
        const filePath = path.join(
            ingredientFolderPath,
            `${ingredientId}.json`,
        );

        const fileData = fs.readFileSync(filePath, "utf8");

        return JSON.parse(fileData);
    } catch (error) {
        if (error.code === "ENOENT") {
            return null;
        }

        throw {
            code: "failedToReadIngredient",
            message: error.message,
        };
    }
}

// Method to create ingredient
function create(ingredient) {
    try {
        const ingredientList = list();

        // unique ingredient name check
        if (
            ingredientList.some(
                (item) =>
                    item.name.toLowerCase() === ingredient.name.toLowerCase(),
            )
        ) {
            throw {
                code: "uniqueNameAlreadyExists",
                message: "Ingredient with given name already exists",
            };
        }

        ingredient.id = crypto.randomBytes(16).toString("hex");

        const filePath = path.join(
            ingredientFolderPath,
            `${ingredient.id}.json`,
        );

        const fileData = JSON.stringify(ingredient);

        fs.writeFileSync(filePath, fileData, "utf8");

        return ingredient;
    } catch (error) {
        throw {
            code: error.code || "failedToCreateIngredient",
            message: error.message,
        };
    }
}

// Method to remove ingredient
function remove(ingredientId) {
    try {
        const filePath = path.join(
            ingredientFolderPath,
            `${ingredientId}.json`,
        );

        fs.unlinkSync(filePath);

        return {};
    } catch (error) {
        if (error.code === "ENOENT") {
            return {};
        }

        throw {
            code: "failedToRemoveIngredient",
            message: error.message,
        };
    }
}

// Method to list ingredients
function list() {
    try {
        const files = fs.readdirSync(ingredientFolderPath);

        const ingredientList = files.map((file) => {
            const fileData = fs.readFileSync(
                path.join(ingredientFolderPath, file),
                "utf8",
            );

            return JSON.parse(fileData);
        });

        return ingredientList;
    } catch (error) {
        throw {
            code: "failedToListIngredients",
            message: error.message,
        };
    }
}

// get ingredient map
function getIngredientMap() {
    const ingredientMap = {};
    const ingredientList = list();
    ingredientList.forEach((ingredient) => {
        ingredientMap[ingredient.id] = ingredient;
    });
    return ingredientMap;
}

module.exports = {
    get,
    create,    
    remove,
    list,
    getIngredientMap,
};
