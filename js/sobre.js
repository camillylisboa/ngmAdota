
$(document).ready(function () {
    var token = window.localStorage.getItem('token');
    var nomeUsuario = window.localStorage.getItem('nomeUsuario');

    if (token && nomeUsuario) {
        // Remover botão de entrar
        $('.btn-custom').remove();

        // Adicionar ícone com nome do usuário
        var userIconHtml = '<a href="#" class="btn" data-bs-toggle="modal" data-bs-target="#modalNgmPerfil"><img src="img/avatar.png" style="width: 23px;" class="menu-icon" alt=""></a>';
        $('.navbar-nav').after(userIconHtml);

        // Preencher o modal de informações do usuário
        $('#info-nome-usuario').text(nomeUsuario);

        // Adicionar evento de clique no botão "Sair"
        $('#logout-button').on('click', function() {
            // Mostrar modal de confirmação
            $('#confirmModal').modal('show');
        });

        // Evento para o botão de confirmação
        $('#confirmButton').on('click', function() {
            // Remover os dados do usuário do localStorage
            window.localStorage.removeItem('token');
            window.localStorage.removeItem('nomeUsuario');

            // Redirecionar para a página de login
            window.location.href = 'login.html'; // Altere para a URL correta
        });

    } else {
        // Garantir que o botão de entrar esteja presente se não houver usuário logado
        if ($('.btn-custom').length === 0) {
            var loginButtonHtml = '<a href="login.html"><button class="btn btn-custom">Entrar</button></a>';
            $('.navbar-collapse').append(loginButtonHtml);
        }
    }
});
