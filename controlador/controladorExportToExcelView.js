var controlador = function(){};

controlador.vistaFiltros = function(req, res){
	
	var datos = {
		title                  : 'Cuentas Delifood',
		msjTipo                : 'info',
		msj1                   : ''
	}

	res.render('exportar-excel-view-filtros', datos);
}

module.exports = controlador;