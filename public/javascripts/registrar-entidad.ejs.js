/* ---------------------------------------------- */
/* archivo javascript por Guido Gaston Cancino E. */
/* ---------------------------------------------- */

// variables para las funciones pulsaEdit(obj) y generaLink(obj):
var objId;
var idNum;
// variables para la función function pulsaEdit(obj):
var objHrefEditOk; // icono check que servirá para confirmar los cambios.
var objInputEdit;
var objDivLabel;
var objDivLabelText;
var divErrorJavaScript;
// variables para la función generaLink(obj):
var linkHrefEditOk;

function pulsaEdit(obj){
	try{

		// Obteniendo el id del objeto pulsado:
		objId = obj.id;
		// Obteniendo el id de entidad para trabajar con otros objetos:
		idNum = objId.substr(8); // el id tiene la forma: "hrefEdit[id entidad]" por eso abstraemos desde la posición 8 en adelante.

		// capturar el icono check que servirá para confirmar los cambios.
		objHrefEditOk = document.getElementById('hrefEditOk' + idNum);

		// Capturar el span (muestra nombre de la entidad) y el input que servirá para modificar el nombre de la entidad:
		objDivLabel = document.getElementById('divLabelNombreEntidad' + idNum);
		objDivInputEdit = document.getElementById('divInputNombreEntidad' + idNum);
		objInputEdit = document.getElementById('txtNombreEntidad' + idNum);

		// Obteniendo el texto del span (nombre de la entidad):
		objDivLabelText = objDivLabel.innerHTML;
		objDivLabelText = objDivLabelText.trim();

		// mostrando u ocultando el input para editar el nombre de la entidad:
		if(objDivInputEdit.style.display == "none"){
			objDivLabel.style.display = "none";
			objDivInputEdit.style.display = "inline";
			objInputEdit.value = objDivLabelText;
			objHrefEditOk.style.display = "initial";

		} else{
			objDivLabel.style.display = "inline";
			objDivInputEdit.style.display = "none";
			objInputEdit.value = ""; // al ocultarse el input se limpia su valor.
			objHrefEditOk.style.display = "none";
		}

	}
	catch(err){
		document.getElementById("erroresJavaScript").style.display = "block";
		document.getElementById("erroresJavaScript").innerHTML = "Error en JavaScript creado por analista: " + err.message;
		//return false;
	}
	
}


function generaLink(obj){
	objId = obj.id;
	idNum = objId.substr(10); // el id tiene la forma "hrefEditOk[id entidad]" por eso abstraemos desde la posición 10 hacia adelante.
	//alert(obj.href);
	linkHrefEditOk = '/edita-entidad-de-tabla-maestra/' + idNum + '/' + document.getElementById('txtNombreEntidad' + idNum).value;
	obj.href = linkHrefEditOk;
	//return false;
}