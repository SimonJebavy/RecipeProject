const express = require('express');
const router = express.Router();

const ListAbl = require('../abl/ingredient/listAbl');
const CreateAbl = require('../abl/ingredient/createAbl');
const DeleteAbl = require('../abl/ingredient/deleteAbl');

router.get('/list', ListAbl);
router.post('/create', CreateAbl);
router.post('/delete', DeleteAbl);

module.exports = router;
