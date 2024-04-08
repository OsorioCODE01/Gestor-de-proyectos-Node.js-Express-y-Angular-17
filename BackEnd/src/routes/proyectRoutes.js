const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const proyectController = require('../controllers/proyectController');

router.post('/createProyect',auth.userAccess, proyectController.createProyect);
router.get('/getProyects',auth.adminAcces, proyectController.getProyects);
router.get('/getOwnerProyects',auth.userAccess, proyectController.getOwnerProyects);
router.put('/updateProyect', auth.userAccess, proyectController.editProyect);
router.delete('/deleteProyect', auth.userAccess, proyectController.deleteProyect);

module.exports = router;

