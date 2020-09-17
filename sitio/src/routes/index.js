// ======> MODULOS <======= //

var express = require('express');
var router = express.Router();

// ======> MIDDLEWARES <======= //

const cookieCheck = require('../middlewares/cookieCheck');

// ======> CONTROLADORES <======= //

const controller = require('../controllers/mainController'); //requiero el controlador para que se haga cargo de la lógica

// ======> RUTAS <======= //

router.get('/', cookieCheck,controller.index);


module.exports = router;