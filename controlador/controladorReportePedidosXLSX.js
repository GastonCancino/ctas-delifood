var modelo = require('../modelo/modeloReportesXLSX');

var controlador = function(){};

controlador.exportarExcel = function(req, res){

    var fechas = {
      fechaInicio :    req.body.lstFechaInicio,
      fechaFin    :    req.body.lstFechaFin
    }

    modelo.consultaPedidosConFiltrosFecha(fechas, function(err, registrosPedidos){
        if(err){
            var datos = {
                  title                  : 'Cuentas Delifood',
                  msjTipo                : 'danger',
                  msj1                   : 'No se pudieron traer los datos, error: ' + err
                }

                res.render('reporte-pedidos-filtros', datos);
        } else{
            crearExcel();
        }
    });

    function crearExcel(){

        //"use strict";

        const excel = require('node-excel-export');
         
        // You can define styles as json object 
        // More info: https://github.com/protobi/js-xlsx#cell-styles 
        const styles = {
          headerEmpty: {
          	fill: {
          		fgColor: {
          			rgb: ''
          		}
          	},
          	font: {

          	}
          },

          colorHeaderTitle: {
          	fill: {
          		fgColor: {
          			rgb: 'FF0066CC'
          		}
          	},
          	font: {
          		sz: 11,
          		bold: true,
              color: { rgb: "FFFFFFFF" }
          	},
          	alignment: {
          		horizontal: "center" //||"bottom"||"top"
          		//vertical: "bottom"||"center"||"top",
          		//wrapText: true || false
          		//readingOrder: 2 // for right-to-left
          		//textRotation: Number from 0 to 180 or 255 (default is 0)   ||   90 is rotated up 90 degrees    ||    45 is rotated up 45 degrees   ||    135 is rotated down 45 degrees   ||   180 is rotated down 180 degrees    ||    255 is special, aligned vertically
          	}
          },

          headerDatos1: {
            fill: {
              fgColor: {
                rgb: 'FF99CCFF'
              }
            },
          	font: {
          		sz: 11,
          		bold: false
          	},
          	alignment: {
          		horizontal: "center", // ||"bottom"||"top"
          		vertical: "center",   // ||"bottom"||"top"
          		wrapText: true
          	},
          },

          regDatos: {
            font: {
              sz: 11,
              bold: false
            },
          },

          headerDatos2: {
          	fill: {
          		fgColor: {
          			rgb: 'FFFFCC99'
          		}
          	},
          	font: {
          		sz: 11,
          		bold: false
          	},
          	alignment: {
          		horizontal: "center", // ||"bottom"||"top"
          		vertical: "center",   // ||"bottom"||"top"
          		wrapText: true
          	}
          },

          headerDatos3: {
          	fill: {
          		fgColor: {
          			rgb: 'FFCCFFCC'
          		}
          	},
          	font: {
          		sz: 11,
          		bold: false
          	},
          	alignment: {
          		horizontal: "center", // ||"bottom"||"top"
          		vertical: "center",   // ||"bottom"||"top"
          		wrapText: true
          	}
          },

        };
         
        //Array of objects representing heading rows (very top) 
        const heading = [
          //[{value: 'a1', style: styles.headerDark}, {value: 'b1', style: styles.headerDark}, {value: 'c1', style: styles.headerDark}],
          //['a2', 'b2', 'c2'] // <-- It can be only values 
          [''],
          ['', {value: 'Reporte de Pedidos', style: styles.colorHeaderTitle}],
          //[''],
          //['','',{value: 'Cantidades por tipos de consumo', style: styles.colorHeaderSubTitleCantxTipCons},'','','',{value: 'Cantidades por tipo de pago', style: styles.colorHeaderSubTitleCantxTipPag},'','',{value: 'Costo por tipo de consumo', style: styles.colorHeaderSubTitleCostxTipCons}]
        ];
         
        //Here you specify the export structure 
        const specification = {
          misc: {
            displayName: '',
            headerStyle: [],
            width: 80,
          },
        	id_carta_x_fecha: {
        		displayName: 'Fecha de la Carta',
        		headerStyle: styles.headerDatos1,
        		width: 80,
            cellStyle: styles.regDatos
        	},
          nombre_tipo_ent: { // <- the key should match the actual data key 
            displayName: 'Tipo de Entidad', // <- Here you specify the column header 
            headerStyle: styles.headerDatos1, // <- Header style 
            /*cellStyle: function(value, row) { // <- style renderer function 
              // if the status is 1 then color in green else color in red 
              // Notice how we use another cell value to style the current one 
              return (row.status_id == 1) ? styles.cellGreen : {fill: {fgColor: {rgb: 'FFFF0000'}}}; // <- Inline cell style is possible  
            },*/
            width: 80, // <- width in pixels 
            cellStyle: styles.regDatos
          },
          nombre_ent: {
            displayName: 'Nombre de Entidad',
            headerStyle: styles.headerDatos1,
            /*cellFormat: function(value, row) { // <- Renderer function, you can access also any row.property 
              return (value == 1) ? 'Active' : 'Inactive';
            },*/
            width: 250, // <- width in chars (when the number is passed as string) 
            cellStyle: styles.regDatos
          },
          nombre_tipo_comida: {
            displayName: 'Tipo de Plato',
            headerStyle: styles.headerDatos1,
            //cellStyle: styles.cellPink, // <- Cell style 
            width: 180, // <- width in pixels 
            cellStyle: styles.regDatos
          },
          nombre_alm_prog: {
            displayName: 'Plato',
            headerStyle: styles.headerDatos1,
            //cellStyle: styles.cellPink, // <- Cell style 
            width: 250, // <- width in pixels 
            cellStyle: styles.regDatos
          },
          cantidad_pedido: {
            displayName: 'Cantidad del Pedido',
            headerStyle: styles.headerDatos1,
            //cellStyle: styles.cellPink, // <- Cell style 
            width: 60, // <- width in pixels 
            cellStyle: styles.regDatos
          },
          tipo_precio_pedido: {
            displayName: 'Forma de Pago',
            headerStyle: styles.headerDatos1,
            //cellStyle: styles.cellPink, // <- Cell style 
            width: 100, // <- width in pixels 
            cellStyle: styles.regDatos
          },
          fecha_reg_pedido: {
            displayName: 'Fecha de Registro',
            headerStyle: styles.headerDatos1,
            //cellStyle: styles.cellPink, // <- Cell style 
            width: 80, // <- width in pixels 
            cellStyle: styles.regDatos
          }

        }
         
        // The data set should have the following shape (Array of Objects) 
        // The order of the keys is irrelevant, it is also irrelevant if the 
        // dataset contains more fields as the report is build based on the 
        // specification provided above. But you should have all the fields 
        // that are listed in the report specification 
        const dataset = [
          {misc: '', id_carta_x_fecha: '2017-04-17', nombre_tipo_ent: 'Empresa', nombre_ent: 'SURA', nombre_tipo_comida: 'Almuerzos programados', nombre_alm_prog: 'Ají de gallina', cantidad_pedido: 1, tipo_precio_pedido: 'AL CONTADO', fecha_reg_pedido: '2017-04-17'},
          {misc: '', id_carta_x_fecha: '2017-04-17', nombre_tipo_ent: 'Persona', nombre_ent: 'ANDREA KAULOMA CIBERG.', nombre_tipo_comida: 'Almuerzos programados', nombre_alm_prog: 'Bisteck a la pimienta', cantidad_pedido: 1, tipo_precio_pedido: 'AL CREDITO', fecha_reg_pedido: '2017-04-17'},
        ]
         
        // Define an array of merges. 1-1 = A:1 
        // The merges are independent of the data. 
        // A merge will overwrite all data _not_ in the top-left cell. 
        const merges = [
          //{ start: { row: 1, column: 1 }, end: { row: 1, column: 10 } },
          { start: { row: 2, column: 2 }, end: { row: 2, column: 9 } },
          /*{ start: { row: 4, column: 3 }, end: { row: 4, column: 6 } },
          { start: { row: 4, column: 7 }, end: { row: 4, column: 9 } },
          { start: { row: 4, column: 10 }, end: { row: 4, column: 12 } }*/
        ]
         
        // Create the excel report. 
        // This function will return Buffer 
        const report = excel.buildExport(
          [ // <- Notice that this is an array. Pass multiple sheets to create multi sheet report 
            {
              name: 'Report', // <- Specify sheet name (optional) 
              heading: heading, // <- Raw heading array (optional) 
              merges: merges, // <- Merge cell ranges 
              specification: specification, // <- Report specification 
              data: dataset // <-- Report data 
            }
          ]
        );
         
        // You can then return this straight 
        res.attachment('report.xlsx'); // This is sails.js specific (in general you need to set headers) 
        return res.send(report);
         
        // OR you can save this buffer to the disk by creating a file.



        	/*var fec = req.body.lstFechaInicio;

        	var datos = {
        		title                  : 'Cuentas Delifood',
        		msjTipo                : 'info',
        		msj1                   : 'Ok ' + fec,
        		lstFechaInicio         : req.body.lstFechaInicio
        	}

        	res.render('exportar-excel-view-filtros', datos);*/
    }
}

module.exports = controlador;