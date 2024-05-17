$(document).ready(function () {
    // Verificar se o usuário está logado
    var token = window.localStorage.getItem('token');
    var nomeUsuario = window.localStorage.getItem('nomeUsuario');

    if (token && nomeUsuario) {
        // Remover botão de entrar
        $('.btn-custom').remove();

        // Adicionar ícone com nome do usuário
        var userIconHtml = '<a href="#" class="btn" data-bs-toggle="modal" data-bs-target="#modalUsuario"><div class="navbar-text"><img src="img/iconPerfil.png" alt=""> ' + nomeUsuario + '</div></a>';
        $('.navbar-nav').after(userIconHtml);
    } else {
        // Garantir que o botão de entrar esteja presente se não houver usuário logado
        if ($('.btn-custom').length === 0) {
            var loginButtonHtml = '<a href="login.html"><button class="btn btn-custom">Entrar</button></a>';
            $('.navbar-collapse').append(loginButtonHtml);
        }
    }

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
                    var cardHtml =
                        '<div class="animal-card">' +
                        '<img src="' + animal.imagem + '" alt="Imagem de ' + animal.nome + '">' +
                        '<h2>' + animal.nome + '</h2>' +
                        '<a href="#" class="btn" data-bs-toggle="modal" data-bs-target="#modalUsuario"><button class="btn-adocao">Ver mais</button></a>' +
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
    const selectedStars = document.querySelectorAll('.star.selected');
    const rating = selectedStars.length; // Conta quantas estrelas foram selecionadas

    // Adicionar comentário e avaliação ao array
    ratings.unshift({ comment: comment, rating: rating }); // Adiciona no início para manter a ordem

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
    commentDiv.innerHTML = `<p><strong>Comentário:</strong> ${comment}</p>`;
    
    // Adicionar estrelas à representação visual da avaliação
    const starsDiv = document.createElement('div');
    starsDiv.classList.add('stars');
    for (let i = 0; i < 5; i++) {
      const starSpan = document.createElement('span');
      if (i < rating) {
        starSpan.innerHTML = '&#9733;'; // Estrela preenchida
        starSpan.classList.add('filled'); // Adiciona classe para definir a cor
      } else {
        starSpan.innerHTML = '&#9734;'; // Estrela vazia
        starSpan.classList.add('empty'); // Adiciona classe para estrelas vazias
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
      document.getElementById('average-rating').innerText = "N/A"; // Se não houver avaliações, exibir "N/A"
  }
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
