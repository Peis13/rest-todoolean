$(document).ready(
  function() {

    ottieniListaCompleta();

    // Elimino l'elemento selezionato
    // quando clicco sul bottone #elimina, leggo l'attributo di quell'elemento della lista
    // che servirà per indirizzare la chiamata alla giusta corrispondenza del server,
    // metodo: 'DELETE' elimino l'elemeno selezionato dal server e mostro la lista aggiornata
    $(document).on('click', '.elimina',
      function() {
        var questoID = $(this).parent().attr('data-api-id');

        $.ajax(
          {
            url: 'http://157.230.17.132:3023/todos/' + questoID,
            method: 'DELETE',
            success: function(risposta) {
              ottieniListaCompleta();
            },
            error: function() {
              alert('impossibile eliminare l\'elemento');
            }
          }
        );
      }
    );

    // Al click di aggiungi salvo nel server il mio nuovo elemento
    // il valore che inserisco nell'input sarà il nuovo elemento che aggiungo nel server
    $('#aggiungi').click(
      function() {
        var nuovoElemento = $('#inserisci').val();
        if (nuovoElemento.length > 0) {

          $.ajax(
            {
              url: 'http://157.230.17.132:3023/todos',
              method: 'POST',
              data: {
                text: nuovoElemento
              },
              success: function(risposta) {

                ottieniListaCompleta();
              },
              error: function() {
                alert('errore');
              }
            }
          );
        } else {
          alert('Inserisci del testo');
        }

        // resetto il valore dell'input
        $('#inserisci').val('');
      }
    );

    ////////// OTTIENI LISTA COMPLETA
    // Funzione che genera una chiamata ajax al server
    // se la lunghezza della risposta che ricevo (array) è maggiore di 0
    //  --> stampa con handlebars tutti gli elementi che ritornano
    //      nella lista #todo-list
    function ottieniListaCompleta() {

      // reset html per non accodare e replicare la lista a schermo
      $('#todo-list').html('');

      $.ajax(
        {
          url: 'http://157.230.17.132:3023/todos',
          method: 'GET',
          success: function(risposta) {

            if (risposta.length > 0) {
              var source = $("#todo-item-template").html();
              var template = Handlebars.compile(source);

              for (var i = 0; i < risposta.length; i++) {
                var questoElemento = risposta[i]
                var html = template(questoElemento);
                $('#todo-list').append(html);
              }
            }
          },
          error: function() {
            alert('Non è stato trovato alcun elemento');
          }
        }
      );
    }


  }
);
