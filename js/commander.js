$(function () {
    $(document).ready(function() {
        document.getElementById('commander').addEventListener('click', function (e) {
            e.preventDefault()
            var prixTotal = getPrixTotal()
            var dateCommande =  getDate()
            var codeClient = getClientId()
            var json = attributesToJSON(prixTotal, dateCommande, codeClient)
            passerCommande(json)
        })
    });
});

function getDate(){
    var date = (new Date()).toUTCString()
    date = date.split(', ')
    date = date[1].split(' ')
    date = date[2] + "-" + date[1] + "-" + date[0] + " " + date[3]
    return date
}

function getPrixTotal(){
    var value = document.getElementById('total').innerHTML.split(' ')
    return value[0]
}

function getClientId(){
    return document.getElementById('client_id').value
}

function attributesToJSON(prixTotal, dateCommande, codeClient){
    var data = {
        'prixTotal' : prixTotal,
        'dateCommande' : dateCommande,
        'codeClient' : codeClient,
    }
    data['lignes'] = getLignesJSON()
    return JSON.stringify(data);
}

function getLignesJSON(){
    var lignes = {}
    $tbody_children= document.getElementById("table_body").children
    for (var i = 0; i < $tbody_children.length; i++) {
        var codePrestation = document.getElementById("prestation_id_"+(i+1)).innerHTML
        var quantite = document.getElementById("quantite_"+(i+1)).value
        var ligne = {
            'codePrestation' : codePrestation,
            'quantite' : quantite,
        }
        lignes['ligne' + i] = ligne
    }
    return lignes;
}

function passerCommande(json){
    xmlhttp=new XMLHttpRequest();
    xmlhttp.onreadystatechange=function(){
        if (xmlhttp.readyState==4 && xmlhttp.status==200)
            console.log("Envoyé")
            console.log(xmlhttp.responseText)
            //updateClientInformation(xmlhttp.responseText)
    }
    xmlhttp.open("POST","php/commande.php",true);
    xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xmlhttp.send("json="+json);
}