var conexion = require('../conexiones/connMySQL');

var modelo = function(){};


// para página "Pedido" ------------------------------------
modelo.grabarPedidoAdmin = function(registro, cb){
	conexion.query("insert into pedido set ?", registro, cb);
}


// para página "Registros" - "Carta de hoy" ------------------------------------
modelo.consultarAlmuerzoDecarta = function(registro, cb){
	conexion.query("select * from pedido where id_carta_x_fecha=? and id_alm_prog=? ", [registro.id_carta_x_fecha, registro.id_alm_prog], cb);
}

module.exports = modelo;