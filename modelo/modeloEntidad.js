var conexion = require('../conexiones/connMySQL');

var modelo = function(){};

// para página Menú "Pedido" (registrar-pedido.ejs) ------------------------------------
modelo.mostrarEntidadesFiltradas = function(tipoEntidad, cb){
	conexion.query("select * from entidad where estado_ent = 1 and id_tipo_ent=? order by nombre_ent", tipoEntidad, cb)
}

// para página Menú "Pedido" (registrar-pedido.ejs) y página Menú "Registros" - "Entidades" (registrar-entidad.ejs) ------------------------------------
modelo.mostrarTipoEntidad = function(cb){
	conexion.query("select * from tipo_entidad where estado_tipo_ent = 1", cb);
}

// para página Menú "Pedido" (registrar-pedido.ejs) y página Menú "Registros" - "Entidades" (registrar-entidad.ejs) ------------------------------------
modelo.mostrarEntidades = function(cb){
	conexion.query("SELECT ee.id_ent, ee.id_tipo_ent, nombre_ent, nombre_tipo_ent FROM entidad ee LEFT JOIN tipo_entidad te ON ee.id_tipo_ent = te.id_tipo_ent WHERE ee.estado_ent = 1 ORDER BY ee.id_tipo_ent DESC, ee.nombre_ent", cb);
}

// para página Menú "Registro" - "Entidad" (registrar-entidad.ejs)
modelo.grabarEntidad = function(registro, cb){
	conexion.query("insert into entidad set ?", registro, cb);
}

// para página Menú "Registro" - "Entidad" (registrar-entidad.ejs)
modelo.borrarEntidad = function(IDs, cb){
	conexion.query("delete from entidad where id_ent = ? and id_tipo_ent = ?", [IDs.id_ent, IDs.id_tipo_ent], cb)
}

// para página Menú "Registro" - "Entidad" (registrar-entidad.ejs)
modelo.editaEntidad = function(registro, cb){
	conexion.query("update entidad set nombre_ent = ? where id_ent = ?", [registro.nombre_ent, registro.id_ent], cb);
}

module.exports = modelo;