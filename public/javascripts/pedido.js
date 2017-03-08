
var tx;
var n1;
var n2;

function elemento(e){
  //if (e.srcElement)
	  //tag = e.srcElement.tagName;
  //else if (e.target)

  	// obteniendo tag e id del elemento clickeado:
  	var tag = e.target.tagName;
  	var id = e.target.id;

  	// quitando primer caracter del id, porque ese es el código del input text:
    var idInputText = id.substring(1);
    
    // obteniendo primer caracter para saber que operacion efectuar:
    var operacion = id.substring(0, 1)

  	//alert("El elemento selecionado ha sido " + tag + "-" + id + "=" + idInputText + " oper:" + operacion);
  	if(id != 'null' && id != ''){  		

  		if(operacion == 's'){
  			aumenta(idInputText);
  		}else if(operacion == 'r'){
  			resta(idInputText);
  		}
	}
}

function aumenta(idInputText){

	tx = document.getElementById("" + idInputText).value;
	if(tx == ""){
		tx = 0;
	}

	n1 = parseInt(tx);
	n2 = parseInt(1);

	document.getElementById("h" + idInputText).value = n1 + n2;
	document.getElementById("" + idInputText).value = n1 + n2;
}

function resta(idInputText){

	tx = document.getElementById("" + idInputText).value;
	if(tx == ""){
		tx = 0;
	}

	n1 = parseInt(tx);
	n2 = parseInt(1);

	if(tx == 0){
		n2 = 0;
	}

	document.getElementById("h" + idInputText).value = n1 - n2;
	document.getElementById("" + idInputText).value = n1 - n2;
}

/*
$(document).ready(function(){
	alert("ok");

	$("#talmuerzos input").click(function(e){
		var id = e.target.id;
		alert(">" + id);
	});

});
*/