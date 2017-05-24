var mysql = require("mysql"),
	opciones = {
		host: "127.0.0.1", //localhost
		port: "3306",
		user: "root",
		password: "root",
		database: "bdctas_delifood"
	};

function fnConectado(err){
	if(err){
		console.log(">>> Error:" + err);
	}else{
		console.log("<<< MySQL conectado, PID:" + conexion.threadId);
	}
}

var conexion = mysql.createConnection(opciones);
conexion.connect(fnConectado);

// exportando este modulo creado, para ser usado desde los archivos "modelo[Nombre].js"
module.exports = conexion