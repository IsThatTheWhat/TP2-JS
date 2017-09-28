<?php
    define("hostname","serveurmysql");
    define("database","BDD_ylivet");
    define("username","ylivet");
    define("password","2112");

    $dsn = 'mysql:dbname='.database.';host='.hostname.';charset=utf8';

    try {
        $pdo = new PDO('mysql:dbname=tp2-js;host=localhost', 'root', '');
        //$pdo = new PDO($dsn, username, password);

        // pour afficher les erreurs
        $pdo -> setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        // pour récupérer le résultat des requêtes SELECT sous forme de tableaux associatifs
        $pdo -> setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE,PDO::FETCH_ASSOC);
    } catch (PDOException $e) {
        echo 'Connexion échouée : ' . $e -> getMessage();
    }
