var express = require('express');
var router = express.Router();

var controladorPedidoAdmin = require('../controlador/controladorPedidoAdmin');
var controladorAlmuerzoProg = require('../controlador/controladorAlmuerzoProg');
var controladorAlmuerzoProg2 = require('../controlador/controladorAlmuerzoProg2');
var controladorCartaxFecha = require('../controlador/controladorCartaxFecha');
var controladorEntidad = require('../controlador/controladorEntidad');
var controladorTipoComida = require('../controlador/controladorTipoComida');
var controladorReportesFiltros = require('../controlador/controladorReportesFiltros');
var controladorReportePedidosXLSX = require('../controlador/controladorReportePedidosXLSX');
var controladorReporteMasVotadosXLSX = require('../controlador/controladorReporteMasVotadosXLSX');

/* GET home page. */

router.get('/', function(req, res, next) {
  	res.render('index', { title: 'Cuentas Delifood' });
});

router.get('/home', function(req, res, next){
	res.render('index', { title: 'Cuentas Delifood' });
});

router.get('/prueba', function(req, res, next){
	/*var miAuto = new Object();
	miAuto.marca = "Ford";
	miAuto.modelo = "Mustang";
	miAuto.anio = 1969;

	console.log(miAuto);*/

	var meses = new Object();
	var meses = {"0": "Nada", "01": "Enero", "02": "Febrero", "03": "Marzo", "04": "Abril", "05": "Mayo", "06": "Junio", "07": "Julio", "08": "Agosto", "09": "Septiembre", "10": "Octubre", "11": "Noviembre", "12": "Diciembre"};
	console.log(meses["03"]);

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





// INICIO - Página Menú "Registros" - "Platos" (se registra en la tabla almuerzo programado y se muestran los registros de la misma)

router.get('/registrar-plato', controladorTipoComida.mostrarTipoComida, controladorAlmuerzoProg2.mostrarTodosAlmuerzoProg);

router.post('/regAlmuerzoProgramado', controladorAlmuerzoProg.grabarAlmuerzoProg);

router.get('/borrar-plato-de-tabla-maestra/:id_alm_prog', controladorAlmuerzoProg.borrarAlmuerzoProg);

// definimos 2 PLACE HOLDERS "mensaje" y "regresar" separados con / esto le indica a express que seguido habrá otro placeholder
router.get('/borrar-plato-de-tabla-maestra-mensaje/:mensaje/:regresar', function(req, res, next){
	var mensaje = req.params.mensaje;
	var regresar = req.params.regresar;
	res.render('borrar-plato-de-tabla-maestra-mensaje', { title: 'Cuentas Delifood', mensaje: mensaje, regresar: regresar});
});

// FIN - Página Menú "Registros" - "Platos" (se registra en la tabla almuerzo programado y se muestran los registros de la misma)





// INICIO - Página Menú "Registros" - "Entidad"
router.get('/registrar-entidad', controladorEntidad.mostrarTipoEntidades2, controladorEntidad.mostrarEntidades);

router.post('/regEntidad', controladorEntidad.grabarEntidad, controladorEntidad.mostrarTipoEntidades2, controladorEntidad.mostrarEntidades);

router.get('/borrar-entidad-de-tabla-maestra/:id_ent/:id_tipo_ent', controladorEntidad.borrarEntidad, controladorEntidad.mostrarTipoEntidades2, controladorEntidad.mostrarEntidades);
// FIN - Página Menú "Registros" - "Entidad"





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





// INICIO - Página Menú "Consultas" - "Carta por fecha"

router.get('/consulta-carta-por-fecha', controladorCartaxFecha.mostrarCartaPorFecha);

router.post('/consulta-carta-por-fecha', controladorCartaxFecha.mostrarCartaPorFecha);

// FIN - Página Menú "Consultas" - "Carta por fecha"





// INICIO - Página Menú "Reportes" - "Reporte de Pedidos"
router.get('/reporte-pedidos-filtros', controladorReportesFiltros.vistaPedidosFiltros);

router.post('/reportePedidosExportToExcel', controladorReportePedidosXLSX.exportarExcel);
// FIN - Página Menú "Reportes" - "Reporte de Pedidos"



// INICIO - Página Menú "Reportes" - "Reporte de Los platos más Votados"
router.get('/reporte-los-mas-votados-filtros', controladorReportesFiltros.vistaMasVotadosFiltros);

router.post('/reporteLosMasVotadosExportToExcel', controladorReporteMasVotadosXLSX.exportarExcel);
// FIN - Página Menú "Reportes" - "Reporte de Los platos más Votados"


module.exports = router;