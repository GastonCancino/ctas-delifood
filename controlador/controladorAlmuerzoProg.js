var modeloAlmuerzoProg = require('../modelo/modeloAlmuerzoProg');
var modeloTipoComida = require('../modelo/modeloTipoComida');

var controlador = function(){};




// INICIO ------------------------------------ para página "Registros" - "Almuerzo programado" (registrar-almuerzo-programado.ejs) ------------------------------------

controlador.grabarAlmuerzoProg = function(req, res, next){

	var vnombre_alm_prog = req.body.nombre_alm_prog,
	vlstid_tipo_comida = req.body.lstid_tipo_comida;
	vnombre_alm_prog = vnombre_alm_prog.trim();

	var vregistrosTipoComidas;

	if(vnombre_alm_prog == "" || vlstid_tipo_comida == 0){

		// trayendo los tipos de comida, para cuando se regrese con el mensaje de selección.
		modeloTipoComida.mostrarTipoComida(function(err, registrosTipoComidas){
			if(err){
				vregistrosTipoComidas = 'Hubo un error al traer los tipos de comida. 1';
			} else{
				vregistrosTipoComidas = registrosTipoComidas;
			}


			var datos = {
				title                  : 'Cuentas Delifood',
				msjTipo                : "warning",
				msj1                   : "Tiene que ingresar un nombre y seleccionar el tipo.",
				nombreAlmuerzo         : vnombre_alm_prog,
				registrosAllTipoComida : vregistrosTipoComidas
			}

			res.render('registrar-almuerzo-programado', datos);

		});

	} else{

		var registro = {
			nombre_alm_prog : vnombre_alm_prog,
			id_tipo_comida  : vlstid_tipo_comida
		}

		modeloAlmuerzoProg.grabarAlmuerzoProg(registro, function(err){
			if(err){

				// trayendo los tipos de comida, por si hay algun error igual mostrarlos.
				modeloTipoComida.mostrarTipoComida(function(err2, registrosTipoComidas){
					if(err2){
						vregistrosTipoComidas = 'Hubo un error al traer los tipos de comida. 2';
					} else{
						vregistrosTipoComidas = registrosTipoComidas;
					}

					var datos = {
						title                  : 'Cuentas Delifood',
						msjTipo                : "danger",
						msj1                   : "No se pudo grabar, error: " + err,
						nombreAlmuerzo         : vnombre_alm_prog,
						registrosAllTipoComida : vregistrosTipoComidas
					}

					res.render('registrar-almuerzo-programado', datos);
				});

			} else{

				var datos = {
					title                  : 'Cuentas Delifood',
					msjTipo                : "success",
					msj1                   : "Se grabó correctamente.",
					nombreAlmuerzo         : vnombre_alm_prog,
					registrosAllTipoComida : []
				}

				// envío por el middleware las variables hacia controladorTipoComida.mostrarTipoComida
				req.vmsjTipo        = "success";
				req.vmsj1           = "Se grabó correctamente.";
				req.vnombreAlmuerzo = vnombre_alm_prog;
				//res.render('registrar-almuerzo-programado', datos);
				next();
			}
		});
	}

	//res.render('registrar-almuerzo-programado', datos);
}

// FIN ------------------------------------ para página "Registros" - "Almuerzo programado" (registrar-almuerzo-programado.ejs) ------------------------------------




// INICIO ------------------------------------ para página "Registros" - "Carta de hoy" (registrar-carta-por-fecha.ejs) ------------------------------------

controlador.mostrarTodosAlmuerzoProg = function(req, res){

	modeloAlmuerzoProg.mostrarTodosAlmuerzoProg(function(err, registrosTodosAlmuerzoProg){
		if(err){

			var datos = {
				msjTipo                  : "danger",
				msj1                     : req.vmsj1, // mensaje para la seccion "Carta de hoy" de la pagina web
				msj2                     : "No se pudieron mostrar los almuerzos, error: " + err, // mensaje para la seccion "Agregar almuerzo a la carta de hoy" de la pagina web
				title                    : "Cuentas Delifood",
				registrosCarta           : [],
				registrosAllAlmuerzoProg : []
			}

			res.render('registrar-carta-por-fecha', datos);

		} else{

			var vmsj2 = "";
			if(registrosTodosAlmuerzoProg.length < 1){
				vmsj2 = "No se encontraron almuerzos.";
			}

			var datos = {
				msjTipo                  : "info",
				msj1                     : req.vmsj1, // mensaje para la seccion "Carta de hoy" de la pagina web
				msj2                     : vmsj2, // mensaje para la seccion "Agregar almuerzo a la carta de hoy" de la pagina web
				title                    : "Cuentas Delifood",
				registrosCarta           : req.registrosCartaxFecha,
				registrosAllAlmuerzoProg : registrosTodosAlmuerzoProg
			}

			res.render('registrar-carta-por-fecha', datos);
		}

	});
}

// FIN ------------------------------------ para página "Registros" - "Carta de hoy" (registrar-carta-por-fecha.ejs) ------------------------------------

module.exports = controlador;