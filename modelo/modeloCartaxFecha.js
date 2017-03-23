var conexion = require('../conexiones/connMySQL');

var modelo = function(){}


// para página "Registros" - "Carta de hoy" ------------------------------------
modelo.mostrarCartaDeHoy = function(fecha, cb){
	conexion.query("select id_carta_x_fecha, cf.id_alm_prog, ap.nombre_alm_prog, precio_alm_prog, estado_carta_x_fecha from carta_x_fecha cf inner join almuerzo_prog ap on cf.id_alm_prog = ap.id_alm_prog where id_carta_x_fecha=?", fecha, cb);
};


// para página "Registros" - "Carta de hoy" ------------------------------------
modelo.agregarAlmuerzoAcarta = function(registro, cb){
	conexion.query("insert into carta_x_fecha set ?", registro, cb);
}


// para página "Registros" - "Carta de hoy" ------------------------------------
modelo.borrarAlmuerzoDecarta = function(registro, cb){
	conexion.query("delete from carta_x_fecha where id_carta_x_fecha=? and id_alm_prog=? ", [registro.id_carta_x_fecha, registro.id_alm_prog], cb);
}

module.exports = modelo;