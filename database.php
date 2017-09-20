<?php
	define("hostname","serveurmysql");
	define("database","BDD_ylivet");
	define("username","ylivet");
	define("password","2112");
	
	$dsn = 'mysql:dbname='.database.';host='.hostname.';charset=utf8';
	
	try {
	    $ma_connexion_mysql = new PDO($dsn, username, password);

		// pour afficher les erreurs
		$ma_connexion_mysql -> setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		// pour récupérer le résultat des requêtes SELECT sous forme de tableaux associatifs 
	    $ma_connexion_mysql -> setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE,PDO::FETCH_ASSOC); 
	} catch (PDOException $e) {
		echo 'Connexion échouée : ' . $e -> getMessage();
	}


	$id=$_POST["id"];

	$req ="SELECT * FROM Client where codeClient=".$id;
	$reponse= $ma_connexion_mysql->query($req);	
	$donnees=$reponse->fetchAll();

	var_dump($donnees);
	die();