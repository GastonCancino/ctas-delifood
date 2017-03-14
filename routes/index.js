var express = require('express');
var router = express.Router();

var controladorRegPedidoAdmin = require('../controlador/controladorRegPedidoAdmin');

/* GET home page. */

router.get('/', function(req, res, next) {
  	res.render('index', { title: 'Cuentas Delifood' });
});

router.get('/home', function(req, res, next){
	res.render('index', { title: 'Cuentas Delifood' });
});

router.get('/registrar-pedido', function(req, res, next){
	var f = new Date();
	var mes = f.getMonth()+1;
	var fechaActual = f.getDate() +"/"+ mes +"/"+ f.getFullYear();
	res.render('registrar-pedido', { title: 'Cuentas Delifood', fechaActual: fechaActual });
});


router.post('/grabaPedidoAdm', controladorRegPedidoAdmin.tomarPedido);

module.exports = router;