var conexion = require('../conexiones/connMySQL');

var modelo = function(){}

modelo.mostrarCartaDeHoy = function(fecha, cb){
	conexion.query("select id_carta_x_fecha, cf.id_alm_prog, ap.nombre_alm_prog, precio_alm_prog, estado_carta_x_fecha from carta_x_fecha cf inner join almuerzo_prog ap on cf.id_alm_prog = ap.id_alm_prog where id_carta_x_fecha=?", fecha, cb);
};

module.exports = modelo;