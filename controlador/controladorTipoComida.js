var modeloTipoComida = require('../modelo/modeloTipoComida');
//var modeloAlmuerzoProg = require('../modelo/modeloAlmuerzoProg');

controlador = function(){};




// INICIO ------------------------------------  para página Menú "Registros" - "Almuerzo Programado" (registrar-almuerzo-programado) ------------------------------------

controlador.mostrarTipoComida = function(req, res, next){

	// recupero las variables enviadas por el middleware desde controladorAlmuerzoProg.grabarAlmuerzoProg
	var vmsjTipo        = req.vmsjTipo;
	var vmsj1           = req.vmsj1;
	var vnombreAlmuerzo = req.vnombreAlmuerzo;
	if(vnombreAlmuerzo == undefined){vnombreAlmuerzo = ''};

	modeloTipoComida.mostrarTipoComida(function(err, registrosTipoComidas){
		if(err){

			if(vmsjTipo == '' || vmsjTipo == undefined){
				vmsjTipo = 'danger';
			}

			if(vmsj1 == '' || vmsj1 == undefined){
				vmsj1 = 'No se pudieron mostrar los tipos de comida, error: ' + err;
			};

			var datos = {
				title                  : 'Cuentas Delifood',
				msjTipo                : vmsjTipo,
				msj1                   : vmsj1,
				msjTipo2               : '',
				msj2                   : '',
				nombreAlmuerzo         : vnombreAlmuerzo,
				registrosAllTipoComida : [],
				registrosAllAlmuerzos  : []
			}

			res.render('registrar-plato', datos);

		} else{

			if(vmsjTipo == ''){
				vmsjTipo = 'danger';
			}

			if(registrosTipoComidas.length < 1){
				if(vmsj1 == ''){
					vmsj1 = 'No se encontraron tipos de comida.';
				}
			}

			var datos = {
				title                  : 'Cuentas Delifood',
				msjTipo                : vmsjTipo,
				msj1                   : vmsj1,
				msjTipo2               : '',
				msj2                   : '',
				nombreAlmuerzo         : vnombreAlmuerzo,
				registrosAllTipoComida : registrosTipoComidas,
				registrosAllAlmuerzos  : []
			}

			req.vmsjTipo = vmsjTipo;
			req.vmsj1 = vmsj1;
			req.vnombreAlmuerzo = vnombreAlmuerzo;
			req.vregistrosTipoComidas = registrosTipoComidas;
			next();
			//res.render('registrar-plato', datos);

			//mostrarPlatos(res, vmsjTipo, vmsj1, vnombreAlmuerzo, registrosTipoComidas); // evitar usar middleware con una función

		}

	});


};


// evitar usar middleware con una función

/*function mostrarPlatos(res, vmsjTipo, vmsj1, vnombreAlmuerzo, registrosTipoComidas){

	modeloAlmuerzoProg.mostrarTodosAlmuerzoProg(function(err, registrosTodosAlmuerzoProg){
		if(err){

			var datos = {
				title                  : 'Cuentas Delifood',
				msjTipo                : vmsjTipo,
				msj1                   : vmsj1,
				msj2                   : '',
				nombreAlmuerzo         : vnombreAlmuerzo,
				registrosAllTipoComida : registrosTipoComidas,
				registrosAllAlmuerzos  : registrosTodosAlmuerzoProg
			}

			res.render('registrar-plato', datos);

		} else{

			var datos = {
				title                  : 'Cuentas Delifood',
				msjTipo                : vmsjTipo,
				msj1                   : vmsj1,
				msj2                   : '',
				nombreAlmuerzo         : vnombreAlmuerzo,
				registrosAllTipoComida : registrosTipoComidas,
				registrosAllAlmuerzos  : registrosTodosAlmuerzoProg
			}

			res.render('registrar-plato', datos);
		}
	});
}*/

// FIN ------------------------------------  para página Menú "Registros" - "Almuerzo Programado" (registrar-almuerzo-programado) ------------------------------------

module.exports = controlador;