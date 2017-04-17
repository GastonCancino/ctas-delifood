var modeloEntidad = require('../modelo/modeloEntidad');

var controlador = function(){};



// INICIO ------------------------------------ para página Menú Pedido (registrar-pedido.ejs) ------------------------------------

controlador.mostrarTipoEntidades = function(req, res, next){
	var f = new Date();
	var mes = f.getMonth()+1;
	var vfechaActual = f.getDate() +"/"+ mes +"/"+ f.getFullYear();

	modeloEntidad.mostrarTipoEntidad(function(err, registrosTipoEntidades){
		if(err){
			var datos = {
				msjTipo                   : "danger",
				msj1                      : 'No se pudieron mostrar los tipos de entidad, error: ' + err,
				msj2                      : req.vmsj2, 
				title                     : 'Cuentas Delifood',
				fechaActual               : vfechaActual,
				registrosAllTipoEntidades : [],
				vTipoEntidad              : '',
				registrosFilEntidades     : [],
				registrosCartaDeHoy       : req.vregistrosCartaDeHoy
			}

			var vmsj1 = 'No se pudieron mostrar los tipos de entidad, error: ' + err;
			req.vmsj1 = vmsj1;
			req.vfechaActual = vfechaActual;
			res.render('registrar-pedido', datos);

		} else{

			var vmsj1 = "";
			if(registrosTipoEntidades < 1){
				vmsj1 = "No se encontraron tipos de entidades.";
			}
			var datos = {
				msjTipo                   : "info",
				msj1                      : vmsj1,
				msj2                      : req.vmsj2, 
				title                     : 'Cuentas Delifood',
				fechaActual               : vfechaActual,
				registrosAllTipoEntidades : registrosTipoEntidades,
				vTipoEntidad              : '',
				registrosFilEntidades     : [],
				registrosCartaDeHoy       : req.vregistrosCartaDeHoy
			}

			
			req.vmsj1 = vmsj1;
			req.vfechaActual = vfechaActual;
			req.txtTipoEntidad = req.query.txtTipoEntidad;  // req.query por que se usa GET
			req.registrosAllTipoEntidades = registrosTipoEntidades;

			next();
			//res.render('registrar-pedido', datos);

		}
		
	});
}

controlador.mostrarEntidadesFiltradas = function(req, res){

	var vTipoEntidad = req.txtTipoEntidad;

	if(vTipoEntidad == 0 || vTipoEntidad == undefined){

		var datos = {
			msjTipo                   : "info",
			msj1                      : 'Para mostrar las Personas/Empresas debe seleccionar un tipo de Entidad.',
			msj2                      : req.vmsj2, 
			title                     : 'Cuentas Delifood',
			fechaActual               : req.vfechaActual,
			registrosAllTipoEntidades : req.registrosAllTipoEntidades,
			vTipoEntidad              : vTipoEntidad,
			registrosFilEntidades     : [],
			registrosCartaDeHoy       : req.vregistrosCartaDeHoy
		}

		res.render('registrar-pedido', datos);

	} else{


		modeloEntidad.mostrarEntidadesFiltradas(vTipoEntidad, function(err, registrosEntidades){
			if(err){

				var datos = {
					msjTipo                   : "danger",
					msj1                      : 'No se pudieron mostrar las entidades, error: ' + err,
					msj2                      : req.vmsj2, 
					title                     : 'Cuentas Delifood',
					fechaActual               : req.vfechaActual,
					registrosAllTipoEntidades : req.registrosAllTipoEntidades,
					vTipoEntidad              : vTipoEntidad,
					registrosFilEntidades     : [],
					registrosCartaDeHoy       : req.vregistrosCartaDeHoy
				}

				res.render('registrar-pedido', datos);

			} else{

				var vmsj1 = '';
				if(registrosEntidades.length < 1){
					var vmsj1 = 'No se encontraron entidades.';
				}
				var datos = {
					msjTipo                   : "info",
					msj1                      : vmsj1,
					msj2                      : req.vmsj2, 
					title                     : 'Cuentas Delifood',
					fechaActual               : req.vfechaActual,
					registrosAllTipoEntidades : req.registrosAllTipoEntidades,
					vTipoEntidad              : vTipoEntidad,
					registrosFilEntidades     : registrosEntidades,
					registrosCartaDeHoy       : req.vregistrosCartaDeHoy
				}

				// antes de hacer el middleware hacia controladorPedidoAdmin.mostrarCartaDeHoy
				res.render('registrar-pedido', datos);

				// pasando al middleware las entidades hacia controladorPedidoAdmin.mostrarCartaDeHoy
				//req.vregistrosEntidades = registrosEntidades;
				//req.vTipoEntidad        = vTipoEntidad;
				//next();

			}
		});
	}

}

// FIN ------------------------------------ para página Menú Pedido (registrar-pedido.ejs) ------------------------------------

module.exports = controlador;