const Express = require('express');
const router = Express.Router();
const sql = require('mssql');

const auth = require('../controllers/authController')
const proyecto = require('../controllers/proyectController');
const monitoreo = require('../controllers/monitoreoController');

//Vistas
router.get('/', [auth.isAuthenticated, monitoreo.getData],(req, res)=>{ 
    res.render('index', {results: results})
})

router.get('/login', (req, res)=>{
    res.render('login', {alert: false})
})

router.get('/register', [auth.isAuthenticated, proyecto.getDataRegister], (req, res)=>{
    res.render('register', { results })
})

router.get('/registerUser', (req, res)=>{
    res.render('nuevo_usuario')
})

router.get('/view?idPedido', [auth.isAuthenticated,monitoreo.getDataView], (req, res) =>{
    res.render('view',{results})
})



//Metodos de controller
router.post('/registerUser', auth.register)

router.post('/login', auth.login)

router.post('/registerOperacion', proyecto.newOperacion)

router.post('/actualizar_proyecto', monitoreo.updateProyecto)

router.post('/delete_proyecto', monitoreo.deleteProyecto)

//router.post('/visualizar_pedido')


router.get('/logout', auth.logout)







module.exports = router;