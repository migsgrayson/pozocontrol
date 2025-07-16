const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Routes
router.get('/', userController.view);
router.post('/', userController.find);
router.get('/agregar', userController.form);
router.post('/agregar', userController.create);
router.get('/edituser/:id', userController.edit);
router.post('/edituser/:id', userController.update);
router.get('/search', userController.search);
router.get('/pozo/:id', userController.viewall);
router.get('/deleteuser/:id',userController.delete);
  
module.exports = router;
