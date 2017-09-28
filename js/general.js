$(function () {
    $(document).ready(function() {
        document.getElementById('ajout_ligne').addEventListener('click', function (e) {
	        e.preventDefault()

            $size = document.getElementById("table_body").children.length
            $indice = $size + 1

            var prestation_id = "prestation_id_" + $indice
            var select = "select_" + $indice
            var prix_prestation = "prix_prestation_" + $indice
            var quantite = "quantite_" + $indice
            var total_ligne = "total_ligne_" + $indice

            $string += '<td id="' + prestation_id +'">0</td>'
			$string += '<td><div class="form-group">'
			$string += '<select class="form-control" name="prestation_select" id="' + select + '" onchange="updatePrixPrestation(' + $indice + ', this.value)"></select>'
			$string += '</div></td>'
            $string += '<td id="' + prix_prestation + '">0 €</td>'
            $string += '<td><div class="form-group row"><div>'
            $string += '<input type="text" class="form-control" id="' + quantite + '" placeholder="10" onchange="updateLigne(' + $indice + ', this.value)">'
            $string += '</div></div></td>'
            $string += '<td id="' + total_ligne + '">0 €</td>'

            var tr = document.createElement("tr");
	        tr.innerHTML = $string

            document.getElementById("table_body").appendChild(tr)

            getPrestationsAfterAddingLine()
        })
    });
});

$(function () {
    $(document).ready(function() {
        document.getElementById('supprime_ligne').addEventListener('click', function (e) {
	        e.preventDefault()
            var table_body = document.getElementById("table_body")
            table_body.removeChild(table_body.lastChild)
            updateBilan()
	        console.log('supprime_ligne')
	    })
    });
});

function getClientInformation(id){
	xmlhttp=new XMLHttpRequest(); 
	xmlhttp.onreadystatechange=function(){   
	if (xmlhttp.readyState==4 && xmlhttp.status==200)
		updateClientInformation(xmlhttp.responseText)
	} 
	xmlhttp.open("POST","php/clientInfo.php",true);
	xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	xmlhttp.send("id="+id);
}

function updateClientInformation(json){
	$client = JSON.parse(json)

	$nom_complet = "<strong>" + $client['civilite'] + " " + $client['nom'] + " " + $client['prenom'] + "</strong>"
	document.getElementById("nom_complet").innerHTML = $nom_complet

	$adresse = "<strong>" + $client['adresse'] + "</strong>"
	document.getElementById("adresse").innerHTML = $adresse

	$ville = "<strong>" + $client['codePostal'] + " " + $client['ville'] + "</strong>"
	document.getElementById("ville").innerHTML = $ville

	$carte = "Votre carte est " + $client['carte']
	document.getElementById("carte").innerHTML = $carte

	$remise = $client['remise'] + " %"
	document.getElementById("remise").innerHTML = $remise
}

function getPrestationsAfterAddingLine(){
    xmlhttp=new XMLHttpRequest();
    xmlhttp.onreadystatechange=function(){
        if (xmlhttp.readyState==4 && xmlhttp.status==200)
            fillTable(xmlhttp.responseText)
    }
    xmlhttp.open("POST","php/prestations.php",true);
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
    selectedPrestation()

}

function selectedPrestation(){
    $selects = document.getElementsByName("prestation_select")

    for (var i = 0; i < $selects.length; i++) {
    	var prestation_id = document.getElementById("prestation_id_"+(i+1)).innerHTML
    	var select = document.getElementById("select_"+(i+1))
		select[prestation_id].setAttribute('selected', 'selected')
    }
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