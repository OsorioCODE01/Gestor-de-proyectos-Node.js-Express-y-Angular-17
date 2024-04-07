const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

router.post('/registerUser', userController.createUser);
router.get('/findUserById', userController.findUserById);
router.get('/findAllUsers', userController.findAllUsers);
router.put('/updateUser', userController.updateUser);
router.delete('/deleteUser', userController.deleteUser);
router.put('/deleteLogicUser', userController.deleteUserLogic);
router.get('/login', userController.Login);

module.exports = router;