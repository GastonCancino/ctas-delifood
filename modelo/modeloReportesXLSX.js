var conexion = require('../conexiones/connMySQL');

var modelo = function(){};

modelo.consultaMasVotadosConFiltrosFecha = function(fechas, cb){
	console.log("---------------> OK");
	conexion.query("SELECT id_carta_x_fecha, ap.id_tipo_comida, tc.nombre_tipo_comida, ap.nombre_alm_prog, sum(pe.cantidad_pedido) as cantidad from pedido pe INNER JOIN almuerzo_prog ap ON pe.id_alm_prog = ap.id_alm_prog INNER JOIN tipo_comida tc ON ap.id_tipo_comida = tc.id_tipo_comida WHERE estado_pedido=1 and id_carta_x_fecha between ? and ? GROUP BY ap.id_tipo_comida, tc.nombre_tipo_comida, ap.nombre_alm_prog ORDER BY id_carta_x_fecha, sum(pe.cantidad_pedido) desc;", [fechas.fechaInicio, fechas.fechaFin], cb);
	console.log("---------------> OK 2");
}

module.exports = modelo;