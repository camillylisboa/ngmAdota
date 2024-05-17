document.addEventListener('DOMContentLoaded', function () {
  // Adicionando cards
  function obterListaAnimais() {
      $.ajax({
          url: 'http://localhost:8080/animal/lista',
          method: 'GET',
          dataType: 'json',
          success: function (data) {
              $('#lista-animais').empty();
              $.each(data, function (index, animal) {
                  var cardHtml =
                      '<div class="animal-card">' +
                      '<img src="' + animal.imagem + '" alt="Imagem de ' + animal.nome + '">' +
                      '<h2>' + animal.nome + '</h2>' +
                      '<button class="btn-adocao">Adotar</button>' +
                      '</div>';
                  $('#lista-animais').append(cardHtml);
              });
          },
          error: function (xhr, status, error) {
              console.error('Erro ao obter a lista de animais:', error);
          }
      });
  }

  // Chama a função para obter a lista de animais quando a página carrega
  obterListaAnimais();

  // Variável global para armazenar as avaliações
  let ratings = [];

  // Função para enviar um comentário
  function submitComment() {
      const comment = document.getElementById('comment').value;
      const selectedStars = document.querySelectorAll('.star.selected');
      const rating = selectedStars.length;
      ratings.unshift({ comment: comment, rating: rating });
      document.getElementById('comment').value = '';
      displayComments();
      calculateAverageRating();
      expandRightPanel();
  }

  // Função para exibir os comentários
  function displayComments() {
      const commentsDiv = document.getElementById('comments');
      commentsDiv.innerHTML = '';
      ratings.forEach(({ comment, rating }) => {
          const commentDiv = document.createElement('div');
          commentDiv.classList.add('comment');
          commentDiv.innerHTML = `<p><strong>Comentário:</strong> ${comment}</p>`;
          const starsDiv = document.createElement('div');
          starsDiv.classList.add('stars');
          for (let i = 0; i < 5; i++) {
              const starSpan = document.createElement('span');
              if (i < rating) {
                  starSpan.innerHTML = '&#9733;';
                  starSpan.classList.add('filled');
              } else {
                  starSpan.innerHTML = '&#9734;';
                  starSpan.classList.add('empty');
              }
              starsDiv.appendChild(starSpan);
          }
          commentDiv.appendChild(starsDiv);
          commentsDiv.appendChild(commentDiv);
      });
  }

  // Função para calcular e exibir a média de avaliação
  function calculateAverageRating() {
      if (ratings.length > 0) {
          const totalRatings = ratings.reduce((accumulator, currentValue) => accumulator + currentValue.rating, 0);
          const averageRating = totalRatings / ratings.length;
          document.getElementById('average-rating').innerText = averageRating.toFixed(1);
      } else {
          document.getElementById('average-rating').innerText = "N/A";
      }
  }

  // Função para expandir o painel direito para exibir os comentários
  function expandRightPanel() {
      const rightPanel = document.getElementById('right-panel');
      rightPanel.style.height = 'auto';
  }

  // Adiciona evento de clique às estrelas para selecionar a avaliação
  const stars = document.querySelectorAll('.star');
  stars.forEach(star => {
      star.addEventListener('click', () => {
          const clickedValue = parseInt(star.getAttribute('data-value'));
          stars.forEach(s => {
              const value = parseInt(s.getAttribute('data-value'));
              if (value <= clickedValue) {
                  s.classList.add('selected');
              } else {
                  s.classList.remove('selected');
              }
          });
      });
  });

});
