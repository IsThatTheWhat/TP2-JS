<?php
	include 'database.php';


	$id=$_POST["id"];

	$req ="SELECT * FROM Client, Carte where 
      Client.carte = Carte.codeCarte AND 
      codeClient={$id}";
	$reponse= $pdo->query($req);	
	$donnees=$reponse->fetchAll();

	$attributes['client_infos'] = $donnees[0];

    $req ="SELECT * FROM Commande where Commande.codeClient={$id}";
    $reponse= $pdo->query($req);
    $donnees=$reponse->fetchAll();

    /*$req ="SELECT * FROM Commande, Ligne where
              Commande.numCommande = Ligne.numCommande AND
              Commande.codeClient={$id}";
    $reponse= $pdo->query($req);
    $donnees=$reponse->fetchAll();*/

    $attributes['commandes'] = $donnees;


    echo json_encode($attributes);

