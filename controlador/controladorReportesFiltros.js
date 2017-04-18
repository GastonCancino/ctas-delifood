var controlador = function(){};

controlador.vistaPedidosFiltros = function(req, res){
	
	var datos = {
		title                  : 'Cuentas Delifood',
		msjTipo                : 'info',
		msj1                   : ''
	}

	res.render('reporte-pedidos-filtros', datos);
}

controlador.vistaMasVotadosFiltros = function(req, res){
	
	var datos = {
		title                  : 'Cuentas Delifood',
		msjTipo                : 'info',
		msj1                   : ''
	}

	res.render('reporte-los-mas-votados-filtros', datos);
}

module.exports = controlador;