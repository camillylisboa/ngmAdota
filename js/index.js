$(document).ready(function () {
    // Array para armazenar as avaliações
    var ratings = [];
  
    // Manipulador de cliques para as estrelas
    $('.star').click(function () {
      var value = $(this).data('value'); // Obtém o valor da estrela clicada
      // Remove a classe de destaque de todas as estrelas e das anteriores à clicada
      $('.star').removeClass('selected-rating');
      $(this).prevAll('.star').addClass('selected-rating');
      $(this).addClass('selected-rating');
    });
  
    // Manipulador de clique para o botão de envio de feedback
    $('#submit-feedback').click(function () {
      var comment = $('#comment').val(); // Obtém o texto do comentário
      var rating = $('.selected-rating').length; // Obtém a classificação selecionada
      // Constrói o HTML para o feedback enviado
      var feedbackHTML = '<div class="col-md-6 feedback-item" style="display:none;">' +
        '<div>' +
        '<p><strong>Comentário:</strong> ' + comment + '</p>' +
        '<p><strong>Avaliação:</strong> ';
      for (var i = 0; i < rating; i++) {
        feedbackHTML += '&#9733;'; // Adiciona uma estrela para cada avaliação
      }
      feedbackHTML += '</p>' +
        '</div>' +
        '</div>';
      // Adiciona o feedback à div de exibição
      $('#feedback-display').append(feedbackHTML);
  
      // Adiciona a avaliação ao array
      ratings.push(rating);
  
      // Calcula a média das avaliações e exibe
      var averageRating = calculateAverage(ratings);
      $('#average-rating').text(averageRating.toFixed(1));
    });
  
    // Função para calcular a média das avaliações
    function calculateAverage(ratings) {
      if (ratings.length === 0) return 0;
      var sum = ratings.reduce(function (a, b) {
        return a + b;
      });
      return sum / ratings.length;
    }
  
    // Evento de clique para mostrar mais comentários
    $('#view-more').click(function () {
      $('.feedback-item:hidden').slice(0, 2).slideDown(); // Mostra os dois próximos comentários ocultos
      if ($('.feedback-item:hidden').length === 0) { // Se não houver mais comentários ocultos
        $('#view-more').addClass('d-none'); // Oculta o botão de "Ver Mais"
        $('#hide-comments').removeClass('d-none'); // Mostra o botão de "Recolher Comentários"
      }
    });
  
    // Evento de clique para recolher os comentários
    $('#hide-comments').click(function () {
      $('.feedback-item').slice(2).slideUp(); // Recolhe os comentários a partir do terceiro
      $('#view-more').removeClass('d-none'); // Mostra o botão de "Ver Mais"
      $(this).addClass('d-none'); // Oculta o botão de "Recolher Comentários"
    });
  });