const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const recipeFolderPath = path.join(__dirname, "storage", "recipeList");

// Method to read a recipe from a file
function get(recipeId) {
    try {
        const filePath = path.join(recipeFolderPath, `${recipeId}.json`);
        const fileData = fs.readFileSync(filePath, "utf8");
        return JSON.parse(fileData);
    } catch (error) {
        if (error.code === "ENOENT") {
            return null;
        }
        throw {
            code: "failedToReadRecipe",
            message: error.message,
        };
    }
}

// Method to write a recipe to a file
function create(recipe) {
    try {
        recipe.id = crypto.randomBytes(16).toString("hex");

        const filePath = path.join(recipeFolderPath, `${recipe.id}.json`);
        const fileData = JSON.stringify(recipe);

        fs.writeFileSync(filePath, fileData, "utf8");

        return recipe;
    } catch (error) {
        throw {
            code: "failedToCreateRecipe",
            message: error.message,
        };
    }
}

// Method to remove recipe from a file
function remove(recipeId) {
    try {
        const filePath = path.join(recipeFolderPath, `${recipeId}.json`);

        fs.unlinkSync(filePath);

        return {};
    } catch (error) {
        if (error.code === "ENOENT") {
            return {};
        }

        throw {
            code: "failedToRemoveRecipe",
            message: error.message,
        };
    }
}

// Method to list recipes
function list() {
    try {
        const files = fs.readdirSync(recipeFolderPath);

        const recipeList = files.map((file) => {
            const fileData = fs.readFileSync(
                path.join(recipeFolderPath, file),
                "utf8",
            );

            return JSON.parse(fileData);
        });

        return recipeList;
    } catch (error) {
        throw {
            code: "failedToListRecipes",
            message: error.message,
        };
    }
}

//Method to list recipes by igredients that are included or excluded
function listByIngredientId(
    includeIngredientIds = [],
    excludeIngredientIds = [],
) {
    const recipeList = list();

    return recipeList.filter((recipe) => {
        const recipeIngredientIds = recipe.ingredientIds || [];

        // recipe must include all required ingredients
        const containsAllIncluded = includeIngredientIds.every((ingredientId) =>
            recipeIngredientIds.includes(ingredientId),
        );

        // recipe must not include all excluded ingredients
        const containsExcluded = excludeIngredientIds.some((ingredientId) =>
            recipeIngredientIds.includes(ingredientId),
        );

        return containsAllIncluded && !containsExcluded;
    });
}

module.exports = {
    get,
    create,
    remove,
    list,
    listByIngredientId,
};
