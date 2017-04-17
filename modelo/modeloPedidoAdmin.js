var conexion = require('../conexiones/connMySQL');

var modelo = function(){};


// para página "Pedido" (registrar-pedido.ejs) ------------------------------------
modelo.mostrarCartaDeHoy = function(fechaHoy, cb){
	conexion.query("SELECT id_carta_x_fecha, cf.id_alm_prog, precio_alm_prog, nombre_alm_prog, ap.id_tipo_comida, nombre_tipo_comida FROM carta_x_fecha cf INNER JOIN almuerzo_prog ap ON cf.id_alm_prog = ap.id_alm_prog INNER JOIN tipo_comida tc ON ap.id_tipo_comida = tc.id_tipo_comida WHERE id_carta_x_fecha=? and estado_carta_x_fecha = 1 ORDER BY ap.id_tipo_comida, nombre_alm_prog", fechaHoy, cb);
}

modelo.grabarPedidoAdmin = function(registro, cb){
	conexion.query("insert into pedido set ?", registro, cb);
}



// para página "Registros" - "Carta de hoy" (registrar-carta-por-fecha.ejs) ------------------------------------
modelo.consultarAlmuerzoDecarta = function(registro, cb){
	conexion.query("select * from pedido where id_carta_x_fecha=? and id_alm_prog=? ", [registro.id_carta_x_fecha, registro.id_alm_prog], cb);
}

module.exports = modelo;