// Adicionando cards
$(document).ready(function () {
  // Função para fazer a chamada AJAX à API de animais
  function obterListaAnimais() {
    $.ajax({
      url: 'http://localhost:8080/animal/lista',
      method: 'GET',
      dataType: 'json',
      success: function (data) {
        // Limpa o conteúdo atual da div antes de adicionar os novos cards
        $('#lista-animais').empty();

        // Para cada animal na lista, cria um card e adiciona à página
        $.each(data, function (index, animal) {
          var cardHtml = '<div class="animal-card">' +
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
});

// Variável global para armazenar as avaliações
let ratings = [];
// Função para enviar um comentário
function submitComment() {
    const comment = document.getElementById('comment').value;
    const rating = document.querySelector('.star.selected').getAttribute('data-value');
    // Adicionar comentário e avaliação ao array
    ratings.unshift({ comment: comment, rating: parseInt(rating) }); // Adiciona no início para manter a ordem
    // Limpar campo de comentário
    document.getElementById('comment').value = '';
    // Atualizar lista de comentários
    displayComments();
    // Calcular e exibir média de avaliação
    calculateAverageRating();
    // Expandir o painel direito para exibir os comentários
    expandRightPanel();
}

// Função para exibir os comentários
function displayComments() {
    const commentsDiv = document.getElementById('comments');
    commentsDiv.innerHTML = ''; // Limpa os comentários existentes

    ratings.forEach(({ comment, rating }) => {
        const commentDiv = document.createElement('div');
        commentDiv.classList.add('comment');
        commentDiv.innerHTML = `<p><strong>Comentário:</strong> ${comment}</p><p><strong>Avaliação:</strong> ${rating} estrela(s)</p>`;
        commentsDiv.appendChild(commentDiv);
    });
}
// Função para calcular e exibir a média de avaliação
function calculateAverageRating() {
    const totalRatings = ratings.reduce((accumulator, currentValue) => accumulator + currentValue.rating, 0);
    const averageRating = totalRatings / ratings.length;
    document.getElementById('average-rating').innerText = averageRating.toFixed(1);
}
// Função para expandir o painel direito para exibir os comentários
function expandRightPanel() {
    const rightPanel = document.getElementById('right-panel');
    rightPanel.style.height = 'auto'; // Define a altura automática para expandir dinamicamente
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
// Função para exibir os comentários
function displayComments() {
    const commentsDiv = document.getElementById('comments');
    commentsDiv.innerHTML = ''; // Limpa os comentários existentes

    if (ratings.length === 0) {
        return; // Retorna se não houver comentários
    }

    ratings.forEach(({ comment, rating }) => {
        const commentDiv = document.createElement('div');
        commentDiv.classList.add('comment');
        commentDiv.innerHTML = `<p><strong>Comentário:</strong> ${comment}</p><p><strong>Avaliação:</strong> ${rating} estrela(s)</p>`;
        commentsDiv.appendChild(commentDiv);
    });
}