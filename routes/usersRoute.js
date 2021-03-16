const express = require('express');
const { getUsers, addUser, getSpecificUser, deleteUser, updateUser } = require('../controllers/usersController')
const router = express.Router();

router.get('/get-users', getUsers);
router.post('/add-user', addUser);
router.get('/get-specific-user/:user_id', getSpecificUser);
router.delete('/delete-user/:user_id', deleteUser);
router.put('/update-user/:user_id', updateUser);


module.exports = router;