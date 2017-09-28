<?php
    include 'database.php';




    $json = json_decode($_POST["json"]);

    $date = date('Y-m-d H:i:s', strtotime($json->{'dateCommande'}));

    $req = "insert into Commande values (NULL , {$json->{'prixTotal'}}, '{$date}', {$json->{'codeClient'}})";
    $reponse= $pdo->exec($req);

    $req ="SELECT numCommande FROM Commande where
          dateCommande = '{$date}' AND
          codeClient={$json->{'codeClient'}}";
    $reponse= $pdo->query($req);
    $donnees=$reponse->fetchAll();

    $numCommande = $donnees[0]['numCommande'];

    foreach ($json->{'lignes'} as $ligne) {
        $req = "insert into Ligne values ({$numCommande} , {$ligne->{'codePrestation'}}, {$ligne->{'quantite'}})";
        $reponse= $pdo->exec($req);
    }

    //echo $req;