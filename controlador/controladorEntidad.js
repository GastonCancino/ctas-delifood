var modeloEntidad = require('../modelo/modeloEntidad');

var controlador = function(){};

controlador.mostrarTipoEntidades = function(req, res, next){
	var f = new Date();
	var mes = f.getMonth()+1;
	var vfechaActual = f.getDate() +"/"+ mes +"/"+ f.getFullYear();

	modeloEntidad.mostrarTipoEntidad(function(err, registrosTipoEntidades){
		if(err){
			var datos = {
				msjTipo                   : "danger",
				msj1                      : 'No se pudieron mostrar los tipos de entidad, error: ' + err,
				msj2                      : '', 
				title                     : 'Cuentas Delifood',
				fechaActual               : vfechaActual,
				registrosAllTipoEntidades : [],
				vlstTipoPedido            : '',
				registrosFilEntidades     : []
			}

			var vmsj1 = 'No se pudieron mostrar los tipos de entidad, error: ' + err;
			req.vmsj1 = vmsj1;
			req.vfechaActual = vfechaActual;
			res.render('registrar-pedido', datos);

		} else{

			var vmsj1 = "";
			if(registrosTipoEntidades < 1){
				vmsj1 = "No se encontraron tipo de entidades.";
			}
			var datos = {
				msjTipo                   : "info",
				msj1                      : vmsj1,
				msj2                      : '', 
				title                     : 'Cuentas Delifood',
				fechaActual               : vfechaActual,
				registrosAllTipoEntidades : registrosTipoEntidades,
				vlstTipoPedido            : '',
				registrosFilEntidades     : []
			}

			
			req.vmsj1 = vmsj1;
			req.vfechaActual = vfechaActual;
			req.registrosAllTipoEntidades = registrosTipoEntidades;
			next();
			//res.render('registrar-pedido', datos);

		}
		
	});
}

controlador.mostrarEntidadesFiltradas = function(req, res){

	var vlstTipoPedido = req.body.lstTipoPedido;
console.log("-------------->" + vlstTipoPedido);
	modeloEntidad.mostrarEntidadesFiltradas(vlstTipoPedido, function(err, registrosEntidades){
		if(err){

			var datos = {
				msjTipo                   : "danger",
				msj1                      : 'No se pudieron mostrar las entidades, error: ' + err,
				msj2                      : '', 
				title                     : 'Cuentas Delifood',
				fechaActual               : req.vfechaActual,
				registrosAllTipoEntidades : req.registrosAllTipoEntidades,
				vlstTipoPedido            : vlstTipoPedido,
				registrosFilEntidades     : []
			}

			res.render('registrar-pedido', datos);

		} else{

			var datos = {
				msjTipo                   : "danger",
				msj1                      : 'No se pudieron mostrar las entidades, error: ' + err,
				msj2                      : '', 
				title                     : 'Cuentas Delifood',
				fechaActual               : req.vfechaActual,
				registrosAllTipoEntidades : req.registrosAllTipoEntidades,
				vlstTipoPedido            : vlstTipoPedido,
				registrosFilEntidades     : registrosEntidades
			}

			res.render('registrar-pedido', datos);

		}
	});

}

module.exports = controlador;