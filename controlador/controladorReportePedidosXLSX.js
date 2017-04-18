//var modelo = require('../modelo/')

var controlador = function(){};

controlador.exportarExcel = function(req, res){

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
  			rgb: 'FF99CCFF'
  		}
  	},
  	font: {
  		sz: 11,
  		bold: true
  	},
  	alignment: {
  		horizontal: "center" //||"bottom"||"top"
  		//vertical: "bottom"||"center"||"top",
  		//wrapText: true || false
  		//readingOrder: 2 // for right-to-left
  		//textRotation: Number from 0 to 180 or 255 (default is 0)   ||   90 is rotated up 90 degrees    ||    45 is rotated up 45 degrees   ||    135 is rotated down 45 degrees   ||   180 is rotated down 180 degrees    ||    255 is special, aligned vertically
  	}
  },

  colorHeaderSubTitleCantxTipCons: {
  	fill: {
  		fgColor: {
  			rgb: 'FF99CCFF'
  		}
  	},
  	font: {
  		sz: 11,
  		bold: true
  	},
  	alignment: {
  		horizontal: "center" //||"bottom"||"top"
  	}
  },

  colorHeaderSubTitleCantxTipPag: {
  	fill: {
  		fgColor: {
  			rgb: 'FFFFCC99'
  		}
  	},
  	font: {
  		sz: 11,
  		bold: true
  	},
  	alignment: {
  		horizontal: "center" //||"bottom"||"top"
  	}
  },

  colorHeaderSubTitleCostxTipCons: {
  	fill: {
  		fgColor: {
  			rgb: 'FFCCFFCC'
  		}
  	},
  	font: {
  		sz: 11,
  		bold: true
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



  headerDark: {
    fill: {
      fgColor: {
        rgb: 'FF000000'
      }
    },
    font: {
      color: {
        rgb: 'FFFFFFFF'
      },
      sz: 14,
      bold: true,
      underline: true
    }
  },
  cellPink: {
    fill: {
      fgColor: {
        rgb: 'FFFFCCFF'
      }
    }
  },
  cellGreen: {
    fill: {
      fgColor: {
        rgb: 'FF00FF00'
      }
    }
  }
};
 
//Array of objects representing heading rows (very top) 
const heading = [
  //[{value: 'a1', style: styles.headerDark}, {value: 'b1', style: styles.headerDark}, {value: 'c1', style: styles.headerDark}],
  //['a2', 'b2', 'c2'] // <-- It can be only values 
  [''],
  ['', {value: 'Reporte de Pedidos', style: styles.colorHeaderTitle}],
  [''],
  ['','',{value: 'Cantidades por tipos de consumo', style: styles.colorHeaderSubTitleCantxTipCons},'','','',{value: 'Cantidades por tipo de pago', style: styles.colorHeaderSubTitleCantxTipPag},'','',{value: 'Costo por tipo de consumo', style: styles.colorHeaderSubTitleCostxTipCons}]
];
 
//Here you specify the export structure 
const specification = {
	misc: {
		displayName: '',
		headerStyle: [],
		width: 80
	},
  entidad_name: { // <- the key should match the actual data key 
    displayName: 'Entidad', // <- Here you specify the column header 
    headerStyle: styles.headerDatos1, // <- Header style 
    /*cellStyle: function(value, row) { // <- style renderer function 
      // if the status is 1 then color in green else color in red 
      // Notice how we use another cell value to style the current one 
      return (row.status_id == 1) ? styles.cellGreen : {fill: {fgColor: {rgb: 'FFFF0000'}}}; // <- Inline cell style is possible  
    },*/
    width: 120 // <- width in pixels 
  },
  cant_alm_prog: {
    displayName: 'Cant. Almuerzos prog.',
    headerStyle: styles.headerDatos1,
    /*cellFormat: function(value, row) { // <- Renderer function, you can access also any row.property 
      return (value == 1) ? 'Active' : 'Inactive';
    },*/
    width: 100 // <- width in chars (when the number is passed as string) 
  },
  cant_ensaladas: {
    displayName: 'Cant. Ensaladas',
    headerStyle: styles.headerDatos1,
    //cellStyle: styles.cellPink, // <- Cell style 
    width: 80 // <- width in pixels 
  },
  cant_postres: {
    displayName: 'Cant. Postres',
    headerStyle: styles.headerDatos1,
    //cellStyle: styles.cellPink, // <- Cell style 
    width: 60 // <- width in pixels 
  },
  cant_infaltables: {
    displayName: 'Cant. Los infaltables',
    headerStyle: styles.headerDatos1,
    //cellStyle: styles.cellPink, // <- Cell style 
    width: 80 // <- width in pixels 
  },
  cant_pagada: {
    displayName: 'Cant. Pagada',
    headerStyle: styles.headerDatos2,
    //cellStyle: styles.cellPink, // <- Cell style 
    width: 80 // <- width in pixels 
  },
  cant_credito: {
    displayName: 'Cant. Crédito',
    headerStyle: styles.headerDatos2,
    //cellStyle: styles.cellPink, // <- Cell style 
    width: 80 // <- width in pixels 
  },
  cant_gratis: {
    displayName: 'Cant. Gratis',
    headerStyle: styles.headerDatos2,
    //cellStyle: styles.cellPink, // <- Cell style 
    width: 80 // <- width in pixels 
  },
  cant_pagada_costo: {
    displayName: 'Cant. Pagada Costo',
    headerStyle: styles.headerDatos3,
    //cellStyle: styles.cellPink, // <- Cell style 
    width: 80 // <- width in pixels 
  },
  cant_credito_costo: {
    displayName: 'Cant. Crédito Costo',
    headerStyle: styles.headerDatos3,
    //cellStyle: styles.cellPink, // <- Cell style 
    width: 80 // <- width in pixels 
  },
  cant_gratis_costo: {
    displayName: 'Cant. Gratis Costo',
    headerStyle: styles.headerDatos3,
    //cellStyle: styles.cellPink, // <- Cell style 
    width: 80 // <- width in pixels 
  }
}
 
// The data set should have the following shape (Array of Objects) 
// The order of the keys is irrelevant, it is also irrelevant if the 
// dataset contains more fields as the report is build based on the 
// specification provided above. But you should have all the fields 
// that are listed in the report specification 
const dataset = [
  {misc: '', entidad_name: 'IBM', cant_alm_prog: 10, cant_ensaladas: 4, cant_postres: 1, cant_infaltables: 1, cant_pagada: 1, cant_credito: 1, cant_gratis: 1, cant_pagada_costo: 1, cant_credito_costo: 1, cant_gratis_costo: 1},
  {misc: '', entidad_name: 'HP', cant_alm_prog: 20, cant_ensaladas: 2, cant_postres: 1, cant_infaltables: 1, cant_pagada: 1, cant_credito: 1, cant_gratis: 1, cant_pagada_costo: 1, cant_credito_costo: 1, cant_gratis_costo: 1},
  {misc: '', entidad_name: 'MS', cant_alm_prog: 12, cant_ensaladas: 0, cant_postres: 1, cant_infaltables: 1, cant_pagada: 1, cant_credito: 1, cant_gratis: 1, cant_pagada_costo: 1, cant_credito_costo: 1, cant_gratis_costo: 1}
]
 
// Define an array of merges. 1-1 = A:1 
// The merges are independent of the data. 
// A merge will overwrite all data _not_ in the top-left cell. 
const merges = [
  //{ start: { row: 1, column: 1 }, end: { row: 1, column: 10 } },
  { start: { row: 2, column: 2 }, end: { row: 2, column: 14 } },
  { start: { row: 4, column: 3 }, end: { row: 4, column: 6 } },
  { start: { row: 4, column: 7 }, end: { row: 4, column: 9 } },
  { start: { row: 4, column: 10 }, end: { row: 4, column: 12 } }
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

module.exports = controlador;