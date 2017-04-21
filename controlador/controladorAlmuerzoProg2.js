var modeloAlmuerzoProg = require('../modelo/modeloAlmuerzoProg');

var controlador = function(){};




// INICIO ------------------------------------ para página "Registros" - "Carta de hoy" (registrar-carta-por-fecha.ejs) ------------------------------------

controlador.mostrarTodosAlmuerzoProg = function(req, res){

	var vmsjTipo     = req.vmsjTipo;
	var vmsj1        = req.vmsj1;
	var vnombreAlmuerzo = req.vnombreAlmuerzo;
	var vregistrosTipoComidas = req.vregistrosTipoComidas;

	modeloAlmuerzoProg.mostrarTodosAlmuerzoProg(function(err, registrosTodosAlmuerzoProg){
		if(err){

			var datos = {
				title                    : "Cuentas Delifood",
				msjTipo                  : "danger",
				msj1                     : vmsj1, // mensaje para la seccion "Registrar platos" de la pagina web
				msjTipo2                 : "danger",
				msj2                     : "No se pudieron mostrar los almuerzos, error: " + err, // mensaje para la seccion "Platos" de la pagina web
				nombreAlmuerzo           : vnombreAlmuerzo,
				registrosAllTipoComida   : vregistrosTipoComidas,
				registrosAllAlmuerzos    : []
			}

			res.render('registrar-plato', datos);

		} else{

			var vmsj2 = "";
			if(registrosTodosAlmuerzoProg.length < 1){
				vmsj2 = "No se encontraron platos.";
			}

			var datos = {
				title                    : "Cuentas Delifood",
				msjTipo                  : "info",
				msj1                     : vmsj1, // mensaje para la seccion "Registrar platos" de la pagina web
				msjTipo2                 : "info",
				msj2                     : vmsj2, // mensaje para la seccion "Platos" de la pagina web
				nombreAlmuerzo           : vnombreAlmuerzo,
				registrosAllTipoComida   : vregistrosTipoComidas,
				registrosAllAlmuerzos    : registrosTodosAlmuerzoProg
			}

			res.render('registrar-plato', datos);
		}

	});
}

// FIN ------------------------------------ para página "Registros" - "Carta de hoy" (registrar-carta-por-fecha.ejs) ------------------------------------

module.exports = controlador;