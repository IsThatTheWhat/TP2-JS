function getPrixPrestationJSON(select_id, prestation_id){
	xmlhttp=new XMLHttpRequest(); 
	xmlhttp.onreadystatechange=function(){   
		if (xmlhttp.readyState==4 && xmlhttp.status==200)
			getPrixPrestation(select_id, xmlhttp.responseText)
	} 
	xmlhttp.open("POST","php/prix_par_prestation.php",true);
	xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	xmlhttp.send("id="+prestation_id);
}



function getPrixPrestation(select_id, json){
	$res = JSON.parse(json)
	$prix = $res['prix']

    $prix_prestation = document.getElementById("prix_prestation_"+select_id).innerHTML = $prix + " €"

    $quantite = document.getElementById("quantite_"+select_id).value
	if (parseFloat($quantite)) {
        $montant = $prix * parseFloat($quantite);
        document.getElementById("total_ligne_"+select_id).innerHTML = $montant + " €"
	}

	updateBilan()
}


function updatePrixPrestation(select_id, prestation_id){

    document.getElementById("prestation_id_"+select_id).innerHTML = prestation_id

	if (prestation_id != 0) getPrixPrestationJSON(select_id, prestation_id)
}

function updateBilan(){
	$tbody_children= document.getElementById("table_body").children
	$montant = 0

	for (var i = 0; i < $tbody_children.length; i++) {
        $value = document.getElementById("total_ligne_"+(i+1)).innerHTML.split(' ')
		$montant += parseFloat($value[0])
	}
    document.getElementById("somme").innerHTML = $montant + " €";

    $remise = document.getElementById("remise").innerHTML.split(' ')
    $remise = 1 - parseFloat($remise[0])/100

    $total = $montant * $remise

    document.getElementById("total").innerHTML = $total.toFixed(2) + " €";
}

function updateLigne(select_id, value){
	value = parseInt(value)
    $prix_prestation = document.getElementById("prix_prestation_"+select_id).innerHTML.split(' ')
	$prix_prestation = $prix_prestation[0]
	$montant = $prix_prestation * value
    document.getElementById("total_ligne_"+select_id).innerHTML = $montant + " €"

    updateBilan()
}