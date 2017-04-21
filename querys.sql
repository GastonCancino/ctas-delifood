
-- mostrar carta de hoy:
SELECT id_carta_x_fecha, cf.id_alm_prog, ap.nombre_alm_prog, precio_alm_prog, 
	estado_carta_x_fecha, ap.id_tipo_comida, nombre_tipo_comida 
	FROM carta_x_fecha cf 
	INNER JOIN almuerzo_prog ap ON cf.id_alm_prog = ap.id_alm_prog 
	INNER JOIN tipo_comida tc ON ap.id_tipo_comida = tc.id_tipo_comida 
	WHERE estado_carta_x_fecha=1 AND id_carta_x_fecha='2017-04-17' ORDER BY ap.id_tipo_comida;
	
	
-- mostrar pedidos por fecha, tipo pedido y tipo comida:
SELECT id_pedido, id_carta_x_fecha, tipo_pedido, estado_pedido, pe.id_alm_prog, ap.nombre_alm_prog,
	cantidad_pedido, tipo_precio_pedido, ee.nombre_ent,
	fecha_reg_pedido, tc.id_tipo_comida, tc.nombre_tipo_comida
	FROM pedido pe 
	INNER JOIN almuerzo_prog ap ON pe.id_alm_prog = ap.id_alm_prog 
	INNER JOIN tipo_comida tc ON ap.id_tipo_comida = tc.id_tipo_comida 
	INNER JOIN entidad ee ON pe.id_ent = ee.id_ent
	ORDER BY fecha_reg_pedido, tipo_pedido, tc.id_tipo_comida;
	
	
-- mostrar pedidos por fecha, tipo de entidad, tipo pedido y tipo comida (reporte de pedidos):
SELECT id_pedido, pe.id_carta_x_fecha, te.id_tipo_ent, te.nombre_tipo_ent, ee.nombre_ent, tc.id_tipo_comida, tc.nombre_tipo_comida, 
	pe.id_alm_prog, ap.nombre_alm_prog, cantidad_pedido, cf.precio_alm_prog, 
	tipo_precio_pedido, fecha_reg_pedido, estado_pedido 
	FROM pedido pe 
	LEFT JOIN almuerzo_prog ap ON pe.id_alm_prog = ap.id_alm_prog 
	LEFT JOIN tipo_comida tc ON ap.id_tipo_comida = tc.id_tipo_comida 
	LEFT JOIN entidad ee ON pe.id_ent = ee.id_ent
	LEFT JOIN tipo_entidad te ON ee.id_tipo_ent = te.id_tipo_ent 
	LEFT JOIN carta_x_fecha cf ON pe.id_carta_x_fecha = cf.id_carta_x_fecha AND pe.id_alm_prog = cf.id_alm_prog 
	WHERE estado_pedido=1
	ORDER BY id_carta_x_fecha, pe.id_ent, tipo_pedido, tc.id_tipo_comida;


-- mostrar los platos más votados (reporte de los platos más votados):
SELECT 
	-- id_pedido, id_carta_x_fecha, pe.id_alm_prog, fecha_reg_pedido, 
	-- ap.id_tipo_comida, tc.nombre_tipo_comida, ap.nombre_alm_prog
	id_carta_x_fecha, ap.id_tipo_comida, tc.nombre_tipo_comida, 
	ap.nombre_alm_prog, sum(pe.cantidad_pedido) as cantidad
	from pedido pe
	LEFT JOIN almuerzo_prog ap ON pe.id_alm_prog = ap.id_alm_prog
	LEFT JOIN tipo_comida tc ON ap.id_tipo_comida = tc.id_tipo_comida
	WHERE estado_pedido=1 and id_carta_x_fecha between '2017-04-17' and '2017-04-17'
	GROUP BY ap.id_tipo_comida, tc.nombre_tipo_comida, ap.nombre_alm_prog
	ORDER BY id_carta_x_fecha, ap.id_tipo_comida, sum(pe.cantidad_pedido) desc, ap.nombre_alm_prog;