$(document).ready(function () {
    function showConfirmModal(message, callback) {
        $('#confirmModal .modal-body p').text(message);
        $('#confirmButton').off('click').on('click', function () {
            $('#confirmModal').modal('hide');
            if (typeof callback === 'function') {
                callback(true);
            }
        });
        $('#confirmModal').modal('show');
    }

    var token = window.localStorage.getItem('token');
    var nomeUsuario = window.localStorage.getItem('nomeUsuario');
    var emailUsuario = window.localStorage.getItem('email');
    var idadeUsuario = window.localStorage.getItem('idade');
    var telefoneUsuario = window.localStorage.getItem('telefone');

    if (token && nomeUsuario) {
        $('.btn-custom').remove();
        var userIconHtml = '<a href="#" class="btn" data-bs-toggle="modal" data-bs-target="#modalNgmPerfil"><img src="img/avatar.png" style="width : 23px;" class="menu-icon" alt=""></a>';
        $('.navbar-nav').after(userIconHtml);
        $('#info-nome-usuario').text(nomeUsuario);
        $('#info-email-usuario').text(emailUsuario);
        $('#info-idade-usuario').text(idadeUsuario);
        $('#info-telefone-usuario').text(telefoneUsuario);
    } else {
        if ($('.btn-custom').length === 0) {
            var loginButtonHtml = '<a href="login.html"><button class="btn btn-custom">Entrar</button></a>';
            $('.navbar-collapse').append(loginButtonHtml);
        }
        window.localStorage.removeItem('token');
        window.localStorage.removeItem('nomeUsuario');
        window.localStorage.removeItem('email');
        window.localStorage.removeItem('idade');
        window.localStorage.removeItem('telefone');
        window.localStorage.removeItem('tokenExpiry');
    }

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
                        '<button class="btn-adocao" data-toggle="modal" data-target="#modalAnimal" data-id="' + index + '">Ver mais</button>' +
                        '</div>';
                    $('#lista-animais').append(cardHtml);
                });

                // Atualiza o evento de clique no botão .btn-adocao após a lista ser gerada
                $('.btn-adocao').off('click').on('click', function () {
                    var index = $(this).data('id');
                    var animal = data[index];
                    console.log(animal);
                    
                    // Atualiza o modal com os dados do animal
                    $('#modal-nome').text(animal.nome);
                    $('#modal-nome2').text(" " + animal.nome);
                    $('#modal-imagem').attr('src', animal.imagem);
                    $('#modal-peso').text(animal.peso + ' kg');
                    $('#modal-idade').text(animal.idade + ' anos');
                    $('#modal-descricao').text(animal.descricao);

                    $('#modalAnimal').modal('show');

                    localStorage.setItem('animalId', animal.id);
                    localStorage.setItem('animalNome', animal.nome);
                });

                $('#adocaoBtn').off('click').on('click', function () {
                    if (token && nomeUsuario) {
                        window.location.href = 'formularioDeInteresse.html';
                    } else {
                        alert("Você precisa fazer login");
                        window.location.href = 'login.html';
                    }
                });
            },
            error: function (xhr, status, error) {
                console.error('Erro ao obter a lista de animais:', error);
            }
        });
    }

    obterListaAnimais();

    function logout() {
        showConfirmModal("Você deseja fazer logout?", function (confirmed) {
            if (confirmed) {
                window.localStorage.removeItem('nomeUsuario');
                window.localStorage.removeItem('email');
                window.localStorage.removeItem('idade');
                window.localStorage.removeItem('telefone');
                window.location.href = 'index.html';
            }
        });
    }

    $('#logout-button').on('click', function () {
        logout();
    });
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
