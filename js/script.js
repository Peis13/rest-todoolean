// Utilizzando le API Todos di Boolean creiamo un’interfaccia
// in cui possiamo leggere, creare e rimuovere degli elementi da una todo-list

$(document).ready(
  function() {
    ottieniListaCompleta();

    ////////// ELIMINA
    // Elimino l'elemento selezionato
    // quando clicco sul bottone #elimina, leggo l'attributo di quell'elemento della lista
    // che servirà per indirizzare la chiamata alla giusta corrispondenza del server,
    // elimino l'elemeno selezionato dal server e mostro la lista aggiornata
    $(document).on('click', '.elimina',
      function() {
        var questoID = $(this).parents('.elemento').attr('data-api-id');
        eliminaDalServer(questoID);
      }
    );

    ////////// MODIFICA
    // Modifica l'elemento selezionato
    // quando clicco sul bottone #modifica, leggo l'attributo di quell'elemento della lista
    // che servirà per indirizzare la chiamata alla giusta corrispondenza del server,
    // modifico l'elemeno presente nel server e mostro la lista aggiornata
    $(document).on('click', '.modifica',
      function() {
        var questoID = $(this).parents('.elemento').attr('data-api-id');
        var nuovoElemento = $('#inserisci').val();
        modificaNelServer(questoID, nuovoElemento);

        // resetto il valore dell'input
        $('#inserisci').val('');
      }
    );

    ////////// AGGIUNGI
    // Al click di aggiungi salvo nel server il mio nuovo elemento
    // il valore che inserisco nell'input sarà il nuovo elemento che aggiungo nel server
    // solo se scrivo qualcosa nella input
    $('#aggiungi').click(
      function() {
        var nuovoElemento = $('#inserisci').val();
        if (nuovoElemento.length > 0) {

          aggiungiAlServer(nuovoElemento);
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
    // return: niente
    function ottieniListaCompleta() {

      $.ajax(
        {
          url: 'http://157.230.17.132:3023/todos',
          method: 'GET',
          success: function(risposta) {

            // reset html per non accodare e replicare la lista a schermo
            $('#todo-list').html('');

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

    ////////// AGGIUNGI AL SERVER
    // Funzione che fa una chiamata di tipo POST
    // e aggiunge un nuovo elemento nel server
    //  --> testo: stringa che passo alla chiave 'data' della chiamata
    //      che sarà il nuovo elemento aggiunto nel server
    // return: niente
    function aggiungiAlServer(testo) {

      $.ajax(
        {
          url: 'http://157.230.17.132:3023/todos',
          method: 'POST',
          data: {
            text: testo
          },
          success: function(risposta) {

            ottieniListaCompleta();
          },
          error: function() {
            alert('errore');
          }
        }
      );
    }

    ////////// MODIFICA NEL SERVER
    // Funzione che fa una chiamata di tipo PATCH
    // e modifica l'elemento con id passato in argomento nel server
    //  --> id: numero che rappresenta l'elemento nel server
    //  --> testo: stringa che passo alla chiave 'data' della chiamata
    //      che sarà il nuovo testo dell'elemento presente nel server
    // return: niente
    function modificaNelServer(id, testo) {

      $.ajax(
        {
          url: 'http://157.230.17.132:3023/todos/' + id,
          method: 'PATCH',
          data: {
            text: testo
          },
          success: function(risposta) {
            ottieniListaCompleta();
          },
          error: function() {
            alert('impossibile modificare l\'elemento');
          }
        }
      );
    }

    ////////// ELIMINA DAL SERVER
    // Funzione che fa una chiamata di tipo DELETE
    // e modifica l'elemento con id passato in argomento nel server
    // metodo: 'DELETE' elimino l'elemeno selezionato dal server
    // e mostro la lista aggiornata
    //  --> id: numero che rappresenta l'elemento nel server
    // return: niente
    function eliminaDalServer(id) {

      $.ajax(
        {
          url: 'http://157.230.17.132:3023/todos/' + id,
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

  }
);
