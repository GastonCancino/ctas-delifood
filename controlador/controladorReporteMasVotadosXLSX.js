var modelo = require('../modelo/modeloReportesXLSX');

var controlador = function(){};

controlador.exportarExcel = function(req, res){


    var fechas = {
      fechaInicio :    req.body.lstFechaInicio,
      fechaFin    :    req.body.lstFechaFin
    }


    // INICIO ------------------- formatear y mostrar fecha
    fecini = req.body.lstFechaInicio;
    fecfin = req.body.lstFechaFin;
    var diaI, mesI, anioI, diaF, mesF, anioF;
    diaI  = fecini.substr(8,2);
    mesI  = fecini.substr(5,2);
    anioI = fecini.substr(0,4);

    diaF  = fecfin.substr(8,2);
    mesF  = fecfin.substr(5,2);
    anioF = fecfin.substr(0,4);

    var meses = new Object();
    var meses = {"0": "Nada", "01": "Enero", "02": "Febrero", "03": "Marzo", "04": "Abril", "05": "Mayo", "06": "Junio", "07": "Julio", "08": "Agosto", "09": "Septiembre", "10": "Octubre", "11": "Noviembre", "12": "Diciembre"};
    var nombreMesI = meses[mesI];
    var nombreMesF = meses[mesF];
    var complementoTituloReporte = '';


    if(anioI != anioF){
        complementoTituloReporte = ' del ' + diaI + ' de ' + nombreMesI + ' del ' + anioI + '   hasta el ' + diaF + ' de ' + nombreMesF + ' del ' + anioF;
        
    } else{
        if(nombreMesI == nombreMesF){
            complementoTituloReporte = ' del ' + diaI + ' hasta el ' + diaF + ' de ' + nombreMesF + ' del ' + anioF;
        } else{
            complementoTituloReporte = ' del ' + diaI + ' de ' + nombreMesI + ' hasta el ' + diaF + ' de ' + nombreMesF + ' del ' + anioF;
        }
    }
    // FIN ------------------- formatear y mostrar fecha


    modelo.consultaMasVotadosConFiltrosFecha(fechas, function(err, registrosMasVotados){
          if(err){

              var datos = {
                  title                  : 'Cuentas Delifood',
                  msjTipo                : 'danger',
                  msj1                   : 'No se pudieron traer los datos, error: ' + err
                }

                res.render('reporte-los-mas-votados-filtros', datos);

                } else{

                  var filaInicio = 5; // desde aquí se comienza a poblar el excel dinamicamente.
                  var fila = 0;       // variable para el orden del arreglo e indicar fila de registro.
                  var celC = 0;       // variable solo para el orden del arreglo de celdas combinadas.
                  var reg = 0;        // contador de registros total.

                  // 
                  var arrCeldasCombinadas = []; // { start: { row: 2, column: 2 }, end: { row: 2, column: 3 } },
                  arrCeldasCombinadas[celC] = { start: { row: 2, column: 2 }, end: { row: 2, column: 3 } };

                  celC += 1; // variable solo para el orden del arreglo de celdas combinadas.

                  // creando el objeto que servirá como nuestro dataset o conjunto de registros de la base de datos
                  var arrItemsMasVotados = [];
                  var idTipoComidaAnterior = 0;

                  registrosMasVotados.forEach(function(registro){

                      reg += 1;

                      if(fila == 0){  // para tener el primer tipo de comida en duro solo al inicio.

                          idTipoComidaAnterior = registro.id_tipo_comida;
                          arrItemsMasVotados[fila] = {misc: '.', plato: registro.nombre_tipo_comida, cantidad: ''}; // creando fila vacía.

                          arrCeldasCombinadas[celC] = { start: { row: filaInicio, column: 2 }, end: { row: filaInicio, column: 3 } };

                          fila += 1; // variable para el orden del arreglo e indicar fila de registro.
                          
                      };

                      if(fila > 0){ // la primera vez no entrará.
                          if(idTipoComidaAnterior != registro.id_tipo_comida){ // si cambió de tipo de comida dejar una línea en blanco.
                            
                            celC += 1; // variable solo para el orden del arreglo de celdas combinadas.

                            idTipoComidaAnterior = registro.id_tipo_comida;
                            arrItemsMasVotados[fila] = {misc: '.', plato: registro.nombre_tipo_comida, cantidad: ''}; // creando fila vacía.

                            arrCeldasCombinadas[celC] = { start: { row: filaInicio+reg, column: 2 }, end: { row: filaInicio+reg, column: 3 } };

                            reg += 1;
                            fila += 1; // variable para el orden del arreglo e indicar fila de registro.
                          }
                      }

                      // generando array de objetos con los registros de la base de datos
                      arrItemsMasVotados[fila] = {misc: '', plato: registro.nombre_alm_prog, cantidad: registro.cantidad};
                      fila += 1;
                      
                  });

                  //console.log(arrItemsMasVotados);

                  crearExcel(arrItemsMasVotados, arrCeldasCombinadas);

                }
    });


    function crearExcel(vDataSet, celdasCombinadas){
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

            colorHeaderSubTitle: {
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
            	/*border: {
                  style: "thick", 
                  color: { rgb: "FF000000" }
                }*/
            },

            regDatosString: {
              font: {
                sz: 11,
                bold: false
              },
            },

            regDatosNumberInt: {
              font: {
                sz: 11,
                bold: false
              },
              numFmt: "0"
            }

          };
           
          //Array of objects representing heading rows (very top) 
          const heading = [
            //[{value: 'a1', style: styles.headerDark}, {value: 'b1', style: styles.headerDark}, {value: 'c1', style: styles.headerDark}],
            //['a2', 'b2', 'c2'] // <-- It can be only values 
            [''],
            ['', {value: 'Reporte de los más consumidos' + complementoTituloReporte, style: styles.colorHeaderTitle}],
            [''],
          ];
           
          //Here you specify the export structure 
          const specification = {
          	misc: {
          		displayName: '',
          		headerStyle: [],
          		width: 80
          	},
            plato: { // <- the key should match the actual data key 
              displayName: 'Plato', // <- Here you specify the column header 
              headerStyle: styles.colorHeaderSubTitle, // <- Header style 
              cellStyle: function(value, row) { // <- style renderer function 
                // if the status is 1 then color in green else color in red 
                // Notice how we use another cell value to style the current one 
                //return (row.status_id == ".") ? styles.cellGreen : {fill: {fgColor: {rgb: 'FFFF0000'}}}; // <- Inline cell style is possible  
                return (row.misc == ".") ? styles.headerDatos1 : styles.regDatosString; // <- Inline cell style is possible  
              },
              width: 450 // <- width in pixels 
            },
            cantidad: {
              displayName: 'Cantidad',
              headerStyle: styles.colorHeaderSubTitle,
              cellStyle: function(value, row) { // <- style renderer function 
                // if the status is 1 then color in green else color in red 
                // Notice how we use another cell value to style the current one 
                //return (row.status_id == ".") ? styles.cellGreen : {fill: {fgColor: {rgb: 'FFFF0000'}}}; // <- Inline cell style is possible  
                return (row.misc == ".") ? styles.headerDatos1 : styles.regDatosNumberInt; // <- Inline cell style is possible  
              },
              /*cellFormat: function(value, row) { // <- Renderer function, you can access also any row.property 
                return (value == 1) ? 'Active' : 'Inactive';
              },*/
              width: 60 // <- width in chars (when the number is passed as string) 
            }
          }
           
          // The data set should have the following shape (Array of Objects) 
          // The order of the keys is irrelevant, it is also irrelevant if the 
          // dataset contains more fields as the report is build based on the 
          // specification provided above. But you should have all the fields 
          // that are listed in the report specification 
          const dataset = vDataSet; /* [
            {misc: '', plato: 'Lomo saltado', cantidad: 10},
            {misc: '', plato: 'Lentejas con lomito al jugo', cantidad: 5},
            {misc: '', plato: 'Pescado a la menier', cantidad: 7},
            {misc: '', plato: 'Bisteck a la pimienta', cantidad: 2},
          ] */


          // Define an array of merges. 1-1 = A:1 
          // The merges are independent of the data. 
          // A merge will overwrite all data _not_ in the top-left cell. 
          const merges = celdasCombinadas; /* [
            //{ start: { row: 2, column: 2 }, end: { row: 2, column: 3 } },
          ] */

          //console.log(merges);
           
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

    }    // FIN   function crearExcel(vdataset)



    	/*var fec = req.body.lstFechaInicio;

    	var datos = {
    		title                  : 'Cuentas Delifood',
    		msjTipo                : 'info',
    		msj1                   : 'Ok ' + fec,
    		lstFechaInicio         : req.body.lstFechaInicio
    	}

    	res.render('exportar-excel-view-filtros', datos);*/

}   //  FIN    controlador.exportarExcel

module.exports = controlador;