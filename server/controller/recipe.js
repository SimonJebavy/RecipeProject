const express = require("express");
const router = express.Router();

const ListAbl = require("../abl/recipe/listRecipeAbl");
const CreateAbl = require("../abl/recipe/createRecipeAbl");
const DeleteAbl = require("../abl/recipe/deleteRecipeAbl");

router.get("/list", ListAbl);
router.post("/create", CreateAbl);
router.post("/delete", DeleteAbl);

module.exports = router;
