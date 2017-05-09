var modeloEntidad = require('../modelo/modeloEntidad');
var modeloPedido = require('../modelo/modeloPedidoAdmin');

var controlador = function(){};



// INICIO ------------------------------------ para página Menú Pedido (registrar-pedido.ejs) ------------------------------------

controlador.mostrarTipoEntidades = function(req, res, next){
	var ceroA = '0';
	var f = new Date();
	var dia = f.getDate();
	var mes = f.getMonth()+1;
	if(dia < 10){
    	dia = ceroA.concat(dia);
    }
    if(mes < 10){
    	mes = ceroA.concat(mes);
    }
    var vfechaActual = dia +"/"+ mes +"/"+ f.getFullYear();

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
			if(registrosTipoEntidades.length < 1){
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





// INICIO ------------------------------- para página Menú "Registros" - "Entidades"
controlador.mostrarTipoEntidades2 = function(req, res, next){
/*
	// variables para el proceso de grabar:
	var vmsjTipo1 = req.vmsjTipo1;
	var vmsj1 = req.vmsj1;
	// variales para el proceso de borrar:
	var vmsjTipo2 = req.vmsjTipo2;
	var vmsj2 = req.vmsj2;
*/
	var vmsjTipo1 = '';
	var vmsj1 = '';

	modeloEntidad.mostrarTipoEntidad(function(err, registrosTipoEntidades){
		if(err){

			if(req.vmsj1 == "" || req.vmsj1 == undefined){
				req.vmsjTipo1 = 'danger';
				req.vmsj1 = 'No se pudieron mostrar los tipos de entidad, error: ' + err;
			}

			req.registrosAllTipoEntidades = [];

			next();

		} else{

			if(vmsj1 == "" || vmsj1 == undefined){
				vmsjTipo1 = 'info';
				vmsj1 = '';
				if(registrosTipoEntidades.length < 1){
					vmsj1 = "No se encontraron tipos de entidades.";
				}
			}
			
			if(req.vmsj1 == "" || req.vmsj1 == undefined){
				req.vmsjTipo1 = vmsjTipo1;
				req.vmsj1 = vmsj1;
			}
			
			req.registrosAllTipoEntidades = registrosTipoEntidades;

			next();

		}
		
	});
}


controlador.mostrarEntidades = function(req, res){

	var vlstTipoEntidad = req.vlstTipoEntidad; // obtenido desde el primer middle ware controlador.grabarEntidad
	var vregistrosAllTipoEntidades = req.registrosAllTipoEntidades
	// variables para el proceso de grabar: // obtenidas desde el primer middleware
	var vmsjTipo1 = req.vmsjTipo1;
	var vmsj1 = req.vmsj1;
	if(req.vmsj1 == undefined){ 
		vmsj1 = ''; 
		vmsjTipo1 = '';
	}
	// variales para el proceso de borrar: // obtenidas desde el primer middleware
	var vmsjTipo2 = req.vmsjTipo2;
	var vmsj2 = req.vmsj2;
	if(req.vmsj2 == undefined){ 
		vmsj2 = '';
		vmsjTipo2 = '';
	}

	modeloEntidad.mostrarEntidades(function(err, registrosEntidades){

		if(err){

			if(req.vmsj2 == ""){ 
				vmsjTipo2 = 'danger';
				vmsj2 = 'No se pudieron mostrar las entidades, error: ' + err;
			}

			var datos = {
				msjTipo1                  : vmsjTipo1,
				msj1                      : vmsj1,
				msjTipo2                  : vmsjTipo2,
				msj2                      : vmsj2,
				title                     : 'Cuentas Delifood',
				registrosAllTipoEntidades : vregistrosAllTipoEntidades,
				vTipoEntidad              : vlstTipoEntidad,
				registrosAllEntidades     : []
			}

			res.render('registrar-entidad', datos);

		} else{
			if(registrosEntidades.length < 1){

				if(req.vmsj2 == ""){ 
					vmsjTipo2 = 'info';
					vmsj2 = 'No se encontraron entidades.'; 
				}

				var datos = {
					msjTipo1                  : vmsjTipo1,
					msj1                      : vmsj1,
					msjTipo2                  : vmsjTipo2,
					msj2                      : vmsj2, 
					title                     : 'Cuentas Delifood',
					registrosAllTipoEntidades : vregistrosAllTipoEntidades,
					vTipoEntidad              : vlstTipoEntidad,
					registrosAllEntidades     : registrosEntidades
				}

				res.render('registrar-entidad', datos);
			} else{

				if(req.vmsj2 == ""){ 
					vmsjTipo2 = '';
				}

				var datos = {
					msjTipo1                  : vmsjTipo1,
					msj1                      : vmsj1,
					msjTipo2                  : vmsjTipo2,
					msj2                      : vmsj2,
					title                     : 'Cuentas Delifood',
					registrosAllTipoEntidades : vregistrosAllTipoEntidades,
					vTipoEntidad              : vlstTipoEntidad,
					registrosAllEntidades     : registrosEntidades
				}

				res.render('registrar-entidad', datos);
			}
		}
	});
}


controlador.grabarEntidad = function(req, res, next){

	var vlstTipoEntidad = req.body.lstTipoEntidad;
	var vtxtEntidadNombre = req.body.txtEntidadNombre;
	if(vtxtEntidadNombre != undefined){
		vtxtEntidadNombre = vtxtEntidadNombre.trim();
	}

	if(vlstTipoEntidad == 0){

		req.vmsjTipo1 = 'warning';
		req.vmsj1 = 'No se seleccionó el tipo de entidad.';
		req.vlstTipoEntidad = vlstTipoEntidad;

		next();

	} else{

		if(vtxtEntidadNombre == "" || vtxtEntidadNombre == undefined){

			req.vmsjTipo1 = 'warning';
			req.vmsj1 = 'No se indicó el nombre de la nueva entidad.';
			req.vlstTipoEntidad = vlstTipoEntidad;

			next();
		} else{

			var registro = {
				id_tipo_ent : vlstTipoEntidad,
				nombre_ent  : vtxtEntidadNombre
			}

			modeloEntidad.grabarEntidad(registro, function(err){
				if(err){

					req.vmsjTipo1 = 'danger';
					req.vmsj1 = 'No se pudo grabar la entidad, error: ' + err;
					req.vlstTipoEntidad = vlstTipoEntidad;

					next();
				} else{

					req.vmsjTipo1 = 'success';
					req.vmsj1 = 'Se grabó correctamente.';
					req.vlstTipoEntidad = vlstTipoEntidad;

					next();
				}
			});
		}
	}
	
}


controlador.borrarEntidad = function(req, res, next){

	var IdEntidad = req.params.id_ent;
	var IdTipoEnt = req.params.id_tipo_ent;
	var vmsjTipo2 = '';
	var vmsj2     = '';

	modeloPedido.consultaEntidadEnPedidos(IdEntidad, function(err1, registros){
		if(err1){

			req.vmsjTipo2 = 'danger';
			req.vmsj2 = 'No se pudo consultar si se puede borrar la entidad, error: ' + err1;
			next();

		} else{

			if(registros.length > 0){

				req.vmsjTipo2 = 'info';
				req.vmsj2 = 'No se puede borrar la entidad ya que existen pedidos con esta.';
				next();

			} else{

				var IDs = {
					id_ent      : IdEntidad,
					id_tipo_ent : IdTipoEnt
				}

				modeloEntidad.borrarEntidad(IDs, function(err2){
					if(err2){

						req.vmsjTipo2 = 'danger';
						req.vmsj2 = 'No se puede borrar la entidad hubo un problema, error: ' + err2;
						next();

					} else{

						req.vmsjTipo2 = 'success';
						req.vmsj2 = 'Entidad borrada.';
						next();
					}
				});

			}
		}
	});

	
}

// FIN -------------------------------------- para página Menú "Registros" - "Entidades"
module.exports = controlador;