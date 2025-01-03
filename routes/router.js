const Express = require('express');
const router = Express.Router();
const auth = require('../controllers/authController')
const proyecto = require('../controllers/proyectController');
const monitoreo = require('../controllers/monitoreoController');

//Vistas
router.get('/', [auth.isAuthenticated, monitoreo.getData],(req, res)=>{})

router.get('/login', (req, res)=>{res.render('login', {alert: false})})

router.get('/register', [auth.isAuthenticated, proyecto.getDataRegister], (req, res)=>{})

router.get('/detalle:pedido',[auth.isAuthenticated, monitoreo.getDataView] ,(req, res) => {
    res.render('detalle', {results})
});

router.get('/pedidos', [auth.isAuthenticated, monitoreo.getDataPedidos], (req, res)=>{})


//Metodos de controller
router.post('/registerUser', auth.register)

router.post('/login', auth.login)

router.post('/registerOperacion', proyecto.newOperacion)

router.post('/actualizar_proyecto', monitoreo.updateProyecto)

router.post('/updatePedido', monitoreo.updatePedido)

router.post('/delete_proyecto', monitoreo.deleteProyecto)

router.post('/newCliente', proyecto.newCliente)

router.post('/newProducto', proyecto.newProducto)

router.post('/delete_Seleccionados', monitoreo.deleteSeleccionados)

router.get('/logout', auth.logout)

module.exports = router;