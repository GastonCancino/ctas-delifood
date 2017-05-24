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
modelo.consultarAlmuerzoDePedido = function(registro, cb){ // 
	conexion.query("select * from pedido where id_carta_x_fecha=? and id_alm_prog=? ", [registro.id_carta_x_fecha, registro.id_alm_prog], cb);
}

// para página "Registros" - "Entidad" (registrar-entidad.ejs) ------------------------------------
modelo.consultaEntidadEnPedidos = function(IdEntidad, cb){
	conexion.query("select * from pedido where id_ent = ?", IdEntidad, cb);
}


// para página "Consultas" - "Pedidos" (consulta-pedidos-por-fecha.ejs)
modelo.consultaPedidosPorFecha = function(Fecha, cb){
	var queryStr = "SELECT id_pedido, pe.id_carta_x_fecha, pe.id_alm_prog, nombre_alm_prog, SUM(cantidad_pedido) AS cantidad_pedido, precio_alm_prog, id_tipo_comida, tipo_precio_pedido, pe.id_ent, et.nombre_ent, fecha_reg_pedido ";
		queryStr += "FROM pedido pe LEFT JOIN almuerzo_prog ap ON pe.id_alm_prog = ap.id_alm_prog ";
		queryStr += "LEFT JOIN entidad et ON pe.id_ent = et.id_ent ";
		queryStr += "LEFT JOIN carta_x_fecha cf ON pe.id_carta_x_fecha = cf.id_carta_x_fecha AND pe.id_alm_prog = cf.id_alm_prog ";
		queryStr += "WHERE pe.id_carta_x_fecha = ? AND fecha_reg_pedido = ? ";
		queryStr += "GROUP BY nombre_ent, nombre_alm_prog, tipo_precio_pedido ";
		queryStr += "ORDER BY nombre_ent, nombre_alm_prog, tipo_precio_pedido ";

	conexion.query(queryStr, [Fecha, Fecha], cb);
}

module.exports = modelo;