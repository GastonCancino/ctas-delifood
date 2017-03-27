var modeloEntidad = require('../modelo/modeloEntidad');

var controlador = function(){};

controlador.mostrarTipoEntidades = function(req, res){
	var f = new Date();
	var mes = f.getMonth()+1;
	var vfechaActual = f.getDate() +"/"+ mes +"/"+ f.getFullYear();

	modeloEntidad.mostrarTipoEntidad(function(err, registrosTipoEntidades){
		if(err){
			var datos = {
				msjTipo                   : "danger",
				msj1                      : 'No se pudieron mostrar las entidades, error: ' + err,
				msj2                      : '', 
				title                     : 'Cuentas Delifood',
				fechaActual               : vfechaActual,
				registrosAllTipoEntidades : []
			}

			res.render('registrar-pedido', datos);

		} else{

			var vmsj1 = "";
			if(registrosTipoEntidades < 1){
				vmsj1 = "No se encontraron entidades.";
			}
			var datos = {
				msjTipo                   : "info",
				msj1                      : vmsj1,
				msj2                      : '', 
				title                     : 'Cuentas Delifood',
				fechaActual               : vfechaActual,
				registrosAllTipoEntidades : registrosTipoEntidades
			}

			res.render('registrar-pedido', datos);
			//next();

		}
		
	});
}

module.exports = controlador;