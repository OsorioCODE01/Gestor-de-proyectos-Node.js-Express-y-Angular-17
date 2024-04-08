const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');

const userController = require('../controllers/userController');

router.post('/registerUser', userController.createUser);

router.get('/findUserById',auth.adminAcces, userController.findUserById);

router.get('/findAllUsers',auth.adminAcces, userController.findAllUsers);

router.put('/updateUser',auth.userAccess, userController.updateUser);

router.delete('/deleteUser',auth.userAccess, userController.deleteUser);

router.put('/deleteLogicUser',auth.userAccess, userController.deleteUserLogic);

router.get('/login',auth.alreadyLogin, userController.Login);

router.get('/logout',auth.userAccess, userController.logout);

module.exports = router;