/**Fonction qui fait appelle à l'API OMDB
 *
 * @param {String} movieTitle
 * @param {Number} movieYear
 * @param {String} movieType
 * @param {Number} page
 */
function getMovieData(movieTitle, movieYear, movieType, page) {
  //requete ajax pour récupérer les informations des films
  $.ajax({
    url: `http://www.omdbapi.com/?apikey=4ab90225&s=${movieTitle}&y=${movieYear}&type=${movieType}&page=${page}`,
    type: "GET",
    dataType: "json",
    success: function (data) {
      //Alert en cas de d'erreur
      if (data.Error != undefined) {
        alert(data.Error);
      }
      //Initialisation de la zone affichage
      $("#affichage").empty();
      $("#affichage").append(
        '<div id="test" class="row row-cols-2 g-2 mx-auto"></div>'
      );
      //Boucle pour afficher les différents objets contenant les informations de recherches
      for (const item of data.Search) {
        console.log(item);
        //Condition pour afficher le poster ou une image par défaut
        if (item.Poster !== "N/A") {
          $("#test").append(
            `<div class="col"><img src='${item.Poster}' heigh="300px" width="200px"/>`
          );
        } else {
          $("#test").append(
            `<div class="col"><img  src="oops.jpg" heigh="300px" width="200px" />`
          );
        }
        $("#test").append(
          `<div class="w-25 text-center alert alert-warning col">
        <p class="fs-4">Titre: ${item.Title}</p>
        <p class="fs-4">Année: ${item.Year}</p>
        <p class="fs-4">Type: ${item.Type}</p>
        <p class="fs-4">IMDB ID: ${item.imdbID}</p>
        </div>`
        );
      }
    },
  });
}
//Création de la variable qui permettra de changer la page de résultat
let currentPage = 1;
//Eventlistener sur les différents boutons
$(document).ready(function () {
  //Action onClick sur le bouton recherche
  $("#search").click(() => {
    let title = $("#title").val();
    let year = $("#year").val();
    let type = $("#type").val();
    getMovieData(title, year, type, currentPage);
  });
  //Action onClick pour revenir à la page précédente
  $("#prev-page").click(() => {
    //Condition pour décrémenter la valeur de la variable currentPage
    if (currentPage > 1) {
      currentPage--;
      let title = $("#title").val();
      let year = $("#year").val();
      let type = $("#type").val();
      getMovieData(title, year, type, currentPage);
    }
  });
  //Action onClick pour aller à la page suivande des résultats
  $("#next-page").click(() => {
    currentPage++;
    let title = $("#title").val();
    let year = $("#year").val();
    let type = $("#type").val();
    getMovieData(title, year, type, currentPage);
  });
});
