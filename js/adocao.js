$(document).ready(function () {
    obterListaAnimais();

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

    function obterListaAnimais() {
        // Variavel que vai para a rota de busca de animais e aparece apenas os animais disponiveis para adoção 
        const disponivelParaAdocao = '?statusAnimal=1';
        $.ajax({
            url: `http://localhost:8080/animal/lista/adocao${disponivelParaAdocao}`,
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
    
                $('.btn-adocao').on('click', function () {
                    var index = $(this).data('id');
                    var animal = data[index];
                    console.log(animal)
                    $('#modal-imagem').attr('src', animal.imagem);
                    $('#modal-nome').text(animal.nome);
                    $('#modal-peso').text(animal.peso + ' kg');
                    $('#modal-idade').text(animal.idade);
                    $('#modal-descricao').text(animal.descricao);
    
                    $('#modalAnimal').modal('show');
    
                    localStorage.setItem('animalId', animal.id);
                    localStorage.setItem('animalNome', animal.nome);
                });
    
    
    
                $('#adocaoBtn').on('click', function () {
                    if (token && nomeUsuario) {
                        window.location.href = 'formularioDeInteresse.html'
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

