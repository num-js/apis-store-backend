const express = require('express');
const { getUsers } = require('../controllers/usersController')
const router = express.Router();

router.get('/get-users', getUsers);


module.exports = router;