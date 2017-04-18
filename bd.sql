CREATE DATABASE /*!32312 IF NOT EXISTS*/`bdctas_delifood` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_spanish_ci */;

USE `bdctas_delifood`;

CREATE TABLE `tipo_entidad` (
  `id_tipo_ent` INT(4) NOT NULL AUTO_INCREMENT COMMENT 'ID tipo entidad',
  `nombre_tipo_ent` VARCHAR(200) COLLATE utf8_spanish_ci DEFAULT NULL COMMENT 'Nombre',
  `estado_tipo_ent` TINYINT(1) DEFAULT '1' COMMENT 'Estado',
  PRIMARY KEY  (`id_tipo_ent`)
) ENGINE=MYISAM AUTO_INCREMENT=0 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;


CREATE TABLE `entidad` (
  `id_ent` int(4) NOT NULL auto_increment COMMENT 'ID entidad',
  `id_tipo_ent` INT(4) NOT NULL COMMENT 'ID tipo entidad',
  `nombre_ent` varchar(200) collate utf8_spanish_ci default NULL COMMENT 'Nombre',
  `estado_ent` tinyint(1) default '1' COMMENT 'Estado',
  PRIMARY KEY  (`id_ent`, `id_tipo_ent`)
) ENGINE=MyISAM AUTO_INCREMENT=0 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;


CREATE TABLE `almuerzo_prog` (
  `id_alm_prog` int(10) NOT NULL auto_increment COMMENT 'ID almuerzo programado',
  `id_tipo_comida` int(4) NOT NULL COMMENT 'ID tipo de comida',
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
  `id_pedido` INT(15) NOT NULL AUTO_INCREMENT COMMENT 'ID del pedido',
  `id_carta_x_fecha` DATE NOT NULL COMMENT 'ID de la carta por fecha',
  `id_alm_prog` INT(10) NOT NULL COMMENT 'ID almuerzo programado',
  `id_ent` int(4) NOT NULL COMMENT 'ID entidad',
  `tipo_pedido` VARCHAR(20) COLLATE utf8_spanish_ci NOT NULL COMMENT 'Tipo de pedido hecho por Admin, por clientes desde Web o App',
  `cantidad_pedido` INT(5) NOT NULL COMMENT 'Cantidad de pedidos por almuerzo',
  `tipo_precio_pedido` VARCHAR(20) COLLATE utf8_spanish_ci NOT NULL COMMENT 'Tipo de precio(GRATIS, AL CREDITO, AL CONTADO)',
  `estado_pedido` TINYINT(1) DEFAULT '1' COMMENT 'Estado',
  `fecha_reg_pedido` DATE NOT NULL COMMENT 'Fecha en que se registró el nuevo pedido',
  PRIMARY KEY  (`id_pedido`)
) ENGINE=MYISAM DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;


CREATE TABLE `tipo_comida` (
  `id_tipo_comida` INT(4) NOT NULL AUTO_INCREMENT COMMENT 'ID tipo de comida',
  `nombre_tipo_comida` VARCHAR(200) COLLATE utf8_spanish_ci DEFAULT NULL COMMENT 'Nombre del tipo de comida',
  `estado_tipo_comida` TINYINT(1) DEFAULT '1' COMMENT 'Estado',
  PRIMARY KEY  (`id_tipo_comida`)
) ENGINE=MYISAM AUTO_INCREMENT=0 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

INSERT INTO tipo_comida(nombre_tipo_comida) VALUES('Almuerzos programados'),('Los infaltables'),('Ensaladas personalizadas'),('Postres');

INSERT INTO tipo_entidad(nombre_tipo_ent) VALUES('Persona'),('Empresa');

INSERT INTO entidad(id_tipo_ent, nombre_ent) VALUES(2,'BCP'), (2,'INV. LA CRUZ'), (2,'CLAVE 1'), (2,'CIBERGESTION'), (2,'SURA'), (2,'UNIQUE'), (1, 'DENIS THOMSON'), (1, 'TIFFANI THOMSON'), (1, 'MARCO THOMSON'), (1, 'PAMELA THOMSON'), (1, 'JAIR A&D'), (1, 'SARA PACHERRES SBC'), (1, 'PIERO ODEBRETCH'), (1, 'CESAR ALARICO ODEBRETCH'), (1, 'LORENA BCP'), (1, 'LUIS REATEGUI'), (1, 'JUAN MANUEL'), (1, 'KAREN BCP'), (1, 'NATALIA BCP'), (1, 'MARTA BCP'), (1, 'OSCAR BCP'), (1,'DIANA CLAVE 1'), (1,'GLADYS CLAVE 1'), (1,'BEATRIZ CIBERG.'), (1,'CARLOS ABARCA CIBERG.'), (1,'CAROLINA CIBERG.'), (1,'CECILIA CIBERG.'), (1,'CINTHYA CIBERG.'), (1,'IRMA CIBERG.'), (1,'KARLA CIBERG.'), (1,'ANDREA KAULOMA CIBERG.'), (1,'FIORELLA CIBERG.'), (1,'GABY CIBERG.'), (1,'GIAN CARLOS CIBERG.'), (1,'JENY CIBERG.'), (1,'JOSE CIBERG.'), (1,'KATERING CIBERG.'), (1,'LUZ CIBERG.'), (1,'MARIA TERESA CIBERG.'), (1,'ANA CIBERG.'), (1,'PATY CIBERG.'), (1,'DIEGO NAJARRO CIBERG.'), (1,'RENZO ALVARADO CIBERG.'), (1,'KATHIA DETT CIBERG.'), (1,'NEYSER CIBERG.'), (1,'WILLIAM CIBERG.'), (1,'FRANCISCO CIBERG.'), (1,'RAFAELA CIBERG.'), (1,'ROSITA CIBERG.'), (1,'PRISCILA CIBERG.'), (1,'MARILYN CIBERG.'), (1,'TOÑO CIBERG.'), (1,'PAOLA CIBERG.'), (1,'SARA CIBERG.'), (1,'DONNY CIBERG.'), (1,'LILIANA CIBERG.'), (1,'ROCIO LAUREANO CIBERG.'), (1,'FATIMA CIBERG.');