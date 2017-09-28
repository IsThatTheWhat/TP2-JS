<?php
    include 'database.php';


    $req ="SELECT * FROM Prestation";
	$reponse= $pdo->query($req);	
	$donnees=$reponse->fetchAll();

	echo json_encode($donnees);