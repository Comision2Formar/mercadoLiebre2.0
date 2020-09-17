// ======> MODULOS <======= //

const express = require('express'); //requiero express
const router = express.Router(); //requiero el método Router

// ======> CONTROLADORES <======= //

const controller = require('../controllers/productsController') //requiero el controlador que se hará cargo de la lógica


// ======> MIDDLEWARES <======= //

const sessionUserCheck = require('../middlewares/sessionUserCheck');
const multerProduct = require('../middlewares/multerProduct');



// ======> RUTAS <======= //

router.get('/', controller.listar) //construyo la ruta que me visualizará información de prueba
router.get('/search',controller.search);
router.get('/detail/:id',controller.detalle);

router.get('/add',sessionUserCheck,controller.agregar);
router.get('/add/form',sessionUserCheck,controller.agregar);
router.post('/add/form',multerProduct.any(),sessionUserCheck,controller.publicar);

router.get('/show/:id',sessionUserCheck,controller.show);
router.put('/edit/:id',multerProduct.any(),sessionUserCheck,controller.actualizar);
router.delete('/delete/:id',sessionUserCheck,controller.eliminar);

module.exports = router //exporto router