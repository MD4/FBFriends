FBFriends
=========

Some stats on your friends...

Utilisation :

Déposez le data.js à la racine du projet (dossier 'frontend/app/data.js')
...et lancez la page 'index.html' !

PS : Optimisé pour chrome... (faute de temps ! :D)

Travail effectué :

 - Découpage de l'application en vues & séparation MVC (tant que possible)
 - Implémentation d'une collection de statistique (et gestion de celle ci générique : l'ajout d'une statistique est simple)
 - Tri par attributs (générique, l'ajout d'un attribut de tri est simple)
 - Rafraichissement des statistiques suivant la recherche (pattern observer)
 - Placement de la recherche sur la carte : clic sur un profile -> positionement & inversement, clic sur un marqueur -> affichage dans la liste (pattern observer aussi)
 - Wala wala

Prises de tête :

 - Compréhension de la lib "D3js" (implémentation d'un "bar chart" à la mano)
 - Conception générale pour bien (et à chaque fois) séparer le traitement des données et les vues
 - ... et c'est déjà pas mal !

Travail-qui-reste-a-faire :

 - D'autres stats ?
 - Recherche selon d'autres critères
 - Interrogation de l'API Facebook en direct
 - Compatibilité browseresque
 - ...


(Merci M.Ribreau pour vos cours & l'intérêt que vous arrivez à suciter concernant le JS et ses alentours !)
