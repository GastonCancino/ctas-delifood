var conexion = require('../conexiones/connMySQL');

var modelo = function(){};


// para página "Registros" - "Almuerzo programado" ------------------------------------
modelo.grabarAlmuerzoProg = function(registro, cb){
	conexion.query("insert into almuerzo_prog set ?", registro, cb);
}


// para página "Registros" - "Carta de hoy" ------------------------------------
modelo.mostrarTodosAlmuerzoProg = function(cb){
	conexion.query("select * from almuerzo_prog", cb);
}

module.exports = modelo;