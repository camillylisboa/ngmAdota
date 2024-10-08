$(document).ready(function () {
    obterListaAnimais();

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
    var role = window.localStorage.getItem('role');
    var usuarioId = window.localStorage.getItem('userId');



    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        const btn = dropdown.querySelector('.dropdown-toggle');
        const menu = dropdown.querySelector('.dropdown-menu');

        btn.addEventListener('click', () => {
            menu.classList.toggle('show');
        });
    });

    function obterListaAnimais() {
        const disponivelParaAdocao = '?statusAnimal=1';
        $.ajax({
            url: `http://89.116.73.130:8080/animal/lista/adocao${disponivelParaAdocao}`,
            method: 'GET',
            dataType: 'json',
            success: function (data) {
                $('#lista-animais').empty();
                $.each(data, function (index, animal) {
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

    $('#logout-button').on('click', function () {
        logout();
    });
});

function obterListaAnimaisFavoritos() {
    const usuarioId = window.localStorage.getItem('userId');
    const token = window.localStorage.getItem('token'); // Certifique-se de recuperar o token dentro da função

    if (usuarioId && token) {
        $.ajax({
            url: `http://89.116.73.130:8080/animal/lista/favorito?usuario=${usuarioId}`,
            method: 'GET',
            dataType: 'json',
            headers: {
                'Authorization': 'Bearer ' + token // Adicione o token nos headers
            },
            success: function (data) {
                $('#lista-animais').empty();
                $.each(data, function (index, favorito) {
                    var favoritoCor = window.localStorage.getItem('favorito-' + usuarioId + '-' + favorito.animal.id) === 'true' ? 'red' : 'gray';


                    if (favorito.animal.statusAnimal.id === 1) {
                        var cardHtml =
                            '<div class="animal-card">' +
                            '<img src="' + window.location.origin + favorito.animal.imagem + '" alt="Imagem de ' + favorito.animal.nome + '" ' +
                            'onerror="this.onerror=null;this.src=\'img/sem_imagem_cadastrada.png\';">' +
                            '<h2>' + favorito.animal.nome +
                            (favorito.animal.sexo === 'M' ? ' <img src="./img/sexo-masculino.png" alt="img masculino" style="height: 24px; width: auto; border-radius: 0;">'
                                : ' <img src="./img/simbolo-feminino.png" alt="img feminino" style="height: 26px; width: auto;">') +
                            '<button class="btn-favorito" id="favorito-' + index + '" style="border: none; background: none;" onclick="alternarFavorito(' + index + ')">' +
                            '<img id="img-favorito-' + index + '" src="./img/coracao-' + favoritoCor + '.png" alt="coração" style="height: 24px; width: auto; border-radius: 0;">' +
                            '</button>' +
                            '</h2>' +
                            '<button class="btn-edit" data-bs-toggle="modal" data-bs-target="#modalAnimal" data-id="' + index + '">Ver mais</button>' +
                            '</div>';

                    } else if (favorito.animal.statusAnimal.id === 2) {
                        var cardHtml =
                            '<div class="animal-card">' +
                            '<img src="' + window.location.origin + favorito.animal.imagem + '" alt="Imagem de ' + favorito.animal.nome + '" ' +
                            'onerror="this.onerror=null;this.src=\'img/sem_imagem_cadastrada.png\';">' +
                            '<h2>' + favorito.animal.nome +
                            (favorito.animal.sexo === 'M' ? ' <img src="./img/sexo-masculino.png" alt="img masculino" style="height: 24px; width: auto; border-radius: 0;">'
                                : ' <img src="./img/simbolo-feminino.png" alt="img feminino" style="height: 26px; width: auto;">') +
                            '<button class="btn-favorito" id="favorito-' + index + '" style="border: none; background: none;" onclick="alternarFavorito(' + index + ')">' +
                            '<img id="img-favorito-' + index + '" src="./img/coracao-' + favoritoCor + '.png" alt="coração" style="height: 24px; width: auto; border-radius: 0;">' +
                            '</button>' +
                            '</h2>' +
                            '<h3 class="btn-adotado" style="padding-left: 65px;" data-id="' + index + '">Este animal já foi adotado</h3>' +
                            '</div>';

                    }

                    $('#lista-animais').append(cardHtml);

                    $('#favorito-' + index).on('click', function () {
                        var coracao = $(this).find('.coracao');
                        var animalId = favorito.animal.id;

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

                $('.btn-adocao').on('click', function () {
                    var index = $(this).data('id');
                    var favorito = data[index];
                    $('#modal-imagem').attr('src', favorito.animal.imagem);
                    $('#modal-nome').text(favorito.animal.nome);
                    $('#modal-peso').text(favorito.animal.peso + ' kg');
                    $('#modal-idade').text(favorito.animal.idade);
                    $('#modal-descricao').text(favorito.animal.descricao);
                    $('#modal-ong').text(favorito.animal.ongModel.razaosocial);
                    $('#modal-sexo').text(favorito.animal.sexo === 'M' ? 'Macho' : 'Fêmea');
                    $('#modal-raca').text(favorito.animal.racaAnimal.tipo);
                    $('#modal-especie').text(favorito.animal.especieAnimal.tipo);
                    $('#modal-pelagem').text(favorito.animal.pelagemAnimal.tipo);
                    $('#modal-porte').text(favorito.animal.porteAnimal.tipo);
                    modalAnimal.show();

                    localStorage.setItem('animalId', favorito.animal.id);
                    localStorage.setItem('animalNome', favorito.animal.nome);
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
                console.error('Erro ao obter a lista de animais favoritos:', error);
            }
        });
    } else {
        console.error('ID do usuário ou token não encontrados no localStorage.');
    }
}

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
        btnFavorito.textContent = 'Remover Filtro'; // Troca o texto do botão
        filtroFavoritoAtivado = true;
    }
}