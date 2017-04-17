var conexion = require('../conexiones/connMySQL');

var modelo = function(){};


// para página "Registros" - "Almuerzo programado" (registrar-almuerzo-programado.ejs) ------------------------------------
modelo.grabarAlmuerzoProg = function(registro, cb){
	conexion.query("insert into almuerzo_prog set ?", registro, cb);
}


// para página "Registros" - "Carta de hoy" (registrar-carta-por-fecha.ejs) ------------------------------------
modelo.mostrarTodosAlmuerzoProg = function(cb){
	conexion.query("SELECT id_alm_prog, ap.id_tipo_comida, nombre_alm_prog, nombre_tipo_comida FROM almuerzo_prog ap INNER JOIN tipo_comida tc ON ap.id_tipo_comida = tc.id_tipo_comida WHERE estado_alm_prog=1 ORDER BY id_tipo_comida, nombre_alm_prog", cb);
}

module.exports = modelo;