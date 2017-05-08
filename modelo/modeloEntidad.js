var conexion = require('../conexiones/connMySQL');

var modelo = function(){};

// para página Menú "Pedido" (registrar-pedido.ejs) y página Menú "Registros" - "Entidades" (registrar-entidad.ejs) ------------------------------------
modelo.mostrarTipoEntidad = function(cb){
	conexion.query("select * from tipo_entidad where estado_tipo_ent = 1", cb);
}

// para página Menú "Pedido" (registrar-pedido.ejs) y página Menú "Registros" - "Entidades" (registrar-entidad.ejs) ------------------------------------
modelo.mostrarEntidades = function(cb){
	conexion.query("SELECT ee.id_ent, ee.id_tipo_ent, nombre_ent, nombre_tipo_ent FROM entidad ee LEFT JOIN tipo_entidad te ON ee.id_tipo_ent = te.id_tipo_ent WHERE ee.estado_ent = 1 ORDER BY ee.id_tipo_ent DESC, ee.nombre_ent", cb);
}

// para página Menú "Pedido" (registrar-pedido.ejs) ------------------------------------
modelo.mostrarEntidadesFiltradas = function(tipoEntidad, cb){
	conexion.query("select * from entidad where estado_ent = 1 and id_tipo_ent=? order by nombre_ent", tipoEntidad, cb)
}

module.exports = modelo;