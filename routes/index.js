var express = require('express');
var router = express.Router();

var controladorRegPedidoAdmin = require('../controlador/controladorRegPedidoAdmin');
var controladorAlmuerzoProg = require('../controlador/controladorAlmuerzoProg');
var controladorCartaxFecha = require('../controlador/controladorCartaxFecha');

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

router.get('/registrar-almuerzo-programado', function(req, res, next){
	var datos = {
		msjFlag : "",
		msj1    : ""
	}
	res.render('registrar-almuerzo-programado', { title: 'Cuentas Delifood', datos});
});

/*router.get('/registrar-carta-por-fecha', function(req, res, next){
	var datos = {
		msjFlag : "",
		msj1    : ""
	}
	res.render('registrar-carta-por-fecha', { title: 'Cuentas Delifood', datos});
});*/



router.post('/regPedidoAdm', controladorRegPedidoAdmin.tomarPedido);

router.post('/regAlmuerzoProgramado', controladorAlmuerzoProg.grabarAlmuerzoProg);

router.get('/registrar-carta-por-fecha', controladorCartaxFecha.mostrarCartaDeHoy, controladorAlmuerzoProg.mostrarTodosAlmuerzoProg);

module.exports = router;