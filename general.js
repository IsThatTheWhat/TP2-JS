$(function () {
    $(document).ready(function() {
        document.getElementById('ajout_ligne').addEventListener('click', function (e) {
	        e.preventDefault()
	        console.log('ajout_ligne')
	    })
    });
});

$(function () {
    $(document).ready(function() {
        document.getElementById('supprime_ligne').addEventListener('click', function (e) {
	        e.preventDefault()
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
	xmlhttp.open("POST","clientInfo.php",true); 
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
}

$(function () {
    $(document).ready(function() {
        var $number = $("#table_body").children().length;
        $number = $("tbody tr").length;
        //console.log($number)
    });
});