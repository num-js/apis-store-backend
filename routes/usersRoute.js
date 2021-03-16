const express = require('express');
const { getUsers, addUser, getSpecificUser } = require('../controllers/usersController')
const router = express.Router();

router.get('/get-users', getUsers);
router.post('/add-user', addUser);
router.get('/get-specific-user/:user_id', getSpecificUser);


module.exports = router;