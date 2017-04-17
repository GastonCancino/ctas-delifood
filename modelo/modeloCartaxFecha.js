var conexion = require('../conexiones/connMySQL');

var modelo = function(){};


// para página "Registros" - "Carta de hoy" (registrar-carta-por-fecha.ejs) ------------------------------------
modelo.mostrarCartaDeHoy = function(fecha, cb){
	conexion.query("SELECT id_carta_x_fecha, cf.id_alm_prog, ap.nombre_alm_prog, precio_alm_prog, estado_carta_x_fecha, ap.id_tipo_comida, nombre_tipo_comida FROM carta_x_fecha cf INNER JOIN almuerzo_prog ap ON cf.id_alm_prog = ap.id_alm_prog INNER JOIN tipo_comida tc ON ap.id_tipo_comida = tc.id_tipo_comida WHERE estado_carta_x_fecha=1 AND id_carta_x_fecha=? ORDER BY ap.id_tipo_comida", fecha, cb);
};


// para página "Registros" - "Carta de hoy" (registrar-carta-por-fecha.ejs) ------------------------------------
modelo.agregarAlmuerzoAcarta = function(registro, cb){
	conexion.query("insert into carta_x_fecha set ?", registro, cb);
}


// para página "Registros" - "Carta de hoy" (registrar-carta-por-fecha.ejs) ------------------------------------
modelo.borrarAlmuerzoDecarta = function(registro, cb){
	conexion.query("delete from carta_x_fecha where id_carta_x_fecha=? and id_alm_prog=? ", [registro.id_carta_x_fecha, registro.id_alm_prog], cb);
}

module.exports = modelo;