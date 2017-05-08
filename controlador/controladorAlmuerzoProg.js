var modeloAlmuerzoProg = require('../modelo/modeloAlmuerzoProg');
var modeloTipoComida = require('../modelo/modeloTipoComida');
var modeloCartaxFecha = require('../modelo/modeloCartaxFecha');

var controlador = function(){};




// INICIO ------------------------------------ para página "Registros" - "Platos" (registrar-plato.ejs) ------------------------------------

controlador.grabarAlmuerzoProg = function(req, res, next){

	var vnombre_alm_prog = req.body.nombre_alm_prog,
	vlstid_tipo_comida = req.body.lstid_tipo_comida;
	vnombre_alm_prog = vnombre_alm_prog.trim();

	var msjTipo = '';
	var vmsjTipo2 = '';
	var msj2 = '';
	var vregistrosTipoComidas;
	var vregistrosTodosAlmuerzoProg;


	// trayendo los tipos de comida, para mostrarlos antes y despues de grabar (ya que estos no varían).
	modeloTipoComida.mostrarTipoComida(function(err3, registrosTipoComidas){
		if(err3){

			vregistrosTipoComidas = 'Hubo un error al traer los tipos de comida. 3';

		} else{

			vregistrosTipoComidas = registrosTipoComidas;
		}
	


		// trayendo los almuerzos antes de grabar (para mostrarlos en cada error).
		modeloAlmuerzoProg.mostrarTodosAlmuerzoProg(function(err, registrosTodosAlmuerzoProg){
			if(err){

				vmsjTipo2 = 'Danger';
				msj2 = "No se pudieron mostrar los platos, error: " + err;
				vregistrosTodosAlmuerzoProg = [];

			} else{

				if(registrosTodosAlmuerzoProg.length < 1){
					vmsjTipo2 = 'info';
					msj2 = "No se encontraron platos.";
				}

				vregistrosTodosAlmuerzoProg = registrosTodosAlmuerzoProg;
				
			}
		

			if(vnombre_alm_prog == "" || vlstid_tipo_comida == 0){

				var datos = {
						title                  : 'Cuentas Delifood',
						msjTipo                : "warning",
						msj1                   : "Tiene que ingresar un nombre y seleccionar el tipo.",
						msjTipo2               : vmsjTipo2,
						msj2                   : msj2,
						nombreAlmuerzo         : vnombre_alm_prog,
						registrosAllTipoComida : vregistrosTipoComidas,
						registrosAllAlmuerzos  : vregistrosTodosAlmuerzoProg
					}

				res.render('registrar-plato', datos);

			} else{

				var registro = {
					nombre_alm_prog : vnombre_alm_prog,
					id_tipo_comida  : vlstid_tipo_comida
				}


				// grabando plato
				modeloAlmuerzoProg.grabarAlmuerzoProg(registro, function(err){
					if(err){

						var datos = {
							title                  : 'Cuentas Delifood',
							msjTipo                : "danger",
							msj1                   : "No se pudo grabar, error: " + err,
							msjTipo2               : vmsjTipo2,
							msj2                   : msj2,
							nombreAlmuerzo         : vnombre_alm_prog,
							registrosAllTipoComida : vregistrosTipoComidas,
							registrosAllAlmuerzos  : vregistrosTodosAlmuerzoProg
						}

						res.render('registrar-plato', datos);

					} else{



						// vuelvo a traer todos los almuerzos para traer el plato recientemente grabado, chanco la variable vregistrosTodosAlmuerzoProg.
						modeloAlmuerzoProg.mostrarTodosAlmuerzoProg(function(err, registrosTodosAlmuerzoProg){
							if(err){

								vmsjTipo2 = 'Danger';
								msj2 = "No se pudieron mostrar los platos, error: " + err;
								vregistrosTodosAlmuerzoProg = [];

							} else{

								if(registrosTodosAlmuerzoProg.length < 1){
									vmsjTipo2 = 'info';
									msj2 = "No se encontraron platos.";
								}

								vregistrosTodosAlmuerzoProg = registrosTodosAlmuerzoProg;
								
							}

								var datos = {
									title                  : 'Cuentas Delifood',
									msjTipo                : "success",
									msj1                   : "Se grabó correctamente.",
									msjTipo2               : vmsjTipo2,
									msj2                   : msj2,
									nombreAlmuerzo         : vnombre_alm_prog,
									registrosAllTipoComida : vregistrosTipoComidas,
									registrosAllAlmuerzos  : vregistrosTodosAlmuerzoProg
								}

								res.render('registrar-plato', datos);

						});
						
					}
				});
			}

		});

	});

}


controlador.borrarAlmuerzoProg = function(req, res){
	var vid_alm_prog = req.params.id_alm_prog;

	modeloCartaxFecha.consultarAlmuerzoDeCarta(vid_alm_prog, function(err1, registroAlmuerzoCarta){
		if(err1){
			var datos = {
				msjTipo                : "",
				msj1                   : "",
				msjTipo2               : "danger",
				msj2                   : "No se pudo consultar si se puede borrar el plato de la tabla maestra de platos, error: " + err1, // mensaje para la sección "Platos" (grilla que muestra todos los platos)
				title                  : "Cuentas Delifood",
				nombreAlmuerzo         : '',
				registrosAllTipoComida : [],
				registrosAllAlmuerzos  : []
			}

			res.render('registrar-plato', datos);

		} else{
			if(registroAlmuerzoCarta.length < 1){

				modeloAlmuerzoProg.borrarAlmuerzoProg(vid_alm_prog, function(err2){
					if(err2){
						var datos = {
							msjTipo                : "",
							msj1                   : "",
							msjTipo2               : "danger",
							msj2                   : "No se pudo borrar el plato de la tabla maestra de platos, error: " + err2, // mensaje para la sección "Platos" (grilla que muestra todos los platos)
							title                  : "Cuentas Delifood",
							nombreAlmuerzo         : '',
							registrosAllTipoComida : [],
							registrosAllAlmuerzos  : []
						}

						res.render('registrar-plato', datos);
						
					} else{
						res.redirect('/registrar-plato');
					}
				});

			} else{
				var regresar = "registrar-plato";
				var mensaje = "No se puede borrar el plato porque ya existe en una de las cartas.";

				res.redirect('/borrar-plato-de-tabla-maestra-mensaje/'+mensaje+'/'+regresar);
			}
		}

	});
}

// FIN ------------------------------------ para página "Registros" - "Platos" (registrar-plato.ejs) ------------------------------------




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