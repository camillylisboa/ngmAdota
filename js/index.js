$(document).ready(function () {
    // Verificar se o usuário está logado
    var token = window.localStorage.getItem('token');
    var nomeUsuario = window.localStorage.getItem('nomeUsuario');

    if (token && nomeUsuario) {
        // Remover botão de entrar
        $('.btn-custom').remove();

        // Adicionar ícone com nome do usuário
        var userIconHtml = '<div class="navbar-text"><img src="img/iconPerfil.png" alt=""> ' + nomeUsuario + '</div>';
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
