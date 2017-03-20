var modeloCartaxFecha = require('../modelo/modeloCartaxFecha');

var controlador = function(){};

controlador.mostrarCartaDeHoy = function(req, res){

	// INICIO - transformando la fecha actual a formato aceptado por MySQL
		var fechaActual = new Date();
		var dia = fechaActual.getDate();
		var mes = fechaActual.getMonth() + 1;
		var anio = fechaActual.getFullYear();
		var fechaActualMySQL = anio +"-"+ mes +"-"+ dia;
	// FIN - transformando la fecha actual a formato aceptado por MySQL

	modeloCartaxFecha.mostrarCartaDeHoy(fechaActualMySQL, function(err, registrosCartaxFecha){
		if(err){

			var datos = {
				msjTipo        : "danger",
				msj1           : "No se pudo grabar, error: " + err,
				title          : "Cuentas Delifood",
				registrosCarta : [{id_carta_x_fecha: '0000-00-00', id_alm_prog: 0, nombre_alm_prog: '', precio_alm_prog: 0, estado_carta_x_fecha: 0}]
			}

			res.render('registrar-carta-por-fecha', datos);

		} else{

			var vmsj1 = "";
			if(registrosCartaxFecha.length < 1){
				vmsj1 = "No se encontró carta para hoy.";
			}

			var datos = {
				msjTipo        : "info",
				msj1           : vmsj1,
				title          : "Cuentas Delifood",
				registrosCarta : registrosCartaxFecha
			}

			res.render('registrar-carta-por-fecha', datos);
		}
	});
}

module.exports = controlador;