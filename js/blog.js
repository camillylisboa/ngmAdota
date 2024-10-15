
$(document).ready(function () {
    var token = window.localStorage.getItem('token');
    var nomeUsuario = window.localStorage.getItem('nomeUsuario');
    var emailUsuario = window.localStorage.getItem('emailUsuario'); // Adicione conforme necessário
    var idadeUsuario = window.localStorage.getItem('idadeUsuario'); // Adicione conforme necessário
    var telefoneUsuario = window.localStorage.getItem('telefoneUsuario'); // Adicione conforme necessário
    var role = window.localStorage.getItem('role');

    if (token && nomeUsuario) {
        // Remover botão de entrar
        $('.btn-custom').remove();

        // Adicionar ícone com nome do usuário
        

        // Preencher o modal de informações do usuário
        $('#info-nome-usuario').text(nomeUsuario);
        $('#info-email-usuario').text(emailUsuario);
        $('#info-idade-usuario').text(idadeUsuario);
        $('#info-telefone-usuario').text(telefoneUsuario);

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
            window.localStorage.removeItem('emailUsuario'); // Adicione conforme necessário
            window.localStorage.removeItem('idadeUsuario'); // Adicione conforme necessário
            window.localStorage.removeItem('telefoneUsuario'); // Adicione conforme necessário
            
            // Redirecionar para a página de login
            window.location.href = 'login.html'; // Altere para a URL correta
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
});
