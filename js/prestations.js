function getPrestations(){
	xmlhttp=new XMLHttpRequest(); 
	xmlhttp.onreadystatechange=function(){   
		if (xmlhttp.readyState==4 && xmlhttp.status==200)
			fillTable(xmlhttp.responseText)
	} 
	xmlhttp.open("POST","prestations.php",true); 
	xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	xmlhttp.send();
}

function fillTable(json){
	$prestations = JSON.parse(json)
	$selects = document.getElementsByName("prestation_select")
	for (var i = 0; i < $selects.length; i++) {
		$string = '<option value="0">vide</option>'
		for (var j = 0; j < $prestations.length; j++) {
			$string += '<option value="' + $prestations[j]['codePrestation'] +'">'+ $prestations[j]['prestation'] +'</option>'
		}
		$selects[i].innerHTML = $string
		$string = ''
	}
}

window.onload = getPrestations()