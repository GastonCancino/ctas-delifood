var express = require('express');
var router = express.Router();

var controladorPedidoAdmin = require('../controlador/controladorPedidoAdmin');
var controladorAlmuerzoProg = require('../controlador/controladorAlmuerzoProg');
var controladorCartaxFecha = require('../controlador/controladorCartaxFecha');
var controladorEntidad = require('../controlador/controladorEntidad');
var controladorTipoComida = require('../controlador/controladorTipoComida');
var controladorExportToExcelView = require('../controlador/controladorExportToExcelView');
var controladorExportToExcel = require('../controlador/controladorExportToExcel');

/* GET home page. */

router.get('/', function(req, res, next) {
  	res.render('index', { title: 'Cuentas Delifood' });
});

router.get('/home', function(req, res, next){
	res.render('index', { title: 'Cuentas Delifood' });
});






// INICIO - Página "Pedido"

/*router.get('/registrar-pedido', function(req, res, next){
	var f = new Date();
	var mes = f.getMonth()+1;
	var fechaActual = f.getDate() +"/"+ mes +"/"+ f.getFullYear();
	req.title = 'Cuentas Delifood';
	req.fechaActual = fechaActual;
	//res.render('registrar-pedido', { title: 'Cuentas Delifood', fechaActual: fechaActual }, controladorEntidad.mostrarEntidades);
});*/
router.get('/registrar-pedido', controladorPedidoAdmin.mostrarCartaDeHoy, controladorEntidad.mostrarTipoEntidades, controladorEntidad.mostrarEntidadesFiltradas);

router.post('/regPedidoAdm', controladorPedidoAdmin.tomarPedido);

// FIN - Página "Pedido"




// INICIO - Página Menú "Registros" - "Almuerzo programado"

router.get('/registrar-almuerzo-programado', controladorTipoComida.mostrarTipoComida);

router.post('/regAlmuerzoProgramado', controladorAlmuerzoProg.grabarAlmuerzoProg, controladorTipoComida.mostrarTipoComida);

// FIN - Página Menú "Registros" - "Almuerzo programado"




// INICIO - Página Menú "Registros" - "Carta de hoy"

router.get('/registrar-carta-por-fecha', controladorCartaxFecha.mostrarCartaDeHoy, controladorAlmuerzoProg.mostrarTodosAlmuerzoProg);

router.post('/agregar-almuerzo-a-carta', controladorCartaxFecha.agregarAlmuerzoAcarta);

// definimos 2 PLACE HOLDERS "id_carta_x_fecha" y "id_alm_prog" separados con / esto le indica a express que seguido habrá un placeholder
router.get('/borrar-almuerzo-de-carta/:id_carta_x_fecha/:id_alm_prog', controladorCartaxFecha.borrarAlmuerzoDecarta);

router.get('/borrar-almuerzo-de-carta-mensaje/:mensaje/:regresar', function(req, res, next){
	var mensaje = req.params.mensaje;
	var regresar = req.params.regresar;
	res.render('borrar-almuerzo-de-carta-mensaje', { title: 'Cuentas Delifood', mensaje: mensaje, regresar: regresar });
});

// FIN - Página Menú "Registros" - "Carta de hoy"


// INICIO - Página Menú "Reportes" - "Pedidos"
router.get('/exportar-excel-view-filtros', controladorExportToExcelView.vistaFiltros);

router.post('/exportToExcel', controladorExportToExcel.exportarExcel)
// FIN - Página Menú "Reportes" - "Pedidos"


module.exports = router;