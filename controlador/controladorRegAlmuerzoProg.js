var modeloRegAlmuerzoProg = require('../modelo/modeloRegAlmuerzoProg');

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

		modeloRegAlmuerzoProg.grabarAlmuerzoProg(registro, function(err){
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

module.exports = controlador;