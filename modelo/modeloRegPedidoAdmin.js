var conexion = require('../conexiones/connMySQL');

var modelo = function(){};

modelo.grabarPedidoAdmin = function(registro, cb){
	conexion.query("insert into pedido set ?", registro, cb);
}

module.exports = modelo;