var modeloPedidoAdmin = require('../modelo/modeloPedidoAdmin');

var controlador = function(){};



// INICIO ------------------------------------ para página Menú Pedido (registrar-pedido.ejs) ------------------------------------

controlador.mostrarCartaDeHoy = function(req, res, next){
	var f = new Date();
	var mes = f.getMonth()+1;
	var vfechaActualMySQL = f.getFullYear() +"-"+ mes +"-"+ f.getDate();

	modeloPedidoAdmin.mostrarCartaDeHoy(vfechaActualMySQL, function(err, registrosCartaDeHoy){
		if(err){

			var datos = {
					msjTipo                   : 'danger',
					msj1                      : '',
					msj2                      : 'No se pudo mostrar los platos de la carta de hoy, error: ' + err, 
					title                     : 'Cuentas Delifood',
					fechaActual               : '', //req.vfechaActual,
					registrosAllTipoEntidades : [], //req.registrosAllTipoEntidades,
					vTipoEntidad              : '', //req.vTipoEntidad,
					registrosFilEntidades     : [], //req.vregistrosEntidades,
					registrosCartaDeHoy       : []
				}
				console.log("----------> Error");
				res.render('registrar-pedido', datos);

		} else{

			var vmsj2 = '';
			if(registrosCartaDeHoy.length < 1){
				vmsj2 = 'No se encontraron platos para la carta de hoy.';
			}

			var datos = {
					msjTipo                   : 'info',
					msj1                      : '',
					msj2                      : vmsj2, 
					title                     : 'Cuentas Delifood',
					fechaActual               : '', //req.vfechaActual,
					registrosAllTipoEntidades : [], //req.registrosAllTipoEntidades,
					vTipoEntidad              : '', //req.vTipoEntidad,
					registrosFilEntidades     : [], //req.vregistrosEntidades,
					registrosCartaDeHoy       : registrosCartaDeHoy
				}

				req.vmsj2 = vmsj2;
				req.vregistrosCartaDeHoy = registrosCartaDeHoy;
				next();
			//res.render('registrar-pedido', datos);
		}
	});
}

controlador.tomarPedido = function(req, res){

	var vmsj1 = "Algo sucedió y no entró al proceso !!";
	var flagCant = "";

	// INICIO - transformando la fecha actual a formato aceptado por MySQL
		var fechaActual = new Date();
		var dia = fechaActual.getDate();
		var mes = fechaActual.getMonth() + 1;
		var anio = fechaActual.getFullYear();
		var fechaActualMySQL = anio +"-"+ mes +"-"+ dia;
	// FIN - transformando la fecha actual a formato aceptado por MySQL
	
	//console.log("--->" + req.body);

	// INICIO - recibiendo datos del formulario
		var varid_carta_x_fecha  = req.body.id_carta_x_fecha,
			vartipo_entidad       = req.body.lstTipoEntidad,
			varlstEntidad        = req.body.lstEntidad,
			varid_alm_prog       = req.body.id_alm_prog;
			

	if(varid_carta_x_fecha == "" || varid_carta_x_fecha == "undefined"){
			vmsj1 = "La fecha esta vacía o es indefinida.";
		}else if(vartipo_entidad == 0){
			vmsj1 = "No se seleccionó el tipo de entidad.";
		}else if(varlstEntidad == 0){
			vmsj1 = "No se seleccionó una Empresa o Persona.";
		}else if(varid_alm_prog == 0 || varid_alm_prog == "undefined"){
			vmsj1 = "No se encontró ningún almuerzo programado.";
		}else{


		// Transformando la fecha del pedido a formato aceptado por MySQL
			// truco para transformar a cadena con + '' y para que el split() no de error:
			varid_carta_x_fecha = varid_carta_x_fecha + '';
			var fecElementos    = varid_carta_x_fecha.split('/');
			var diaCarta        = fecElementos[0];
			var mesCarta        = fecElementos[1];
			var anioCarta       = fecElementos[2];
			var varid_carta_x_fechaFormat = anioCarta +"-"+ mesCarta +"-"+ diaCarta;

		// Obteniendo cada almuerzo programado con split ya que en el formulario el name es el mismo (id_alm_prog)
			// como varid_alm_prog es un objeto, truco transformamos a cadena con + ''; para que el split no de error.
			varid_alm_prog = varid_alm_prog + '';    // console.log("--->" + varid_alm_prog);
			var idAlmuerzosProg = varid_alm_prog.split(',');
			var idAlmuerzoP;

			var vartipo_precio_pedido = "";


		// INICIO - Creando un insert por cada almuerzo programado (for con cada almuerzo separado con el split anterior)
			for(var i = 0; i < idAlmuerzosProg.length; i++){
				idAlmuerzoP = idAlmuerzosProg[i];
			
				
				// obteniendo cada cantidad con req.body["hcantidad_pedido" + idAlmuerzoP]
				var varhcantidad_pedido = req.body["hcantidad_pedido" + idAlmuerzoP];
				varhcantidad_pedido = varhcantidad_pedido + '';
				var cantidadesGratCredCont = varhcantidad_pedido.split(',');
				var cantidad;

				for(var j = 0; j < cantidadesGratCredCont.length; j++){

					cantidad = cantidadesGratCredCont[j];

					switch(j){
						case 0:
							vartipo_precio_pedido = "GRATIS";
							break;
						case 1:
							vartipo_precio_pedido = "AL CREDITO";
							break;
						case 2:
							vartipo_precio_pedido = "AL CONTADO";
							break;
					}

					if(cantidad != 0 && cantidad != "undefined"){
						var registro = {
							id_carta_x_fecha   : varid_carta_x_fechaFormat,
							tipo_pedido        : vartipo_entidad,
							id_alm_prog        : idAlmuerzoP,
							cantidad_pedido    : cantidad,
							tipo_precio_pedido : vartipo_precio_pedido,
							fecha_reg_pedido   : fechaActualMySQL
						}

						//console.log("->" + JSON.stringify(registro, null, 2));
						flagCant = "ok";
						vmsj1 = "";
						modeloPedidoAdmin.grabarPedidoAdmin(registro, function(err){
							if(err){
									//req.msj1 = "No se pudo grabar el pedido, error: " + err;
									//req.msj2 = JSON.stringify(req.body, null, 2);

									//datos = {
										//msj1: "No se pudo grabar el INSERT " + j + " del almuerzo " + idAlmuerzoP + ", error: " + err,
										//msj2: JSON.stringify(req.body, null, 2)
									//};
									vmsj1 = "No se pudo grabar el INSERT " + j + " del almuerzo " + idAlmuerzoP + ", error: " + err;

									// no se puede poner un res.render dentro de un bucle:
									//res.render('ver-pedido-recuperado', datos);
								} else{
									//req.msj1 = "El pedido se registró correctamente.";
									//req.msj2 = JSON.stringify(req.body, null, 2);

									//datos = {
										//msj1: "El pedido se registró correctamente.",
										//msj2: JSON.stringify(req.body, null, 2)
									//};
									vmsj1 = "Se grabó correctamente.";

									// no se puede poner un res.render dentro de un bucle:
									//res.render('ver-pedido-recuperado', datos);
								}
						});
					}else{
						if(flagCant != "ok"){
							vmsj1 = "No se indicó ninguna cantidad para ningún almuerzo, por lo tanto no se registró nada.";
						}
					}

				} //  for(   for par acantidades.

			} //  for(   for para almuerzos programados.

		// FIN - Creando un insert por cada almuerzo programado (for con cada almuerzo separado con el split anterior)

	} //  if(...    validaciones antes de empezar el proceso.

	if(vmsj1 == ""){vmsj1="Se grabó correctamente.";}
	var datos = {
		msj1: vmsj1,
		msj2: JSON.stringify(req.body, null, 2)
	};

	res.render('ver-pedido-recuperado', datos);
}

module.exports = controlador;