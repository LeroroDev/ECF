let films = [
  { name: "Deadpool", years: 2016, authors: "Tim Miller" },
  { name: "Spiderman", years: 2002, authors: "Sam Raimi" },
  { name: "Scream", years: 1996, authors: "Wes Craven" },
  { name: "It: chapter 1", years: 2019, authors: "Andy Muschietti" },
];

/**
 *  Fonction d'affichage du tableau de film
 * @param {Array} arrayOfObjects
 */
function affichage(arrayOfObjects) {
  //Initialisation des partie du tableau
  const table = $("<table ></table>");
  const thead = $("<thead></thead>");
  const tbody = $("<tbody></tbody>");
  tbody.addClass('table-group-divider border-top border-light')
  thead.append("<tr><th>Titre</th><th>Année</th><th>Auteur</th><th></th></tr>");
  table.append(thead);
//Remplissage du tableau
  $.each(films, function (index, object) {
    let row = $("<tr></tr>");
    row.append("<td>" + object.name + "</td>");
    row.append("<td>" + object.years + "</td>");
    row.append("<td>" + object.authors + "</td>");
    let deleteButton = $("<button>Supprimer</button>");
    deleteButton.addClass('btn btn-danger');
    row.append($("<td></td>").append(deleteButton));
    let confirmButton = $("<button>Confirmer</button>");
    confirmButton.addClass('me-2')
    let resetButton = $("<button>Annuler</button>");
    resetButton.addClass('btn btn-danger');
    let confirmColumn = $("<td></td>").append(confirmButton, resetButton);
    confirmButton.addClass('btn btn-success');
    confirmColumn.hide();
    //Action onClick du bouton "Supprimer"
    deleteButton.click(function () {
      //quand on appuie affiche une colonne avec 2 bouton pour confirmation
    
      

      thead.html(
        "<tr><th>Titre</th><th>Année</th><th>Auteur</th><th></th><th>Continuer ?</th></tr>"
      );
      table.append(thead);
      confirmColumn.show();
      row.append(confirmColumn);
      // Action onClick du bouton "Comfirmer" qui va suprimer la ligne du tableau
      confirmButton.click(function () {
        films.splice(index, 1);
        affichage(films);
      });
      //Action onClick du bouton "Annuler" qui va suprimer la colonne de comfirmation 
      //et remettre le tableau a son état initial
      resetButton.click(function () {
        thead.html(
          "<tr><th>Titre</th><th>Année</th><th>Auteur</th><th></th><th></th></tr>"
        );
        table.append(thead);
        confirmColumn.hide();
      });
    });

    tbody.append(row);
  });

  table.append(tbody);
  table.addClass("table table-hover table-borderless table-dark mt-2 mx-auto table-responsive");
  $("#affichage").html(table);
}

/** Fonction de vérification les inputs
 *
 * @return {Boolean}
 */
function verifInputs() {
  let isValid = true;
  let today = new Date();
  let currentYear = today.getFullYear();
  let erreur = [];
  //Le titre doit avoir 2 char minimun
  let title = $("#titre").val();
  if (title.length < 2) {
    isValid = false;
    erreur.push("Le titre doit contenir au moins 2 caractères");
  }
  //L'année doit etre comprise entre 1900 et l'année actuelle
  let year = $("#année").val();
  if (year < 1900 || year > currentYear) {
    isValid = false;
    erreur.push("L'année doit être compris entre 1900 et l'année en cours");
  }
  //L'auteur doit au moins avoir 5 char
  let author = $("#auteur").val();
  if (author.length < 5) {
    isValid = false;
    erreur.push("Le nom de l'auteur doit contenir au moins 5 caractères");
  }
  //Création de la zone du message d'erreur qui renvoie les erreurs contenues dans le tableau d'erreus
  let erreurZone = $('<div id="erreurMsg"></div>');
  erreurZone.append(erreur.join("<br>"));
  erreurZone.addClass("alert alert-danger mt-2 w-50 mx-auto");
  if(erreur.length==0){
    erreurZone.hide();
  }
  $("#zoneInput").append(erreurZone);
  //Mise en place d'un timer pour le message d'erreur
  setTimeout(function () {
    $("#erreurMsg").remove();
  }, 5000);
  erreur.splice(0, 3);
  return isValid;
}
/** Fonction pour ajouter une ligne au tableau
 *
 * @param {Array} films
 * @param {String} titre
 * @param {Number} annee
 * @param {String} auteur
 */
function ajouterLigne(films, titre, annee, auteur) {
  films.push({ name: titre, years: annee, authors: auteur });
  affichage(films);
}

affichage(films);
let addButton = false;
// Affichage de la zone des inputs d'ajout de film onClick sur le bouton "Ajouter"
$("#addButton").click(function () {
  //On bloque l'utilisation du bouton grace à la valeur de addButton
  if (!addButton) {
    let labels = ["Titre", "Année", "Auteur"];
    let inputs = ["titre", "année", "auteur"];
    let inputTypes = ["text", "number", "text"];
    // Boucle pour afficher la zone d'input
    for (let i = 0; i < 3; i++) {
      $("#zoneInput").append(
        '<label class="d-block display-6" for="' + inputs[i] + '">' + labels[i] + "</label>"
      );
      $("#zoneInput").append(
        '<input class="form-control w-25 mx-auto text-bg-dark" id="' + inputs[i] + '" type="' + inputTypes[i] + '">'
      );
    }
    // Désactivation du bouton une fois clické
    addButton = true;
    $("#addButton").attr('disabled','disabled');
    $("#zoneInput").append('<button class="btn btn-success mt-2" id="saveButton">Sauvegarder</button');
  }
  $("#saveButton").click(function () {
    // Vérification des inputs onClick sur le bouton "sauvegarde"
    if (verifInputs()) {
      // Initialisation des valeurs avec passage de la première lettres en Majuscule pour le titre et auteur
      let titre =
        $("#titre").val().charAt(0).toUpperCase() + $("#titre").val().slice(1);
      let annee = parseInt($("#année").val());
      let auteur =
        $("#auteur").val().charAt(0).toUpperCase() +
        $("#auteur").val().slice(1);
      // Si tous les inputs sont correct ajoute la ligne au tableau
      ajouterLigne(films, titre, annee, auteur);
      // Affichage du message d'ajout avec timer de 3s
      let validMessage = $('<div id="messageOK">Film ajouté avec succès</div>');
      validMessage.addClass("alert alert-success");
      $("#zoneInput").append(validMessage);
      setTimeout(function () {
        $("#messageOK").remove();
      }, 3000);
      $("#zoneInput label").remove();
      $("#zoneInput input").remove();
      $("#saveButton").remove();
      $('zoneInput').remove();
      $("#addButton").removeAttr("disabled");
      addButton = false;
    }
  });
});
//Action onClick des boutons de tri
$("#alphaSort").click(function () {
  films.sort((a, b) => (a.name > b.name ? 1 : -1));
  affichage(films);
});
$("#yearSort").click(function () {
  films.sort(function (a, b) {
    return b.years - a.years;
  });
  affichage(films);
});
// Utilisation de slick pour faire un caroussell infini avec slick.js
$(document).ready(function(){
  $('.slide').slick({
    slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  arrows:false
  });
});
