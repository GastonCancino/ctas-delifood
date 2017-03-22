var modeloAlmuerzoProg = require('../modelo/modeloAlmuerzoProg');

var controlador = function(){};

controlador.grabarAlmuerzoProg = function(req, res){

	var vnombre_alm_prog = req.body.nombre_alm_prog;
	vnombre_alm_prog = vnombre_alm_prog.trim();

	if(vnombre_alm_prog == ""){

		var datos = {
			msjTipo : "warning",
			msj1    : "Tiene que ingresar un nombre"
		}

		res.render('registrar-almuerzo-programado', { title: 'Cuentas Delifood', datos});

	} else{

		var registro = {
			nombre_alm_prog : vnombre_alm_prog
		}

		modeloAlmuerzoProg.grabarAlmuerzoProg(registro, function(err){
			if(err){

				var datos = {
					msjTipo : "danger",
					msj1 : "No se pudo grabar, error: " + err
				}

				res.render('registrar-almuerzo-programado', { title: 'Cuentas Delifood', datos});

			} else{

				var datos = {
					msjTipo : "success",
					msj1 : "Se grabó correctamente."
				}

				res.render('registrar-almuerzo-programado', { title: 'Cuentas Delifood', datos});
			}
		});
	}

	//res.render('registrar-almuerzo-programado', datos);
}





controlador.mostrarTodosAlmuerzoProg = function(req, res){

	modeloAlmuerzoProg.mostrarTodosAlmuerzoProg(function(err, registrosTodosAlmuerzoProg){
		if(err){

			var datos = {
				msjTipo               : "danger",
				msj1                  : "No se pudieron mostrar los almuerzos, error: " + err,
				title                 : "Cuentas Delifood",
				registrosCarta        : [{id_carta_x_fecha: '0000-00-00', id_alm_prog: 0, nombre_alm_prog: '', precio_alm_prog: 0, estado_carta_x_fecha: 0}],
				registrosAlmuerzoProg : [{id_alm_prog: 0, nombre_alm_prog: '', estado_alm_prog: 0}]
			}

			res.render('registrar-carta-por-fecha', datos);

		} else{

			var vmsj1 = "";
			if(registrosTodosAlmuerzoProg.length < 1){
				vmsj1 = "No se encontraron almuerzos.";
			}

			var datos = {
				msjTipo                  : "info",
				msj1                     : vmsj1,
				title                    : "Cuentas Delifood",
				registrosCarta           : req.registrosCartaxFecha,
				registrosAllAlmuerzoProg : registrosTodosAlmuerzoProg
			}

			res.render('registrar-carta-por-fecha', datos);
		}

	});
}

module.exports = controlador;