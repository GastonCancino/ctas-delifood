var conexion = require('../conexiones/connMySQL');

var modelo = function(){};

modelo.grabarAlmuerzoProg = function(registro, cb){
	conexion.query("insert into almuerzo_prog set ?", registro, cb);
}

modelo.mostrarTodosAlmuerzoProg = function(cb){
	conexion.query("select * from almuerzo_prog", cb);
}

module.exports = modelo;