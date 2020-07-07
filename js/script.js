$(document).ready(
  function() {

    ottieniListaCompleta();

    // Elimino l'elemento selezionato
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
          alert('stringa vuota');
        }
      }
    );

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
            alert('errore');
          }
        }
      );
    }


  }
);
