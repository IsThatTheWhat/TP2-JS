<?php
include 'database.php';

$numCommande = $_POST['numCommande'];

$req ="SELECT * FROM Ligne, Prestation where 
Ligne.codePrestation = Prestation.codePrestation AND 
Ligne.numCommande = {$numCommande}";
$reponse= $pdo->query($req);
$donnees=$reponse->fetchAll();

echo json_encode($donnees);