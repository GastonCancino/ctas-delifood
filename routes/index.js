var express = require('express');
var router = express.Router();

var controladorPedidoAdmin = require('../controlador/controladorPedidoAdmin');
var controladorAlmuerzoProg = require('../controlador/controladorAlmuerzoProg');
var controladorCartaxFecha = require('../controlador/controladorCartaxFecha');
var controladorEntidad = require('../controlador/controladorEntidad');

/* GET home page. */

router.get('/', function(req, res, next) {
  	res.render('index', { title: 'Cuentas Delifood' });
});

router.get('/home', function(req, res, next){
	res.render('index', { title: 'Cuentas Delifood' });
});





/*router.get('/registrar-carta-por-fecha', function(req, res, next){
	var datos = {
		msjFlag : "",
		msj1    : ""
	}
	res.render('registrar-carta-por-fecha', { title: 'Cuentas Delifood', datos});
});*/

// INICIO - Página "Pedido"

/*router.get('/registrar-pedido', function(req, res, next){
	var f = new Date();
	var mes = f.getMonth()+1;
	var fechaActual = f.getDate() +"/"+ mes +"/"+ f.getFullYear();
	req.title = 'Cuentas Delifood';
	req.fechaActual = fechaActual;
	//res.render('registrar-pedido', { title: 'Cuentas Delifood', fechaActual: fechaActual }, controladorEntidad.mostrarEntidades);
});*/
router.get('/registrar-pedido', controladorEntidad.mostrarTipoEntidades);


router.post('/regPedidoAdm', controladorPedidoAdmin.tomarPedido);

// FIN - Página "Pedido"




// INICIO - Página "Almuerzo programado"

router.get('/registrar-almuerzo-programado', function(req, res, next){
	var datos = {
		msjFlag        : "",
		msj1           : "",
		nombreAlmuerzo : ""
	}
	res.render('registrar-almuerzo-programado', { title: 'Cuentas Delifood', datos});
});

router.post('/regAlmuerzoProgramado', controladorAlmuerzoProg.grabarAlmuerzoProg);

// FIN - Página "Almuerzo programado"




// INICIO - Página "Registros" - "Carta de hoy"

router.get('/registrar-carta-por-fecha', controladorCartaxFecha.mostrarCartaDeHoy, controladorAlmuerzoProg.mostrarTodosAlmuerzoProg);

router.post('/agregar-almuerzo-a-carta', controladorCartaxFecha.agregarAlmuerzoAcarta);

// definimos 2 PLACE HOLDERS "id_carta_x_fecha" y "id_alm_prog" separados con / esto le indica a express que seguido habrá un placeholder
router.get('/borrar-almuerzo-de-carta/:id_carta_x_fecha/:id_alm_prog', controladorCartaxFecha.borrarAlmuerzoDecarta);

router.get('/borrar-almuerzo-de-carta-mensaje/:mensaje/:regresar', function(req, res, next){
	var mensaje = req.params.mensaje;
	var regresar = req.params.regresar;
	res.render('borrar-almuerzo-de-carta-mensaje', { title: 'Cuentas Delifood', mensaje: mensaje, regresar: regresar });
});

// FIN - Página "Registros" - "Carta de hoy"

module.exports = router;