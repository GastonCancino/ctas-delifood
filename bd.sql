CREATE DATABASE /*!32312 IF NOT EXISTS*/`bdctas_delifood` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_spanish_ci */;

USE `bdctas_delifood`;

CREATE TABLE `entidad` (
  `id_ent` int(10) NOT NULL auto_increment COMMENT 'ID entidad',
  `nombre_ent` varchar(200) collate utf8_spanish_ci default NULL COMMENT 'Nombre',
  `estado_ent` tinyint(1) default '1' COMMENT 'Estado',
  PRIMARY KEY  (`id_ent`)
) ENGINE=MyISAM AUTO_INCREMENT=0 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;


CREATE TABLE `almuerzo_prog` (
  `id_alm_prog` int(10) NOT NULL auto_increment COMMENT 'ID almuerzo programado',
  `nombre_alm_prog` varchar(200) collate utf8_spanish_ci default NULL COMMENT 'Nombre',
  `estado_alm_prog` tinyint(1) default '1' COMMENT 'Estado',
  PRIMARY KEY  (`id_alm_prog`)
) ENGINE=MyISAM AUTO_INCREMENT=0 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;


CREATE TABLE `carta_x_fecha` (
  `id_carta_x_fecha` date NOT NULL COMMENT 'ID de la carta por fecha',
  `id_alm_prog` int(10) NOT NULL COMMENT 'ID almuerzo programado',
  `precio_alm_prog` numeric(6,2) NOT NULL COMMENT 'Precio del almuerzo para ese día (para esa carta, acordarse que la carta es por día)',
  `estado_carta_x_fecha` tinyint(1) default '1' COMMENT 'Estado',
  PRIMARY KEY  (`id_carta_x_fecha`,`id_alm_prog`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;


CREATE TABLE `pedido` (
  `id_pedido` int(15) NOT NULL auto_increment COMMENT 'ID del pedido',
  `id_carta_x_fecha` date NOT NULL COMMENT 'ID de la carta por fecha',
  `id_alm_prog` int(10) NOT NULL COMMENT 'ID almuerzo programado',
  `tipo_pedido` varchar(20) collate utf8_spanish_ci NOT NULL COMMENT 'Tipo de pedido hecho por Admin, por clientes desde Web o App',
  `estado_pedido` tinyint(1) default '1' COMMENT 'Estado',
  PRIMARY KEY  (`id_pedido`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;