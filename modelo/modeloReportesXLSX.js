var conexion = require('../conexiones/connMySQL');

var modelo = function(){};

modelo.consultaMasVotadosConFiltrosFecha = function(fechas, cb){
	var queryStr = "SELECT id_carta_x_fecha, ap.id_tipo_comida, tc.nombre_tipo_comida, ";
		queryStr += "ap.nombre_alm_prog, sum(pe.cantidad_pedido) as cantidad from pedido pe ";
		queryStr += "INNER JOIN almuerzo_prog ap ON pe.id_alm_prog = ap.id_alm_prog ";
		queryStr += "INNER JOIN tipo_comida tc ON ap.id_tipo_comida = tc.id_tipo_comida ";
		queryStr += "WHERE estado_pedido = 1 and id_carta_x_fecha between ? and ? ";
		queryStr += "GROUP BY ap.id_tipo_comida, tc.nombre_tipo_comida, ap.nombre_alm_prog ";
		queryStr += "ORDER BY id_carta_x_fecha, ap.id_tipo_comida, sum(pe.cantidad_pedido) desc, ap.nombre_alm_prog";

	conexion.query(queryStr, [fechas.fechaInicio, fechas.fechaFin], cb);
}

modelo.consultaPedidosConFiltrosFecha = function(fechas, cb){
	var queryStr = "SELECT id_pedido, id_carta_x_fecha, te.id_tipo_ent, te.nombre_tipo_ent, ee.nombre_ent, tc.id_tipo_comida, tc.nombre_tipo_comida, ";
		queryStr += "pe.id_alm_prog, ap.nombre_alm_prog, cantidad_pedido, ";
		queryStr += "tipo_precio_pedido, fecha_reg_pedido,  estado_pedido ";
		queryStr += "FROM pedido pe ";
		queryStr += "INNER JOIN almuerzo_prog ap ON pe.id_alm_prog = ap.id_alm_prog ";
		queryStr += "INNER JOIN tipo_comida tc ON ap.id_tipo_comida = tc.id_tipo_comida ";
		queryStr += "INNER JOIN entidad ee ON pe.id_ent = ee.id_ent ";
		queryStr += "INNER JOIN tipo_entidad te ON ee.id_tipo_ent = te.id_tipo_ent ";
		queryStr += "WHERE estado_pedido = 1 and id_carta_x_fecha between ? and ? ";
		queryStr += "ORDER BY id_carta_x_fecha, pe.id_ent, tipo_pedido, tc.id_tipo_comida";

	conexion.query(queryStr, [fechas.fechaInicio, fechas.fechaFin], cb);
}

module.exports = modelo;