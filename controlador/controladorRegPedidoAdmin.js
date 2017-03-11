var modeloRegPedidoAdmin = require('../modelo/modeloRegPedidoAdmin');

var controlador = function(){};

controlador.tomarPedido = function(req, res){
	

	var datos = {
		msj1 : 'Ok todo continua',
		msj2 : JSON.stringify(req.body, null, 2)
	};

	//console.log("--->" + JSON.stringify(req.body, null, 2));
	//console.log("-->" + res.json(req.body));
	//console.log("--->" + req.body);

	var jsonFormInputs = JSON.stringify(req.body, null, 2); //res.json(req.body); //
	var parseFormInputs = JSON.parse(jsonFormInputs);

	var obj = [JSON.parse(jsonFormInputs)]; // [JSON.parse(jsonFormInputs)];
	var keys = Object.keys(obj);
	var valor;

	//var registro = {
		for(var i = 0; i < keys.length; i++){
			valor = obj[keys[i]];
			console.log(obj[keys[i]]);
		}
	//}

	
	// obtener los keys o atributos de un objeto json o arreglo.

	// Forma 1:
	var parseFormInputs = JSON.parse(jsonFormInputs);

	for(var atr in parseFormInputs){
		console.log(atr);
		if(atr == "id_carta_x_fecha"){
			console.log("ok");
		}
	}
	/*

	// Forma 2:
	var objetoInp = [JSON.parse(parseFormInputs)];

	for(var key in objetoInp[0]){
		console.log(key);
	}
	*/

	/*modeloRegPedidoAdmin.grabar(registro, function(err){
		if(err){
			console.log("Error no se pudo grabar el pedido, error: " + err);
		}else{

		}
	});*/


	res.render('ver-pedido-recuperado', datos);
}

module.exports = controlador;