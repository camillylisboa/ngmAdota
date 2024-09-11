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
    var emailUsuario = window.localStorage.getItem('email');
    var idadeUsuario = window.localStorage.getItem('idade');
    var telefoneUsuario = window.localStorage.getItem('telefone');
    var role = window.localStorage.getItem('role');
    var usuarioId = window.localStorage.getItem('userId'); // Correção do nome da chave

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

    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        const btn = dropdown.querySelector('.dropdown-toggle');
        const menu = dropdown.querySelector('.dropdown-menu');

        btn.addEventListener('click', () => {
            menu.classList.toggle('show');
        });
    });

    function logout() {
        showConfirmModal("Você deseja fazer logout?", function (confirmed) {
            if (confirmed) {
                window.localStorage.removeItem('nomeUsuario');
                window.localStorage.removeItem('email');
                window.localStorage.removeItem('idade');
                window.localStorage.removeItem('telefone');
                window.localStorage.removeItem('role');
                window.location.href = 'index.html';
            }
        });
    }

    function obterListaAnimais() {
        const disponivelParaAdocao = '?statusAnimal=1';
        $.ajax({
            url: `http://localhost:8080/animal/lista/adocao${disponivelParaAdocao}`,
            method: 'GET',
            dataType: 'json',
            success: function (data) {
                $('#lista-animais').empty();

                $.each(data, function (index, animal) {
                    var favoritoCor = animal.favorito ? 'red' : 'gray'; // Define a cor inicial do botão favorito

                    var cardHtml =
                        '<div class="animal-card">' +
                        '<img src="' + animal.imagem + '" alt="Imagem de ' + animal.nome + '">' +
                        '<h2>' + animal.nome +
                        (animal.sexo === 'M' ? ' <i class="fas fa-mars" style="font-size: 28px; color: blue;"></i>'
                            : ' <i class="fas fa-venus" style="font-size: 28px; color: pink;"></i>') +
                        
                        '<button class="btn-favorito" id="favorito-' + index + '" style="border: none; background: none;">' +
                        '<span class="coracao" style="font-size: 24px; color: ' + favoritoCor + ';">&#9829;</span>' +
                        '</button>' +'</h2>' +
                        '<button class="btn-adocao" data-bs-toggle="modal" data-bs-target="#modalAnimal" data-id="' + index + '">Ver mais</button>' +
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
                            url: `http://localhost:8080/favorito/${animalId}/usuario/${usuarioId}`,
                            type: 'PUT',
                            headers: {
                                'Authorization': 'Bearer ' + token
                            },
                            success: function (response) {
                                if (response.favorito) {
                                    coracao.css('color', 'red');
                                } else {
                                    coracao.css('color', 'gray');
                                }
                            },
                            error: function (xhr, status, error) {
                                console.error('Erro ao alternar favorito:', error);  // Esta é a linha do erro relatado
                            }
                        });
                    });
                });

                var modalAnimal = new bootstrap.Modal(document.getElementById('modalAnimal'), {
                    keyboard: false
                });

                $('.btn-adocao').on('click', function () {
                    var index = $(this).data('id');
                    var animal = data[index];
                    $('#modal-imagem').attr('src', animal.imagem);
                    $('#modal-nome').text(animal.nome);
                    $('#modal-peso').text(animal.peso + ' kg');
                    $('#modal-idade').text(animal.idade);
                    $('#modal-descricao').text(animal.descricao);
                    $('#modal-ong').text(animal.ongModel.razaosocial);
                    $('#modal-sexo').text(animal.sexo);
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
