var modeloCartaxFecha = require('../modelo/modeloCartaxFecha');
var modeloPedido = require('../modelo/modeloPedidoAdmin');

var controlador = function(){};




// INICIO ------------------------------------ para página Menú "Registros" - "Carta de hoy" (registrar-carta-por-fecha.ejs) ------------------------------------

controlador.mostrarCartaDeHoy = function(req, res, next){

	// INICIO - transformando la fecha actual a formato aceptado por MySQL
		var fechaActual = new Date();
		var dia = fechaActual.getDate();
		var mes = fechaActual.getMonth() + 1;
		var anio = fechaActual.getFullYear();
		var fechaActualMySQL = anio +"-"+ mes +"-"+ dia;
	// FIN - transformando la fecha actual a formato aceptado por MySQL

	modeloCartaxFecha.mostrarCartaDeHoy(fechaActualMySQL, function(err, registrosCartaxFecha){
		if(err){

			var datos = {
				msjTipo                  : "danger",
				msj1                     : "No se pudo mostrar la carta de hoy, error: " + err, // mensaje para la seccion "Carta de hoy" de la pagina web
				msj2                     : "", // mensaje para la seccion "Agregar almuerzo a la carta de hoy" de la pagina web
				title                    : "Cuentas Delifood",
				registrosCarta           : [],
				registrosAllAlmuerzoProg : []
			}

			res.render('registrar-carta-por-fecha', datos);
			//next();

		} else{

			var vmsj1 = "";
			if(registrosCartaxFecha.length < 1){
				vmsj1 = "No se encontró carta para hoy.";
			}

			/*var datos = {
				msjTipo                  : "info",
				msj1                     : vmsj1,
				title                    : "Cuentas Delifood",
				registrosCarta           : registrosCartaxFecha,
				registrosAllAlmuerzoProg : []
			}*/

			// envío los datos de la carta al middleware para :
			req.vmsj1 = vmsj1;
			req.registrosCartaxFecha = registrosCartaxFecha;

			next(); // -> hacia  controlador.mostrarTodosAlmuerzoProg       //res.render('registrar-carta-por-fecha', datos);
		}
	});
}


controlador.agregarAlmuerzoAcarta = function(req, res){
	var vid_alm_prog = req.body.lstAlmuerzos,
		vid_carta_x_fecha = req.body.id_carta_x_fecha
		vprecio_alm_prog  = req.body.precio_alm_prog;

	var registro = {
		id_alm_prog      : vid_alm_prog,
		id_carta_x_fecha : vid_carta_x_fecha,
		precio_alm_prog : vprecio_alm_prog
	}

	modeloCartaxFecha.agregarAlmuerzoAcarta(registro, function(err){
		if(err){
			var datos = {
				msjTipo                  : "danger",
				msj1                     : "",  // mensaje para la seccion "Carta de hoy" de la pagina web
				msj2                     : "No se pudo agregar el almuerzo a la carta, error: " + err,  // mensaje para la seccion "Agregar almuerzo a la carta de hoy" de la pagina web
				title                    : "Cuentas Delifood",
				registrosCarta           : [],
				registrosAllAlmuerzoProg : []
			}
			//console.log("--->" + datos.registrosCarta[0].id_carta_x_fecha);
			res.render('registrar-carta-por-fecha', datos);
		} else{
			res.redirect('/registrar-carta-por-fecha');
		}
	});
}


controlador.borrarAlmuerzoDecarta = function(req, res){

	var vid_carta_x_fecha = req.params.id_carta_x_fecha,
		vid_alm_prog = req.params.id_alm_prog;
		//console.log("PLACE HOLDERS ->" + vid_carta_x_fecha +"....."+ vid_alm_prog);

		var registro = {
			id_carta_x_fecha : vid_carta_x_fecha,
			id_alm_prog      : vid_alm_prog
		}

		modeloPedido.consultarAlmuerzoDePedido(registro, function(err1, registroPedido){
			if(err1){
				var datos = {
					msjTipo                  : "danger",
					msj1                     : "No se pudo consultar si se puede borrar el almuerzo de la carta, error: " + err1,  // mensaje para la seccion "Carta de hoy" de la pagina web
					msj2                     : "",  // mensaje para la seccion "Agregar almuerzo a la carta de hoy" de la pagina web
					title                    : "Cuentas Delifood",
					registrosCarta           : [],
					registrosAllAlmuerzoProg : []
				}

				res.render('registrar-carta-por-fecha', datos);

			} else{

				if(registroPedido.length < 1){

					modeloCartaxFecha.borrarAlmuerzoDecarta(registro, function(err2){
						if(err2){
							var datos = {
								msjTipo                  : "danger",
								msj1                     : "No se pudo borrar el almuerzo de la carta, error: " + err2,  // mensaje para la seccion "Carta de hoy" de la pagina web
								msj2                     : "",  // mensaje para la seccion "Agregar almuerzo a la carta de hoy" de la pagina web
								title                    : "Cuentas Delifood",
								registrosCarta           : [],
								registrosAllAlmuerzoProg : []
							}

							res.render('registrar-carta-por-fecha', datos);

						} else{
							res.redirect('/registrar-carta-por-fecha');
						}
					});


				} else{

					var regresar = "registrar-carta-por-fecha";
					var mensaje = "No se puede borrar el almuerzo de la carta porque ya existen pedidos con este almuerzo";

					res.redirect('/borrar-almuerzo-de-carta-mensaje/'+mensaje+'/'+regresar);

				}
			}
		});



			
		
}

// FIN ------------------------------------ para página Menú "Registros" - "Carta de hoy" (registrar-carta-por-fecha.ejs) ------------------------------------



// INICIO -------------------------------- para página Menú "Consultas" - "Carta por fecha" (consulta-carta-por-fecha.ejs)-----------------------------------
controlador.mostrarCartaPorFecha = function(req, res){

	// INICIO - transformando la fecha actual a formato aceptado por MySQL
		var ceroA = '0';
		var fechaActual = new Date();
		var dia = fechaActual.getDate();
		var mes = fechaActual.getMonth() + 1;
		var anio = fechaActual.getFullYear();
		if(dia < 10){
            dia = ceroA.concat(dia);
          }
         if(mes < 10){
            mes = ceroA.concat(mes);
         }
		var fechaActualMySQL = anio +"-"+ mes +"-"+ dia;
	// FIN - transformando la fecha actual a formato aceptado por MySQL

	var vdtpFecha = req.body.dtpFecha;
	
	// if abreviado:
	(vdtpFecha != "" && vdtpFecha != undefined) ? fechaActualMySQL = vdtpFecha : fechaActualMySQL = fechaActualMySQL;


	modeloCartaxFecha.mostrarCartaDeHoy(fechaActualMySQL, function(err, registrosCartaxFecha){
		if(err){

			var datos = {
				msjTipo                  : "danger",
				msj1                     : "No se pudo mostrar la carta para la fecha "+vdtpFecha+", error: " + err, // mensaje para la seccion "Carta de hoy" de la pagina web
				msj2                     : "", // mensaje para la seccion "Agregar almuerzo a la carta de hoy" de la pagina web
				title                    : "Cuentas Delifood",
				vdtpFecha                : vdtpFecha,
				registrosCarta           : []
			}

			res.render('consulta-carta-por-fecha', datos);

		} else{

			var vmsj1 = "";
			if(registrosCartaxFecha.length < 1){
				vmsj1 = "No se encontró carta para la fecha " + vdtpFecha;
			}

			var datos = {
				msjTipo                  : "info",
				msj1                     : vmsj1,
				title                    : "Cuentas Delifood",
				vdtpFecha                : vdtpFecha,
				registrosCarta           : registrosCartaxFecha
			}

			res.render('consulta-carta-por-fecha', datos);

		}
	});
}
// FIN -------------------------------- para página Menú "Consultas" - "Carta por fecha" (consulta-carta-por-fecha.ejs)-----------------------------------

module.exports = controlador;