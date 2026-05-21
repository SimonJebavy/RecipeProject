const express = require("express");
const router = express.Router();

const ListAbl = require("../abl/ingredient/listIngredientAbl");
const CreateAbl = require("../abl/ingredient/createIngredientAbl");
const DeleteAbl = require("../abl/ingredient/deleteIngredientAbl");

router.get("/list", ListAbl);
router.post("/create", CreateAbl);
router.post("/delete", DeleteAbl);

module.exports = router;
