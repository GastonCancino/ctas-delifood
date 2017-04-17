var modeloTipoComida = require('../modelo/modeloTipoComida');

controlador = function(){};




// INICIO ------------------------------------  para página Menú "Registros" - "Almuerzo Programado" (registrar-almuerzo-programado) ------------------------------------

controlador.mostrarTipoComida = function(req, res){

	// recupero las variables enviadas por el middleware desde controladorAlmuerzoProg.grabarAlmuerzoProg
	var vmsjTipo        = req.vmsjTipo;
	var vmsj1           = req.vmsj1;
	var vnombreAlmuerzo = req.vnombreAlmuerzo;

	modeloTipoComida.mostrarTipoComida(function(err, registrosTipoComidas){
		if(err){

			if(vmsjTipo == ''){
				vmsjTipo = 'danger';
			}

			if(vmsj1 == ''){
				vmsj1 = 'No se pudieron mostrar los tipos de comida, error: ' + err;
			};

			var datos = {
				title                  : 'Cuentas Delifood',
				msjTipo                : vmsjTipo,
				msj1                   : vmsj1,
				nombreAlmuerzo         : vnombreAlmuerzo,
				registrosAllTipoComida : []
			}

			res.render('registrar-almuerzo-programado', datos);

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
				nombreAlmuerzo         : vnombreAlmuerzo,
				registrosAllTipoComida : registrosTipoComidas
			}

			res.render('registrar-almuerzo-programado', datos);
		}

	});
};

// FIN ------------------------------------  para página Menú "Registros" - "Almuerzo Programado" (registrar-almuerzo-programado) ------------------------------------

module.exports = controlador;