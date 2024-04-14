const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const proyectController = require('../controllers/proyectController');

router.post('/createProyect',auth.userAccess, proyectController.createProyect);
router.get('/getProyects',auth.adminAcces, proyectController.getProyects);
router.get('/getOwnerProyects',auth.userAccess, proyectController.getOwnerProyects);
router.put('/updateProyect', auth.userAccess, proyectController.editProyect);
router.delete('/deleteProyect', auth.userAccess, proyectController.deleteProyect);

//?Rutas para Columnas y Actividades

router.put('/addColumn', proyectController.addColumn);
router.put('/editColumn', proyectController.editColumn);
router.delete('/deleteColumn', proyectController.deleteColumn);

router.put('/addActivity', proyectController.addActivity);
router.put('/editActivity', proyectController.editActivity);
router.delete('/deleteActivity', proyectController.deleteActivity);

router.put('/MoveColumn', proyectController.moveColumn);
router.put('/MoveActivity', proyectController.moveActivity);

router.put('/ActToOtherCol', proyectController.moveActivityToColumn);

module.exports = router;

