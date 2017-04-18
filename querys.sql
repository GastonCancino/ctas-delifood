
-- mostrar carta de hoy:
SELECT id_carta_x_fecha, cf.id_alm_prog, ap.nombre_alm_prog, precio_alm_prog, 
	estado_carta_x_fecha, ap.id_tipo_comida, nombre_tipo_comida 
	FROM carta_x_fecha cf 
	INNER JOIN almuerzo_prog ap ON cf.id_alm_prog = ap.id_alm_prog 
	INNER JOIN tipo_comida tc ON ap.id_tipo_comida = tc.id_tipo_comida 
	WHERE estado_carta_x_fecha=1 AND id_carta_x_fecha='2017-04-17' ORDER BY ap.id_tipo_comida;
	
	
-- mostrar pedidos:
SELECT id_pedido, id_carta_x_fecha, tipo_pedido, estado_pedido, pe.id_alm_prog, ap.nombre_alm_prog,
	cantidad_pedido, tipo_precio_pedido, ee.nombre_ent,
	fecha_reg_pedido, tc.id_tipo_comida, tc.nombre_tipo_comida
	FROM pedido pe 
	INNER JOIN almuerzo_prog ap ON pe.id_alm_prog = ap.id_alm_prog 
	INNER JOIN tipo_comida tc ON ap.id_tipo_comida = tc.id_tipo_comida 
	INNER JOIN entidad ee ON pe.id_ent = ee.id_ent
	ORDER BY fecha_reg_pedido, tipo_pedido, tc.id_tipo_comida;