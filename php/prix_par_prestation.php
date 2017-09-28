<?php
    include 'database.php';

    $id = $_POST["id"];

	$req ="SELECT prix FROM Prestation where codePrestation=".$id;
	$reponse= $pdo->query($req);	
	$donnees=$reponse->fetchAll();

	echo json_encode($donnees[0]);