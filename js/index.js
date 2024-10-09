
$(document).ready(function () {
    // Função para mostrar o modal de confirmação estilizado
    function showConfirmModal(message, callback) {
        // Configurar a mensagem no modal
        $('#confirmModal .modal-body p').text(message);

        // Adicionar evento de clique ao botão de confirmação
        $('#confirmButton').off('click').on('click', function () {
            // Fechar o modal
            $('#confirmModal').modal('hide');
            // Executar a função de retorno (callback) se fornecida
            if (typeof callback === 'function') {
                callback(true);
            }
        });

        // Exibir o modal
        $('#confirmModal').modal('show');
    }

    // Verificar se o usuário está logado
    var token = window.localStorage.getItem('token');
    var nomeUsuario = window.localStorage.getItem('nomeUsuario');
    var emailUsuario = window.localStorage.getItem('email');
    var idadeUsuario = window.localStorage.getItem('idade');
    var telefoneUsuario = window.localStorage.getItem('telefone');
    var usuarioId = window.localStorage.getItem('userId');
    var role = window.localStorage.getItem('role');

    if (token && nomeUsuario) {
        // Remover botão de entrar
        $('.btn-custom').remove();

        // Adicionar ícone com nome do usuário

        var userIconHtml = '<a href="#" class="btn" data-bs-toggle="modal" data-bs-target="#modalNgmPerfil"><img src="img/avatar.png" style="width : 23px;" class="menu-icon" alt=""></a>';
        $('.navbar-nav').after(userIconHtml);


        // Preencher o modal de informações do usuário
        $('#info-nome-usuario').text(nomeUsuario);
        $('#info-email-usuario').text(emailUsuario);
        $('#info-idade-usuario').text(idadeUsuario);
        $('#info-telefone-usuario').text(telefoneUsuario);
    } else {
        // Garantir que o botão de entrar esteja presente se não houver usuário logado
        if ($('.btn-custom').length === 0) {
            var loginButtonHtml = '<a href="login.html"><button class="btn btn-custom">Entrar</button></a>';
            $('.navbar-collapse').append(loginButtonHtml);
        }

        // Redirecionar para a tela inicial (index.html) se o token estiver ausente ou expirado
        window.localStorage.removeItem('token');
        window.localStorage.removeItem('nomeUsuario');
        window.localStorage.removeItem('email');
        window.localStorage.removeItem('idade');
        window.localStorage.removeItem('telefone');
        window.localStorage.removeItem('tokenExpiry');
    }

    const dropdowns = document.querySelectorAll('.dropdown');

    dropdowns.forEach(dropdown => {
        const btn = dropdown.querySelector('.dropdown-toggle');
        const menu = dropdown.querySelector('.dropdown-menu');

        btn.addEventListener('click', () => {
            menu.classList.toggle('show');
        });
    });

    // Função para fazer a chamada AJAX à API de animais
    function obterListaAnimais() {
        const disponivelParaAdocao = '?statusAnimal=1';
        $.ajax({
            url: `http://89.116.73.130:8080/animal/lista/adocao${disponivelParaAdocao}`,
            method: 'GET',
            dataType: 'json',
            success: function (data) {
                $('#lista-animais').empty();
                
                $.each(data, function (index, animal) {
                    if (index >= 4) {  // Verifica se o índice é maior ou igual a 4
                        return false;   // Interrompe o loop ao atingir o limite de 4 animais
                    }
                    var favoritoCor = window.localStorage.getItem('favorito-' + usuarioId + '-' + animal.id) === 'true' ? 'red' : 'gray';

                    var cardHtml =
                        '<div class="animal-card">' +
                        '<img src="' + window.location.origin + animal.imagem + '" alt="Imagem de ' + animal.nome + '" ' +
                        'onerror="this.onerror=null;this.src=\'img/sem_imagem_cadastrada.png\';">' +
                        '<h2>' + animal.nome +
                        (animal.sexo === 'M' ? ' <img src="./img/sexo-masculino.png" alt="img masculino" style="height: 24px; width: auto; border-radius: 0;">'
                            : ' <img src="./img/simbolo-feminino.png" alt="img feminino" style="height: 26px; width: auto;">') +
                        '<button class="btn-favorito" id="favorito-' + index + '" style="border: none; background: none;" onclick="alternarFavorito(' + index + ')">' +
                        '<img id="img-favorito-' + index + '" src="./img/coracao-' + favoritoCor + '.png" alt="coração" style="height: 24px; width: auto; border-radius: 0;">' +
                        '</button>' +
                        '</h2>' +
                        '<button class="btn-edit" data-bs-toggle="modal" data-bs-target="#modalAnimal" data-id="' + index + '">Ver mais</button>' +
                        '</div>';

                    $('#lista-animais').append(cardHtml);

                    // Adicionar comportamento de clique ao botão de favorito dentro do loop
                    $('#favorito-' + index).on('click', function () {
                        var coracao = $(this).find('.coracao');
                        var animalId = animal.id;

                        if (!token) {
                            console.error('Token de autenticação não encontrado.');
                            return;
                        }

                        if (!usuarioId) {
                            console.error('ID do usuário não encontrado.');
                            return;
                        }

                        $.ajax({
                            url: `http://89.116.73.130:8080/favorito/${animalId}/usuario/${usuarioId}`,
                            type: 'PUT',
                            headers: {
                                'Authorization': 'Bearer ' + token
                            },
                            success: function (response) {
                                console.log('Resposta do backend:', response);
                                if (response.favorito === true) {
                                    coracao.css('color', 'red');
                                    favoritoCor = 'red';
                                    window.localStorage.setItem('favorito-' + usuarioId + '-' + animalId, 'true');
                                } else {
                                    coracao.css('color', 'gray');
                                    favoritoCor = 'gray';
                                    window.localStorage.setItem('favorito-' + usuarioId + '-' + animalId, 'false');
                                }
                            },
                            error: function (xhr, status, error) {
                                console.error('Erro ao alternar favorito:', error);
                            }
                        });
                    });
                });



                var modalAnimal = new bootstrap.Modal(document.getElementById('modalAnimal'), {
                    keyboard: false
                });

                $('.btn-edit').on('click', function () {
                    var index = $(this).data('id');
                    var animal = data[index];
                    $('#modal-imagem').attr('src', animal.imagem);
                    $('#modal-nome').text(animal.nome);
                    $('#modal-peso').text(animal.peso + ' kg');
                    $('#modal-idade').text(animal.idade);
                    $('#modal-descricao').text(animal.descricao);
                    $('#modal-ong').text(animal.ongModel.razaosocial);
                    $('#modal-sexo').text(animal.sexo === 'M' ? 'Macho' : 'Fêmea');
                    $('#modal-raca').text(animal.racaAnimal.tipo);
                    $('#modal-especie').text(animal.especieAnimal.tipo);
                    $('#modal-pelagem').text(animal.pelagemAnimal.tipo);
                    $('#modal-porte').text(animal.porteAnimal.tipo);
                    modalAnimal.show();

                    localStorage.setItem('animalId', animal.id);
                    localStorage.setItem('animalNome', animal.nome);
                });

                $('#adocaoBtn').on('click', function () {
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



    // Função para fazer logout
    function logout() {
        // Mostrar confirmação estilizada
        showConfirmModal("Você deseja fazer logout?", function (confirmed) {
            if (confirmed) {
                // Remover dados do localStorage
                window.localStorage.removeItem('nomeUsuario');
                window.localStorage.removeItem('email');
                window.localStorage.removeItem('idade');
                window.localStorage.removeItem('telefone');
                window.localStorage.removeItem('role');
                // Redirecionar para a página inicial (index.html)
                window.location.href = 'index.html';
            }
        });
    }

    function esconderBotaoSeUsuario(role) {

        if (role) {
            if (role === "ONG") {
                const cadastroOng = document.getElementById('cadastroOng');
                cadastroOng.style.display = 'none';
            } else {
                const botaoDropdownOng = document.getElementById('dropdownOng');
                botaoDropdownOng.style.display = 'none';

            }

            if (role === "USER") {
                // Seleciona o botão pelo ID e o esconde
                const botaoCadAnimal = document.getElementById('cadAnimal');
                if (botaoCadAnimal) {
                    botaoCadAnimal.style.display = 'none';
                } else {
                    console.error('Botão com ID "cadAnimal" não encontrado.');
                }
            }
        } else {
            console.error('Resposta JSON inválida ou propriedade "role" não encontrada.');
            const botaoDropdownOng = document.getElementById('dropdownOng');
            botaoDropdownOng.style.display = 'none';
        }

    }

    const roleDoUsuario = role;
    esconderBotaoSeUsuario(roleDoUsuario);

    // Adiciona evento ao botão de logout
    $('#logout-button').on('click', function () {
        logout();
    });
});

// Variável global para armazenar as avaliações
let ratings = []; // Armazena as avaliações para calcular a média

// Função para enviar um comentário
function submitComment() {
    const comment = document.getElementById('comment').value;
    const selectedStars = document.querySelectorAll('.star.selected');
    const rating = selectedStars.length; // Conta quantas estrelas foram selecionadas
    const usuarioId = window.localStorage.getItem('userId'); // Substitua com o ID real do usuário

    // Adicionar o feedback ao banco de dados via AJAX
    $.ajax({
        url: 'http://89.116.73.130:8080/usuario/comentario/', // Endpoint do backend
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
            comentario: comment,
            usuarioId: usuarioId, 
            estrelas: rating
        }),
        success: function (response) {
            console.log(response);
            mostrarAlertaSucesso("Comentário salvo com sucesso!");

            document.getElementById('comment').value = '';

            // Adiciona a nova avaliação à lista de ratings
            ratings.unshift({ comment: comment, rating: rating });
            displayComments();
            calculateAverageRating();
            expandRightPanel();
        },
        error: function (error) {
            console.error("Erro ao salvar o comentário:", error);
            mostrarAlertaErro("Erro ao salvar o comentário. Tente novamente.");
        }
    });
}

function getComments() { 
    $.ajax({
        url: 'http://89.116.73.130:8080/usuario/comentario/get', 
        type: 'GET',
        success: function (response) {
            const commentsDiv = document.getElementById('comments');
            commentsDiv.innerHTML = ''; // Limpa os comentários existentes
            ratings = []; // Reseta o array ratings

            // Percorrer a resposta e criar os elementos de comentário
            response.forEach(feedback => {
                const commentDiv = document.createElement('div');
                commentDiv.classList.add('comment');

                // Adiciona o nome do usuário
                const userName = feedback.usuarioModel ? feedback.usuarioModel.nome : 'Usuário desconhecido';
                commentDiv.innerHTML = `
                    <p><strong>${userName}</strong><br>
                    ${feedback.comentario}</p>
                `;

                // Adicionar estrelas à representação visual da avaliação
                const starsDiv = document.createElement('div');
                starsDiv.classList.add('stars');
                for (let i = 0; i < 5; i++) {
                    const starSpan = document.createElement('span');
                    if (i < feedback.estrelas) {
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

                // Adiciona a avaliação ao array ratings
                ratings.push({ comment: feedback.comentario, rating: feedback.estrelas });
            });

            // Recalcula a média após carregar todos os comentários
            calculateAverageRating();
        },
        error: function (error) {
            console.error("Erro ao buscar os comentários:", error);
            alert("Erro ao buscar os comentários. Tente novamente.");
        }
    });
}

// Chame esta função para carregar os comentários quando a página carregar
$(document).ready(function() {
    getComments();
});

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

function alternarFavorito(index) {
    var imgFavorito = document.getElementById('img-favorito-' + index);

    if (imgFavorito) {
        if (imgFavorito.src.includes('coracao-red')) {
            imgFavorito.src = './img/coracao-gray.png';
        } else {
            imgFavorito.src = './img/coracao-red.png';
        }
    } else {
        console.error('Imagem do favorito não encontrada!');
    }
}

let filtroFavoritoAtivado = false; // Variável para controlar o estado do filtro

function alternarFiltroFavorito() {
    const btnFavorito = document.getElementById('btnFavorito');

    if (filtroFavoritoAtivado) {
        location.reload(); // Recarrega a página para remover o filtro
    } else {
        // Se o filtro de favoritos não estiver ativado, ativa o filtro
        obterListaAnimaisFavoritos(); // Função que aplica o filtro de favoritos
        btnFavorito.textContent = 'Remover Favorito'; // Troca o texto do botão
        filtroFavoritoAtivado = true;
    }
}

// A função abaixo garante que o modal fecha corretamente
$('.close').on('click', function () {
    $('#modalAnimal').modal('hide');
});

function mostrarAlertaSucesso() {
    $('#alertaSucesso').removeClass('d-none');
    setTimeout(function() {
        $('#alertaSucesso').addClass('d-none');
        window.location.href = 'index.html';
    }, 3000); // O alerta desaparecerá após 3 segundos
}

function mostrarAlertaErro() {
    $('#alertaErro').removeClass('d-none');
    setTimeout(function() {
        $('#alertaErro').addClass('d-none');
    }, 3000); // O alerta desaparecerá após 3 segundos
}
