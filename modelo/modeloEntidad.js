var conexion = require('../conexiones/connMySQL');

var modelo = function(){};

// para página "Pedido" ------------------------------------
modelo.mostrarTipoEntidad = function(cb){
	conexion.query("select * from tipo_entidad where estado_tipo_ent = 1", cb);
}

module.exports = modelo;