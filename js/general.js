$(function () {
    $(document).ready(function() {
        document.getElementById('ajout_ligne').addEventListener('click', function (e) {
	        e.preventDefault()

            addLigne()

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
	    })
    });
});

function addLigne(){
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
}

function getClientInformation(id){
	xmlhttp=new XMLHttpRequest(); 
	xmlhttp.onreadystatechange=function(){   
        if (xmlhttp.readyState==4 && xmlhttp.status==200){
            updateClientInformation(xmlhttp.responseText)
            document.getElementById("tableau").style.visibility = 'visible'
        }
	} 
	xmlhttp.open("POST","php/clientInfo.php",true);
	xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	xmlhttp.send("id="+id);
}

function updateClientInformation(json){
	$res = JSON.parse(json)
    allCommandes($res)
    $client = $res.client_infos

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

function allCommandes(json){
    var commandes = json.commandes
    if (commandes.length) {
        document.getElementById("commandes_div").style.visibility = 'visible'
        document.getElementById("commander_div").style.visibility = 'visible'
        var commande_select = document.getElementById("commandes")
        var string = '<option value="0">Voir une commande</option>'
        for (var j = 0; j < commandes.length; j++) {
            string += '<option value="' + commandes[j]['numCommande'] +'">Commande du '+ formatDate(commandes[j]['dateCommande']) +' pour ' + commandes[j]['prixTotal'] +' €</option>'
        }
        commande_select.innerHTML = string
    }
}

function formatDate(string){
    string = string.split(' ')
    string = string[0].split('-')
    var date = string[2] + '/' + string[1] + '/' + string[0]
    return date
}

function getLignesCommande(id){
    xmlhttp=new XMLHttpRequest();
    xmlhttp.onreadystatechange=function(){
        if (xmlhttp.readyState==4 && xmlhttp.status==200){
            updateLignes(xmlhttp.responseText)
            document.getElementById("commander_div").style.visibility = 'hidden'
            document.getElementById("update_commande_div").style.visibility = 'visible'
        }
    }
    xmlhttp.open("POST","php/getCommandes.php",true);
    xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xmlhttp.send("numCommande="+id);
}

function updateLignes(json){
    var commandes = JSON.parse(json)
    console.log(commandes)
    if (commandes.length > 1){
        for (var j = 1; j < commandes.length; j++) {
            addLigne()
        }
        getPrestationsAfterAddingLine()
    }
    fillLine(commandes)
    updateBilan()
}

function fillLine(commandes){
    for (var i = 0; i < commandes.length; i++) {
        var prestation_id = commandes[i]['codePrestation']
        var prix_prestation = commandes[i]['prix']
        var quantite = commandes[i]['quantite']
        var total_ligne = quantite * prix_prestation
        document.getElementById("prestation_id_"+(i+1)).innerHTML = prestation_id
        document.getElementById("prix_prestation_"+(i+1)).innerHTML = prix_prestation + " €"
        document.getElementById("quantite_"+(i+1)).value = quantite
        document.getElementById("total_ligne_"+(i+1)).innerHTML = total_ligne + " €"

    }
}