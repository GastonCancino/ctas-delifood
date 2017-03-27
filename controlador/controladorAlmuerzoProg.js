var modeloAlmuerzoProg = require('../modelo/modeloAlmuerzoProg');

var controlador = function(){};




// INICIO ------------------------------------ para página "Registros" - "Almuerzo programado" ------------------------------------

controlador.grabarAlmuerzoProg = function(req, res){

	var vnombre_alm_prog = req.body.nombre_alm_prog,
	vlstid_tipo_comida = req.body.lstid_tipo_comida;
	vnombre_alm_prog = vnombre_alm_prog.trim();

	if(vnombre_alm_prog == "" || vlstid_tipo_comida == 0){

		var datos = {
			msjTipo        : "warning",
			msj1           : "Tiene que ingresar un nombre y seleccionar el tipo.",
			nombreAlmuerzo : vnombre_alm_prog
		}

		res.render('registrar-almuerzo-programado', { title: 'Cuentas Delifood', datos});

	} else{

		var registro = {
			nombre_alm_prog : vnombre_alm_prog,
			id_tipo_comida  : vlstid_tipo_comida
		}

		modeloAlmuerzoProg.grabarAlmuerzoProg(registro, function(err){
			if(err){

				var datos = {
					msjTipo : "danger",
					msj1 : "No se pudo grabar, error: " + err,
					nombreAlmuerzo : ""
				}

				res.render('registrar-almuerzo-programado', { title: 'Cuentas Delifood', datos});

			} else{

				var datos = {
					msjTipo : "success",
					msj1 : "Se grabó correctamente.",
					nombreAlmuerzo : ""
				}

				res.render('registrar-almuerzo-programado', { title: 'Cuentas Delifood', datos});
			}
		});
	}

	//res.render('registrar-almuerzo-programado', datos);
}

// FIN ------------------------------------ para página "Registros" - "Almuerzo programado" ------------------------------------




// INICIO ------------------------------------ para página "Registros" - "Carta de hoy" ------------------------------------

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

// FIN ------------------------------------ para página "Registros" - "Carta de hoy" ------------------------------------

module.exports = controlador;