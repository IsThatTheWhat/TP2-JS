<?php
	include 'database.php';


	$id=$_POST["id"];

	$req ="SELECT * FROM Client where codeClient=".$id;
	$reponse= $pdo->query($req);	
	$donnees=$reponse->fetchAll();

	echo json_encode($donnees[0]);