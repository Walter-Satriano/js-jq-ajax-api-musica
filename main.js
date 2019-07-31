/*ESERCIZIO:
Attraverso una chiamata ajax all’Api di boolean avremo
a disposizione una decina di dischi musicali.
Servendoci di handlebars stampiamo tutto a schermo.*/

$(document).ready(function() {

  var musicApi = "https://flynn.boolean.careers/exercises/api/array/music";

  // chiamata ajax per richiedere la lista di cd musicali
  $.ajax(
    {
      url : musicApi,
      method : "GET",
      // risposta positiva del server
      success : function(data) {
        //risposta positiva dell'API
        if (data.success) {

          var cdItem = data.response;
          console.log(cdItem);

          // ciclo per poter iterare l'array di oggetti ricevuto dalla chiamata ajax
          for (var i = 0; i < cdItem.length; i++) {

            //compilo il template
            var source = $("#cd_template").html();
            var template = Handlebars.compile(source);

            //assegno ai segnaposto scelti nell'html l'elemento corretto
            var context = {
              immagine: cdItem[i].poster,
              titoloAlbum: cdItem[i].title,
              autore: cdItem[i].author,
              anno: cdItem[i].year
            };
            console.log("questo è il context " , context);
            var html = template(context);

            //stampo a schermo
            $(".cds-container").append(html);
          }
        }
      },
      error : function(richiesta, stato, errore) {
        console.log("E' avvenuto un errore. " + errore);
      }

    }
  );

});
