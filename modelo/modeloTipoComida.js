var conexion = require('../conexiones/connMySQL');

modelo = function(){};

// para página Menú "Registros" - "Almuerzo Programado" (registrar-almuerzo-programado) ----------------------
modelo.mostrarTipoComida = function(cb){
	conexion.query("select * from tipo_comida where estado_tipo_comida = 1", cb);
};

module.exports = modelo;