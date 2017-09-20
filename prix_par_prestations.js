function getPrixPrestationJSON(tag, id){
	xmlhttp=new XMLHttpRequest(); 
	xmlhttp.onreadystatechange=function(){   
		if (xmlhttp.readyState==4 && xmlhttp.status==200)
			getPrixPrestation(tag, xmlhttp.responseText)
	} 
	xmlhttp.open("POST","prix_par_prestation.php",true); 
	xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	xmlhttp.send("id="+id);
}



function getPrixPrestation(tag, json){
	$res = JSON.parse(json)
	$prix = $res['prix']

	$tr_children = tag.parentNode.parentNode.parentNode.children
	$tr_children[2].innerHTML = $prix + " €"

	$quantite = $tr_children[3].innerHTML

	$montant = $prix*$quantite;
	$tr_children[4].innerHTML = $montant + " €"
}


function updatePrixPrestation(tag, id){
	$tr_children = tag.parentNode.parentNode.parentNode.children

	$tr_children[0].innerHTML = id

	if (id != 0) getPrixPrestationJSON(tag, id)

	$tr_children[2].innerHTML = "0 €"

	updateBilan()
 
}

function updateBilan(){
	$tbody_children= document.getElementById("table_body").children

	$montant = 0

	for (var i = 0; i < $tbody_children.length; i++) {
		$children = $tbody_children[i].children
		$value = $children[4].innerHTML.split(' ')
		$montant += parseFloat($value[0])
		console.log($value)
	}

	document.getElementById("somme_value").innerHTML = $montant + " €";
}