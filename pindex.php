<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <title>Exo 1 JS</title>

    <!-- Bootstrap -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/css/bootstrap.min.css" integrity="sha384-/Y6pD6FV/Vv2HJnA6t+vslU6fwYXjCFtcEpHbNJ0lyAFsXTsjBbfaDjzALeQsN6M" crossorigin="anonymous">

    <script type="text/javascript" src="js/prestations.js"></script>

  </head>
  <body>
      <div class="container" style="padding-bottom: 100px">
          <div class="row">
              <div class="col-md-3">
                  <div class="bg-primary">
                      <h2 class="">Ski club</h2>
                      <h2 class="">à votre service</h2>
                  </div>
                  <h5>12 impasse des moulinet</h5>
                  <h5>90000 Belfort</h5>
                  <h5>3 00 00 00 00</h5>
                  <h5>3 00 00 00 00</h5>
              </div>
              <div class="col-md-8"></div>
              <div class="col-md-1" style="padding-top: 10px"><h3><?= date("d/m/Y"); ?></h3></div>
          </div>
          <div class="row">
              <div class="col-md-6 text-center">
                  <h1>Ski</h1>
              </div>
              <div class="col-md-6 text-center bg-primary" style="height: 150px">
                  <h1>Facture</h1>
              </div>
          </div>

          <div class="row" style="padding-top: 20px">
              <div class="col-md-5 ml-auto">
                  <form>
                      <div class="form-group row">
                          <label for="client_id" class="col-sm-4 col-form-label">Votre Code Client</label>
                          <div class="col-sm-8">
                              <input type="text" class="form-control" id="client_id" placeholder="10" onchange="getClientInformation(this.value)">
                          </div>
                      </div>
                  </form>
              </div>
          </div>

          <div class="row" style="padding-top: 20px">
              <div class="col-md-5 ml-auto">
                  <h2 id="nom_complet"></h2>
                  <h2 id="adresse"></h2>
                  <h2 id="ville"></h2>
              </div>
          </div>

          <div class="row">
              <div class="col-md-2">
                  <button class="btn btn-success" id="ajout_ligne">Ajouter une ligne</button>
              </div>
              <div class="col-md-2">
                  <button class="btn btn-danger" id="supprime_ligne">Supprimer la dernière ligne</button>
              </div>
          </div>

          <div style="margin-top: 10px">
              <table class="table">
                  <thead class="thead-inverse">
                  <tr>
                      <th>Code Prestation</th>
                      <th>Désignation</th>
                      <th>Prix Unitaire</th>
                      <th>Quantité</th>
                      <th>Montant</th>
                  </tr>
                  </thead>
                  <tbody id="table_body">
                  <tr>
                      <td id="prestation_id_1">0</td>
                      <td>
                          <div class="form-group">
                              <select class="form-control" name="prestation_select" id="select_1" onchange="updatePrixPrestation(1, this.value)">
                              </select>
                          </div>
                      </td>
                      <td id="prix_prestation_1">0 €</td>
                      <td>
                          <div class="form-group row">
                              <div>
                                  <input type="text" class="form-control" id="quantite_1" placeholder="10" onchange="updateLigne(1, this.value)">
                              </div>
                          </div>
                      </td>
                      <td id="total_ligne_1">0 €</td>
                  </tr>
                  </tbody>
              </table>
          </div>

          <div class="row">
              <div class="col-md-2"></div>
              <div class="col-md-2"></div>
              <div class="col-md-4"><h3 id="carte">Votre carte est verte</h3></div>
              <div class="col-md-4">
                  <div class="row">
                      <div class="col-md-6"><h3>Somme</h3></div>
                      <div class="col-md-6"><h3 id="somme">0 €</h3></div>
                  </div>
                  <div class="row">
                      <div class="col-md-6"><h3>remise</h3></div>
                      <div class="col-md-6"><h3 id="remise">0 %</h3></div>
                  </div>
                  <div class="row">
                      <div class="col-md-6"><h1>Due</h1></div>
                      <div class="col-md-6"><h1><span class="badge badge-primary" id="total">0 €</span></h1></div>
                  </div>
              </div>
          </div>

          <div style="padding-top: 30px">
              <div class="row justify-content-center">
                  <div class="col-4">
                      <button id="commander" class="btn btn-success btn-block btn-lg">Commander</button>
                  </div>
              </div>
          </div>
      </div>
  	
      <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
      <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
      <!-- Include all compiled plugins (below), or include individual files as needed -->
      <!-- Latest compiled and minified JavaScript -->
      <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
      <script type="text/javascript" src="js/general.js"></script>
      <script type="text/javascript" src="js/prix_par_prestations.js"></script>
      <script type="text/javascript" src="js/commander.js"></script>
  </body>
</html>