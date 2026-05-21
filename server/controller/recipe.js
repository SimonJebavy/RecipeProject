const express = require('express');
const router = express.Router();

const GetAbl = require('../abl/recipe/getAbl');
const ListAbl = require('../abl/recipe/listAbl');
const CreateAbl = require('../abl/recipe/createAbl');
const DeleteAbl = require('../abl/recipe/deleteAbl');

router.get('/get', GetAbl);
router.get('/list', ListAbl);
router.post('/create', CreateAbl);
router.post('/delete', DeleteAbl);

module.exports = router;
