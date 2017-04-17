var conexion = require('../conexiones/connMySQL');

var modelo = function(){};

// para página Menú "Pedido" (registrar-pedido.ejs) ------------------------------------
modelo.mostrarTipoEntidad = function(cb){
	conexion.query("select * from tipo_entidad where estado_tipo_ent = 1", cb);
}

// para página Menú "Pedido" (registrar-pedido.ejs) ------------------------------------
modelo.mostrarEntidadesFiltradas = function(tipoEntidad, cb){
	conexion.query("select * from entidad where estado_ent = 1 and id_tipo_ent=? order by nombre_ent", tipoEntidad, cb)
}

module.exports = modelo;